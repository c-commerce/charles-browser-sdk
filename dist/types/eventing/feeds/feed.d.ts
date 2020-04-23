/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe, UniverseFetchOptions } from '../../universe';
import { BaseError } from '../../errors';
import { Reply, MessageRawPayload, MessageReplyContentOptions, ReplyResponse, ReplyOptions } from '../../messaging/message';
import { Asset } from '../../entities/asset';
import { Person, PersonRawPayload } from '../../entities/person';
import { Event, EventRawPayload, IEventType, IEventResourceType } from './event';
import { EntitiesList, EntityFetchOptions } from '../../entities/_base';
export interface FeedOptions {
    universe: Universe;
    http: Universe['http'];
    mqtt: Universe['mqtt'];
    rawPayload?: FeedRawPayload;
    initialized?: boolean;
}
export interface FeedRawPayload {
    readonly id?: string;
    readonly participants?: Array<string | PersonRawPayload>;
    readonly agents?: string[];
    readonly parents?: string[];
    readonly active?: boolean;
    readonly deleted?: boolean;
    readonly created_at?: string;
    readonly latest_activity_at?: string;
    readonly updated_at?: string;
    readonly top_latest_events?: EventRawPayload[];
    readonly top_latest_messages?: EventRawPayload[];
}
export declare type FeedlatestEventsRawPayload = EventRawPayload[];
export declare type FeedEventsRawPayload = EventRawPayload[];
export interface FeedPayload {
    readonly id?: string;
    readonly participants?: Array<string | Person>;
    readonly agents?: string[];
    readonly parents?: string[];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly latestActivityAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly topLatestEvents?: Event[];
    readonly topLatestMessages?: Event[];
}
export interface FeedEventKV {
    eventId: Event['id'] | string;
    event: Event;
}
export declare type FeedEventsMap = Map<Event['id'], Event>;
export declare interface Feed {
    on(event: 'raw-error' | 'error', cb: (error: Error) => void): this;
    on(event: 'feed:message' | 'feed:event' | string, cb: Function): this;
}
export declare class Feed extends EventEmitter {
    protected universe: Universe;
    protected http: Universe['http'];
    protected mqtt?: Universe['mqtt'];
    protected options: FeedOptions;
    initialized: boolean;
    static endpoint: string;
    private readonly eventsMap;
    id?: string;
    participants?: FeedPayload['participants'];
    agents?: string[];
    parents?: string[];
    createdAt?: Date | null;
    updatedAt?: Date | null;
    latestActivityAt?: Date | null;
    deleted?: boolean;
    active?: boolean;
    topLatestEvents?: FeedPayload['topLatestEvents'];
    topLatestMessages?: FeedPayload['topLatestMessages'];
    constructor(options: FeedOptions);
    private deserialize;
    static create(payload: FeedRawPayload, universe: Universe, http: Universe['http'], mqtt: Universe['mqtt']): Feed;
    static createUninitialized(payload: FeedRawPayload, universe: Universe, http: Universe['http'], mqtt: Universe['mqtt']): Feed;
    serialize(): FeedRawPayload;
    reply(contentOptions: FeedReplyContentOptions): FeedReply;
    init(): Promise<Feed | undefined>;
    private get defaultSubscriptions();
    deinitialize(): void;
    private subscibeDefaults;
    private getMqttClient;
    private handleMessage;
    fetch(): Promise<Feed | undefined>;
    fetchLatestEvents(options?: EntityFetchOptions): Promise<Event[] | FeedlatestEventsRawPayload | undefined>;
    fetchEvents(): Promise<Event[] | undefined>;
    createFeedEvent(type: IEventType, resource?: string, resourceType?: IEventResourceType): Promise<Event | undefined>;
    viewed(): Promise<Event | undefined>;
    events(): Event[];
    getEventsMap(): Feed['eventsMap'];
    private handleError;
}
export interface FeedsOptions {
    universe: Universe;
    http: Universe['http'];
    mqtt: Universe['mqtt'];
}
export declare class Feeds extends EntitiesList<Feed, FeedRawPayload> {
    static endpoint: string;
    endpoint: string;
    protected universe: Universe;
    protected http: Universe['http'];
    private readonly mqtt?;
    constructor(options: FeedsOptions);
    protected parseItem(payload: FeedRawPayload): Feed;
    getStream(options?: UniverseFetchOptions): Promise<Feeds>;
}
export declare type FeedReplyContentOptions = MessageReplyContentOptions;
export declare type FeedReplyResponse = ReplyResponse;
export interface FeedReplyOptions extends ReplyOptions {
    feed: Feed;
    universe: Universe;
    http: Universe['http'];
    rawPayload?: MessageRawPayload;
    rawAssets?: FormData;
}
export declare class FeedReply {
    protected feed: Feed;
    private readonly universe;
    private readonly http;
    private readonly options?;
    content: Reply['content'];
    contentType: Reply['contentType'];
    rawAssets?: FormData;
    constructor(options: FeedReplyOptions);
    protected prepareSendWithAssets(payload: FormData): Promise<Asset[] | undefined>;
    send(): Promise<Event | undefined>;
}
export declare class FeedReplyError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class FeedInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class FeedFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class FeedFetchLatestEventsRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class FeedFetchEventsRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class FeedCreateEventRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class FeedsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
