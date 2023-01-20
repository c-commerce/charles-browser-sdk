
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface InventoryOptions extends UniverseEntityOptions {
  rawPayload?: InventoryRawPayload
}

export interface InventoryRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly product?: string
  readonly location?: string | null
  readonly external_reference_id?: string | null
  readonly source_api?: string | null
  readonly source_type?: string | null
  readonly proxy_vendor?: string | null
  readonly is_proxy?: boolean
  readonly qty?: number
}

export interface InventoryPayload {
  readonly id?: InventoryRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: InventoryRawPayload['deleted']
  readonly product?: InventoryRawPayload['product']
  readonly location?: InventoryRawPayload['location']
  readonly externalReferenceId?: InventoryRawPayload['external_reference_id']
  readonly sourceApi?: InventoryRawPayload['source_api']
  readonly sourceType?: InventoryRawPayload['source_type']
  readonly proxyVendor?: InventoryRawPayload['proxy_vendor']
  readonly isProxy?: InventoryRawPayload['is_proxy']
  readonly qty?: InventoryRawPayload['qty']
}

/**
 * Manage inventories.
 *
 * @category Entity
 */
export class Inventory extends UniverseEntity<InventoryPayload, InventoryRawPayload> {
  public get entityName (): string {
    return 'inventory'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: InventoryOptions
  public initialized: boolean

  public endpoint: string

  public id?: InventoryPayload['id']
  public createdAt?: InventoryPayload['createdAt']
  public updatedAt?: InventoryPayload['updatedAt']
  public deleted?: InventoryPayload['deleted']
  public product?: InventoryPayload['product']
  public location?: InventoryPayload['location']
  public externalReferenceId?: InventoryPayload['externalReferenceId']
  public sourceApi?: InventoryPayload['sourceApi']
  public sourceType?: InventoryPayload['sourceType']
  public proxyVendor?: InventoryPayload['proxyVendor']
  public isProxy?: InventoryPayload['isProxy']
  public qty?: InventoryPayload['qty']

  constructor (options: InventoryOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/inventories'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: InventoryRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.product = rawPayload.product
    this.location = rawPayload.location
    this.externalReferenceId = rawPayload.external_reference_id
    this.sourceApi = rawPayload.source_api
    this.sourceType = rawPayload.source_type
    this.proxyVendor = rawPayload.proxy_vendor
    this.isProxy = rawPayload.is_proxy
    this.qty = rawPayload.qty

    return this
  }

  public static create (payload: InventoryRawPayload, universe: Universe, http: Universe['http']): Inventory {
    return new Inventory({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): InventoryRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      product: this.product,
      location: this.location,
      external_reference_id: this.externalReferenceId,
      source_api: this.sourceApi,
      source_type: this.sourceType,
      proxy_vendor: this.proxyVendor,
      is_proxy: this.isProxy,
      qty: this.qty
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new InventoryInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Inventories {
  public static endpoint: string = 'api/v0/inventories'
}

export class InventoryInitializationError extends BaseError {
  public name = 'InventoryInitializationError'
  constructor (public message: string = 'Could not initialize inventory.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, InventoryInitializationError.prototype)
  }
}

export class InventoryFetchRemoteError extends BaseError {
  public name = 'InventoryFetchRemoteError'
  constructor (public message: string = 'Could not get inventory.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, InventoryFetchRemoteError.prototype)
  }
}

export class InventoriesFetchRemoteError extends BaseError {
  public name = 'InventoriesFetchRemoteError'
  constructor (public message: string = 'Could not get inventories.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, InventoriesFetchRemoteError.prototype)
  }
}
