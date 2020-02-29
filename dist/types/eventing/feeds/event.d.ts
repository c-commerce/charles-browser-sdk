/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
import { Feed } from './feed';
import { BaseError } from '../../errors';
import { Message } from '../../messaging/message';
export interface EventOptions {
    universe: Universe;
    feed: Feed;
    http: Universe['http'];
    rawPayload?: EventRawPayload;
    initialized?: boolean;
}
export interface EventRawPayload {
    readonly id?: string;
    readonly resource_type?: 'message' | 'merge' | 'order';
    readonly resource?: string;
    readonly payload?: Message | object;
    readonly created_at?: string;
    readonly updated_at?: string;
}
export interface EventPayload {
    readonly id?: EventRawPayload['id'];
    readonly resourceType?: EventRawPayload['resource_type'];
    readonly resource?: EventRawPayload['resource'];
    readonly payload?: EventRawPayload['payload'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
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
