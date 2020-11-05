
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface LocationOptions extends EntityOptions {
  rawPayload?: LocationRawPayload
}

export interface LocationAddressOptions extends EntityOptions {
  rawPayload?: LocationAddressRawPayload
}

export interface LocationRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly description?: string
  readonly external_reference_id?: string
  readonly proxy_vendor?: 'shopify' | string
  readonly source_type?: 'shopify' | string
  readonly source_api?: 'shopify' | string
  readonly has_inventory?: boolean
  readonly use_inventory?: boolean
  readonly is_default?: boolean
  readonly addresses?: LocationAddressRawPayload[]
}

export interface LocationPayload {
  readonly id?: LocationRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: LocationRawPayload['deleted']
  readonly active?: LocationRawPayload['active']

  readonly name?: LocationRawPayload['name']
  readonly description?: LocationRawPayload['description']
  readonly externalReferenceId?: LocationRawPayload['external_reference_id']
  readonly proxyVendor?: LocationRawPayload['proxy_vendor']
  readonly sourceType?: LocationRawPayload['source_type']
  readonly sourceApi?: LocationRawPayload['source_api']
  readonly hasInventory?: LocationRawPayload['has_inventory']
  readonly useInventory?: LocationRawPayload['use_inventory']
  readonly isDefault?: LocationRawPayload['is_default']
  readonly addresses?: LocationRawPayload['addresses']

}
export interface LocationAddressPayload {
  readonly lines?: LocationAddressRawPayload['lines']
  readonly company?: LocationAddressRawPayload['company']
  readonly phone?: LocationAddressRawPayload['phone']
  readonly locality?: LocationAddressRawPayload['locality']
  readonly region?: LocationAddressRawPayload['region']
  readonly postalCode?: LocationAddressRawPayload['postal_code']
  readonly country?: LocationAddressRawPayload['country']
  readonly type?: LocationAddressRawPayload['type']
}
export interface LocationAddressRawPayload {
  readonly lines?: string[]
  readonly company?: string
  readonly phone?: string
  readonly locality?: string
  readonly region?: string
  readonly postal_code?: string
  readonly country?: string
  readonly type?: 'delivery' | 'billing' | 'generic' | string
}

/**
 * Manage locations.
 *
 * @category Entity
 */
export class Location extends Entity<LocationPayload, LocationRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: LocationOptions
  public initialized: boolean

  public endpoint: string

  public id?: LocationPayload['id']
  public createdAt?: LocationPayload['createdAt']
  public updatedAt?: LocationPayload['updatedAt']
  public deleted?: LocationPayload['deleted']
  public active?: LocationPayload['active']

  public name?: LocationPayload['name']
  public description?: LocationPayload['description']
  public externalReferenceId?: LocationPayload['externalReferenceId']
  public proxyVendor?: LocationPayload['proxyVendor']
  public sourceType?: LocationPayload['sourceType']
  public sourceApi?: LocationPayload['sourceApi']
  public hasInventory?: LocationPayload['hasInventory']
  public useInventory?: LocationPayload['useInventory']
  public isDefault?: LocationPayload['isDefault']
  public addresses?: LocationPayload['addresses']

  constructor (options: LocationOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/locations'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: LocationRawPayload): Location {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name
    this.description = rawPayload.description
    this.externalReferenceId = rawPayload.external_reference_id
    this.proxyVendor = rawPayload.proxy_vendor
    this.sourceType = rawPayload.source_type
    this.sourceApi = rawPayload.source_api
    this.hasInventory = rawPayload.has_inventory
    this.useInventory = rawPayload.use_inventory
    this.isDefault = rawPayload.is_default
    this.addresses = rawPayload.addresses

    return this
  }

  public static create (payload: LocationRawPayload, universe: Universe, http: Universe['http']): Location {
    return new Location({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): LocationRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      name: this.name,
      description: this.description,
      external_reference_id: this.externalReferenceId,
      proxy_vendor: this.proxyVendor,
      source_type: this.sourceType,
      source_api: this.sourceApi,
      has_inventory: this.hasInventory,
      use_inventory: this.useInventory,
      is_default: this.isDefault,
      addresses: this.addresses
    }
  }

  public async init (): Promise<Location | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new LocationInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Locations {
  public static endpoint: string = 'api/v0/locations'
}

export class LocationInitializationError extends BaseError {
  public name = 'LocationInitializationError'
  constructor (public message: string = 'Could not initialize location.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, LocationInitializationError.prototype)
  }
}

export class LocationFetchRemoteError extends BaseError {
  public name = 'LocationFetchRemoteError'
  constructor (public message: string = 'Could not get location.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, LocationFetchRemoteError.prototype)
  }
}

export class LocationsFetchRemoteError extends BaseError {
  public name = 'LocationsFetchRemoteError'
  constructor (public message: string = 'Could not get locations.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, LocationsFetchRemoteError.prototype)
  }
}
