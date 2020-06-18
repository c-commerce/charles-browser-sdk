/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
import { Feed } from './feed';
import { BaseError } from '../../errors';
import { Message } from '../../messaging/message';
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
    readonly resource_type?: IEventResourceType | null;
    readonly resource?: string;
    readonly payload?: Message | object;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly type?: IEventType | null;
    readonly flagged?: boolean;
    readonly marked?: boolean;
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
}
export interface EventPayload {
    readonly id?: EventRawPayload['id'];
    readonly resourceType?: EventRawPayload['resource_type'];
    readonly resource?: EventRawPayload['resource'];
    readonly payload?: EventRawPayload['payload'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly type?: IEventType | null;
    readonly flagged?: EventRawPayload['flagged'];
    readonly marked?: EventRawPayload['marked'];
    readonly annotations?: EventRawPayload['annotations'];
    readonly suggestions?: EventRawPayload['suggestions'];
}
export declare class Event extends EventEmitter {
    protected universe: Universe;
    protected feed: Feed;
    protected http: Universe['http'];
    protected options: EventOptions;
    initialized: boolean;
    private readonly endpoint;
    id?: string;
    resource?: EventPayload['resource'];
    resourceType?: EventPayload['resourceType'];
    payload?: EventPayload['payload'];
    createdAt?: EventPayload['createdAt'];
    updatedAt?: EventPayload['updatedAt'];
    type?: EventPayload['type'];
    flagged?: EventPayload['flagged'];
    marked?: EventPayload['marked'];
    annotations?: EventPayload['annotations'];
    suggestions?: EventPayload['suggestions'];
    static eventTypes: typeof EventTypesEnum;
    constructor(options: EventOptions);
    private deserialize;
    static create(payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Event;
    static createUninitialized(payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Event;
    serialize(): EventRawPayload;
    init(): Promise<Event | undefined>;
    fetch(): Promise<Event | undefined>;
    mark(): Promise<Event | undefined>;
    unmark(): Promise<Event | undefined>;
    flag(): Promise<Event | undefined>;
    unflag(): Promise<Event | undefined>;
    private handleError;
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
