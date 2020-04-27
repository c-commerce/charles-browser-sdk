import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface ProductCategoryTreeOptions extends EntityOptions {
    rawPayload?: ProductCategoryTreeRawPayload;
}
export interface ProductCategoryTreeRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
}
export interface ProductCategoryTreePayload {
    readonly id?: ProductCategoryTreeRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ProductCategoryTreeRawPayload['deleted'];
    readonly active?: ProductCategoryTreeRawPayload['active'];
}
export declare class ProductCategoryTree extends Entity<ProductCategoryTreePayload, ProductCategoryTreeRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: ProductCategoryTreeOptions;
    initialized: boolean;
    endpoint: string;
    id?: ProductCategoryTreePayload['id'];
    createdAt?: ProductCategoryTreePayload['createdAt'];
    updatedAt?: ProductCategoryTreePayload['updatedAt'];
    deleted?: ProductCategoryTreePayload['deleted'];
    active?: ProductCategoryTreePayload['active'];
    constructor(options: ProductCategoryTreeOptions);
    protected deserialize(rawPayload: ProductCategoryTreeRawPayload): ProductCategoryTree;
    static create(payload: ProductCategoryTreeRawPayload, universe: Universe, http: Universe['http']): ProductCategoryTree;
    serialize(): ProductCategoryTreeRawPayload;
    init(): Promise<ProductCategoryTree | undefined>;
}
export declare class ProductCategoryTrees {
    static endpoint: string;
}
export declare class ProductCategoryTreeInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductCategoryTreeFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductCategoryTreesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
