import Entity, {
  UniverseEntity,
  UniverseEntityOptions,
  EntityRawPayload,
  EntityFetchOptions,
  EntitiesList,
  EntityDeleteOptions,
  RawPatch
} from '../_base'
import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { BaseError, BaseErrorV2, BaseErrorV2Properties } from '../../errors'
import { Order, OrderRawPayload } from '../../entities/order/order'
import { ChannelUser, ChannelUserRawPayload } from './channel-user'
import { Analytics, AnalyticsRawPayload } from './analytics'
import { Email, EmailRawPayload, EmailsFetchRemoteError } from './email'
import { Cart, CartRawPayload, CartsFetchRemoteError, CartCreateRemoteError } from '../cart/cart'
import omit from 'just-omit'
import qs from 'qs'
import { Deal, DealRawPayload } from '../deal/deal'
import { Event, EventRawPayload } from '../../eventing/feeds/event'
import { Feed } from '../../eventing/feeds/feed'
import universeTopics from '../../universe/topics'
import * as realtime from '../../realtime'
import type { MessageBroker } from '../message-broker'
import { MessageSubscriptionInstance, MessageSubscriptionInstanceRawPayload, MessageSubscriptionInstancesFetchRemoteError } from '../message-subscription-instance'
import { PossibleDuplicatesRawPayload, PossibleDuplicatesPayload, PossibleDuplicatesFetchRemoteError } from './possible-duplicates'

export interface PersonOptions extends UniverseEntityOptions {
  rawPayload?: PersonRawPayload
  mqtt?: Universe['mqtt']
}

export interface AddressOptions extends PersonOptions {
  rawPayload?: PersonAddressRawPayload
}

export interface PhonenumberOptions extends PersonOptions {
  rawPayload?: PersonPhoneNumberRawPayload
}

export interface PreviewNotificationParams{
  channelUserId: string
  messageTemplateId: string
}
export interface PersonAddressRawPayload extends EntityRawPayload {
  readonly first_name?: string
  readonly last_name?: string
  readonly phone?: string
  readonly person?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly type?: string
  readonly lines?: string[]
  readonly company?: string
  readonly locality?: string
  readonly country?: string
  readonly region?: string
  readonly comment?: string
  readonly postal_code?: string
  readonly proxy_vendor?: string
  readonly external_reference_id?: string
}

export interface PersonAddressPayload {
  readonly id?: PersonAddressRawPayload['id']
  readonly firstName?: PersonAddressRawPayload['first_name']
  readonly lastName?: PersonAddressRawPayload['last_name']
  readonly phone?: PersonAddressRawPayload['phone']
  readonly person?: PersonAddressRawPayload['person']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: PersonAddressRawPayload['deleted']
  readonly active?: PersonAddressRawPayload['active']
  readonly type?: PersonAddressRawPayload['type']
  readonly lines?: PersonAddressRawPayload['lines']
  readonly company?: PersonAddressRawPayload['company']
  readonly locality?: PersonAddressRawPayload['locality']
  readonly country?: PersonAddressRawPayload['country']
  readonly region?: PersonAddressRawPayload['region']
  readonly comment?: PersonAddressRawPayload['comment']
  readonly postal_code?: PersonAddressRawPayload['postal_code']
  readonly proxy_vendor?: PersonAddressRawPayload['proxy_vendor']
  readonly external_reference_id?: PersonAddressRawPayload['external_reference_id']
}

export interface PersonPhoneNumberRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly person?: string
  readonly type?: string
  readonly value?: string
  readonly channel_user?: string
  readonly is_portable?: boolean
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string
  readonly portability?: object | any | null
}
export interface PersonPhoneNumberPayload {
  readonly id?: PersonPhoneNumberRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: PersonPhoneNumberRawPayload['deleted']
  readonly active?: PersonPhoneNumberRawPayload['active']
  readonly type?: PersonPhoneNumberRawPayload['type']
  readonly value?: PersonPhoneNumberRawPayload['value']
  readonly person?: PersonPhoneNumberRawPayload['person']
  readonly channelUser?: PersonPhoneNumberRawPayload['channel_user']
  readonly isPortable?: PersonPhoneNumberRawPayload['is_portable']
  readonly isProxy?: PersonPhoneNumberRawPayload['is_proxy']
  readonly proxyVendor?: PersonPhoneNumberRawPayload['proxy_vendor']
  readonly portability?: PersonPhoneNumberRawPayload['portability']
}

export type PersonChannelUserRawPayload = ChannelUserRawPayload

export type PersonAnalyticsRawPayload = AnalyticsRawPayload

export type PersonEmailRawPayload = EmailRawPayload

export interface PersonRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly kind?: 'Contact' | 'Universe' | string | null
  readonly first_name?: string
  readonly nickname?: string
  readonly middle_name?: string
  readonly last_name?: string
  readonly name?: string
  readonly avatar?: string
  readonly date_of_birth?: string
  readonly gender?: string
  readonly comment?: string
  readonly tags?: string[]
  readonly name_preference?: string[]
  readonly custom_properties?: object
  readonly measurements?: {
    body?: {
      weight: number
      height: number
    }
    shoes?: {
      sizes?: {
        type?: 'womens' | 'mens' | 'kids' | 'babys' | null
        uk?: number | null
        eu?: number | null
        us?: number | null
      }
    }
  }
  readonly emails?: PersonEmailRawPayload[]
  readonly addresses?: PersonAddressRawPayload[]
  readonly phonenumbers?: PersonPhoneNumberRawPayload[]
  readonly channel_users?: PersonChannelUserRawPayload[]
  readonly analytics?: PersonAnalyticsRawPayload
  readonly default_address?: string | null
  readonly language_preference?: string
}

