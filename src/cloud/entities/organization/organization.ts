import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import type { Cloud } from '../../index'

export interface OrganizationOptions extends EntityOptions {
  rawPayload?: OrganizationRawPayload
}

export interface OrganizationRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly status?: string
  readonly verified?: boolean
  readonly owner?: string
}

export interface OrganizationPayload {
  readonly id?: OrganizationRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: OrganizationRawPayload['deleted']
  readonly active?: OrganizationRawPayload['active']
  readonly name?: OrganizationRawPayload['name']
  readonly status?: OrganizationRawPayload['status']
  readonly verified?: OrganizationRawPayload['verified']
  readonly owner?: OrganizationRawPayload['owner']
}

/**
 * Manage organizations.
 *
 * @category Entity
 */
export class Organization extends Entity<OrganizationPayload, OrganizationRawPayload> {
  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: OrganizationOptions
  public initialized: boolean

  public endpoint: string

  public id?: OrganizationPayload['id']
  public createdAt?: OrganizationPayload['createdAt']
  public updatedAt?: OrganizationPayload['updatedAt']
  public deleted?: OrganizationPayload['deleted']
  public active?: OrganizationPayload['active']
  public name?: OrganizationPayload['name']
  public status?: OrganizationPayload['status']
  public verified?: OrganizationPayload['verified']
  public owner?: OrganizationPayload['owner']

  constructor (options: OrganizationOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/organizations'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: OrganizationRawPayload): Organization {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.status = rawPayload.status
    this.verified = rawPayload.verified
    this.owner = rawPayload.owner

    return this
  }

  public static create (payload: OrganizationRawPayload, carrier: Cloud, http: Cloud['http']): Organization {
    return new Organization({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): OrganizationRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      status: this.status,
      verified: this.verified,
      owner: this.owner
    }
  }

  public async init (): Promise<Organization | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new OrganizationInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Organizations {
  public static endpoint: string = 'api/v0/organizations'
}

export class OrganizationInitializationError extends BaseError {
  public name = 'OrganizationInitializationError'
  constructor (public message: string = 'Could not initialize organization.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, OrganizationInitializationError.prototype)
  }
}

export class OrganizationFetchRemoteError extends BaseError {
  public name = 'OrganizationFetchRemoteError'
  constructor (public message: string = 'Could not get organization.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, OrganizationFetchRemoteError.prototype)
  }
}

export class OrganizationsFetchRemoteError extends BaseError {
  public name = 'OrganizationsFetchRemoteError'
  constructor (public message: string = 'Could not get organizations.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, OrganizationsFetchRemoteError.prototype)
  }
}
