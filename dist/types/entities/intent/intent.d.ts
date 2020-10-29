import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface IntentOptions extends EntityOptions {
    rawPayload?: IntentRawPayload;
}
export interface IntentRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly auto_reply_enabled?: boolean;
    readonly name?: string | null;
    readonly description?: string | null;
    readonly bot_staff?: string | null;
    readonly proxy_vendor?: string | null;
    readonly external_reference_id?: string | null;
    readonly external_name?: string | null;
    readonly nlu?: string | null;
    readonly message_template?: string | null;
    readonly logic?: {
        [key: string]: any;
    } | null;
    readonly effect?: {
        [key: string]: any;
    } | null;
    readonly payload?: {
        [key: string]: any;
    } | null;
}
export interface IntentPayload {
    readonly id?: IntentRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: IntentRawPayload['deleted'];
    readonly active?: IntentRawPayload['active'];
    readonly autoReplyEnabled?: IntentRawPayload['auto_reply_enabled'];
    readonly name?: IntentRawPayload['name'];
    readonly description?: IntentRawPayload['description'];
    readonly botStaff?: IntentRawPayload['bot_staff'];
    readonly proxyVendor?: IntentRawPayload['proxy_vendor'];
    readonly externalReferenceId?: IntentRawPayload['external_reference_id'];
    readonly externalName?: IntentRawPayload['external_name'];
    readonly nlu?: IntentRawPayload['nlu'];
    readonly messageTemplate?: IntentRawPayload['message_template'];
    readonly logic?: IntentRawPayload['logic'];
    readonly effect?: IntentRawPayload['effect'];
    readonly payload?: IntentRawPayload['payload'];
}
export declare class Intent extends Entity<IntentPayload, IntentRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: IntentOptions;
    initialized: boolean;
    endpoint: string;
    id?: IntentPayload['id'];
    createdAt?: IntentPayload['createdAt'];
    updatedAt?: IntentPayload['updatedAt'];
    deleted?: IntentPayload['deleted'];
    active?: IntentPayload['active'];
    autoReplyEnabled?: IntentPayload['autoReplyEnabled'];
    name?: IntentPayload['name'];
    description?: IntentPayload['description'];
    botStaff?: IntentPayload['botStaff'];
    proxyVendor?: IntentPayload['proxyVendor'];
    externalReferenceId?: IntentPayload['externalReferenceId'];
    externalName?: IntentPayload['externalName'];
    nlu?: IntentPayload['nlu'];
    messageTemplate?: IntentPayload['messageTemplate'];
    logic?: IntentPayload['logic'];
    effect?: IntentPayload['effect'];
    payload?: IntentPayload['payload'];
    constructor(options: IntentOptions);
    protected deserialize(rawPayload: IntentRawPayload): Intent;
    static create(payload: IntentRawPayload, universe: Universe, http: Universe['http']): Intent;
    serialize(): IntentRawPayload;
    init(): Promise<Intent | undefined>;
}
export declare class Intents {
    static endpoint: string;
}
export declare class IntentInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class IntentFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class IntentsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
