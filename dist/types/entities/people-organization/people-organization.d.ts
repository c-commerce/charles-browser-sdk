import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { Address } from '../person';
export interface PeopleOrganizationOptions extends UniverseEntityOptions {
    rawPayload?: PeopleOrganizationRawPayload;
}
export interface PeopleOrganizationRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly custom_properties?: object;
    readonly address?: Address;
    readonly is_proxy?: boolean;
    readonly proxy_payload?: object;
}
export interface PeopleOrganizationPayload {
    readonly id?: PeopleOrganizationRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: PeopleOrganizationRawPayload['deleted'];
    readonly active?: PeopleOrganizationRawPayload['active'];
    readonly name?: PeopleOrganizationRawPayload['name'];
    readonly customProperties?: PeopleOrganizationRawPayload['custom_properties'];
    readonly address?: PeopleOrganizationRawPayload['address'];
    readonly isProxy?: PeopleOrganizationRawPayload['is_proxy'];
    readonly proxyPayload?: PeopleOrganizationRawPayload['proxy_payload'];
}
export declare class PeopleOrganization extends UniverseEntity<PeopleOrganizationPayload, PeopleOrganizationRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: PeopleOrganizationOptions;
    initialized: boolean;
    endpoint: string;
    id?: PeopleOrganizationPayload['id'];
    createdAt?: PeopleOrganizationPayload['createdAt'];
    updatedAt?: PeopleOrganizationPayload['updatedAt'];
    deleted?: PeopleOrganizationPayload['deleted'];
    active?: PeopleOrganizationPayload['active'];
    name?: PeopleOrganizationPayload['name'];
    customProperties?: PeopleOrganizationPayload['customProperties'];
    address?: PeopleOrganizationPayload['address'];
    isProxy?: PeopleOrganizationPayload['isProxy'];
    proxyPayload?: PeopleOrganizationPayload['proxyPayload'];
    constructor(options: PeopleOrganizationOptions);
    protected deserialize(rawPayload: PeopleOrganizationRawPayload): PeopleOrganization;
    static create(payload: PeopleOrganizationRawPayload, universe: Universe, http: Universe['http']): PeopleOrganization;
    serialize(): PeopleOrganizationRawPayload;
    init(): Promise<PeopleOrganization | undefined>;
}
export declare class PeopleOrganizations {
    static endpoint: string;
}
export declare class PeopleOrganizationInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PeopleOrganizationFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PeopleOrganizationsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
