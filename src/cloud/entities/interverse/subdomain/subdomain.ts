import { APICarrier } from '../../../../base'
import Entity, { EntityOptions } from '../../../../entities/_base'
import { BaseError } from '../../../../errors'
import type { Cloud } from '../../../index'

export interface SubdomainOptions extends EntityOptions {
  rawPayload?: SubdomainRawPayload
}

export interface SubdomainRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly subdomain?: string
}

export interface SubdomainPayload {
  readonly id?: SubdomainRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: SubdomainRawPayload['deleted']
  readonly active?: SubdomainRawPayload['active']
  readonly subdomain?: SubdomainRawPayload['subdomain']
}

/**
 * @category Entity
 */
export class Subdomain extends Entity<SubdomainPayload, SubdomainRawPayload> {
  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: SubdomainOptions
  public initialized: boolean

  public endpoint: string

  public id?: SubdomainPayload['id']
  public createdAt?: SubdomainPayload['createdAt']
  public updatedAt?: SubdomainPayload['updatedAt']
  public deleted?: SubdomainPayload['deleted']
  public active?: SubdomainPayload['active']
  public subdomain?: SubdomainPayload['subdomain']

  constructor (options: SubdomainOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/interverse/subdomains'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: SubdomainRawPayload): Subdomain {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.subdomain = rawPayload.subdomain

    return this
  }

  public static create (payload: SubdomainRawPayload, carrier: Cloud, http: Cloud['http']): Subdomain {
    return new Subdomain({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): SubdomainRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      subdomain: this.subdomain
    }
  }

  public async init (): Promise<Subdomain | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new SubdomainInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Subdomains {
  public static endpoint: string = 'api/v0/interverse/subdomains'
}

export class SubdomainInitializationError extends BaseError {
  public name = 'SubdomainInitializationError'
  constructor (public message: string = 'Could not initialize subdomain.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SubdomainInitializationError.prototype)
  }
}

export class SubdomainFetchRemoteError extends BaseError {
  public name = 'SubdomainFetchRemoteError'
  constructor (public message: string = 'Could not get subdomain.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SubdomainFetchRemoteError.prototype)
  }
}

export class SubdomainsFetchRemoteError extends BaseError {
  public name = 'SubdomainsFetchRemoteError'
  constructor (public message: string = 'Could not get subdomains.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SubdomainsFetchRemoteError.prototype)
  }
}
