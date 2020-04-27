import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface MessageTemplateCategoryTreeOptions extends EntityOptions {
    rawPayload?: MessageTemplateCategoryTreeRawPayload;
}
export interface MessageTemplateCategoryTreeRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
}
export interface MessageTemplateCategoryTreePayload {
    readonly id?: MessageTemplateCategoryTreeRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: MessageTemplateCategoryTreeRawPayload['deleted'];
    readonly active?: MessageTemplateCategoryTreeRawPayload['active'];
}
export declare class MessageTemplateCategoryTree extends Entity<MessageTemplateCategoryTreePayload, MessageTemplateCategoryTreeRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: MessageTemplateCategoryTreeOptions;
    initialized: boolean;
    endpoint: string;
    id?: MessageTemplateCategoryTreePayload['id'];
    createdAt?: MessageTemplateCategoryTreePayload['createdAt'];
    updatedAt?: MessageTemplateCategoryTreePayload['updatedAt'];
    deleted?: MessageTemplateCategoryTreePayload['deleted'];
    active?: MessageTemplateCategoryTreePayload['active'];
    constructor(options: MessageTemplateCategoryTreeOptions);
    protected deserialize(rawPayload: MessageTemplateCategoryTreeRawPayload): MessageTemplateCategoryTree;
    static create(payload: MessageTemplateCategoryTreeRawPayload, universe: Universe, http: Universe['http']): MessageTemplateCategoryTree;
    serialize(): MessageTemplateCategoryTreeRawPayload;
    init(): Promise<MessageTemplateCategoryTree | undefined>;
}
export declare class MessageTemplateCategoryTrees {
    static endpoint: string;
}
export declare class MessageTemplateCategoryTreeInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageTemplateCategoryTreeFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessageTemplateCategoryTreesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
