
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface DealEventOptions extends EntityOptions {
  rawPayload?: DealEventRawPayload
}

export interface DealEventRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly type?: string
  readonly resource?: string | object
  readonly resource_type?: string
  readonly deal?: string
  readonly author?: string
  readonly proxy_payload?: object
}

export interface DealEventPayload {
  readonly id?: DealEventRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: DealEventRawPayload['deleted']
  readonly active?: DealEventRawPayload['active']

  readonly type?: DealEventRawPayload['type']
  readonly resource?: DealEventRawPayload['resource']
  readonly resourceType?: DealEventRawPayload['resource_type']
  readonly deal?: DealEventRawPayload['deal']
  readonly author?: DealEventRawPayload['author']
  readonly proxyPayload?: DealEventRawPayload['proxy_payload']
}

/**
 * Manage deal_events.
 *
 * @category Entity
 */
export class DealEvent extends Entity<DealEventPayload, DealEventRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: DealEventOptions
  public initialized: boolean

  public endpoint: string

  public id?: DealEventPayload['id']
  public createdAt?: DealEventPayload['createdAt']
  public updatedAt?: DealEventPayload['updatedAt']
  public deleted?: DealEventPayload['deleted']
  public active?: DealEventPayload['active']

  public type?: DealEventPayload['type']
  public resource?: DealEventPayload['resource']
  public resourceType?: DealEventPayload['resourceType']
  public deal?: DealEventPayload['deal']
  public author?: DealEventPayload['author']
  public proxyPayload?: DealEventPayload['proxyPayload']

  constructor (options: DealEventOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.endpoint = ''

    if (options?.rawPayload && options.rawPayload.deal) {
      this.endpoint = `api/v0/deals/${options.rawPayload.deal}/events`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: DealEventRawPayload): DealEvent {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.type = rawPayload.type
    this.resource = rawPayload.resource
    this.resourceType = rawPayload.resource_type
    this.deal = rawPayload.deal
    this.author = rawPayload.author
    this.proxyPayload = rawPayload.proxy_payload

    return this
  }

  public static create (payload: DealEventRawPayload, universe: Universe, http: Universe['http']): DealEvent {
    return new DealEvent({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): DealEventRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      type: this.type,
      resource: this.resource,
      resource_type: this.resourceType,
      deal: this.deal,
      author: this.author,
      proxy_payload: this.proxyPayload
    }
  }

  public async init (): Promise<DealEvent | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new DealEventInitializationError(undefined, { error: err }))
    }
  }
}

export class DealEventInitializationError extends BaseError {
  public name = 'DealEventInitializationError'
  constructor (public message: string = 'Could not initialize deal_event.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealEventInitializationError.prototype)
  }
}

export class DealEventFetchRemoteError extends BaseError {
  public name = 'DealEventFetchRemoteError'
  constructor (public message: string = 'Could not get deal_event.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealEventFetchRemoteError.prototype)
  }
}

export class DealEventsFetchRemoteError extends BaseError {
  public name = 'DealEventsFetchRemoteError'
  constructor (public message: string = 'Could not get deal_events.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealEventsFetchRemoteError.prototype)
  }
}
