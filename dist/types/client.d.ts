import { AxiosInstance } from 'axios';
export interface ClientOptions {
    withCredentials?: boolean;
    base?: string;
    timeout?: number;
    headers?: {
        [key: string]: any;
    };
    token?: string;
    responseInterceptors?: Function[];
    requestInterceptors?: Function[];
}
export declare class Client {
    private readonly options;
    private static instance;
    private readonly axiosInstance;
    private responseInterceptorIds;
    private requestInterceptorIds;
    private constructor();
    getDefaultHeaders(): object;
    static getInstance(options: ClientOptions): Client;
    static clearInstance(): void;
    getClient(): AxiosInstance;
    setDefaults(options: ClientOptions): Client;
    clearDefaults(): void;
}
