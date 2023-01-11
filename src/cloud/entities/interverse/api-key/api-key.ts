import { APICarrier } from '../../../../base'
import Entity, { EntityOptions } from '../../../../entities/_base'
import { BaseError } from '../../../../errors'
import type { Cloud } from '../../../index'

export interface ApiKeyOptions extends EntityOptions {
  rawPayload?: ApiKeyRawPayload
}

interface Key {
  payload: string
  type: string
}

export interface ApiKeyRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly organization?: string
  readonly key?: Key | {}
  readonly roles?: string[]
}

export interface ApiKeyPayload {
  readonly id?: ApiKeyRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ApiKeyRawPayload['deleted']
  readonly active?: ApiKeyRawPayload['active']
  readonly organization?: ApiKeyRawPayload['organization']
  readonly key?: ApiKeyRawPayload['key']
  readonly roles?: ApiKeyRawPayload['roles']
}

/**
 * @category Entity
 */
export class ApiKey extends Entity<ApiKeyPayload, ApiKeyRawPayload> {
  public get entityName (): string {
    return 'api_key'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: ApiKeyOptions
  public initialized: boolean

  public endpoint: string

  public id?: ApiKeyPayload['id']
  public createdAt?: ApiKeyPayload['createdAt']
  public updatedAt?: ApiKeyPayload['updatedAt']
  public deleted?: ApiKeyPayload['deleted']
  public active?: ApiKeyPayload['active']
  public key?: ApiKeyPayload['key']
  public organization?: ApiKeyPayload['organization']
  public roles?: ApiKeyPayload['roles']

  constructor (options: ApiKeyOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = ''
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      const organization = options.rawPayload.organization as string
      this.endpoint = `api/v0/interverse/organizations/${organization}/keys`
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ApiKeyRawPayload): ApiKey {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.organization = rawPayload.organization
    this.key = rawPayload.key ?? {}
    this.roles = rawPayload.roles ?? []

    return this
  }

  public static create (payload: ApiKeyRawPayload, carrier: Cloud, http: Cloud['http']): ApiKey {
    return new ApiKey({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): ApiKeyRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      key: this.key ?? {},
      organization: this.organization,
      roles: this.roles
    }
  }

  public async init (): Promise<ApiKey | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ApiKeyInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ApiKeys {
  public static endpoint: string = ''
}

export class ApiKeyInitializationError extends BaseError {
  public name = 'ApiKeyInitializationError'
  constructor (public message: string = 'Could not initialize api key.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ApiKeyInitializationError.prototype)
  }
}

export class ApiKeyFetchRemoteError extends BaseError {
  public name = 'ApiKeyFetchRemoteError'
  constructor (public message: string = 'Could not get api key.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ApiKeyFetchRemoteError.prototype)
  }
}

export class ApiKeysFetchRemoteError extends BaseError {
  public name = 'ApiKeysFetchRemoteError'
  constructor (public message: string = 'Could not get api keys.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ApiKeysFetchRemoteError.prototype)
  }
}
