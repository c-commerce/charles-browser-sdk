
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { IDiscountType } from '../discount/discount'

export interface CartOptions extends UniverseEntityOptions {
  rawPayload?: CartRawPayload
}

export interface CartItemOptions extends UniverseEntityOptions {
  rawPayload?: CartItemRawPayload
}

export interface CartAmount {
  net?: number
  gross?: number
}
export enum ICartStatusEnum {
  open = 'open',
  pending = 'pending',
  completed = 'completed',
  cancelled = 'cancelled'
}

export type ICartStatusType = ICartStatusEnum.open | ICartStatusEnum.pending | ICartStatusEnum.completed | ICartStatusEnum.cancelled

export interface CartItemDiscountRawPayload {
  readonly id?: string
  readonly type?: IDiscountType
  readonly name?: string
  readonly rate?: number
  readonly value?: {
    readonly amount?: number
    readonly currency?: string
  }
  readonly amount?: number
  readonly currency?: string
}

export type CartDiscountRawPayload = CartItemDiscountRawPayload

export interface CartItemRawPayload {
  readonly id?: string
  readonly qty?: number
  readonly sku?: string
  readonly name?: string
  readonly amount?: CartAmount
  readonly currency?: string
  readonly vat_rate?: number
  readonly vat_class?: 'vat_class_zero' | 'vat_class_reduced' | 'vat_class_normal' | 'vat_class_custom'
  readonly custom_vat_rate?: number
  readonly tax_region?: string
  readonly tax_country?: string
  readonly additional_taxes?: Array<{
    readonly id: string
    readonly rate: number
    readonly amount: number
  }>
  readonly product?: string
  readonly metadata?: object
  readonly custom_id?: string
  readonly discounts?: CartItemDiscountRawPayload[]
  readonly order_index?: number
  readonly custom_properties?: object
  readonly shipping_required?: boolean
  readonly external_reference_id?: string
  readonly external_reference_custom_id?: string
}

export interface CartItemPayload {
  readonly id: string
  readonly qty?: number
  readonly sku?: string
  readonly name: string
  readonly amount?: CartItemRawPayload['amount']
  readonly currency?: CartItemRawPayload['currency']
  readonly vatRate?: CartItemRawPayload['vat_rate']
  readonly vatClass?: CartItemRawPayload['vat_class']
  readonly customVatRate?: CartItemRawPayload['custom_vat_rate']
  readonly taxRegion?: CartItemRawPayload['tax_region']
  readonly taxCountry?: CartItemRawPayload['tax_country']
  readonly additionalTaxes?: CartItemRawPayload['additional_taxes']
  readonly product?: string
  readonly metadata?: object
  readonly customId?: string
  readonly discounts?: CartItemDiscountRawPayload[]
  readonly orderIndex?: number
  readonly customProperties?: object
  readonly shippingRequired?: boolean
  readonly externalReferenceId?: string
  readonly externalReferenceCustomId?: string
}

export interface CartLinks {
  external?: string
}

export interface CartAdress {
  readonly company?: string
  readonly first_name?: string
  readonly last_name?: string
  readonly name?: string
  readonly phone?: string
  readonly lines?: string[]
  readonly locality?: string
  readonly region?: string
  readonly postal_code?: string
  readonly country?: string
}

export type CartShippingAddress = CartAdress

export type CartBillingAddress = CartAdress

export interface CartContact {
  readonly email?: string
}

export interface CartShippingRawPayload {
  readonly currency: string
  readonly name: string
  readonly amount_net?: number | null
  readonly amount_gross?: number | null
}

export interface CartTaxLineRawPayload {
  readonly amount?: number
  readonly currency?: string
  readonly name?: string
  readonly rate?: number
}

export interface CartRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly currency?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly custom_id?: string
  readonly items?: CartItemRawPayload[]
  readonly links?: CartLinks
  readonly is_proxy?: boolean
  readonly proxy_vendor?: 'shopify' | string
  readonly type?: 'sale' | 'cancellation'
  readonly external_reference_id?: string
  readonly external_reference_custom_id?: string
  readonly client_id?: string
  readonly person?: string
  readonly person_external_reference_id?: string
  readonly note?: string
  readonly comment?: string
  readonly shipping_address?: CartShippingAddress
  readonly billing_address?: CartBillingAddress
  readonly contact?: CartContact
  readonly metadata?: object
  readonly custom_properies?: object
  readonly shipping_fulfillment?: string
  readonly amount_total_gross?: string
  readonly amount_total_net?: string
  readonly amount_total_tax?: string
  readonly amount_total_shipping_gross?: string
  readonly order_prompt?: string
  readonly status?: ICartStatusType | null
  readonly proxy_payload?: object | null
  readonly discounts?: CartDiscountRawPayload[] | null
  readonly shipping_methods?: CartShippingRawPayload[] | null
  readonly taxes_summary?: CartTaxLineRawPayload[] | null
}

