import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface InventoryOptions extends EntityOptions {
    rawPayload?: InventoryRawPayload;
}
export interface InventoryRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly product?: string;
    readonly location?: string | null;
    readonly external_reference_id?: string | null;
    readonly source_api?: string | null;
    readonly source_type?: string | null;
    readonly proxy_vendor?: string | null;
    readonly is_proxy?: boolean;
    readonly qty?: number;
}
export interface InventoryPayload {
    readonly id?: InventoryRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: InventoryRawPayload['deleted'];
    readonly product?: InventoryRawPayload['product'];
    readonly location?: InventoryRawPayload['location'];
    readonly externalReferenceId?: InventoryRawPayload['external_reference_id'];
    readonly sourceApi?: InventoryRawPayload['source_api'];
    readonly sourceType?: InventoryRawPayload['source_type'];
    readonly proxyVendor?: InventoryRawPayload['proxy_vendor'];
    readonly isProxy?: InventoryRawPayload['is_proxy'];
    readonly qty?: InventoryRawPayload['qty'];
}
export declare class Inventory extends Entity<InventoryPayload, InventoryRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: InventoryOptions;
    initialized: boolean;
    endpoint: string;
    id?: InventoryPayload['id'];
    createdAt?: InventoryPayload['createdAt'];
    updatedAt?: InventoryPayload['updatedAt'];
    deleted?: InventoryPayload['deleted'];
    product?: InventoryPayload['product'];
    location?: InventoryPayload['location'];
    externalReferenceId?: InventoryPayload['externalReferenceId'];
    sourceApi?: InventoryPayload['sourceApi'];
    sourceType?: InventoryPayload['sourceType'];
    proxyVendor?: InventoryPayload['proxyVendor'];
    isProxy?: InventoryPayload['isProxy'];
    qty?: InventoryPayload['qty'];
    constructor(options: InventoryOptions);
    protected deserialize(rawPayload: InventoryRawPayload): Inventory;
    static create(payload: InventoryRawPayload, universe: Universe, http: Universe['http']): Inventory;
    serialize(): InventoryRawPayload;
    init(): Promise<Inventory | undefined>;
}
export declare class Inventories {
    static endpoint: string;
}
export declare class InventoryInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class InventoryFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class InventoriesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
