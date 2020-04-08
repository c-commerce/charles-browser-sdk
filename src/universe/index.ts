import { Readable } from 'readable-stream'
import { UniverseHealth, UniverseStatus } from './status'
import { Client } from '../client'
import { Feeds, Feed, FeedRawPayload, FeedsFetchRemoteError } from '../eventing/feeds/feed'
import * as realtime from '../realtime'
import { BaseError } from '../errors'
import universeTopics from './topics'
import { Message, MessageRawPayload } from '../messaging'
import * as uuid from '../helpers/uuid'

import * as staff from '../entities/staff/staff'
import * as asset from '../entities/asset/asset'
import * as person from '../entities/person/person'
import * as product from '../entities/product/product'
import * as ticket from '../entities/ticket/ticket'
import * as cart from '../entities/cart/cart'
import * as order from '../entities/order/order'
import * as discount from '../entities/discount/discount'
import * as messageTemplate from '../entities/message-template/message-template'

// hygen:import:injection -  Please, don't delete this line: when running the cli for crud resources the new routes will be automatically added here.

export interface IUniverseUser {
  id?: string
  accessToken: string
}

export interface IUniverseOptions {
  name: string
  http: Client
  base: string
  user: IUniverseUser
}

export interface IUniversePayload {
  name: string
  id: string
  active: boolean
  deleted: boolean
  organization: string
  configuration: object | null
  updatedAt: Date | null
  createdAt: Date | null
}

export interface UniverseFetchQuery {
  [key: string]: any
}

export interface UniverseFetchOptions {
  raw?: boolean
  query?: UniverseFetchQuery,
}

export declare interface Universe {
  on(event: 'raw-error' | 'error', cb: (error: Error) => void): this
  on(event:
    'armed' // currently unused
    | 'universe:message' // receive any message in this universe
    | 'universe:feeds:messages' // receive any message in any feed in this universe
    | 'universe:feeds' // receive notifications about feeds and their updates, also which action happened for that feed
    | string,
    cb: Function): this
}

export interface UnviverseSearchResultItem {
  document: object
}

export interface UnviversePeopleSearchResultItem extends UnviverseSearchResultItem {
  document: {
    id: person.PersonRawPayload['id']
    name: person.PersonRawPayload['name']
    first_name: person.PersonRawPayload['first_name']
    middle_name: person.PersonRawPayload['middle_name']
    last_name: person.PersonRawPayload['last_name']
    created_at: person.PersonRawPayload['created_at']
    avatar: person.PersonRawPayload['avatar']
  }
  feeds: string[]
}

export interface UnviverseFeedsSearchResultItem extends UnviverseSearchResultItem {
  document: {
    id: MessageRawPayload['id']
    date: MessageRawPayload['date']
    feed: MessageRawPayload['feed']
    person: MessageRawPayload['person']
    content: MessageRawPayload['content']
  }
  event: string
  feed: string
  resource_type: 'message'
  person: person.PersonRawPayload
}

export interface UniverseSearches {
  people: Function
  feeds: Function
}

export interface IUniverseFeeds {
  fetch: Function
  fromJson: Function
  toJson: Function
}

/**
 * The unsiverse is usually the base entitiy one wants to build upon. Consider it a project, product
 * or namespace for data.
 *
 * It also allows easy access to remote states of entities, such as:
 *
 * ```js
 * await universe.feeds()
 * await universe.staffs()
 * await universe.assets()
 * await universe.people()
 * await universe.products()
 * await universe.tickets()
 * ```
 *
 * Furthermore it is a global event emitter, informing implementers about e.g. about new messages
 *
 * ```js
 * universe.on('universe:message', (msg) => {
 *   // your logic
 * })
 *
 * universe.on('universe:feeds:messages', (p) => {
 *   // your logic
 * })
 *
 * universe.on('universe:feeds', (p) => {
 *   // your logic
 * })
 * ```
 *
 * @category Universe
 */
export class Universe extends Readable {
  public status: UniverseStatus
  public health: UniverseHealth
  public options: IUniverseOptions
  public name: IUniverseOptions['name']

  public initialized: boolean = false
  public payload: IUniversePayload | null = null
  public user: IUniverseUser

  protected http: Client
  private mqtt: realtime.RealtimeClient | null = null
  public base: string
  public universeBase: string
  private static endpoint: string = 'api/v0/universes'

  public constructor(options: IUniverseOptions) {
    super()

    this.options = options
    this.name = options.name
    this.user = options.user
    this.base = this.options.base || 'https://hello-charles.com'
    this.universeBase = `https://${this.name}.hello-charles.com`

    this.status = new UniverseStatus({ universe: this })
    this.health = new UniverseHealth({ universe: this })
    this.http = options.http

    return this
  }

