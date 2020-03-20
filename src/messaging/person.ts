import { EventEmitter } from 'events'
import { Universe } from '../universe'

export interface PersonOptions {
  universe: Universe
  http: Universe['http']
  rawPayload?: PersonRawPayload
  initialized?: boolean
}

export interface AddressOptions extends PersonOptions {
  rawPayload?: AddressRawPayload
}

export interface PhonenumberOptions extends PersonOptions {
  rawPayload?: PhonenumberRawPayload
}

export interface PersonRawPayload {
  readonly id?: string
  readonly first_name?: string
  readonly middle_name?: string
  readonly last_name?: string
  readonly name?: string
  readonly avatar?: string
  readonly email?: string
  readonly date_of_birth?: string | null
  readonly created_at?: string
  readonly updated_at?: string
  readonly raw_payloads?: object[]
  readonly gender?: string
  readonly comment?: string
  readonly origins?: object[]
  readonly deleted?: boolean
  readonly active?: boolean
  readonly addresses?: AddressRawPayload[]
  readonly phonenumbers?: PhonenumberRawPayload[]
}

export interface AddressRawPayload {
  readonly id?: string
  readonly lines?: string[]
  readonly locality?: string
  readonly country?: string
  readonly region?: string
  readonly postal_code?: string
  readonly type?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly comment?: string
  readonly deleted?: boolean
  readonly active?: boolean
}

export interface PhonenumberRawPayload {
  readonly id?: string
  readonly type?: string
  readonly value?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly created_at?: string
  readonly updated_at?: string
}

export interface PersonPayload {
  readonly id?: string
  readonly firstName?: string
  readonly middleName?: string
  readonly lastName?: string
  readonly name?: string
  readonly avatar?: string
  readonly email?: string
  readonly dateOfBirth?: Date | null
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly rawPayloads?: object[]
  readonly gender?: string | null
  readonly comment?: string | null
  readonly origins?: object[]
  readonly deleted?: boolean
  readonly active?: boolean
  readonly addresses?: Address[]
  readonly phonenumbers?: Phonenumber[]
}

export interface AddressPayload {
  readonly id?: string
  readonly lines?: string[]
  readonly locality?: string
  readonly country?: string
  readonly region?: string
  readonly postalCode?: string
  readonly type?: string
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly comment?: string
  readonly deleted?: boolean
  readonly active?: boolean
}

export interface PhonenumberPayload {
  readonly id?: string
  readonly type?: string
  readonly value?: string
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
}

export interface Person extends PersonPayload {

}