export interface CartPayload {
  readonly id?: CartRawPayload['id']
  readonly currency?: CartRawPayload['currency']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: CartRawPayload['name']
  readonly custom_id?: CartRawPayload['custom_id']
  readonly items?: CartItem[]
  readonly links?: CartRawPayload['links']
  readonly isProxy?: CartRawPayload['is_proxy']
  readonly proxyVendor?: CartRawPayload['proxy_vendor']
  readonly type?: CartRawPayload['type']
  readonly externalReferenceId?: CartRawPayload['external_reference_id']
  readonly externalReferenceCustomId?: CartRawPayload['external_reference_custom_id']
  readonly clientId?: CartRawPayload['client_id']
  readonly person?: CartRawPayload['person']
  readonly personExternalReferenceId?: CartRawPayload['person_external_reference_id']
  readonly note?: CartRawPayload['note']
  readonly comment?: CartRawPayload['comment']
  readonly shippingAddress?: CartRawPayload['shipping_address']
  readonly billingAddress?: CartRawPayload['billing_address']
  readonly contact?: CartRawPayload['contact']
  readonly metadata?: CartRawPayload['metadata']
  readonly customProperies?: CartRawPayload['custom_properies']
  readonly shippingFulfillment?: CartRawPayload['shipping_fulfillment']
  readonly amountTotalGross?: CartRawPayload['amount_total_gross']
  readonly amountTotalNet?: CartRawPayload['amount_total_net']
  readonly amountTotalTax?: CartRawPayload['amount_total_tax']
  readonly amountTotalShippingGross?: CartRawPayload['amount_total_shipping_gross']
  readonly orderPrompt?: CartRawPayload['order_prompt']
  readonly status?: CartRawPayload['status']
  readonly proxyPayload?: CartRawPayload['proxy_payload']
  readonly discounts?: CartRawPayload['discounts']
  readonly shippingMethods?: CartRawPayload['shipping_methods']
  readonly taxesSummary?: CartRawPayload['taxes_summary']
}

export interface AddItemItemOptions {
  product: string
  qty?: number
}

export class CartItem {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: CartOptions

  public id?: CartItemPayload['id']
  public qty?: CartItemPayload['qty']
  public sku?: CartItemPayload['sku']
  public name?: CartItemPayload['name']
  public amount?: CartItemRawPayload['amount']
  public currency?: CartItemRawPayload['currency']
  public vatRate?: CartItemRawPayload['vat_rate']
  public vatClass?: CartItemRawPayload['vat_class']
  public customVatRate?: CartItemRawPayload['custom_vat_rate']
  public taxRegion?: CartItemRawPayload['tax_region']
  public taxCountry?: CartItemRawPayload['tax_country']
  public additionalTaxes?: CartItemRawPayload['additional_taxes']
  public product?: CartItemPayload['product']
  public metadata?: CartItemPayload['metadata']
  public customId?: CartItemPayload['customId']
  public discounts?: CartItemPayload['discounts']
  public orderIndex?: CartItemPayload['orderIndex']
  public customProperties?: CartItemPayload['customProperties']
  public shippingRequired?: CartItemPayload['shippingRequired']
  public externalReferenceId?: CartItemPayload['externalReferenceId']
  public externalReferenceCustomId?: CartItemPayload['externalReferenceCustomId']

