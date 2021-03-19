import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { Pipeline, PipelineStage } from '../crm';
export interface DealOptions extends EntityOptions {
    rawPayload?: DealRawPayload;
}
export interface DealRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly pipeline?: Pipeline;
    readonly stage?: PipelineStage;
    readonly person?: string;
    readonly name?: string;
    readonly uri?: string;
    readonly proxy_vendor?: string;
    readonly kind?: string;
    readonly external_reference_id?: string;
    readonly channel_user?: string;
    readonly stage_external_reference_id?: string;
    readonly crm?: string;
    readonly currency?: string;
    readonly value?: number | string;
    readonly status?: string;
    readonly probability?: string;
    readonly date?: string;
    readonly next_activity_at?: string;
    readonly closed_at?: string;
    readonly won_at?: string;
    readonly lost_at?: string;
    readonly expected_closing_at?: string;
    readonly pipeline_external_reference_id?: string;
    readonly author?: object | string;
    readonly owner?: object | string;
    readonly proxy_payload?: object;
}
export interface DealPayload {
    readonly id?: DealRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: DealRawPayload['deleted'];
    readonly active?: DealRawPayload['active'];
    readonly pipeline?: DealRawPayload['pipeline'];
    readonly stage?: DealRawPayload['stage'];
    readonly person?: DealRawPayload['person'];
    readonly name?: DealRawPayload['name'];
    readonly uri?: DealRawPayload['uri'];
    readonly proxyVendor?: DealRawPayload['proxy_vendor'];
    readonly kind?: DealRawPayload['kind'];
    readonly externalReferenceId?: DealRawPayload['external_reference_id'];
    readonly channelUser?: DealRawPayload['channel_user'];
    readonly stageExternalReferenceId?: DealRawPayload['stage_external_reference_id'];
    readonly crm?: DealRawPayload['crm'];
    readonly currency?: DealRawPayload['currency'];
    readonly value?: DealRawPayload['value'];
    readonly status?: DealRawPayload['status'];
    readonly probability?: DealRawPayload['probability'];
    readonly date?: DealRawPayload['date'];
    readonly nextActivityAt?: DealRawPayload['next_activity_at'];
    readonly closedAt?: DealRawPayload['closed_at'];
    readonly wonAt?: DealRawPayload['won_at'];
    readonly lostAt?: DealRawPayload['lost_at'];
    readonly expectedClosingAt?: DealRawPayload['expected_closing_at'];
    readonly pipelineExternalReferenceId?: DealRawPayload['pipeline_external_reference_id'];
    readonly author?: DealRawPayload['author'];
    readonly owner?: DealRawPayload['owner'];
    readonly proxyPayload?: DealRawPayload['proxy_payload'];
}
export declare class Deal extends Entity<DealPayload, DealRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: DealOptions;
    initialized: boolean;
    endpoint: string;
    id?: DealPayload['id'];
    createdAt?: DealPayload['createdAt'];
    updatedAt?: DealPayload['updatedAt'];
    deleted?: DealPayload['deleted'];
    active?: DealPayload['active'];
    pipeline?: DealPayload['pipeline'];
    stage?: DealPayload['stage'];
    person?: DealPayload['person'];
    name?: DealPayload['name'];
    uri?: DealPayload['uri'];
    proxyVendor?: DealPayload['proxyVendor'];
    kind?: DealPayload['kind'];
    externalReferenceId?: DealPayload['externalReferenceId'];
    channelUser?: DealPayload['channelUser'];
    stageExternalReferenceId?: DealPayload['stageExternalReferenceId'];
    crm?: DealPayload['crm'];
    currency?: DealPayload['currency'];
    value?: DealPayload['value'];
    status?: DealPayload['status'];
    probability?: DealPayload['probability'];
    date?: DealPayload['date'];
    nextActivityAt?: DealPayload['nextActivityAt'];
    closedAt?: DealPayload['closedAt'];
    wonAt?: DealPayload['wonAt'];
    lostAt?: DealPayload['lostAt'];
    expectedClosingAt?: DealPayload['expectedClosingAt'];
    pipelineExternalReferenceId?: DealPayload['pipelineExternalReferenceId'];
    author?: DealPayload['author'];
    owner?: DealPayload['owner'];
    proxyPayload?: DealPayload['proxyPayload'];
    constructor(options: DealOptions);
    protected deserialize(rawPayload: DealRawPayload): Deal;
    static create(payload: DealRawPayload, universe: Universe, http: Universe['http']): Deal;
    serialize(): DealRawPayload;
    init(): Promise<Deal | undefined>;
}
export declare class Deals {
    static endpoint: string;
}
export declare class DealInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DealFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DealsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
