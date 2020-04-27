
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ProductCategoryOptions extends EntityOptions {
  rawPayload?: ProductCategoryRawPayload
}

export interface ProductCategoryRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
}

export interface ProductCategoryPayload {
  readonly id?: ProductCategoryRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ProductCategoryRawPayload['deleted']
  readonly active?: ProductCategoryRawPayload['active']
}

/**
 * Manage product categories.
 *
 * @category Entity
 */
export class ProductCategory extends Entity<ProductCategoryPayload, ProductCategoryRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: ProductCategoryOptions
  public initialized: boolean

  public endpoint: string

  public id?: ProductCategoryPayload['id']
  public createdAt?: ProductCategoryPayload['createdAt']
  public updatedAt?: ProductCategoryPayload['updatedAt']
  public deleted?: ProductCategoryPayload['deleted']
  public active?: ProductCategoryPayload['active']

  constructor (options: ProductCategoryOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/product_categories'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ProductCategoryRawPayload): ProductCategory {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

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
      active: this.active ?? true
    }
  }

  public async init (): Promise<ProductCategory | undefined> {
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
