
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface UrlShortenerOptions extends UniverseEntityOptions {
  rawPayload?: UrlShortenerRawPayload
}

export interface UrlShortenerShortendedURL {
  readonly uri: string
  readonly link: string
}

export interface UrlShortenerShortenRequest {
  uri: string
  personId?: string
  feedId?: string
}

interface UrlShortenerDomain {
  value: string
  label: string
}

export interface UrlShortenerRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string | null
  readonly uri?: string | null
  readonly is_proxy?: boolean
  readonly is_default?: boolean
  readonly proxy_vendor?: string | null
  readonly kind?: string | null
  readonly external_reference_id?: string | null
  readonly configuration?: {
    shorten_chatout?: boolean
    domain?: string
    [key: string]: any
  } | null
  readonly integration_configuration?: string | null
  readonly is_set_up?: boolean
  readonly labels?: {
    [key: string]: any
  } | null
}

export interface UrlShortenerPayload {
  readonly id?: UrlShortenerRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: UrlShortenerRawPayload['deleted']
  readonly active?: UrlShortenerRawPayload['active']
  readonly name?: UrlShortenerRawPayload['name']
  readonly uri?: UrlShortenerRawPayload['uri']
  readonly isProxy?: UrlShortenerRawPayload['is_proxy']
  readonly isDefault?: UrlShortenerRawPayload['is_default']
  readonly proxyVendor?: UrlShortenerRawPayload['proxy_vendor']
  readonly kind?: UrlShortenerRawPayload['kind']
  readonly externalReferenceId?: UrlShortenerRawPayload['external_reference_id']
  readonly configuration?: UrlShortenerRawPayload['configuration']
  readonly integrationConfiguration?: UrlShortenerRawPayload['integration_configuration']
  readonly isSetUp?: UrlShortenerRawPayload['is_set_up']
  readonly labels?: UrlShortenerRawPayload['labels']
}

/**
 * Manage url_shorteners.
 *
 * @category Entity
 */
export class UrlShortener extends UniverseEntity<UrlShortenerPayload, UrlShortenerRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: UrlShortenerOptions
  public initialized: boolean

  public endpoint: string

  public id?: UrlShortenerPayload['id']
  public createdAt?: UrlShortenerPayload['createdAt']
  public updatedAt?: UrlShortenerPayload['updatedAt']
  public deleted?: UrlShortenerPayload['deleted']
  public active?: UrlShortenerPayload['active']
  public name?: UrlShortenerPayload['name']
  public uri?: UrlShortenerPayload['uri']
  public isProxy?: UrlShortenerPayload['isProxy']
  public isDefault?: UrlShortenerPayload['isDefault']
  public proxyVendor?: UrlShortenerPayload['proxyVendor']
  public kind?: UrlShortenerPayload['kind']
  public externalReferenceId?: UrlShortenerPayload['externalReferenceId']
  public configuration?: UrlShortenerPayload['configuration']
  public integrationConfiguration?: UrlShortenerPayload['integrationConfiguration']
  public isSetUp?: UrlShortenerPayload['isSetUp']
  public labels?: UrlShortenerPayload['labels']

  constructor (options: UrlShortenerOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/url_shorteners'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: UrlShortenerRawPayload): UrlShortener {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.uri = rawPayload.uri
    this.isProxy = rawPayload.is_proxy
    this.isDefault = rawPayload.is_default
    this.proxyVendor = rawPayload.proxy_vendor
    this.kind = rawPayload.kind
    this.externalReferenceId = rawPayload.external_reference_id
    this.configuration = rawPayload.configuration
    this.integrationConfiguration = rawPayload.integration_configuration
    this.isSetUp = rawPayload.is_set_up
    this.labels = rawPayload.labels

    return this
  }

  public static create (payload: UrlShortenerRawPayload, universe: Universe, http: Universe['http']): UrlShortener {
    return new UrlShortener({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): UrlShortenerRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      uri: this.uri,
      is_proxy: this.isProxy,
      is_default: this.isDefault,
      proxy_vendor: this.proxyVendor,
      kind: this.kind,
      external_reference_id: this.externalReferenceId,
      configuration: this.configuration,
      integration_configuration: this.integrationConfiguration,
      is_set_up: this.isSetUp,
      labels: this.labels
    }
  }

  public async init (): Promise<UrlShortener | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new UrlShortenerInitializationError(undefined, { error: err }))
    }
  }

  public async getDomains (): Promise<UrlShortenerDomain[] | never> {
    if (this.id === null || this.id === undefined) throw new TypeError('Shorten requires id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id}/domains`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)
      const resultData: Array<{ subdomain: string }> = response.data.data

      return resultData.map(domain => ({ value: domain.subdomain, label: domain.subdomain }))
    } catch (err) {
      throw new UrlShortenerShortenError(undefined, { error: err })
    }
  }

  public async shorten (request: UrlShortenerShortenRequest): Promise<UrlShortenerShortendedURL | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('shorten requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id}/shorten`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: request,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      return response.data.data[0] as UrlShortenerShortendedURL
    } catch (err) {
      throw new UrlShortenerShortenError(undefined, { error: err })
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UrlShorteners {
  public static endpoint: string = 'api/v0/url_shorteners'
}

export class UrlShortenerInitializationError extends BaseError {
  public name = 'UrlShortenerInitializationError'
  constructor (public message: string = 'Could not initialize url_shortener.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UrlShortenerInitializationError.prototype)
  }
}

export class UrlShortenerFetchRemoteError extends BaseError {
  public name = 'UrlShortenerFetchRemoteError'
  constructor (public message: string = 'Could not get url_shortener.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UrlShortenerFetchRemoteError.prototype)
  }
}

export class UrlShortenersFetchRemoteError extends BaseError {
  public name = 'UrlShortenersFetchRemoteError'
  constructor (public message: string = 'Could not get url_shorteners.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UrlShortenersFetchRemoteError.prototype)
  }
}

export class UrlShortenerShortenError extends BaseError {
  public name = 'UrlShortenerShortenError'
  constructor (public message: string = 'Could not shorten URL.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UrlShortenerShortenError.prototype)
  }
}
