import { Client } from '../client';
import { BaseError } from '../errors/base-error';
import { CharlesBaseHandler } from '../base/index';
export interface MessagesOptions {
    user?: string;
    base?: string;
    universe: string;
}
export interface MessagesQueryOptions {
    read?: boolean;
    ignored?: boolean;
    min_updated_at?: string;
}
export interface MessagesResponse {
    data: Message[];
    metadata: object;
}
export interface Message {
    message?: string;
    consumer_type?: string;
    channel?: string;
    level?: string;
    type?: string;
    payload?: object;
    metadata?: object;
    ignorable?: boolean;
    ignored?: boolean;
    read?: boolean;
    read_at?: string;
    deleted?: boolean;
    progress?: object;
    client_account?: string;
}
export declare class Messages extends CharlesBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    universe: string;
    http: Client;
    options: MessagesOptions;
    constructor(options: MessagesOptions, http: Client);
    getAll(query?: MessagesQueryOptions | undefined): Promise<MessagesResponse>;
    update(messageId: string, messageRequest: Message): Promise<MessagesResponse>;
}
export declare class MessageUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class MessagesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
