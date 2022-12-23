
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { RealtimeClient } from 'src/realtime'
import { BaseError } from '../../errors'
import { Address } from '../person'

export interface PeopleOrganizationOptions extends UniverseEntityOptions {
  rawPayload?: PeopleOrganizationRawPayload
}

export interface PeopleOrganizationRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly custom_properties?: object
  readonly address?: Address
  readonly is_proxy?: boolean
  readonly proxy_payload?: object
}

export interface PeopleOrganizationPayload {
  readonly id?: PeopleOrganizationRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: PeopleOrganizationRawPayload['deleted']
  readonly active?: PeopleOrganizationRawPayload['active']
  readonly name?: PeopleOrganizationRawPayload['name']
  readonly customProperties?: PeopleOrganizationRawPayload['custom_properties']
  readonly address?: PeopleOrganizationRawPayload['address']
  readonly isProxy?: PeopleOrganizationRawPayload['is_proxy']
  readonly proxyPayload?: PeopleOrganizationRawPayload['proxy_payload']
}

/**
 * Manage people_organizations.
 *
 * @category Entity
 */
export class PeopleOrganization extends UniverseEntity<PeopleOrganizationPayload, PeopleOrganizationRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt: RealtimeClient
  protected options: PeopleOrganizationOptions
  public initialized: boolean

  public endpoint: string

  public id?: PeopleOrganizationPayload['id']
  public createdAt?: PeopleOrganizationPayload['createdAt']
  public updatedAt?: PeopleOrganizationPayload['updatedAt']
  public deleted?: PeopleOrganizationPayload['deleted']
  public active?: PeopleOrganizationPayload['active']
  public name?: PeopleOrganizationPayload['name']
  public customProperties?: PeopleOrganizationPayload['customProperties']
  public address?: PeopleOrganizationPayload['address']
  public isProxy?: PeopleOrganizationPayload['isProxy']
  public proxyPayload?: PeopleOrganizationPayload['proxyPayload']

  constructor (options: PeopleOrganizationOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/people_organizations'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.mqtt = options.mqtt

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PeopleOrganizationRawPayload): PeopleOrganization {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.customProperties = rawPayload.custom_properties
    this.address = rawPayload.address
    this.isProxy = rawPayload.is_proxy
    this.proxyPayload = rawPayload.proxy_payload

    return this
  }

  public static create (payload: PeopleOrganizationRawPayload, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): PeopleOrganization {
    return new PeopleOrganization({ rawPayload: payload, universe, http, mqtt, initialized: true })
  }

  public static createUninitialized (
    payload: PeopleOrganizationRawPayload,
    universe: Universe,
    http: Universe['http'],
    mqtt: RealtimeClient
  ): PeopleOrganization {
    return new PeopleOrganization({ rawPayload: payload, universe, http, mqtt, initialized: false })
  }

  public serialize (): PeopleOrganizationRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      custom_properties: this.customProperties,
      address: this.address,
      is_proxy: this.isProxy,
      proxy_payload: this.proxyPayload
    }
  }

  public async init (): Promise<PeopleOrganization | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new PeopleOrganizationInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PeopleOrganizations {
  public static endpoint: string = 'api/v0/people_organizations'
}

export class PeopleOrganizationInitializationError extends BaseError {
  public name = 'PeopleOrganizationInitializationError'
  constructor (public message: string = 'Could not initialize people_organization.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PeopleOrganizationInitializationError.prototype)
  }
}

export class PeopleOrganizationFetchRemoteError extends BaseError {
  public name = 'PeopleOrganizationFetchRemoteError'
  constructor (public message: string = 'Could not get people_organization.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PeopleOrganizationFetchRemoteError.prototype)
  }
}

export class PeopleOrganizationsFetchRemoteError extends BaseError {
  public name = 'PeopleOrganizationsFetchRemoteError'
  constructor (public message: string = 'Could not get people_organizations.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PeopleOrganizationsFetchRemoteError.prototype)
  }
}
