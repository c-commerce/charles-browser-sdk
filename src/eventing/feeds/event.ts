import { Universe } from '../../universe'
import { Feed, FEED_ENDPOINT } from './feed'
import { BaseError } from '../../errors'
import { Message } from '../../messaging/message'
import { UniverseEntity } from '../../entities/_base'
import { RealtimeClient } from 'src/realtime'

export enum EventTypesEnum {
  resource = 'resource',
  followUp = 'follow_up',
  personFeedbackPending = 'person:feedback_pending',
  conversationCompleted = 'conversation:completed',
  agentView = 'agent:view'
}

export type IEventType = 'resource'
| 'follow_up'
| 'person:feedback_pending'
| 'conversation:completed'
| 'agent:view'

export enum EventResourcesTypesEnum {
  message = 'message',
  merge = 'merge',
  order = 'order',
  cart = 'cart'
}

export type IEventResourceType = EventResourcesTypesEnum.message | EventResourcesTypesEnum.merge | EventResourcesTypesEnum.order | EventResourcesTypesEnum.cart

export interface EventOptions {
  universe: Universe
  feed: Feed
  http: Universe['http']
  mqtt: RealtimeClient
  rawPayload?: EventRawPayload
  initialized?: boolean
}

export interface EventRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly resource_type?: IEventResourceType | null
  readonly resource?: string
  readonly payload?: Message | object
  readonly type?: IEventType | null
  readonly flagged?: boolean
  readonly marked?: boolean
  readonly archived?: boolean
  readonly annotations?: {
    language?: {
      language?: string | null
      confidence?: number | null
      vectors?: Array<{
        language?: string | null
        confidence?: number | null
      }> | null
      payload?: {
        cld3?: any
        cld2?: any
        langdetect?: any
        fasttext?: any
      } | null
    } | null
  } | null
  readonly suggestions?: object | null
  readonly context?: string | object | null
  readonly feed?: string
  readonly data?: object
}

export interface EventPayload {
  readonly id?: EventRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: EventRawPayload['deleted']
  readonly active?: EventRawPayload['active']
  readonly resourceType?: EventRawPayload['resource_type']
  readonly resource?: EventRawPayload['resource']
  readonly payload?: EventRawPayload['payload']
  readonly type?: IEventType | null
  readonly flagged?: EventRawPayload['flagged']
  readonly marked?: EventRawPayload['marked']
  readonly archived?: EventRawPayload['archived']
  readonly annotations?: EventRawPayload['annotations']
  readonly suggestions?: EventRawPayload['suggestions']
  readonly context?: EventRawPayload['context']
  readonly feed?: EventRawPayload['feed']
  readonly data?: EventRawPayload['data']
}

