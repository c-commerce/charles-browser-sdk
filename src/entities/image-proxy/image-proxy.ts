import qs from 'qs'
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { ImageProxyGetSessionCodeError, Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ImageProxyOptions extends UniverseEntityOptions {
  rawPayload?: ImageProxyRawPayload
}

interface SessionCodeResponse {
  expires: number
  header: { [key: string]: string }
}

export interface ImageProxyResizeRequest {
  url: string
  resize?: {
    type: 'fill' | 'fit' | 'auto'
    height: number
    width: number
  }
  dpr?: number
  format?: 'png' | 'jpeg'
  background?: string
  gravity?: 'center' | 'north' | 'south' | 'east' | 'west' | 'north_east' | 'north_west' | 'south_east' | 'south_west'| 'smart'
}

export interface ImageProxyRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string | null
  readonly is_default?: boolean
  readonly proxy_vendor?: string | null
  readonly configuration?: {
    domain: string
    resize_images: boolean
    resize_pdp_images: boolean
    [key: string]: any
  } | null
  readonly labels?: {
    [key: string]: any
  } | null
}

export interface ImageProxyPayload {
  readonly id?: ImageProxyRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ImageProxyRawPayload['deleted']
  readonly active?: ImageProxyRawPayload['active']
  readonly name?: ImageProxyRawPayload['name']
  readonly isDefault?: ImageProxyRawPayload['is_default']
  readonly proxyVendor?: ImageProxyRawPayload['proxy_vendor']
  readonly configuration?: ImageProxyRawPayload['configuration']
  readonly labels?: ImageProxyRawPayload['labels']
}

/**
 *
 * @category Entity
 */
export class ImageProxy extends UniverseEntity<ImageProxyPayload, ImageProxyPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ImageProxyOptions
  public initialized: boolean

  public endpoint: string

  public id?: ImageProxyPayload['id']
  public createdAt?: ImageProxyPayload['createdAt']
  public updatedAt?: ImageProxyPayload['updatedAt']
  public deleted?: ImageProxyPayload['deleted']
  public active?: ImageProxyPayload['active']
  public name?: ImageProxyPayload['name']
  public isDefault?: ImageProxyPayload['isDefault']
  public proxyVendor?: ImageProxyPayload['proxyVendor']
  public configuration: ImageProxyPayload['configuration']
  public labels?: ImageProxyPayload['labels']

  constructor (options: ImageProxyOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/image_proxy'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ImageProxyRawPayload): ImageProxy {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.isDefault = rawPayload.is_default
    this.proxyVendor = rawPayload.proxy_vendor
    this.configuration = rawPayload.configuration
    this.labels = rawPayload.labels

    return this
  }

  public static create (payload: ImageProxyRawPayload, universe: Universe, http: Universe['http']): ImageProxy {
    return new ImageProxy({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ImageProxyRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      is_default: this.isDefault,
      proxy_vendor: this.proxyVendor,
      configuration: this.configuration,
      labels: this.labels
    }
  }

  public async init (): Promise<ImageProxy | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ImageProxyErrorInitializationError(undefined, { error: err }))
    }
  }

  public configResizeImages (): boolean {
    return this.configuration?.resize_images === true
  }

  public configResizePDPImages (): boolean {
    return this.configuration?.resize_pdp_images === true
  }

  public async getSessionCredentials (): Promise<{
    urn: string
    expires: number
    header: { [key: string]: string }
  }> {
    if (!this.configuration || !this.id) {
      throw new ImageProxySessionCodeError('Image proxy should have id & configuration')
    }

    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/api/v0/image_proxy/${this.id}/session_code`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: {},
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      const sessionCodeResponse: SessionCodeResponse = response.data.data[0]

      return {
        ...sessionCodeResponse,
        urn: `${this.configuration.domain}/api/v0/session`
      }
    } catch (error) {
      throw new ImageProxyGetSessionCodeError({ error })
    }
  }

  public getResizedImgUrl (request: ImageProxyResizeRequest): string {
    if (!this.configuration) throw new TypeError('img proxy requires configuration to be set.')

    return `${this.configuration.domain}/proxy/images?${qs.stringify(this.getUrlParams(request))}`
  }

  private getUrlParams (request: ImageProxyResizeRequest): { [key: string]: string | number } {
    const params = Object.assign({ uri: request.url },
      request.dpr === null ? null : { dpr: request.dpr },
      request.format === null ? null : { format: request.format },
      request.background === null ? null : { background: request.background },
      request.gravity === null ? null : { gravity: request.gravity },
      request.resize === null ? null : { resize: request.resize }
    )

    return params
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ImageProxyAPI {
  public static endpoint: string = 'api/v0/image_proxy'
}

export class ImageProxyErrorInitializationError extends BaseError {
  public name = 'ImageProxyErrorInitializationError'
  constructor (public message: string = 'Could not initialize ImageProxy.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImageProxyErrorInitializationError.prototype)
  }
}

export class ImageProxyGetAPIError extends BaseError {
  public name = 'ImageProxyGetAPIError'
  constructor (public message: string = 'Could not get ImageProxy from api', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImageProxyGetAPIError.prototype)
  }
}

export class ImageProxySessionCodeError extends BaseError {
  public name = 'ImageProxySessionCodeError'
  constructor (public message: string, properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImageProxySessionCodeError.prototype)
  }
}
