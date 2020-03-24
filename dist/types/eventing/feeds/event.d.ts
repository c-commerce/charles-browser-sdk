/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
import { Feed } from './feed';
import { BaseError } from '../../errors';
import { Message } from '../../messaging/message';
export declare enum EventTypesEnum {
    resource = "resource",
    followUp = "follow_up",
    personFeedbackPending = "follow_up"
}
export declare type IEventType = EventTypesEnum.resource | EventTypesEnum.followUp | EventTypesEnum.personFeedbackPending;
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
}
export interface EventPayload {
    readonly id?: EventRawPayload['id'];
    readonly resourceType?: EventRawPayload['resource_type'];
    readonly resource?: EventRawPayload['resource'];
    readonly payload?: EventRawPayload['payload'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly type?: IEventType | null;
}
export declare class Event extends EventEmitter {
    protected universe: Universe;
    protected feed: Feed;
    protected http: Universe['http'];
    protected options: EventOptions;
    initialized: boolean;
    private endpoint;
    id?: string;
    resource?: EventPayload['resource'];
    resourceType?: EventPayload['resourceType'];
    payload?: EventPayload['payload'];
    createdAt?: EventPayload['createdAt'];
    updatedAt?: EventPayload['updatedAt'];
    type?: EventPayload['type'];
    constructor(options: EventOptions);
    private deserialize;
    static create(payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Event;
    static createUninitialized(payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Event;
    serialize(): EventRawPayload;
    init(): Promise<Event | undefined>;
    fetch(): Promise<Event | undefined>;
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
