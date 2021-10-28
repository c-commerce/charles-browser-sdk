import { APICarrier } from '../../../base';
import Entity, { EntityOptions } from '../../../entities/_base';
import { BaseError } from '../../../errors';
import type { Cloud } from '../../index';
export interface ReleaseOptions extends EntityOptions {
    rawPayload?: ReleaseRawPayload;
}
export interface ReleaseRawPayload {
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
export interface ReleasePaylod {
    readonly id?: ReleaseRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ReleaseRawPayload['deleted'];
    readonly active?: ReleaseRawPayload['active'];
    readonly name?: ReleaseRawPayload['name'];
    readonly status?: ReleaseRawPayload['status'];
    readonly configuration?: ReleaseRawPayload['configuration'];
    readonly product?: ReleaseRawPayload['product'];
    readonly productName?: ReleaseRawPayload['product_name'];
    readonly channel?: ReleaseRawPayload['channel'];
    readonly defaultDisplayName?: ReleaseRawPayload['default_display_name'];
}
export declare class Release extends Entity<ReleasePaylod, ReleaseRawPayload> {
    protected apiCarrier: APICarrier;
    protected http: Cloud['http'];
    protected options: ReleaseOptions;
    initialized: boolean;
    endpoint: string;
    id?: ReleasePaylod['id'];
    createdAt?: ReleasePaylod['createdAt'];
    updatedAt?: ReleasePaylod['updatedAt'];
    deleted?: ReleasePaylod['deleted'];
    active?: ReleasePaylod['active'];
    name?: ReleasePaylod['name'];
    status?: ReleasePaylod['status'];
    configuration?: ReleasePaylod['configuration'];
    product?: ReleasePaylod['product'];
    productName?: ReleasePaylod['productName'];
    channel?: ReleasePaylod['channel'];
    defaultDisplayName?: ReleasePaylod['defaultDisplayName'];
    constructor(options: ReleaseOptions);
    protected deserialize(rawPayload: ReleaseRawPayload): Release;
    static create(payload: ReleaseRawPayload, carrier: Cloud, http: Cloud['http']): Release;
    serialize(): ReleaseRawPayload;
    init(): Promise<Release | undefined>;
}
export declare class Releases {
    static endpoint: string;
}
export declare class ReleaseInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ReleaseFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ReleasesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
