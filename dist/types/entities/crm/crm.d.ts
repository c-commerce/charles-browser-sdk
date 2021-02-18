import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface CRMOptions extends EntityOptions {
    rawPayload?: CRMRawPayload;
}
export interface CRMRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly uri?: string;
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: string | any;
    readonly configuration?: object | any;
    readonly integration_configuration?: string | any;
    readonly is_set_up?: boolean;
    readonly metadata?: object | any;
    readonly labels?: object | any;
}
export interface CRMPayload {
    readonly id?: CRMRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: CRMRawPayload['deleted'];
    readonly active?: CRMRawPayload['active'];
    readonly name?: CRMRawPayload['name'];
    readonly uri?: CRMRawPayload['uri'];
    readonly isProxy?: CRMRawPayload['is_proxy'];
    readonly proxyVendor?: CRMRawPayload['proxy_vendor'];
    readonly configuration?: CRMRawPayload['configuration'];
    readonly integrationConfiguration?: CRMRawPayload['integration_configuration'];
    readonly isSetUp?: CRMRawPayload['is_set_up'];
    readonly metadata?: CRMRawPayload['metadata'];
    readonly labels?: CRMRawPayload['labels'];
}
export declare class CRM extends Entity<CRMPayload, CRMRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: CRMOptions;
    initialized: boolean;
    endpoint: string;
    id?: CRMPayload['id'];
    createdAt?: CRMPayload['createdAt'];
    updatedAt?: CRMPayload['updatedAt'];
    deleted?: CRMPayload['deleted'];
    active?: CRMPayload['active'];
    name?: CRMPayload['name'];
    uri?: CRMPayload['uri'];
    isProxy?: CRMPayload['isProxy'];
    proxyVendor?: CRMPayload['proxyVendor'];
    configuration?: CRMPayload['configuration'];
    integrationConfiguration?: CRMPayload['integrationConfiguration'];
    isSetUp?: CRMPayload['isSetUp'];
    metadata?: CRMPayload['metadata'];
    labels?: CRMPayload['labels'];
    constructor(options: CRMOptions);
    protected deserialize(rawPayload: CRMRawPayload): CRM;
    static create(payload: CRMRawPayload, universe: Universe, http: Universe['http']): CRM;
    serialize(): CRMRawPayload;
    init(): Promise<CRM | undefined>;
}
export declare class CRMs {
    static endpoint: string;
}
export declare class CRMInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CRMFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CRMsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
