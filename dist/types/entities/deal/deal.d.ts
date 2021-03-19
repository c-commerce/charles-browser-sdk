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
