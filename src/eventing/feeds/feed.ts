import { EventEmitter } from 'events'
import { Universe } from '../../universe'
import universeTopics from '../../universe/topics'
import * as realtime from '../../realtime'
import { BaseError } from '../../errors'
import {
  Reply, Message, MessageRawPayload,
  MessageRawPayloadAttachment, MessageReplyContentOptions, ReplyResponse, ReplyOptions
} from '../../messaging/message'
import { Asset, Assets } from '../../entities/asset'
import { Event, EventRawPayload } from './event'

export interface FeedOptions {
  universe: Universe
  http: Universe['http']
  mqtt: Universe['mqtt']
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
  readonly latest_activity_at?: string
  readonly updated_at?: string
  readonly top_latest_events?: EventRawPayload[]
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
  readonly latestActivityAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly topLatestEvents?: Event[]
}

export interface FeedEventKV {
  eventId: Event['id'] | string
  event: Event
}

export type FeedEventsMap = Map<Event['id'], Event>

export declare interface Feed {
  on(event: 'raw-error' | 'error', cb: (error: Error) => void): this
  on(event: 'feed:message' | string, cb: Function): this
}

export class Feed extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected mqtt?: Universe['mqtt']
  protected options: FeedOptions
  public initialized: boolean

  public static endpoint: string = 'api/v0/feeds'
  private eventsMap: FeedEventsMap = new Map()

  public id?: string
  public participants?: string[]
  public agents?: string[]
  public parents?: string[]
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public latestActivityAt?: Date | null
  public deleted?: boolean
  public active?: boolean
  public topLatestEvents?: FeedPayload['topLatestEvents']

  constructor(options: FeedOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.mqtt = options.mqtt
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  private deserialize(rawPayload: FeedRawPayload): Feed {
    // NOTE: in order not to trigger potential callers reactivity, we only set the ID if it is not set.
    // in any case the overriding behaviour would be unwanted, but is harder to achieve in a or our TS setup
    if (!this.id) this.id = rawPayload.id
    this.participants = rawPayload.participants
    this.agents = rawPayload.agents
    this.parents = rawPayload.parents
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.latestActivityAt = rawPayload.latest_activity_at ? new Date(rawPayload.latest_activity_at) : undefined
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active

    // we will only inject latest events, but never override it in false data scenarios. Note: this is
    // due to the API not sending virtual properties on a hard contract, but us not wanting to affect embedding
    // application state very eagerly. Also note: the API will anyhow implement uniformity as much as it can.
    // The ossues arose in clients sharing the Feed[] state and making subequent calls, such as .init() on a Feed instance,
    // leaving them with some undefined data and possible re-renders
    if (Array.isArray(rawPayload.top_latest_events)) {
      this.topLatestEvents = rawPayload.top_latest_events.map((item: EventRawPayload) => (Event.create(item, this, this.universe, this.http)))
    } else if (!rawPayload.top_latest_events && !Array.isArray(this.topLatestEvents)) {
      this.topLatestEvents = undefined
    } // ELSE no-op, meaning we keep what we got

    return this
  }

  public static create(payload: FeedRawPayload, universe: Universe, http: Universe['http'], mqtt: Universe['mqtt']): Feed {
    return new Feed({ rawPayload: payload, universe, http, mqtt, initialized: true })
  }

  public static createUninitialized(payload: FeedRawPayload, universe: Universe, http: Universe['http'], mqtt: Universe['mqtt']): Feed {
    return new Feed({ rawPayload: payload, universe, http, mqtt, initialized: false })
  }

  public serialize(): FeedRawPayload {
    return {
      id: this.id,
      participants: this.participants,
      agents: this.agents,
      parents: this.parents,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      latest_activity_at: this.latestActivityAt ? this.latestActivityAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active,
      top_latest_events: Array.isArray(this.topLatestEvents) ? this.topLatestEvents.map((item: Event) => (item.serialize())) : undefined
    }
  }

  public reply(contentOptions: FeedReplyContentOptions): FeedReply {
    return new FeedReply({
      feed: this,
      http: this.http,
      universe: this.universe,
      rawPayload: {
        content: contentOptions.content
      },
      rawAssets: contentOptions.rawAssets,
      ...contentOptions
    })
  }

  public async init(): Promise<Feed | undefined> {
    try {
      await this.fetch()

      this.mqtt?.on('message', (msg) => {
        this.handleMessage(msg)
      })

      this.subscibeDefaults()

      return this
    } catch (err) {
      throw this.handleError(new FeedInitializationError(undefined, { error: err }))
    }
  }

  public deinitialize(): void {
    this.removeAllListeners()
  }

  private subscibeDefaults() {
    this.getMqttClient()
      .subscribe([
        universeTopics.api.feedMessages.generateTopic(this.serialize())
      ])
  }

  /**
   * Safe access the mqtt client. This has a conequence that all the methods that use it need to be aware that they might throw.
   */
  private getMqttClient(): realtime.RealtimeClient {
    if (this.mqtt) return this.mqtt

    throw new realtime.UninstantiatedRealtimeClient()
  }

  /**
   *
   * Parsing and routing logic is being handled here.
   */
  private handleMessage(msg: realtime.RealtimeMessage | realtime.RealtimeMessageMessage) {
    // NOTE: we are also receiving all other messages, but we do not emit them. This is a srtrong fan-out
    if (universeTopics.api.feedMessages.isTopic(msg.topic, this.serialize())) {
      let message
      if ((msg as realtime.RealtimeMessageMessage).payload.message) {
        message = Message.deserialize((msg as realtime.RealtimeMessageMessage).payload.message as MessageRawPayload, this.universe, this.http, this)
      }

      this.emit('feed:message', { ...msg, message, feed: this })
      return
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

export class Feeds {
  public static endpoint: string = 'api/v0/feeds'
}

export interface FeedReplyContentOptions extends MessageReplyContentOptions {

}

export interface FeedReplyResponse extends ReplyResponse {

}

export interface FeedReplyOptions extends ReplyOptions {
  feed: Feed
  universe: Universe
  http: Universe['http']
  rawPayload?: MessageRawPayload
  rawAssets?: FormData
}

export class FeedReply {
  protected feed: Feed
  private universe: Universe
  private http: Universe['http']
  private options?: FeedReplyOptions

  public content: Reply['content']
  public contentType: Reply['contentType']
  public rawAssets?: FormData

  constructor(options: FeedReplyOptions) {
    this.options = options
    this.feed = options.feed
    this.universe = options.universe
    this.http = options.http
    this.content = options.content
    this.rawAssets = options.rawAssets
    // this.contentType = options.contentType
  }

  protected async prepareSendWithAssets(payload: FormData): Promise<Asset[] | undefined> {
    try {
      const assetsHandler = new Assets({
        http: this.http,
        universe: this.universe
      })

      const data = await assetsHandler.post(payload)

      return data
    } catch (err) {
      throw err
    }
  }

  public async send(): Promise<FeedReplyResponse | undefined> {
    try {
      let additonalAttachments
      if (this.rawAssets) {
        const assets = await this.prepareSendWithAssets(this.rawAssets)
        if (Array.isArray(assets)) {
          additonalAttachments = assets.map((item: Asset) => {
            return {
              // TODO: move this to mime type, when the API catches up
              type: 'image',
              payload: item.uri
            } as MessageRawPayloadAttachment
          }) as MessageRawPayloadAttachment[]
        }
      }

      let attachments
      if (additonalAttachments && this.content && Array.isArray(this.content.attachments)) {
        attachments = [...this.content.attachments, ...additonalAttachments]
      } else if (this.content && !Array.isArray(this.content.attachments) && additonalAttachments) {
        attachments = additonalAttachments
      } else if (this.content && Array.isArray(this.content.attachments)) {
        attachments = this.content.attachments
      }

      if (this.content && attachments) {
        this.content.attachments = attachments
      }

      const res = await this.http?.getClient().post(`${this.universe.universeBase}/${Feed.endpoint}/${this.feed.id}/reply`, {
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

export class FeedsFetchRemoteError extends BaseError {
  public name = 'FeedsFetchRemoteError'
  constructor(public message: string = 'Could not get feeds.', properties?: any) {
    super(message, properties)
  }
}
