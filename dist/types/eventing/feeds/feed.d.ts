/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../../universe';
export interface FeedOptions {
    universe: Universe;
    http: Universe['http'];
    rawPayload?: FeedRawPayload;
    initialized?: boolean;
}
export interface FeedRawPayload {
    readonly id?: string;
    readonly participants?: string[];
    readonly agents?: string[];
    readonly parents?: string[];
    readonly active?: boolean;
    readonly deleted?: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
}
export interface FeedPayload {
    readonly id?: string;
    readonly participants?: string[];
    readonly agents?: string[];
    readonly parents?: string[];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
}
export declare class Feed extends EventEmitter {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: FeedOptions;
    initialized: boolean;
    readonly id?: string;
    readonly participants?: string[];
    readonly agents?: string[];
    readonly parents?: string[];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    constructor(options: FeedOptions);
    static deserialize(payload: FeedRawPayload, universe: Universe, http: Universe['http']): Feed;
    static createUninitialized(payload: FeedRawPayload, universe: Universe, http: Universe['http']): Feed;
    serialize(): FeedRawPayload;
    private handleError;
}
