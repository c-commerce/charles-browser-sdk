
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface StorefrontOptions extends EntityOptions {
  rawPayload?: StorefrontRawPayload
}

export interface StorefrontRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly uri?: string
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string | any
  readonly configuration?: object | any
  readonly integration_configuration?: string | any
  readonly is_set_up?: boolean
  readonly metadata?: object | any
}

export interface StorefrontPayload {
  readonly id?: StorefrontRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: StorefrontRawPayload['deleted']
  readonly active?: StorefrontRawPayload['active']
  readonly name?: StorefrontRawPayload['name']
  readonly uri?: StorefrontRawPayload['uri']
  readonly isProxy?: StorefrontRawPayload['is_proxy']
  readonly proxyVendor?: StorefrontRawPayload['proxy_vendor']
  readonly configuration?: StorefrontRawPayload['configuration']
  readonly integrationConfiguration?: StorefrontRawPayload['integration_configuration']
  readonly isSetUp?: StorefrontRawPayload['is_set_up']
  readonly metadata?: StorefrontRawPayload['metadata']
}

/**
 * Manage storefronts.
 *
 * @category Entity
 */
export class Storefront extends Entity<StorefrontPayload, StorefrontRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: StorefrontOptions
  public initialized: boolean

  public endpoint: string

  public id?: StorefrontPayload['id']
  public createdAt?: StorefrontPayload['createdAt']
  public updatedAt?: StorefrontPayload['updatedAt']
  public deleted?: StorefrontPayload['deleted']
  public active?: StorefrontPayload['active']
  public name?: StorefrontPayload['name']
  public uri?: StorefrontPayload['uri']
  public isProxy?: StorefrontPayload['isProxy']
  public proxyVendor?: StorefrontPayload['proxyVendor']
  public configuration?: StorefrontPayload['configuration']
  public integrationConfiguration?: StorefrontPayload['integrationConfiguration']
  public isSetUp?: StorefrontPayload['isSetUp']
  public metadata?: StorefrontPayload['metadata']

  constructor (options: StorefrontOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/storefronts'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: StorefrontRawPayload): Storefront {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.uri = rawPayload.uri
    this.isProxy = rawPayload.is_proxy
    this.proxyVendor = rawPayload.proxy_vendor
    this.configuration = rawPayload.configuration
    this.integrationConfiguration = rawPayload.integration_configuration
    this.isSetUp = rawPayload.is_set_up
    this.metadata = rawPayload.metadata

    return this
  }

  public static create (payload: StorefrontRawPayload, universe: Universe, http: Universe['http']): Storefront {
    return new Storefront({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): StorefrontRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      uri: this.uri,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      configuration: this.configuration,
      integration_configuration: this.integrationConfiguration,
      is_set_up: this.isSetUp,
      metadata: this.metadata
    }
  }

  public async init (): Promise<Storefront | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new StorefrontInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Storefronts {
  public static endpoint: string = 'api/v0/storefronts'
}

export class StorefrontInitializationError extends BaseError {
  public name = 'StorefrontInitializationError'
  constructor (public message: string = 'Could not initialize storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontInitializationError.prototype)
  }
}

export class StorefrontFetchRemoteError extends BaseError {
  public name = 'StorefrontFetchRemoteError'
  constructor (public message: string = 'Could not get storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontFetchRemoteError.prototype)
  }
}

export class StorefrontsFetchRemoteError extends BaseError {
  public name = 'StorefrontsFetchRemoteError'
  constructor (public message: string = 'Could not get storefronts.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsFetchRemoteError.prototype)
  }
}
