import { APICarrier } from '../../../base';
import Entity, { EntityOptions } from '../../../entities/_base';
import { BaseError } from '../../../errors';
import { Cloud } from '../../index';
export interface CloudUniversesWabaOptions extends EntityOptions {
    rawPayload?: CloudUniversesWabaRawPayload;
}
export interface CloudUniversesWabaRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly organization?: string;
    readonly universe?: string;
    readonly billable?: boolean;
    readonly approved?: boolean;
    readonly external_name?: string;
    readonly external_reference_id?: string;
    readonly vendor?: string;
    readonly status?: string;
    readonly product?: string;
    readonly payload?: object;
}
export interface CloudUniversesWabaPayload {
    readonly id?: CloudUniversesWabaRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly organization?: CloudUniversesWabaRawPayload['organization'];
    readonly universe?: CloudUniversesWabaRawPayload['universe'];
    readonly billable?: CloudUniversesWabaRawPayload['billable'];
    readonly approved?: CloudUniversesWabaRawPayload['approved'];
    readonly externalName?: CloudUniversesWabaRawPayload['external_name'];
    readonly externalReferenceId?: CloudUniversesWabaRawPayload['external_reference_id'];
    readonly vendor?: CloudUniversesWabaRawPayload['vendor'];
    readonly status?: CloudUniversesWabaRawPayload['status'];
    readonly product?: CloudUniversesWabaRawPayload['product'];
    readonly payload?: CloudUniversesWabaRawPayload['payload'];
}
export declare class CloudUniversesWaba extends Entity<CloudUniversesWabaPayload, CloudUniversesWabaRawPayload> {
    protected apiCarrier: APICarrier;
    protected http: Cloud['http'];
    protected options: CloudUniversesWabaOptions;
    initialized: boolean;
    endpoint: string;
    id?: CloudUniversesWabaPayload['id'];
    createdAt?: CloudUniversesWabaPayload['createdAt'];
    updatedAt?: CloudUniversesWabaPayload['updatedAt'];
    deleted?: CloudUniversesWabaPayload['deleted'];
    active?: CloudUniversesWabaPayload['active'];
    organization?: CloudUniversesWabaPayload['organization'];
    universe?: CloudUniversesWabaPayload['universe'];
    billable?: CloudUniversesWabaPayload['billable'];
    approved?: CloudUniversesWabaPayload['approved'];
    externalName?: CloudUniversesWabaPayload['externalName'];
    externalReferenceId?: CloudUniversesWabaPayload['externalReferenceId'];
    vendor?: CloudUniversesWabaPayload['vendor'];
    status?: CloudUniversesWabaPayload['status'];
    product?: CloudUniversesWabaPayload['product'];
    payload?: CloudUniversesWabaPayload['payload'];
    constructor(options: CloudUniversesWabaOptions);
    protected deserialize(rawPayload: CloudUniversesWabaRawPayload): CloudUniversesWaba;
    static create(payload: CloudUniversesWabaRawPayload, carrier: Cloud, http: Cloud['http']): CloudUniversesWaba;
    serialize(): CloudUniversesWabaRawPayload;
    init(): Promise<CloudUniversesWaba | undefined>;
}
export declare class CloudUniversesWabas {
    static endpoint: string;
}
export declare class CloudUniversesWabaInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudUniversesWabaFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudUniversesWabasFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
