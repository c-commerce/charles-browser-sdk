import Entity, { EntityOptions, EntityRawPayload, EntityFetchOptions, EntitiesList } from '../_base'
import { Universe, UniverseFetchOptions } from '../../universe'
import { BaseError } from '../../errors'
import { Order, OrderRawPayload } from '../../entities/order/order'
import { ChannelUser, ChannelUserRawPayload } from './channel-user'
import { Analytics, AnalyticsRawPayload } from './analytics'
import { Email, EmailRawPayload } from './email'
import { Cart, CartRawPayload, CartsFetchRemoteError, CartCreateRemoteError } from '../cart/cart'
import omit from 'just-omit'

export interface PersonOptions extends EntityOptions {
  rawPayload?: PersonRawPayload
}

export interface AddressOptions extends PersonOptions {
  rawPayload?: PersonAddressRawPayload
}

export interface PhonenumberOptions extends PersonOptions {
  rawPayload?: PersonPhonenumberRawPayload
}

export interface PersonAddressRawPayload extends EntityRawPayload {
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
}

export interface PersonPhonenumberRawPayload extends EntityRawPayload {
  readonly person?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly type?: string
  readonly value?: string
}

export type PersonChannelUserRawPayload = ChannelUserRawPayload

export type PersonAnalyticsRawPayload = AnalyticsRawPayload

export type PersonEmailRawPayload = EmailRawPayload

export interface PersonRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
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
  readonly phonenumbers?: PersonPhonenumberRawPayload[]
  readonly channel_users?: PersonChannelUserRawPayload[]
  readonly analytics?: PersonAnalyticsRawPayload
}

export interface IPersonCarts {
  fetch: Function
  fromJson: Function
  toJson: Function
  create: Function
}

export interface IPersonAddresses {
  fetch: Function
  fromJson: Function
  toJson: Function
  create: Function
}

class AddressArray<T> extends Array<T> {
  protected universe: Universe
  protected http: Universe['http']
  protected person: Person

  constructor (items: T[], universe: Universe, http: Universe['http'], person: Person) {
    super(...items)
    this.universe = universe
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
}

/**
 * Manage people, that usually are generated from channel users.
 *
 * @category Entity
 */
export class Person extends Entity<PersonPayload, PersonRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: PersonOptions
  public initialized: boolean

  public endpoint: string

  public id?: PersonPayload['id']
  public createdAt?: PersonPayload['createdAt']
  public updatedAt?: PersonPayload['updatedAt']
  public deleted?: PersonPayload['deleted']
  public active?: PersonPayload['active']
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
  public phonenumbers?: PersonPayload['phonenumbers']
  public channelUsers?: PersonPayload['channelUsers']
  public analytics?: PersonPayload['analytics']

  constructor (options: PersonOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/people'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PersonRawPayload): Person {
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

    if (rawPayload.analytics && this.initialized) {
      this.analytics = Analytics.create(rawPayload.analytics, this.universe, this.http)
    } else if (rawPayload.analytics && !this.initialized) {
      this.analytics = Analytics.createUninitialized(rawPayload.analytics, this.universe, this.http)
    } else {
      this.analytics = undefined
    }

    this.emails = []
    if (rawPayload.emails && this.initialized) {
      this.emails = rawPayload.emails.map(i => Email.create(i, this.universe, this.http))
    } else if (rawPayload.emails && !this.initialized) {
      this.emails = rawPayload.emails.map(i =>
        Email.createUninitialized(i, this.universe, this.http)
      )
    }

    this._addresses = []
    if (rawPayload.addresses && this.initialized) {
      this._addresses = rawPayload.addresses.map(i => Address.create(i, this.universe, this.http))
    } else if (rawPayload.addresses && !this.initialized) {
      this._addresses = rawPayload.addresses.map(i =>
        Address.createUninitialized(i, this.universe, this.http)
      )
    }

    this.phonenumbers = []
    if (rawPayload.phonenumbers && this.initialized) {
      this.phonenumbers = rawPayload.phonenumbers.map(i =>
        Phonenumber.create(i, this.universe, this.http)
      )
    } else if (rawPayload.phonenumbers && !this.initialized) {
      this.phonenumbers = rawPayload.phonenumbers.map(i =>
        Phonenumber.createUninitialized(i, this.universe, this.http)
      )
    }

    this.channelUsers = []
    if (rawPayload.channel_users && this.initialized) {
      this.channelUsers = rawPayload.channel_users.map(i =>
        ChannelUser.create(i, this.universe, this.http)
      )
    } else if (rawPayload.channel_users && !this.initialized) {
      this.channelUsers = rawPayload.channel_users.map(i =>
        ChannelUser.createUninitialized(i, this.universe, this.http)
      )
    }

    return this
  }