  public async init(): Promise<Universe | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.base}/${Universe.endpoint}/${this.name}`)

      this.setInitialized(res.data.data[0])
      this.setMqttClient()

      return this
    } catch (err) {
      throw new UniverseInitializationError(undefined, { error: err })
    }
  }

  private static parsePayload(payload: any): IUniversePayload {
    return {
      createdAt: payload.created_at ? new Date(payload.created_at) : null,
      updatedAt: payload.updated_at ? new Date(payload.updated_at) : null,
      id: payload.id,
      organization: payload.organization,
      active: payload.active,
      deleted: payload.deleted,
      configuration: payload.configuration,
      name: payload.name
    }
  }

  private setInitialized(payload: any) {
    this.payload = Universe.parsePayload(payload)
    this.initialized = true
    return this
  }

  private setMqttClient(): void {
    const realtimeOpts = {
      base: `wss:${this.name}.hello-charles.com`,
      username: this.user.id || 'charles-browser-sdk',
      password: this.user.accessToken
    }

    this.mqtt = new realtime.RealtimeClient(realtimeOpts)
    this.mqtt.on('message', (msg) => {
      this.handleMessage(msg)
    })
    this.subscibeDefaults()
  }

  private get defaultSubscriptions(): string[] {
    return [
      universeTopics.api.message.generateTopic(),
      universeTopics.api.feeds.generateTopic(),
      universeTopics.api.feedsActivities.generateTopic(),
      universeTopics.api.feedsMessages.generateTopic()
    ]
  }

  private subscibeDefaults() {
    this.getMqttClient()
      .subscribe(this.defaultSubscriptions)
  }

  /**
   *
   * Parsing and routing logic is being handled here. We take extensive decisions about type and destinations here.
   */
  private handleMessage(msg: realtime.RealtimeMessage | realtime.RealtimeMessageMessage) {

    // each arming message will cause an unsubscription
    if (universeTopics.api.clients.arm.isTopic(msg.topic)) {
      this.emit('armed', msg)
      this.getMqttClient().unsubscribe(msg.topic)
      this.emit('message', msg)
      return
    }

    if (universeTopics.api.message.isTopic(msg.topic)) {
      let message
      if ((msg as realtime.RealtimeMessageMessage).payload.message) {
        message = Message.deserialize((msg as realtime.RealtimeMessageMessage).payload.message as MessageRawPayload, this, this.http)
      }
      this.emit('universe:message', { ...msg, message })
      return
    }

    if (universeTopics.api.feedsMessages.isTopic(msg.topic)) {
      let message
      let feed
      if ((msg as realtime.RealtimeFeedsMessages).payload.message) {
        message = Message.deserialize((msg as realtime.RealtimeFeedsMessages).payload.message as MessageRawPayload, this, this.http)
        feed = Feed.create((msg as realtime.RealtimeFeedsMessages).payload.feed as FeedRawPayload, this, this.http, this.mqtt)
      }
      this.emit('universe:feeds:messages', { ...msg, message, feed })
      return
    }

    if (universeTopics.api.feeds.isTopic(msg.topic)) {
      let feed
      if ((msg as realtime.RealtimeFeeds).payload.feed) {
        feed = Feed.create((msg as realtime.RealtimeFeeds).payload.feed as FeedRawPayload, this, this.http, this.mqtt)
      }
      this.emit('universe:feeds', { ...msg, feed, action: (msg as realtime.RealtimeFeeds).payload.action })
      return
    }

    this.emit('message', msg)
  }

  /**
   * Safe access the mqtt client. This has a conequence that all the methods that use it need to be aware that they might throw.
   */
  private getMqttClient(): realtime.RealtimeClient {
    if (this.mqtt) return this.mqtt

    throw new realtime.UninstantiatedRealtimeClient()
  }

  public create(options: IUniverseOptions): Universe {
    return new Universe(options)
  }

  /**
   * In order to notify backends about the universe leaving we will try to
   * unsubscripe from topics before destroying. In any case all event handlers are gone
   * immediately.
   *
   */
  public deinitialize(): void {
    this.removeAllListeners()
    const client = this.getMqttClient()

    client.unsubscribe(this.defaultSubscriptions, function () {
      client.destroy()
    })
  }

  public get ready(): boolean {
    // TODO: implement
    return false
  }

  public isReady(): boolean {
    // TODO: implement
    return false
  }

  public get connected(): boolean {
    // TODO: implement
    return false
  }

  public isConnected(): boolean {
    // TODO: implement
    return false
  }

  private handleError(err: Error) {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }

  public feed(payload: FeedRawPayload): Feed {
    return Feed.create(payload, this, this.http, this.mqtt)
  }

  public product(payload: product.ProductRawPayload): product.Product {
    return product.Product.create(payload, this, this.http)
  }

  public staff(payload: staff.StaffRawPayload): staff.Staff {
    return staff.Staff.create(payload, this, this.http)
  }

  public asset(payload: asset.AssetRawPayload): asset.Asset {
    return asset.Asset.create(payload, this, this.http)
  }

  public cart(payload: cart.CartRawPayload): cart.Cart {
    return cart.Cart.create(payload, this, this.http)
  }

  public order(payload: order.OrderRawPayload): order.Order {
    return order.Order.create(payload, this, this.http)
  }

  public person(payload: person.PersonRawPayload): person.Person {
    return person.Person.create(payload, this, this.http)
  }

  public ticket(payload: ticket.TicketRawPayload): ticket.Ticket {
    return ticket.Ticket.create(payload, this, this.http)
  }

  public discount(payload: discount.DiscountRawPayload): discount.Discount {
    return discount.Discount.create(payload, this, this.http)
  }

  public messageTemplate(payload: messageTemplate.MessageTemplateRawPayload): messageTemplate.MessageTemplate {
    return messageTemplate.MessageTemplate.create(payload, this, this.http)
  }

  // hygen:factory:injection -  Please, don't delete this line: when running the cli for crud resources the new routes will be automatically added here.

  /**
   * Feeds accessor
   *
   * @example
   * // fetch all feeds with regular defaults (as class instance list)
   * await universe.feeds.fetch()
   * // fetch all feeds as raw structs with some query options
   * await universe.feeds.fetch({ raw: true, query: { embed: ['participants', 'top_latest_events'] } })
   * // cast a list of class instances to list of structs
   * universe.feeds.toJson([feed])
   * // cast a list of structs to list of class instances
   * universe.feeds.fromJson([feed])
   */
  public get feeds(): IUniverseFeeds {
    return {
      fromJson: (payloads: FeedRawPayload[]): Feed[] => {
        return payloads.map((item) => (Feed.create(item, this, this.http, this.mqtt)))
      },
      toJson: (feeds: Feed[]): FeedRawPayload[] => {
        return feeds.map((item) => (item.serialize()))
      },
      fetch: async (options?: UniverseFetchOptions): Promise<Feed[] | FeedRawPayload[] | undefined> => {
        try {
          const opts = {
            method: 'GET',
            url: `${this.universeBase}/${Feeds.endpoint}`,
            params: {
              ...(options && options.query ? options.query : {}),
              embed: options && options.query && options.query.embed ? options.query.embed : [
                'participants',
                'top_latest_events'
              ]
            }
          }
          const res = await this.http.getClient()(opts)
          const feeds = res.data.data as FeedRawPayload[]

          if (options && options.raw === true) {
            return feeds
          }

          return feeds.map((feed: FeedRawPayload) => {
            return Feed.create(feed, this, this.http, this.mqtt)
          })
        } catch (err) {
          throw new FeedsFetchRemoteError(undefined, { error: err })
        }
      }
    }
  }

  public async staffs(): Promise<staff.Staff[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${staff.Staffs.endpoint}`)
      const resources = res.data.data as staff.StaffRawPayload[]

      return resources.map((resource: staff.StaffRawPayload) => {
        return staff.Staff.create(resource, this, this.http)
      })
    } catch (err) {
      throw new staff.StaffsFetchRemoteError(undefined, { error: err })
    }
  }

  public async assets(): Promise<asset.Asset[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${asset.Assets.endpoint}`)
      const resources = res.data.data as asset.AssetRawPayload[]

      return resources.map((resource: asset.AssetRawPayload) => {
        return asset.Asset.create(resource, this, this.http)
      })
    } catch (err) {
      throw new asset.AssetsFetchRemoteError(undefined, { error: err })
    }
  }

  public async people(): Promise<person.Person[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${person.People.endpoint}`)
      const resources = res.data.data as person.PersonRawPayload[]

      return resources.map((resource: person.PersonRawPayload) => {
        return person.Person.create(resource, this, this.http)
      })
    } catch (err) {
      throw new person.PeopleFetchRemoteError(undefined, { error: err })
    }
  }

  public async products(): Promise<product.Product[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${product.Products.endpoint}`)
      const resources = res.data.data as product.ProductRawPayload[]

      return resources.map((resource: product.ProductRawPayload) => {
        return product.Product.create(resource, this, this.http)
      })
    } catch (err) {
      throw new product.ProductsFetchRemoteError(undefined, { error: err })
    }
  }

  public async tickets(): Promise<ticket.Ticket[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${ticket.Tickets.endpoint}`)
      const resources = res.data.data as ticket.TicketRawPayload[]

      return resources.map((resource: ticket.TicketRawPayload) => {
        return ticket.Ticket.create(resource, this, this.http)
      })
    } catch (err) {
      throw new ticket.TicketsFetchRemoteError(undefined, { error: err })
    }
  }

  public async carts(): Promise<cart.Cart[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${cart.Carts.endpoint}`)
      const resources = res.data.data as cart.CartRawPayload[]

      return resources.map((resource: cart.CartRawPayload) => {
        return cart.Cart.create(resource, this, this.http)
      })
    } catch (err) {
      throw new cart.CartsFetchRemoteError(undefined, { error: err })
    }
  }

  public async orders(): Promise<order.Order[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${order.Orders.endpoint}`)
      const resources = res.data.data as order.OrderRawPayload[]

      return resources.map((resource: order.OrderRawPayload) => {
        return order.Order.create(resource, this, this.http)
      })
    } catch (err) {
      throw new order.OrdersFetchRemoteError(undefined, { error: err })
    }
  }

  public async discounts(): Promise<discount.Discount[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${discount.Discounts.endpoint}`)
      const resources = res.data.data as discount.DiscountRawPayload[]

      return resources.map((resource: discount.DiscountRawPayload) => {
        return discount.Discount.create(resource, this, this.http)
      })
    } catch (err) {
      throw new discount.DiscountsFetchRemoteError(undefined, { error: err })
    }
  }

  public async messageTemplates(): Promise<messageTemplate.MessageTemplate[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${messageTemplate.MessageTemplates.endpoint}`)
      const resources = res.data.data as messageTemplate.MessageTemplateRawPayload[]

      return resources.map((resource: messageTemplate.MessageTemplateRawPayload) => {
        return messageTemplate.MessageTemplate.create(resource, this, this.http)
      })
    } catch (err) {
      throw new messageTemplate.MessageTemplatesFetchRemoteError(undefined, { error: err })
    }
  }

  // hygen:handler:injection -  Please, don't delete this line: when running the cli for crud resources the new routes will be automatically added here.

  /**
   * Arm the client by retrieving latest data. Arming emits to the server and listens for the response once.
   */
  public arm(): Universe {
    const mqtt = this.getMqttClient()
    const topicString = universeTopics.api.clients.arm.generateTopic({ client: uuid.v4() })
    // NOTE: this requires unsubscribing from this topic in the armed listener
    mqtt.subscribe(topicString, (err: Error) => {
      if (err) {
        return this.handleError(err)
      }

      mqtt.publish(topicString)
    })

    return this
  }

  /**
   * Gets executable search
   *
   * @example
   * await universe.search.people('Your Name')
   */
  public get search(): UniverseSearches {
    return {
      people: async (q: string): Promise<UnviversePeopleSearchResultItem[]> => {
        return this.searchEntity<UnviversePeopleSearchResultItem[]>(person.People.endpoint, q)
      },
      feeds: async (q: string): Promise<UnviverseFeedsSearchResultItem[]> => {
        return this.searchEntity<UnviverseFeedsSearchResultItem[]>(Feeds.endpoint, q)
      }
    }
  }

  /**
   * Execute search for a given entity
   * @ignore
   * @param endpoint
   * @param q
   */
  private async searchEntity<T>(endpoint: string, q: string): Promise<T> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${endpoint}/search`, {
        params: {
          q
        }
      })
      return res.data.data
    } catch (err) {
      throw new UniverseSearchError(undefined, { error: err })
    }
  }
}

export class UnviverseSingleton extends Universe {
  private static instance: Universe

  constructor(options: IUniverseOptions) {
    super(options)
  }

  static getInstance(options: IUniverseOptions): Universe {
    if (!UnviverseSingleton.instance) {
      UnviverseSingleton.instance = new UnviverseSingleton(options)
    }

    return UnviverseSingleton.instance
  }

  static clearInstance(): void {
    UnviverseSingleton.instance.deinitialize()
  }
}

export class UniverseInitializationError extends BaseError {
  public name = 'UniverseInitializationError'
  constructor(public message: string = 'Could not initialize universe.', properties?: any) {
    super(message, properties)
  }
}

export class UniverseSearchError extends BaseError {
  public name = 'UniverseSearchError'
  constructor(public message: string = 'Could not fulfill search unexpectedly.', properties?: any) {
    super(message, properties)
  }
}
