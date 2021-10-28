import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface MessageTemplateCategoryOptions extends UniverseEntityOptions {
    rawPayload?: MessageTemplateCategoryRawPayload;
}
export interface MessageTemplateCategoryRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly summary?: string;
    readonly description?: string;
    readonly comment?: string;
    readonly custom_id?: string;
}
export interface MessageTemplateCategoryPayload {
    readonly id?: MessageTemplateCategoryRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: MessageTemplateCategoryRawPayload['deleted'];
    readonly active?: MessageTemplateCategoryRawPayload['active'];
    readonly name?: MessageTemplateCategoryRawPayload['name'];
    readonly summary?: MessageTemplateCategoryRawPayload['summary'];
    readonly description?: MessageTemplateCategoryRawPayload['description'];
    readonly comment?: MessageTemplateCategoryRawPayload['comment'];
    readonly customId?: MessageTemplateCategoryRawPayload['custom_id'];
}
export declare class MessageTemplateCategory extends UniverseEntity<MessageTemplateCategoryPayload, MessageTemplateCategoryRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: MessageTemplateCategoryOptions;
    initialized: boolean;
    endpoint: string;
    id?: MessageTemplateCategoryPayload['id'];
    createdAt?: MessageTemplateCategoryPayload['createdAt'];
    updatedAt?: MessageTemplateCategoryPayload['updatedAt'];
    deleted?: MessageTemplateCategoryPayload['deleted'];
    active?: MessageTemplateCategoryPayload['active'];
    name?: MessageTemplateCategoryPayload['name'];
    summary?: MessageTemplateCategoryPayload['summary'];
    description?: MessageTemplateCategoryPayload['description'];
    comment?: MessageTemplateCategoryPayload['comment'];
    customId?: MessageTemplateCategoryPayload['customId'];
    constructor(options: MessageTemplateCategoryOptions);
    protected deserialize(rawPayload: MessageTemplateCategoryRawPayload): MessageTemplateCategory;
    static create(payload: MessageTemplateCategoryRawPayload, universe: Universe, http: Universe['http']): MessageTemplateCategory;
    serialize(): MessageTemplateCategoryRawPayload;
    init(): Promise<MessageTemplateCategory | undefined>;
}
export declare class MessageTemplateCategories {
    static endpoint: string;
}
export declare class MessageTemplateCategoryInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageTemplateCategoryFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageTemplateCategoriesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
