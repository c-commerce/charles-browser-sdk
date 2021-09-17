import Entity, { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface StorefrontScriptOptions extends UniverseEntityOptions {
    rawPayload?: StorefrontScriptRawPayload;
}
export interface StorefrontScriptRawPayload {
    readonly id?: string;
    readonly storefront?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly external_reference_id?: string;
    readonly name?: string;
    readonly src?: string;
    readonly display_scope?: string;
    readonly cache_enabled?: boolean;
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: string | any;
    readonly configuration?: object | any;
    readonly is_set_up?: boolean;
    readonly metadata?: object | any;
}
export interface StorefrontScriptPayload {
    readonly id?: StorefrontScriptRawPayload['id'];
    readonly storefront?: StorefrontScriptRawPayload['storefront'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: StorefrontScriptRawPayload['deleted'];
    readonly active?: StorefrontScriptRawPayload['active'];
    readonly externalReferenceId?: StorefrontScriptRawPayload['external_reference_id'];
    readonly name?: StorefrontScriptRawPayload['name'];
    readonly src?: StorefrontScriptRawPayload['src'];
    readonly displayScope?: StorefrontScriptRawPayload['display_scope'];
    readonly cacheEnabled?: StorefrontScriptRawPayload['cache_enabled'];
    readonly isProxy?: StorefrontScriptRawPayload['is_proxy'];
    readonly proxyVendor?: StorefrontScriptRawPayload['proxy_vendor'];
    readonly configuration?: StorefrontScriptRawPayload['configuration'];
    readonly isSetUp?: StorefrontScriptRawPayload['is_set_up'];
    readonly metadata?: StorefrontScriptRawPayload['metadata'];
}
export declare class StorefrontScript extends UniverseEntity<StorefrontScriptPayload, StorefrontScriptRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: StorefrontScriptOptions;
    initialized: boolean;
    endpoint: string;
    id?: StorefrontScriptPayload['id'];
    storefront?: StorefrontScriptPayload['storefront'];
    createdAt?: StorefrontScriptPayload['createdAt'];
    updatedAt?: StorefrontScriptPayload['updatedAt'];
    deleted?: StorefrontScriptPayload['deleted'];
    active?: StorefrontScriptPayload['active'];
    externalReferenceId?: StorefrontScriptPayload['externalReferenceId'];
    name?: StorefrontScriptPayload['name'];
    src?: StorefrontScriptPayload['src'];
    displayScope?: StorefrontScriptPayload['displayScope'];
    cacheEnabled?: StorefrontScriptPayload['cacheEnabled'];
    isProxy?: StorefrontScriptPayload['isProxy'];
    proxyVendor?: StorefrontScriptPayload['proxyVendor'];
    configuration?: StorefrontScriptPayload['configuration'];
    isSetUp?: StorefrontScriptPayload['isSetUp'];
    metadata?: StorefrontScriptPayload['metadata'];
    constructor(options: StorefrontScriptOptions);
    protected deserialize(rawPayload: StorefrontScriptRawPayload): StorefrontScript;
    static create(payload: StorefrontScriptRawPayload, universe: Universe, http: Universe['http']): StorefrontScript;
    serialize(): StorefrontScriptRawPayload;
    init(): Promise<StorefrontScript | undefined>;
    patch(changePart: StorefrontScriptRawPayload): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>>;
    post(): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>>;
    put(): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>>;
    delete(): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>>;
    save(payload?: StorefrontScriptRawPayload): Promise<Entity<StorefrontScriptPayload, StorefrontScriptRawPayload>>;
}
export declare class StorefrontScripts {
    static endpoint: string;
}
export declare class StorefrontScriptNoStorefrontError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontScriptInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontScriptFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontScriptsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
