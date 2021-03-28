import qs from 'qs'
import { CloudHealth, CloudStatus } from './status'
import { Client } from '../client'
import { APICarrier } from '../base'
import * as realtime from '../realtime'
import { BaseError } from '../errors'

import { EntityFetchOptions, EntityFetchQuery } from '../entities/_base'

// hygen:import:injection -  Please, don't delete this line: when running the cli for crud resources the new routes will be automatically added here.

export interface CloudUser {
  id?: string
  accessToken?: string
}

export interface CloudOptions {
  /**
   * The override of the cloud base URL. It overrides the above mentioned computation.
   */
  cloudBase?: string

  http: Client

  /**
   * The user ID of a charles user that is available inside.
   */
  user: CloudUser
}

export interface ApiRequestOptions {
  method: string
  path: string
  data?: object
  query?: EntityFetchQuery
}

export interface CloudFetchQuery {
  [key: string]: any
}

export interface CloudFetchOptions {
  raw?: boolean
  query?: CloudFetchQuery
}

export declare interface Cloud {
  on: ((event: 'raw-error' | 'error', cb: (error: Error) => void) => this) & ((event:
  | string,
    cb: Function) => this)
}

export class CloudUnauthenticatedError extends BaseError {
  public name = 'CloudUnauthenticatedError'
  constructor (public message: string = 'Invalid or expired session.', properties?: any) {
    super(message, properties)

    Object.setPrototypeOf(this, CloudUnauthenticatedError.prototype)
  }
}

export class CloudMeError extends BaseError {
  public name = 'CloudMeError'
  constructor (public message: string = 'Unexptected error fetching me data', properties?: any) {
    super(message, properties)

    Object.setPrototypeOf(this, CloudMeError.prototype)
  }
}

export interface CloudMeData {
  user: {
    email: string
    /**
     * user id
     */
    sub: string
    authenticated: boolean
  }
  permissions: CloudPermissionType[]
  roles: CloudPermissionType[]
}

export interface CloudErrors {
  CloudUnauthenticatedError: new () => CloudUnauthenticatedError
  CloudMeError: new () => CloudMeError
}

export type CloudPermissionType =
  | 'admin'

export type CloudRoleType =
  | 'admin'

interface BaseResourceCreateable<T, K> {
  new(...args: any[]): T
  create: (payload: K, cloud: Cloud, http: Cloud['http']) => T
}

interface BaseResourceList<T> {
  endpoint: string
  new(...args: any[]): T
}

type BaseResourceErrorProto<E> = new(...args: any[]) => E

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type BaseResourceEntityFetchOptions<O> = EntityFetchOptions

/**
 * The unsiverse is usually the base entitiy one wants to build upon. Consider it a project, product
 * or namespace for data.
 *
 * It also allows easy access to remote states of entities, such as:
 *
 * ```js
 * await cloud.universes.fetch()
 * ```
 *
 *
 * @category Cloud
 */
export class Cloud extends APICarrier {
  public status: CloudStatus
  public health: CloudHealth
  public options: CloudOptions

  public initialized = false
  public user: CloudUser

  protected http: Client
  private readonly mqtt: realtime.RealtimeClient | null = null
  public cloudBase: string
  private static readonly endpoint: string = 'api/v0'
  private _cachedMeData?: CloudMeData

  public constructor (options: CloudOptions) {
    super({
      injectables: {
        base: options.cloudBase
      }
    })

    this.options = options
    this.user = options.user
    this.cloudBase = options.cloudBase ?? 'https://staging-3.hello-charles.com'

    this.status = new CloudStatus({ universe: this })
    this.health = new CloudHealth({ universe: this })
    this.http = options.http

    return this
  }

