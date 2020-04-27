
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ProductCategoryTreeOptions extends EntityOptions {
  rawPayload?: ProductCategoryTreeRawPayload
}

export interface ProductCategoryTreeRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
}

export interface ProductCategoryTreePayload {
  readonly id?: ProductCategoryTreeRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ProductCategoryTreeRawPayload['deleted']
  readonly active?: ProductCategoryTreeRawPayload['active']
}

/**
 * Manage product category trees.
 *
 * @category Entity
 */
export class ProductCategoryTree extends Entity<ProductCategoryTreePayload, ProductCategoryTreeRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: ProductCategoryTreeOptions
  public initialized: boolean

  public endpoint: string

  public id?: ProductCategoryTreePayload['id']
  public createdAt?: ProductCategoryTreePayload['createdAt']
  public updatedAt?: ProductCategoryTreePayload['updatedAt']
  public deleted?: ProductCategoryTreePayload['deleted']
  public active?: ProductCategoryTreePayload['active']

  constructor (options: ProductCategoryTreeOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/product_category_trees'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ProductCategoryTreeRawPayload): ProductCategoryTree {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    return this
  }

  public static create (payload: ProductCategoryTreeRawPayload, universe: Universe, http: Universe['http']): ProductCategoryTree {
    return new ProductCategoryTree({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ProductCategoryTreeRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true
    }
  }

  public async init (): Promise<ProductCategoryTree | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ProductCategoryTreeInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ProductCategoryTrees {
  public static endpoint: string = 'api/v0/product_category_trees'
}

export class ProductCategoryTreeInitializationError extends BaseError {
  public name = 'ProductCategoryTreeInitializationError'
  constructor (public message: string = 'Could not initialize product category tree.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductCategoryTreeInitializationError.prototype)
  }
}

export class ProductCategoryTreeFetchRemoteError extends BaseError {
  public name = 'ProductCategoryTreeFetchRemoteError'
  constructor (public message: string = 'Could not get product category tree.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductCategoryTreeFetchRemoteError.prototype)
  }
}

export class ProductCategoryTreesFetchRemoteError extends BaseError {
  public name = 'ProductCategoryTreesFetchRemoteError'
  constructor (public message: string = 'Could not get product category trees.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductCategoryTreesFetchRemoteError.prototype)
  }
}
