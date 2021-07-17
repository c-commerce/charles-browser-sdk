import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface ApiKeyOptions extends UniverseEntityOptions {
    rawPayload?: ApiKeyRawPayload;
}
export interface ApiKeyRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly description?: string;
    readonly permissions?: string[];
    readonly labels?: object;
    readonly api_key?: string;
}
export interface ApiKeyPayload {
    readonly id?: ApiKeyRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ApiKeyRawPayload['deleted'];
    readonly active?: ApiKeyRawPayload['active'];
    readonly name?: ApiKeyRawPayload['name'];
    readonly description?: ApiKeyRawPayload['description'];
    readonly permissions?: ApiKeyRawPayload['permissions'];
    readonly labels?: ApiKeyRawPayload['labels'];
    readonly apiKey?: ApiKeyRawPayload['api_key'];
}
export declare class ApiKey extends UniverseEntity<ApiKeyPayload, ApiKeyRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: ApiKeyOptions;
    initialized: boolean;
    endpoint: string;
    id?: ApiKeyPayload['id'];
    createdAt?: ApiKeyPayload['createdAt'];
    updatedAt?: ApiKeyPayload['updatedAt'];
    deleted?: ApiKeyPayload['deleted'];
    active?: ApiKeyPayload['active'];
    name?: ApiKeyPayload['name'];
    description?: ApiKeyPayload['description'];
    permissions?: ApiKeyPayload['permissions'];
    labels?: ApiKeyPayload['labels'];
    apiKey?: ApiKeyPayload['apiKey'];
    constructor(options: ApiKeyOptions);
    protected deserialize(rawPayload: ApiKeyRawPayload): ApiKey;
    static create(payload: ApiKeyRawPayload, universe: Universe, http: Universe['http']): ApiKey;
    serialize(): ApiKeyRawPayload;
    init(): Promise<ApiKey | undefined>;
}
export declare class ApiKeys {
    static endpoint: string;
}
export declare class ApiKeyInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ApiKeyFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ApiKeysFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
