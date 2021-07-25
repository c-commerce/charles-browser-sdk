import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import type { Cloud } from '../../index'

export interface ReleaseOptions extends EntityOptions {
  rawPayload?: ReleaseRawPayload
}

export interface ReleaseRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly status?: string
  readonly configuration?: {
    [key: string]: any
  }
  readonly product?: string
  readonly product_name?: string
  readonly channel?: string
  readonly default_display_name?: string
}

export interface ReleasePaylod {
  readonly id?: ReleaseRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ReleaseRawPayload['deleted']
  readonly active?: ReleaseRawPayload['active']
  readonly name?: ReleaseRawPayload['name']
  readonly status?: ReleaseRawPayload['status']
  readonly configuration?: ReleaseRawPayload['configuration']
  readonly product?: ReleaseRawPayload['product']
  readonly productName?: ReleaseRawPayload['product_name']
  readonly channel?: ReleaseRawPayload['channel']
  readonly defaultDisplayName?: ReleaseRawPayload['default_display_name']
}

/**
 * Manage organizations.
 *
 * @category Entity
 */
export class Release extends Entity<ReleasePaylod, ReleaseRawPayload> {
  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: ReleaseOptions
  public initialized: boolean

  public endpoint: string

  public id?: ReleasePaylod['id']
  public createdAt?: ReleasePaylod['createdAt']
  public updatedAt?: ReleasePaylod['updatedAt']
  public deleted?: ReleasePaylod['deleted']
  public active?: ReleasePaylod['active']
  public name?: ReleasePaylod['name']
  public status?: ReleasePaylod['status']
  public configuration?: ReleasePaylod['configuration']
  public product?: ReleasePaylod['product']
  public productName?: ReleasePaylod['productName']
  public channel?: ReleasePaylod['channel']
  public defaultDisplayName?: ReleasePaylod['defaultDisplayName']

  constructor (options: ReleaseOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/releases'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ReleaseRawPayload): Release {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.status = rawPayload.status
    this.configuration = rawPayload.configuration
    this.product = rawPayload.product
    this.productName = rawPayload.product_name
    this.channel = rawPayload.channel
    this.defaultDisplayName = rawPayload.default_display_name

    return this
  }

  public static create (payload: ReleaseRawPayload, carrier: Cloud, http: Cloud['http']): Release {
    return new Release({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): ReleaseRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      status: this.status,
      configuration: this.configuration,
      product: this.product,
      product_name: this.productName,
      channel: this.channel,
      default_display_name: this.defaultDisplayName
    }
  }

  public async init (): Promise<Release | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ReleaseInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Releases {
  public static endpoint: string = 'api/v0/releases'
}

export class ReleaseInitializationError extends BaseError {
  public name = 'ReleaseInitializationError'
  constructor (public message: string = 'Could not initialize Release.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ReleaseInitializationError.prototype)
  }
}

export class ReleaseFetchRemoteError extends BaseError {
  public name = 'ReleaseFetchRemoteError'
  constructor (public message: string = 'Could not get Release.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ReleaseFetchRemoteError.prototype)
  }
}

export class ReleasesFetchRemoteError extends BaseError {
  public name = 'ReleasesFetchRemoteError'
  constructor (public message: string = 'Could not get releases.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ReleasesFetchRemoteError.prototype)
  }
}
