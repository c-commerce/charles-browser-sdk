import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface ThingOptions extends UniverseEntityOptions {
    rawPayload?: ThingRawPayload;
}
export interface ThingRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly kind?: null | 'StaffMobileDevice' | 'StaffBrowserDevice' | string;
    readonly name?: string | null;
    readonly configuration?: null | {
        [key: string]: any;
    };
    readonly groups?: string[] | null;
    readonly labels?: null | {
        [key: string]: any;
    };
    readonly auto_disconnect?: boolean;
    readonly last_activity_at?: string;
}
export interface ThingPayload {
    readonly id?: ThingRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ThingRawPayload['deleted'];
    readonly active?: ThingRawPayload['active'];
    readonly kind?: ThingRawPayload['kind'];
    readonly name?: ThingRawPayload['name'];
    readonly configuration?: ThingRawPayload['configuration'];
    readonly groups?: ThingRawPayload['groups'];
    readonly labels?: ThingRawPayload['labels'];
    readonly autoDisconnect?: ThingRawPayload['auto_disconnect'];
    readonly lastActivityAt?: Date | null;
}
export declare class Thing extends UniverseEntity<ThingPayload, ThingRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: ThingOptions;
    initialized: boolean;
    endpoint: string;
    id?: ThingPayload['id'];
    createdAt?: ThingPayload['createdAt'];
    updatedAt?: ThingPayload['updatedAt'];
    deleted?: ThingPayload['deleted'];
    active?: ThingPayload['active'];
    kind?: ThingPayload['kind'];
    name?: ThingPayload['name'];
    configuration?: ThingPayload['configuration'];
    groups?: ThingPayload['groups'];
    labels?: ThingPayload['labels'];
    autoDisconnect?: ThingPayload['autoDisconnect'];
    lastActivityAt?: ThingPayload['lastActivityAt'];
    constructor(options: ThingOptions);
    protected deserialize(rawPayload: ThingRawPayload): Thing;
    static create(payload: ThingRawPayload, universe: Universe, http: Universe['http']): Thing;
    serialize(): ThingRawPayload;
    init(): Promise<Thing | undefined>;
    bind(payload?: ThingRawPayload): Promise<Thing>;
    protected _bind(payload?: ThingRawPayload): Promise<Thing>;
}
export declare class Things {
    static endpoint: string;
}
export declare class ThingInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ThingFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ThingsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ThingsBindRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