export class Event extends UniverseEntity<EventPayload, EventRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected _feed: Feed
  protected http: Universe['http']
  protected mqtt: RealtimeClient
  protected options: EventOptions
  public initialized: boolean

  public endpoint: string
  public id?: string
  public createdAt?: EventPayload['createdAt']
  public updatedAt?: EventPayload['updatedAt']
  public active?: EventPayload['active']
  public deleted?: EventPayload['deleted']

  public resource?: EventPayload['resource']
  public resourceType?: EventPayload['resourceType']
  public payload?: EventPayload['payload']
  public type?: EventPayload['type']
  public flagged?: EventPayload['flagged']
  public marked?: EventPayload['marked']
  public archived?: EventPayload['archived']
  public annotations?: EventPayload['annotations']
  public suggestions?: EventPayload['suggestions']
  public context?: EventPayload['context']
  public feed?: EventPayload['feed']
  public data?: EventPayload['data']

  static eventTypes = EventTypesEnum

  constructor (options: EventOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this._feed = options.feed
    this.endpoint = `${FEED_ENDPOINT}/${this._feed.id as string}/events`
    this.http = options.http
    this.mqtt = options.mqtt
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: EventRawPayload): Event {
    // NOTE: in order not to trigger potential callers reactivity, we only set the ID if it is not set.
    // in any case the overriding behaviour would be unwanted, but is harder to achieve in a or our TS setup
    if (!this.id) this.id = rawPayload.id
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.resource = rawPayload.resource
    this.resourceType = rawPayload.resource_type
    this.type = rawPayload.type
    this.marked = rawPayload.marked
    this.flagged = rawPayload.flagged
    this.archived = rawPayload.archived
    this.annotations = rawPayload.annotations
    this.suggestions = rawPayload.suggestions
    this.context = rawPayload.context
    this.data = rawPayload.data

    // we will store the feed id on this property, in case an event is initialized without a feed context
    this.feed = rawPayload.feed

    // for the time being we are trying not to override existing data if the remote is not sending any
    // e.g. in special calls
    if (this.payload && !rawPayload.payload) {
      // no-op
    } else {
      this.payload = rawPayload.payload
    }

    return this
  }

  public static create (payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): Event {
    return new Event({ rawPayload: payload, universe, http, mqtt, initialized: true, feed })
  }

  public static createUninitialized (payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): Event {
    return new Event({ rawPayload: payload, universe, http, mqtt, initialized: false, feed })
  }

  public serialize (): EventRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      resource: this.resource,
      resource_type: this.resourceType,
      payload: this.payload,
      type: this.type,
      flagged: this.flagged,
      marked: this.marked,
      archived: this.archived,
      annotations: this.annotations,
      suggestions: this.suggestions,
      context: this.context,
      feed: this.feed,
      data: this.data
    }
  }

  public async init (): Promise<Event | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new EventInitializationError(undefined, { error: err }))
    }
  }

  public async mark (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().post(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/mark`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventMarkRemoteError(undefined, { error: err }))
    }
  }

  public async unmark (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().post(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/unmark`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventUnmarkRemoteError(undefined, { error: err }))
    }
  }

  public async flag (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().post(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/flag`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventUnarkRemoteError(undefined, { error: err }))
    }
  }

  public async unflag (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().post(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/unflag`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventUnflagRemoteError(undefined, { error: err }))
    }
  }

  public async archive (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().post(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/archive`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventArchiveRemoteError(undefined, { error: err }))
    }
  }

  public async unarchive (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().post(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/unarchive`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventUnarchiveRemoteError(undefined, { error: err }))
    }
  }
}

export class EventInitializationError extends BaseError {
  public name = 'EventInitializationError'
  constructor (public message: string = 'Could not initialize event.', properties?: any) {
    super(message, properties)
  }
}

export class EventFetchRemoteError extends BaseError {
  public name = 'EventFetchRemoteError'
  constructor (public message: string = 'Could not get event.', properties?: any) {
    super(message, properties)
  }
}

export class EventMarkRemoteError extends BaseError {
  public name = 'EventMarkRemoteError'
  constructor (public message: string = 'Could not mark event.', properties?: any) {
    super(message, properties)
  }
}

export class EventArchiveRemoteError extends BaseError {
  public name = 'EventArchiveRemoteError'
  constructor (public message: string = 'Could not archive event.', properties?: any) {
    super(message, properties)
  }
}

export class EventUnmarkRemoteError extends BaseError {
  public name = 'EventUnmarkRemoteError'
  constructor (public message: string = 'Could not unmark event.', properties?: any) {
    super(message, properties)
  }
}

export class EventUnarkRemoteError extends BaseError {
  public name = 'EventUnarkRemoteError'
  constructor (public message: string = 'Could not flag event.', properties?: any) {
    super(message, properties)
  }
}

export class EventUnflagRemoteError extends BaseError {
  public name = 'EventUnflagRemoteError'
  constructor (public message: string = 'Could not unflag event.', properties?: any) {
    super(message, properties)
  }
}

export class EventUnarchiveRemoteError extends BaseError {
  public name = 'EventUnarchiveRemoteError'
  constructor (public message: string = 'Could not unarchive event.', properties?: any) {
    super(message, properties)
  }
}
