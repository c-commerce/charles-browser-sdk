import Entity, { EntityOptions, EntityRawPayload, RawPatch } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface EmailRawPayload extends EntityRawPayload {
    readonly person?: string;
    readonly type?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly value?: string;
    readonly comment?: string;
}
export interface EmailOptions extends EntityOptions {
    rawPayload?: EmailRawPayload;
}
export interface EmailPayload {
    readonly id?: EmailRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly comment?: EmailRawPayload['comment'];
    readonly value?: EmailRawPayload['value'];
}
export declare class Email extends Entity<EmailPayload, EmailRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: EmailOptions;
    initialized: boolean;
    endpoint: string;
    id?: string;
    person?: EmailRawPayload['person'];
    value?: EmailRawPayload['value'];
    type?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deleted?: EmailRawPayload['deleted'];
    active?: EmailRawPayload['active'];
    comment?: EmailRawPayload['comment'];
    constructor(options: EmailOptions);
    protected deserialize(rawPayload: EmailRawPayload): Email;
    static create(payload: EmailRawPayload, universe: Universe, http: Universe['http']): Email;
    static createUninitialized(payload: EmailRawPayload, universe: Universe, http: Universe['http']): Email;
    serialize(): EmailRawPayload;
    patch(changePart: EmailRawPayload): Promise<Entity<EmailPayload, EmailRawPayload>>;
    applyPatch(patch: RawPatch): Promise<Entity<EmailPayload, EmailRawPayload>>;
    save(payload: EmailRawPayload): Promise<Entity<EmailPayload, EmailRawPayload>>;
    delete(): Promise<Entity<EmailPayload, EmailRawPayload>>;
}
export declare class EmailsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EmailCreateRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EmailFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EmailPatchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EmailApplyPatchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EmailSaveRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
