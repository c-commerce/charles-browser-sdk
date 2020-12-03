import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface LocationOptions extends EntityOptions {
    rawPayload?: LocationRawPayload;
}
export interface LocationAddressOptions extends EntityOptions {
    rawPayload?: LocationAddressRawPayload;
}
export interface LocationRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly description?: string;
    readonly external_reference_id?: string;
    readonly proxy_vendor?: 'shopify' | string;
    readonly source_type?: 'shopify' | string;
    readonly source_api?: 'shopify' | string;
    readonly has_inventory?: boolean;
    readonly use_inventory?: boolean;
    readonly is_default?: boolean;
    readonly can_sell?: boolean;
    readonly addresses?: LocationAddressRawPayload[];
}
export interface LocationPayload {
    readonly id?: LocationRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: LocationRawPayload['deleted'];
    readonly active?: LocationRawPayload['active'];
    readonly name?: LocationRawPayload['name'];
    readonly description?: LocationRawPayload['description'];
    readonly externalReferenceId?: LocationRawPayload['external_reference_id'];
    readonly proxyVendor?: LocationRawPayload['proxy_vendor'];
    readonly sourceType?: LocationRawPayload['source_type'];
    readonly sourceApi?: LocationRawPayload['source_api'];
    readonly hasInventory?: LocationRawPayload['has_inventory'];
    readonly useInventory?: LocationRawPayload['use_inventory'];
    readonly isDefault?: LocationRawPayload['is_default'];
    readonly canSell?: LocationRawPayload['can_sell'];
    readonly addresses?: LocationRawPayload['addresses'];
}
export interface LocationAddressPayload {
    readonly lines?: LocationAddressRawPayload['lines'];
    readonly company?: LocationAddressRawPayload['company'];
    readonly phone?: LocationAddressRawPayload['phone'];
    readonly locality?: LocationAddressRawPayload['locality'];
    readonly region?: LocationAddressRawPayload['region'];
    readonly postalCode?: LocationAddressRawPayload['postal_code'];
    readonly country?: LocationAddressRawPayload['country'];
    readonly type?: LocationAddressRawPayload['type'];
}
export interface LocationAddressRawPayload {
    readonly lines?: string[];
    readonly company?: string;
    readonly phone?: string;
    readonly locality?: string;
    readonly region?: string;
    readonly postal_code?: string;
    readonly country?: string;
    readonly type?: 'delivery' | 'billing' | 'generic' | string;
}
export declare class Location extends Entity<LocationPayload, LocationRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: LocationOptions;
    initialized: boolean;
    endpoint: string;
    id?: LocationPayload['id'];
    createdAt?: LocationPayload['createdAt'];
    updatedAt?: LocationPayload['updatedAt'];
    deleted?: LocationPayload['deleted'];
    active?: LocationPayload['active'];
    name?: LocationPayload['name'];
    description?: LocationPayload['description'];
    externalReferenceId?: LocationPayload['externalReferenceId'];
    proxyVendor?: LocationPayload['proxyVendor'];
    sourceType?: LocationPayload['sourceType'];
    sourceApi?: LocationPayload['sourceApi'];
    hasInventory?: LocationPayload['hasInventory'];
    useInventory?: LocationPayload['useInventory'];
    isDefault?: LocationPayload['isDefault'];
    canSell?: LocationPayload['canSell'];
    addresses?: LocationPayload['addresses'];
    constructor(options: LocationOptions);
    protected deserialize(rawPayload: LocationRawPayload): Location;
    static create(payload: LocationRawPayload, universe: Universe, http: Universe['http']): Location;
    serialize(): LocationRawPayload;
    init(): Promise<Location | undefined>;
}
export declare class Locations {
    static endpoint: string;
}
export declare class LocationInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class LocationFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class LocationsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
