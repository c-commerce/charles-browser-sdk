import { APICarrier } from '../../../../base'
import Entity, { EntityOptions } from '../../../../entities/_base'
import { BaseError } from '../../../../errors'
import type { Cloud } from '../../../index'

export interface InterverseOrganizationOptions extends EntityOptions {
  rawPayload?: InterverseOrganizationRawPayload
}

export interface InterverseOrganizationRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
}

export interface InterverseOrganizationPayload {
  readonly id?: InterverseOrganizationRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: InterverseOrganizationRawPayload['deleted']
  readonly active?: InterverseOrganizationRawPayload['active']
  readonly name?: InterverseOrganizationRawPayload['name']
}

/**
 * Manage organizations.
 *
 * @category Entity
 */
export class InterverseOrganization extends Entity<InterverseOrganizationPayload, InterverseOrganizationRawPayload> {
  public get entityName (): string {
    return 'interverse_organization'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: InterverseOrganizationOptions
  public initialized: boolean

  public endpoint: string

  public id?: InterverseOrganizationPayload['id']
  public createdAt?: InterverseOrganizationPayload['createdAt']
  public updatedAt?: InterverseOrganizationPayload['updatedAt']
  public deleted?: InterverseOrganizationPayload['deleted']
  public active?: InterverseOrganizationPayload['active']
  public name?: InterverseOrganizationPayload['name']

  constructor (options: InterverseOrganizationOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/interverse/organizations'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: InterverseOrganizationRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name

    return this
  }

  public static create (payload: InterverseOrganizationRawPayload, carrier: Cloud, http: Cloud['http']): InterverseOrganization {
    return new InterverseOrganization({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): InterverseOrganizationRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new InterverseOrganizationInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class InterverseOrganizations {
  public static endpoint: string = 'api/v0/interverse/organizations'
}

export class InterverseOrganizationInitializationError extends BaseError {
  public name = 'InterverseOrganizationInitializationError'
  constructor (public message: string = 'Could not initialize organization.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, InterverseOrganizationInitializationError.prototype)
  }
}

export class InterverseOrganizationFetchRemoteError extends BaseError {
  public name = 'InterverseOrganizationFetchRemoteError'
  constructor (public message: string = 'Could not get interverse organization.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, InterverseOrganizationFetchRemoteError.prototype)
  }
}

export class InterverseOrganizationsFetchRemoteError extends BaseError {
  public name = 'InterverseOrganizationsFetchRemoteError'
  constructor (public message: string = 'Could not get interverse organizations.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, InterverseOrganizationsFetchRemoteError.prototype)
  }
}
