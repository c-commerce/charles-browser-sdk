import { APICarrier } from '../../../base';
import Entity, { EntityOptions } from '../../../entities/_base';
import { BaseError } from '../../../errors';
import { Cloud } from '../../index';
export interface CloudUniversesWabasPhonenumberOptions extends EntityOptions {
    rawPayload?: CloudUniversesWabasPhonenumberRawPayload;
}
export interface CloudUniversesWabasPhonenumberRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly phonenumber?: string;
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
    readonly waba?: object;
}
export interface CloudUniversesWabasPhonenumberPayload {
    readonly id?: CloudUniversesWabasPhonenumberRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly phonenumber?: CloudUniversesWabasPhonenumberRawPayload['phonenumber'];
    readonly organization?: CloudUniversesWabasPhonenumberRawPayload['organization'];
    readonly universe?: CloudUniversesWabasPhonenumberRawPayload['universe'];
    readonly billable?: CloudUniversesWabasPhonenumberRawPayload['billable'];
    readonly approved?: CloudUniversesWabasPhonenumberRawPayload['approved'];
    readonly externalName?: CloudUniversesWabasPhonenumberRawPayload['external_name'];
    readonly externalReferenceId?: CloudUniversesWabasPhonenumberRawPayload['external_reference_id'];
    readonly vendor?: CloudUniversesWabasPhonenumberRawPayload['vendor'];
    readonly status?: CloudUniversesWabasPhonenumberRawPayload['status'];
    readonly product?: CloudUniversesWabasPhonenumberRawPayload['product'];
    readonly payload?: CloudUniversesWabasPhonenumberRawPayload['payload'];
    readonly waba?: CloudUniversesWabasPhonenumberRawPayload['waba'];
}
export declare class CloudUniversesWabasPhonenumber extends Entity<CloudUniversesWabasPhonenumberPayload, CloudUniversesWabasPhonenumberRawPayload> {
    protected apiCarrier: APICarrier;
    protected http: Cloud['http'];
    protected options: CloudUniversesWabasPhonenumberOptions;
    initialized: boolean;
    endpoint: string;
    id?: CloudUniversesWabasPhonenumberPayload['id'];
    createdAt?: CloudUniversesWabasPhonenumberPayload['createdAt'];
    updatedAt?: CloudUniversesWabasPhonenumberPayload['updatedAt'];
    deleted?: CloudUniversesWabasPhonenumberPayload['deleted'];
    active?: CloudUniversesWabasPhonenumberPayload['active'];
    phonenumber?: CloudUniversesWabasPhonenumberPayload['phonenumber'];
    organization?: CloudUniversesWabasPhonenumberPayload['organization'];
    universe?: CloudUniversesWabasPhonenumberPayload['universe'];
    billable?: CloudUniversesWabasPhonenumberPayload['billable'];
    approved?: CloudUniversesWabasPhonenumberPayload['approved'];
    externalName?: CloudUniversesWabasPhonenumberPayload['externalName'];
    externalReferenceId?: CloudUniversesWabasPhonenumberPayload['externalReferenceId'];
    vendor?: CloudUniversesWabasPhonenumberPayload['vendor'];
    status?: CloudUniversesWabasPhonenumberPayload['status'];
    product?: CloudUniversesWabasPhonenumberPayload['product'];
    payload?: CloudUniversesWabasPhonenumberPayload['payload'];
    waba?: CloudUniversesWabasPhonenumberPayload['waba'];
    constructor(options: CloudUniversesWabasPhonenumberOptions);
    protected deserialize(rawPayload: CloudUniversesWabasPhonenumberRawPayload): CloudUniversesWabasPhonenumber;
    static create(payload: CloudUniversesWabasPhonenumberRawPayload, carrier: Cloud, http: Cloud['http']): CloudUniversesWabasPhonenumber;
    serialize(): CloudUniversesWabasPhonenumberRawPayload;
    init(): Promise<CloudUniversesWabasPhonenumber | undefined>;
}
export declare class CloudUniversesWabasPhonenumbers {
    static endpoint: string;
}
export declare class CloudUniversesWabasPhonenumberInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudUniversesWabasPhonenumberFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudUniversesWabasPhonenumbersFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
