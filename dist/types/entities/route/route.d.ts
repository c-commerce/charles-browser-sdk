import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface RouteOptions extends EntityOptions {
    rawPayload?: RouteRawPayload;
}
export interface RouteRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string | null;
    readonly description?: string | null;
    readonly topic?: string | null;
    readonly logic?: null | object;
    readonly effect?: null | object;
    readonly kind?: null | string;
    readonly labels?: null | {
        [key: string]: any;
    };
}
export interface RoutePayload {
    readonly id?: RouteRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: RouteRawPayload['deleted'];
    readonly active?: RouteRawPayload['active'];
    readonly name?: RouteRawPayload['name'];
    readonly description?: RouteRawPayload['description'];
    readonly topic?: RouteRawPayload['topic'];
    readonly logic?: RouteRawPayload['logic'];
    readonly effect?: RouteRawPayload['effect'];
    readonly kind?: RouteRawPayload['kind'];
    readonly labels?: RouteRawPayload['labels'];
}
export declare class Route extends Entity<RoutePayload, RouteRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: RouteOptions;
    initialized: boolean;
    endpoint: string;
    id?: RoutePayload['id'];
    createdAt?: RoutePayload['createdAt'];
    updatedAt?: RoutePayload['updatedAt'];
    deleted?: RoutePayload['deleted'];
    active?: RoutePayload['active'];
    name?: RoutePayload['name'];
    description?: RoutePayload['description'];
    topic?: RoutePayload['topic'];
    logic?: RoutePayload['logic'];
    effect?: RoutePayload['effect'];
    kind?: RoutePayload['kind'];
    labels?: RoutePayload['labels'];
    constructor(options: RouteOptions);
    protected deserialize(rawPayload: RouteRawPayload): Route;
    static create(payload: RouteRawPayload, universe: Universe, http: Universe['http']): Route;
    serialize(): RouteRawPayload;
    init(): Promise<Route | undefined>;
}
export declare class Routes {
    static endpoint: string;
}
export declare class RouteInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class RouteFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class RoutesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
