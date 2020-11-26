import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface ProductCategoryOptions extends EntityOptions {
    rawPayload?: ProductCategoryRawPayload;
}
export interface ProductCategoryRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly is_proxy?: boolean;
    readonly name?: string;
    readonly summary?: string;
    readonly custom_id?: string;
    readonly external_reference_id?: string;
    readonly external_reference_custom_id?: string;
    readonly proxy_vendor?: string;
    readonly description?: string;
    readonly comment?: string;
    readonly storefront?: string;
    readonly proxy_payload?: string;
}
export interface ProductCategoryPayload {
    readonly id?: ProductCategoryRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ProductCategoryRawPayload['deleted'];
    readonly active?: ProductCategoryRawPayload['active'];
    readonly isProxy?: ProductCategoryRawPayload['is_proxy'];
    readonly name?: ProductCategoryRawPayload['name'];
    readonly summary?: ProductCategoryRawPayload['summary'];
    readonly customId?: ProductCategoryRawPayload['custom_id'];
    readonly externalReferenceId?: ProductCategoryRawPayload['external_reference_id'];
    readonly externalReferenceCustomId?: ProductCategoryRawPayload['external_reference_custom_id'];
    readonly proxyVendor?: ProductCategoryRawPayload['proxy_vendor'];
    readonly description?: ProductCategoryRawPayload['description'];
    readonly comment?: ProductCategoryRawPayload['comment'];
    readonly storefront?: ProductCategoryRawPayload['storefront'];
    readonly proxyPayload?: ProductCategoryRawPayload['proxy_payload'];
}
export declare class ProductCategory extends Entity<ProductCategoryPayload, ProductCategoryRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: ProductCategoryOptions;
    initialized: boolean;
    endpoint: string;
    id?: ProductCategoryPayload['id'];
    createdAt?: ProductCategoryPayload['createdAt'];
    updatedAt?: ProductCategoryPayload['updatedAt'];
    deleted?: ProductCategoryPayload['deleted'];
    active?: ProductCategoryPayload['active'];
    isProxy?: ProductCategoryPayload['isProxy'];
    name?: ProductCategoryPayload['name'];
    summary?: ProductCategoryPayload['summary'];
    customId?: ProductCategoryPayload['customId'];
    externalReferenceId?: ProductCategoryPayload['externalReferenceId'];
    externalReferenceCustomId?: ProductCategoryPayload['externalReferenceCustomId'];
    proxyVendor?: ProductCategoryPayload['proxyVendor'];
    description?: ProductCategoryPayload['description'];
    comment?: ProductCategoryPayload['comment'];
    storefront?: ProductCategoryPayload['storefront'];
    proxyPayload?: ProductCategoryPayload['proxyPayload'];
    constructor(options: ProductCategoryOptions);
    protected deserialize(rawPayload: ProductCategoryRawPayload): ProductCategory;
    static create(payload: ProductCategoryRawPayload, universe: Universe, http: Universe['http']): ProductCategory;
    serialize(): ProductCategoryRawPayload;
    init(): Promise<ProductCategory | undefined>;
}
export declare class ProductCategories {
    static endpoint: string;
}
export declare class ProductCategoryInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductCategoryFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductCategoriesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
