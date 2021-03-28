import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface MessageTemplateCategoryTreeOptions extends UniverseEntityOptions {
    rawPayload?: MessageTemplateCategoryTreeRawPayload;
}
export interface MessageTemplateCategoryTreeRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly summary?: string;
    readonly description?: string;
    readonly comment?: string;
    readonly children?: null | any[];
}
export interface MessageTemplateCategoryTreePayload {
    readonly id?: MessageTemplateCategoryTreeRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: MessageTemplateCategoryTreeRawPayload['deleted'];
    readonly active?: MessageTemplateCategoryTreeRawPayload['active'];
    readonly name?: MessageTemplateCategoryTreeRawPayload['name'];
    readonly summary?: MessageTemplateCategoryTreeRawPayload['summary'];
    readonly description?: MessageTemplateCategoryTreeRawPayload['description'];
    readonly comment?: MessageTemplateCategoryTreeRawPayload['comment'];
    readonly children?: MessageTemplateCategoryTreeRawPayload['children'];
}
export declare class MessageTemplateCategoryTree extends UniverseEntity<MessageTemplateCategoryTreePayload, MessageTemplateCategoryTreeRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: MessageTemplateCategoryTreeOptions;
    initialized: boolean;
    endpoint: string;
    id?: MessageTemplateCategoryTreePayload['id'];
    createdAt?: MessageTemplateCategoryTreePayload['createdAt'];
    updatedAt?: MessageTemplateCategoryTreePayload['updatedAt'];
    deleted?: MessageTemplateCategoryTreePayload['deleted'];
    active?: MessageTemplateCategoryTreePayload['active'];
    name?: MessageTemplateCategoryTreePayload['name'];
    summary?: MessageTemplateCategoryTreePayload['summary'];
    description?: MessageTemplateCategoryTreePayload['description'];
    comment?: MessageTemplateCategoryTreePayload['comment'];
    children?: MessageTemplateCategoryTreePayload['children'];
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
