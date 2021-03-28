/// <reference types="node" />
import { EventEmitter } from 'events';
import { Cloud } from './';
export interface CloudHealthOptions {
    universe: Cloud;
}
export interface CloudStatusOptions {
    universe: Cloud;
}
export declare class CloudHealth extends EventEmitter {
    universe: Cloud;
    options: CloudHealthOptions;
    constructor(opts: CloudHealthOptions);
}
export declare class CloudStatus extends EventEmitter {
    universe: Cloud;
    options: CloudStatusOptions;
    constructor(opts: CloudStatusOptions);
}
