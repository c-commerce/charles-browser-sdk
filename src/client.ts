import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios'

import { environment } from './environment'

export interface ClientOptions {
  withCredentials?: boolean
  base?: string
  timeout?: number
  headers?: {
    [key: string]: any
  }
  token?: string
  responseInterceptors?: Function[]
  requestInterceptors?: Function[]
}

const defaultHeaders = {
  'X-Client-Type': 'Charles SDK JavaScript',
  'X-Client-Version': environment.VERSION,
  Accept: 'application/json; charset=utf-8'
}

export interface HTTPClientRequestConfig extends Omit<AxiosRequestConfig, 'method' | 'responseType'> {
  method: AxiosRequestConfig['method'] | string
  responseType?: AxiosRequestConfig['responseType'] | string
}

export type HTTPClientPromise = AxiosPromise

export interface HTTPClient extends AxiosInstance {
  (config: HTTPClientRequestConfig): HTTPClientPromise
}

/**
 * The Charles HTTP client is an axios instance that carries the state of of Authentication
 * in - if default headers have been set - has Authorization header.
 *
 * Since this class is a singleton we are destroying state internally through `.clearInstance()`.
 */
export class Client {
  private readonly options: ClientOptions
  private static instance: Client
  private readonly axiosInstance: HTTPClient
  private responseInterceptorIds: number[] = []
  private requestInterceptorIds: number[] = []

  private constructor (options: ClientOptions) {
    this.options = options
    this.axiosInstance = axios.create({
      withCredentials: this.options.withCredentials ?? undefined,
      // baseURL: options.base || 'https://api.hello-charles.com',
      timeout: options.timeout ?? 10000,
      headers: {
        ...options.headers,
        ...defaultHeaders
      }
    }) as HTTPClient
  }

  public getDefaultHeaders (): object {
    return {
      ...this.options.headers,
      ...defaultHeaders
    }
  }

  static getInstance (options: ClientOptions): Client {
    // use headers in any case
    if (Client.instance) {
      Client.instance.setDefaults(options)
    }

    if (!Client.instance) {
      Client.instance = new Client(options)
      // ... any one time initialization goes here ...
    }

    return Client.instance
  }

  static clearInstance (): void {
    Client.instance.clearDefaults()
  }

  public getClient (): HTTPClient {
    return Client.instance.axiosInstance
  }

  setDefaults (options: ClientOptions): Client {
    Client.instance.axiosInstance.defaults.headers.common = {
      ...this.axiosInstance.defaults.headers.common,
      ...options.headers
    }

    Client.instance.axiosInstance.defaults.headers = {
      ...this.axiosInstance.defaults.headers,
      ...options.headers
    }

    // NOTE not sure if this is the correct place to inject the interceptors, but it's the most reliable
    if (options.responseInterceptors?.length) {
      // remove previous interceptors
      this.responseInterceptorIds.forEach(id => Client.instance.axiosInstance.interceptors.response.eject(id))

      this.responseInterceptorIds = options.responseInterceptors.map((interceptor: Function) => {
        // first arg is on success, but we want to only listen for errors
        return Client.instance.axiosInstance.interceptors.response.use(undefined, interceptor as (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>)
      })
    }

    if (options.requestInterceptors?.length) {
      this.requestInterceptorIds.forEach(id => Client.instance.axiosInstance.interceptors.request.eject(id))

      this.requestInterceptorIds = options.requestInterceptors.map((interceptor: Function) => {
        return Client.instance.axiosInstance.interceptors.request.use(interceptor as (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>, undefined)
      })
    }

    return Client.instance
  }

  clearDefaults (): void {
    Client.instance.axiosInstance.defaults.headers.common.Authorization = undefined
    Client.instance.axiosInstance.defaults.headers.Authorization = undefined
    Client.instance.axiosInstance.defaults.headers.common = {
      ...defaultHeaders
    }
  }
}
