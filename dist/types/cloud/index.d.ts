import { CloudHealth, CloudStatus } from './status';
import { Client } from '../client';
import { APICarrier } from '../base';
import { BaseError } from '../errors';
import { EntityFetchOptions, EntityFetchQuery } from '../entities/_base';
import * as universe from './entities/universe';
import * as staff from '../entities/staff/staff';
export interface CloudUser {
    id?: string;
    accessToken?: string;
}
export interface CloudOptions {
    cloudBase?: string;
    http: Client;
    user: CloudUser;
}
export interface ApiRequestOptions {
    method: string;
    path: string;
    data?: object;
    query?: EntityFetchQuery;
}
export interface CloudFetchQuery {
    [key: string]: any;
}
export interface CloudFetchOptions {
    raw?: boolean;
    query?: CloudFetchQuery;
}
export declare interface Cloud {
    on: ((event: 'raw-error' | 'error', cb: (error: Error) => void) => this) & ((event: string, cb: Function) => this);
}
export declare class CloudUnauthenticatedError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudMeError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export interface CloudMeData {
    user: {
        email: string;
        sub: string;
        authenticated: boolean;
    };
    permissions: CloudPermissionType[];
    roles: CloudPermissionType[];
}
export interface CloudErrors {
    CloudUnauthenticatedError: new () => CloudUnauthenticatedError;
    CloudMeError: new () => CloudMeError;
}
export declare type CloudPermissionType = 'admin';
export declare type CloudRoleType = 'admin';
export interface MeData {
    user: {
        email: string;
        sub: string;
        authenticated: boolean;
    };
    permissions: CloudPermissionType[];
    roles: CloudPermissionType[];
    staff: staff.StaffRawPayload;
}
interface BaseResourceCreateable<T, K> {
    new (...args: any[]): T;
    create: (payload: K, cloud: Cloud, http: Cloud['http']) => T;
}
interface BaseResourceList<T> {
    endpoint: string;
    new (...args: any[]): T;
}
declare type BaseResourceErrorProto<E> = new (...args: any[]) => E;
declare type BaseResourceEntityFetchOptions<O> = EntityFetchOptions;
export declare class Cloud extends APICarrier {
    status: CloudStatus;
    health: CloudHealth;
    options: CloudOptions;
    initialized: boolean;
    user: CloudUser;
    protected http: Client;
    private readonly mqtt;
    cloudBase: string;
    private static readonly endpoint;
    private _cachedMeData?;
    constructor(options: CloudOptions);
    init(): Promise<Cloud | undefined>;
    static get errors(): CloudErrors;
    get errors(): CloudErrors;
    private setInitialized;
    deinitialize(): void;
    get ready(): boolean;
    isReady(): boolean;
    get connected(): boolean;
    isConnected(): boolean;
    private handleError;
    private baseResourceFactory;
    universe(payload: universe.CloudUniverseRawPayload): universe.CloudUniverse;
    apiRequest(options: ApiRequestOptions): Promise<{
        [key: string]: any;
    } | Array<{
        [key: string]: any;
    } | undefined>>;
    private setCachedMeData;
    get authData(): {
        me?: CloudMeData;
    };
    me(): Promise<MeData | undefined>;
    makeBaseResourceListRequest<T, TL, K, O, E>(proto: BaseResourceCreateable<T, K>, listProto: BaseResourceList<TL>, errorProto: BaseResourceErrorProto<E>, options?: BaseResourceEntityFetchOptions<O>): Promise<T[] | K[] | undefined>;
    universes(options?: EntityFetchOptions): Promise<universe.CloudUniverse[] | universe.CloudUniverseRawPayload[] | undefined>;
    versions(): Promise<{
        multiverse: string;
    } | undefined>;
    healthz(): Promise<{
        message: string;
    } | undefined>;
}
export declare class CloudSingleton extends Cloud {
    private static instance;
    static getInstance(options: CloudOptions): Cloud;
    static clearInstance(): void;
}
export declare class CloudInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudApiRequestError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudVersionsError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudSelfError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CloudHealthzError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export {};
