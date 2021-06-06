import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe';
import { BaseError } from '../../errors';
import { Reply, MessageRawPayload, MessageReplyContentOptions, ReplyResponse, ReplyOptions } from '../../messaging/message';
import { Asset } from '../../entities/asset';
import { Person, PersonRawPayload } from '../../entities/person';
import { StaffRawPayload } from '../../entities/staff';
import { Event, EventRawPayload, IEventType, IEventResourceType } from './event';
import { Comment } from './comment';
import { UniverseEntity, EntitiesList, EntityFetchOptions } from '../../entities/_base';
export interface FeedOptions {
    universe: Universe;
    http: Universe['http'];
    mqtt: Universe['mqtt'];
    rawPayload?: FeedRawPayload;
    initialized?: boolean;
}
export declare const FEED_ENDPOINT: string;
export interface FeedRawPayload {
    readonly id?: string;
    readonly kind?: 'Contact' | 'Universe' | string | null;
    readonly participants?: Array<string | PersonRawPayload>;
    readonly agents?: string[];
    readonly parents?: string[];
    readonly active?: boolean;
    readonly deleted?: boolean;
    readonly hidden?: boolean;
    readonly open?: boolean;
    readonly answered?: boolean;
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
    readonly kind?: FeedRawPayload['kind'];
    readonly participants?: Array<string | Person>;
    readonly agents?: string[];
    readonly parents?: string[];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly latestActivityAt?: Date | null;
    readonly deleted?: boolean;
    readonly hidden?: boolean;
    readonly open?: boolean;
    readonly answered?: boolean;
    readonly active?: boolean;
    readonly topLatestEvents?: Event[];
    readonly topLatestMessages?: Event[];
}
export interface FeedEventKV {
    eventId: Event['id'] | string;
    event: Event;
}
export declare type FeedEventsMap = Map<Event['id'], Event>;
interface FeedEventFromAgentBase {
    user: string;
    staff: StaffRawPayload['id'];
    feed: FeedRawPayload['id'];
}
export declare type FeedPresencePayload = FeedEventFromAgentBase;
export declare type FeedTypingPayload = FeedEventFromAgentBase;
export declare interface Feed {
    on: ((event: 'raw-error' | 'error', cb: (error: Error) => void) => this) & ((event: 'feed:message' | 'feed:event' | 'feed:presence' | 'feed:typing' | 'feed:message:status' | 'feed:message:reactions' | string, cb: Function) => this);
}
export declare class Feed extends UniverseEntity<FeedPayload, FeedRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected mqtt?: Universe['mqtt'];
    protected options: FeedOptions;
    initialized: boolean;
    endpoint: string;
    private readonly eventsMap;
    protected _rawPayload?: FeedRawPayload | null;
    id?: string;
    kind?: FeedPayload['kind'];
    participants?: FeedPayload['participants'];
    agents?: string[];
    parents?: string[];
    createdAt?: Date | null;
    updatedAt?: Date | null;
    latestActivityAt?: Date | null;
    deleted?: boolean;
    hidden?: boolean;
    open?: boolean;
    answered?: boolean;
    active?: boolean;
    topLatestEvents?: FeedPayload['topLatestEvents'];
    topLatestMessages?: FeedPayload['topLatestMessages'];
    constructor(options: FeedOptions);
    protected deserialize(rawPayload: FeedRawPayload): Feed;
    static create(payload: FeedRawPayload, universe: Universe, http: Universe['http'], mqtt: Universe['mqtt']): Feed;
    static createUninitialized(payload: FeedRawPayload, universe: Universe, http: Universe['http'], mqtt: Universe['mqtt']): Feed;
    serialize(): FeedRawPayload;
    reply(contentOptions: FeedReplyContentOptions): FeedReply;
    init(options?: EntityFetchOptions): Promise<Feed | undefined>;
    setupDefaultMessageListeners(): Feed;
    private get defaultSubscriptions();
    deinitialize(): void;
    private subscribeDefaults;
    private getMqttClient;
    private handleMessage;
    fetchLatestEvents(options?: EntityFetchOptions): Promise<Event[] | FeedlatestEventsRawPayload | undefined>;
    fetchEvents(options?: UniverseFetchOptions): Promise<Event[] | undefined>;
    createFeedEvent(type: IEventType, resource?: string, resourceType?: IEventResourceType): Promise<Event | undefined>;
    createFeedComment(content: object, author?: string): Promise<Comment | undefined>;
    viewed(): Promise<Event | undefined>;
    events(): Event[];
    getEventsMap(): Feed['eventsMap'];
    presence(payload: FeedPresencePayload): Feed;
    typing(payload: FeedTypingPayload): Feed;
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
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    private readonly mqtt?;
    constructor(options: FeedsOptions);
    protected parseItem(payload: FeedRawPayload): Feed;
    getStream(options?: UniverseFetchOptions): Promise<Feeds>;
    exportCsv(options?: UniverseExportCsvOptions): Promise<Blob>;
}
export declare type FeedReplyContentOptions = MessageReplyContentOptions;
export declare type FeedReplyResponse = ReplyResponse;
export interface FeedReplyOptions extends ReplyOptions {
    feed: Feed;
    universe: Universe;
    http: Universe['http'];
    rawPayload?: MessageRawPayload;
    rawAssets?: FormData;
    causes?: object[] | null;
}
export declare class FeedReply {
    protected feed: Feed;
    private readonly universe;
    private readonly http;
    private readonly options?;
    content: Reply['content'];
    contentType: Reply['contentType'];
    rawAssets?: FormData;
    causes?: object[] | null;
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
export declare class FeedFetchCountRemoteError extends BaseError {
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
export {};
