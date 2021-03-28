/// <reference types="node" />
import events from 'events';
import { UsernameAuth, KeyAuth, TokenAuth } from './v0/auth';
import * as v0 from './v0';
import { Client } from './client';
import { Universe, UnviverseSingleton, UniverseOptions } from './universe';
import { Cloud, CloudSingleton } from './cloud/index';
import { isEntity } from './helpers/entity';
export { v0, Universe, UniverseOptions, isEntity };
export declare const defaultOptions: CharlesSDKOptions;
export interface CharlesSDKOptions {
    credentials?: UsernameAuth | KeyAuth | TokenAuth | undefined;
    withCredentials?: boolean;
    universe?: string;
    base?: string;
    user?: string;
    responseInterceptors?: Function[];
    requestInterceptors?: Function[];
}
export interface IInstanceOptions {
    universe: string;
    [key: string]: any;
}
export interface IUniverseFactoryOptions {
    singleton?: boolean;
    base?: string;
    universeBase?: UniverseOptions['universeBase'];
    mqttUniverseBase?: UniverseOptions['mqttUniverseBase'];
}
export interface ICloudFactoryOptions {
    singleton?: boolean;
    base?: string;
}
export declare interface CharlesClient {
    on: ((event: 'raw-error' | 'error', listener: (error: Error) => void) => this) & ((event: string, listener: Function) => this);
}
export declare class CharlesClient extends events.EventEmitter {
    user?: string;
    auth: v0.Auth;
    http?: Client;
    options: CharlesSDKOptions | undefined;
    static environment: {
        VERSION: string;
    };
    initialized: boolean;
    constructor(options?: CharlesSDKOptions);
    init(options?: CharlesSDKOptions): void;
    destroy(): void;
    private handleOptions;
    private generateAuthenticatedInstance;
    universe(name: string, options?: IUniverseFactoryOptions): Universe | UnviverseSingleton;
    cloud(options?: ICloudFactoryOptions): Cloud | CloudSingleton;
    messages(): v0.Messages;
}
export declare class Charles extends CharlesClient {
    private static instance;
    constructor(options: CharlesSDKOptions);
    static getInstance(options: CharlesSDKOptions): Charles;
}
declare const _default: Charles;
export default _default;
