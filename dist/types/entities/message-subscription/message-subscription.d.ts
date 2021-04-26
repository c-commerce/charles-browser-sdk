import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { MessageSubscriptionInstanceRawPayload } from '../message-subscription-instance/message-subscription-instance';
export interface MessageSubscriptionOptions extends UniverseEntityOptions {
    rawPayload?: MessageSubscriptionRawPayload;
}
export declare enum IMessageSubscriptionKindEnum {
    GDPRGenernalCommunicationImplicit = "GDPRGenernalCommunicationImplicit",
    GDPRGenernalCommunicationExplicit = "GDPRGenernalCommunicationExplicit",
    OneTimeEventImplicit = "OneTimeEventImplicit",
    OneTimeEventExplicit = "OneTimeEventExplicit",
    Generic = "Generic"
}
export declare type IMessageSubscriptionKindType = IMessageSubscriptionKindEnum.GDPRGenernalCommunicationImplicit | IMessageSubscriptionKindEnum.GDPRGenernalCommunicationExplicit | IMessageSubscriptionKindEnum.OneTimeEventImplicit | IMessageSubscriptionKindEnum.OneTimeEventExplicit | IMessageSubscriptionKindEnum.Generic;
export interface MessageSubscriptionRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly summary?: string;
    readonly description?: string;
    readonly kind?: IMessageSubscriptionKindType;
    readonly scope?: string;
    readonly message_templates?: object;
    readonly event_route_template?: object;
}
export interface MessageSubscriptionPayload {
    readonly id?: MessageSubscriptionRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: MessageSubscriptionRawPayload['deleted'];
    readonly active?: MessageSubscriptionRawPayload['active'];
    readonly name?: MessageSubscriptionRawPayload['name'];
    readonly summary?: MessageSubscriptionRawPayload['summary'];
    readonly description?: MessageSubscriptionRawPayload['description'];
    readonly kind?: MessageSubscriptionRawPayload['kind'];
    readonly scope?: MessageSubscriptionRawPayload['scope'];
    readonly messageTemplates?: MessageSubscriptionRawPayload['message_templates'];
    readonly eventRouteTemplate?: MessageSubscriptionRawPayload['event_route_template'];
}
export declare class MessageSubscription extends UniverseEntity<MessageSubscriptionPayload, MessageSubscriptionRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: MessageSubscriptionOptions;
    initialized: boolean;
    endpoint: string;
    id?: MessageSubscriptionPayload['id'];
    createdAt?: MessageSubscriptionPayload['createdAt'];
    updatedAt?: MessageSubscriptionPayload['updatedAt'];
    deleted?: MessageSubscriptionPayload['deleted'];
    active?: MessageSubscriptionPayload['active'];
    name?: MessageSubscriptionPayload['name'];
    summary?: MessageSubscriptionPayload['summary'];
    description?: MessageSubscriptionPayload['description'];
    kind?: MessageSubscriptionPayload['kind'];
    scope?: MessageSubscriptionPayload['scope'];
    messageTemplates?: MessageSubscriptionPayload['messageTemplates'];
    eventRouteTemplate?: MessageSubscriptionPayload['eventRouteTemplate'];
    constructor(options: MessageSubscriptionOptions);
    protected deserialize(rawPayload: MessageSubscriptionRawPayload): MessageSubscription;
    static create(payload: MessageSubscriptionRawPayload, universe: Universe, http: Universe['http']): MessageSubscription;
    serialize(): MessageSubscriptionRawPayload;
    init(): Promise<MessageSubscription | undefined>;
    subscribers(options?: EntityFetchOptions): Promise<MessageSubscriptionInstanceRawPayload[]>;
}
export declare class MessageSubscriptions {
    static endpoint: string;
}
export declare class MessageSubscriptionInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageSubscriptionFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageSubscriptionsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
