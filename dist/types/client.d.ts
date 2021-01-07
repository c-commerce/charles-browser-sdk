import { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
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
export interface HTTPClientRequestConfig extends Omit<AxiosRequestConfig, 'method' | 'responseType'> {
    method: AxiosRequestConfig['method'] | string;
    responseType?: AxiosRequestConfig['responseType'] | string;
}
export declare type HTTPClientPromise = AxiosPromise;
export interface HTTPClient extends AxiosInstance {
    (config: HTTPClientRequestConfig): HTTPClientPromise;
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
    getClient(): HTTPClient;
    setDefaults(options: ClientOptions): Client;
    clearDefaults(): void;
}
