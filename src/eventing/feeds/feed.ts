import { EventEmitter } from 'events'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { Reply, Message, MessageRawPayload, MessageReplyContentOptions, ReplyResponse } from '../../messaging/message'
import { Event, EventRawPayload } from './event'

export interface FeedOptions {
  universe: Universe
  http: Universe['http']
  rawPayload?: FeedRawPayload
  initialized?: boolean
}

export interface FeedRawPayload {
  readonly id?: string
  readonly participants?: string[]
  readonly agents?: string[]
  readonly parents?: string[]
  readonly active?: boolean
  readonly deleted?: boolean
  readonly created_at?: string
  readonly updated_at?: string
}

export type FeedlatestEventsRawPayload = EventRawPayload[]
export type FeedEventsRawPayload = EventRawPayload[]

export interface FeedPayload {
  readonly id?: string
  readonly participants?: string[]
  readonly agents?: string[]
  readonly parents?: string[]
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
}

export interface FeedEventKV {
  eventId: Event['id'] | string
  event: Event
}

export type FeedEventsMap = Map<Event['id'], Event>

export class Feed extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: FeedOptions
  public initialized: boolean

  private static endpoint: string = 'api/v0/feeds'
  private eventsMap: FeedEventsMap = new Map()

  public id?: string
  public participants?: string[]
  public agents?: string[]
  public parents?: string[]
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public deleted?: boolean
  public active?: boolean

  constructor(options: FeedOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  private deserialize(rawPayload: FeedRawPayload): Feed {
    this.id = rawPayload.id
    this.participants = rawPayload.participants
    this.agents = rawPayload.agents
    this.parents = rawPayload.parents
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active

    return this
  }

  public static create(payload: FeedRawPayload, universe: Universe, http: Universe['http']): Feed {
    return new Feed({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized(payload: FeedRawPayload, universe: Universe, http: Universe['http']): Feed {
    return new Feed({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize(): FeedRawPayload {
    return {
      id: this.id,
      participants: this.participants,
      agents: this.agents,
      parents: this.parents,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active
    }
  }

  public reply(contentOptions: FeedReplyContentOptions): FeedReply {
    return new FeedReply({
      feed: this,
      http: this.http,
      universe: this.universe,
      rawPayload: {
        ...contentOptions
      },
      ...contentOptions
    })
  }

  public async init(): Promise<Feed | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new FeedInitializationError(undefined, { error: err }))
    }
  }

  public async fetch(): Promise<Feed | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${Feed.endpoint}/${this.id}`)

      this.deserialize(res.data.data[0] as FeedRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new FeedFetchRemoteError(undefined, { error: err }))
    }
  }

  public async fetchLatestEvents(): Promise<Event[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${Feed.endpoint}/${this.id}/events/latest`)

      const events = res.data.data as FeedlatestEventsRawPayload

      events.forEach((eventRaw: EventRawPayload) => {
        const e = Event.create(eventRaw, this, this.universe, this.http)
        this.eventsMap.set(e.id, e)
      })

      return Array.from(this.eventsMap.values())
    } catch (err) {
      throw this.handleError(new FeedFetchLatestEventsRemoteError(undefined, { error: err }))
    }
  }

  public async fetchEvents(): Promise<Event[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${Feed.endpoint}/${this.id}/events`)

      const events = res.data.data as FeedEventsRawPayload

      events.forEach((eventRaw: EventRawPayload) => {
        const e = Event.create(eventRaw, this, this.universe, this.http)
        this.eventsMap.set(e.id, e)
      })

      return Array.from(this.eventsMap.values())
    } catch (err) {
      throw this.handleError(new FeedFetchEventsRemoteError(undefined, { error: err }))
    }
  }

  public events(): Array<Event> {
    return Array.from(this.eventsMap.values())
  }

  public getEventsMap(): Feed['eventsMap'] {
    return this.eventsMap
  }

  private handleError(err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
  }
}

export interface FeedReplyContentOptions extends MessageReplyContentOptions {

}

export interface FeedReplyResponse extends ReplyResponse {

}

export interface FeedReplyOptions {
  feed: Feed
  universe: Universe
  http: Universe['http']
  rawPayload?: MessageRawPayload
}

export class FeedReply {
  private feed: Feed
  private universe: Universe
  private http: Universe['http']

  public content: Reply['content']
  public contentType: Reply['contentType']

  constructor(options: FeedReplyOptions) {
    this.feed = options.feed
    this.universe = options.universe
    this.http = options.http
  }

  public async send(): Promise<FeedReplyResponse | undefined> {
    try {
      const res = await this.http?.getClient().post(`${this.universe.universeBase}${this.feed.id}`, {
        content: this.content
      })
      return res.data.data[0] as FeedReplyResponse
    } catch (err) {
      throw new FeedReplyError(undefined, { error: err })
    }
  }
}

export class FeedReplyError extends BaseError {
  public name = 'FeedReplyError'
  constructor(
    public message: string = 'Could not send feed reply unexpectedly.',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class FeedInitializationError extends BaseError {
  public name = 'FeedInitializationError'
  constructor(public message: string = 'Could not initialize feed.', properties?: any) {
    super(message, properties)
  }
}

export class FeedFetchRemoteError extends BaseError {
  public name = 'FeedFetchRemoteError'
  constructor(public message: string = 'Could not get feed.', properties?: any) {
    super(message, properties)
  }
}

export class FeedFetchLatestEventsRemoteError extends BaseError {
  public name = 'FeedFetchLatestEventsRemoteError'
  constructor(public message: string = 'Could not get latest feed events.', properties?: any) {
    super(message, properties)
  }
}

export class FeedFetchEventsRemoteError extends BaseError {
  public name = 'FeedFetchEventsRemoteError'
  constructor(public message: string = 'Could not get feed events.', properties?: any) {
    super(message, properties)
  }
}
