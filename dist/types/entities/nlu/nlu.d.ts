import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface NluOptions extends UniverseEntityOptions {
    rawPayload?: NluRawPayload;
}
export interface NluRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly description?: string;
    readonly bot_staff?: string;
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: string;
    readonly configuration?: object;
    readonly integration_configuration?: string;
    readonly is_set_up?: boolean;
    readonly metadata?: object;
    readonly payload?: object;
    readonly links?: object;
}
export interface NluPayload {
    readonly id?: NluRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: NluRawPayload['deleted'];
    readonly active?: NluRawPayload['active'];
    readonly name?: NluRawPayload['name'];
    readonly description?: NluRawPayload['description'];
    readonly botStaff?: NluRawPayload['bot_staff'];
    readonly isProxy?: NluRawPayload['is_proxy'];
    readonly proxyVendor?: NluRawPayload['proxy_vendor'];
    readonly configuration?: NluRawPayload['configuration'];
    readonly integrationConfiguration?: NluRawPayload['integration_configuration'];
    readonly isSetUp?: NluRawPayload['is_set_up'];
    readonly metadata?: NluRawPayload['metadata'];
    readonly payload?: NluRawPayload['payload'];
    readonly links?: NluRawPayload['links'];
}
export declare class Nlu extends UniverseEntity<NluPayload, NluRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: NluOptions;
    initialized: boolean;
    endpoint: string;
    id?: NluPayload['id'];
    createdAt?: NluPayload['createdAt'];
    updatedAt?: NluPayload['updatedAt'];
    deleted?: NluPayload['deleted'];
    active?: NluPayload['active'];
    name?: NluPayload['name'];
    description?: NluPayload['description'];
    botStaff?: NluPayload['botStaff'];
    isProxy?: NluPayload['isProxy'];
    proxyVendor?: NluPayload['proxyVendor'];
    configuration?: NluPayload['configuration'];
    integrationConfiguration?: NluPayload['integrationConfiguration'];
    isSetUp?: NluPayload['isSetUp'];
    metadata?: NluPayload['metadata'];
    payload?: NluPayload['payload'];
    links?: NluPayload['links'];
    constructor(options: NluOptions);
    protected deserialize(rawPayload: NluRawPayload): Nlu;
    static create(payload: NluRawPayload, universe: Universe, http: Universe['http']): Nlu;
    serialize(): NluRawPayload;
    init(): Promise<Nlu | undefined>;
    syncIntents(): Promise<number | undefined>;
}
export declare class Nlus {
    static endpoint: string;
}
export declare class NluInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NluFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NlusFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NlusSyncIntentsRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
