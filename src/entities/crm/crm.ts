
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface CRMOptions extends EntityOptions {
  rawPayload?: CRMRawPayload
}

export interface CRMRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly uri?: string
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string | any
  readonly configuration?: object | any
  readonly integration_configuration?: string | any
  readonly is_set_up?: boolean
  readonly metadata?: object | any
  readonly labels?: object | any
}

export interface CRMPayload {
  readonly id?: CRMRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: CRMRawPayload['deleted']
  readonly active?: CRMRawPayload['active']
  readonly name?: CRMRawPayload['name']
  readonly uri?: CRMRawPayload['uri']
  readonly isProxy?: CRMRawPayload['is_proxy']
  readonly proxyVendor?: CRMRawPayload['proxy_vendor']
  readonly configuration?: CRMRawPayload['configuration']
  readonly integrationConfiguration?: CRMRawPayload['integration_configuration']
  readonly isSetUp?: CRMRawPayload['is_set_up']
  readonly metadata?: CRMRawPayload['metadata']
  readonly labels?: CRMRawPayload['labels']
}

/**
 * Manage crms.
 *
 * @category Entity
 */
export class CRM extends Entity<CRMPayload, CRMRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: CRMOptions
  public initialized: boolean

  public endpoint: string

  public id?: CRMPayload['id']
  public createdAt?: CRMPayload['createdAt']
  public updatedAt?: CRMPayload['updatedAt']
  public deleted?: CRMPayload['deleted']
  public active?: CRMPayload['active']
  public name?: CRMPayload['name']
  public uri?: CRMPayload['uri']
  public isProxy?: CRMPayload['isProxy']
  public proxyVendor?: CRMPayload['proxyVendor']
  public configuration?: CRMPayload['configuration']
  public integrationConfiguration?: CRMPayload['integrationConfiguration']
  public isSetUp?: CRMPayload['isSetUp']
  public metadata?: CRMPayload['metadata']
  public labels?: CRMPayload['labels']

  constructor (options: CRMOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/crms'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CRMRawPayload): CRM {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.uri = rawPayload.uri
    this.isProxy = rawPayload.is_proxy
    this.proxyVendor = rawPayload.proxy_vendor
    this.configuration = rawPayload.configuration
    this.integrationConfiguration = rawPayload.integration_configuration
    this.isSetUp = rawPayload.is_set_up
    this.metadata = rawPayload.metadata
    this.labels = rawPayload.labels

    return this
  }

  public static create (payload: CRMRawPayload, universe: Universe, http: Universe['http']): CRM {
    return new CRM({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): CRMRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      uri: this.uri,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      configuration: this.configuration,
      integration_configuration: this.integrationConfiguration,
      is_set_up: this.isSetUp,
      metadata: this.metadata,
      labels: this.labels
    }
  }

  public async init (): Promise<CRM | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new CRMInitializationError(undefined, { error: err }))
    }
  }

  public async syncCustomProperties (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM syncCustomProperties requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/custom_properties`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMSyncCustomPropertiesRemoteError(undefined, { error: err }))
    }
  }

  public async syncDeals (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM syncDeals requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/deals`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMSyncDealsRemoteError(undefined, { error: err }))
    }
  }

  public async syncChannelUsers (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM syncChannelUsers requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/channel_users`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMSyncChannelUsersRemoteError(undefined, { error: err }))
    }
  }

  public async syncPipelines (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM syncPipelines requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/pipelines`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMSyncPipelinesRemoteError(undefined, { error: err }))
    }
  }

  public async setup (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM setup requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/setup`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMSetupRemoteError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CRMs {
  public static endpoint: string = 'api/v0/crms'
}

export class CRMInitializationError extends BaseError {
  public name = 'CRMInitializationError'
  constructor (public message: string = 'Could not initialize crm.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMInitializationError.prototype)
  }
}

export class CRMFetchRemoteError extends BaseError {
  public name = 'CRMFetchRemoteError'
  constructor (public message: string = 'Could not get crm.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMFetchRemoteError.prototype)
  }
}

export class CRMsFetchRemoteError extends BaseError {
  public name = 'CRMsFetchRemoteError'
  constructor (public message: string = 'Could not get crms.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMsFetchRemoteError.prototype)
  }
}

export class CRMSyncCustomPropertiesRemoteError extends BaseError {
  public name = 'CRMSyncCustomPropertiesRemoteError'
  constructor (public message: string = 'Could not start sync of crms\' custom properties.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMSyncCustomPropertiesRemoteError.prototype)
  }
}

export class CRMSyncDealsRemoteError extends BaseError {
  public name = 'CRMSyncDealsRemoteError'
  constructor (public message: string = 'Could not start sync of crm deals.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMSyncDealsRemoteError.prototype)
  }
}

export class CRMSyncPipelinesRemoteError extends BaseError {
  public name = 'CRMSyncPipelinesRemoteError'
  constructor (public message: string = 'Could not start sync of crm pipelines.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMSyncPipelinesRemoteError.prototype)
  }
}

export class CRMSyncChannelUsersRemoteError extends BaseError {
  public name = 'CRMSyncChannelUsersRemoteError'
  constructor (public message: string = 'Could not start sync of crm chanel users.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMSyncChannelUsersRemoteError.prototype)
  }
}

export class CRMSetupRemoteError extends BaseError {
  public name = 'CRMSetupRemoteError'
  constructor (public message: string = 'Could not start setup of crm.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMSetupRemoteError.prototype)
  }
}
