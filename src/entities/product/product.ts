
import Entity, { EntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { Inventory, InventoryRawPayload } from '../inventory'
import { BaseError } from '../../errors'

export interface ProductOptions extends EntityOptions {
  rawPayload?: ProductRawPayload
}

export interface ProductRawPayloadPrice {
  readonly calculatory_base_price?: number
  readonly calculatory_margin?: number
  readonly calculatory_cost_and_expense?: number
  readonly amount?: {
    net: number
    gross: number
  }
  readonly vat_class?: string
  readonly custom_vat_rate?: number
  readonly currency?: string
  readonly tax_country?: string
  readonly tax_region?: string
}

export interface ProductRawPayloadChild {
  readonly id?: ProductRawPayload['id']
  readonly name?: ProductRawPayload['name']
  readonly custom_id?: ProductRawPayload['custom_id']
  readonly attributes?: ProductRawPayload['attributes']
}

export interface ProductRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly custom_id?: string
  readonly name?: string
  readonly summary?: string
  readonly description?: string
  readonly brand?: string
  readonly assets?: string[]
  readonly assets_config?: object
  readonly condition?: string
  readonly manufacturers?: string[]
  readonly suppliers?: string[]
  readonly produced_at?: string
  readonly purchased_at?: string
  readonly released_at?: string
  readonly similar_to?: string[]
  readonly related_to?: string[]
  readonly audiences?: string[]
  readonly keywords?: string[]
  readonly categories?: string[]
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string
  readonly type?: string
  readonly attributes?: object
  readonly sku?: string
  readonly stock_minimum?: number
  readonly stock_maximum?: number
  readonly stockable?: boolean
  readonly parent?: string
  readonly seasons?: string
  readonly tags?: string[]
  readonly codes?: object[]
  readonly i18n?: object[]
  readonly external_reference_id?: string
  readonly external_reference_custom_id?: string
  readonly client_id?: string
  readonly discountable?: boolean
  readonly linkable?: boolean
  readonly is_service?: boolean
  readonly warranty_notice?: string
  readonly refund_policy?: string
  readonly disclaimer?: string
  readonly offline_available?: boolean
  readonly online_available?: boolean
  readonly shipping_required?: boolean
  readonly proxy_configuration?: object
  readonly inventory_external_reference_id?: string | null
  readonly links?: null | {
    external?: string | null
  }
  readonly metadata?: object
  readonly prices?: {
    default_prices: ProductRawPayloadPrice[]
  }

  /* Embeddable */
  readonly children?: ProductRawPayloadChild[]
  readonly options?: object[]
}

export interface ProductPayload {
  readonly id?: ProductRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly custom_id?: string
  readonly name?: string
  readonly summary?: string
  readonly description?: string
  readonly brand?: string
  readonly assets?: string[]
  readonly assets_config?: object
  readonly condition?: string
  readonly manufacturers?: string[]
  readonly suppliers?: string[]
  readonly produced_at?: Date | null
  readonly purchased_at?: Date | null
  readonly released_at?: Date | null
  readonly similar_to?: string[]
  readonly related_to?: string[]
  readonly audiences?: string[]
  readonly keywords?: string[]
  readonly categories?: string[]
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string
  readonly type?: string
  readonly attributes?: object
  readonly sku?: string
  readonly stock_minimum?: number
  readonly stock_maximum?: number
  readonly stockable?: boolean
  readonly parent?: string
  readonly seasons?: string
  readonly tags?: string[]
  readonly codes?: object[]
  readonly i18n?: object[]
  readonly external_reference_id?: string
  readonly external_reference_custom_id?: string
  readonly client_id?: string
  readonly discountable?: boolean
  readonly linkable?: boolean
  readonly is_service?: boolean
  readonly warranty_notice?: string
  readonly refund_policy?: string
  readonly disclaimer?: string
  readonly offline_available?: boolean
  readonly online_available?: boolean
  readonly shipping_required?: boolean
  readonly proxy_configuration?: object
  readonly inventoryExternalReferenceId?: ProductRawPayload['inventory_external_reference_id']
  readonly links?: ProductRawPayload['links']
  readonly metadata?: object
  readonly prices?: ProductRawPayload['prices']

  /* Embeddable */
  readonly children?: ProductRawPayload['children']
  readonly options?: ProductRawPayload['options']
}

/**
 * Manage prodcucts.
 *
 * @category Entity
 */
