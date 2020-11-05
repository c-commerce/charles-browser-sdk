
import Entity, { EntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import qs from 'qs'

export interface AssetOptions extends EntityOptions {
  rawPayload?: AssetRawPayload
}

export interface AssetsOptions {
  http: Universe['http']
  universe: Universe
}

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
}

/**
 * Manage assets.
 *
 * @category Entity
 */
export class Asset extends Entity<AssetPayload, AssetRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: AssetOptions
  public initialized: boolean

  public endpoint: string

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

  constructor (options: AssetOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/assets'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: AssetRawPayload): Asset {
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
      public: this.public ?? false
    }
  }

  public async init (): Promise<Asset | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new AssetInitializationError(undefined, { error: err }))
    }
  }

  public async upload (payload: FormData, options?: AssetsPostOptions): Promise<Asset[] | undefined> {
    try {
      const queryOptions = {
        public: true,
        ...options
      }

      const opts = {
        timeout: 60000,
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
      throw new AssetsUploadError(undefined, { error: err })
    }
  }

  public async uploadAndTransform (payload: FormData | AssetRawPayload[] | string, contentType: string, options?: AssetsPostOptions): Promise<Asset[]> {
    try {
      const queryOptions = {
        public: true,
        ...options
      }

      const opts = {
        method: 'POST',
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
}

/**
 * @property {boolean} public makes the resource available to the public if true
 * @property {object} transform contains properties to tell how sharp lib should transform the image on upload
 */
export interface AssetsPostOptions {
  public?: boolean
  transform?: object
  optimizations: Array<'whatsapp_video_compat' | string>
}

export class Assets {
  protected http: Universe['http']
  protected universe: Universe
  public static endpoint: string = 'api/v0/assets'

  private readonly options?: AssetsOptions

  constructor (options: AssetsOptions) {
    this.options = options
    this.http = options.http
    this.universe = options.universe
  }

  public async post (payload: FormData, options?: AssetsPostOptions): Promise<Asset[] | undefined> {
    try {
      const queryOptions = {
        public: true,
        ...options
      }

      const opts = {
        timeout: 60000,
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
