import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface StaticEntryOptions extends EntityOptions {
    rawPayload?: ContactListStaticEntryRawPayload;
}
export interface ContactListStaticEntryRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly effect?: 'include' | 'exclude';
    readonly resource?: {
        type?: 'person';
        payload?: {
            id?: string;
        };
    } | {
        type?: 'channel_user';
        payload?: {
            id?: string;
        };
    } | {
        type?: 'external_channel_user';
        payload?: {
            message_broker?: string;
            channel_user_external_reference_id?: string;
        };
    };
    readonly origin_resource?: {
        type?: 'manual';
    } | {
        type?: 'subscription' | 'list';
        resource?: string;
    };
    readonly contact_list?: string;
}
export interface ContactListStaticEntryPayload {
    readonly id?: ContactListStaticEntryRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ContactListStaticEntryRawPayload['deleted'];
    readonly active?: ContactListStaticEntryRawPayload['active'];
    readonly effect?: ContactListStaticEntryRawPayload['effect'];
    readonly resource?: ContactListStaticEntryRawPayload['resource'];
    readonly originResource?: ContactListStaticEntryRawPayload['origin_resource'];
}
export declare class ContactListStaticEntry extends Entity<ContactListStaticEntryPayload, ContactListStaticEntryRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: StaticEntryOptions;
    initialized: boolean;
    endpoint: string;
    id?: ContactListStaticEntryPayload['id'];
    createdAt?: ContactListStaticEntryPayload['createdAt'];
    updatedAt?: ContactListStaticEntryPayload['updatedAt'];
    deleted?: ContactListStaticEntryPayload['deleted'];
    active?: ContactListStaticEntryPayload['active'];
    effect?: ContactListStaticEntryPayload['effect'];
    resource?: ContactListStaticEntryPayload['resource'];
    originResource?: ContactListStaticEntryPayload['originResource'];
    constructor(options: StaticEntryOptions);
    protected deserialize(rawPayload: ContactListStaticEntryRawPayload): ContactListStaticEntry;
    static create(payload: ContactListStaticEntryRawPayload, universe: Universe, http: Universe['http']): ContactListStaticEntry;
    serialize(): ContactListStaticEntryRawPayload;
    init(): Promise<ContactListStaticEntry | undefined>;
    static createUninitialized(payload: ContactListStaticEntryRawPayload, universe: Universe, http: Universe['http']): ContactListStaticEntry;
}
export declare class ContactListStaticEntryInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContactListStaticEntryFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContactListStaticEntriesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContactListStaticEntryCreateRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContactListStaticEntryDeleteRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