  constructor (options: CartItemOptions) {
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CartItemRawPayload): CartItem {
    this.id = rawPayload.id
    this.qty = rawPayload.qty
    this.sku = rawPayload.sku
    this.name = rawPayload.name
    this.amount = rawPayload.amount
    this.currency = rawPayload.currency
    this.vatRate = rawPayload.vat_rate
    this.vatClass = rawPayload.vat_class
    this.customVatRate = rawPayload.custom_vat_rate
    this.taxRegion = rawPayload.tax_region
    this.taxCountry = rawPayload.tax_country
    this.additionalTaxes = rawPayload.additional_taxes
    this.product = rawPayload.product
    this.metadata = rawPayload.metadata
    this.customId = rawPayload.custom_id
    this.discounts = rawPayload.discounts
    this.orderIndex = rawPayload.order_index
    this.customProperties = rawPayload.custom_properties
    this.shippingRequired = rawPayload.shipping_required
    this.externalReferenceId = rawPayload.external_reference_id
    this.externalReferenceCustomId = rawPayload.external_reference_custom_id

    return this
  }

  public static create (payload: CartItemRawPayload, universe: Universe, http: Universe['http']): CartItem {
    return new CartItem({ rawPayload: payload, universe, http })
  }

  public serialize (): CartItemRawPayload {
    return {
      id: this.id,
      qty: this.qty,
      sku: this.sku,
      name: this.name,
      amount: this.amount,
      currency: this.currency,
      vat_rate: this.vatRate,
      vat_class: this.vatClass,
      custom_vat_rate: this.customVatRate,
      tax_region: this.taxRegion,
      tax_country: this.taxCountry,
      additional_taxes: this.additionalTaxes,
      product: this.product,
      metadata: this.metadata,
      custom_id: this.customId,
      discounts: this.discounts,
      order_index: this.orderIndex,
      custom_properties: this.customProperties,
      shipping_required: this.shippingRequired,
      external_reference_id: this.externalReferenceId,
      external_reference_custom_id: this.externalReferenceCustomId
    }
  }
}

/**
 * Manage carts.
 *
 * @category CommerceEntity
 */
