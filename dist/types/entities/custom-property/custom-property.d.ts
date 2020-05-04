import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface CustomPropertyOptions extends EntityOptions {
    rawPayload?: CustomPropertyRawPayload;
}
export interface CustomPropertyRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
}
export interface CustomPropertyPayload {
    readonly id?: CustomPropertyRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: CustomPropertyRawPayload['deleted'];
    readonly active?: CustomPropertyRawPayload['active'];
}
export declare class CustomProperty extends Entity<CustomPropertyPayload, CustomPropertyRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: CustomPropertyOptions;
    initialized: boolean;
    endpoint: string;
    id?: CustomPropertyPayload['id'];
    createdAt?: CustomPropertyPayload['createdAt'];
    updatedAt?: CustomPropertyPayload['updatedAt'];
    deleted?: CustomPropertyPayload['deleted'];
    active?: CustomPropertyPayload['active'];
    constructor(options: CustomPropertyOptions);
    protected deserialize(rawPayload: CustomPropertyRawPayload): CustomProperty;
    static create(payload: CustomPropertyRawPayload, universe: Universe, http: Universe['http']): CustomProperty;
    serialize(): CustomPropertyRawPayload;
    init(): Promise<CustomProperty | undefined>;
}
export declare class CustomProperties {
    static endpoint: string;
}
export declare class CustomPropertyInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CustomPropertyFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CustomPropertiesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
