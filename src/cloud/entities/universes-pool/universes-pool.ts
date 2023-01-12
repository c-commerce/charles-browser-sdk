import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import type { Cloud } from '../../index'

export interface UniversesPoolOptions extends EntityOptions {
  rawPayload?: UniversesPoolRawPayload
}

export interface UniversesPoolRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly count?: string
  readonly status?: string
  readonly configuration?: string
}

export interface UniversesPoolPayload {
  readonly id?: UniversesPoolRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: UniversesPoolRawPayload['deleted']
  readonly active?: UniversesPoolRawPayload['active']
  readonly name?: UniversesPoolRawPayload['name']
  readonly count?: UniversesPoolRawPayload['count']
  readonly status?: UniversesPoolRawPayload['status']
  readonly configuration?: UniversesPoolRawPayload['configuration']
}

export interface UniversePoolDeployStatus {
  readonly deployStatus: string | null
  readonly jobStatus: string | null
}

export interface UniversesPoolUpdateAllResponse {
  readonly id: string
  readonly deployStatus: string | null
  readonly jobStatus: string | null
}

/**
 * Manage organizations.
 *
 * @category Entity
 */
export class UniversesPool extends Entity<UniversesPoolPayload, UniversesPoolRawPayload> {
  public get entityName (): string {
    return 'universe_pool'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: UniversesPoolOptions
  public initialized: boolean

  public endpoint: string

  public id?: UniversesPoolPayload['id']
  public createdAt?: UniversesPoolPayload['createdAt']
  public updatedAt?: UniversesPoolPayload['updatedAt']
  public deleted?: UniversesPoolPayload['deleted']
  public active?: UniversesPoolPayload['active']
  public name?: UniversesPoolPayload['name']
  public count?: UniversesPoolPayload['count']
  public status?: UniversesPoolPayload['status']
  public configuration?: UniversesPoolPayload['configuration']

  constructor (options: UniversesPoolOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/universes_pools'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: UniversesPoolRawPayload): UniversesPool {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.count = rawPayload.count
    this.status = rawPayload.status
    this.configuration = rawPayload.configuration

    return this
  }

  public static create (payload: UniversesPoolRawPayload, carrier: Cloud, http: Cloud['http']): UniversesPool {
    return new UniversesPool({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): UniversesPoolRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      count: this.count,
      status: this.status,
      configuration: this.configuration
    }
  }

  public async updateAll (): Promise<UniversesPoolUpdateAllResponse[]> {
    try {
      const updateAllEndpoint = `${this.endpoint}/deploy/status`
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${updateAllEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const resource = res.data.data as UniversesPoolUpdateAllResponse[]
      return resource
    } catch (err) {
      throw this.handleError(new UniversesPoolsUpdateAllError())
    }
  }

  public async init (): Promise<UniversesPool | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new UniversesPoolInitializationError(undefined, { error: err }))
    }
  }

  public async deployStatus (): Promise<UniversePoolDeployStatus> {
    if (this.id === null || this.id === undefined) throw new TypeError('UniversePool.deployStatus requires pool id to be set.')
    const deployStatusEndpoint = `api/v0/universes_pools/${this.id}/deploy/status`
    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${deployStatusEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const resource = res.data.data as UniversePoolDeployStatus
      return resource
    } catch (err) {
      throw this.handleError(new UniversePoolDeployStatusError(undefined, { error: err }))
    }
  }

  public async deploy (): Promise<string> {
    if (this.id === null || this.id === undefined) throw new TypeError('UniversePool.deploy requires pool id to be set.')
    const deployEndpoint = `api/v0/universes_pools/${this.id}/deploy/v2`
    try {
      const opts = {
        method: 'PUT',
        url: `${this.apiCarrier?.injectables?.base}/${deployEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.statusText
    } catch (err) {
      throw this.handleError(new UniversePoolDeployError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UniversesPools {
  public static endpoint: string = 'api/v0/universes_pools'
}

export class UniversesPoolInitializationError extends BaseError {
  public name = 'UniversesPoolInitializationError'
  constructor (public message: string = 'Could not initialize UniversesPool.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversesPoolInitializationError.prototype)
  }
}

export class UniversesPoolFetchRemoteError extends BaseError {
  public name = 'UniversesPoolFetchRemoteError'
  constructor (public message: string = 'Could not get UniversesPool.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversesPoolFetchRemoteError.prototype)
  }
}

export class UniversePoolDeployError extends BaseError {
  public name = 'UniversePoolDeployError'
  constructor (public message: string = 'Could not deploy UniversePool.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversePoolDeployError.prototype)
  }
}

export class UniversePoolDeployStatusError extends BaseError {
  public name = 'UniversePoolDeployStatusError'
  constructor (public message: string = 'Could not get UniversePool status.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversePoolDeployStatusError.prototype)
  }
}

export class UniversesPoolsFetchRemoteError extends BaseError {
  public name = 'UniversesPoolsFetchRemoteError'
  constructor (public message: string = 'Could not get universes pools.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversesPoolsFetchRemoteError.prototype)
  }
}

export class UniversesPoolsUpdateAllError extends BaseError {
  public name = 'UniversesPoolsUpdateAllError'
  constructor (public message: string = 'Could not update pools.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversesPoolsUpdateAllError.prototype)
  }
}