export class Person extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: PersonOptions
  public initialized: boolean

  public readonly id?: string
  public readonly firstName?: string
  public readonly middleName?: string
  public readonly lastName?: string
  public readonly name?: string
  public readonly avatar?: string
  public readonly email?: string
  public readonly dateOfBirth?: Date | null
  public readonly createdAt?: Date | null
  public readonly updatedAt?: Date | null
  public readonly rawPayloads?: object[]
  public readonly gender?: string | null
  public readonly comment?: string | null
  public readonly origins?: object[]
  public readonly deleted?: boolean
  public readonly active?: boolean
  public readonly addresses?: Address[]
  public readonly phonenumbers?: Phonenumber[]

  constructor(options: PersonOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.id = options.rawPayload.id
      this.firstName = options.rawPayload.first_name
      this.middleName = options.rawPayload.middle_name
      this.lastName = options.rawPayload.last_name
      this.name = options.rawPayload.name
      this.avatar = options.rawPayload.avatar
      this.email = options.rawPayload.email
      this.dateOfBirth = options.rawPayload.date_of_birth ? new Date(options.rawPayload.date_of_birth) : null
      this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : null
      this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : null
      this.rawPayloads = options.rawPayload.raw_payloads
      this.gender = options.rawPayload.gender
      this.comment = options.rawPayload.comment
      this.origins = options.rawPayload.origins
      this.deleted = options.rawPayload.deleted || false
      this.active = options.rawPayload.active || false

      this.addresses = []
      if (options.rawPayload.addresses && this.initialized) {
        this.addresses = options.rawPayload.addresses.map((i) => (Address.deserialize(i, this.universe, this.http)))
      } else if (options.rawPayload.addresses && !this.initialized) {
        this.addresses = options.rawPayload.addresses.map((i) => (Address.createUninitialized(i, this.universe, this.http)))
      }

      this.phonenumbers = []
      if (options.rawPayload.phonenumbers && this.initialized) {
        this.phonenumbers = options.rawPayload.phonenumbers.map((i) => (Phonenumber.deserialize(i, this.universe, this.http)))
      } else if (options.rawPayload.phonenumbers && !this.initialized) {
        this.phonenumbers = options.rawPayload.phonenumbers.map((i) => (Phonenumber.createUninitialized(i, this.universe, this.http)))
      }
    }
  }

  public static deserialize(payload: PersonRawPayload, universe: Universe, http: Universe['http']): Person {
    return new Person({ rawPayload: payload, universe, http })
  }

  public static createUninitialized(payload: PersonRawPayload, universe: Universe, http: Universe['http']): Person {
    return new Person({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize(): PersonRawPayload {
    return {
      id: this.id,
      first_name: this.firstName,
      middle_name: this.middleName,
      last_name: this.lastName,
      name: this.name,
      avatar: this.avatar,
      email: this.email,
      date_of_birth: this.dateOfBirth ? this.dateOfBirth.toISOString() : undefined,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      raw_payloads: this.rawPayloads,
      gender: this.gender || undefined,
      comment: this.comment || undefined,
      origins: this.origins,
      deleted: this.deleted,
      active: this.active,
      addresses: this.addresses,
      phonenumbers: this.phonenumbers
    }
  }

  private handleError(err: Error) {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }
}

export class Address extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: AddressOptions
  public initialized: boolean

  public readonly id?: string
  public readonly lines?: string[]
  public readonly locality?: string
  public readonly country?: string
  public readonly region?: string
  public readonly postalCode?: string
  public readonly type?: string
  public readonly createdAt?: Date | null
  public readonly updatedAt?: Date | null
  public readonly comment?: string
  public readonly deleted?: boolean
  public readonly active?: boolean

  constructor(options: AddressOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.id = options.rawPayload.id
      this.lines = options.rawPayload.lines
      this.locality = options.rawPayload.locality
      this.country = options.rawPayload.country
      this.region = options.rawPayload.region
      this.postalCode = options.rawPayload.postal_code
      this.type = options.rawPayload.type
      this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : undefined
      this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : undefined
      this.comment = options.rawPayload.comment
      this.deleted = options.rawPayload.deleted
      this.active = options.rawPayload.active
    }
  }

  public static deserialize(payload: AddressRawPayload, universe: Universe, http: Universe['http']): Address {
    return new Address({ rawPayload: payload, universe, http })
  }

  public static createUninitialized(payload: AddressRawPayload, universe: Universe, http: Universe['http']): Address {
    return new Address({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize(): AddressRawPayload {
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

  private handleError(err: Error) {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }
}

export class Phonenumber extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: PhonenumberOptions
  public initialized: boolean

  public readonly id?: string
  public readonly value?: string
  public readonly type?: string
  public readonly createdAt?: Date | null
  public readonly updatedAt?: Date | null
  public readonly comment?: string
  public readonly deleted?: boolean
  public readonly active?: boolean

  constructor(options: PhonenumberOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.id = options.rawPayload.id
      this.value = options.rawPayload.value
      this.type = options.rawPayload.type
      this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : undefined
      this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : undefined
      this.deleted = options.rawPayload.deleted
      this.active = options.rawPayload.active
    }
  }

  public static deserialize(payload: PhonenumberRawPayload, universe: Universe, http: Universe['http']): Phonenumber {
    return new Phonenumber({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized(payload: PhonenumberRawPayload, universe: Universe, http: Universe['http']): Phonenumber {
    return new Phonenumber({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize(): PhonenumberRawPayload {
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

  private handleError(err: Error) {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }
}
