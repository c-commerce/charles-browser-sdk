import { APICarrier } from '../../../base';
import Entity, { EntityOptions } from '../../../entities/_base';
import { BaseError } from '../../../errors';
import type { Cloud } from '../../index';
export interface ProductOptions extends EntityOptions {
    rawPayload?: ProductRawPayload;
}
export interface ProductRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly status?: string;
    readonly configuration?: {
        [key: string]: any;
    };
    readonly product?: string;
    readonly product_name?: string;
    readonly channel?: string;
    readonly default_display_name?: string;
}
export interface ProductPaylod {
    readonly id?: ProductRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ProductRawPayload['deleted'];
    readonly active?: ProductRawPayload['active'];
    readonly name?: ProductRawPayload['name'];
    readonly status?: ProductRawPayload['status'];
    readonly configuration?: ProductRawPayload['configuration'];
    readonly channel?: ProductRawPayload['channel'];
    readonly defaultDisplayName?: ProductRawPayload['default_display_name'];
}
export declare class Product extends Entity<ProductPaylod, ProductRawPayload> {
    protected apiCarrier: APICarrier;
    protected http: Cloud['http'];
    protected options: ProductOptions;
    initialized: boolean;
    endpoint: string;
    id?: ProductPaylod['id'];
    createdAt?: ProductPaylod['createdAt'];
    updatedAt?: ProductPaylod['updatedAt'];
    deleted?: ProductPaylod['deleted'];
    active?: ProductPaylod['active'];
    name?: ProductPaylod['name'];
    status?: ProductPaylod['status'];
    configuration?: ProductPaylod['configuration'];
    channel?: ProductPaylod['channel'];
    defaultDisplayName?: ProductPaylod['defaultDisplayName'];
    constructor(options: ProductOptions);
    protected deserialize(rawPayload: ProductRawPayload): Product;
    static create(payload: ProductRawPayload, carrier: Cloud, http: Cloud['http']): Product;
    serialize(): ProductRawPayload;
    init(): Promise<Product | undefined>;
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
