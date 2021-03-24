import { EventEmitter } from 'events'
import { Universe } from '../../universe'
import { Feed } from './feed'
import { BaseError } from '../../errors'
import { Message } from '../../messaging/message'

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
  rawPayload?: EventRawPayload
  initialized?: boolean
}

export interface EventRawPayload {
  readonly id?: string
  readonly resource_type?: IEventResourceType | null
  readonly resource?: string
  readonly payload?: Message | object
  readonly created_at?: string
  readonly updated_at?: string
  readonly type?: IEventType | null
  readonly flagged?: boolean
  readonly marked?: boolean
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
}

export interface EventPayload {
  readonly id?: EventRawPayload['id']
  readonly resourceType?: EventRawPayload['resource_type']
  readonly resource?: EventRawPayload['resource']
  readonly payload?: EventRawPayload['payload']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly type?: IEventType | null
  readonly flagged?: EventRawPayload['flagged']
  readonly marked?: EventRawPayload['marked']
  readonly annotations?: EventRawPayload['annotations']
  readonly suggestions?: EventRawPayload['suggestions']
  readonly context?: EventRawPayload['context']
  readonly feed?: EventRawPayload['feed']
}

export class Event extends EventEmitter {
  protected universe: Universe
  protected _feed: Feed
  protected http: Universe['http']
  protected options: EventOptions
  public initialized: boolean

  private readonly endpoint: string
  public id?: string
  public resource?: EventPayload['resource']
  public resourceType?: EventPayload['resourceType']
  public payload?: EventPayload['payload']
  public createdAt?: EventPayload['createdAt']
  public updatedAt?: EventPayload['updatedAt']
  public type?: EventPayload['type']
  public flagged?: EventPayload['flagged']
  public marked?: EventPayload['marked']
  public annotations?: EventPayload['annotations']
  public suggestions?: EventPayload['suggestions']
  public context?: EventPayload['context']
  public feed?: EventPayload['feed']

  static eventTypes = EventTypesEnum

  constructor (options: EventOptions) {
    super()
    this.universe = options.universe
    this._feed = options.feed
    this.endpoint = `${this._feed.id as string}/events`
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  private deserialize (rawPayload: EventRawPayload): Event {
    // NOTE: in order not to trigger potential callers reactivity, we only set the ID if it is not set.
    // in any case the overriding behaviour would be unwanted, but is harder to achieve in a or our TS setup
    if (!this.id) this.id = rawPayload.id
    this.id = rawPayload.id
    this.resource = rawPayload.resource
    this.resourceType = rawPayload.resource_type
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.type = rawPayload.type
    this.marked = rawPayload.marked
    this.flagged = rawPayload.flagged
    this.annotations = rawPayload.annotations
    this.suggestions = rawPayload.suggestions
    this.context = rawPayload.context

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

  public static create (payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Event {
    return new Event({ rawPayload: payload, universe, http, initialized: true, feed })
  }

  public static createUninitialized (payload: EventRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Event {
    return new Event({ rawPayload: payload, universe, http, initialized: false, feed })
  }

  public serialize (): EventRawPayload {
    return {
      id: this.id,
      resource: this.resource,
      resource_type: this.resourceType,
      payload: this.payload,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      type: this.type,
      flagged: this.flagged,
      marked: this.marked,
      annotations: this.annotations,
      suggestions: this.suggestions,
      context: this.context,
      feed: this.feed
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

  public async fetch (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventFetchRemoteError(undefined, { error: err }))
    }
  }

  public async mark (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/mark`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventMarkRemoteError(undefined, { error: err }))
    }
  }

  public async unmark (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/unmark`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventUnmarkRemoteError(undefined, { error: err }))
    }
  }

  public async flag (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/flag`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventUnarkRemoteError(undefined, { error: err }))
    }
  }

  public async unflag (): Promise<Event | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id as string}/unflag`)

      this.deserialize(res.data.data[0] as EventRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new EventUnflagRemoteError(undefined, { error: err }))
    }
  }

  private handleError (err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
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
