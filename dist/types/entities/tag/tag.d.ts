import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface TagOptions extends EntityOptions {
    rawPayload?: TagRawPayload;
}
export interface TagRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly label?: string;
    readonly object?: 'person' | 'feed' | 'event' | 'ticket';
    readonly description?: string | null;
    readonly tag_group?: string | null;
}
export interface TagPayload {
    readonly id?: TagRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: TagRawPayload['deleted'];
    readonly active?: TagRawPayload['active'];
    readonly label?: TagRawPayload['label'];
    readonly object?: TagRawPayload['object'];
    readonly description?: TagRawPayload['description'];
    readonly tagGroup?: TagRawPayload['tag_group'];
}
export declare class Tag extends Entity<TagPayload, TagRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: TagOptions;
    initialized: boolean;
    endpoint: string;
    id?: TagPayload['id'];
    createdAt?: TagPayload['createdAt'];
    updatedAt?: TagPayload['updatedAt'];
    deleted?: TagPayload['deleted'];
    active?: TagPayload['active'];
    label?: TagPayload['label'];
    object?: TagPayload['object'];
    description?: TagPayload['description'];
    tagGroup?: TagPayload['tagGroup'];
    constructor(options: TagOptions);
    protected deserialize(rawPayload: TagRawPayload): Tag;
    static create(payload: TagRawPayload, universe: Universe, http: Universe['http']): Tag;
    serialize(): TagRawPayload;
    init(): Promise<Tag | undefined>;
}
export declare class Tags {
    static endpoint: string;
}
export declare class TagInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TagFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TagsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
