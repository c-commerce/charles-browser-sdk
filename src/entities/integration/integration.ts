
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface IntegrationOptions extends UniverseEntityOptions {
  rawPayload?: IntegrationRawPayload
}

export interface IntegrationRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly vendor?: string
  readonly type?: string
  readonly payload?: {
    [key: string]: any
  }
}

export interface AvailableIntegrationRawPayload {
  readonly name?: string
  readonly summary?: string
  readonly icon?: string
  readonly schema?: {
    $id: string
    type: 'object'
  }
  readonly ui_schema?: Array<{
    component: string
    fieldOptions: {
      [key: string]: any
    }
    children: Array<{
      [key: string]: any
    }>
  }>
  readonly setup_endpoint?: string
}

export interface IntegrationPayload {
  readonly id?: IntegrationRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: IntegrationRawPayload['deleted']
  readonly active?: IntegrationRawPayload['active']
  readonly vendor?: IntegrationRawPayload['vendor']
  readonly type?: IntegrationRawPayload['type']
  readonly payload?: IntegrationRawPayload['payload']
}

/**
 * Manage integrations.
 *
 * @category Entity
 */
export class Integration extends UniverseEntity<IntegrationPayload, IntegrationRawPayload> {
  public get entityName (): string {
    return 'integrations'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: IntegrationOptions
  public initialized: boolean

  public endpoint: string

  public id?: IntegrationPayload['id']
  public createdAt?: IntegrationPayload['createdAt']
  public updatedAt?: IntegrationPayload['updatedAt']
  public deleted?: IntegrationPayload['deleted']
  public active?: IntegrationPayload['active']
  public vendor?: IntegrationPayload['vendor']
  public type?: IntegrationPayload['type']
  public payload?: IntegrationPayload['payload']

  constructor (options: IntegrationOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/integrations'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: IntegrationRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.vendor = rawPayload.vendor
    this.type = rawPayload.type
    this.payload = rawPayload.payload

    return this
  }

  public static create (payload: IntegrationRawPayload, universe: Universe, http: Universe['http']): Integration {
    return new Integration({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): IntegrationRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      vendor: this.vendor,
      type: this.type,
      payload: this.payload
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new IntegrationInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Integrations {
  public static endpoint: string = 'api/v0/integrations'
}

export class IntegrationInitializationError extends BaseError {
  public name = 'IntegrationInitializationError'
  constructor (public message: string = 'Could not initialize integration.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationInitializationError.prototype)
  }
}

export class IntegrationFetchRemoteError extends BaseError {
  public name = 'IntegrationFetchRemoteError'
  constructor (public message: string = 'Could not get integration.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationFetchRemoteError.prototype)
  }
}

export class IntegrationsFetchRemoteError extends BaseError {
  public name = 'IntegrationsFetchRemoteError'
  constructor (public message: string = 'Could not get integrations.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationsFetchRemoteError.prototype)
  }
}

export class AvailableIntegrationsFetchRemoteError extends BaseError {
  public name = 'AvailableIntegrationsFetchRemoteError'
  constructor (public message: string = 'Could not get available integrations.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AvailableIntegrationsFetchRemoteError.prototype)
  }
}
export class IntegrationsSetupRemoteError extends BaseError {
  public name = 'IntegrationsSetupRemoteError'
  constructor (public message: string = 'Could not setup vendor integration.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationsSetupRemoteError.prototype)
  }
}
