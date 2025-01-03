
import { UniverseEntity, UniverseEntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import qs from 'qs'

export interface AssetOptions extends UniverseEntityOptions {
  rawPayload?: AssetRawPayload
}

export interface AssetsOptions {
  http: Universe['http']
  universe: Universe
}

export type AssetOptimizationType = 'whatsapp_video_compat' | string

export interface AssetRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly uri?: string
  readonly mime_type?: string
  readonly storage_type?: string
  readonly payload_id?: string
  readonly original_name?: string
  readonly comment?: string
  readonly metadata?: object | null
  readonly public?: boolean
  readonly optimizations?: Array<{
    type: AssetOptimizationType
    payload: string
  }> | null
}

export interface AssetPayload {
  readonly id?: AssetRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly uri?: string
  readonly mimeType?: string
  readonly storageType?: string
  readonly payloadId?: string
  readonly originalName?: string
  readonly comment?: string
  readonly metadata?: object | null
  readonly public?: boolean
  readonly optimizations?: AssetRawPayload['optimizations']
}

/**
 * Manage assets.
 *
 * @category Entity
 */
export class Asset extends UniverseEntity<AssetPayload, AssetRawPayload> {
  public get entityName (): string {
    return 'assets'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: AssetOptions
  public initialized: boolean

  public endpoint: string
  public v1Endpoint: string

  public id?: AssetPayload['id']
  public createdAt?: AssetPayload['createdAt']
  public updatedAt?: AssetPayload['updatedAt']
  public deleted?: AssetPayload['deleted']
  public active?: AssetPayload['active']
  public uri?: AssetPayload['uri']
  public mimeType?: AssetPayload['mimeType']
  public storageType?: AssetPayload['storageType']
  public payloadId?: AssetPayload['payloadId']
  public originalName?: AssetPayload['originalName']
  public comment?: AssetPayload['comment']
  public metadata?: AssetPayload['metadata']
  public public?: AssetPayload['public']
  public optimizations?: AssetPayload['optimizations']

  constructor (options: AssetOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/assets'
    this.v1Endpoint = 'api/v1/assets'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: AssetRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.uri = rawPayload.uri
    this.mimeType = rawPayload.mime_type
    this.storageType = rawPayload.storage_type
    this.payloadId = rawPayload.payload_id
    this.originalName = rawPayload.original_name
    this.comment = rawPayload.comment
    this.metadata = rawPayload.metadata
    this.public = rawPayload.public
    this.optimizations = rawPayload.optimizations

    return this
  }

  public static create (payload: AssetRawPayload, universe: Universe, http: Universe['http']): Asset {
    return new Asset({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): AssetRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      uri: this.uri,
      mime_type: this.mimeType,
      storage_type: this.storageType,
      payload_id: this.payloadId,
      original_name: this.originalName,
      comment: this.comment,
      metadata: this.metadata ?? null,
      public: this.public ?? false,
      optimizations: this.optimizations
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new AssetInitializationError(undefined, { error: err }))
    }
  }

