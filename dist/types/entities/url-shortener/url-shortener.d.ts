import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface UrlShortenerOptions extends UniverseEntityOptions {
    rawPayload?: UrlShortenerRawPayload;
}
export interface UrlShortenerShortendedURL {
    readonly uri: string;
    readonly link: string;
}
export interface UrlShortenerShortenRequest {
    uri: string;
}
export interface UrlShortenerRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string | null;
    readonly uri?: string | null;
    readonly is_proxy?: boolean;
    readonly is_default?: boolean;
    readonly proxy_vendor?: string | null;
    readonly kind?: string | null;
    readonly external_reference_id?: string | null;
    readonly configuration?: {
        shorten_chatout?: boolean;
        [key: string]: any;
    } | null;
    readonly integration_configuration?: string | null;
    readonly is_set_up?: boolean;
    readonly labels?: {
        [key: string]: any;
    } | null;
}
export interface UrlShortenerPayload {
    readonly id?: UrlShortenerRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: UrlShortenerRawPayload['deleted'];
    readonly active?: UrlShortenerRawPayload['active'];
    readonly name?: UrlShortenerRawPayload['name'];
    readonly uri?: UrlShortenerRawPayload['uri'];
    readonly isProxy?: UrlShortenerRawPayload['is_proxy'];
    readonly isDefault?: UrlShortenerRawPayload['is_default'];
    readonly proxyVendor?: UrlShortenerRawPayload['proxy_vendor'];
    readonly kind?: UrlShortenerRawPayload['kind'];
    readonly externalReferenceId?: UrlShortenerRawPayload['external_reference_id'];
    readonly configuration?: UrlShortenerRawPayload['configuration'];
    readonly integrationConfiguration?: UrlShortenerRawPayload['integration_configuration'];
    readonly isSetUp?: UrlShortenerRawPayload['is_set_up'];
    readonly labels?: UrlShortenerRawPayload['labels'];
}
export declare class UrlShortener extends UniverseEntity<UrlShortenerPayload, UrlShortenerRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: UrlShortenerOptions;
    initialized: boolean;
    endpoint: string;
    id?: UrlShortenerPayload['id'];
    createdAt?: UrlShortenerPayload['createdAt'];
    updatedAt?: UrlShortenerPayload['updatedAt'];
    deleted?: UrlShortenerPayload['deleted'];
    active?: UrlShortenerPayload['active'];
    name?: UrlShortenerPayload['name'];
    uri?: UrlShortenerPayload['uri'];
    isProxy?: UrlShortenerPayload['isProxy'];
    isDefault?: UrlShortenerPayload['isDefault'];
    proxyVendor?: UrlShortenerPayload['proxyVendor'];
    kind?: UrlShortenerPayload['kind'];
    externalReferenceId?: UrlShortenerPayload['externalReferenceId'];
    configuration?: UrlShortenerPayload['configuration'];
    integrationConfiguration?: UrlShortenerPayload['integrationConfiguration'];
    isSetUp?: UrlShortenerPayload['isSetUp'];
    labels?: UrlShortenerPayload['labels'];
    constructor(options: UrlShortenerOptions);
    protected deserialize(rawPayload: UrlShortenerRawPayload): UrlShortener;
    static create(payload: UrlShortenerRawPayload, universe: Universe, http: Universe['http']): UrlShortener;
    serialize(): UrlShortenerRawPayload;
    init(): Promise<UrlShortener | undefined>;
    shorten(request: UrlShortenerShortenRequest): Promise<UrlShortenerShortendedURL | undefined>;
}
export declare class UrlShorteners {
    static endpoint: string;
}
export declare class UrlShortenerInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UrlShortenerFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UrlShortenersFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UrlShortenerShortenError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
