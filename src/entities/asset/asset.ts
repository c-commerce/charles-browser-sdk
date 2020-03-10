
import { EventEmitter } from 'events'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface AssetOptions {
  universe: Universe
  http: Universe['http']
  rawPayload?: AssetRawPayload
  initialized?: boolean
}

export interface AssetRawPayload {
  readonly id?: string
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

export class Asset extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: AssetOptions
  public initialized: boolean

  public endpoint: string
  public id?: string
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

  constructor(options: AssetOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/assets'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  private deserialize(rawPayload: AssetRawPayload): Asset {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted || false
    this.active = rawPayload.active || true
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

  public static create(payload: AssetRawPayload, universe: Universe, http: Universe['http']): Asset {
    return new Asset({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): AssetRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted || false,
      active: this.active || true,
      uri: this.uri,
      mime_type: this.mimeType,
      storage_type: this.storageType,
      payload_id: this.payloadId,
      original_name: this.originalName,
      comment: this.comment,
      metadata: this.metadata || null,
      public: this.public || false
    }
  }

  public async init(): Promise<Asset | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new AssetInitializationError(undefined, { error: err }))
    }
  }

  public async fetch(): Promise<Asset | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id}`)

      this.deserialize(res.data.data[0] as AssetRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new AssetFetchRemoteError(undefined, { error: err }))
    }
  }

  private handleError(err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
  }
}

export class Assets {
  public static endpoint: string = 'api/v0/assets'
}

export class AssetInitializationError extends BaseError {
  public name = 'AssetInitializationError'
  constructor(public message: string = 'Could not initialize asset.', properties?: any) {
    super(message, properties)
  }
}

export class AssetFetchRemoteError extends BaseError {
  public name = 'AssetFetchRemoteError'
  constructor(public message: string = 'Could not get asset.', properties?: any) {
    super(message, properties)
  }
}

export class AssetsFetchRemoteError extends BaseError {
  public name = 'AssetsFetchRemoteError'
  constructor(public message: string = 'Could not get assets.', properties?: any) {
    super(message, properties)
  }
}
