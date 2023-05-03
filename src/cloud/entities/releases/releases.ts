import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import type { Cloud } from '../../index'
export interface ReleaseOptions extends EntityOptions {
  rawPayload?: ReleaseRawPayload
}

export interface ReleaseRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly status?: string

  readonly allVersions?: {
    readonly version?: any
  }
  readonly configuration?: any
  readonly product?: string
  readonly product_name?: string
  readonly channel?: string
  readonly default_display_name?: string
  readonly organization?: string
  readonly pool?: string
  readonly release?: string
}

export interface VersionEntityRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly product?: string
  readonly latest?: boolean
}

export interface ReleaseEntityRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly default_display_name?: string
  readonly latest?: boolean
}

export interface ReleaseWithVersionsRawPayload {
  readonly id?: string
  readonly release?: ReleaseEntityRawPayload
  readonly versions?: VersionEntityRawPayload[]
}

export interface ReleasePayload {
  readonly id?: ReleaseRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ReleaseRawPayload['deleted']
  readonly active?: ReleaseRawPayload['active']
  readonly name?: ReleaseRawPayload['name']
  readonly status?: ReleaseRawPayload['status']
  readonly allVersions?: ReleaseRawPayload['allVersions']
  readonly configuration?: ReleaseRawPayload['configuration']
  readonly product?: ReleaseRawPayload['product']
  readonly productName?: ReleaseRawPayload['product_name']
  readonly channel?: ReleaseRawPayload['channel']
  readonly defaultDisplayName?: ReleaseRawPayload['default_display_name']
  readonly organization?: ReleaseRawPayload['organization']
  readonly pool?: ReleaseRawPayload['pool']
  readonly release?: ReleaseRawPayload['release']
}

/**
 * Manage organizations.
 *
 * @category Entity
 */
export class Release extends Entity<ReleasePayload, ReleaseRawPayload> {
  public get entityName (): string {
    return 'releases'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: ReleaseOptions
  public initialized: boolean

  public endpoint: string

  public id?: ReleasePayload['id']
  public createdAt?: ReleasePayload['createdAt']
  public updatedAt?: ReleasePayload['updatedAt']
  public deleted?: ReleasePayload['deleted']
  public active?: ReleasePayload['active']
  public name?: ReleasePayload['name']
  public status?: ReleasePayload['status']
  public allVersions?: ReleasePayload['allVersions']
  public configuration?: ReleasePayload['configuration']
  public product?: ReleasePayload['product']
  public productName?: ReleasePayload['productName']
  public channel?: ReleasePayload['channel']
  public defaultDisplayName?: ReleasePayload['defaultDisplayName']
  public organization?: ReleaseRawPayload['organization']
  public pool?: ReleaseRawPayload['pool']
  public release?: ReleaseRawPayload['release']

  constructor (options: ReleaseOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/universes/releases'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ReleaseRawPayload): this {
    this.setRawPayload(rawPayload)
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.status = rawPayload.status
    this.allVersions = rawPayload.allVersions
    this.configuration = rawPayload.configuration
    this.product = rawPayload.product
    this.productName = rawPayload.product_name
    this.channel = rawPayload.channel
    this.defaultDisplayName = rawPayload.default_display_name
    this.organization = rawPayload.organization
    this.pool = rawPayload.pool
    this.release = rawPayload.release

    return this
  }

  public static create (payload: ReleaseRawPayload, carrier: Cloud, http: Cloud['http']): Release {
    return new Release({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): ReleaseRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      status: this.status,
      allVersions: this.allVersions,
      configuration: this.configuration,
      product: this.product,
      product_name: this.productName,
      organization: this.organization,
      default_display_name: this.defaultDisplayName,
      release: this.release
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ReleaseInitializationError(undefined, { error: err }))
    }
  }

  public async getImageTags (image: string): Promise<Record<string, string>> {
    const endpoint = `api/v0/image-repository/${image}/tags`
    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }
      const res = await this.http?.getClient()(opts)
      const tags = res.data.data as Record<string, string>
      return tags
    } catch (err) {
      throw this.handleError(new ReleasesGetImageTagsError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Releases {
  public static endpoint: string = 'api/v0/universes/releases'
}

export class ReleaseInitializationError extends BaseError {
  public name = 'ReleaseInitializationError'
  constructor (public message: string = 'Could not initialize Release.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ReleaseInitializationError.prototype)
  }
}

export class ReleaseFetchRemoteError extends BaseError {
  public name = 'ReleaseFetchRemoteError'
  constructor (public message: string = 'Could not get Release.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ReleaseFetchRemoteError.prototype)
  }
}

export class ReleasesGetImageTagsError extends BaseError {
  public name = 'ReleasesGetImageTagsError'
  constructor (public message: string = 'Could not fetch image tags unexpectedly.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ReleasesGetImageTagsError.prototype)
  }
}

export class ReleasesFetchRemoteError extends BaseError {
  public name = 'ReleasesFetchRemoteError'
  constructor (public message: string = 'Could not get releases.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ReleasesFetchRemoteError.prototype)
  }
}
