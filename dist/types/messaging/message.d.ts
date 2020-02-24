/// <reference types="node" />
import { EventEmitter } from 'events';
export interface MessageOptions {
    rawPayload: MessageRawPayload;
}
export interface MessageRawPayload {
    readonly id?: string;
    readonly source_type?: string;
    readonly source_api?: string;
    readonly tz?: string;
    readonly date?: Date;
    readonly content_type?: string;
    readonly content?: string;
    readonly external_reference_id?: string;
    readonly external_person_reference_id?: string;
    readonly external_channel_reference_id?: string;
    readonly raw_message?: string;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly raw_payload?: string;
    readonly broker?: string;
    readonly deleted?: string;
    readonly is_processed?: string;
    readonly processed_data?: string;
    readonly replyables?: string;
}
export interface MessagePayload {
    readonly id?: string;
    readonly sourceType?: string;
    readonly sourceApi?: string;
    readonly tz?: string;
    readonly date?: Date;
    readonly contentType?: string;
    readonly content?: string;
    readonly externalReferenceId?: string;
    readonly externalPersonReferenceId?: string;
    readonly externalChannelReferenceId?: string;
    readonly rawMessage?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly rawPayload?: string;
    readonly broker?: string;
    readonly deleted?: string;
    readonly isProcessed?: string;
    readonly processedData?: string;
    readonly replyables?: string;
}
export interface Message extends MessagePayload {
}
export declare class Message extends EventEmitter {
    private options?;
    readonly id?: string;
    readonly sourceType?: string;
    readonly sourceApi?: string;
    readonly tz?: string;
    readonly date?: Date;
    contentType?: string;
    content?: string;
    readonly externalReferenceId?: string;
    readonly externalPersonReferenceId?: string;
    readonly externalChannelReferenceId?: string;
    readonly rawMessage?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly rawPayload?: string;
    readonly broker?: string;
    readonly deleted?: string;
    readonly isProcessed?: string;
    readonly processedData?: string;
    readonly replyables?: string;
    constructor(options?: MessageOptions);
    static deserialize(payload: MessageRawPayload): Message;
    serialize(): MessageRawPayload;
    private handleError;
}
