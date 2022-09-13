
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import qs from 'qs'
import {
  AssociateUsersPayload,
  CrmUser,
  PersonPayload
} from '../../entities/crm/crm-user'

export interface CRMOptions extends UniverseEntityOptions {
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
export class CRM extends UniverseEntity<CRMPayload, CRMRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
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
    this.apiCarrier = options.universe
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

  public async syncOrganizations (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM syncOrganizations requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/people_organizations`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMSyncOrganizationsRemoteError(undefined, { error: err }))
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

  public async syncUsers (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM syncUsers requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/users`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMSyncUsersRemoteError(undefined, { error: err }))
    }
  }

  public async getCrmUsers (options?: EntityFetchOptions): Promise<CrmUser[]> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM getCrmUsers requires id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/users${qs.stringify(options?.query ?? {}, { addQueryPrefix: true })}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.data.data
    } catch (err) {
      throw this.handleError(new CRMFetchUsersRemoteError(undefined, { error: err }))
    }
  }

  public async associateUsers (payload: AssociateUsersPayload[], options?: object): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM associateUsers requires id to be set.')

    const data = {
      options,
      payload: payload.map(item => ({
        external_user_reference_id: item.externalUserReferenceId,
        staff_id: item.staffId
      }))
    }

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/users/associate`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        data,
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMAssociateUsersError(undefined, { error: err }))
    }
  }

  public async createExternalUserFromPerson (payload: PersonPayload): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('CRM createExternalUserFromPerson requires id to be set.')

    const data = {
      person: payload.person
    }

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/create_external_user_from_person`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        data,
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new CRMCreateExternalUserFromPersonError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CRMs {
  public static endpoint: string = 'api/v0/crms'
}

// Init and setup error handlers
export class CRMInitializationError extends BaseError {
  public name = 'CRMInitializationError'
  constructor (public message: string = 'Could not initialize crm.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMInitializationError.prototype)
  }
}

export class CRMSetupRemoteError extends BaseError {
  public name = 'CRMSetupRemoteError'
  constructor (public message: string = 'Could not start setup of crm.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMSetupRemoteError.prototype)
  }
}

export class CRMCreateExternalUserFromPersonError extends BaseError {
  public name = 'CRMCreateExternalUserFromPersonError'
  constructor (public message: string = 'Could not create user.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMAssociateUsersError.prototype)
  }
}

export class CRMAssociateUsersError extends BaseError {
  public name = 'CRMAssociateUsersError'
  constructor (public message: string = 'Could not associate users.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMAssociateUsersError.prototype)
  }
}

// Fetch remote error handlers
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

export class CRMFetchUsersRemoteError extends BaseError {
  public name = 'CRMFetchUsersRemoteError'
  constructor (public message: string = 'Could not get users.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMFetchUsersRemoteError.prototype)
  }
}

// Sync remote error handlers
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

export class CRMSyncOrganizationsRemoteError extends BaseError {
  public name = 'CRMSyncOrganizationsRemoteError'
  constructor (public message: string = 'Could not start remote org sync.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMSyncOrganizationsRemoteError.prototype)
  }
}

export class CRMSyncUsersRemoteError extends BaseError {
  public name = 'CRMSyncUsersRemoteError'
  constructor (public message: string = 'Could not start sync of users.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CRMSyncUsersRemoteError)
  }
}
