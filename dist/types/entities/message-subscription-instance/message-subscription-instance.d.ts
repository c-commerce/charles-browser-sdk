import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface MessageSubscriptionInstanceOptions extends UniverseEntityOptions {
    rawPayload?: MessageSubscriptionInstanceRawPayload;
}
export interface MessageSubscriptionInstanceRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly topic?: string;
    readonly message_subscription?: string;
    readonly channel_user?: string;
    readonly person?: string;
    readonly status?: string;
    readonly date?: Date;
    readonly event_route?: string;
}
export interface MessageSubscriptionInstancePayload {
    readonly id?: MessageSubscriptionInstanceRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: MessageSubscriptionInstanceRawPayload['deleted'];
    readonly active?: MessageSubscriptionInstanceRawPayload['active'];
    readonly topic?: MessageSubscriptionInstanceRawPayload['topic'];
    readonly messageSubscription?: MessageSubscriptionInstanceRawPayload['message_subscription'];
    readonly channelUser?: MessageSubscriptionInstanceRawPayload['channel_user'];
    readonly person?: MessageSubscriptionInstanceRawPayload['person'];
    readonly status?: MessageSubscriptionInstanceRawPayload['status'];
    readonly date?: MessageSubscriptionInstanceRawPayload['date'];
    readonly eventRoute?: MessageSubscriptionInstanceRawPayload['event_route'];
}
export declare class MessageSubscriptionInstance extends UniverseEntity<MessageSubscriptionInstancePayload, MessageSubscriptionInstanceRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: MessageSubscriptionInstanceOptions;
    initialized: boolean;
    endpoint: string;
    id?: MessageSubscriptionInstancePayload['id'];
    createdAt?: MessageSubscriptionInstancePayload['createdAt'];
    updatedAt?: MessageSubscriptionInstancePayload['updatedAt'];
    deleted?: MessageSubscriptionInstancePayload['deleted'];
    active?: MessageSubscriptionInstancePayload['active'];
    topic?: MessageSubscriptionInstancePayload['topic'];
    messageSubscription?: MessageSubscriptionInstancePayload['messageSubscription'];
    channelUser?: MessageSubscriptionInstancePayload['channelUser'];
    person?: MessageSubscriptionInstancePayload['person'];
    status?: MessageSubscriptionInstancePayload['status'];
    date?: MessageSubscriptionInstancePayload['date'];
    eventRoute?: MessageSubscriptionInstancePayload['eventRoute'];
    constructor(options: MessageSubscriptionInstanceOptions);
    protected deserialize(rawPayload: MessageSubscriptionInstanceRawPayload): MessageSubscriptionInstance;
    static create(payload: MessageSubscriptionInstanceRawPayload, universe: Universe, http: Universe['http']): MessageSubscriptionInstance;
    serialize(): MessageSubscriptionInstanceRawPayload;
    init(): Promise<MessageSubscriptionInstance | undefined>;
}
export declare class MessageSubscriptionInstances {
    static endpoint: string;
}
export declare class MessageSubscriptionInstanceInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageSubscriptionInstanceFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageSubscriptionInstancesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageSubscriptionInstanceGetAllRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
