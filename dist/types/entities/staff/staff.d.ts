/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface StaffOptions {
    universe: Universe;
    http: Universe['http'];
    rawPayload?: StaffRawPayload;
    initialized?: boolean;
}
export interface StaffRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
}
export interface StaffPayload {
    readonly id?: StaffRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
}
export declare class Staff extends EventEmitter {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: StaffOptions;
    initialized: boolean;
    endpoint: string;
    id?: string;
    createdAt?: StaffPayload['createdAt'];
    updatedAt?: StaffPayload['updatedAt'];
    constructor(options: StaffOptions);
    private deserialize;
    static create(payload: StaffRawPayload, universe: Universe, http: Universe['http']): Staff;
    serialize(): StaffRawPayload;
    init(): Promise<Staff | undefined>;
    fetch(): Promise<Staff | undefined>;
    private handleError;
}
export declare class Staffs {
    static endpoint: string;
}
export declare class StaffInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
