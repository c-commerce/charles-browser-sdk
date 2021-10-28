import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface ConfigurationOptions extends UniverseEntityOptions {
    rawPayload?: ConfigurationRawPayload;
}
export interface ConfigurationOOODay {
    all_day: boolean;
    slots: Array<{
        start: string;
        end: string;
    }>;
}
export interface ConfigurationRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly owner?: string;
    readonly configuration?: {
        settings?: object;
        api?: object;
        feedback?: object;
        out_of_office?: {
            event_route: null | string;
            times: {
                monday: ConfigurationOOODay;
                tuesday: ConfigurationOOODay;
                wednesday: ConfigurationOOODay;
                thursday: ConfigurationOOODay;
                friday: ConfigurationOOODay;
                saturday: ConfigurationOOODay;
                sunday: ConfigurationOOODay;
            };
        };
    };
    ui?: {
        [key: string]: any;
    };
    privacy?: {
        [key: string]: any;
    };
    dashboard?: {
        [key: string]: any;
    };
}
export interface ConfigurationPayload {
    readonly id?: ConfigurationRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ConfigurationRawPayload['deleted'];
    readonly active?: ConfigurationRawPayload['active'];
    readonly owner?: ConfigurationRawPayload['owner'];
    readonly configuration?: ConfigurationRawPayload['configuration'];
    readonly ui?: ConfigurationRawPayload['ui'];
    readonly privacy?: ConfigurationRawPayload['privacy'];
    readonly dashboard?: ConfigurationRawPayload['dashboard'];
}
export declare class Configuration extends UniverseEntity<ConfigurationPayload, ConfigurationRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: ConfigurationOptions;
    initialized: boolean;
    endpoint: string;
    id?: ConfigurationPayload['id'];
    createdAt?: ConfigurationPayload['createdAt'];
    updatedAt?: ConfigurationPayload['updatedAt'];
    deleted?: ConfigurationPayload['deleted'];
    active?: ConfigurationPayload['active'];
    owner?: ConfigurationPayload['owner'];
    configuration?: ConfigurationPayload['configuration'];
    ui?: ConfigurationPayload['ui'];
    privacy?: ConfigurationPayload['privacy'];
    dashboard?: ConfigurationPayload['dashboard'];
    constructor(options: ConfigurationOptions);
    protected deserialize(rawPayload: ConfigurationRawPayload): Configuration;
    static create(payload: ConfigurationRawPayload, universe: Universe, http: Universe['http']): Configuration;
    serialize(): ConfigurationRawPayload;
    init(): Promise<Configuration | undefined>;
}
export declare class Configurations {
    static endpoint: string;
}
export declare class ConfigurationInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ConfigurationFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ConfigurationsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
