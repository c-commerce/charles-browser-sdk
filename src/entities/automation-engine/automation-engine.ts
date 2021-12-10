
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { ApiKeys } from '../api-key'

export interface AutomationEngineOptions extends UniverseEntityOptions {
  rawPayload?: AutomationEngineRawPayload
}

export interface AutomationEngineRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string
  readonly kind?: string
  readonly external_reference_id?: string
  readonly api_key?: string
  readonly uri?: string
  readonly configuration?: string
  readonly links?: {
    [key: string]: string
  }
  readonly labels?: {
    [key: string]: any
  }
}

export interface AutomationEnginePayload {
  readonly id?: AutomationEngineRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: AutomationEngineRawPayload['deleted']
  readonly active?: AutomationEngineRawPayload['active']
  readonly name?: AutomationEngineRawPayload['name']
  readonly isProxy?: AutomationEngineRawPayload['is_proxy']
  readonly proxyVendor?: AutomationEngineRawPayload['proxy_vendor']
  readonly kind?: AutomationEngineRawPayload['kind']
  readonly externalReferenceId?: AutomationEngineRawPayload['external_reference_id']
  readonly apiKey?: AutomationEngineRawPayload['api_key']
  readonly uri?: AutomationEngineRawPayload['uri']
  readonly configuration?: AutomationEngineRawPayload['configuration']
  readonly links?: AutomationEngineRawPayload['links']
  readonly labels?: AutomationEngineRawPayload['labels']

}

/**
 * Manage automation_engines.
 *
 * @category Entity
 */
export class AutomationEngine extends UniverseEntity<AutomationEnginePayload, AutomationEngineRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: AutomationEngineOptions
  public initialized: boolean

  public endpoint: string

  public id?: AutomationEnginePayload['id']
  public createdAt?: AutomationEnginePayload['createdAt']
  public updatedAt?: AutomationEnginePayload['updatedAt']
  public deleted?: AutomationEnginePayload['deleted']
  public active?: AutomationEnginePayload['active']
  public name?: AutomationEnginePayload['name']
  public isProxy?: AutomationEnginePayload['isProxy']
  public proxyVendor?: AutomationEnginePayload['proxyVendor']
  public kind?: AutomationEnginePayload['kind']
  public externalReferenceId?: AutomationEnginePayload['externalReferenceId']
  public apiKey?: AutomationEnginePayload['apiKey']
  public uri?: AutomationEnginePayload['uri']
  public configuration?: AutomationEnginePayload['configuration']
  public links?: AutomationEnginePayload['links']
  public labels?: AutomationEnginePayload['labels']

  constructor (options: AutomationEngineOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/automation_engines'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: AutomationEngineRawPayload): AutomationEngine {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.isProxy = rawPayload.is_proxy
    this.proxyVendor = rawPayload.proxy_vendor
    this.kind = rawPayload.kind
    this.externalReferenceId = rawPayload.external_reference_id
    this.apiKey = rawPayload.api_key
    this.uri = rawPayload.uri
    this.configuration = rawPayload.configuration
    this.links = rawPayload.links
    this.labels = rawPayload.labels

    return this
  }

  public static create (payload: AutomationEngineRawPayload, universe: Universe, http: Universe['http']): AutomationEngine {
    return new AutomationEngine({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): AutomationEngineRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      kind: this.kind,
      external_reference_id: this.externalReferenceId,
      api_key: this.apiKey,
      uri: this.uri,
      configuration: this.configuration,
      links: this.links,
      labels: this.labels
    }
  }

  public async init (): Promise<AutomationEngine | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new AutomationEngineInitializationError(undefined, { error: err }))
    }
  }

  async fetchApiKeys (): Promise<ApiKeys[] | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('fetchApiKeys requires id to be set.')

    const opts = {
      query: {
        labels: {
          type: this.proxyVendor,
          automation_engine: this.id
        }
      }
    }

    return await this.universe.apiKeys(opts)
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AutomationEngines {
  public static endpoint: string = 'api/v0/automation_engines'
}

export class AutomationEngineInitializationError extends BaseError {
  public name = 'AutomationEngineInitializationError'
  constructor (public message: string = 'Could not initialize automation_engine.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AutomationEngineInitializationError.prototype)
  }
}

export class AutomationEngineFetchRemoteError extends BaseError {
  public name = 'AutomationEngineFetchRemoteError'
  constructor (public message: string = 'Could not get automation_engine.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AutomationEngineFetchRemoteError.prototype)
  }
}

export class AutomationEnginesFetchRemoteError extends BaseError {
  public name = 'AutomationEnginesFetchRemoteError'
  constructor (public message: string = 'Could not get automation_engines.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AutomationEnginesFetchRemoteError.prototype)
  }
}
