
import { UniverseEntity, UniverseEntityOptions, EntitiesList } from '../_base'
import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { BaseError } from '../../errors'
import { IDiscountType } from '../discount/discount'
// import { CartPayload, CartRawPayload, CartTaxLineRawPayload } from '../cart/cart'

export interface OrderOptions extends UniverseEntityOptions {
  rawPayload?: OrderRawPayload
}

export interface OrderItemOptions extends UniverseEntityOptions {
  rawPayload?: OrderItemRawPayload
}

export interface OrderAmount {
  net?: number
  gross?: number
}

export interface OrderItemPriceRawPayload {
  readonly amount: OrderAmount
  readonly currency: string
  readonly vat_rate: number
  readonly vat_class: 'vat_class_zero' | 'vat_class_reduced' | 'vat_class_normal' | 'vat_class_custom'
  readonly custom_vat_rate: number
  readonly tax_region: string
  readonly tax_country: string
  readonly additional_taxes: Array<{
    readonly id: string
    readonly rate: number
    readonly amount: number
  }>
}

export interface OrderItemDiscountRawPayload {
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

export type OrderDiscountRawPayload = OrderItemDiscountRawPayload

export interface OrderItemRawPayload {
  readonly qty?: number
  readonly sku?: string
  readonly name?: string
  readonly price?: OrderItemPriceRawPayload
  readonly product?: string
  readonly metadata?: object
  readonly custom_id?: string
  readonly discounts?: OrderItemDiscountRawPayload[]
  readonly order_index?: number
  readonly custom_properties?: object
  readonly shipping_required?: boolean
  readonly external_reference_id?: string
  readonly external_reference_custom_id?: string
}

export interface OrderItemPayload {
  readonly qty?: number
  readonly sku?: string
  readonly name: string
  readonly price: OrderItemPriceRawPayload
  readonly product?: string
  readonly metadata?: object
  readonly customId?: string
  readonly discounts?: OrderItemDiscountRawPayload[]
  readonly orderIndex?: number
  readonly customProperties?: object
  readonly shippingRequired?: boolean
  readonly externalReferenceId?: string
  readonly externalReferenceCustomId?: string
}

export interface OrderAdress {
  readonly lines?: string[]
  readonly locality?: string
  readonly region?: string
  readonly postal_code?: string
  readonly country?: string
}

export type OrderShippingAddress = OrderAdress

export type OrderBillingAddress = OrderAdress

export interface OrderContact {
  readonly email?: string
}

export enum IOrderStatusEnum {
  open = 'open',
  pending = 'pending',
  completed = 'completed',
  cancelled = 'cancelled'
}

export type IOrderStatusType = IOrderStatusEnum.open | IOrderStatusEnum.pending | IOrderStatusEnum.completed | IOrderStatusEnum.cancelled

export interface OrderTaxLineRawPayload {
  readonly amount?: number
  readonly currency?: string
  readonly name?: string
  readonly rate?: number
}

export interface OrderShippingMethodRawPayload {
  readonly amount_gross?: number
  readonly currency?: string
  readonly name?: string
}

export interface OrderRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly custom_id?: string
  readonly items?: OrderItemRawPayload[]
  readonly is_proxy?: boolean
  readonly proxy_vendor?: 'shopify' | string
  readonly type?: 'sale' | 'cancellation'
  readonly external_reference_id?: string
  readonly external_reference_custom_id?: string
  readonly client_id?: string
  readonly person?: string
  readonly note?: string
  readonly comment?: string
  readonly shipping_address?: OrderShippingAddress
  readonly billing_address?: OrderBillingAddress
  readonly contact?: OrderContact
  readonly metadata?: object
  readonly custom_properies?: object
  readonly cart?: string
  readonly shipping_fulfillment?: string
  readonly amount_total_gross?: string
  readonly amount_total_net?: string
  readonly amount_total_tax?: string
  readonly amount_total_shipping_gross?: string
  readonly discount_amount_total?: number
  readonly order_prompt?: string
  readonly status?: IOrderStatusType | null
  readonly proxy_payload?: object | null
  readonly discounts?: OrderDiscountRawPayload[] | null
  readonly taxes_summary?: OrderTaxLineRawPayload[] | null
  readonly shipping_methods?: OrderShippingMethodRawPayload[] | null
  // virtual props
  readonly products_map?: null | {
    [key: string]: {
      id: string
      [key: string]: any
    }
  }
}

