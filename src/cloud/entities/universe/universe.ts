
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'

export interface CloudUniverseOptions extends EntityOptions {
  rawPayload?: CloudUniverseRawPayload
}

export interface CloudUniverseRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string | null
}

export interface CloudUniversePayload {
  readonly id?: CloudUniverseRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: CloudUniverseRawPayload['name']
}

/**
 * Manage CloudUniverses.
 *
 * @category Entity
 */
export class CloudUniverse extends Entity<CloudUniversePayload, CloudUniverseRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: CloudUniverseOptions
  public initialized: boolean

  public endpoint: string

  public id?: CloudUniversePayload['id']
  public createdAt?: CloudUniversePayload['createdAt']
  public updatedAt?: CloudUniversePayload['updatedAt']
  public deleted?: CloudUniversePayload['deleted']
  public active?: CloudUniversePayload['active']
  public type?: CloudUniversePayload['type']
  public value?: CloudUniversePayload['value']
  public name?: CloudUniversePayload['name']
  public i18n?: CloudUniversePayload['i18n']

  constructor (options: CloudUniverseOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/CloudUniverses'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CloudUniverseRawPayload): CloudUniverse {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.type = rawPayload.type
    this.value = rawPayload.value
    this.name = rawPayload.name
    this.i18n = rawPayload.i18n

    return this
  }

  public static create (payload: CloudUniverseRawPayload, universe: Universe, http: Universe['http']): CloudUniverse {
    return new CloudUniverse({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): CloudUniverseRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      type: this.type,
      value: this.value,
      name: this.name,
      i18n: this.i18n
    }
  }

  public async init (): Promise<CloudUniverse | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new CloudUniverseInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CloudUniverses {
  public static endpoint: string = 'api/v0/CloudUniverses'
}

export class CloudUniverseInitializationError extends BaseError {
  public name = 'CloudUniverseInitializationError'
  constructor (public message: string = 'Could not initialize CloudUniverse.', properties?: any) {
    super(message, properties)
  }
}

export class CloudUniverseFetchRemoteError extends BaseError {
  public name = 'CloudUniverseFetchRemoteError'
  constructor (public message: string = 'Could not get CloudUniverse.', properties?: any) {
    super(message, properties)
  }
}

export class CloudUniversesFetchRemoteError extends BaseError {
  public name = 'CloudUniversesFetchRemoteError'
  constructor (public message: string = 'Could not get CloudUniverses.', properties?: any) {
    super(message, properties)
  }
}
