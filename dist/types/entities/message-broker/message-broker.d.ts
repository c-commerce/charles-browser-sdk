import Entity, { EntityOptions, EntityFetchOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { Route, RouteRawPayload } from '../route';
export interface MessageBrokerOptions extends EntityOptions {
    rawPayload?: MessageBrokerRawPayload;
}
export interface MessageBrokerRawPayload {
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
    readonly labels?: null | {
        [key: string]: any;
    };
    readonly details?: null | {
        routes: RouteRawPayload[];
        [key: string]: any;
    };
    readonly profile?: {
        email: string;
        description: string;
        about: string;
        address: string;
        vertical: string;
        websites: any[];
        logo: string;
    } | any;
}
export interface MessageBrokerPayload {
    readonly id?: MessageBrokerRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: MessageBrokerRawPayload['deleted'];
    readonly active?: MessageBrokerRawPayload['active'];
    readonly name?: MessageBrokerRawPayload['name'];
    readonly uri?: MessageBrokerRawPayload['uri'];
    readonly isProxy?: MessageBrokerRawPayload['is_proxy'];
    readonly proxyVendor?: MessageBrokerRawPayload['proxy_vendor'];
    readonly configuration?: MessageBrokerRawPayload['configuration'];
    readonly integrationConfiguration?: MessageBrokerRawPayload['integration_configuration'];
    readonly isSetUp?: MessageBrokerRawPayload['is_set_up'];
    readonly metadata?: MessageBrokerRawPayload['metadata'];
    readonly labels?: MessageBrokerRawPayload['labels'];
    readonly details?: null | {
        routes: Route[];
        [key: string]: any;
    };
    readonly profile?: MessageBrokerRawPayload['profile'];
}
export declare class MessageBroker extends Entity<MessageBrokerPayload, MessageBrokerRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: MessageBrokerOptions;
    initialized: boolean;
    endpoint: string;
    id?: MessageBrokerPayload['id'];
    createdAt?: MessageBrokerPayload['createdAt'];
    updatedAt?: MessageBrokerPayload['updatedAt'];
    deleted?: MessageBrokerPayload['deleted'];
    active?: MessageBrokerPayload['active'];
    name?: MessageBrokerPayload['name'];
    uri?: MessageBrokerPayload['uri'];
    isProxy?: MessageBrokerPayload['isProxy'];
    proxyVendor?: MessageBrokerPayload['proxyVendor'];
    configuration?: MessageBrokerPayload['configuration'];
    integrationConfiguration?: MessageBrokerPayload['integrationConfiguration'];
    isSetUp?: MessageBrokerPayload['isSetUp'];
    metadata?: MessageBrokerPayload['metadata'];
    labels?: MessageBrokerPayload['labels'];
    details?: MessageBrokerPayload['details'];
    profile?: MessageBrokerPayload['profile'];
    constructor(options: MessageBrokerOptions);
    protected deserialize(rawPayload: MessageBrokerRawPayload): MessageBroker;
    serialize(): MessageBrokerRawPayload;
    static create(payload: MessageBrokerRawPayload, universe: Universe, http: Universe['http']): MessageBroker;
    setup(): Promise<number>;
    syncMessageTemplates(): Promise<number | undefined>;
    syncMessages(): Promise<number | undefined>;
    getProxyChannelInstances(): Promise<Array<{
        external_reference_id: string;
        name: string;
        [key: string]: any;
    }> | undefined>;
    updateProfile(payload: object): Promise<number | undefined>;
    getProfile(options: EntityFetchOptions): Promise<object | undefined>;
}
export declare class MessageBrokers {
    static endpoint: string;
}
export declare class MessageBrokersFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageBrokerSyncMessageTemplatesRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageBrokerSetupRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageBrokerSyncMessagesRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageBrokerProxyChannelInstancesRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageBrokerUpdateProfileRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
