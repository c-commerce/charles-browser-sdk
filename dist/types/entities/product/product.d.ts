import Entity, { EntityOptions, EntityRawPayload } from '../_base';
import { Universe } from '../../universe';
import { Inventory } from '../inventory';
import { BaseError } from '../../errors';
export interface ProductOptions extends EntityOptions {
    rawPayload?: ProductRawPayload;
}
export interface ProductRawPayloadPrice {
    readonly calculatory_base_price?: number;
    readonly calculatory_margin?: number;
    readonly calculatory_cost_and_expense?: number;
    readonly amount?: {
        net: number;
        gross: number;
    };
    readonly vat_class?: string;
    readonly custom_vat_rate?: number;
    readonly currency?: string;
    readonly tax_country?: string;
    readonly tax_region?: string;
}
export interface ProductRawPayloadChild {
    readonly id?: ProductRawPayload['id'];
    readonly name?: ProductRawPayload['name'];
    readonly custom_id?: ProductRawPayload['custom_id'];
    readonly attributes?: ProductRawPayload['attributes'];
}
export interface ProductRawPayload extends EntityRawPayload {
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly custom_id?: string;
    readonly name?: string;
    readonly summary?: string;
    readonly description?: string;
    readonly brand?: string;
    readonly assets?: string[];
    readonly assets_config?: object;
    readonly condition?: string;
    readonly manufacturers?: string[];
    readonly suppliers?: string[];
    readonly produced_at?: string;
    readonly purchased_at?: string;
    readonly released_at?: string;
    readonly similar_to?: string[];
    readonly related_to?: string[];
    readonly audiences?: string[];
    readonly keywords?: string[];
    readonly categories?: string[];
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: string;
    readonly type?: string;
    readonly attributes?: object;
    readonly sku?: string;
    readonly stock_minimum?: number;
    readonly stock_maximum?: number;
    readonly stockable?: boolean;
    readonly parent?: string;
    readonly seasons?: string;
    readonly tags?: string[];
    readonly codes?: object[];
    readonly i18n?: object[];
    readonly external_reference_id?: string;
    readonly external_reference_custom_id?: string;
    readonly client_id?: string;
    readonly discountable?: boolean;
    readonly linkable?: boolean;
    readonly is_service?: boolean;
    readonly warranty_notice?: string;
    readonly refund_policy?: string;
    readonly disclaimer?: string;
    readonly offline_available?: boolean;
    readonly online_available?: boolean;
    readonly shipping_required?: boolean;
    readonly proxy_configuration?: object;
    readonly inventory_external_reference_id?: string | null;
    readonly metadata?: object;
    readonly prices?: {
        default_prices: ProductRawPayloadPrice[];
    };
    readonly children?: ProductRawPayloadChild[];
    readonly options?: object[];
}
export interface ProductPayload {
    readonly id?: ProductRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly custom_id?: string;
    readonly name?: string;
    readonly summary?: string;
    readonly description?: string;
    readonly brand?: string;
    readonly assets?: string[];
    readonly assets_config?: object;
    readonly condition?: string;
    readonly manufacturers?: string[];
    readonly suppliers?: string[];
    readonly produced_at?: Date | null;
    readonly purchased_at?: Date | null;
    readonly released_at?: Date | null;
    readonly similar_to?: string[];
    readonly related_to?: string[];
    readonly audiences?: string[];
    readonly keywords?: string[];
    readonly categories?: string[];
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: string;
    readonly type?: string;
    readonly attributes?: object;
    readonly sku?: string;
    readonly stock_minimum?: number;
    readonly stock_maximum?: number;
    readonly stockable?: boolean;
    readonly parent?: string;
    readonly seasons?: string;
    readonly tags?: string[];
    readonly codes?: object[];
    readonly i18n?: object[];
    readonly external_reference_id?: string;
    readonly external_reference_custom_id?: string;
    readonly client_id?: string;
    readonly discountable?: boolean;
    readonly linkable?: boolean;
    readonly is_service?: boolean;
    readonly warranty_notice?: string;
    readonly refund_policy?: string;
    readonly disclaimer?: string;
    readonly offline_available?: boolean;
    readonly online_available?: boolean;
    readonly shipping_required?: boolean;
    readonly proxy_configuration?: object;
    readonly inventoryExternalReferenceId?: ProductRawPayload['inventory_external_reference_id'];
    readonly metadata?: object;
    readonly prices?: ProductRawPayload['prices'];
    readonly children?: ProductRawPayload['children'];
    readonly options?: ProductRawPayload['options'];
}
export declare class Product extends Entity<ProductPayload, ProductRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: ProductOptions;
    initialized: boolean;
    endpoint: string;
    id?: ProductPayload['id'];
    createdAt?: ProductPayload['createdAt'];
    updatedAt?: ProductPayload['updatedAt'];
    deleted?: ProductPayload['deleted'];
    active?: ProductPayload['active'];
    customId?: ProductPayload['custom_id'];
    name?: ProductPayload['name'];
    summary?: ProductPayload['summary'];
    description?: ProductPayload['description'];
    prices?: ProductPayload['prices'];
    brand?: ProductPayload['brand'];
    assets?: ProductPayload['assets'];
    assetsConfig?: ProductPayload['assets_config'];
    condition?: ProductPayload['condition'];
    manufacturers?: ProductPayload['manufacturers'];
    suppliers?: ProductPayload['suppliers'];
    producedAt?: ProductPayload['produced_at'];
    purchasedAt?: ProductPayload['purchased_at'];
    releasedAt?: ProductPayload['released_at'];
    similarTo?: ProductPayload['similar_to'];
    relatedTo?: ProductPayload['related_to'];
    audiences?: ProductPayload['audiences'];
    keywords?: ProductPayload['keywords'];
    categories?: ProductPayload['categories'];
    isProxy?: ProductPayload['is_proxy'];
    proxyVendor?: ProductPayload['proxy_vendor'];
    type?: ProductPayload['type'];
    attributes?: ProductPayload['attributes'];
    sku?: ProductPayload['sku'];
    stockMinimum?: ProductPayload['stock_minimum'];
    stockMaximum?: ProductPayload['stock_maximum'];
    stockable?: ProductPayload['stockable'];
    parent?: ProductPayload['parent'];
    seasons?: ProductPayload['seasons'];
    tags?: ProductPayload['tags'];
    codes?: ProductPayload['codes'];
    i18n?: ProductPayload['i18n'];
    externalReferenceId?: ProductPayload['external_reference_id'];
    externalReferenceCustomId?: ProductPayload['external_reference_custom_id'];
    clientId?: ProductPayload['client_id'];
    discountable?: ProductPayload['discountable'];
    linkable?: ProductPayload['linkable'];
    isService?: ProductPayload['is_service'];
    warrantyNotice?: ProductPayload['warranty_notice'];
    refundPolicy?: ProductPayload['refund_policy'];
    disclaimer?: ProductPayload['disclaimer'];
    offlineAvailable?: ProductPayload['offline_available'];
    onlineAvailable?: ProductPayload['online_available'];
    shippingFequired?: ProductPayload['shipping_required'];
    proxyConfiguration?: ProductPayload['proxy_configuration'];
    inventoryExternalReferenceId?: ProductPayload['inventoryExternalReferenceId'];
    metadata?: ProductPayload['metadata'];
    children?: ProductPayload['children'];
    attributesOptions?: ProductPayload['options'];
    constructor(options: ProductOptions);
    protected deserialize(rawPayload: ProductRawPayload): Product;
    static create(payload: ProductRawPayload, universe: Universe, http: Universe['http']): Product;
    serialize(): ProductRawPayload;
    init(): Promise<Product | undefined>;
    inventory(): Promise<Inventory[] | undefined>;
}
export declare class Products {
    static endpoint: string;
}
export declare class ProductInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductsFetchCountRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductInventoryError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
