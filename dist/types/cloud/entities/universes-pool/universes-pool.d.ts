import { APICarrier } from '../../../base';
import Entity, { EntityOptions } from '../../../entities/_base';
import { BaseError } from '../../../errors';
import type { Cloud } from '../../index';
export interface UniversesPoolOptions extends EntityOptions {
    rawPayload?: UniversesPoolRawPayload;
}
export interface UniversesPoolRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly status?: string;
    readonly configuration?: string;
}
export interface UniversesPoolPaylod {
    readonly id?: UniversesPoolRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: UniversesPoolRawPayload['deleted'];
    readonly active?: UniversesPoolRawPayload['active'];
    readonly name?: UniversesPoolRawPayload['name'];
    readonly status?: UniversesPoolRawPayload['status'];
    readonly configuration?: UniversesPoolRawPayload['configuration'];
}
export declare class UniversesPool extends Entity<UniversesPoolPaylod, UniversesPoolRawPayload> {
    protected apiCarrier: APICarrier;
    protected http: Cloud['http'];
    protected options: UniversesPoolOptions;
    initialized: boolean;
    endpoint: string;
    id?: UniversesPoolPaylod['id'];
    createdAt?: UniversesPoolPaylod['createdAt'];
    updatedAt?: UniversesPoolPaylod['updatedAt'];
    deleted?: UniversesPoolPaylod['deleted'];
    active?: UniversesPoolPaylod['active'];
    name?: UniversesPoolPaylod['name'];
    status?: UniversesPoolPaylod['status'];
    configuration?: UniversesPoolPaylod['configuration'];
    constructor(options: UniversesPoolOptions);
    protected deserialize(rawPayload: UniversesPoolRawPayload): UniversesPool;
    static create(payload: UniversesPoolRawPayload, carrier: Cloud, http: Cloud['http']): UniversesPool;
    serialize(): UniversesPoolRawPayload;
    init(): Promise<UniversesPool | undefined>;
}
export declare class UniversesPools {
    static endpoint: string;
}
export declare class UniversesPoolInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniversesPoolFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UniversesPoolsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