  public async upload (payload: FormData | string, options?: AssetsPostOptions): Promise<Asset[] | undefined> {
    try {
      const queryOptions = {
        public: true,
        ...options
      }

      const contentType = typeof payload === 'string' ? 'text/plain' : 'multipart/form-data'

      const opts = {
        headers: {
          'Content-Type': contentType
        }
      }

      const res = await this.http?.getClient().post(`${this.universe?.universeBase}/${Assets.endpoint}${qs.stringify(queryOptions, { addQueryPrefix: true })}`, payload, opts)
      const data = res?.data.data as AssetRawPayload[]
      return data.map((item: AssetRawPayload) => {
        return Asset.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw new AssetsUploadError(undefined, { error: err })
    }
  }

  public async uploadAndTransform (payload: FormData | AssetRawPayload[] | string, contentType: string, options?: AssetsPostOptions): Promise<Asset[]> {
    try {
      const queryOptions = {
        public: true,
        ...{
          ...options,
          timeout: undefined
        }
      }

      const opts = {
        method: 'POST',
        timeout: options?.timeout ?? undefined,
        url: `${this.universe?.universeBase}/${Assets.endpoint}${qs.stringify(queryOptions, { addQueryPrefix: true })}`,
        headers: {
          'Content-Type': contentType
        },
        data: payload ?? undefined
      }

      const res = await this.http?.getClient()(opts)
      const data = res?.data.data as AssetRawPayload[]
      return data.map((item: AssetRawPayload) => {
        return Asset.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw new AssetUploadAndTransformError(undefined, { error: err })
    }
  }

  public async getForwardedViewUrlById (): Promise<string | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('forwardById requires id to be set.')
    return `${this.universe?.universeBase}/${this.v1Endpoint}/${this.id}/forward`
  }

  public async getForwardedViewUrlByUri (uri: string): Promise<string | undefined> {
    return `${this.universe?.universeBase}/${this.v1Endpoint}/forward?uri=${uri}`
  }

  public async requestViewUrlById (): Promise<string | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('requestById requires id to be set.')
    try {
      const opts = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        url: `${this.universe?.universeBase}/${this.v1Endpoint}/${this.id}/request`,
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.data.data.ref as string
    } catch (err) {
      throw new BaseError('Failed to fetch view Url', { error: err })
    }
  }

  public async requestViewUrlByUri (uri: string): Promise<string | undefined> {
    try {
      const opts = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        url: `${this.universe?.universeBase}/${this.v1Endpoint}/request?uri=${uri}`,
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.data.data.ref as string
    } catch (err) {
      throw new BaseError('Failed to fetch view Url', { error: err })
    }
  }
}

/**
 * @property {boolean} public makes the resource available to the public if true
 * @property {object} transform contains properties to tell how sharp lib should transform the image on upload
 */
export interface AssetsPostOptions {
  public?: boolean
  transform?: object
  optimizations: AssetOptimizationType[]
  timeout?: number
}

export class Assets {
  protected http: Universe['http']
  protected universe: Universe
  protected apiCarrier: Universe
  public static endpoint: string = 'api/v0/assets'

  private readonly options?: AssetsOptions

  constructor (options: AssetsOptions) {
    this.options = options
    this.http = options.http
    this.universe = options.universe
    this.apiCarrier = options.universe
  }

  public async post (payload: FormData, options?: AssetsPostOptions): Promise<Asset[] | undefined> {
    try {
      const queryOptions = {
        public: true,
        ...{
          ...options,
          timeout: undefined
        }
      }

      const opts = {
        timeout: options?.timeout,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const res = await this.http?.getClient().post(`${this.universe?.universeBase}/${Assets.endpoint}${qs.stringify(queryOptions, { addQueryPrefix: true })}`, payload, opts)
      const data = res?.data.data as AssetRawPayload[]
      return data.map((item: AssetRawPayload) => {
        return Asset.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw new AssetsPostError(undefined, { error: err })
    }
  }
}

export class AssetInitializationError extends BaseError {
  public name = 'AssetInitializationError'
  constructor (public message: string = 'Could not initialize asset.', properties?: any) {
    super(message, properties)
  }
}

export class AssetFetchRemoteError extends BaseError {
  public name = 'AssetFetchRemoteError'
  constructor (public message: string = 'Could not get asset.', properties?: any) {
    super(message, properties)
  }
}

export class AssetsFetchRemoteError extends BaseError {
  public name = 'AssetsFetchRemoteError'
  constructor (public message: string = 'Could not get assets.', properties?: any) {
    super(message, properties)
  }
}

export class AssetsPostError extends BaseError {
  public name = 'AssetsPostError'
  constructor (public message: string = 'Could not create assets.', properties?: any) {
    super(message, properties)
  }
}
export class AssetUploadAndTransformError extends BaseError {
  public name = 'AssetUploadAndTransformError'
  constructor (public message: string = 'Could not upload and transform asset.', properties?: any) {
    super(message, properties)
  }
}
export class AssetsUploadError extends BaseError {
  public name = 'AssetsUploadError'
  constructor (public message: string = 'Could not upload assets.', properties?: any) {
    super(message, properties)
  }
}
