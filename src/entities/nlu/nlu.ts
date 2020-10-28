
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface NluOptions extends EntityOptions {
  rawPayload?: NluRawPayload
}

export interface NluRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly description?: string
  readonly bot_staff?: string
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string
  readonly configuration?: object
  readonly integration_configuration?: string
  readonly is_set_up?: boolean
  readonly metadata?: object
  readonly payload?: object
  readonly links?: object
}

export interface NluPayload {
  readonly id?: NluRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: NluRawPayload['deleted']
  readonly active?: NluRawPayload['active']

  readonly name?: NluRawPayload['name']
  readonly description?: NluRawPayload['description']
  readonly botStaff?: NluRawPayload['bot_staff']
  readonly isProxy?: NluRawPayload['is_proxy']
  readonly proxyVendor?: NluRawPayload['proxy_vendor']
  readonly configuration?: NluRawPayload['configuration']
  readonly integrationConfiguration?: NluRawPayload['integration_configuration']
  readonly isSetUp?: NluRawPayload['is_set_up']
  readonly metadata?: NluRawPayload['metadata']
  readonly payload?: NluRawPayload['payload']
  readonly links?: NluRawPayload['links']
}

/**
 * Manage nlus.
 *
 * @category Entity
 */
export class Nlu extends Entity<NluPayload, NluRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: NluOptions
  public initialized: boolean

  public endpoint: string

  public id?: NluPayload['id']
  public createdAt?: NluPayload['createdAt']
  public updatedAt?: NluPayload['updatedAt']
  public deleted?: NluPayload['deleted']
  public active?: NluPayload['active']

  public name?: NluPayload['name']
  public description?: NluPayload['description']
  public botStaff?: NluPayload['botStaff']
  public isProxy?: NluPayload['isProxy']
  public proxyVendor?: NluPayload['proxyVendor']
  public configuration?: NluPayload['configuration']
  public integrationConfiguration?: NluPayload['integrationConfiguration']
  public isSetUp?: NluPayload['isSetUp']
  public metadata?: NluPayload['metadata']
  public payload?: NluPayload['payload']
  public links?: NluPayload['links']

  constructor (options: NluOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/nlus'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: NluRawPayload): Nlu {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name
    this.description = rawPayload.description
    this.botStaff = rawPayload.bot_staff
    this.isProxy = rawPayload.is_proxy
    this.proxyVendor = rawPayload.proxy_vendor
    this.configuration = rawPayload.configuration
    this.integrationConfiguration = rawPayload.integration_configuration
    this.isSetUp = rawPayload.is_set_up
    this.payload = rawPayload.payload
    this.metadata = rawPayload.metadata
    this.links = rawPayload.links

    return this
  }

  public static create (payload: NluRawPayload, universe: Universe, http: Universe['http']): Nlu {
    return new Nlu({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): NluRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      name: this.name,
      description: this.description,
      bot_staff: this.botStaff,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      configuration: this.configuration,
      integration_configuration: this.integrationConfiguration,
      is_set_up: this.isSetUp,
      payload: this.payload,
      metadata: this.metadata,
      links: this.links
    }
  }

  public async init (): Promise<Nlu | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new NluInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Nlus {
  public static endpoint: string = 'api/v0/nlus'
}

export class NluInitializationError extends BaseError {
  public name = 'NluInitializationError'
  constructor (public message: string = 'Could not initialize nlu.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NluInitializationError.prototype)
  }
}

export class NluFetchRemoteError extends BaseError {
  public name = 'NluFetchRemoteError'
  constructor (public message: string = 'Could not get nlu.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NluFetchRemoteError.prototype)
  }
}

export class NlusFetchRemoteError extends BaseError {
  public name = 'NlusFetchRemoteError'
  constructor (public message: string = 'Could not get nlus.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NlusFetchRemoteError.prototype)
  }
}
