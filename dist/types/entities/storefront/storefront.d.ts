import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { StorefrontScript, StorefrontScriptRawPayload } from './storefront-script';
export interface StorefrontOptions extends UniverseEntityOptions {
    rawPayload?: StorefrontRawPayload;
}
export interface StorefrontRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly uri?: string;
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: string | any;
    readonly configuration?: object | any;
    readonly integration_configuration?: string | any;
    readonly is_set_up?: boolean;
    readonly metadata?: object | any;
}
export interface StorefrontPayload {
    readonly id?: StorefrontRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: StorefrontRawPayload['deleted'];
    readonly active?: StorefrontRawPayload['active'];
    readonly name?: StorefrontRawPayload['name'];
    readonly uri?: StorefrontRawPayload['uri'];
    readonly isProxy?: StorefrontRawPayload['is_proxy'];
    readonly proxyVendor?: StorefrontRawPayload['proxy_vendor'];
    readonly configuration?: StorefrontRawPayload['configuration'];
    readonly integrationConfiguration?: StorefrontRawPayload['integration_configuration'];
    readonly isSetUp?: StorefrontRawPayload['is_set_up'];
    readonly metadata?: StorefrontRawPayload['metadata'];
}
export declare class Storefront extends UniverseEntity<StorefrontPayload, StorefrontRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: StorefrontOptions;
    initialized: boolean;
    endpoint: string;
    id?: StorefrontPayload['id'];
    createdAt?: StorefrontPayload['createdAt'];
    updatedAt?: StorefrontPayload['updatedAt'];
    deleted?: StorefrontPayload['deleted'];
    active?: StorefrontPayload['active'];
    name?: StorefrontPayload['name'];
    uri?: StorefrontPayload['uri'];
    isProxy?: StorefrontPayload['isProxy'];
    proxyVendor?: StorefrontPayload['proxyVendor'];
    configuration?: StorefrontPayload['configuration'];
    integrationConfiguration?: StorefrontPayload['integrationConfiguration'];
    isSetUp?: StorefrontPayload['isSetUp'];
    metadata?: StorefrontPayload['metadata'];
    constructor(options: StorefrontOptions);
    protected deserialize(rawPayload: StorefrontRawPayload): Storefront;
    static create(payload: StorefrontRawPayload, universe: Universe, http: Universe['http']): Storefront;
    serialize(): StorefrontRawPayload;
    init(): Promise<Storefront | undefined>;
    setup(): Promise<number>;
    syncProducts(): Promise<number | undefined>;
    syncOrders(): Promise<number | undefined>;
    syncInventories(): Promise<number | undefined>;
    syncLocations(): Promise<number | undefined>;
    syncProductCategories(): Promise<number | undefined>;
    syncShippingMethods(): Promise<number | undefined>;
    getScripts(options?: EntityFetchOptions): Promise<StorefrontScript[] | StorefrontScriptRawPayload[] | undefined>;
}
export declare class Storefronts {
    static endpoint: string;
}
export declare class StorefrontInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontSyncProductsRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontSyncOrdersRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontSyncInventoriesRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontSyncShippingMethodsRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontSetupRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontSyncLocationsRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontSyncProductCategoriesRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
