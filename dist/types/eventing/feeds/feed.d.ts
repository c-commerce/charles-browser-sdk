/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { Reply, MessageRawPayload, MessageReplyContentOptions, ReplyResponse } from '../../messaging/message';
export interface FeedOptions {
    universe: Universe;
    http: Universe['http'];
    rawPayload?: FeedRawPayload;
    initialized?: boolean;
}
export interface FeedRawPayload {
    readonly id?: string;
    readonly participants?: string[];
    readonly agents?: string[];
    readonly parents?: string[];
    readonly active?: boolean;
    readonly deleted?: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
}
export interface FeedPayload {
    readonly id?: string;
    readonly participants?: string[];
    readonly agents?: string[];
    readonly parents?: string[];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
}
export declare class Feed extends EventEmitter {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: FeedOptions;
    initialized: boolean;
    readonly id?: string;
    readonly participants?: string[];
    readonly agents?: string[];
    readonly parents?: string[];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    constructor(options: FeedOptions);
    static deserialize(payload: FeedRawPayload, universe: Universe, http: Universe['http']): Feed;
    static createUninitialized(payload: FeedRawPayload, universe: Universe, http: Universe['http']): Feed;
    serialize(): FeedRawPayload;
    reply(contentOptions: FeedReplyContentOptions): FeedReply;
    private handleError;
}
export interface FeedReplyContentOptions extends MessageReplyContentOptions {
}
export interface FeedReplyResponse extends ReplyResponse {
}
export interface FeedReplyOptions {
    feed: Feed;
    universe: Universe;
    http: Universe['http'];
    rawPayload?: MessageRawPayload;
}
export declare class FeedReply {
    private feed;
    private universe;
    private http;
    content: Reply['content'];
    contentType: Reply['contentType'];
    constructor(options: FeedReplyOptions);
    send(): Promise<FeedReplyResponse | undefined>;
}
export declare class FeedReplyError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
