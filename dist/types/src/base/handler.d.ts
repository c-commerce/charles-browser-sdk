import { Client } from '../client';
export interface CharlesBaseHandlerOptions {
    endpoint: string;
    base: string;
}
export interface CharlesBaseHandlerUriOptions {
    endpoint: string;
    query?: {
        [key: string]: any;
    };
    params?: string[];
}
export declare class CharlesBaseHandler {
    private readonly handlerOptions;
    private readonly client;
    constructor(http: Client, handlerOptions: CharlesBaseHandlerOptions);
    getURI(options: CharlesBaseHandlerUriOptions): string;
}
