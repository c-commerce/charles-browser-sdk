import Entity, { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface StorefrontScriptOptions extends UniverseEntityOptions {
  rawPayload?: StorefrontScriptRawPayload
}

export interface StorefrontScriptRawPayload {
  readonly id?: string
  readonly storefront?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly external_reference_id?: string
  readonly name?: string
  readonly src?: string
  readonly display_scope?: string
  readonly cache_enabled?: boolean
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string | any
  readonly configuration?: object | any
  readonly is_set_up?: boolean
  readonly metadata?: object | any
}

export interface StorefrontScriptPayload {
  readonly id?: StorefrontScriptRawPayload['id']
  readonly storefront?: StorefrontScriptRawPayload['storefront']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: StorefrontScriptRawPayload['deleted']
  readonly active?: StorefrontScriptRawPayload['active']
  readonly externalReferenceId?: StorefrontScriptRawPayload['external_reference_id']
  readonly name?: StorefrontScriptRawPayload['name']
  readonly src?: StorefrontScriptRawPayload['src']
  readonly displayScope?: StorefrontScriptRawPayload['display_scope']
  readonly cacheEnabled?: StorefrontScriptRawPayload['cache_enabled']
  readonly isProxy?: StorefrontScriptRawPayload['is_proxy']
  readonly proxyVendor?: StorefrontScriptRawPayload['proxy_vendor']
  readonly configuration?: StorefrontScriptRawPayload['configuration']
  readonly isSetUp?: StorefrontScriptRawPayload['is_set_up']
  readonly metadata?: StorefrontScriptRawPayload['metadata']
}

/**
 * Manage storefront scripts.
 *
 * @category Entity
 */
export class StorefrontScript extends UniverseEntity<StorefrontScriptPayload, StorefrontScriptRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: StorefrontScriptOptions
  public initialized: boolean

  public endpoint: string

  public id?: StorefrontScriptPayload['id']
  public storefront?: StorefrontScriptPayload['storefront']
  public createdAt?: StorefrontScriptPayload['createdAt']
  public updatedAt?: StorefrontScriptPayload['updatedAt']
  public deleted?: StorefrontScriptPayload['deleted']
  public active?: StorefrontScriptPayload['active']
  public externalReferenceId?: StorefrontScriptPayload['externalReferenceId']
  public name?: StorefrontScriptPayload['name']
  public src?: StorefrontScriptPayload['src']
  public displayScope?: StorefrontScriptPayload['displayScope']
  public cacheEnabled?: StorefrontScriptPayload['cacheEnabled']
  public isProxy?: StorefrontScriptPayload['isProxy']
  public proxyVendor?: StorefrontScriptPayload['proxyVendor']
  public configuration?: StorefrontScriptPayload['configuration']
  public isSetUp?: StorefrontScriptPayload['isSetUp']
  public metadata?: StorefrontScriptPayload['metadata']

  constructor (options: StorefrontScriptOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.endpoint = 'api/v0/storefronts/scripts'

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }

    if (options?.rawPayload?.storefront && options?.rawPayload?.storefront.length > 0) {
      this.endpoint = `api/v0/storefronts/${options?.rawPayload?.storefront}/scripts`
    }
  }

  protected deserialize (rawPayload: StorefrontScriptRawPayload): StorefrontScript {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.storefront = rawPayload.storefront
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.externalReferenceId = rawPayload.external_reference_id
    this.name = rawPayload.name
    this.src = rawPayload.src
    this.displayScope = rawPayload.display_scope
    this.cacheEnabled = rawPayload.cache_enabled
    this.isProxy = rawPayload.is_proxy
    this.proxyVendor = rawPayload.proxy_vendor
    this.configuration = rawPayload.configuration
    this.isSetUp = rawPayload.is_set_up
    this.metadata = rawPayload.metadata

    return this
  }

  public static create (payload: StorefrontScriptRawPayload, universe: Universe, http: Universe['http']): StorefrontScript {
    return new StorefrontScript({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): StorefrontScriptRawPayload {
    return {
      id: this.id,
      storefront: this.storefront,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      src: this.src,
      display_scope: this.displayScope,
      cache_enabled: this.cacheEnabled,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      configuration: this.configuration,
      is_set_up: this.isSetUp,
      metadata: this.metadata
    }
  }

  public async init (): Promise<StorefrontScript | undefined> {
    if (!this.storefront || this.storefront.length === 0) {
      throw new StorefrontScriptNoStorefrontError('Cannot init storefront script without a storefront"')
    }

    if (!this.id || this.id.length === 0) {
      throw new StorefrontScriptNoStorefrontError('Cannot init storefront script without an id"')
    }

    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new StorefrontScriptInitializationError(undefined, { error: err }))
    }
  }

  public async patch (changePart: StorefrontScriptRawPayload): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>> {
    if (!this.storefront || this.storefront.length === 0) {
      throw new StorefrontScriptNoStorefrontError('Cannot patch storefront script without a storefront"')
    }
    return await this._patch(changePart)
  }

  public async post (): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>> {
    if (!this.storefront || this.storefront.length === 0) {
      throw new StorefrontScriptNoStorefrontError('Cannot post storefront script without a storefront"')
    }
    return await this._post()
  }

  public async put (): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>> {
    if (!this.storefront || this.storefront.length === 0) {
      throw new StorefrontScriptNoStorefrontError('Cannot post storefront script without a storefront"')
    }
    return await this._put()
  }

  public async delete (): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>> {
    if (!this.storefront || this.storefront.length === 0) {
      throw new StorefrontScriptNoStorefrontError('Cannot post storefront script without a storefront"')
    }
    return await this._delete()
  }

  public async save (payload?: StorefrontScriptRawPayload): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>> {
    if (!this.storefront || this.storefront.length === 0) {
      throw new StorefrontScriptNoStorefrontError('Cannot post storefront script without a storefront"')
    }
    return await this._save(payload)
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class StorefrontScripts {
  public static endpoint: string = 'api/v0/storefronts/scripts'
}

export class StorefrontScriptNoStorefrontError extends BaseError {
  public name = 'StorefrontScriptNoStorefrontError'
  constructor (public message: string = 'Could not initialize storefront script without a storefront. (pass storefront id)', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontScriptNoStorefrontError.prototype)
  }
}

export class StorefrontScriptInitializationError extends BaseError {
  public name = 'StorefrontScriptInitializationError'
  constructor (public message: string = 'Could not initialize storefront script.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontScriptInitializationError.prototype)
  }
}

export class StorefrontScriptFetchRemoteError extends BaseError {
  public name = 'StorefrontScriptFetchRemoteError'
  constructor (public message: string = 'Could not get storefront script.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontScriptFetchRemoteError.prototype)
  }
}

export class StorefrontScriptsFetchRemoteError extends BaseError {
  public name = 'StorefrontScriptsFetchRemoteError'
  constructor (public message: string = 'Could not get storefront scripts.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontScriptsFetchRemoteError.prototype)
  }
}
