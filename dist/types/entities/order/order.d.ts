import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { IDiscountType } from '../discount/discount';
export interface OrderOptions extends EntityOptions {
    rawPayload?: OrderRawPayload;
}
export interface OrderItemOptions extends EntityOptions {
    rawPayload?: OrderItemRawPayload;
}
export interface OrderAmount {
    net?: number;
    gross?: number;
}
export interface OrderItemPriceRawPayload {
    readonly amount: OrderAmount;
    readonly currency: string;
    readonly vat_rate: number;
    readonly vat_class: 'vat_class_zero' | 'vat_class_reduced' | 'vat_class_normal' | 'vat_class_custom';
    readonly custom_vat_rate: number;
    readonly tax_region: string;
    readonly tax_country: string;
    readonly additional_taxes: Array<{
        readonly id: string;
        readonly rate: number;
        readonly amount: number;
    }>;
}
export interface OrderItemDiscountRawPayload {
    readonly id?: string;
    readonly type?: IDiscountType;
    readonly name?: string;
    readonly rate?: number;
    readonly value?: {
        readonly amount?: number;
        readonly currency?: string;
    };
    readonly amount?: number;
    readonly currency?: string;
}
export declare type OrderDiscountRawPayload = OrderItemDiscountRawPayload;
export interface OrderItemRawPayload {
    readonly qty?: number;
    readonly sku?: string;
    readonly name?: string;
    readonly price?: OrderItemPriceRawPayload;
    readonly product?: string;
    readonly metadata?: object;
    readonly custom_id?: string;
    readonly discounts?: OrderItemDiscountRawPayload[];
    readonly order_index?: number;
    readonly custom_properties?: object;
    readonly shipping_required?: boolean;
    readonly external_reference_id?: string;
    readonly external_reference_custom_id?: string;
}
export interface OrderItemPayload {
    readonly qty?: number;
    readonly sku?: string;
    readonly name: string;
    readonly price: OrderItemPriceRawPayload;
    readonly product?: string;
    readonly metadata?: object;
    readonly customId?: string;
    readonly discounts?: OrderItemDiscountRawPayload[];
    readonly orderIndex?: number;
    readonly customProperties?: object;
    readonly shippingRequired?: boolean;
    readonly externalReferenceId?: string;
    readonly externalReferenceCustomId?: string;
}
export interface OrderAdress {
    readonly lines?: string[];
    readonly locality?: string;
    readonly region?: string;
    readonly postal_code?: string;
    readonly country?: string;
}
export declare type OrderShippingAddress = OrderAdress;
export declare type OrderBillingAddress = OrderAdress;
export interface OrderContact {
    readonly email?: string;
}
export declare enum IOrderStatusEnum {
    open = "open",
    pending = "pending",
    completed = "completed",
    cancelled = "cancelled"
}
export declare type IOrderStatusType = IOrderStatusEnum.open | IOrderStatusEnum.pending | IOrderStatusEnum.completed | IOrderStatusEnum.cancelled;
export interface OrderTaxLineRawPayload {
    readonly amount?: number;
    readonly currency?: string;
    readonly name?: string;
    readonly rate?: number;
}
export interface OrderRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly custom_id?: string;
    readonly items?: OrderItemRawPayload[];
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: 'shopify' | string;
    readonly type?: 'sale' | 'cancellation';
    readonly external_reference_id?: string;
    readonly external_reference_custom_id?: string;
    readonly client_id?: string;
    readonly person?: string;
    readonly note?: string;
    readonly comment?: string;
    readonly shipping_address?: OrderShippingAddress;
    readonly billing_address?: OrderBillingAddress;
    readonly contact?: OrderContact;
    readonly metadata?: object;
    readonly custom_properies?: object;
    readonly cart?: string;
    readonly shipping_fulfillment?: string;
    readonly amount_total_gross?: string;
    readonly amount_total_net?: string;
    readonly amount_total_tax?: string;
    readonly amount_total_shipping_gross?: string;
    readonly order_prompt?: string;
    readonly status?: IOrderStatusType | null;
    readonly proxy_payload?: object | null;
    readonly discounts?: OrderDiscountRawPayload[] | null;
    readonly taxes_summary?: OrderTaxLineRawPayload[] | null;
}
export interface OrderPayload {
    readonly id?: OrderRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: OrderRawPayload['name'];
    readonly custom_id?: OrderRawPayload['custom_id'];
    readonly items?: OrderItem[];
    readonly isProxy?: OrderRawPayload['is_proxy'];
    readonly proxyVendor?: OrderRawPayload['proxy_vendor'];
    readonly type?: OrderRawPayload['type'];
    readonly externalReferenceId?: OrderRawPayload['external_reference_id'];
    readonly externalReferenceCustomId?: OrderRawPayload['external_reference_custom_id'];
    readonly clientId?: OrderRawPayload['client_id'];
    readonly person?: OrderRawPayload['person'];
    readonly note?: OrderRawPayload['note'];
    readonly comment?: OrderRawPayload['comment'];
    readonly shippingAddress?: OrderRawPayload['shipping_address'];
    readonly billingAddress?: OrderRawPayload['billing_address'];
    readonly contact?: OrderRawPayload['contact'];
    readonly metadata?: OrderRawPayload['metadata'];
    readonly customProperies?: OrderRawPayload['custom_properies'];
    readonly cart?: OrderRawPayload['cart'];
    readonly shippingFulfillment?: OrderRawPayload['shipping_fulfillment'];
    readonly amountTotalGross?: OrderRawPayload['amount_total_gross'];
    readonly amountTotalNet?: OrderRawPayload['amount_total_net'];
    readonly amountTotalTax?: OrderRawPayload['amount_total_tax'];
    readonly amountTotalShippingGross?: OrderRawPayload['amount_total_shipping_gross'];
    readonly orderPrompt?: OrderRawPayload['order_prompt'];
    readonly status?: OrderRawPayload['status'];
    readonly proxyPayload?: OrderRawPayload['proxy_payload'];
    readonly discounts?: OrderRawPayload['discounts'];
    readonly taxesSummary?: OrderRawPayload['taxes_summary'];
}
export declare class OrderItem {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: OrderOptions;
    qty?: OrderItemPayload['qty'];
    sku?: OrderItemPayload['sku'];
    name?: OrderItemPayload['name'];
    price?: OrderItemPayload['price'];
    product?: OrderItemPayload['product'];
    metadata?: OrderItemPayload['metadata'];
    customId?: OrderItemPayload['customId'];
    discounts?: OrderItemPayload['discounts'];
    orderIndex?: OrderItemPayload['orderIndex'];
    customProperties?: OrderItemPayload['customProperties'];
    shippingRequired?: OrderItemPayload['shippingRequired'];
    externalReferenceId?: OrderItemPayload['externalReferenceId'];
    externalReferenceCustomId?: OrderItemPayload['externalReferenceCustomId'];
    constructor(options: OrderItemOptions);
    protected deserialize(rawPayload: OrderItemRawPayload): OrderItem;
    static create(payload: OrderItemRawPayload, universe: Universe, http: Universe['http']): OrderItem;
    serialize(): OrderItemRawPayload;
}
export declare class Order extends Entity<OrderPayload, OrderRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: OrderOptions;
    initialized: boolean;
    endpoint: string;
    id?: OrderPayload['id'];
    createdAt?: OrderPayload['createdAt'];
    updatedAt?: OrderPayload['updatedAt'];
    deleted?: OrderPayload['deleted'];
    active?: OrderPayload['active'];
    name?: OrderPayload['name'];
    customId?: OrderPayload['custom_id'];
    items?: OrderPayload['items'];
    isProxy?: OrderPayload['isProxy'];
    proxyVendor?: OrderPayload['proxyVendor'];
    type?: OrderPayload['type'];
    externalReferenceId?: OrderPayload['externalReferenceId'];
    externalReferenceCustomId?: OrderPayload['externalReferenceCustomId'];
    clientId?: OrderPayload['clientId'];
    person?: OrderPayload['person'];
    note?: OrderPayload['note'];
    comment?: OrderPayload['comment'];
    shippingAddress?: OrderPayload['shippingAddress'];
    billingAddress?: OrderPayload['billingAddress'];
    contact?: OrderPayload['contact'];
    metadata?: OrderPayload['metadata'];
    customProperies?: OrderPayload['customProperies'];
    cart?: OrderPayload['cart'];
    shippingFulfillment?: OrderPayload['shippingFulfillment'];
    amountTotalGross?: OrderPayload['amountTotalGross'];
    amountTotalNet?: OrderPayload['amountTotalNet'];
    amountTotalTax?: OrderPayload['amountTotalTax'];
    amountTotalShippingGross?: OrderPayload['amountTotalShippingGross'];
    orderPrompt?: OrderPayload['orderPrompt'];
    status?: OrderPayload['status'];
    proxyPayload?: OrderPayload['proxyPayload'];
    discounts?: OrderPayload['discounts'];
    taxesSummary?: OrderPayload['taxesSummary'];
    constructor(options: OrderOptions);
    protected deserialize(rawPayload: OrderRawPayload): Order;
    static create(payload: OrderRawPayload, universe: Universe, http: Universe['http']): Order;
    serialize(): OrderRawPayload;
    init(): Promise<Order | undefined>;
}
export declare class Orders {
    static endpoint: string;
}
export declare class OrderInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class OrderFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class OrdersFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
