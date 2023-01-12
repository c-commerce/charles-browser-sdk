import { APICarrier } from '../../../../base'
import Entity, { EntityOptions } from '../../../../entities/_base'
import { BaseError } from '../../../../errors'
import type { Cloud } from '../../../index'

export interface DomainOptions extends EntityOptions {
  rawPayload?: DomainRawPayload
}

export interface DomainRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly subdomain?: string
  readonly organization?: string
}

export interface DomainPayload {
  readonly id?: DomainRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: DomainRawPayload['deleted']
  readonly active?: DomainRawPayload['active']
  readonly subdomain?: DomainRawPayload['subdomain']
  readonly organization?: DomainRawPayload['organization']
}

/**
 * @category Entity
 */
export class Domain extends Entity<DomainPayload, DomainRawPayload> {
  public get entityName (): string {
    return 'domain'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: DomainOptions
  public initialized: boolean

  public endpoint: string

  public id?: DomainPayload['id']
  public createdAt?: DomainPayload['createdAt']
  public updatedAt?: DomainPayload['updatedAt']
  public deleted?: DomainPayload['deleted']
  public active?: DomainPayload['active']
  public subdomain?: DomainPayload['subdomain']
  public organization?: DomainPayload['organization']

  constructor (options: DomainOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = ''
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      const organization = options.rawPayload.organization as string
      this.endpoint = `api/v0/interverse/organizations/${organization}/domains`
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: DomainRawPayload): Domain {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.subdomain = rawPayload.subdomain
    this.organization = rawPayload.organization

    return this
  }

  public static create (payload: DomainRawPayload, carrier: Cloud, http: Cloud['http']): Domain {
    return new Domain({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): DomainRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      subdomain: this.subdomain
    }
  }

  public async init (): Promise<Domain | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new DomainInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Domains {
  public static endpoint: string = ''
}

export class DomainInitializationError extends BaseError {
  public name = 'DomainInitializationError'
  constructor (public message: string = 'Could not initialize Domain.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DomainInitializationError.prototype)
  }
}

export class DomainFetchRemoteError extends BaseError {
  public name = 'DomainFetchRemoteError'
  constructor (public message: string = 'Could not get Domain.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DomainFetchRemoteError.prototype)
  }
}

export class DomainsFetchRemoteError extends BaseError {
  public name = 'DomainsFetchRemoteError'
  constructor (public message: string = 'Could not get Domains.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DomainsFetchRemoteError.prototype)
  }
}
