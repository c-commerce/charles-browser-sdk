import Entity, { EntityOptions, EntityRawPayload } from '../../entities/_base';
import { Universe } from '../../universe';
import { Feed } from './feed';
export interface CommentOptions extends EntityOptions {
    rawPayload?: CommentRawPayload;
    feed: Feed;
    universe: Universe;
    http: Universe['http'];
    initialized?: boolean;
}
export interface CommentRawPayload extends EntityRawPayload {
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly content?: object;
}
export interface CommentPayload {
    readonly id?: CommentRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly content?: CommentRawPayload['content'];
}
export declare class Comment extends Entity<CommentPayload, CommentRawPayload> {
    protected universe: Universe;
    protected feed: Feed;
    protected http: Universe['http'];
    initialized: boolean;
    protected options: CommentOptions;
    endpoint: string;
    id?: CommentPayload['id'];
    createdAt?: CommentPayload['createdAt'];
    updatedAt?: CommentPayload['updatedAt'];
    deleted?: CommentPayload['deleted'];
    content?: CommentPayload['content'];
    constructor(options: CommentOptions);
    protected deserialize(rawPayload: CommentRawPayload): Comment;
    static create(payload: CommentRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Comment;
    static createUninitialized(payload: CommentRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Comment;
    serialize(): CommentRawPayload;
}
