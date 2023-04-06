import qs from 'qs'
import { CloudHealth, CloudStatus } from './status'
import { Client } from '../client'
import { APICarrier } from '../base'
import * as realtime from '../realtime'
import { BaseError } from '../errors'

import { EntityFetchOptions, EntityFetchQuery } from '../entities/_base'
import * as universe from './entities/universe'
import * as universeUser from './entities/user'
import * as organization from './entities/organization'
import * as universesPool from './entities/universes-pool'
import * as universesWaba from './entities/universes-waba'
import * as universesWabasPhonenumber from './entities/universes-wabas-phonenumber'
import * as products from './entities/products'
import * as releases from './entities/releases'
import * as interverseOrganization from './entities/interverse/organization'
import * as domain from './entities/interverse/domain'
import * as apiKey from './entities/interverse/api-key'

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

export interface MeData {
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
  // staff: staff.StaffRawPayload
}

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
 * The cloud is a base entitiy one wants to build upon in regards of managing multiple universes.
 * Consider it the top level organizational space for all universes and their services.
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
        base: options.cloudBase ?? 'https://staging-3.hello-charles.com'
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
      this.setInitialized(null)

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

  public universe (payload: universe.CloudUniverseRawPayload): universe.CloudUniverse {
    return universe.CloudUniverse.create(payload, this, this.http)
  }

  public universeUser (payload: universeUser.UniverseUserRawPayload): universeUser.UniverseUser {
    return universeUser.UniverseUser.create(payload, this, this.http)
  }

  public organization (payload: organization.OrganizationRawPayload): organization.Organization {
    return organization.Organization.create(payload, this, this.http)
  }

  public universePool (payload: universesPool.UniversesPoolRawPayload): universesPool.UniversesPool {
    return universesPool.UniversesPool.create(payload, this, this.http)
  }

  public universesWaba (payload: universesWaba.CloudUniversesWabaRawPayload): universesWaba.CloudUniversesWaba {
    return universesWaba.CloudUniversesWaba.create(payload, this, this.http)
  }

  public universesWabasPhonenumber (payload: universesWabasPhonenumber.CloudUniversesWabasPhonenumberRawPayload): universesWabasPhonenumber.CloudUniversesWabasPhonenumber {
    return universesWabasPhonenumber.CloudUniversesWabasPhonenumber.create(payload, this, this.http)
  }

  public product (payload: products.ProductRawPayload): products.Product {
    return products.Product.create(payload, this, this.http)
  }

  public release (payload: releases.ReleaseRawPayload): releases.Release {
    return releases.Release.create(payload, this, this.http)
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

  /**
   * Fetch the data of the current user. If you receive an instane of UniverseUnauthenticatedError
   * you should logout the current session and create a new one.
   */
  public async me (): Promise<MeData | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.cloudBase}/api/v0/me`
      }

      const response = await this.http.getClient()(opts)

      this.setCachedMeData(response.data.data)

      return response.data.data
    } catch (err: any) {
      if (err?.response?.status === 401) {
        throw new CloudUnauthenticatedError(undefined, { error: err })
      }

      throw new CloudMeError(undefined, { error: err })
    }
  }

  public async makeBaseResourceListRequest<T, TL, K, O, E>(proto: BaseResourceCreateable<T, K>, listProto: BaseResourceList<TL>, errorProto: BaseResourceErrorProto<E>, options?: BaseResourceEntityFetchOptions<O>): Promise<T[] | K[] | undefined> {
    try {
      const endpoint = options?.endpoint ?? listProto.endpoint
      const res = await this.http.getClient().get(`${this.cloudBase}/${endpoint}`, {
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

  public interverse = {
    organizations: async (options?: EntityFetchOptions): Promise<interverseOrganization.InterverseOrganization[] | interverseOrganization.InterverseOrganizationRawPayload[] | undefined> => {
      return await this.makeBaseResourceListRequest<interverseOrganization.InterverseOrganization, interverseOrganization.InterverseOrganizations, interverseOrganization.InterverseOrganizationRawPayload, EntityFetchOptions, interverseOrganization.InterverseOrganizationsFetchRemoteError>(interverseOrganization.InterverseOrganization, interverseOrganization.InterverseOrganizations, interverseOrganization.InterverseOrganizationsFetchRemoteError, options)
    },
    organization: (payload: interverseOrganization.InterverseOrganizationRawPayload): interverseOrganization.InterverseOrganization => {
      return interverseOrganization.InterverseOrganization.create(payload, this, this.http)
    },
    apiKeys: async (options?: EntityFetchOptions): Promise<apiKey.ApiKey[] | apiKey.ApiKeyRawPayload[] | undefined> => {
      return await this.makeBaseResourceListRequest<apiKey.ApiKey, apiKey.ApiKeys, apiKey.ApiKeyRawPayload, EntityFetchOptions, apiKey.ApiKeyFetchRemoteError>(apiKey.ApiKey, apiKey.ApiKeys, apiKey.ApiKeysFetchRemoteError, options)
    },
    apiKey: (payload: apiKey.ApiKeyRawPayload): apiKey.ApiKey => {
      return apiKey.ApiKey.create(payload, this, this.http)
    },
    domains: async (options?: EntityFetchOptions): Promise<domain.Domain[] | domain.DomainRawPayload[] | undefined> => {
      return await this.makeBaseResourceListRequest<domain.Domain, domain.Domains, domain.DomainRawPayload, EntityFetchOptions, domain.DomainFetchRemoteError>(domain.Domain, domain.Domains, domain.DomainsFetchRemoteError, options)
    },
    domain: (payload: domain.DomainRawPayload): domain.Domain => {
      return domain.Domain.create(payload, this, this.http)
    }
  }

  public async universes (options?: EntityFetchOptions): Promise<universe.CloudUniverse[] | universe.CloudUniverseRawPayload[] | undefined> {
    return await this.makeBaseResourceListRequest<universe.CloudUniverse, universe.CloudUniverses, universe.CloudUniverseRawPayload, EntityFetchOptions, universe.CloudUniversesFetchRemoteError>(universe.CloudUniverse, universe.CloudUniverses, universe.CloudUniversesFetchRemoteError, options)
  }

  public async universeUsers (options?: EntityFetchOptions): Promise<universeUser.UniverseUser[] | universeUser.UniverseUserRawPayload[] | undefined> {
    return await this.makeBaseResourceListRequest<universeUser.UniverseUser, universeUser.UniverseUsers, universeUser.UniverseUserRawPayload, EntityFetchOptions, universeUser.UniverseUsersFetchRemoteError>(universeUser.UniverseUser, universeUser.UniverseUsers, universeUser.UniverseUsersFetchRemoteError, options)
  }

  public async organizations (options?: EntityFetchOptions): Promise<organization.Organization[] | organization.OrganizationRawPayload[] | undefined> {
    return await this.makeBaseResourceListRequest<organization.Organization, organization.Organizations, organization.OrganizationRawPayload, EntityFetchOptions, organization.OrganizationsFetchRemoteError>(organization.Organization, organization.Organizations, organization.OrganizationsFetchRemoteError, options)
  }

  public async universesPools (options?: EntityFetchOptions): Promise<universesPool.UniversesPool[] | universesPool.UniversesPoolRawPayload[] | undefined> {
    return await this.makeBaseResourceListRequest<universesPool.UniversesPool, universesPool.UniversesPools, universesPool.UniversesPoolRawPayload, EntityFetchOptions, universesPool.UniversesPoolsFetchRemoteError>(universesPool.UniversesPool, universesPool.UniversesPools, universesPool.UniversesPoolsFetchRemoteError, options)
  }

  public async universesWabas (options?: EntityFetchOptions): Promise<universesWaba.CloudUniversesWaba[] | universesWaba.CloudUniversesWabaRawPayload[] | undefined> {
    return await this.makeBaseResourceListRequest<universesWaba.CloudUniversesWaba, universesWaba.CloudUniversesWabas, universesWaba.CloudUniversesWabaRawPayload, EntityFetchOptions, universesWaba.CloudUniversesWabasFetchRemoteError>(universesWaba.CloudUniversesWaba, universesWaba.CloudUniversesWabas, universesWaba.CloudUniversesWabasFetchRemoteError, options)
  }

  public async universesWabasPhonenumbers (options?: EntityFetchOptions): Promise<universesWabasPhonenumber.CloudUniversesWabasPhonenumber[] | universesWabasPhonenumber.CloudUniversesWabasPhonenumberRawPayload[] | undefined> {
    return await this.makeBaseResourceListRequest<universesWabasPhonenumber.CloudUniversesWabasPhonenumber, universesWabasPhonenumber.CloudUniversesWabasPhonenumbers, universesWabasPhonenumber.CloudUniversesWabasPhonenumberRawPayload, EntityFetchOptions, universesWabasPhonenumber.CloudUniversesWabasPhonenumbersFetchRemoteError>(universesWabasPhonenumber.CloudUniversesWabasPhonenumber, universesWabasPhonenumber.CloudUniversesWabasPhonenumbers, universesWabasPhonenumber.CloudUniversesWabasPhonenumbersFetchRemoteError, options)
  }

  public async products (options?: EntityFetchOptions): Promise<products.Product[] | products.ProductRawPayload[] | undefined> {
    return await this.makeBaseResourceListRequest<products.Product, products.Products, products.ProductRawPayload, EntityFetchOptions, products.ProductsFetchRemoteError>(products.Product, products.Products, products.ProductsFetchRemoteError, options)
  }

  public async releases (options?: EntityFetchOptions): Promise<releases.Release[] | releases.ReleaseRawPayload[] | undefined> {
    return await this.makeBaseResourceListRequest<releases.Release, releases.Releases, releases.ReleaseRawPayload, EntityFetchOptions, releases.ReleasesFetchRemoteError>(releases.Release, releases.Releases, releases.ReleasesFetchRemoteError, options)
  }

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
