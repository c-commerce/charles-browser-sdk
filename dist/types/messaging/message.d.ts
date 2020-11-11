import Entity, { EntityOptions, EntityRawPayload } from '../entities/_base';
import { Universe } from '../universe';
import { BaseError } from '../errors';
import { Person, PersonRawPayload } from '../entities/person';
import { Asset } from '../entities/asset/asset';
import { FeedRawPayload, Feed } from '../eventing/feeds';
import { Event } from '../eventing/feeds/event';
export interface MessageOptions extends EntityOptions {
    universe: Universe;
    http: Universe['http'];
    rawPayload?: MessageRawPayload;
    feed?: Feed;
}
export interface MessageRawPayloadAttachment {
    type: 'image' | 'document' | string;
    mime_type?: string;
    payload: string | null | object;
}
export interface MessageRawPayload extends EntityRawPayload {
    readonly id?: string;
    readonly source_type?: string;
    readonly source_api?: string;
    readonly tz?: string;
    readonly date?: string;
    readonly content_type?: 'text' | 'mixed';
    readonly content?: {
        body?: string | null;
        attachments?: MessageRawPayloadAttachment[];
    };
    readonly external_reference_id?: string;
    readonly external_person_reference_id?: string;
    readonly external_channel_reference_id?: string;
    readonly raw_message?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly raw_payload?: string;
    readonly broker?: string;
    readonly deleted?: string;
    readonly is_processed?: string;
    readonly processed_data?: string;
    readonly replyables?: {
        reply_to_message?: {
            deadline: string | null;
            type: 'http' | string | null;
            options: {
                method: 'POST' | string;
                uri: 'string';
            };
        };
        reply_to_feed?: {
            deadline: string | null;
            type: 'http' | string | null;
            options: {
                method: 'POST' | string;
                uri: 'string';
            };
        };
    };
    readonly person?: PersonRawPayload['id'];
    readonly feed?: FeedRawPayload['id'];
    readonly author?: {
        user?: string;
        staff?: string;
        person?: string;
    } | null;
}
export interface MessagePayload {
    readonly id?: string;
    readonly sourceType?: string;
    readonly sourceApi?: string;
    readonly tz?: string;
    readonly date?: Date | null;
    readonly contentType?: MessageRawPayload['content_type'];
    readonly content?: MessageRawPayload['content'];
    readonly externalReferenceId?: string;
    readonly externalPersonReferenceId?: string;
    readonly externalChannelReferenceId?: string;
    readonly rawMessage?: string;
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly rawPayload?: string;
    readonly broker?: string;
    readonly deleted?: string;
    readonly isProcessed?: string;
    readonly processedData?: string;
    readonly replyables?: MessageRawPayload['replyables'] | null;
    readonly author?: MessageRawPayload['author'];
    readonly person?: Person;
    readonly feed?: Feed;
}
export declare class Message extends Entity<MessagePayload, MessageRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: MessageOptions;
    initialized: boolean;
    endpoint: string;
    id?: string;
    sourceType?: string;
    sourceApi?: string;
    tz?: string;
    date?: Date | null;
    contentType?: MessageRawPayload['content_type'];
    content?: MessageRawPayload['content'];
    externalReferenceId?: string;
    externalPersonReferenceId?: string;
    externalChannelReferenceId?: string;
    rawMessage?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    rawPayload?: string;
    broker?: string;
    deleted?: string;
    isProcessed?: string;
    processedData?: string;
    replyables?: MessageRawPayload['replyables'];
    author?: MessageRawPayload['author'];
    person?: Person;
    feed?: Feed;
    constructor(options: MessageOptions);
    static deserialize(payload: MessageRawPayload, universe: Universe, http: Universe['http'], feed?: Feed): Message;
    protected deserialize(rawPayload: MessageRawPayload, options?: MessageOptions): Message;
    static create(payload: MessageRawPayload, universe: Universe, http: Universe['http'], feed?: Feed): Message;
    serialize(): MessageRawPayload;
    reply(contentOptions: MessageReplyContentOptions): MessageReply;
    replyFeed(contentOptions: MessageReplyContentOptions): MessageFeedReply;
    init(): Promise<Message | undefined>;
}
export interface MessageReplyContentOptions {
    content: MessagePayload['content'];
    rawAssets?: FormData;
}
export interface ReplyOptions extends MessageOptions, MessageReplyContentOptions {
}
export interface MessageReplyOptions extends ReplyOptions {
    message: Message;
    rawAssets?: FormData;
}
export declare type ReplyResponse = MessageRawPayload;
export declare class Reply extends Message {
    protected prepareSendWithAssets(payload: FormData): Promise<Asset[] | undefined>;
}
export declare class MessageReply extends Reply {
    private readonly message;
    private readonly rawAssets?;
    constructor(options: MessageReplyOptions);
    send(): Promise<Event | ReplyResponse | undefined>;
}
export declare class MessageFeedReply extends Reply {
    private readonly message;
    private readonly rawAssets?;
    constructor(options: MessageReplyOptions);
    send(): Promise<ReplyResponse | undefined>;
}
export declare class MessagesReplyError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
