import Entity, { EntityOptions, EntityRawPayload } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface AssetOptions extends EntityOptions {
    rawPayload?: AssetRawPayload;
}
export interface AssetsOptions {
    http: Universe['http'];
    universe: Universe;
}
export declare type AssetOptimizationType = 'whatsapp_video_compat' | string;
export interface AssetRawPayload extends EntityRawPayload {
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
    readonly optimizations?: Array<{
        type: AssetOptimizationType;
        payload: string;
    }> | null;
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
    readonly optimizations?: AssetRawPayload['optimizations'];
}
export declare class Asset extends Entity<AssetPayload, AssetRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: AssetOptions;
    initialized: boolean;
    endpoint: string;
    id?: AssetPayload['id'];
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
    optimizations?: AssetPayload['optimizations'];
    constructor(options: AssetOptions);
    protected deserialize(rawPayload: AssetRawPayload): Asset;
    static create(payload: AssetRawPayload, universe: Universe, http: Universe['http']): Asset;
    serialize(): AssetRawPayload;
    init(): Promise<Asset | undefined>;
    upload(payload: FormData, options?: AssetsPostOptions): Promise<Asset[] | undefined>;
    uploadAndTransform(payload: FormData | AssetRawPayload[] | string, contentType: string, options?: AssetsPostOptions): Promise<Asset[]>;
}
export interface AssetsPostOptions {
    public?: boolean;
    transform?: object;
    optimizations: AssetOptimizationType[];
}
export declare class Assets {
    protected http: Universe['http'];
    protected universe: Universe;
    static endpoint: string;
    private readonly options?;
    constructor(options: AssetsOptions);
    post(payload: FormData, options?: AssetsPostOptions): Promise<Asset[] | undefined>;
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
export declare class AssetsPostError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AssetUploadAndTransformError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AssetsUploadError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