export class Product extends Entity<ProductPayload, ProductRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: ProductOptions
  public initialized: boolean

  public endpoint: string

  public id?: ProductPayload['id']
  public createdAt?: ProductPayload['createdAt']
  public updatedAt?: ProductPayload['updatedAt']
  public deleted?: ProductPayload['deleted']
  public active?: ProductPayload['active']
  public customId?: ProductPayload['custom_id']
  public name?: ProductPayload['name']
  public summary?: ProductPayload['summary']
  public description?: ProductPayload['description']
  /**
   * Prices of a product.
   */
  public prices?: ProductPayload['prices']
  public brand?: ProductPayload['brand']
  public assets?: ProductPayload['assets']
  public assetsConfig?: ProductPayload['assets_config']
  public condition?: ProductPayload['condition']
  public manufacturers?: ProductPayload['manufacturers']
  public suppliers?: ProductPayload['suppliers']
  public producedAt?: ProductPayload['produced_at']
  public purchasedAt?: ProductPayload['purchased_at']
  public releasedAt?: ProductPayload['released_at']
  public similarTo?: ProductPayload['similar_to']
  public relatedTo?: ProductPayload['related_to']
  public audiences?: ProductPayload['audiences']
  public keywords?: ProductPayload['keywords']
  public categories?: ProductPayload['categories']
  public isProxy?: ProductPayload['is_proxy']
  public proxyVendor?: ProductPayload['proxy_vendor']
  public type?: ProductPayload['type']
  public attributes?: ProductPayload['attributes']
  public sku?: ProductPayload['sku']
  public stockMinimum?: ProductPayload['stock_minimum']
  public stockMaximum?: ProductPayload['stock_maximum']
  public stockable?: ProductPayload['stockable']
  public parent?: ProductPayload['parent']
  public seasons?: ProductPayload['seasons']
  public tags?: ProductPayload['tags']
  public codes?: ProductPayload['codes']
  public i18n?: ProductPayload['i18n']
  public externalReferenceId?: ProductPayload['external_reference_id']
  public externalReferenceCustomId?: ProductPayload['external_reference_custom_id']
  public clientId?: ProductPayload['client_id']
  public discountable?: ProductPayload['discountable']
  public linkable?: ProductPayload['linkable']
  public isService?: ProductPayload['is_service']
  public warrantyNotice?: ProductPayload['warranty_notice']
  public refundPolicy?: ProductPayload['refund_policy']
  public disclaimer?: ProductPayload['disclaimer']
  public offlineAvailable?: ProductPayload['offline_available']
  public onlineAvailable?: ProductPayload['online_available']
  public shippingFequired?: ProductPayload['shipping_required']
  public proxyConfiguration?: ProductPayload['proxy_configuration']
  public inventoryExternalReferenceId?: ProductPayload['inventoryExternalReferenceId']
  public links?: ProductPayload['links']
  public metadata?: ProductPayload['metadata']

  public children?: ProductPayload['children']
  public attributesOptions?: ProductPayload['options']

  constructor (options: ProductOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/products'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ProductRawPayload): Product {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.customId = rawPayload.custom_id
    this.name = rawPayload.name
    this.summary = rawPayload.summary
    this.description = rawPayload.description
    this.brand = rawPayload.brand
    this.assets = rawPayload.assets
    this.assetsConfig = rawPayload.assets_config
    this.condition = rawPayload.condition
    this.manufacturers = rawPayload.manufacturers
    this.suppliers = rawPayload.suppliers
    this.producedAt = rawPayload.produced_at ? new Date(rawPayload.produced_at) : undefined
    this.purchasedAt = rawPayload.purchased_at ? new Date(rawPayload.purchased_at) : undefined
    this.releasedAt = rawPayload.released_at ? new Date(rawPayload.released_at) : undefined
    this.similarTo = rawPayload.similar_to
    this.relatedTo = rawPayload.related_to
    this.audiences = rawPayload.audiences
    this.keywords = rawPayload.keywords
    this.categories = rawPayload.categories
    this.isProxy = rawPayload.is_proxy ?? false
    this.proxyVendor = rawPayload.proxy_vendor
    this.type = rawPayload.type
    this.attributes = rawPayload.attributes
    this.sku = rawPayload.sku
    this.stockMinimum = rawPayload.stock_minimum
    this.stockMaximum = rawPayload.stock_maximum
    this.stockable = rawPayload.stockable ?? true
    this.parent = rawPayload.parent
    this.seasons = rawPayload.seasons
    this.tags = rawPayload.tags
    this.codes = rawPayload.codes
    this.i18n = rawPayload.i18n
    this.externalReferenceId = rawPayload.external_reference_id
    this.externalReferenceCustomId = rawPayload.external_reference_custom_id
    this.clientId = rawPayload.client_id
    this.discountable = rawPayload.discountable ?? false
    this.linkable = rawPayload.linkable ?? false
    this.isService = rawPayload.is_service ?? false
    this.warrantyNotice = rawPayload.warranty_notice
    this.refundPolicy = rawPayload.refund_policy
    this.disclaimer = rawPayload.disclaimer
    this.offlineAvailable = rawPayload.offline_available ?? false
    this.onlineAvailable = rawPayload.online_available ?? true
    this.shippingFequired = rawPayload.shipping_required ?? true
    this.proxyConfiguration = rawPayload.proxy_configuration
    this.inventoryExternalReferenceId = rawPayload.inventory_external_reference_id
    this.links = rawPayload.links
    this.metadata = rawPayload.metadata
    this.prices = rawPayload.prices

    /* Embeddable */
    this.children = rawPayload.children
    this.attributesOptions = rawPayload.options

    return this
  }

  public static create (payload: ProductRawPayload, universe: Universe, http: Universe['http']): Product {
    return new Product({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ProductRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      custom_id: this.customId,
      name: this.name,
      summary: this.summary,
      description: this.description,
      brand: this.brand,
      assets: this.assets,
      assets_config: this.assetsConfig,
      condition: this.condition,
      manufacturers: this.manufacturers,
      suppliers: this.suppliers,
      produced_at: this.producedAt ? this.producedAt.toISOString() : undefined,
      purchased_at: this.purchasedAt ? this.purchasedAt.toISOString() : undefined,
      released_at: this.releasedAt ? this.releasedAt.toISOString() : undefined,
      similar_to: this.similarTo,
      related_to: this.relatedTo,
      audiences: this.audiences,
      keywords: this.keywords,
      categories: this.categories,
      is_proxy: this.isProxy ?? false,
      proxy_vendor: this.proxyVendor,
      type: this.type,
      attributes: this.attributes,
      sku: this.sku,
      stock_minimum: this.stockMinimum,
      stock_maximum: this.stockMaximum,
      stockable: this.stockable ?? true,
      parent: this.parent,
      seasons: this.seasons,
      tags: this.tags,
      codes: this.codes,
      i18n: this.i18n,
      external_reference_id: this.externalReferenceId,
      external_reference_custom_id: this.externalReferenceCustomId,
      client_id: this.clientId,
      discountable: this.discountable ?? false,
      linkable: this.linkable ?? false,
      is_service: this.isService ?? false,
      warranty_notice: this.warrantyNotice,
      refund_policy: this.refundPolicy,
      disclaimer: this.disclaimer,
      offline_available: this.offlineAvailable ?? false,
      online_available: this.onlineAvailable ?? true,
      shipping_required: this.shippingFequired ?? true,
      proxy_configuration: this.proxyConfiguration,
      inventory_external_reference_id: this.inventoryExternalReferenceId,
      links: this.links,
      metadata: this.metadata,
      prices: this.prices,
      children: this.children,
      options: this.attributesOptions
    }
  }

  public async init (): Promise<Product | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ProductInitializationError(undefined, { error: err }))
    }
  }

  public async inventory (): Promise<Inventory[] | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id as string}/inventory`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      const resources = response.data.data as InventoryRawPayload[]

      return resources.map((resource: InventoryRawPayload) => {
        return Inventory.create(resource, this.universe, this.http)
      })
    } catch (err) {
      throw this.handleError(new ProductInventoryError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Products {
  public static endpoint: string = 'api/v0/products'
}

export class ProductInitializationError extends BaseError {
  public name = 'ProductInitializationError'
  constructor (public message: string = 'Could not initialize product.', properties?: any) {
    super(message, properties)
  }
}

export class ProductFetchRemoteError extends BaseError {
  public name = 'ProductFetchRemoteError'
  constructor (public message: string = 'Could not get product.', properties?: any) {
    super(message, properties)
  }
}

export class ProductsFetchRemoteError extends BaseError {
  public name = 'ProductsFetchRemoteError'
  constructor (public message: string = 'Could not get products.', properties?: any) {
    super(message, properties)
  }
}
export class ProductsFetchCountRemoteError extends BaseError {
  public name = 'ProductsFetchRemoteError'
  constructor (public message: string = 'Could not get products.', properties?: any) {
    super(message, properties)
  }
}

export class ProductInventoryError extends BaseError {
  public name = 'ProductInventoryError'
  constructor (public message: string = 'Could not get product inventory.', properties?: any) {
    super(message, properties)
  }
}