export class Cart extends UniverseEntity<CartPayload, CartRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: CartOptions
  public initialized: boolean

  public endpoint: string

  public id?: CartPayload['id']
  public currency?: CartPayload['currency']
  public createdAt?: CartPayload['createdAt']
  public updatedAt?: CartPayload['updatedAt']
  public deleted?: CartPayload['deleted']
  public active?: CartPayload['active']
  public name?: CartPayload['name']
  public customId?: CartPayload['custom_id']
  public items?: CartPayload['items']
  public links?: CartPayload['links']
  public isProxy?: CartPayload['isProxy']
  public proxyVendor?: CartPayload['proxyVendor']
  public type?: CartPayload['type']
  public externalReferenceId?: CartPayload['externalReferenceId']
  public externalReferenceCustomId?: CartPayload['externalReferenceCustomId']
  public clientId?: CartPayload['clientId']
  public person?: CartPayload['person']
  public personExternalReferenceId?: CartPayload['personExternalReferenceId']
  public note?: CartPayload['note']
  public comment?: CartPayload['comment']
  public shippingAddress?: CartPayload['shippingAddress']
  public billingAddress?: CartPayload['billingAddress']
  public contact?: CartPayload['contact']
  public metadata?: CartPayload['metadata']
  public customProperies?: CartPayload['customProperies']
  public shippingFulfillment?: CartPayload['shippingFulfillment']
  public amountTotalGross?: CartPayload['amountTotalGross']
  public amountTotalNet?: CartPayload['amountTotalNet']
  public amountTotalTax?: CartPayload['amountTotalTax']
  public amountTotalShippingGross?: CartPayload['amountTotalShippingGross']
  public orderPrompt?: CartPayload['orderPrompt']
  public status?: CartPayload['status']
  public proxyPayload?: CartPayload['proxyPayload']
  public discounts?: CartPayload['discounts']
  public shippingMethods?: CartPayload['shippingMethods']
  public taxesSummary?: CartPayload['taxesSummary']

  constructor (options: CartOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/carts'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CartRawPayload): Cart {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.currency = rawPayload.currency
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.customId = rawPayload.custom_id
    this.links = rawPayload.links
    this.isProxy = rawPayload.is_proxy ?? false
    this.proxyVendor = rawPayload.proxy_vendor
    this.type = rawPayload.type
    this.externalReferenceId = rawPayload.external_reference_id
    this.externalReferenceCustomId = rawPayload.external_reference_custom_id
    this.clientId = rawPayload.client_id
    this.person = rawPayload.person
    this.personExternalReferenceId = rawPayload.person_external_reference_id
    this.note = rawPayload.note
    this.comment = rawPayload.comment
    this.shippingAddress = rawPayload.shipping_address
    this.billingAddress = rawPayload.billing_address
    this.contact = rawPayload.contact
    this.metadata = rawPayload.metadata
    this.customProperies = rawPayload.custom_properies
    this.shippingFulfillment = rawPayload.shipping_fulfillment
    this.amountTotalGross = rawPayload.amount_total_gross
    this.amountTotalNet = rawPayload.amount_total_net
    this.amountTotalTax = rawPayload.amount_total_tax
    this.amountTotalShippingGross = rawPayload.amount_total_shipping_gross
    this.orderPrompt = rawPayload.order_prompt
    this.status = rawPayload.status
    this.proxyPayload = rawPayload.proxy_payload
    this.discounts = rawPayload.discounts
    this.shippingMethods = rawPayload.shipping_methods
    this.taxesSummary = rawPayload.taxes_summary

    if (Array.isArray(rawPayload.items)) {
      this.items = rawPayload.items.map((item) => (CartItem.create(item, this.universe, this.http)))
    } else {
      this.items = []
    }

    return this
  }

  public static create (payload: CartRawPayload, universe: Universe, http: Universe['http']): Cart {
    return new Cart({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): CartRawPayload {
    let items
    if (Array.isArray(this.items)) {
      items = this.items.map((item) => (item.serialize()))
    }

    return {
      id: this.id,
      currency: this.currency,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      custom_id: this.customId,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      type: this.type,
      external_reference_id: this.externalReferenceId,
      external_reference_custom_id: this.externalReferenceCustomId,
      client_id: this.clientId,
      person: this.person,
      person_external_reference_id: this.personExternalReferenceId,
      note: this.note,
      comment: this.comment,
      shipping_address: this.shippingAddress,
      billing_address: this.billingAddress,
      contact: this.contact,
      metadata: this.metadata,
      custom_properies: this.customProperies,
      items,
      links: this.links,
      shipping_fulfillment: this.shippingFulfillment,
      amount_total_gross: this.amountTotalGross,
      amount_total_net: this.amountTotalNet,
      amount_total_tax: this.amountTotalTax,
      amount_total_shipping_gross: this.amountTotalShippingGross,
      order_prompt: this.orderPrompt,
      status: this.status,
      proxy_payload: this.proxyPayload,
      discounts: this.discounts,
      shipping_methods: this.shippingMethods,
      taxes_summary: this.taxesSummary
    }
  }

  public async init (): Promise<Cart | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new CartInitializationError(undefined, { error: err }))
    }
  }

  public async addItems (itemsOptions: AddItemItemOptions[]): Promise<Cart> {
    if (this.id === null || this.id === undefined) throw new TypeError('addItem requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/items`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: itemsOptions.map((itemOption: AddItemItemOptions) => ({
          product: itemOption.product,
          qty: itemOption.qty ?? 1
        })),
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      this.deserialize(res.data.data[0] as CartRawPayload)

      return this
    } catch (err) {
      throw new CartAddItemsRemoteError(undefined, { error: err })
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Carts {
  public static endpoint: string = 'api/v0/carts'
}

export class CartInitializationError extends BaseError {
  public name = 'CartInitializationError'
  constructor (public message: string = 'Could not initialize cart.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CartInitializationError.prototype)
  }
}

export class CartFetchRemoteError extends BaseError {
  public name = 'CartFetchRemoteError'
  constructor (public message: string = 'Could not get cart.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CartFetchRemoteError.prototype)
  }
}

export class CartsFetchRemoteError extends BaseError {
  public name = 'CartsFetchRemoteError'
  constructor (public message: string = 'Could not get carts.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CartsFetchRemoteError.prototype)
  }
}
export class CartsFetchCountRemoteError extends BaseError {
  public name = 'CartsFetchCountRemoteError'
  constructor (public message: string = 'Could not get carts count.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CartsFetchCountRemoteError.prototype)
  }
}

export class CartCreateRemoteError extends BaseError {
  public name = 'CartCreateRemoteError'
  constructor (public message: string = 'Could not create carts', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CartCreateRemoteError.prototype)
  }
}

export class CartAddItemsRemoteError extends BaseError {
  public name = 'CartAddItemsRemoteError'
  constructor (public message: string = 'Could not add items to cart', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CartAddItemsRemoteError.prototype)
  }
}
