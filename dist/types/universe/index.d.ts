import { Readable } from 'readable-stream';
import { UniverseHealth, UniverseStatus } from './status';
import { Client } from '../client';
import { BaseError } from '../errors';
export interface IUniverseUser {
    id?: string;
    accessToken: string;
}
export interface IUniverseOptions {
    name: string;
    http: Client;
    base: string;
    user: IUniverseUser;
}
export interface IUniversePayload {
    name: string;
    id: string;
    active: boolean;
    deleted: boolean;
    organization: string;
    configuration: object | null;
    updatedAt: Date | null;
    createdAt: Date | null;
}
export declare interface Universe {
    on(event: 'raw-error' | 'error', cb: (error: Error) => void): this;
    on(event: 'armed' | 'universe:message' | string, cb: Function): this;
}
export declare class Universe extends Readable {
    status: UniverseStatus;
    health: UniverseHealth;
    options: IUniverseOptions;
    name: IUniverseOptions['name'];
    initialized: boolean;
    payload: IUniversePayload | null;
    user: IUniverseUser;
    protected http: Client;
    private mqtt;
    base: string;
    universeBase: string;
    private static endpoint;
    constructor(options: IUniverseOptions);
    init(): Promise<Universe | undefined>;
    private static parsePayload;
    private setInitialized;
    private setMqttClient;
    private subscibeDefaults;
    /**
     *
     * Parsing and routing logic is being handled here. We take extensive decisions about type and destionations here.
     */
    private handleMessage;
    /**
     * Safe access the mqtt client. This has a conequence that all the methods that use it need to be aware that they might throw.
     */
    private getMqttClient;
    create(options: IUniverseOptions): Universe;
    implode(): void;
    get ready(): boolean;
    isReady(): boolean;
    get connected(): boolean;
    isConnected(): boolean;
    private handleError;
    /**
     * Arm the client by retrieving latest data. Arming emits to the server and listens for the response once.
     */
    arm(): Universe;
}
export declare class UnviverseSingleton extends Universe {
    private static instance;
    constructor(options: IUniverseOptions);
    static getInstance(options: IUniverseOptions): Universe;
    static clearInstance(): void;
}
export declare class UniverseInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UninstantiatedRealtimeClient extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