export interface OrderPayload {
  readonly id?: OrderRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: OrderRawPayload['name']
  readonly custom_id?: OrderRawPayload['custom_id']
  readonly items?: OrderItem[]
  readonly isProxy?: OrderRawPayload['is_proxy']
  readonly proxyVendor?: OrderRawPayload['proxy_vendor']
  readonly type?: OrderRawPayload['type']
  readonly externalReferenceId?: OrderRawPayload['external_reference_id']
  readonly externalReferenceCustomId?: OrderRawPayload['external_reference_custom_id']
  readonly clientId?: OrderRawPayload['client_id']
  readonly person?: OrderRawPayload['person']
  readonly note?: OrderRawPayload['note']
  readonly comment?: OrderRawPayload['comment']
  readonly shippingAddress?: OrderRawPayload['shipping_address']
  readonly billingAddress?: OrderRawPayload['billing_address']
  readonly contact?: OrderRawPayload['contact']
  readonly metadata?: OrderRawPayload['metadata']
  readonly customProperies?: OrderRawPayload['custom_properies']
  readonly cart?: OrderRawPayload['cart']
  readonly shippingFulfillment?: OrderRawPayload['shipping_fulfillment']
  readonly amountTotalGross?: OrderRawPayload['amount_total_gross']
  readonly amountTotalNet?: OrderRawPayload['amount_total_net']
  readonly amountTotalTax?: OrderRawPayload['amount_total_tax']
  readonly amountTotalShippingGross?: OrderRawPayload['amount_total_shipping_gross']
  readonly discountAmountTotal?: OrderRawPayload['discount_amount_total']
  readonly orderPrompt?: OrderRawPayload['order_prompt']
  readonly status?: OrderRawPayload['status']
  readonly proxyPayload?: OrderRawPayload['proxy_payload']
  readonly discounts?: OrderRawPayload['discounts']
  readonly taxesSummary?: OrderRawPayload['taxes_summary']
  readonly shippingMethods?: OrderRawPayload['shipping_methods']
  // virtual props
  readonly productsMap?: OrderRawPayload['products_map']
}

export class OrderItem {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt: RealtimeClient
  protected options: OrderOptions

  public qty?: OrderItemPayload['qty']
  public sku?: OrderItemPayload['sku']
  public name?: OrderItemPayload['name']
  public price?: OrderItemPayload['price']
  public product?: OrderItemPayload['product']
  public metadata?: OrderItemPayload['metadata']
  public customId?: OrderItemPayload['customId']
  public discounts?: OrderItemPayload['discounts']
  public orderIndex?: OrderItemPayload['orderIndex']
  public customProperties?: OrderItemPayload['customProperties']
  public shippingRequired?: OrderItemPayload['shippingRequired']
  public externalReferenceId?: OrderItemPayload['externalReferenceId']
  public externalReferenceCustomId?: OrderItemPayload['externalReferenceCustomId']

