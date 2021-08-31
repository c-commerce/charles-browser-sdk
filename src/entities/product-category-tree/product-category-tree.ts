
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ProductCategoryTreeOptions extends UniverseEntityOptions {
  rawPayload?: ProductCategoryTreeRawPayload
}

export interface ProductCategoryTreeRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly summary?: string
  readonly description?: string
  readonly children?: any[]
  readonly comment?: string
  readonly storefront?: string
  readonly configuration?: object
}

export interface ProductCategoryTreePayload {
  readonly id?: ProductCategoryTreeRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ProductCategoryTreeRawPayload['deleted']
  readonly active?: ProductCategoryTreeRawPayload['active']

  readonly name?: ProductCategoryTreeRawPayload['name']
  readonly summary?: ProductCategoryTreeRawPayload['summary']
  readonly description?: ProductCategoryTreeRawPayload['description']
  readonly children?: ProductCategoryTreeRawPayload['children']
  readonly comment?: ProductCategoryTreeRawPayload['comment']
  readonly storefront?: ProductCategoryTreeRawPayload['storefront']
  readonly configuration?: ProductCategoryTreeRawPayload['configuration']
}

/**
 * Manage product category trees.
 *
 * @category Entity
 */
export class ProductCategoryTree extends UniverseEntity<ProductCategoryTreePayload, ProductCategoryTreeRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ProductCategoryTreeOptions
  public initialized: boolean

  public endpoint: string

  public id?: ProductCategoryTreePayload['id']
  public createdAt?: ProductCategoryTreePayload['createdAt']
  public updatedAt?: ProductCategoryTreePayload['updatedAt']
  public deleted?: ProductCategoryTreePayload['deleted']
  public active?: ProductCategoryTreePayload['active']

  public name?: ProductCategoryTreePayload['name']
  public summary?: ProductCategoryTreePayload['summary']
  public description?: ProductCategoryTreePayload['description']
  public children?: ProductCategoryTreePayload['children']
  public comment?: ProductCategoryTreePayload['comment']
  public storefront?: ProductCategoryTreePayload['storefront']
  public configuration?: ProductCategoryTreePayload['configuration']

  constructor (options: ProductCategoryTreeOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
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

    this.name = rawPayload.name
    this.summary = rawPayload.summary
    this.description = rawPayload.description
    this.children = rawPayload.children
    this.comment = rawPayload.comment
    this.storefront = rawPayload.storefront
    this.configuration = rawPayload.configuration

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
      active: this.active ?? true,

      name: this.name,
      summary: this.summary,
      description: this.description,
      children: this.children,
      comment: this.comment,
      storefront: this.storefront,
      configuration: this.configuration
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
