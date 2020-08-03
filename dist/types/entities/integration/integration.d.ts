import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface IntegrationOptions extends EntityOptions {
    rawPayload?: IntegrationRawPayload;
}
export interface IntegrationRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly vendor?: string;
    readonly type?: string;
    readonly payload?: {
        [key: string]: any;
    };
}
export interface AvailableIntegrationRawPayload {
    readonly name?: string;
    readonly summary?: string;
    readonly icon?: string;
    readonly schema?: {
        $id: string;
        type: 'object';
    };
    readonly ui_schema?: Array<{
        component: string;
        fieldOptions: {
            [key: string]: any;
        };
        children: Array<{
            [key: string]: any;
        }>;
    }>;
    readonly setup_endpoint?: string;
}
export interface IntegrationPayload {
    readonly id?: IntegrationRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: IntegrationRawPayload['deleted'];
    readonly active?: IntegrationRawPayload['active'];
    readonly vendor?: IntegrationRawPayload['vendor'];
    readonly type?: IntegrationRawPayload['type'];
    readonly payload?: IntegrationRawPayload['payload'];
}
export declare class Integration extends Entity<IntegrationPayload, IntegrationRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: IntegrationOptions;
    initialized: boolean;
    endpoint: string;
    id?: IntegrationPayload['id'];
    createdAt?: IntegrationPayload['createdAt'];
    updatedAt?: IntegrationPayload['updatedAt'];
    deleted?: IntegrationPayload['deleted'];
    active?: IntegrationPayload['active'];
    vendor?: IntegrationPayload['vendor'];
    type?: IntegrationPayload['type'];
    payload?: IntegrationPayload['payload'];
    constructor(options: IntegrationOptions);
    protected deserialize(rawPayload: IntegrationRawPayload): Integration;
    static create(payload: IntegrationRawPayload, universe: Universe, http: Universe['http']): Integration;
    serialize(): IntegrationRawPayload;
    init(): Promise<Integration | undefined>;
}
export declare class Integrations {
    static endpoint: string;
}
export declare class IntegrationInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class IntegrationFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class IntegrationsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AvailableIntegrationsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
