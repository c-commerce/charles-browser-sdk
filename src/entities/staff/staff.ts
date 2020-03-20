
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface StaffOptions extends EntityOptions {
  rawPayload?: StaffRawPayload
}

export interface StaffRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly first_name?: string
  readonly middle_name?: string
  readonly last_name?: string
  readonly display_name?: string
  readonly comment?: string
  readonly type?: 'agent' | 'bot'
}

export interface StaffPayload {
  readonly id?: StaffRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly firstName?: StaffRawPayload['first_name']
  readonly middleName?: StaffRawPayload['middle_name']
  readonly lastName?: StaffRawPayload['last_name']
  readonly comment?: StaffRawPayload['comment']
  readonly type?: StaffRawPayload['type']
}

export class Staff extends Entity<StaffPayload, StaffRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: StaffOptions
  public initialized: boolean

  public endpoint: string
  public id?: string
  public createdAt?: StaffPayload['createdAt']
  public updatedAt?: StaffPayload['updatedAt']
  public deleted?: StaffPayload['deleted']
  public active?: StaffPayload['active']
  public firstName?: StaffRawPayload['first_name']
  public middleName?: StaffRawPayload['middle_name']
  public lastName?: StaffRawPayload['last_name']
  public comment?: StaffRawPayload['comment']
  public type?: StaffRawPayload['type']

  constructor(options: StaffOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/staff'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize(rawPayload: StaffRawPayload): Staff {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted || false
    this.active = rawPayload.active || true
    this.firstName = rawPayload.first_name
    this.middleName = rawPayload.middle_name
    this.lastName = rawPayload.last_name
    this.comment = rawPayload.comment
    this.type = rawPayload.type

    return this
  }

  public static create(payload: StaffRawPayload, universe: Universe, http: Universe['http']): Staff {
    return new Staff({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): StaffRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted || false,
      active: this.active || true,
      first_name: this.firstName,
      middle_name: this.middleName,
      last_name: this.lastName,
      comment: this.comment,
      type: this.type
    }
  }

  public async init(): Promise<Staff | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new StaffInitializationError(undefined, { error: err }))
    }
  }

  public async fetch(): Promise<Staff | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id}`)

      this.deserialize(res.data.data[0] as StaffRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new StaffFetchRemoteError(undefined, { error: err }))
    }
  }
}

export class Staffs {
  public static endpoint: string = 'api/v0/staff'
}

export class StaffInitializationError extends BaseError {
  public name = 'StaffInitializationError'
  constructor(public message: string = 'Could not initialize staff.', properties?: any) {
    super(message, properties)
  }
}

export class StaffFetchRemoteError extends BaseError {
  public name = 'StaffFetchRemoteError'
  constructor(public message: string = 'Could not get staff.', properties?: any) {
    super(message, properties)
  }
}

export class StaffsFetchRemoteError extends BaseError {
  public name = 'StaffsFetchRemoteError'
  constructor(public message: string = 'Could not get staffs.', properties?: any) {
    super(message, properties)
  }
}
