import { Client } from '../client';
import { BaseError } from '../errors/base-error';
import { CharlesBaseHandler } from '../base';
export interface MeOptions {
    user?: string;
    base?: string;
}
export interface MeResponse {
    data: Me;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
    errors?: ErrorObject[];
}
export interface Me {
    id: string;
    role: string;
    scopes: string[];
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails?: object;
}
export declare class Me extends CharlesBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: MeOptions;
    constructor(options: MeOptions, http: Client);
    get(): Promise<MeResponse>;
}
export declare class MeFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
