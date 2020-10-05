import Entity, { EntityOptions, EntityRawPayload } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface StaffOptions extends EntityOptions {
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
    readonly roles?: string[];
    readonly permissions?: string[];
    readonly invite?: null | {
        [key: string]: any;
    };
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
    readonly roles?: StaffRawPayload['roles'];
    readonly permissions?: StaffRawPayload['permissions'];
    readonly invite?: StaffRawPayload['invite'];
}
export declare class Staff extends Entity<StaffPayload, StaffRawPayload> {
    protected universe: Universe;
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
    roles?: StaffRawPayload['roles'];
    permissions?: StaffRawPayload['permissions'];
    invite?: StaffRawPayload['invite'];
    constructor(options: StaffOptions);
    protected deserialize(rawPayload: StaffRawPayload): Staff;
    static create(payload: StaffRawPayload, universe: Universe, http: Universe['http']): Staff;
    serialize(): StaffRawPayload;
    init(): Promise<Staff | undefined>;
    inviteUser(userEmail: string, userFirstName: string): Promise<Staff | undefined>;
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
