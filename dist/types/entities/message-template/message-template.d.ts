import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { EventRawPayload } from '../../eventing/feeds/event';
export interface MessageTemplateOptions extends UniverseEntityOptions {
    rawPayload?: MessageTemplateRawPayload;
}
export interface MessageTemplateRawPayloadAttachment {
    type: 'image' | 'document' | 'video' | 'audio' | 'asset' | string;
    mime_type?: string;
    payload: string | null | object;
}
export interface MessageTemplateRawPayloadLocation {
    type?: 'location';
    lat?: number;
    lng?: number;
    zoom?: number;
    name?: string;
    address_string?: string;
}
export interface MessageTemplateRawPayloadCarouselItemAction {
    type?: 'button' | string;
    button_type?: 'postback' | string;
    text?: string;
    payload?: string;
}
export interface MessageTemplateRawPayloadCarouselItem {
    title?: string;
    sub_title?: string;
    image_url?: string;
    actions?: MessageTemplateRawPayloadCarouselItemAction[];
}
export interface MessageTemplateRawPayloadCarousel {
    type?: string;
    items?: MessageTemplateRawPayloadCarouselItem[];
}
export interface MessageTemplateRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly is_proxy?: boolean;
    readonly approved?: boolean;
    readonly name?: string;
    readonly comment?: string;
    readonly proxy_vendor?: 'messenger_people' | 'charles_messaging_whatsapp_t' | string | null;
    readonly categories?: string[] | null;
    readonly content?: {
        body?: string | null;
        attachments?: MessageTemplateRawPayloadAttachment[] | null;
        i18n?: Array<{
            locale?: string;
            status?: string;
            rejection_reason?: string | null;
            body?: string;
            header?: {
                type?: 'text' | string | null;
                payload?: string | null;
            } | null;
            footer?: {
                type?: 'text' | null;
                payload?: string;
            } | null;
            attachments?: MessageTemplateRawPayloadAttachment[] | MessageTemplateRawPayloadLocation[] | MessageTemplateRawPayloadCarousel[] | any;
            approved?: boolean;
            quick_replies?: {
                translate?: boolean;
                translation_prepend?: string | null;
                translation_append?: string | null;
                replies?: Array<{
                    type?: 'text' | string | null;
                    payload?: string | null;
                    text?: string;
                    image_url?: string;
                }>;
            };
        }> | null;
    } | null;
    readonly configuration?: object;
    readonly payload?: object;
    readonly metadata?: object;
    readonly parameters_template?: {
        type?: 'list' | 'map';
        parameters?: {
            [key: string]: any;
        } | Array<{
            name?: string;
            required?: boolean | null;
            order_index?: number;
            logic?: object | null;
        }>;
    } | null;
    readonly notification?: boolean;
    readonly content_category?: string;
    readonly kind?: string;
    readonly labels?: object;
}
export interface MessageTemplatePayload {
    readonly id?: MessageTemplateRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: MessageTemplateRawPayload['deleted'];
    readonly active?: MessageTemplateRawPayload['active'];
    readonly isProxy?: MessageTemplateRawPayload['is_proxy'];
    readonly approved?: MessageTemplateRawPayload['approved'];
    readonly name?: MessageTemplateRawPayload['name'];
    readonly comment?: MessageTemplateRawPayload['comment'];
    readonly proxyVendor?: MessageTemplateRawPayload['proxy_vendor'];
    readonly categories?: MessageTemplateRawPayload['categories'];
    readonly parametersTemplate?: MessageTemplateRawPayload['parameters_template'];
    readonly content?: MessageTemplateRawPayload['content'];
    readonly configuration?: MessageTemplateRawPayload['configuration'];
    readonly payload?: MessageTemplateRawPayload['payload'];
    readonly metadata?: MessageTemplateRawPayload['metadata'];
    readonly notification?: MessageTemplateRawPayload['notification'];
    readonly contentCategory?: MessageTemplateRawPayload['content_category'];
    readonly kind?: MessageTemplateRawPayload['kind'];
    readonly labels?: MessageTemplateRawPayload['labels'];
}
export declare class MessageTemplate extends UniverseEntity<MessageTemplatePayload, MessageTemplateRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: MessageTemplateOptions;
    initialized: boolean;
    endpoint: string;
    id?: MessageTemplatePayload['id'];
    createdAt?: MessageTemplatePayload['createdAt'];
    updatedAt?: MessageTemplatePayload['updatedAt'];
    deleted?: MessageTemplatePayload['deleted'];
    active?: MessageTemplatePayload['active'];
    isProxy?: MessageTemplatePayload['isProxy'];
    approved?: MessageTemplatePayload['approved'];
    name?: MessageTemplatePayload['name'];
    comment?: MessageTemplatePayload['comment'];
    proxyVendor?: MessageTemplatePayload['proxyVendor'];
    categories?: MessageTemplatePayload['categories'];
    parametersTemplate?: MessageTemplatePayload['parametersTemplate'];
    content?: MessageTemplatePayload['content'];
    configuration?: MessageTemplatePayload['configuration'];
    payload?: MessageTemplatePayload['payload'];
    metadata?: MessageTemplatePayload['metadata'];
    notification?: MessageTemplatePayload['notification'];
    contentCategory?: MessageTemplatePayload['contentCategory'];
    kind?: MessageTemplatePayload['kind'];
    labels?: MessageTemplatePayload['labels'];
    constructor(options: MessageTemplateOptions);
    protected deserialize(rawPayload: MessageTemplateRawPayload): MessageTemplate;
    static create(payload: MessageTemplateRawPayload, universe: Universe, http: Universe['http']): MessageTemplate;
    serialize(): MessageTemplateRawPayload;
    init(): Promise<MessageTemplate | undefined>;
    submit(payload: object): Promise<MessageTemplate>;
    preview(language: String, payload?: Object, options?: EntityFetchOptions): Promise<EventRawPayload[]>;
}
export declare class MessageTemplates {
    static endpoint: string;
}
export declare class MessageTemplateInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageTemplateFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageTemplatesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageTemplateSubmitRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageTemplatePreviewRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
