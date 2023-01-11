
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ProductCategoryOptions extends UniverseEntityOptions {
  rawPayload?: ProductCategoryRawPayload
}

export interface ProductCategoryRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly is_proxy?: boolean
  readonly name?: string
  readonly summary?: string
  readonly custom_id?: string
  readonly external_reference_id?: string
  readonly external_reference_custom_id?: string
  readonly proxy_vendor?: string
  readonly description?: string
  readonly comment?: string
  readonly storefront?: string
  readonly proxy_payload?: string
}

export interface ProductCategoryPayload {
  readonly id?: ProductCategoryRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ProductCategoryRawPayload['deleted']
  readonly active?: ProductCategoryRawPayload['active']

  readonly isProxy?: ProductCategoryRawPayload['is_proxy']
  readonly name?: ProductCategoryRawPayload['name']
  readonly summary?: ProductCategoryRawPayload['summary']
  readonly customId?: ProductCategoryRawPayload['custom_id']
  readonly externalReferenceId?: ProductCategoryRawPayload['external_reference_id']
  readonly externalReferenceCustomId?: ProductCategoryRawPayload['external_reference_custom_id']
  readonly proxyVendor?: ProductCategoryRawPayload['proxy_vendor']
  readonly description?: ProductCategoryRawPayload['description']
  readonly comment?: ProductCategoryRawPayload['comment']
  readonly storefront?: ProductCategoryRawPayload['storefront']
  readonly proxyPayload?: ProductCategoryRawPayload['proxy_payload']
}

/**
 * Manage product categories.
 *
 * @category Entity
 */
export class ProductCategory extends UniverseEntity<ProductCategoryPayload, ProductCategoryRawPayload> {
  public get entityName (): string {
    return 'product_category'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ProductCategoryOptions
  public initialized: boolean

  public endpoint: string

  public id?: ProductCategoryPayload['id']
  public createdAt?: ProductCategoryPayload['createdAt']
  public updatedAt?: ProductCategoryPayload['updatedAt']
  public deleted?: ProductCategoryPayload['deleted']
  public active?: ProductCategoryPayload['active']

  public isProxy?: ProductCategoryPayload['isProxy']
  public name?: ProductCategoryPayload['name']
  public summary?: ProductCategoryPayload['summary']
  public customId?: ProductCategoryPayload['customId']
  public externalReferenceId?: ProductCategoryPayload['externalReferenceId']
  public externalReferenceCustomId?: ProductCategoryPayload['externalReferenceCustomId']
  public proxyVendor?: ProductCategoryPayload['proxyVendor']
  public description?: ProductCategoryPayload['description']
  public comment?: ProductCategoryPayload['comment']
  public storefront?: ProductCategoryPayload['storefront']
  public proxyPayload?: ProductCategoryPayload['proxyPayload']

  constructor (options: ProductCategoryOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/product_categories'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ProductCategoryRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.isProxy = rawPayload.is_proxy
    this.name = rawPayload.name
    this.summary = rawPayload.summary
    this.customId = rawPayload.custom_id
    this.externalReferenceId = rawPayload.external_reference_id
    this.externalReferenceCustomId = rawPayload.external_reference_custom_id
    this.proxyVendor = rawPayload.proxy_vendor
    this.description = rawPayload.description
    this.comment = rawPayload.comment
    this.storefront = rawPayload.storefront
    this.proxyPayload = rawPayload.proxy_payload

    return this
  }

  public static create (payload: ProductCategoryRawPayload, universe: Universe, http: Universe['http']): ProductCategory {
    return new ProductCategory({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ProductCategoryRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      is_proxy: this.isProxy,
      name: this.name,
      summary: this.summary,
      custom_id: this.customId,
      external_reference_id: this.externalReferenceId,
      external_reference_custom_id: this.externalReferenceCustomId,
      proxy_vendor: this.proxyVendor,
      description: this.description,
      comment: this.comment,
      storefront: this.storefront,
      proxy_payload: this.proxyPayload
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ProductCategoryInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ProductCategories {
  public static endpoint: string = 'api/v0/product_categories'
}

export class ProductCategoryInitializationError extends BaseError {
  public name = 'ProductCategoryInitializationError'
  constructor (public message: string = 'Could not initialize product category.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductCategoryInitializationError.prototype)
  }
}

export class ProductCategoryFetchRemoteError extends BaseError {
  public name = 'ProductCategoryFetchRemoteError'
  constructor (public message: string = 'Could not get product category.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductCategoryFetchRemoteError.prototype)
  }
}

export class ProductCategoriesFetchRemoteError extends BaseError {
  public name = 'ProductCategoriesFetchRemoteError'
  constructor (public message: string = 'Could not get product categories.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductCategoriesFetchRemoteError.prototype)
  }
}
