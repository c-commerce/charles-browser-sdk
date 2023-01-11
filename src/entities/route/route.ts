
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface RouteOptions extends UniverseEntityOptions {
  rawPayload?: RouteRawPayload
}

export interface RouteRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string | null
  readonly description?: string | null
  readonly topic?: string | null
  readonly logic?: null | object
  readonly effect?: null | object
  readonly kind?: null | string
  readonly labels?: null | {
    [key: string]: any
  }
}

export interface RoutePayload {
  readonly id?: RouteRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: RouteRawPayload['deleted']
  readonly active?: RouteRawPayload['active']
  readonly name?: RouteRawPayload['name']
  readonly description?: RouteRawPayload['description']
  readonly topic?: RouteRawPayload['topic']
  readonly logic?: RouteRawPayload['logic']
  readonly effect?: RouteRawPayload['effect']
  readonly kind?: RouteRawPayload['kind']
  readonly labels?: RouteRawPayload['labels']
}

/**
 * Manage routes.
 *
 * @category Entity
 */
export class Route extends UniverseEntity<RoutePayload, RouteRawPayload> {
  public get entityName (): string {
    return 'route'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: RouteOptions
  public initialized: boolean

  public endpoint: string

  public id?: RoutePayload['id']
  public createdAt?: RoutePayload['createdAt']
  public updatedAt?: RoutePayload['updatedAt']
  public deleted?: RoutePayload['deleted']
  public active?: RoutePayload['active']
  public name?: RoutePayload['name']
  public description?: RoutePayload['description']
  public topic?: RoutePayload['topic']
  public logic?: RoutePayload['logic']
  public effect?: RoutePayload['effect']
  public kind?: RoutePayload['kind']
  public labels?: RoutePayload['labels']

  constructor (options: RouteOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/routes'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: RouteRawPayload): Route {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.description = rawPayload.description
    this.topic = rawPayload.topic
    this.logic = rawPayload.logic
    this.effect = rawPayload.effect
    this.kind = rawPayload.kind
    this.labels = rawPayload.labels

    return this
  }

  public static create (payload: RouteRawPayload, universe: Universe, http: Universe['http']): Route {
    return new Route({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): RouteRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      description: this.description,
      topic: this.topic,
      logic: this.logic,
      effect: this.effect,
      kind: this.kind,
      labels: this.labels
    }
  }

  public async init (): Promise<Route | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new RouteInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Routes {
  public static endpoint: string = 'api/v0/routes'
}

export class RouteInitializationError extends BaseError {
  public name = 'RouteInitializationError'
  constructor (public message: string = 'Could not initialize route.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, RouteInitializationError.prototype)
  }
}

export class RouteFetchRemoteError extends BaseError {
  public name = 'RouteFetchRemoteError'
  constructor (public message: string = 'Could not get route.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, RouteFetchRemoteError.prototype)
  }
}

export class RoutesFetchRemoteError extends BaseError {
  public name = 'RoutesFetchRemoteError'
  constructor (public message: string = 'Could not get routes.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, RoutesFetchRemoteError.prototype)
  }
}
