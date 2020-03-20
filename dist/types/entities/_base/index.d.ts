/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface EntityOptions {
    universe: Universe;
    http: Universe['http'];
    initialized?: boolean;
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
    patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>>;
    protected _patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>>;
}
export declare class EntityPatchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
