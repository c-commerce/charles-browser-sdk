import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { PipelineStage } from './pipeline-stage';
export interface PipelineOptions extends EntityOptions {
    rawPayload?: PipelineRawPayload;
}
export interface PipelineRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly external_reference_id?: string;
    readonly kind?: string;
    readonly crm?: string;
    readonly stages?: PipelineStage[];
    readonly proxy_vendor?: string;
    readonly proxy_payload?: object;
}
export interface PipelinePayload {
    readonly id?: PipelineRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: PipelineRawPayload['deleted'];
    readonly active?: PipelineRawPayload['active'];
    readonly name?: PipelineRawPayload['name'];
    readonly externalReferenceId?: PipelineRawPayload['external_reference_id'];
    readonly kind?: PipelineRawPayload['kind'];
    readonly crm?: PipelineRawPayload['crm'];
    readonly stages?: PipelineRawPayload['stages'];
    readonly proxyVendor?: PipelineRawPayload['proxy_vendor'];
    readonly proxyPayload?: PipelineRawPayload['proxy_payload'];
}
export declare class Pipeline extends Entity<PipelinePayload, PipelineRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: PipelineOptions;
    initialized: boolean;
    endpoint: string;
    id?: PipelinePayload['id'];
    createdAt?: PipelinePayload['createdAt'];
    updatedAt?: PipelinePayload['updatedAt'];
    deleted?: PipelinePayload['deleted'];
    active?: PipelinePayload['active'];
    name?: PipelinePayload['name'];
    externalReferenceId?: PipelinePayload['externalReferenceId'];
    kind?: PipelinePayload['kind'];
    crm?: PipelinePayload['crm'];
    stages?: PipelinePayload['stages'];
    proxyVendor?: PipelinePayload['proxyVendor'];
    proxyPayload?: PipelinePayload['proxyPayload'];
    constructor(options: PipelineOptions);
    protected deserialize(rawPayload: PipelineRawPayload): Pipeline;
    static create(payload: PipelineRawPayload, universe: Universe, http: Universe['http']): Pipeline;
    static createUninitialized(payload: PipelineRawPayload, universe: Universe, http: Universe['http']): Pipeline;
    serialize(): PipelineRawPayload;
    init(): Promise<Pipeline | undefined>;
}
export declare class PipelineInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PipelineFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PipelinesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