export interface IPersonCarts {
  fetch: (options?: UniverseFetchOptions) => Promise<Cart[] | CartRawPayload[] | undefined>
  fromJson: (carts: CartRawPayload[]) => Cart[]
  toJson: (carts: Cart[]) => CartRawPayload[]
  create: (cart: CartRawPayload) => Promise<Cart | undefined>
}

// TODO: implement fn args
export interface IPersonDeals {
  fetch: Function
  fromJson: Function
  toJson: Function
  create: Function
}

// TODO: implement fn args
export interface IPersonPhonenumbers {
  fetch: Function
  fromJson: Function
  toJson: Function
  create: Function
}

// TODO: implement fn args
export interface IPersonAddresses {
  fetch: Function
  fromJson: Function
  toJson: Function
  create: Function
}
export enum MessageSubscriptionActionTypesEnum {
  OPTIN = 'optin',
  OPTOUT = 'optout',
  WITHDRAW = 'withdraw',
}

export type IMessageSubscriptionActionType = `${MessageSubscriptionActionTypesEnum}`

export interface IHandleMessageSubscriptionBody {
  channel_user?: {
    id: string
  }
  context?: {
    is_by_user?: boolean
    response_message?: string
    feed?: string
  }
}

class AddressArray<T> extends Array<T> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected person: Person

  constructor (items: T[], universe: Universe, http: Universe['http'], person: Person) {
    super(...items)
    this.universe = universe
    this.apiCarrier = universe
    this.http = http
    this.person = person
    Object.setPrototypeOf(this, AddressArray.prototype)
  }

  public fromJson (payloads: PersonAddressRawPayload[]): Address[] {
    return payloads.map(item => Address.create(item, this.universe, this.http))
  }

  public toJson (items: Address[]): PersonAddressRawPayload[] {
    return items.map(item => item.serialize())
  }

  public async fetch (
    options?: EntityFetchOptions
  ): Promise<Address[] | PersonAddressRawPayload[] | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${People.endpoint}/${this.person.id as string}/addresses`,
        params: {
          ...(options?.query ? options.query : {})
        }
      }
      const res = await this.http.getClient()(opts)
      const resources = res.data.data as PersonAddressRawPayload[]

      if (options && options.raw === true) {
        return resources
      }

      return resources.map((item: PersonAddressRawPayload) => {
        return Address.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw new AddressFetchRemoteError(undefined, { error: err })
    }
  }

  async create (payload: PersonAddressRawPayload): Promise<Address | undefined> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${People.endpoint}/${this.person.id as string}/addresses`,
        data: payload
      }
      const res = await this.http.getClient()(opts)
      const resources = res.data.data as PersonAddressRawPayload[]

      return resources.map((item: PersonAddressRawPayload) => {
        return Address.create(item, this.universe, this.http)
      })[0]
    } catch (err) {
      throw new AddressCreateRemoteError(undefined, { error: err })
    }
  }
}

export interface PersonPayload {
  readonly id?: PersonRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly kind?: PersonRawPayload['kind']
  readonly firstName?: PersonRawPayload['first_name']
  readonly middleName?: PersonRawPayload['middle_name']
  readonly lastName?: PersonRawPayload['last_name']
  readonly name?: PersonRawPayload['name']
  readonly nickname?: PersonRawPayload['nickname']
  readonly emails?: Email[]
  readonly avatar?: PersonRawPayload['avatar']
  readonly dateOfBirth?: PersonRawPayload['date_of_birth']
  readonly gender?: PersonRawPayload['gender']
  readonly comment?: PersonRawPayload['comment']
  readonly measurements?: PersonRawPayload['measurements']
  readonly tags?: PersonRawPayload['tags']
  readonly namePreference?: PersonRawPayload['name_preference']
  readonly customProperties?: PersonRawPayload['custom_properties']
  readonly addresses?: Address[]
  readonly phonenumbers?: Phonenumber[]
  readonly channelUsers?: ChannelUser[]
  readonly analytics?: Analytics
  readonly defaultAddress?: PersonRawPayload['default_address']
  readonly languagePreference?: PersonRawPayload['language_preference']
}

/**
 * Manage people, that usually are generated from channel users.
 *
 * @category Entity
 */