  constructor (options: OrderItemOptions) {
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: OrderItemRawPayload): OrderItem {
    this.qty = rawPayload.qty
    this.sku = rawPayload.sku
    this.name = rawPayload.name
    this.price = rawPayload.price
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

  public static create (payload: OrderItemRawPayload, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): OrderItem {
    return new OrderItem({ rawPayload: payload, universe, http })
  }

  public serialize (): OrderItemRawPayload {
    return {
      qty: this.qty,
      sku: this.sku,
      name: this.name,
      price: this.price,
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
 * Manage orders.
 *
 * @category CommerceEntity
 */
export class Order extends UniverseEntity<OrderPayload, OrderRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt: RealtimeClient
  protected options: OrderOptions
  public initialized: boolean

  public endpoint: string

  public id?: OrderPayload['id']
  public createdAt?: OrderPayload['createdAt']
  public updatedAt?: OrderPayload['updatedAt']
  public deleted?: OrderPayload['deleted']
  public active?: OrderPayload['active']
  public name?: OrderPayload['name']
  public customId?: OrderPayload['custom_id']
  public items?: OrderPayload['items']
  public isProxy?: OrderPayload['isProxy']
  public proxyVendor?: OrderPayload['proxyVendor']
  public type?: OrderPayload['type']
  public externalReferenceId?: OrderPayload['externalReferenceId']
  public externalReferenceCustomId?: OrderPayload['externalReferenceCustomId']
  public clientId?: OrderPayload['clientId']
  public person?: OrderPayload['person']
  public note?: OrderPayload['note']
  public comment?: OrderPayload['comment']
  public shippingAddress?: OrderPayload['shippingAddress']
  public billingAddress?: OrderPayload['billingAddress']
  public contact?: OrderPayload['contact']
  public metadata?: OrderPayload['metadata']
  public customProperies?: OrderPayload['customProperies']
  public cart?: OrderPayload['cart']
  public shippingFulfillment?: OrderPayload['shippingFulfillment']
  public amountTotalGross?: OrderPayload['amountTotalGross']
  public amountTotalNet?: OrderPayload['amountTotalNet']
  public amountTotalTax?: OrderPayload['amountTotalTax']
  public amountTotalShippingGross?: OrderPayload['amountTotalShippingGross']
  public discountAmountTotal?: OrderPayload['discountAmountTotal']
  public orderPrompt?: OrderPayload['orderPrompt']
  public status?: OrderPayload['status']
  public proxyPayload?: OrderPayload['proxyPayload']
  public discounts?: OrderPayload['discounts']
  public taxesSummary?: OrderPayload['taxesSummary']
  public shippingMethods?: OrderPayload['shippingMethods']
  // virutal props
  public productsMap?: OrderPayload['productsMap']

  constructor (options: OrderOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/orders'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.mqtt = options.mqtt

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: OrderRawPayload): Order {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.customId = rawPayload.custom_id
    this.isProxy = rawPayload.is_proxy ?? false
    this.proxyVendor = rawPayload.proxy_vendor
    this.type = rawPayload.type
    this.externalReferenceId = rawPayload.external_reference_id
    this.externalReferenceCustomId = rawPayload.external_reference_custom_id
    this.clientId = rawPayload.client_id
    this.person = rawPayload.person
    this.note = rawPayload.note
    this.comment = rawPayload.comment
    this.shippingAddress = rawPayload.shipping_address
    this.billingAddress = rawPayload.billing_address
    this.contact = rawPayload.contact
    this.metadata = rawPayload.metadata
    this.customProperies = rawPayload.custom_properies
    this.cart = rawPayload.cart
    this.shippingFulfillment = rawPayload.shipping_fulfillment
    this.amountTotalGross = rawPayload.amount_total_gross
    this.amountTotalNet = rawPayload.amount_total_net
    this.amountTotalTax = rawPayload.amount_total_tax
    this.amountTotalShippingGross = rawPayload.amount_total_shipping_gross
    this.discountAmountTotal = rawPayload.discount_amount_total
    this.orderPrompt = rawPayload.order_prompt
    this.status = rawPayload.status
    this.proxyPayload = rawPayload.proxy_payload
    this.discounts = rawPayload.discounts
    this.taxesSummary = rawPayload.taxes_summary
    this.shippingMethods = rawPayload.shipping_methods

    if (Array.isArray(rawPayload.items)) {
      this.items = rawPayload.items.map((item) => (OrderItem.create(item, this.universe, this.http)))
    } else {
      this.items = []
    }

    // virtual props
    this.productsMap = rawPayload.products_map

    return this
  }

  public static create (payload: OrderRawPayload, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): Order {
    return new Order({ rawPayload: payload, universe, http, mqtt, initialized: true })
  }

  public serialize (): OrderRawPayload {
    let items
    if (Array.isArray(this.items)) {
      items = this.items.map((item) => (item.serialize()))
    }

    return {
      id: this.id,
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
      note: this.note,
      comment: this.comment,
      shipping_address: this.shippingAddress,
      billing_address: this.billingAddress,
      contact: this.contact,
      metadata: this.metadata,
      custom_properies: this.customProperies,
      cart: this.cart,
      items,
      shipping_fulfillment: this.shippingFulfillment,
      amount_total_gross: this.amountTotalGross,
      amount_total_net: this.amountTotalNet,
      amount_total_tax: this.amountTotalTax,
      amount_total_shipping_gross: this.amountTotalShippingGross,
      discount_amount_total: this.discountAmountTotal,
      order_prompt: this.orderPrompt,
      status: this.status,
      proxy_payload: this.proxyPayload,
      discounts: this.discounts,
      taxes_summary: this.taxesSummary,
      shipping_methods: this.shippingMethods,
      // virutal props
      products_map: this.productsMap
    }
  }

  public async init (): Promise<Order | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new OrderInitializationError(undefined, { error: err }))
    }
  }

  public async associatePerson (personId: string): Promise<Order | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('association requires id to be set.')
    if (!personId) throw new TypeError('association requires new person to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/person/associate/${personId}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as OrderRawPayload)

      return this
    } catch (err) {
      throw new OrdersAssociationRemoteError(undefined, { error: err })
    }
  }
}
export interface OrdersOptions {
  universe: Universe
  http: Universe['http']
}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Orders extends EntitiesList<Order, OrderRawPayload> {
  public static endpoint: string = 'api/v0/orders'
  public endpoint: string = Orders.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt: RealtimeClient

  constructor (options: OrdersOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: OrderRawPayload): Order {
    return Order.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<Orders> {
    return (await this._getStream(options)) as Orders
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }
}

export class OrderInitializationError extends BaseError {
  public name = 'OrderInitializationError'
  constructor (public message: string = 'Could not initialize order.', properties?: any) {
    super(message, properties)
  }
}

export class OrderFetchRemoteError extends BaseError {
  public name = 'OrderFetchRemoteError'
  constructor (public message: string = 'Could not get order.', properties?: any) {
    super(message, properties)
  }
}
export class OrdersFetchCountRemoteError extends BaseError {
  public name = 'OrdersFetchCountRemoteError'
  constructor (public message: string = 'Could not get order count.', properties?: any) {
    super(message, properties)
  }
}

export class OrdersFetchRemoteError extends BaseError {
  public name = 'OrdersFetchRemoteError'
  constructor (public message: string = 'Could not get orders.', properties?: any) {
    super(message, properties)
  }
}

export class OrdersAssociationRemoteError extends BaseError {
  public name = 'OrdersAssociationRemoteError'
  constructor (public message: string = 'Could associate order with person unexpectedly.', properties?: any) {
    super(message, properties)
  }
}
export class OrderExportRemoteError extends BaseError {
  public name = 'OrderExportRemoteError'
  constructor (public message: string = 'Could not export orders.', properties?: any) {
    super(message, properties)
  }
}
