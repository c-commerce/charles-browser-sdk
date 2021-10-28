import { UniverseEntity, UniverseEntityOptions, EntityRawPayload } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { FeedRawPayload } from '../../eventing/feeds/feed';
export interface StaffOptions extends UniverseEntityOptions {
    rawPayload?: StaffRawPayload;
}
export interface StaffRawPayload extends EntityRawPayload {
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly first_name?: string;
    readonly middle_name?: string;
    readonly last_name?: string;
    readonly display_name?: string;
    readonly comment?: string;
    readonly type?: 'agent' | 'bot';
    readonly gender?: string;
    readonly user?: string;
    readonly universe_user?: string;
    readonly roles?: string[];
    readonly permissions?: string[];
    readonly invite?: null | {
        [key: string]: any;
    };
    readonly custom_id?: string;
}
export interface StaffPayload {
    readonly id?: StaffRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly firstName?: StaffRawPayload['first_name'];
    readonly middleName?: StaffRawPayload['middle_name'];
    readonly lastName?: StaffRawPayload['last_name'];
    readonly comment?: StaffRawPayload['comment'];
    readonly type?: StaffRawPayload['type'];
    readonly gender?: StaffRawPayload['gender'];
    readonly user?: StaffRawPayload['user'];
    readonly universeUser?: StaffRawPayload['universe_user'];
    readonly roles?: StaffRawPayload['roles'];
    readonly permissions?: StaffRawPayload['permissions'];
    readonly invite?: StaffRawPayload['invite'];
    readonly customId?: StaffRawPayload['custom_id'];
}
export declare class Staff extends UniverseEntity<StaffPayload, StaffRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: StaffOptions;
    initialized: boolean;
    endpoint: string;
    id?: StaffPayload['id'];
    createdAt?: StaffPayload['createdAt'];
    updatedAt?: StaffPayload['updatedAt'];
    deleted?: StaffPayload['deleted'];
    active?: StaffPayload['active'];
    firstName?: StaffRawPayload['first_name'];
    middleName?: StaffRawPayload['middle_name'];
    lastName?: StaffRawPayload['last_name'];
    comment?: StaffRawPayload['comment'];
    type?: StaffRawPayload['type'];
    gender?: StaffRawPayload['gender'];
    user?: StaffRawPayload['user'];
    universeUser?: StaffRawPayload['universe_user'];
    roles?: StaffRawPayload['roles'];
    permissions?: StaffRawPayload['permissions'];
    invite?: StaffRawPayload['invite'];
    customId?: StaffRawPayload['custom_id'];
    constructor(options: StaffOptions);
    protected deserialize(rawPayload: StaffRawPayload): Staff;
    static create(payload: StaffRawPayload, universe: Universe, http: Universe['http']): Staff;
    serialize(): StaffRawPayload;
    init(): Promise<Staff | undefined>;
    inviteUser(userEmail: string, userFirstName: string): Promise<Staff | undefined>;
    feeds(): Promise<FeedRawPayload[] | undefined>;
}
export declare class Staffs {
    static endpoint: string;
}
export declare class StaffInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffInviteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffFeedsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
