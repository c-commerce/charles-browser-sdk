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
}
export interface ProductCategoryPayload {
    readonly id?: ProductCategoryRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ProductCategoryRawPayload['deleted'];
    readonly active?: ProductCategoryRawPayload['active'];
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
