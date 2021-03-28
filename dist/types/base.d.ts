import { Readable } from 'readable-stream';
import { Client } from './client';
export interface APICarrierOptions {
    injectables: APICarrierInjectables;
}
export interface APICarrierInjectables {
    base: string;
}
export declare abstract class APICarrier extends Readable {
    protected abstract http: Client;
    injectables: APICarrierInjectables;
    constructor(options: APICarrierOptions);
}
