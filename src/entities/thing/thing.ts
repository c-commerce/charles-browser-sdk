
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ThingOptions extends UniverseEntityOptions {
  rawPayload?: ThingRawPayload
}

export interface ThingRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly kind?: null | 'StaffMobileDevice' | 'StaffBrowserDevice' | string
  readonly name?: string | null
  readonly configuration?: null | {
    [key: string]: any
  }
  readonly groups?: string[] | null
  readonly labels?: null | {
    [key: string]: any
  }
  readonly auto_disconnect?: boolean
  readonly last_activity_at?: string
}

export interface ThingPayload {
  readonly id?: ThingRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ThingRawPayload['deleted']
  readonly active?: ThingRawPayload['active']
  readonly kind?: ThingRawPayload['kind']
  readonly name?: ThingRawPayload['name']
  readonly configuration?: ThingRawPayload['configuration']
  readonly groups?: ThingRawPayload['groups']
  readonly labels?: ThingRawPayload['labels']
  readonly autoDisconnect?: ThingRawPayload['auto_disconnect']
  readonly lastActivityAt?: Date | null
}

/**
 * Manage things.
 *
 * @category Entity
 */
export class Thing extends UniverseEntity<ThingPayload, ThingRawPayload> {
  public get entityName (): string {
    return 'things'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ThingOptions
  public initialized: boolean

  public endpoint: string

  public id?: ThingPayload['id']
  public createdAt?: ThingPayload['createdAt']
  public updatedAt?: ThingPayload['updatedAt']
  public deleted?: ThingPayload['deleted']
  public active?: ThingPayload['active']
  public kind?: ThingPayload['kind']
  public name?: ThingPayload['name']
  public configuration?: ThingPayload['configuration']
  public groups?: ThingPayload['groups']
  public labels?: ThingPayload['labels']
  public autoDisconnect?: ThingPayload['autoDisconnect']
  public lastActivityAt?: ThingPayload['lastActivityAt']

  constructor (options: ThingOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/things'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ThingRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.kind = rawPayload.kind
    this.name = rawPayload.name
    this.configuration = rawPayload.configuration
    this.groups = rawPayload.groups
    this.labels = rawPayload.labels
    this.autoDisconnect = rawPayload.auto_disconnect ?? false
    this.lastActivityAt = rawPayload.last_activity_at ? new Date(rawPayload.last_activity_at) : undefined

    return this
  }

  public static create (payload: ThingRawPayload, universe: Universe, http: Universe['http']): Thing {
    return new Thing({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ThingRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      kind: this.kind,
      name: this.name,
      configuration: this.configuration,
      groups: this.groups,
      labels: this.labels,
      auto_disconnect: this.autoDisconnect ?? false,
      last_activity_at: this.lastActivityAt ? this.lastActivityAt.toISOString() : undefined
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ThingInitializationError(undefined, { error: err }))
    }
  }

  /**
   * Create update a thing.
   */
  public async bind (payload?: ThingRawPayload): Promise<Thing> {
    return await this._bind(payload)
  }

  /**
   * @ignore
   */
  protected async _bind (payload?: ThingRawPayload): Promise<Thing> {
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe?.universeBase}/${this.endpoint}/bind`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: {
          ...(payload ?? this._rawPayload),
          // ensure id not to be set, as we are upserting and would also hit schema validation
          id: undefined
        },
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as ThingRawPayload)

      return this
    } catch (err) {
      throw new ThingsBindRemoteError(undefined, { error: err })
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Things {
  public static endpoint: string = 'api/v0/things'
}

export class ThingInitializationError extends BaseError {
  public name = 'ThingInitializationError'
  constructor (public message: string = 'Could not initialize thing.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ThingInitializationError.prototype)
  }
}

export class ThingFetchRemoteError extends BaseError {
  public name = 'ThingFetchRemoteError'
  constructor (public message: string = 'Could not get thing.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ThingFetchRemoteError.prototype)
  }
}

export class ThingsFetchRemoteError extends BaseError {
  public name = 'ThingsFetchRemoteError'
  constructor (public message: string = 'Could not get things.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ThingsFetchRemoteError.prototype)
  }
}

export class ThingsBindRemoteError extends BaseError {
  public name = 'ThingsBindRemoteError'
  constructor (public message: string = 'Could not bind thing unexpectedly.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ThingsBindRemoteError.prototype)
  }
}
