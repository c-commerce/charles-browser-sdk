import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface PipelineStageOptions extends UniverseEntityOptions {
    rawPayload?: PipelineStageRawPayload;
}
export interface PipelineStageRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly kind?: string;
    readonly name?: string;
    readonly external_reference_id?: string;
    readonly order_index?: number;
    readonly crm?: string;
    readonly pipeline?: string;
    readonly proxy_vendor?: string;
    readonly proxy_payload?: object;
}
export interface PipelineStagePayload {
    readonly id?: PipelineStageRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: PipelineStageRawPayload['deleted'];
    readonly active?: PipelineStageRawPayload['active'];
    readonly kind?: PipelineStageRawPayload['kind'];
    readonly name?: PipelineStageRawPayload['name'];
    readonly externalReferenceId?: PipelineStageRawPayload['external_reference_id'];
    readonly orderIndex?: PipelineStageRawPayload['order_index'];
    readonly crm?: PipelineStageRawPayload['crm'];
    readonly pipeline?: PipelineStageRawPayload['pipeline'];
    readonly proxyVendor?: PipelineStageRawPayload['proxy_vendor'];
    readonly proxyPayload?: PipelineStageRawPayload['proxy_payload'];
}
export declare class PipelineStage extends UniverseEntity<PipelineStagePayload, PipelineStageRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: PipelineStageOptions;
    initialized: boolean;
    endpoint: string;
    id?: PipelineStagePayload['id'];
    createdAt?: PipelineStagePayload['createdAt'];
    updatedAt?: PipelineStagePayload['updatedAt'];
    deleted?: PipelineStagePayload['deleted'];
    active?: PipelineStagePayload['active'];
    kind?: PipelineStagePayload['kind'];
    name?: PipelineStagePayload['name'];
    externalReferenceId?: PipelineStagePayload['externalReferenceId'];
    orderIndex?: PipelineStagePayload['orderIndex'];
    crm?: PipelineStagePayload['crm'];
    pipeline?: PipelineStagePayload['pipeline'];
    proxyVendor?: PipelineStagePayload['proxyVendor'];
    proxyPayload?: PipelineStagePayload['proxyPayload'];
    constructor(options: PipelineStageOptions);
    protected deserialize(rawPayload: PipelineStageRawPayload): PipelineStage;
    static create(payload: PipelineStageRawPayload, universe: Universe, http: Universe['http']): PipelineStage;
    static createUninitialized(payload: PipelineStageRawPayload, universe: Universe, http: Universe['http']): PipelineStage;
    serialize(): PipelineStageRawPayload;
    init(): Promise<PipelineStage | undefined>;
}
export declare class PipelineStageInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PipelineStageFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PipelineStagesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
