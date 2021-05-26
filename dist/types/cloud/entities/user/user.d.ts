import { APICarrier } from '../../../base';
import Entity, { EntityOptions } from '../../../entities/_base';
import { BaseError } from '../../../errors';
import type { Cloud } from '../../index';
export interface UniverseUserOptions extends EntityOptions {
    rawPayload?: UniverseUserRawPayload;
}
export interface UniverseUserRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly universe?: string;
    readonly light_profile?: object;
}
export interface UniverseUserPayload {
    readonly id?: UniverseUserRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly universe?: UniverseUserRawPayload['universe'];
    readonly lightProfile?: UniverseUserRawPayload['light_profile'];
}
export declare class UniverseUser extends Entity<UniverseUserPayload, UniverseUserRawPayload> {
    protected apiCarrier: APICarrier;
    protected http: Cloud['http'];
    protected options: UniverseUserOptions;
    initialized: boolean;
    endpoint: string;
    id?: UniverseUserPayload['id'];
    createdAt?: UniverseUserPayload['createdAt'];
    updatedAt?: UniverseUserPayload['updatedAt'];
    deleted?: UniverseUserPayload['deleted'];
    active?: UniverseUserPayload['active'];
    universe?: UniverseUserPayload['universe'];
    lightProfile?: UniverseUserPayload['lightProfile'];
    constructor(options: UniverseUserOptions);
    protected deserialize(rawPayload: UniverseUserRawPayload): UniverseUser;
    static create(payload: UniverseUserRawPayload, carrier: Cloud, http: Cloud['http']): UniverseUser;
    serialize(): UniverseUserRawPayload;
    init(): Promise<UniverseUser | undefined>;
}
export declare class UniverseUsers {
    static endpoint: string;
}
export declare class UniverseUserInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniverseUserFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniverseUsersFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
