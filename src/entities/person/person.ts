
import Entity, { EntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

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
      phonenumbers: Array.isArray(this.phonenumbers) ? this.phonenumbers.map((item) => (item.serialize())) : undefined
    }
  }

  public async init(): Promise<Person | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new PersonInitializationError(undefined, { error: err }))
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
