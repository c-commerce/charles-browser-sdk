
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions, EntitiesList } from '../_base'
import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { BaseError } from '../../errors'

export interface CorsOriginOptions extends UniverseEntityOptions {
  rawPayload?: CorsOriginRawPayload
}

export interface CorsOriginRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly origin?: string
}

export interface CorsOriginPayload {
  readonly id?: CorsOriginRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: CorsOriginRawPayload['deleted']
  readonly active?: CorsOriginRawPayload['active']
  readonly name?: CorsOriginRawPayload['name']
  readonly origin?: CorsOriginRawPayload['origin']
}

/**
 * Manage cors_origins.
 *
 * @category Entity
 */
export class CorsOrigin extends UniverseEntity<CorsOriginPayload, CorsOriginRawPayload> {
  public get entityName (): string {
    return 'cors_origin'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: CorsOriginOptions
  public initialized: boolean

  public endpoint: string

  public id?: CorsOriginPayload['id']
  public createdAt?: CorsOriginPayload['createdAt']
  public updatedAt?: CorsOriginPayload['updatedAt']
  public deleted?: CorsOriginPayload['deleted']
  public active?: CorsOriginPayload['active']

  public name?: CorsOriginPayload['name']
  public origin?: CorsOriginPayload['origin']

  constructor (options: CorsOriginOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/cors_origins'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CorsOriginRawPayload): CorsOrigin {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name ?? ''
    this.origin = rawPayload.origin ?? ''

    return this
  }

  public static create (payload: CorsOriginRawPayload, universe: Universe, http: Universe['http']): CorsOrigin {
    return new CorsOrigin({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): CorsOriginRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      name: this.name,
      origin: this.origin
    }
  }

  public async init (): Promise<CorsOrigin | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new CorsOriginInitializationError(undefined, { error: err }))
    }
  }
}

export interface CorsOriginsOptions {
  universe: Universe
  http: Universe['http']
}

export class CorsOrigins extends EntitiesList<CorsOrigin, CorsOriginRawPayload> {
  public static endpoint: string = 'api/v0/cors_origins'
  public endpoint: string = CorsOrigins.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']

  constructor (options: CorsOriginsOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: CorsOriginRawPayload): CorsOrigin {
    return CorsOrigin.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<CorsOrigins> {
    return (await this._getStream(options)) as CorsOrigins
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }

  public async fetch (options: EntityFetchOptions): Promise<CorsOrigin[] | CorsOriginRawPayload[] | undefined> {
    try {
      return await super.fetch(options)
    } catch (err) {
      throw new CorsOriginsFetchRemoteError(undefined, { error: err })
    }
  }
}

export class CorsOriginInitializationError extends BaseError {
  public name = 'CorsOriginInitializationError'
  constructor (public message: string = 'Could not initialize cors_origin.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CorsOriginInitializationError.prototype)
  }
}

export class CorsOriginFetchRemoteError extends BaseError {
  public name = 'CorsOriginFetchRemoteError'
  constructor (public message: string = 'Could not get cors_origin.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CorsOriginFetchRemoteError.prototype)
  }
}

export class CorsOriginsFetchRemoteError extends BaseError {
  public name = 'CorsOriginsFetchRemoteError'
  constructor (public message: string = 'Could not get cors_origins.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CorsOriginsFetchRemoteError.prototype)
  }
}