export class Person extends UniverseEntity<PersonPayload, PersonRawPayload> {
  public get entityName (): string {
    return 'persons'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt?: Universe['mqtt']
  protected options: PersonOptions
  public initialized: boolean

  public endpoint: string

  public id?: PersonPayload['id']
  public createdAt?: PersonPayload['createdAt']
  public updatedAt?: PersonPayload['updatedAt']
  public deleted?: PersonPayload['deleted']
  public active?: PersonPayload['active']
  public kind?: PersonPayload['kind']
  public firstName?: PersonPayload['firstName']
  public middleName?: PersonPayload['middleName']
  public lastName?: PersonPayload['lastName']
  public name?: PersonPayload['name']
  public nickname?: PersonPayload['nickname']
  public emails?: PersonPayload['emails']
  public avatar?: PersonPayload['avatar']
  public dateOfBirth?: PersonPayload['dateOfBirth']
  public gender?: PersonPayload['gender']
  public comment?: PersonPayload['comment']
  public measurements?: PersonPayload['measurements']
  public tags?: PersonPayload['tags']
  public namePreference?: PersonPayload['namePreference']
  public customProperties?: PersonPayload['customProperties']
  public _addresses?: PersonPayload['addresses']
  public _phonenumbers?: PersonPayload['phonenumbers']
  public channelUsers?: PersonPayload['channelUsers']
  public analytics?: PersonPayload['analytics']
  public defaultAddress?: PersonPayload['defaultAddress']
  public languagePreference?: PersonPayload['languagePreference']

  constructor (options: PersonOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/people'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }

    if (options?.mqtt) {
      this.mqtt = options?.mqtt
    }
  }

  protected deserialize (rawPayload: PersonRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.firstName = rawPayload.first_name
    this.middleName = rawPayload.middle_name
    this.lastName = rawPayload.last_name
    this.name = rawPayload.name
    this.nickname = rawPayload.nickname
    this.avatar = rawPayload.avatar
    this.dateOfBirth = rawPayload.date_of_birth
    this.gender = rawPayload.gender
    this.comment = rawPayload.comment
    this.measurements = rawPayload.measurements
    this.tags = rawPayload.tags
    this.namePreference = rawPayload.name_preference
    this.customProperties = rawPayload.custom_properties
    this.defaultAddress = rawPayload.default_address
    this.languagePreference = rawPayload.language_preference

    // in the following we are going to set virtual properties
    // e.g. from embeds. We want make sure that their fallback is undefined
    // as we might affect upstreeam data users.

    // Update 18.02.2021: We only overwrite virtual properties with undefined if their previous state was null or undefined
    // (that way we can keep embed data across patching)

    if (rawPayload.analytics && this.initialized) {
      this.analytics = Analytics.create(rawPayload.analytics, this.universe, this.http)
    } else if (rawPayload.analytics && !this.initialized) {
      this.analytics = Analytics.createUninitialized(rawPayload.analytics, this.universe, this.http)
    } else if (!this.analytics) {
      this.analytics = undefined
    }

    if (rawPayload.emails && this.initialized) {
      this.emails = rawPayload.emails.map(i => Email.create(i, this.universe, this.http))
    } else if (rawPayload.emails && !this.initialized) {
      this.emails = rawPayload.emails.map(i =>
        Email.createUninitialized(i, this.universe, this.http)
      )
    } else if (!this.emails) {
      this.emails = undefined
    }

    if (rawPayload.addresses && this.initialized) {
      this._addresses = rawPayload.addresses.map(i => Address.create(i, this.universe, this.http))
    } else if (rawPayload.addresses && !this.initialized) {
      this._addresses = rawPayload.addresses.map(i =>
        Address.createUninitialized(i, this.universe, this.http)
      )
    } else if (!this._addresses) {
      this._addresses = undefined
    }

    if (rawPayload.phonenumbers && this.initialized) {
      this._phonenumbers = rawPayload.phonenumbers.map(i =>
        Phonenumber.create(i, this.universe, this.http)
      )
    } else if (rawPayload.phonenumbers && !this.initialized) {
      this._phonenumbers = rawPayload.phonenumbers.map(i =>
        Phonenumber.createUninitialized(i, this.universe, this.http)
      )
    } else if (!this._phonenumbers) {
      this._phonenumbers = undefined
    }

    if (rawPayload.channel_users && this.initialized) {
      this.channelUsers = rawPayload.channel_users.map(i =>
        ChannelUser.create(i, this.universe, this.http)
      )
    } else if (rawPayload.channel_users && !this.initialized) {
      this.channelUsers = rawPayload.channel_users.map(i =>
        ChannelUser.createUninitialized(i, this.universe, this.http)
      )
    } else if (!this.channelUsers) {
      this.channelUsers = undefined
    }

    return this
  }

  public static create (
    payload: PersonRawPayload,
    universe: Universe,
    http: Universe['http'],
    mqtt?: Universe['mqtt']
  ): Person {
    return new Person({ rawPayload: payload, universe, http, initialized: true, mqtt })
  }

  public serialize (): PersonRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      first_name: this.firstName,
      middle_name: this.middleName,
      last_name: this.lastName,
      name: this.name,
      nickname: this.nickname,
      avatar: this.avatar,
      date_of_birth: this.dateOfBirth,
      gender: this.gender,
      comment: this.comment,
      measurements: this.measurements,
      tags: this.tags,
      name_preference: this.namePreference,
      custom_properties: this.customProperties,
      default_address: this.defaultAddress,
      language_preference: this.languagePreference,
      analytics: this.analytics ? this.analytics.serialize() : undefined,
      emails: Array.isArray(this.emails) ? this.emails.map(item => item.serialize()) : undefined,
      addresses: Array.isArray(this._addresses)
        ? this._addresses.map(item => item.serialize())
        : undefined,
      phonenumbers: Array.isArray(this._phonenumbers)
        ? this._phonenumbers.map(item => item.serialize())
        : undefined,
      channel_users: Array.isArray(this.channelUsers)
        ? this.channelUsers.map(item => item.serialize())
        : undefined
    }
  }

  public async init (): Promise<Person | undefined> {
    try {
      await this.fetch({
        query: {
          embed: ['channel_users', 'phonenumbers', 'addresses', 'emails', 'analytics']
        }
      })

      return this
    } catch (err) {
      throw this.handleError(new PersonInitializationError(undefined, { error: err }))
    }
  }

  public setupDefaultMessageListeners (): Person {
    this.mqtt?.on('message', (msg) => {
      this.handleMessage(msg)
    })

    this.subscribeDefaults()

    return this
  }

  private get defaultSubscriptions (): string[] {
    return [
      universeTopics.api.personChange.generateTopic(this)
    ]
  }

  public subscribeDefaults (): void {
    this.subscribe(this.defaultSubscriptions)
  }

  public unsubscribeDefaults (): void {
    this.unsubscribe(this.defaultSubscriptions)
  }

  public subscribe (topic: string | string[]): Person {
    this.getMqttClient()
      .subscribe(topic)
    return this
  }

  public unsubscribe (topic: string | string[]): Person {
    this.getMqttClient()
      .unsubscribe(topic)
    return this
  }

  /**
   * Safe access the mqtt client. This has a conequence that all the methods that use it need to be aware that they might throw.
   */
  private getMqttClient (): realtime.RealtimeClient {
    if (this.mqtt) return this.mqtt

    throw new realtime.UninstantiatedRealtimeClient()
  }

  /**
   *
   * Parsing and routing logic is being handled here.
   */
  private handleMessage (msg: realtime.RealtimeMessage | realtime.RealtimeMessageMessage): void {
    // NOTE: we are also receiving all other messages, but we do not emit them. This is a srtrong fan-out
    if (universeTopics.api.personChange.isTopic(msg.topic, this.serialize())) {
      let person
      if ((msg as realtime.RealtimeMessageMessage).payload.person) {
        // person = Person.deserialize((msg as realtime.RealtimeMessageMessage).payload.person as MessageRawPayload)
        person = Person.create((msg as realtime.RealtimeMessageMessage).payload.person, this.universe, this.http, this.mqtt)
      }

      this.emit('person:change', { ...msg, person })
    }
  }

  public async patch (changePart: PersonRawPayload): Promise<this> {
    return await super.patch(omit(changePart, ['emails', 'phonenumbers', 'addresses', 'channel_users', 'analytics']))
  }

  public async delete (options?: EntityDeleteOptions): Promise<this> {
    if (this.id === null || this.id === undefined) throw new TypeError('delete requires id to be set.')

    try {
      const opts = {
        method: 'DELETE',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }

      await this.http?.getClient()(opts)
      // delete routes don't respond with data yet, maybe needed in the future..
      // const response = await this.http?.getClient()(opts)
      // this.deserialize(response.data.data[0] as RawPayload)

      return this
    } catch (err) {
      throw new PersonDeleteRemoteError(undefined, { error: err })
    }
  }

  /**
   * Merges mergeables onto the selected person in this instance
   * @param mergeables array of mergable person picks
   */
  public async merge (mergeables: Object[]): Promise<Person | PersonRawPayload> {
    if (this.id === null || this.id === undefined) throw new TypeError('Merge requires id to be set.')
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/merge`,
        data: { mergeables },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const person = res.data.data[0] as PersonRawPayload
      return Person.create(person, this.universe, this.http)
    } catch (err) {
      throw new PersonMergeRemoteError(undefined, { error: err })
    }
  }

  /**
   * Gets an file url to an(optionally encoded) zip containing relevant gdpr data
   */
  public async getGDPRFile (options?: PersonGDPROptions): Promise<object> {
    if (this.id === null || this.id === undefined) throw new TypeError('GDPR download requires id to be set.')
    try {
      const opts = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/gdpr${options ? qs.stringify(options, { addQueryPrefix: true }) : ''}`,
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.data.data[0] as object
    } catch (err) {
      throw new PersonGDPRGetRemoteError(undefined, { error: err })
    }
  }

  /** Orders accessor
   *  ```js
   * //fetch all orders of a person
   * await person.orders()
   * ```
   */
  public async orders (options?: EntityFetchOptions): Promise<Order[] | OrderRawPayload[] | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/orders`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        params: {
          ...(options?.query ? options.query : {})
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const orders = res.data.data as OrderRawPayload[]

      if (options && options.raw === true) {
        return orders
      }
      const ordersMap = new Map()
      orders.forEach((orderRaw: OrderRawPayload) => {
        const o = Order.create(orderRaw, this.universe, this.http)
        ordersMap.set(o.id, o)
      })

      return Array.from(ordersMap.values())
    } catch (err) {
      throw this.handleError(new PersonFetchOrdersRemoteError(undefined, { error: err }))
    }
  }

  /**
   * Carts accessor
   *
   * ```js
   * // fetch all carts of a person
   * await person.carts.fetch()
   * // fetch all carts as raw structs with some query options
   * await person.carts.fetch({ raw: true })
   * // cast a list of class instances to list of structs
   * person.carts.toJson([cart])
   * // cast a list of structs to list of class instances
   * person.carts.fromJson([cart])
   * // create a cart for this person
   * person.carts.create(cart)
   * ```
   */
  public get carts (): IPersonCarts {
    return {
      fromJson: (payloads: CartRawPayload[]): Cart[] => {
        return payloads.map(item => Cart.create(item, this.universe, this.http))
      },
      toJson: (payloads: Cart[]): CartRawPayload[] => {
        return payloads.map(item => item.serialize())
      },
      fetch: async (options?: EntityFetchOptions): Promise<Cart[] | CartRawPayload[] | undefined> => {
        try {
          const opts = {
            method: 'GET',
            url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/carts`,
            params: {
              ...(options?.query ? options.query : {})
            }
          }
          const res = await this.http.getClient()(opts)
          const carts = res.data.data as CartRawPayload[]

          if (options && options.raw === true) {
            return carts
          }

          return carts.map((cart: CartRawPayload) => {
            return Cart.create(cart, this.universe, this.http)
          })
        } catch (err) {
          throw new CartsFetchRemoteError(undefined, { error: err })
        }
      },
      create: async (cart: CartRawPayload): Promise<Cart | undefined> => {
        try {
          const opts = {
            method: 'POST',
            url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/carts`,
            data: cart
          }
          const res = await this.http.getClient()(opts)
          const carts = res.data.data as CartRawPayload[]

          return carts.map((cart: CartRawPayload) => {
            return Cart.create(cart, this.universe, this.http)
          })[0]
        } catch (err) {
          throw new CartCreateRemoteError(undefined, { error: err })
        }
      }
    }
  }

  /**
   * Deals accessor
   *
   * ```js
   * // fetch all deals of a person
   * await person.deals.fetch()
   * // fetch all deals as raw structs with some query options
   * await person.deals.fetch({ raw: true })
   * // cast a list of class instances to list of structs
   * person.deals.toJson([deal])
   * // cast a list of structs to list of class instances
   * person.deals.fromJson([deal])
   * // create a deal for this person
   * person.deals.create(deal)
   * ```
   */
  public get deals (): IPersonDeals {
    return {
      fromJson: (payloads: DealRawPayload[]): Deal[] => {
        return payloads.map(item => Deal.create(item, this.universe, this.http))
      },
      toJson: (payloads: Deal[]): DealRawPayload[] => {
        return payloads.map(item => item.serialize())
      },
      fetch: async (options?: EntityFetchOptions): Promise<Deal[] | DealRawPayload[] | undefined> => {
        try {
          const opts = {
            method: 'GET',
            url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/deals`,
            params: {
              ...(options?.query ? options.query : {})
            }
          }
          const res = await this.http.getClient()(opts)
          const deals = res.data.data as DealRawPayload[]

          if (options && options.raw === true) {
            return deals
          }

          return deals.map((deal: DealRawPayload) => {
            return Deal.create(deal, this.universe, this.http)
          })
        } catch (err) {
          throw new DealsFetchRemoteError(undefined, { error: err })
        }
      },
      create: async (deal: DealRawPayload): Promise<Deal | undefined> => {
        try {
          const opts = {
            method: 'POST',
            url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/deals`,
            data: deal
          }
          const res = await this.http.getClient()(opts)
          const deals = res.data.data as DealRawPayload[]

          return deals.map((deal: DealRawPayload) => {
            return Deal.create(deal, this.universe, this.http)
          })[0]
        } catch (err) {
          throw new DealCreateRemoteError(undefined, { error: err })
        }
      }
    }
  }

  /**
   * Address accessor
   */
  get addresses (): AddressArray<Address> {
    const ret = new AddressArray<Address>(this._addresses ?? [], this.universe, this.http, this)

    return ret
  }

  set addresses (items: AddressArray<Address>) {
    this._addresses = items.map((item: Address) => (item))
  }

  /**
   * Get all message subscription instances of this person
   * */
  public async getMessagesubscriptionInstances (options?: EntityFetchOptions): Promise<MessageSubscriptionInstance[] | MessageSubscriptionInstanceRawPayload[]> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/message_subscription_instances`,
        params: {
          ...(options?.query ? options.query : {})
        }
      }
      const res = await this.http.getClient()(opts)
      const messageSubscriptionInstances = res.data.data as MessageSubscriptionInstanceRawPayload[]

      if (options && options.raw === true) {
        return messageSubscriptionInstances
      }

      return messageSubscriptionInstances.map((messageSubscriptionInstance: MessageSubscriptionInstanceRawPayload) => {
        return MessageSubscriptionInstance.create(messageSubscriptionInstance, this.universe, this.http)
      })
    } catch (err) {
      throw new MessageSubscriptionInstancesFetchRemoteError(undefined, { error: err })
    }
  }

  public async getEmails (options?: EntityFetchOptions): Promise<Email[] | EmailRawPayload[]> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/emails`,
        params: {
          ...(options?.query ? options.query : {})
        }
      }
      const res = await this.http.getClient()(opts)
      const emails = res.data.data as EmailRawPayload[]

      if (options && options.raw === true) {
        return emails
      }

      return emails.map((email: EmailRawPayload) => {
        return Email.create(email, this.universe, this.http)
      })
    } catch (err) {
      throw new EmailsFetchRemoteError(undefined, { error: err })
    }
  }

  public email (payload: EmailRawPayload): Email {
    return Email.create({ ...payload, person: this.id }, this.universe, this.http)
  }

  public phonenumber (payload: PersonPhoneNumberRawPayload): Phonenumber {
    return Phonenumber.create({ ...payload, person: this.id }, this.universe, this.http)
  }

  public address (payload: PersonAddressRawPayload): Address {
    return Address.create({ ...payload, person: this.id }, this.universe, this.http)
  }

  public get phonenumbers (): IPersonPhonenumbers {
    return {
      fromJson: (payloads: PersonPhoneNumberRawPayload[]): Phonenumber[] => {
        return payloads.map(item => Phonenumber.create(item, this.universe, this.http))
      },
      toJson: (payloads: Phonenumber[]): PersonPhoneNumberRawPayload[] => {
        return payloads.map(item => item.serialize())
      },
      fetch: async (options?: EntityFetchOptions): Promise<Phonenumber[] | PersonPhoneNumberRawPayload[] | undefined> => {
        try {
          const opts = {
            method: 'GET',
            url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/phonenumbers`,
            params: {
              ...(options?.query ? options.query : {})
            }
          }
          const res = await this.http.getClient()(opts)
          const phonenumbers = res.data.data as PersonPhoneNumberRawPayload[]

          if (options && options.raw === true) {
            return phonenumbers
          }

          return phonenumbers.map((phonenumber: PersonPhoneNumberRawPayload) => {
            return Phonenumber.create(phonenumber, this.universe, this.http)
          })
        } catch (err) {
          throw new PhonenumbersFetchRemoteError(undefined, { error: err })
        }
      },
      create: async (phonenumber: PersonPhoneNumberRawPayload): Promise<Phonenumber | undefined> => {
        try {
          const opts = {
            method: 'POST',
            url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/phonenumbers`,
            data: phonenumber
          }
          const res = await this.http.getClient()(opts)
          const phonenumbers = res.data.data as PersonPhoneNumberRawPayload[]

          return phonenumbers.map((phonenumber: PersonPhoneNumberRawPayload) => {
            return Phonenumber.create(phonenumber, this.universe, this.http)
          })[0]
        } catch (err) {
          throw new PhonenumberCreateRemoteError(undefined, { error: err })
        }
      }
    }
  }

  public async previewNotification (params: PreviewNotificationParams, language: string, parameters?: any[] | object, options?: EntityFetchOptions): Promise<EventRawPayload[]> {
    if (!(this.id && params?.messageTemplateId && params?.channelUserId)) throw new TypeError('message template preview setup requires person id, channelUser id and message template id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/api/v0/people/${this.id}/channel_users/${params.channelUserId}/notifications/templates/${params.messageTemplateId}/preview${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        data: {
          language,
          parameters
        }
      }
      const res = await this.http?.getClient()(opts)
      const resources = res.data.data as EventRawPayload[]
      if (options && options.raw === true) {
        return resources
      }

      const _feed = Feed.createUninitialized({ id: resources?.[0]?.feed }, this.universe, this.http, null)

      return resources.map((item: EventRawPayload) => {
        return Event.create(item, _feed, this.universe, this.http)
      })
    } catch (err) {
      throw new PersonPreviewNotificationError(undefined, { error: err })
    }
  }

  public async checkDuplicates (options?: EntityFetchOptions): Promise<PossibleDuplicatesPayload> {
    if (this.id === null || this.id === undefined) throw new TypeError('people duplicates check requires person id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/check/duplicates${qs.stringify(options?.query ?? {}, { addQueryPrefix: true })}`,
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { person_id, ...rest } = res.data.data[0] as PossibleDuplicatesRawPayload

      return {
        personId: person_id,
        ...rest
      }
    } catch (err) {
      throw this.handleError(new PossibleDuplicatesFetchRemoteError(undefined, { error: err }))
    }
  }

  /**
   * Unified sugar method to handle all the different aspects of a person messageSubscriptionInstance
   *
   * @param messageSubscriptionId
   * @param action - 'optin' | 'optout' | 'withdraw'
   * @param body  - optional context
   * @param options - optional query parameters
   */
  public async handleMessageSubscription (messageSubscriptionId: string, action: IMessageSubscriptionActionType, body?: IHandleMessageSubscriptionBody, options?: EntityFetchOptions): Promise<MessageSubscriptionInstanceRawPayload | MessageSubscriptionInstance> {
    if (!(this.id && messageSubscriptionId && action)) throw new TypeError('handleMessageSubscription requires personId, messageSubscriptionId and action (optin, optout, withdraw) to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/api/v0/people/${this.id}/message_subscriptions/${messageSubscriptionId}/${action}${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        data: body,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }
      const res = await this.http?.getClient()(opts)
      const resource = res.data.data[0] as MessageSubscriptionInstanceRawPayload
      if (options && options.raw === true) {
        return resource
      }

      return MessageSubscriptionInstance.create(resource, this.universe, this.http)
    } catch (err) {
      throw new HandleMessageSubscriptionRemoteError(err)
    }
  }
}
export interface PersonGDPROptions {
  password?: string
}

