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
}
export interface AssetPayload {
    readonly id?: AssetRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
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
