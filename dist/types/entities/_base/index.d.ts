/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface EntityOptions {
    universe: Universe;
    http: Universe['http'];
    initialized?: boolean;
}
export interface EntityFetchOptions {
    query?: {
        [key: string]: any;
    };
}
export interface EntityRawPayload {
    readonly id?: string;
}
export default abstract class Entity<Payload, RawPayload> extends EventEmitter {
    protected abstract universe: Universe;
    protected abstract http: Universe['http'];
    /**
     * @ignore
     */
    protected _rawPayload?: RawPayload | null;
    abstract id?: string;
    abstract endpoint: string;
    /**
     * @ignore
     */
    protected setRawPayload(p: RawPayload): Entity<Payload, RawPayload>;
    /**
     * Convert object to a JS struct.
     */
    abstract serialize(): RawPayload;
    protected abstract deserialize(rawPayload: RawPayload): Entity<Payload, RawPayload>;
    /**
     * @ignore
     */
    protected handleError(err: Error): Error;
    /**
     * Fetch the current state of this object.
     */
    fetch(options?: EntityFetchOptions): Promise<Entity<Payload, RawPayload>>;
    /**
     * @ignore
     */
    protected _fetch(options?: EntityFetchOptions): Promise<Entity<Payload, RawPayload>>;
    /**
     * Change this object on the remote by partially applying a change object to it as diff.
     * @param changePart
     */
    patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>>;
    /**
     * @ignore
     */
    protected _patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>>;
    /**
     * Create this object on the remote.
     */
    post(): Promise<Entity<Payload, RawPayload>>;
    /**
     * @ignore
     */
    protected _post(): Promise<Entity<Payload, RawPayload>>;
    /**
     * Delete this object on the remote.
     */
    delete(): Promise<Entity<Payload, RawPayload>>;
    /**
     * @ignore
     */
    protected _delete(): Promise<Entity<Payload, RawPayload>>;
    /**
     * Save a change to this local object, by either creating or patching it on the remote.
     * @param payload
     */
    save(payload?: RawPayload): Promise<Entity<Payload, RawPayload>>;
    /**
     * @ignore
     */
    protected _save(payload?: RawPayload): Promise<Entity<Payload, RawPayload>>;
}
export declare class EntityPatchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EntityPostError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EntityFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
