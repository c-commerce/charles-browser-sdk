import { APICarrier } from '../../../base';
import Entity, { EntityOptions } from '../../../entities/_base';
import { BaseError } from '../../../errors';
import type { Cloud } from '../../index';
export interface OrganizationOptions extends EntityOptions {
    rawPayload?: OrganizationRawPayload;
}
export interface OrganizationRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly status?: string;
    readonly verified?: boolean;
    readonly owner?: string;
}
export interface OrganizationPayload {
    readonly id?: OrganizationRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: OrganizationRawPayload['deleted'];
    readonly active?: OrganizationRawPayload['active'];
    readonly name?: OrganizationRawPayload['name'];
    readonly status?: OrganizationRawPayload['status'];
    readonly verified?: OrganizationRawPayload['verified'];
    readonly owner?: OrganizationRawPayload['owner'];
}
export declare class Organization extends Entity<OrganizationPayload, OrganizationRawPayload> {
    protected apiCarrier: APICarrier;
    protected http: Cloud['http'];
    protected options: OrganizationOptions;
    initialized: boolean;
    endpoint: string;
    id?: OrganizationPayload['id'];
    createdAt?: OrganizationPayload['createdAt'];
    updatedAt?: OrganizationPayload['updatedAt'];
    deleted?: OrganizationPayload['deleted'];
    active?: OrganizationPayload['active'];
    name?: OrganizationPayload['name'];
    status?: OrganizationPayload['status'];
    verified?: OrganizationPayload['verified'];
    owner?: OrganizationPayload['owner'];
    constructor(options: OrganizationOptions);
    protected deserialize(rawPayload: OrganizationRawPayload): Organization;
    static create(payload: OrganizationRawPayload, carrier: Cloud, http: Cloud['http']): Organization;
    serialize(): OrganizationRawPayload;
    init(): Promise<Organization | undefined>;
}
export declare class Organizations {
    static endpoint: string;
}
export declare class OrganizationInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class OrganizationFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class OrganizationsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