  public static create (
    payload: PersonRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Person {
    return new Person({ rawPayload: payload, universe, http, initialized: true })
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
      analytics: this.analytics ? this.analytics.serialize() : undefined,
      emails: Array.isArray(this.emails) ? this.emails.map(item => item.serialize()) : undefined,
      addresses: Array.isArray(this._addresses)
        ? this._addresses.map(item => item.serialize())
        : undefined,
      phonenumbers: Array.isArray(this.phonenumbers)
        ? this.phonenumbers.map(item => item.serialize())
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

  public async patch (changePart: PersonRawPayload): Promise<Person> {
    return await super.patch(omit(changePart, ['emails', 'phonenumbers', 'addresses', 'channel_users', 'analytics'])) as Person
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
   * // fetch all feeds as raw structs with some query options
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
      toJson: (feeds: Cart[]): CartRawPayload[] => {
        return feeds.map(item => item.serialize())
      },
      fetch: async (
        options?: EntityFetchOptions
      ): Promise<Cart[] | CartRawPayload[] | undefined> => {
        try {
          const opts = {
            method: 'GET',
            url: `${this.universe.universeBase}/${People.endpoint}/${this.id as string}/carts`,
            params: {
              ...(options?.query ? options.query : {})
            }
          }
          const res = await this.http.getClient()(opts)
          const feeds = res.data.data as CartRawPayload[]

          if (options && options.raw === true) {
            return feeds
          }

          return feeds.map((feed: CartRawPayload) => {
            return Cart.create(feed, this.universe, this.http)
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

          return carts.map((feed: CartRawPayload) => {
            return Cart.create(feed, this.universe, this.http)
          })[0]
        } catch (err) {
          throw new CartCreateRemoteError(undefined, { error: err })
        }
      }
    }
  }

  /**
   * Address accessor
   *
   * ```js
   * // fetch all addresses of a person
   * await person.addresses.fetch()
   * // fetch all feeds as raw structs with some query options
   * await person.addresses.fetch({ raw: true })
   * // cast a list of class instances to list of structs
   * person.addresses.toJson([cart])
   * // cast a list of structs to list of class instances
   * person.addresses.fromJson([cart])
   * // create a cart for this person
   * person.addresses.create(cart)
   * ```
   */
  get addresses (): AddressArray<Address> {
    const ret = new AddressArray<Address>(this._addresses ?? [], this.universe, this.http, this)

    return ret
  }

  set addresses (items: AddressArray<Address>) {
    this._addresses = items.map((item: Address) => (item))
  }

  public email (payload: EmailRawPayload): Email {
    return Email.create({ ...payload, person: this.id }, this.universe, this.http)
  }

  public phonenumber (payload: PersonPhonenumberRawPayload): Phonenumber {
    return Phonenumber.create({ ...payload, person: this.id }, this.universe, this.http)
  }

  public address (payload: PersonAddressRawPayload): Address {
    return Address.create({ ...payload, person: this.id }, this.universe, this.http)
  }
}

export interface PeopleOptions {
  universe: Universe
  http: Universe['http']
}

export class People extends EntitiesList<Person, PersonRawPayload> {
  public static endpoint: string = 'api/v0/people'
  public endpoint: string = People.endpoint
  protected universe: Universe
  protected http: Universe['http']

  constructor (options: PeopleOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
  }

  protected parseItem (payload: PersonRawPayload): Person {
    return Person.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<People> {
    return (await this._getStream(options)) as People
  }
}

export class Address {
  protected universe: Universe
  protected http: Universe['http']
  protected options: AddressOptions
  public initialized: boolean

  public id?: string
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

  constructor (options: AddressOptions) {
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PersonAddressRawPayload): Address {
    this.id = rawPayload.id
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
      active: this.active
    }
  }
}

export class Phonenumber {
  protected universe: Universe
  protected http: Universe['http']
  protected options: PhonenumberOptions
  public initialized: boolean

  public id?: string
  public value?: string
  public type?: string
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public comment?: string
  public deleted?: boolean
  public active?: boolean

  constructor (options: PhonenumberOptions) {
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PersonPhonenumberRawPayload): Phonenumber {
    this.id = rawPayload.id
    this.value = rawPayload.value
    this.type = rawPayload.type
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active
    return this
  }

  public static create (
    payload: PersonPhonenumberRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Phonenumber {
    return new Phonenumber({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized (
    payload: PersonPhonenumberRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Phonenumber {
    return new Phonenumber({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize (): PersonPhonenumberRawPayload {
    return {
      id: this.id,
      value: this.value,
      type: this.type,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active
    }
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
  public name = 'PersonInitializationError';
  constructor (public message: string = 'Could not initialize person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonInitializationError.prototype)
  }
}

export class PersonFetchRemoteError extends BaseError {
  public name = 'PersonFetchRemoteError';
  constructor (public message: string = 'Could not get person.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PersonFetchRemoteError.prototype)
  }
}

export class PeopleFetchRemoteError extends BaseError {
  public name = 'PeopleFetchRemoteError';
  constructor (public message: string = 'Could not get people.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PeopleFetchRemoteError.prototype)
  }
}

export class PeopleFetchCountRemoteError extends BaseError {
  public name = 'PeopleFetchCountRemoteError';
  constructor (public message: string = 'Could not get people count.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PeopleFetchCountRemoteError.prototype)
  }
}

export class AddressFetchRemoteError extends BaseError {
  public name = 'AddressFetchRemoteError';
  constructor (public message: string = 'Could not get fetch person address data.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AddressFetchRemoteError.prototype)
  }
}

export class AddressCreateRemoteError extends BaseError {
  public name = 'AddressCreateRemoteError';
  constructor (public message: string = 'Could not create person address.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AddressCreateRemoteError.prototype)
  }
}
