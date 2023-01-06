
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import {
  StorefrontScript,
  StorefrontScriptRawPayload,
  StorefrontScriptsFetchRemoteError
} from './storefront-script'

export interface StorefrontOptions extends UniverseEntityOptions {
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
export class Storefront extends UniverseEntity<StorefrontPayload, StorefrontRawPayload> {
  public get entityName (): string {
    return 'storefronts'
  }

  protected universe: Universe
  protected apiCarrier: Universe
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
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/storefronts'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: StorefrontRawPayload): this {
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

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new StorefrontInitializationError(undefined, { error: err }))
    }
  }

  public async setup (): Promise<number> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront setup requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/setup`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw new StorefrontSetupRemoteError(undefined, { error: err })
    }
  }

  public async syncProducts (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront syncProducts requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/products`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new StorefrontSyncProductsRemoteError(undefined, { error: err }))
    }
  }

  public async syncOrders (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront syncOrders requires id to be set.')
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/orders`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new StorefrontSyncOrdersRemoteError(undefined, { error: err }))
    }
  }

  public async syncChannelUser (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront syncChannelUser requires id to be set.')
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/channel_users`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new StorefrontSyncChanelUserRemoteError(undefined, { error: err }))
    }
  }

  public async syncInventories (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront syncInventories requires id to be set.')
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/inventories`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new StorefrontSyncInventoriesRemoteError(undefined, { error: err }))
    }
  }

  public async syncLocations (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront syncLocations requires id to be set.')
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/locations`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new StorefrontSyncLocationsRemoteError(undefined, { error: err }))
    }
  }

  public async syncProductCategories (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront syncProductCategories requires id to be set.')
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/product_categories`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new StorefrontSyncProductCategoriesRemoteError(undefined, { error: err }))
    }
  }

  public async syncShippingMethods (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront syncShippingMethods requires id to be set.')
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/shipping_methods`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new StorefrontSyncShippingMethodsRemoteError(undefined, { error: err }))
    }
  }

  public async getScripts (options?: EntityFetchOptions): Promise<StorefrontScript[] | StorefrontScriptRawPayload[] | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront getScripts requires id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/scripts`,
        params: {
          ...(options?.query ?? {}),
          embed: options?.query?.embed ?? 'options'
        }
      }
      const res = await this.http.getClient()(opts)
      const resources = res.data.data as StorefrontScriptRawPayload[]

      if (options && options.raw === true) {
        return resources
      }

      return resources.map((resource: StorefrontScriptRawPayload) => {
        return StorefrontScript.create(resource, this.universe, this.http)
      })
    } catch (err) {
      throw new StorefrontScriptsFetchRemoteError(undefined, { error: err })
    }
  }

  public async uninstall (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('storefront uninstall requires id to be set.')
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/uninstall`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json',
        timeout: 60000
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new StorefrontUninstallRemoteError(undefined, { error: err }))
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
export class StorefrontSyncProductsRemoteError extends BaseError {
  public name = 'StorefrontSyncProductsRemoteError'
  constructor (public message: string = 'Could not sync products of storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontSyncProductsRemoteError.prototype)
  }
}
export class StorefrontSyncOrdersRemoteError extends BaseError {
  public name = 'StorefrontSyncOrdersRemoteError'
  constructor (public message: string = 'Could not sync orders of storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontSyncOrdersRemoteError.prototype)
  }
}
export class StorefrontSyncChanelUserRemoteError extends BaseError {
  public name = 'StorefrontSyncChanelUserRemoteError'
  constructor (public message: string = 'Could not sync channel user of storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontSyncOrdersRemoteError.prototype)
  }
}
export class StorefrontSyncInventoriesRemoteError extends BaseError {
  public name = 'StorefrontSyncInventoriesRemoteError'
  constructor (public message: string = 'Could not sync inventories of storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontSyncInventoriesRemoteError.prototype)
  }
}
export class StorefrontSyncShippingMethodsRemoteError extends BaseError {
  public name = 'StorefrontSyncInventoriesRemoteError'
  constructor (public message: string = 'Could not sync shipping methods of storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontSyncShippingMethodsRemoteError.prototype)
  }
}
export class StorefrontSetupRemoteError extends BaseError {
  public name = 'StorefrontSetupRemoteError'
  constructor (public message: string = 'Could not setup storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontSetupRemoteError.prototype)
  }
}

export class StorefrontUninstallRemoteError extends BaseError {
  public name = 'StorefrontUninstallRemoteError'
  constructor (public message: string = 'Could not uninstall storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontUninstallRemoteError.prototype)
  }
}

export class StorefrontSyncLocationsRemoteError extends BaseError {
  public name = 'StorefrontSyncLocationsRemoteError'
  constructor (public message: string = 'Could not sync locations of storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontSyncLocationsRemoteError.prototype)
  }
}

export class StorefrontSyncProductCategoriesRemoteError extends BaseError {
  public name = 'StorefrontSyncProductCategoriesRemoteError'
  constructor (public message: string = 'Could not sync product categories of storefront.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontSyncLocationsRemoteError.prototype)
  }
}
