
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions, EntitiesList } from '../_base'
import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { BaseErrorV2, BaseErrorV2Properties } from '../../errors'

export interface TrackingProviderOptions extends UniverseEntityOptions {
  rawPayload?: TrackingProviderRawPayload
}

export interface TrackingProviderRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly proxy_vendor?: string
  readonly kind?: string
  readonly configuration?: string
  readonly labels?: {
    [key: string]: any
  }
}

export interface TrackingProviderPayload {
  readonly id?: TrackingProviderRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: TrackingProviderRawPayload['deleted']
  readonly active?: TrackingProviderRawPayload['active']
  readonly name?: TrackingProviderRawPayload['name']
  readonly proxyVendor?: TrackingProviderRawPayload['proxy_vendor']
  readonly kind?: TrackingProviderRawPayload['kind']
  readonly configuration?: TrackingProviderRawPayload['configuration']
  readonly labels?: TrackingProviderRawPayload['labels']
}

/**
 * Manage tracking_providers.
 *
 * @category Entity
 */
export class TrackingProvider extends UniverseEntity<TrackingProviderPayload, TrackingProviderRawPayload> {
  public get entityName (): string {
    return 'tracking_providers'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: TrackingProviderOptions
  public initialized: boolean

  public endpoint: string

  public id?: TrackingProviderPayload['id']
  public createdAt?: TrackingProviderPayload['createdAt']
  public updatedAt?: TrackingProviderPayload['updatedAt']
  public deleted?: TrackingProviderPayload['deleted']
  public active?: TrackingProviderPayload['active']
  public name?: TrackingProviderPayload['name']
  public proxyVendor?: TrackingProviderPayload['proxyVendor']
  public kind?: TrackingProviderPayload['kind']
  public configuration?: TrackingProviderPayload['configuration']
  public labels?: TrackingProviderPayload['labels']

  constructor (options: TrackingProviderOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/tracking_providers'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: TrackingProviderRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name ?? undefined
    this.proxyVendor = rawPayload.proxy_vendor ?? undefined
    this.kind = rawPayload.kind ?? undefined
    this.configuration = rawPayload.configuration ?? undefined
    this.labels = rawPayload.labels ?? undefined

    return this
  }

  public static create (payload: TrackingProviderRawPayload, universe: Universe, http: Universe['http']): TrackingProvider {
    return new TrackingProvider({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): TrackingProviderRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name ?? undefined,
      proxy_vendor: this.proxyVendor ?? undefined,
      kind: this.kind ?? undefined,
      configuration: this.configuration ?? undefined,
      labels: this.labels ?? undefined
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new TrackingProviderInitializationError(undefined, { error: err }))
    }
  }
}

export interface TrackingProvidersOptions {
  universe: Universe
  http: Universe['http']
}

export class TrackingProviders extends EntitiesList<TrackingProvider, TrackingProviderRawPayload> {
  public static endpoint: string = 'api/v0/tracking_providers'
  public endpoint: string = TrackingProviders.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']

  constructor (options: TrackingProvidersOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: TrackingProviderRawPayload): TrackingProvider {
    return TrackingProvider.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<TrackingProviders> {
    return (await this._getStream(options)) as TrackingProviders
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }

  public async fetch (options: EntityFetchOptions): Promise<TrackingProvider[] | TrackingProviderRawPayload[] | undefined> {
    try {
      return await super.fetch(options)
    } catch (err) {
      throw new TrackingProvidersFetchRemoteError(undefined, { error: err })
    }
  }
}

export class TrackingProviderInitializationError extends BaseErrorV2 {
  public name = 'TrackingProviderInitializationError'
  public message = 'Could not initialize tracking_provider.'
  constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
    super(err as Error, props)
    Object.setPrototypeOf(this, TrackingProviderInitializationError.prototype)
  }
}

export class TrackingProviderFetchRemoteError extends BaseErrorV2 {
  public name = 'TrackingProviderFetchRemoteError'
  public message = 'Could not get tracking_provider.'
  constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
    super(err as Error, props)
    Object.setPrototypeOf(this, TrackingProviderFetchRemoteError.prototype)
  }
}

export class TrackingProvidersFetchRemoteError extends BaseErrorV2 {
  public name = 'TrackingProvidersFetchRemoteError'
  public message = 'Could not get tracking_providers.'
  constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
    super(err as Error, props)
    Object.setPrototypeOf(this, TrackingProvidersFetchRemoteError.prototype)
  }
}
