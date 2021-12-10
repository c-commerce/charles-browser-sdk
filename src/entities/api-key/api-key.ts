
import qs from 'qs'
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ApiKeyOptions extends UniverseEntityOptions {
  rawPayload?: ApiKeyRawPayload
}

export interface ApiKeyRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly description?: string
  readonly permissions?: string[]
  readonly labels?: object
  readonly api_key?: string
}

export interface ApiKeyPayload {
  readonly id?: ApiKeyRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ApiKeyRawPayload['deleted']
  readonly active?: ApiKeyRawPayload['active']
  readonly name?: ApiKeyRawPayload['name']
  readonly description?: ApiKeyRawPayload['description']
  readonly permissions?: ApiKeyRawPayload['permissions']
  readonly labels?: ApiKeyRawPayload['labels']
  readonly apiKey?: ApiKeyRawPayload['api_key']
}

/**
 * Manage api_keys.
 *
 * @category Entity
 */
export class ApiKey extends UniverseEntity<ApiKeyPayload, ApiKeyRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ApiKeyOptions
  public initialized: boolean

  public endpoint: string

  public id?: ApiKeyPayload['id']
  public createdAt?: ApiKeyPayload['createdAt']
  public updatedAt?: ApiKeyPayload['updatedAt']
  public deleted?: ApiKeyPayload['deleted']
  public active?: ApiKeyPayload['active']
  public name?: ApiKeyPayload['name']
  public description?: ApiKeyPayload['description']
  public permissions?: ApiKeyPayload['permissions']
  public labels?: ApiKeyPayload['labels']
  public apiKey?: ApiKeyPayload['apiKey']

  constructor (options: ApiKeyOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/api_keys'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
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
    this.name = rawPayload.name
    this.description = rawPayload.description
    this.permissions = rawPayload.permissions
    this.labels = rawPayload.labels
    this.apiKey = rawPayload.api_key

    return this
  }

  public static create (payload: ApiKeyRawPayload, universe: Universe, http: Universe['http']): ApiKey {
    return new ApiKey({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ApiKeyRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      description: this.description,
      permissions: this.permissions,
      labels: this.labels,
      api_key: this.apiKey
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

  public async describe (options?: EntityFetchOptions): Promise<ApiKey | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('describe requires id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id}/describe${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as ApiKeyRawPayload)

      return this
    } catch (err) {
      throw new ApiKeyDescribeRemoteError(undefined, { error: err })
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ApiKeys {
  public static endpoint: string = 'api/v0/api_keys'
}

export class ApiKeyInitializationError extends BaseError {
  public name = 'ApiKeyInitializationError'
  constructor (public message: string = 'Could not initialize api_key.', properties?: any) {
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
export class ApiKeyDescribeRemoteError extends BaseError {
  public name = 'ApiKeyDescribeRemoteError'
  constructor (public message: string = 'Could not get api key details.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ApiKeyDescribeRemoteError.prototype)
  }
}

export class ApiKeysFetchRemoteError extends BaseError {
  public name = 'ApiKeysFetchRemoteError'
  constructor (public message: string = 'Could not get api keys.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ApiKeysFetchRemoteError.prototype)
  }
}
