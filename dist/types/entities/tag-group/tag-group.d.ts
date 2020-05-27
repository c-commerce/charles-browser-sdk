import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface TagGroupOptions extends EntityOptions {
    rawPayload?: TagGroupRawPayload;
}
export interface TagGroupRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly label?: string;
    readonly color?: string | null;
    readonly description?: string | null;
}
export interface TagGroupPayload {
    readonly id?: TagGroupRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: TagGroupRawPayload['deleted'];
    readonly active?: TagGroupRawPayload['active'];
    readonly label?: TagGroupRawPayload['label'];
    readonly color?: TagGroupRawPayload['color'];
    readonly description?: TagGroupRawPayload['description'];
}
export declare class TagGroup extends Entity<TagGroupPayload, TagGroupRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: TagGroupOptions;
    initialized: boolean;
    endpoint: string;
    id?: TagGroupPayload['id'];
    createdAt?: TagGroupPayload['createdAt'];
    updatedAt?: TagGroupPayload['updatedAt'];
    deleted?: TagGroupPayload['deleted'];
    active?: TagGroupPayload['active'];
    label?: TagGroupPayload['label'];
    color?: TagGroupPayload['color'];
    description?: TagGroupPayload['description'];
    constructor(options: TagGroupOptions);
    protected deserialize(rawPayload: TagGroupRawPayload): TagGroup;
    static create(payload: TagGroupRawPayload, universe: Universe, http: Universe['http']): TagGroup;
    serialize(): TagGroupRawPayload;
    init(): Promise<TagGroup | undefined>;
}
export declare class TagGroups {
    static endpoint: string;
}
export declare class TagGroupInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TagGroupFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TagGroupsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
