import Entity, { EntityOptions, EntityFetchOptions, EntityDeleteOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { ContactListStaticEntry, ContactListStaticEntryRawPayload } from './static-entry';
export interface ContactListOptions extends EntityOptions {
    rawPayload?: ContactListRawPayload;
}
export interface ContactListRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly summary?: string;
    readonly filters?: Array<{
        effect?: 'include' | 'exclude';
        query?: string;
    }> | null;
    readonly type?: 'dynamic' | 'static';
    readonly author?: {
        staff?: string[];
        user?: string[];
    };
    readonly static_entries?: ContactListStaticEntryRawPayload[];
}
export interface ContactListPayload {
    readonly id?: ContactListRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ContactListRawPayload['deleted'];
    readonly active?: ContactListRawPayload['active'];
    readonly name?: ContactListRawPayload['name'];
    readonly summary?: ContactListRawPayload['summary'];
    readonly filters?: ContactListRawPayload['filters'];
    readonly type?: ContactListRawPayload['type'];
    readonly author?: ContactListRawPayload['author'];
    readonly staticEntries?: ContactListStaticEntry[];
}
export declare class ContactList extends Entity<ContactListPayload, ContactListRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: ContactListOptions;
    initialized: boolean;
    endpoint: string;
    id?: ContactListPayload['id'];
    createdAt?: ContactListPayload['createdAt'];
    updatedAt?: ContactListPayload['updatedAt'];
    deleted?: ContactListPayload['deleted'];
    active?: ContactListPayload['active'];
    name?: ContactListPayload['name'];
    summary?: ContactListPayload['summary'];
    filters?: ContactListPayload['filters'];
    type?: ContactListPayload['type'];
    author?: ContactListPayload['author'];
    _staticEntries?: ContactListPayload['staticEntries'];
    constructor(options: ContactListOptions);
    protected deserialize(rawPayload: ContactListRawPayload): ContactList;
    static create(payload: ContactListRawPayload, universe: Universe, http: Universe['http']): ContactList;
    serialize(): ContactListRawPayload;
    init(): Promise<ContactList | undefined>;
    get staticEntries(): StaticEntryArray<ContactListStaticEntry>;
    set staticEntries(items: StaticEntryArray<ContactListStaticEntry>);
}
export declare class ContactLists {
    static endpoint: string;
}
declare class StaticEntryArray<T> extends Array<T> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected contactList: ContactList;
    constructor(items: T[], universe: Universe, http: Universe['http'], contactList: ContactList);
    fromJson(payloads: ContactListStaticEntryRawPayload[]): ContactListStaticEntry[];
    toJson(items: ContactListStaticEntry[]): ContactListStaticEntryRawPayload[];
    fetch(options?: EntityFetchOptions): Promise<ContactListStaticEntry[] | ContactListStaticEntryRawPayload[] | undefined>;
    create(payload: ContactListStaticEntryRawPayload): Promise<ContactListStaticEntry | undefined>;
    delete(payload: ContactListStaticEntryRawPayload, options?: EntityDeleteOptions): Promise<number>;
}
export declare class ContactListInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContactListFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContactListsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContactListsFetchCountRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export {};
