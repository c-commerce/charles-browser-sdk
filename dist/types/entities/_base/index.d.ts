/// <reference types="node" />
import { EventEmitter } from 'events';
import { Readable, pipeline } from 'readable-stream';
import { SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook, AsyncParallelHook, AsyncParallelBailHook, AsyncSeriesHook, AsyncSeriesBailHook, AsyncSeriesWaterfallHook } from 'tapable';
import { APICarrier } from '../../base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface RawPatchItem {
    op: 'replace' | 'add' | 'remove';
    path: string;
    value: any;
}
export declare type RawPatch = RawPatchItem[];
export interface EntityOptions {
    carrier: APICarrier;
    http: APICarrier['http'];
    initialized?: boolean;
}
export interface UniverseEntityOptions extends Omit<EntityOptions, 'carrier'> {
    universe: Universe;
}
export interface EntityRawPayload {
    readonly id?: string;
}
export interface EntityFetchQuery {
    [key: string]: any;
}
export interface EntityDeleteQuery {
    [key: string]: any;
}
export interface EntityFetchOptions {
    raw?: boolean;
    query?: EntityFetchQuery;
    timeout?: number;
}
export interface EntityDeleteOptions {
    query?: EntityFetchQuery;
}
export declare class HookableEvented extends EventEmitter {
}
export default abstract class Entity<Payload, RawPayload> extends HookableEvented {
    protected hooks: {
        [key: string]: SyncHook | SyncBailHook | SyncWaterfallHook | SyncLoopHook | AsyncParallelHook | AsyncParallelBailHook | AsyncSeriesHook | AsyncSeriesBailHook | AsyncSeriesWaterfallHook;
    };
    protected abstract apiCarrier: APICarrier;
    protected abstract http: APICarrier['http'];
    protected _rawPayload?: RawPayload | null;
    abstract id?: string;
    abstract endpoint: string;
    constructor();
    protected setRawPayload(p: RawPayload): Entity<Payload, RawPayload>;
    static isEntity(object: any): Boolean;
    abstract serialize(): RawPayload;
    protected abstract deserialize(rawPayload: RawPayload): Entity<Payload, RawPayload>;
    protected handleError(err: Error): Error;
    fetch(options?: EntityFetchOptions): Promise<Entity<Payload, RawPayload>>;
    protected _fetch(options?: EntityFetchOptions): Promise<Entity<Payload, RawPayload>>;
    patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>>;
    protected _patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>>;
    applyPatch(patch: RawPatch): Promise<Entity<Payload, RawPayload>>;
    protected _applyPatch(patch: RawPatch): Promise<Entity<Payload, RawPayload>>;
    post(): Promise<Entity<Payload, RawPayload>>;
    protected _post(): Promise<Entity<Payload, RawPayload>>;
    put(): Promise<Entity<Payload, RawPayload>>;
    protected _put(): Promise<Entity<Payload, RawPayload>>;
    delete(): Promise<Entity<Payload, RawPayload>>;
    protected _delete(): Promise<Entity<Payload, RawPayload>>;
    save(payload?: RawPayload): Promise<Entity<Payload, RawPayload>>;
    protected _save(payload?: RawPayload): Promise<Entity<Payload, RawPayload>>;
}
export declare abstract class UniverseEntity<Payload, RawPayload> extends Entity<Payload, RawPayload> {
    protected abstract universe: Universe;
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
export declare class EntityDeleteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class EntityPutError extends BaseError {
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
export interface EntitiesListExportCsvQuery {
    [key: string]: any;
}
export interface EntitiesListFetchOptions {
    raw?: boolean;
    query?: EntitiesListFetchQuery;
}
export interface EntitiesListExportCsvOptions {
    query?: EntitiesListExportCsvQuery;
}
export declare abstract class EntitiesList<Entity, RawPayload> extends Readable {
    protected abstract apiCarrier: APICarrier;
    protected abstract http: APICarrier['http'];
    abstract endpoint: string;
    constructor();
    _read(): void;
    protected abstract parseItem(payload: RawPayload): Entity;
    static pipeline: typeof pipeline;
    abstract getStream(options?: EntitiesListFetchOptions): Promise<EntitiesList<Entity, RawPayload>>;
    protected _getStream(options?: EntitiesListFetchOptions): Promise<EntitiesList<Entity, RawPayload>>;
    abstract exportCsv(options?: EntitiesListExportCsvOptions): Promise<Blob>;
    protected _exportCsv(options?: EntitiesListExportCsvOptions): Promise<Blob>;
}
