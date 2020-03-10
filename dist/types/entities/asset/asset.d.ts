/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface AssetOptions {
    universe: Universe;
    http: Universe['http'];
    rawPayload?: AssetRawPayload;
    initialized?: boolean;
}
export interface AssetRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly uri?: string;
    readonly mime_type?: string;
    readonly storage_type?: string;
    readonly payload_id?: string;
    readonly original_name?: string;
    readonly comment?: string;
    readonly metadata?: object | null;
    readonly public?: boolean;
}
export interface AssetPayload {
    readonly id?: AssetRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly uri?: string;
    readonly mimeType?: string;
    readonly storageType?: string;
    readonly payloadId?: string;
    readonly originalName?: string;
    readonly comment?: string;
    readonly metadata?: object | null;
    readonly public?: boolean;
}
export declare class Asset extends EventEmitter {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: AssetOptions;
    initialized: boolean;
    endpoint: string;
    id?: string;
    createdAt?: AssetPayload['createdAt'];
    updatedAt?: AssetPayload['updatedAt'];
    deleted?: AssetPayload['deleted'];
    active?: AssetPayload['active'];
    uri?: AssetPayload['uri'];
    mimeType?: AssetPayload['mimeType'];
    storageType?: AssetPayload['storageType'];
    payloadId?: AssetPayload['payloadId'];
    originalName?: AssetPayload['originalName'];
    comment?: AssetPayload['comment'];
    metadata?: AssetPayload['metadata'];
    public?: AssetPayload['public'];
    constructor(options: AssetOptions);
    private deserialize;
    static create(payload: AssetRawPayload, universe: Universe, http: Universe['http']): Asset;
    serialize(): AssetRawPayload;
    init(): Promise<Asset | undefined>;
    fetch(): Promise<Asset | undefined>;
    private handleError;
}
export declare class Assets {
    static endpoint: string;
}
export declare class AssetInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AssetFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AssetsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
