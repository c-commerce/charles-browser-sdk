/// <reference types="node" />
import { EventEmitter } from 'events';
import { Readable, pipeline } from 'readable-stream';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface EntityOptions {
    universe: Universe;
    http: Universe['http'];
    initialized?: boolean;
}
export interface EntityRawPayload {
    readonly id?: string;
}
export interface EntityFetchQuery {
    [key: string]: any;
}
export interface EntityFetchOptions {
    raw?: boolean;
    query?: EntityFetchQuery;
}
export default abstract class Entity<Payload, RawPayload> extends EventEmitter {
    protected abstract universe: Universe;
    protected abstract http: Universe['http'];
    protected _rawPayload?: RawPayload | null;
    abstract id?: string;
    abstract endpoint: string;
    protected setRawPayload(p: RawPayload): Entity<Payload, RawPayload>;
    abstract serialize(): RawPayload;
    protected abstract deserialize(rawPayload: RawPayload): Entity<Payload, RawPayload>;
    protected handleError(err: Error): Error;
    fetch(options?: EntityFetchOptions): Promise<Entity<Payload, RawPayload>>;
    protected _fetch(options?: EntityFetchOptions): Promise<Entity<Payload, RawPayload>>;
    patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>>;
    protected _patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>>;
    post(): Promise<Entity<Payload, RawPayload>>;
    protected _post(): Promise<Entity<Payload, RawPayload>>;
    delete(): Promise<Entity<Payload, RawPayload>>;
    protected _delete(): Promise<Entity<Payload, RawPayload>>;
    save(payload?: RawPayload): Promise<Entity<Payload, RawPayload>>;
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
export interface EntitiesListFetchQuery {
    [key: string]: any;
}
export interface EntitiesListFetchOptions {
    raw?: boolean;
    query?: EntitiesListFetchQuery;
}
export declare abstract class EntitiesList<Entity, RawPayload> extends Readable {
    protected abstract universe: Universe;
    protected abstract http: Universe['http'];
    abstract endpoint: string;
    constructor();
    _read(): void;
    protected abstract parseItem(payload: RawPayload): Entity;
    static pipeline: typeof pipeline;
    abstract getStream(options?: EntitiesListFetchOptions): Promise<EntitiesList<Entity, RawPayload>>;
    protected _getStream(options?: EntitiesListFetchOptions): Promise<EntitiesList<Entity, RawPayload>>;
}
