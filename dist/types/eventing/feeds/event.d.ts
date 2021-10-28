import { Universe } from '../../universe';
import { Feed } from './feed';
import { BaseError } from '../../errors';
import { Message } from '../../messaging/message';
import { UniverseEntity } from '../../entities/_base';
export declare enum EventTypesEnum {
    resource = "resource",
    followUp = "follow_up",
    personFeedbackPending = "person:feedback_pending",
    conversationCompleted = "conversation:completed",
    agentView = "agent:view"
}
export declare type IEventType = 'resource' | 'follow_up' | 'person:feedback_pending' | 'conversation:completed' | 'agent:view';
export declare enum EventResourcesTypesEnum {
    message = "message",
    merge = "merge",
    order = "order",
    cart = "cart"
}
export declare type IEventResourceType = EventResourcesTypesEnum.message | EventResourcesTypesEnum.merge | EventResourcesTypesEnum.order | EventResourcesTypesEnum.cart;
export interface EventOptions {
    universe: Universe;
    feed: Feed;
    http: Universe['http'];
    rawPayload?: EventRawPayload;
    initialized?: boolean;
}
export interface EventRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly resource_type?: IEventResourceType | null;
    readonly resource?: string;
    readonly payload?: Message | object;
    readonly type?: IEventType | null;
    readonly flagged?: boolean;
    readonly marked?: boolean;
    readonly archived?: boolean;
    readonly annotations?: {
        language?: {
            language?: string | null;
            confidence?: number | null;
            vectors?: Array<{
                language?: string | null;
                confidence?: number | null;
            }> | null;
            payload?: {
                cld3?: any;
                cld2?: any;
                langdetect?: any;
                fasttext?: any;
            } | null;
        } | null;
    } | null;
    readonly suggestions?: object | null;
    readonly context?: string | object | null;
    readonly feed?: string;
}
export interface EventPayload {
    readonly id?: EventRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: EventRawPayload['deleted'];
    readonly active?: EventRawPayload['active'];
    readonly resourceType?: EventRawPayload['resource_type'];
    readonly resource?: EventRawPayload['resource'];
    readonly payload?: EventRawPayload['payload'];
    readonly type?: IEventType | null;
    readonly flagged?: EventRawPayload['flagged'];
    readonly marked?: EventRawPayload['marked'];
    readonly archived?: EventRawPayload['archived'];
    readonly annotations?: EventRawPayload['annotations'];
    readonly suggestions?: EventRawPayload['suggestions'];
    readonly context?: EventRawPayload['context'];
    readonly feed?: EventRawPayload['feed'];
}
export declare class Event extends UniverseEntity<EventPayload, EventRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected _feed: Feed;
    protected http: Universe['http'];
    protected options: EventOptions;
    initialized: boolean;
    endpoint: string;
    id?: string;
    createdAt?: EventPayload['createdAt'];
    updatedAt?: EventPayload['updatedAt'];
    active?: EventPayload['active'];
    deleted?: EventPayload['deleted'];
    resource?: EventPayload['resource'];
    resourceType?: EventPayload['resourceType'];
    payload?: EventPayload['payload'];
    type?: EventPayload['type'];
    flagged?: EventPayload['flagged'];
    marked?: EventPayload['marked'];
    archived?: EventPayload['archived'];
    annotations?: EventPayload['annotations'];
    suggestions?: EventPayload['suggestions'];
    context?: EventPayload['context'];
    feed?: EventPayload['feed'];
    static eventTypes: typeof EventTypesEnum;
    constructor(options: EventOptions);
    protected deserialize(rawPayload: EventRawPayload): Event;
    static create(payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Event;
    static createUninitialized(payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Event;
    serialize(): EventRawPayload;
    init(): Promise<Event | undefined>;
    mark(): Promise<Event | undefined>;
    unmark(): Promise<Event | undefined>;
    flag(): Promise<Event | undefined>;
    unflag(): Promise<Event | undefined>;
    archive(): Promise<Event | undefined>;
    unarchive(): Promise<Event | undefined>;
}
export declare class EventInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EventFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EventMarkRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EventArchiveRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EventUnmarkRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EventUnarkRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EventUnflagRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EventUnarchiveRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