export interface PeopleOptions {
  universe: Universe
  http: Universe['http']
}

export class People extends EntitiesList<Person, PersonRawPayload> {
  public static endpoint: string = 'api/v0/people'
  public endpoint: string = People.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']

  constructor (options: PeopleOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: PersonRawPayload): Person {
    return Person.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<People> {
    return (await this._getStream(options)) as People
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }
}

export class Address extends UniverseEntity<PersonAddressPayload, PersonAddressRawPayload> {
  public get entityName (): string {
    return 'addresses'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: AddressOptions
  public initialized: boolean

  public endpoint: string

  public id?: string
  public firstName?: string
  public lastName?: string
  public phone?: string
  public person?: string
  public lines?: string[]
  public company?: string
  public locality?: string
  public country?: string
  public region?: string
  public postalCode?: string
  public type?: string
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public comment?: string
  public deleted?: boolean
  public active?: boolean
  public proxyVendor?: string
  public externalReferenceId?: string

  constructor (options: AddressOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.endpoint = ''

    if (options?.rawPayload && options.rawPayload.person) {
      this.endpoint = `api/v0/people/${options.rawPayload.person}/addresses`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PersonAddressRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.firstName = rawPayload.first_name
    this.lastName = rawPayload.last_name
    this.phone = rawPayload.phone
    this.person = rawPayload.person
    this.lines = rawPayload.lines
    this.company = rawPayload.company
    this.locality = rawPayload.locality
    this.country = rawPayload.country
    this.region = rawPayload.region
    this.postalCode = rawPayload.postal_code
    this.type = rawPayload.type
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.comment = rawPayload.comment
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active
    this.proxyVendor = rawPayload.proxy_vendor
    this.externalReferenceId = rawPayload.external_reference_id

    return this
  }

  public static create (
    payload: PersonAddressRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Address {
    return new Address({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized (
    payload: PersonAddressRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Address {
    return new Address({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize (): PersonAddressRawPayload {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      person: this.person,
      phone: this.phone,
      lines: this.lines,
      company: this.company,
      locality: this.locality,
      country: this.country,
      region: this.region,
      postal_code: this.postalCode,
      type: this.type,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      comment: this.comment,
      deleted: this.deleted,
      active: this.active,
      proxy_vendor: this.proxyVendor,
      external_reference_id: this.externalReferenceId
    }
  }

  public async patch (changePart: PersonAddressRawPayload): Promise<this> {
    if (!this.person) {
      throw new AddressPatchRemoteError('Address patch requires person to be set.')
    }
    // we allow implementers to override us by calling ._patch directly and e.g. handle our error differently
    return await this._patch(changePart)
  }

  public async applyPatch (patch: RawPatch): Promise<this> {
    if (!this.person) {
      throw new AddressPatchRemoteError('Address patch requires person to be set.')
    }
    return await this._applyPatch(patch)
  }
}

export interface PhonenumberToAccessor {
  messageBrokerChannelUser: (messageBroker: MessageBroker) => Promise<ChannelUser>
}

export class Phonenumber extends UniverseEntity<PersonPhoneNumberPayload, PersonPhoneNumberRawPayload> {
  public get entityName (): string {
    return 'phonenumbers'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: PhonenumberOptions
  public initialized: boolean

  public id?: string
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public comment?: string
  public deleted?: boolean
  public active?: boolean
  public value?: string
  public type?: string
  public person?: string
  public channelUser?: string
  public isPortable?: boolean
  public isProxy?: boolean
  public proxyVendor?: string
  public portability?: object| any | null

  public endpoint: string

  constructor (options: PhonenumberOptions) {
    super()

    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.endpoint = ''

    if (options?.rawPayload && options.rawPayload.person) {
      this.endpoint = `api/v0/people/${options.rawPayload.person}/phonenumbers`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PersonPhoneNumberRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active

    this.value = rawPayload.value
    this.type = rawPayload.type
    this.person = rawPayload.person
    this.channelUser = rawPayload.channel_user
    this.proxyVendor = rawPayload.proxy_vendor
    this.isProxy = rawPayload.is_proxy
    this.portability = rawPayload.portability
    this.portability = rawPayload.portability
    this.isPortable = rawPayload.is_portable
    return this
  }

  public static create (
    payload: PersonPhoneNumberRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Phonenumber {
    return new Phonenumber({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized (
    payload: PersonPhoneNumberRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Phonenumber {
    return new Phonenumber({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize (): PersonPhoneNumberRawPayload {
    return {
      id: this.id,
      value: this.value,
      type: this.type,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active,
      person: this.person,
      channel_user: this.channelUser,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      portability: this.portability,
      is_portable: this.isPortable
    }
  }

  public async patch (changePart: PersonPhoneNumberRawPayload): Promise<this> {
    if (!this.person) {
      throw new PhonenumberPatchRemoteError('Phonenumber patch requires person to be set.')
    }
    // we allow implementers to override us by calling ._patch directly and e.g. handle our error differently
    return await this._patch(changePart)
  }

  public async applyPatch (patch: RawPatch): Promise<this> {
    if (!this.person) {
      throw new PhonenumberApplyPatchRemoteError('Phonenumber applyPatch requires person to be set.')
    }
    return await this._applyPatch(patch)
  }

  get to (): PhonenumberToAccessor {
    return {
      messageBrokerChannelUser: async (messageBroker: MessageBroker): Promise<ChannelUser> => {
        const opts = {
          method: 'POST',
          url: `${this.universe?.universeBase}/${this.endpoint}/${this.id as string}/to/message_brokers/${messageBroker.id as string}/channel_user`
        }
        const res = await this.http.getClient()(opts)
        const resource = res.data.data[0] as ChannelUserRawPayload

        return ChannelUser.create(resource, this.universe, this.http)
      }
    }
  }
}

export class PersonDeleteRemoteError extends BaseError {
  public name = 'PersonDeleteRemoteError'
  constructor (public message: string = 'Could not delete person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonDeleteRemoteError.prototype)
  }
}

export class PersonFetchOrdersRemoteError extends BaseError {
  public name = 'PersonFetchOrdersRemoteError'
  constructor (public message: string = 'Could not get person orders.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonFetchOrdersRemoteError.prototype)
  }
}

export class PersonInitializationError extends BaseError {
  public name = 'PersonInitializationError'
  constructor (public message: string = 'Could not initialize person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonInitializationError.prototype)
  }
}

export class PersonFetchRemoteError extends BaseError {
  public name = 'PersonFetchRemoteError'
  constructor (public message: string = 'Could not get person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonFetchRemoteError.prototype)
  }
}

export class PeopleFetchRemoteError extends BaseError {
  public name = 'PeopleFetchRemoteError'
  constructor (public message: string = 'Could not get people.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PeopleFetchRemoteError.prototype)
  }
}

export class PeopleFetchCountRemoteError extends BaseError {
  public name = 'PeopleFetchCountRemoteError'
  constructor (public message: string = 'Could not get people count.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PeopleFetchCountRemoteError.prototype)
  }
}

export class AddressFetchRemoteError extends BaseError {
  public name = 'AddressFetchRemoteError'
  constructor (public message: string = 'Could not get fetch person address data.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AddressFetchRemoteError.prototype)
  }
}

export class AddressCreateRemoteError extends BaseError {
  public name = 'AddressCreateRemoteError'
  constructor (public message: string = 'Could not create person address.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AddressCreateRemoteError.prototype)
  }
}

export class AddressPatchRemoteError extends BaseError {
  public name = 'AddressPatchRemoteError'
  constructor (public message: string = 'Could not patch person address.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AddressPatchRemoteError.prototype)
  }
}

export class PersonMergeRemoteError extends BaseError {
  public name = 'PersonMergeRemoteError'
  constructor (public message: string = 'Could not merge persons.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonMergeRemoteError.prototype)
  }
}

export class PersonGDPRGetRemoteError extends BaseError {
  public name = 'PersonGDPRGetRemoteError'
  constructor (public message: string = 'Could not get gdpr info for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonGDPRGetRemoteError.prototype)
  }
}

export class PeopleExportRemoteError extends BaseError {
  public name = 'PeopleExportRemoteError'
  constructor (public message: string = 'Could not export people.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PeopleExportRemoteError.prototype)
  }
}

export class PersonEmailPostRemoteError extends BaseError {
  public name = 'PersonEmailPostRemoteError'
  constructor (public message: string = 'Could not save email for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonEmailPostRemoteError.prototype)
  }
}

export class PersonEmailApplyPatchError extends BaseError {
  public name = 'PersonEmailApplyPatchError'
  constructor (public message: string = 'Could not apply patch on email for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonEmailApplyPatchError.prototype)
  }
}

export class PersonEmailDeleteError extends BaseError {
  public name = 'PersonEmailDeleteError'
  constructor (public message: string = 'Could not delete email for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonEmailDeleteError.prototype)
  }
}

export class PersonPreviewNotificationError extends BaseError {
  public name = 'PersonPreviewNotificationError'
  constructor (public message: string = 'Could not preview notification for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonPreviewNotificationError.prototype)
  }
}

export class DealsFetchRemoteError extends BaseError {
  public name = 'DealsFetchRemoteError'
  constructor (public message: string = 'Could not fetch deals for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealsFetchRemoteError.prototype)
  }
}

export class DealCreateRemoteError extends BaseError {
  public name = 'DealCreateRemoteError'
  constructor (public message: string = 'Could not create deal for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealCreateRemoteError.prototype)
  }
}

export class PhonenumbersFetchRemoteError extends BaseError {
  public name = 'PhonenumbersFetchRemoteError'
  constructor (public message: string = 'Could not fetch phonenumbers for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PhonenumbersFetchRemoteError.prototype)
  }
}

export class PhonenumberCreateRemoteError extends BaseError {
  public name = 'PhonenumberCreateRemoteError'
  constructor (public message: string = 'Could not create phonenumber for person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PhonenumberCreateRemoteError.prototype)
  }
}

export class PhonenumberPatchRemoteError extends BaseError {
  public name = 'PhonenumberPatchRemoteError'
  constructor (public message: string = 'Phonenumber patch requires person to be set.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PhonenumberPatchRemoteError.prototype)
  }
}

export class PhonenumberApplyPatchRemoteError extends BaseError {
  public name = 'PhonenumberApplyPatchRemoteError'
  constructor (public message: string = 'Phonenumber applyPatch requires person to be set.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PhonenumberApplyPatchRemoteError.prototype)
  }
}

export class HandleMessageSubscriptionRemoteError extends BaseErrorV2 {
  public name = 'HandleMessageSubscriptionRemoteError'
  constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
    super(err as Error, props)
    Object.setPrototypeOf(this, HandleMessageSubscriptionRemoteError.prototype)
  }
}
