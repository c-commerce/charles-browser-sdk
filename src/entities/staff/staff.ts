
import { EventEmitter } from 'events'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface StaffOptions {
  universe: Universe
  http: Universe['http']
  rawPayload?: StaffRawPayload
  initialized?: boolean
}

export interface StaffRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
}

export interface StaffPayload {
  readonly id?: StaffRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
}

export class Staff extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: StaffOptions
  public initialized: boolean

  public endpoint: string
  public id?: string
  public createdAt?: StaffPayload['createdAt']
  public updatedAt?: StaffPayload['updatedAt']

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

  private deserialize(rawPayload: StaffRawPayload): Staff {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined

    return this
  }

  public static create(payload: StaffRawPayload, universe: Universe, http: Universe['http']): Staff {
    return new Staff({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): StaffRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined
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

  private handleError(err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
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
