import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { IDiscountType } from '../discount/discount';
export interface CartOptions extends UniverseEntityOptions {
    rawPayload?: CartRawPayload;
}
export interface CartItemOptions extends UniverseEntityOptions {
    rawPayload?: CartItemRawPayload;
}
export interface CartAmount {
    net?: number;
    gross?: number;
}
export declare enum ICartStatusEnum {
    open = "open",
    pending = "pending",
    completed = "completed",
    cancelled = "cancelled"
}
export declare type ICartStatusType = ICartStatusEnum.open | ICartStatusEnum.pending | ICartStatusEnum.completed | ICartStatusEnum.cancelled;
export interface CartItemDiscountRawPayload {
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
export declare type CartDiscountRawPayload = CartItemDiscountRawPayload;
export interface CartItemRawPayload {
    readonly id?: string;
    readonly qty?: number;
    readonly sku?: string;
    readonly name?: string;
    readonly amount?: CartAmount;
    readonly passive?: boolean;
    readonly currency?: string;
    readonly vat_rate?: number;
    readonly vat_class?: 'vat_class_zero' | 'vat_class_reduced' | 'vat_class_normal' | 'vat_class_custom';
    readonly custom_vat_rate?: number;
    readonly tax_region?: string;
    readonly tax_country?: string;
    readonly additional_taxes?: Array<{
        readonly id: string;
        readonly rate: number;
        readonly amount: number;
    }>;
    readonly product?: string;
    readonly metadata?: object;
    readonly custom_id?: string;
    readonly discounts?: CartItemDiscountRawPayload[];
    readonly order_index?: number;
    readonly custom_properties?: object;
    readonly shipping_required?: boolean;
    readonly external_reference_id?: string;
    readonly external_reference_custom_id?: string;
}
export interface CartItemPayload {
    readonly id: string;
    readonly qty?: number;
    readonly sku?: string;
    readonly name: string;
    readonly amount?: CartItemRawPayload['amount'];
    readonly passive?: boolean;
    readonly currency?: CartItemRawPayload['currency'];
    readonly vatRate?: CartItemRawPayload['vat_rate'];
    readonly vatClass?: CartItemRawPayload['vat_class'];
    readonly customVatRate?: CartItemRawPayload['custom_vat_rate'];
    readonly taxRegion?: CartItemRawPayload['tax_region'];
    readonly taxCountry?: CartItemRawPayload['tax_country'];
    readonly additionalTaxes?: CartItemRawPayload['additional_taxes'];
    readonly product?: string;
    readonly metadata?: object;
    readonly customId?: string;
    readonly discounts?: CartItemDiscountRawPayload[];
    readonly orderIndex?: number;
    readonly customProperties?: object;
    readonly shippingRequired?: boolean;
    readonly externalReferenceId?: string;
    readonly externalReferenceCustomId?: string;
}
export interface CartLinks {
    external?: string;
}
export interface CartAdress {
    readonly company?: string;
    readonly first_name?: string;
    readonly last_name?: string;
    readonly name?: string;
    readonly phone?: string;
    readonly lines?: string[];
    readonly locality?: string;
    readonly region?: string;
    readonly postal_code?: string;
    readonly country?: string;
}
export declare type CartShippingAddress = CartAdress;
export declare type CartBillingAddress = CartAdress;
export interface CartContact {
    readonly email?: string;
}
export interface CartShippingRawPayload {
    readonly currency: string;
    readonly name: string;
    readonly amount_net?: number | null;
    readonly amount_gross?: number | null;
}
export interface CartTaxLineRawPayload {
    readonly amount?: number;
    readonly currency?: string;
    readonly name?: string;
    readonly rate?: number;
}
export interface CartRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly currency?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly custom_id?: string;
    readonly items?: CartItemRawPayload[];
    readonly links?: CartLinks;
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: 'shopify' | string;
    readonly type?: 'sale' | 'cancellation';
    readonly external_reference_id?: string;
    readonly external_reference_custom_id?: string;
    readonly client_id?: string;
    readonly person?: string;
    readonly person_external_reference_id?: string;
    readonly note?: string;
    readonly comment?: string;
    readonly shipping_address?: CartShippingAddress;
    readonly billing_address?: CartBillingAddress;
    readonly contact?: CartContact;
    readonly metadata?: object;
    readonly custom_properies?: object;
    readonly shipping_fulfillment?: string;
    readonly amount_total_gross?: string;
    readonly amount_total_net?: string;
    readonly amount_total_tax?: string;
    readonly amount_total_shipping_gross?: string;
    readonly order_prompt?: string;
    readonly storefront?: string;
    readonly status?: ICartStatusType | null;
    readonly discounts?: CartDiscountRawPayload[] | null;
    readonly shipping_methods?: CartShippingRawPayload[] | null;
    readonly taxes_summary?: CartTaxLineRawPayload[] | null;
    readonly proxy_payload?: object | null;
}
export interface CartPayload {
    readonly id?: CartRawPayload['id'];
    readonly currency?: CartRawPayload['currency'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: CartRawPayload['name'];
    readonly custom_id?: CartRawPayload['custom_id'];
    readonly items?: CartItem[];
    readonly links?: CartRawPayload['links'];
    readonly isProxy?: CartRawPayload['is_proxy'];
    readonly proxyVendor?: CartRawPayload['proxy_vendor'];
    readonly type?: CartRawPayload['type'];
    readonly externalReferenceId?: CartRawPayload['external_reference_id'];
    readonly externalReferenceCustomId?: CartRawPayload['external_reference_custom_id'];
    readonly clientId?: CartRawPayload['client_id'];
    readonly person?: CartRawPayload['person'];
    readonly personExternalReferenceId?: CartRawPayload['person_external_reference_id'];
    readonly note?: CartRawPayload['note'];
    readonly comment?: CartRawPayload['comment'];
    readonly shippingAddress?: CartRawPayload['shipping_address'];
    readonly billingAddress?: CartRawPayload['billing_address'];
    readonly contact?: CartRawPayload['contact'];
    readonly metadata?: CartRawPayload['metadata'];
    readonly customProperies?: CartRawPayload['custom_properies'];
    readonly shippingFulfillment?: CartRawPayload['shipping_fulfillment'];
    readonly amountTotalGross?: CartRawPayload['amount_total_gross'];
    readonly amountTotalNet?: CartRawPayload['amount_total_net'];
    readonly amountTotalTax?: CartRawPayload['amount_total_tax'];
    readonly amountTotalShippingGross?: CartRawPayload['amount_total_shipping_gross'];
    readonly orderPrompt?: CartRawPayload['order_prompt'];
    readonly storefront?: CartRawPayload['storefront'];
    readonly status?: CartRawPayload['status'];
    readonly discounts?: CartRawPayload['discounts'];
    readonly shippingMethods?: CartRawPayload['shipping_methods'];
    readonly taxesSummary?: CartRawPayload['taxes_summary'];
    readonly proxyPayload?: CartRawPayload['proxy_payload'];
}
export interface AddItemItemOptions {
    product: string;
    qty?: number;
}
export declare class CartItem {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: CartOptions;
    id?: CartItemPayload['id'];
    qty?: CartItemPayload['qty'];
    sku?: CartItemPayload['sku'];
    name?: CartItemPayload['name'];
    amount?: CartItemRawPayload['amount'];
    passive?: CartItemRawPayload['passive'];
    currency?: CartItemRawPayload['currency'];
    vatRate?: CartItemRawPayload['vat_rate'];
    vatClass?: CartItemRawPayload['vat_class'];
    customVatRate?: CartItemRawPayload['custom_vat_rate'];
    taxRegion?: CartItemRawPayload['tax_region'];
    taxCountry?: CartItemRawPayload['tax_country'];
    additionalTaxes?: CartItemRawPayload['additional_taxes'];
    product?: CartItemPayload['product'];
    metadata?: CartItemPayload['metadata'];
    customId?: CartItemPayload['customId'];
    discounts?: CartItemPayload['discounts'];
    orderIndex?: CartItemPayload['orderIndex'];
    customProperties?: CartItemPayload['customProperties'];
    shippingRequired?: CartItemPayload['shippingRequired'];
    externalReferenceId?: CartItemPayload['externalReferenceId'];
    externalReferenceCustomId?: CartItemPayload['externalReferenceCustomId'];
    constructor(options: CartItemOptions);
    protected deserialize(rawPayload: CartItemRawPayload): CartItem;
    static create(payload: CartItemRawPayload, universe: Universe, http: Universe['http']): CartItem;
    serialize(): CartItemRawPayload;
}
export declare class Cart extends UniverseEntity<CartPayload, CartRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: CartOptions;
    initialized: boolean;
    endpoint: string;
    id?: CartPayload['id'];
    currency?: CartPayload['currency'];
    createdAt?: CartPayload['createdAt'];
    updatedAt?: CartPayload['updatedAt'];
    deleted?: CartPayload['deleted'];
    active?: CartPayload['active'];
    name?: CartPayload['name'];
    customId?: CartPayload['custom_id'];
    items?: CartPayload['items'];
    links?: CartPayload['links'];
    isProxy?: CartPayload['isProxy'];
    proxyVendor?: CartPayload['proxyVendor'];
    type?: CartPayload['type'];
    externalReferenceId?: CartPayload['externalReferenceId'];
    externalReferenceCustomId?: CartPayload['externalReferenceCustomId'];
    clientId?: CartPayload['clientId'];
    person?: CartPayload['person'];
    personExternalReferenceId?: CartPayload['personExternalReferenceId'];
    note?: CartPayload['note'];
    comment?: CartPayload['comment'];
    shippingAddress?: CartPayload['shippingAddress'];
    billingAddress?: CartPayload['billingAddress'];
    contact?: CartPayload['contact'];
    metadata?: CartPayload['metadata'];
    customProperies?: CartPayload['customProperies'];
    shippingFulfillment?: CartPayload['shippingFulfillment'];
    amountTotalGross?: CartPayload['amountTotalGross'];
    amountTotalNet?: CartPayload['amountTotalNet'];
    amountTotalTax?: CartPayload['amountTotalTax'];
    amountTotalShippingGross?: CartPayload['amountTotalShippingGross'];
    orderPrompt?: CartPayload['orderPrompt'];
    storefront?: CartPayload['storefront'];
    status?: CartPayload['status'];
    discounts?: CartPayload['discounts'];
    shippingMethods?: CartPayload['shippingMethods'];
    taxesSummary?: CartPayload['taxesSummary'];
    proxyPayload?: CartPayload['proxyPayload'];
    constructor(options: CartOptions);
    protected deserialize(rawPayload: CartRawPayload): Cart;
    static create(payload: CartRawPayload, universe: Universe, http: Universe['http']): Cart;
    serialize(): CartRawPayload;
    init(): Promise<Cart | undefined>;
    addItems(itemsOptions: AddItemItemOptions[]): Promise<Cart>;
}
export declare class Carts {
    static endpoint: string;
}
export declare class CartInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartsFetchCountRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartCreateRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartAddItemsRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
