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
import * as product from '../entities/Product/Product'
import * as ticket from '../entities/ticket/ticket'

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

export declare interface Universe {
  on(event: 'raw-error' | 'error', cb: (error: Error) => void): this
  on(event: 'armed' | 'universe:message' | string, cb: Function): this
}

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

  private subscibeDefaults() {
    this.getMqttClient()
      .subscribe([
        universeTopics.api.message.generateTopic(),
        universeTopics.api.feeds.generateTopic(),
        universeTopics.api.feedsActivities.generateTopic(),
        universeTopics.api.feedsMessages.generateTopic()
      ])
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
      if ((msg as realtime.RealtimeFeeds).payload.message) {
        feed = Feed.create((msg as realtime.RealtimeFeeds).payload.feed as FeedRawPayload, this, this.http, this.mqtt)
      }
      this.emit('universe:feeds', { ...msg, feed })
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

  public deinitialize(): void {
    this.removeAllListeners()
    this.getMqttClient().destroy()
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

  public async feeds(): Promise<Feed[] | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universeBase}/${Feeds.endpoint}`,
        params: {
          embed: [
            'participants',
            'top_latest_events'
          ]
        }
      }
      const res = await this.http.getClient()(opts)
      const feeds = res.data.data as FeedRawPayload[]

      return feeds.map((feed: FeedRawPayload) => {
        return Feed.create(feed, this, this.http, this.mqtt)
      })
    } catch (err) {
      throw new FeedsFetchRemoteError(undefined, { error: err })
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
  constructor(public message: string = 'Could not initialize universe', properties?: any) {
    super(message, properties)
  }
}
