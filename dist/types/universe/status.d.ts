/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from './';
export interface UniverseHealthOptions {
    universe: Universe;
}
export interface UniverseStatusOptions {
    universe: Universe;
}
export declare class UniverseHealth extends EventEmitter {
    universe: Universe;
    options: UniverseHealthOptions;
    constructor(opts: UniverseHealthOptions);
}
export declare class UniverseStatus extends EventEmitter {
    universe: Universe;
    options: UniverseStatusOptions;
    constructor(opts: UniverseStatusOptions);
}
