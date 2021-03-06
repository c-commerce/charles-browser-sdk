import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import type { Cloud } from '../../index'

export interface UniversesPoolOptions extends EntityOptions {
  rawPayload?: UniversesPoolRawPayload
}

export interface UniversesPoolRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly status?: string
  readonly configuration?: string
}

export interface UniversesPoolPaylod {
  readonly id?: UniversesPoolRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: UniversesPoolRawPayload['deleted']
  readonly active?: UniversesPoolRawPayload['active']
  readonly name?: UniversesPoolRawPayload['name']
  readonly status?: UniversesPoolRawPayload['status']
  readonly configuration?: UniversesPoolRawPayload['configuration']
}

/**
 * Manage organizations.
 *
 * @category Entity
 */
export class UniversesPool extends Entity<UniversesPoolPaylod, UniversesPoolRawPayload> {
  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: UniversesPoolOptions
  public initialized: boolean

  public endpoint: string

  public id?: UniversesPoolPaylod['id']
  public createdAt?: UniversesPoolPaylod['createdAt']
  public updatedAt?: UniversesPoolPaylod['updatedAt']
  public deleted?: UniversesPoolPaylod['deleted']
  public active?: UniversesPoolPaylod['active']
  public name?: UniversesPoolPaylod['name']
  public status?: UniversesPoolPaylod['status']
  public configuration?: UniversesPoolPaylod['configuration']

  constructor (options: UniversesPoolOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/universes_pools'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: UniversesPoolRawPayload): UniversesPool {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.status = rawPayload.status
    this.configuration = rawPayload.configuration

    return this
  }

  public static create (payload: UniversesPoolRawPayload, carrier: Cloud, http: Cloud['http']): UniversesPool {
    return new UniversesPool({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): UniversesPoolRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      status: this.status,
      configuration: this.configuration
    }
  }

  public async init (): Promise<UniversesPool | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new UniversesPoolInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UniversesPools {
  public static endpoint: string = 'api/v0/universes_pools'
}

export class UniversesPoolInitializationError extends BaseError {
  public name = 'UniversesPoolInitializationError'
  constructor (public message: string = 'Could not initialize UniversesPool.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversesPoolInitializationError.prototype)
  }
}

export class UniversesPoolFetchRemoteError extends BaseError {
  public name = 'UniversesPoolFetchRemoteError'
  constructor (public message: string = 'Could not get UniversesPool.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversesPoolFetchRemoteError.prototype)
  }
}

export class UniversesPoolsFetchRemoteError extends BaseError {
  public name = 'UniversesPoolsFetchRemoteError'
  constructor (public message: string = 'Could not get universes pools.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversesPoolsFetchRemoteError.prototype)
  }
}