  public async init (): Promise<Cloud | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.cloudBase}/${Cloud.endpoint}/self`)

      this.setInitialized(res.data.data[0])

      return this
    } catch (err) {
      throw new CloudInitializationError(undefined, { error: err })
    }
  }

  public static get errors (): CloudErrors {
    return {
      CloudUnauthenticatedError,
      CloudMeError
    }
  }

  public get errors (): CloudErrors {
    return Cloud.errors
  }

  private setInitialized (payload: any): Cloud {
    this.initialized = true
    return this
  }

  /**
   * In order to notify backends about the universe leaving we will try to
   * unsubscripe from topics before destroying. In any case all event handlers are gone
   * immediately.
   *
   */
  public deinitialize (): void {
    this.removeAllListeners()
  }

  public get ready (): boolean {
    // TODO: implement
    return false
  }

  public isReady (): boolean {
    // TODO: implement
    return false
  }

  public get connected (): boolean {
    // TODO: implement
    return false
  }

  public isConnected (): boolean {
    // TODO: implement
    return false
  }

  private handleError (err: Error): void {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }

  private baseResourceFactory<T, K>(proto: BaseResourceCreateable<T, K>, payload: K): T {
    return proto.create(payload, this, this.http)
  }

  public feed (payload: CloudUniverseRawPayload): CloudUniverse {
    return CloudUniverse.create(payload, this, this.http)
  }

  // hygen:factory:injection -  Please, don't delete this line: when running the cli for crud resources the new routes will be automatically added here.

  /**
   * Make requests on unimplemented API resources
   *
   * @param options
   */
  public async apiRequest (options: ApiRequestOptions): Promise<{ [key: string]: any } | Array<{ [key: string]: any } | undefined>> {
    const opts = {
      method: options.method,
      path: `${options.path}${options.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
      data: options.data ?? undefined
    }

    try {
      const res = await this.http.getClient()(opts)

      return res.data.data
    } catch (err) {
      throw new CloudApiRequestError(undefined, { error: err })
    }
  }

  private setCachedMeData (data?: CloudMeData | null): Cloud {
    if (!data) {
      this._cachedMeData = undefined
    } else {
      this._cachedMeData = Object.assign({}, data)
    }

    return this
  }

  public get authData (): { me?: CloudMeData } {
    return {
      me: this._cachedMeData
    }
  }

  public async makeBaseResourceListRequest<T, TL, K, O, E>(proto: BaseResourceCreateable<T, K>, listProto: BaseResourceList<TL>, errorProto: BaseResourceErrorProto<E>, options?: BaseResourceEntityFetchOptions<O>): Promise<T[] | K[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.cloudBase}/${listProto.endpoint}`, {
        params: {
          ...(options?.query ?? {})
        }
      })
      const resources = res.data.data as K[]

      if (options && options.raw === true) {
        return resources
      }

      return resources.map((resource: K) => {
        return proto.create(resource, this, this.http)
      })
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal,new-cap
      throw new errorProto(undefined, { error: err })
    }
  }

  // hygen:handler:injection -  Please, don't delete this line: when running the cli for crud resources the new routes will be automatically added here.

  public async versions (): Promise<{ multiverse: string } | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.cloudBase}/api/versions`)

      return {
        multiverse: res.data?.multiverse
      }
    } catch (err) {
      throw new CloudVersionsError(undefined, { error: err })
    }
  }

  public async healthz (): Promise<{ message: string } | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.cloudBase}/api/healthz`)

      return {
        message: res.data?.msg
      }
    } catch (err) {
      throw new CloudHealthzError(undefined, { error: err })
    }
  }
}

export class CloudSingleton extends Cloud {
  private static instance: Cloud

  static getInstance (options: CloudOptions): Cloud {
    if (!CloudSingleton.instance) {
      CloudSingleton.instance = new CloudSingleton(options)
    }

    return CloudSingleton.instance
  }

  static clearInstance (): void {
    CloudSingleton.instance.deinitialize()
  }
}

export class CloudInitializationError extends BaseError {
  public name = 'CloudInitializationError'
  constructor (public message: string = 'Could not initialize cloud.', properties?: any) {
    super(message, properties)
  }
}

export class CloudApiRequestError extends BaseError {
  public name = 'CloudApiRequestError'
  constructor (public message: string = 'Unexptected error making api request.', properties?: any) {
    super(message, properties)

    Object.setPrototypeOf(this, CloudApiRequestError.prototype)
  }
}

export class CloudVersionsError extends BaseError {
  public name = 'CloudVersionsError'
  constructor (public message: string = 'Unexptected response making versions request.', properties?: any) {
    super(message, properties)

    Object.setPrototypeOf(this, CloudVersionsError.prototype)
  }
}

export class CloudSelfError extends BaseError {
  public name = 'CloudSelfError'
  constructor (public message: string = 'Unexptected response making self request.', properties?: any) {
    super(message, properties)

    Object.setPrototypeOf(this, CloudSelfError.prototype)
  }
}

export class CloudHealthzError extends BaseError {
  public name = 'CloudHealthzError'
  constructor (public message: string = 'Unexptected response making health request.', properties?: any) {
    super(message, properties)

    Object.setPrototypeOf(this, CloudHealthzError.prototype)
  }
}
