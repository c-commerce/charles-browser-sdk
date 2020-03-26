
import Entity, { EntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { Order } from '../../entities/order/order'

export interface PersonOptions extends EntityOptions {
  rawPayload?: PersonRawPayload
}

export interface AddressOptions extends PersonOptions {
  rawPayload?: PersonAddressRawPayload
}

export interface PhonenumberOptions extends PersonOptions {
  rawPayload?: PersonPhonenumberRawPayload
}

export interface ChannelUserOptions extends PersonOptions {
  rawPayload?: PersonChannelUserRawPayload
}

export interface PersonAddressRawPayload extends EntityRawPayload {
  readonly person?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly type?: string
  readonly lines?: string[]
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

export interface PersonChannelUserRawPayload extends EntityRawPayload {
  readonly person?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly last_source_fetch_at?: string
  readonly broker?: string
  readonly external_person_reference_id?: string | null
  readonly external_person_custom_id?: string | null
  readonly external_channel_reference_id?: string | null
  readonly source_type?: string
  readonly source_api?: string
  readonly payload_name?: string
  readonly comment?: string
  readonly payload?: object | null
}

export interface PersonRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly first_name?: string
  readonly middle_name?: string
  readonly last_name?: string
  readonly name?: string
  readonly email?: string
  readonly avatar?: string
  readonly date_of_birth?: string
  readonly gender?: string
  readonly comment?: string
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
  readonly addresses?: PersonAddressRawPayload[]
  readonly phonenumbers?: PersonPhonenumberRawPayload[]
  readonly channel_users?: PersonChannelUserRawPayload[]
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
  readonly email?: PersonRawPayload['email']
  readonly avatar?: PersonRawPayload['avatar']
  readonly dateOfBirth?: PersonRawPayload['date_of_birth']
  readonly gender?: PersonRawPayload['gender']
  readonly comment?: PersonRawPayload['comment']
  readonly measurements?: PersonRawPayload['measurements']
  readonly addresses?: Address[]
  readonly phonenumbers?: Phonenumber[]
  readonly channelUsers?: ChannelUser[]
}

export interface PersonAnalyticsSnapshotResponse {
  customer_lifetime_value: {
    overall_net_value: number
    currency: string
  }[]
  latest_orders: Order[]
  mean_polarity: number
  mean_nps_score: number
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
  public email?: PersonPayload['email']
  public avatar?: PersonPayload['avatar']
  public dateOfBirth?: PersonPayload['dateOfBirth']
  public gender?: PersonPayload['gender']
  public comment?: PersonPayload['comment']
  public measurements?: PersonPayload['measurements']
  public addresses?: PersonPayload['addresses']
  public phonenumbers?: PersonPayload['phonenumbers']
  public channelUsers?: PersonPayload['channelUsers']

  constructor(options: PersonOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/people'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize(rawPayload: PersonRawPayload): Person {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted || false
    this.active = rawPayload.active || true
    this.firstName = rawPayload.first_name
    this.middleName = rawPayload.middle_name
    this.lastName = rawPayload.last_name
    this.name = rawPayload.name
    this.email = rawPayload.email
    this.avatar = rawPayload.avatar
    this.dateOfBirth = rawPayload.date_of_birth
    this.gender = rawPayload.gender
    this.comment = rawPayload.comment
    this.measurements = rawPayload.measurements

    this.addresses = []
    if (rawPayload.addresses && this.initialized) {
      this.addresses = rawPayload.addresses.map((i) => (Address.create(i, this.universe, this.http)))
    } else if (rawPayload.addresses && !this.initialized) {
      this.addresses = rawPayload.addresses.map((i) => (Address.createUninitialized(i, this.universe, this.http)))
    }

    this.phonenumbers = []
    if (rawPayload.phonenumbers && this.initialized) {
      this.phonenumbers = rawPayload.phonenumbers.map((i) => (Phonenumber.create(i, this.universe, this.http)))
    } else if (rawPayload.phonenumbers && !this.initialized) {
      this.phonenumbers = rawPayload.phonenumbers.map((i) => (Phonenumber.createUninitialized(i, this.universe, this.http)))
    }

    this.channelUsers = []
    if (rawPayload.channel_users && this.initialized) {
      this.channelUsers = rawPayload.channel_users.map((i) => (ChannelUser.create(i, this.universe, this.http)))
    } else if (rawPayload.channel_users && !this.initialized) {
      this.channelUsers = rawPayload.channel_users.map((i) => (ChannelUser.createUninitialized(i, this.universe, this.http)))
    }

    return this
  }

  public static create(payload: PersonRawPayload, universe: Universe, http: Universe['http']): Person {
    return new Person({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): PersonRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted || false,
      active: this.active || true,
      first_name: this.firstName,
      middle_name: this.middleName,
      last_name: this.lastName,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      date_of_birth: this.dateOfBirth,
      gender: this.gender,
      comment: this.comment,
      measurements: this.measurements,
      addresses: Array.isArray(this.addresses) ? this.addresses.map((item) => (item.serialize())) : undefined,
      phonenumbers: Array.isArray(this.phonenumbers) ? this.phonenumbers.map((item) => (item.serialize())) : undefined,
      channel_users: Array.isArray(this.channelUsers) ? this.channelUsers.map((item) => (item.serialize())) : undefined
    }
  }

  public async init(): Promise<Person | undefined> {
    try {
      await this.fetch({
        query: {
          embed: [
            'channel_users',
            'phonenumbers',
            'addresses'
          ]
        }
      })

      return this
    } catch (err) {
      throw this.handleError(new PersonInitializationError(undefined, { error: err }))
    }
  }

  public analytics(): object {
    return {
      snapshot: async (): Promise<PersonAnalyticsSnapshotResponse | undefined> => {
        try {
          const response = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id}/analytics/snapshot`)

          return {
            customer_lifetime_value: response.data.data[0].customer_lifetime_value,
            latest_orders: response.data.data[0].latest_orders,
            mean_polarity: response.data.data[0].mean_polarity,
            mean_nps_score: response.data.data[0].mean_nps_score
          }
        } catch (err) {
          throw new PeopleAnalyticsRemoteError(undefined, { error: err })
        }
      }
    }
  }
}

export class People {
  public static endpoint: string = 'api/v0/people'
}

export class Address {
  protected universe: Universe
  protected http: Universe['http']
  protected options: AddressOptions
  public initialized: boolean

  public id?: string
  public lines?: string[]
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

  constructor(options: AddressOptions) {
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize(rawPayload: PersonAddressRawPayload): Address {
    this.id = rawPayload.id
    this.lines = rawPayload.lines
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

  public static create(payload: PersonAddressRawPayload, universe: Universe, http: Universe['http']): Address {
    return new Address({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized(payload: PersonAddressRawPayload, universe: Universe, http: Universe['http']): Address {
    return new Address({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize(): PersonAddressRawPayload {
    return {
      id: this.id,
      lines: this.lines,
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

  constructor(options: PhonenumberOptions) {
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize(rawPayload: PersonPhonenumberRawPayload): Phonenumber {
    this.id = rawPayload.id
    this.value = rawPayload.value
    this.type = rawPayload.type
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active
    return this
  }

  public static create(payload: PersonPhonenumberRawPayload, universe: Universe, http: Universe['http']): Phonenumber {
    return new Phonenumber({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized(payload: PersonPhonenumberRawPayload, universe: Universe, http: Universe['http']): Phonenumber {
    return new Phonenumber({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize(): PersonPhonenumberRawPayload {
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

export class ChannelUser {
  protected universe: Universe
  protected http: Universe['http']
  protected options: ChannelUserOptions
  public initialized: boolean

  public id?: string
  public value?: string
  public type?: string
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public deleted?: PersonChannelUserRawPayload['deleted']
  public active?: PersonChannelUserRawPayload['active']
  public person?: PersonChannelUserRawPayload['person']
  public lastSourceFetchAt?: Date | null
  public broker?: PersonChannelUserRawPayload['broker']
  public externalPersonReferenceId?: PersonChannelUserRawPayload['external_person_reference_id']
  public externalPersonCustomId?: PersonChannelUserRawPayload['external_person_custom_id']
  public externalChannelReferenceId?: PersonChannelUserRawPayload['external_channel_reference_id']
  public sourceType?: PersonChannelUserRawPayload['source_type']
  public sourceApi?: PersonChannelUserRawPayload['source_api']
  public payloadName?: PersonChannelUserRawPayload['payload_name']
  public comment?: PersonChannelUserRawPayload['comment']
  public payload?: PersonChannelUserRawPayload['payload']

  constructor(options: ChannelUserOptions) {
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize(rawPayload: PersonChannelUserRawPayload): ChannelUser {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active
    this.person = rawPayload.person
    this.lastSourceFetchAt = rawPayload.last_source_fetch_at ? new Date(rawPayload.last_source_fetch_at) : undefined
    this.broker = rawPayload.broker
    this.externalPersonReferenceId = rawPayload.external_person_reference_id
    this.externalPersonCustomId = rawPayload.external_person_custom_id
    this.externalChannelReferenceId = rawPayload.external_channel_reference_id
    this.sourceType = rawPayload.source_type
    this.sourceApi = rawPayload.source_api
    this.payloadName = rawPayload.payload_name
    this.comment = rawPayload.comment
    this.payload = rawPayload.payload

    return this
  }

  public static create(payload: PersonChannelUserRawPayload, universe: Universe, http: Universe['http']): ChannelUser {
    return new ChannelUser({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized(payload: PersonChannelUserRawPayload, universe: Universe, http: Universe['http']): ChannelUser {
    return new ChannelUser({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize(): PersonChannelUserRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active,
      person: this.person,
      last_source_fetch_at: this.lastSourceFetchAt ? this.lastSourceFetchAt.toISOString() : undefined,
      broker: this.broker,
      external_person_reference_id: this.externalPersonReferenceId,
      external_person_custom_id: this.externalPersonCustomId,
      external_channel_reference_id: this.externalChannelReferenceId,
      source_type: this.sourceType,
      source_api: this.sourceApi,
      payload_name: this.payloadName,
      comment: this.comment,
      payload: this.payload
    }
  }
}

export class PersonInitializationError extends BaseError {
  public name = 'PersonInitializationError'
  constructor(public message: string = 'Could not initialize person.', properties?: any) {
    super(message, properties)
  }
}

export class PersonFetchRemoteError extends BaseError {
  public name = 'PersonFetchRemoteError'
  constructor(public message: string = 'Could not get person.', properties?: any) {
    super(message, properties)
  }
}

export class PeopleFetchRemoteError extends BaseError {
  public name = 'PeopleFetchRemoteError'
  constructor(public message: string = 'Could not get people.', properties?: any) {
    super(message, properties)
  }
}

export class PeopleAnalyticsRemoteError extends BaseError {
  public name = 'PeopleAnalyticsRemoteError'
  constructor(public message: string = 'Could not get analytics data.', properties?: any) {
    super(message, properties)
  }
}
