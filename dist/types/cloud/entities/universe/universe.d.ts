import { Client } from 'src/client';
import { APICarrier } from '../../../base';
import Entity, { EntityFetchOptions, EntityOptions } from '../../../entities/_base';
import { BaseError } from '../../../errors';
import { Cloud } from '../../index';
import { UniverseUserRawPayload } from '../user';
export interface CloudUniverseOptions extends EntityOptions {
    rawPayload?: CloudUniverseRawPayload;
}
export interface CloudUniverseRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string | null;
    readonly configuration?: object;
}
export interface CloudUniversePayload {
    readonly id?: CloudUniverseRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: CloudUniverseRawPayload['name'];
    readonly configuration?: CloudUniverseRawPayload['configuration'];
}
export declare class CloudUniverse extends Entity<CloudUniversePayload, CloudUniverseRawPayload> {
    protected apiCarrier: APICarrier;
    protected http: Cloud['http'];
    protected options: CloudUniverseOptions;
    initialized: boolean;
    endpoint: string;
    id?: CloudUniversePayload['id'];
    createdAt?: CloudUniversePayload['createdAt'];
    updatedAt?: CloudUniversePayload['updatedAt'];
    deleted?: CloudUniversePayload['deleted'];
    active?: CloudUniversePayload['active'];
    name?: CloudUniversePayload['name'];
    configuration?: CloudUniversePayload['configuration'];
    constructor(options: CloudUniverseOptions);
    protected deserialize(rawPayload: CloudUniverseRawPayload): CloudUniverse;
    static create(payload: CloudUniverseRawPayload, carrier: Cloud, http: Cloud['http']): CloudUniverse;
    serialize(): CloudUniverseRawPayload;
    init(): Promise<CloudUniverse | undefined>;
    users(options?: EntityFetchOptions): Promise<UniverseUserRawPayload[]>;
    universe(item: any, universe: any, http: Client): any;
}
export declare class CloudUniverses {
    static endpoint: string;
}
export declare class CloudUniverseInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudUniverseFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudUniversesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
