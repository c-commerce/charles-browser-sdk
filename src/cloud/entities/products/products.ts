import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import type { Cloud } from '../../index'

export interface ProductOptions extends EntityOptions {
  rawPayload?: ProductRawPayload
}

export interface ProductRawPayload {
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

export interface ProductPayload {
  readonly id?: ProductRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ProductRawPayload['deleted']
  readonly active?: ProductRawPayload['active']
  readonly name?: ProductRawPayload['name']
  readonly status?: ProductRawPayload['status']
  readonly configuration?: ProductRawPayload['configuration']
  readonly channel?: ProductRawPayload['channel']
  readonly defaultDisplayName?: ProductRawPayload['default_display_name']
}

/**
 * Manage organizations.
 *
 * @category Entity
 */
export class Product extends Entity<ProductPayload, ProductRawPayload> {
  public get entityName (): string {
    return 'products'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: ProductOptions
  public initialized: boolean

  public endpoint: string

  public id?: ProductPayload['id']
  public createdAt?: ProductPayload['createdAt']
  public updatedAt?: ProductPayload['updatedAt']
  public deleted?: ProductPayload['deleted']
  public active?: ProductPayload['active']
  public name?: ProductPayload['name']
  public status?: ProductPayload['status']
  public configuration?: ProductPayload['configuration']
  public channel?: ProductPayload['channel']
  public defaultDisplayName?: ProductPayload['defaultDisplayName']

  constructor (options: ProductOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/products'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ProductRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.status = rawPayload.status
    this.configuration = rawPayload.configuration
    this.channel = rawPayload.channel
    this.defaultDisplayName = rawPayload.default_display_name

    return this
  }

  public static create (payload: ProductRawPayload, carrier: Cloud, http: Cloud['http']): Product {
    return new Product({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): ProductRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      status: this.status,
      configuration: this.configuration,
      channel: this.channel,
      default_display_name: this.defaultDisplayName
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ProductInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Products {
  public static endpoint: string = 'api/v0/products'
}

export class ProductInitializationError extends BaseError {
  public name = 'ProductInitializationError'
  constructor (public message: string = 'Could not initialize Product.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductInitializationError.prototype)
  }
}

export class ProductFetchRemoteError extends BaseError {
  public name = 'ProductFetchRemoteError'
  constructor (public message: string = 'Could not get Product.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductFetchRemoteError.prototype)
  }
}

export class ProductsFetchRemoteError extends BaseError {
  public name = 'ProductsFetchRemoteError'
  constructor (public message: string = 'Could not get products.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsFetchRemoteError.prototype)
  }
}
