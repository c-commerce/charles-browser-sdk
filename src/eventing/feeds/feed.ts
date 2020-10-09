import typeOf from 'just-typeof'
import { Universe, UniverseFetchOptions } from '../../universe'
import universeTopics from '../../universe/topics'
import * as realtime from '../../realtime'
import { BaseError } from '../../errors'
import {
  Reply, Message, MessageRawPayload,
  MessageRawPayloadAttachment, MessageReplyContentOptions, ReplyResponse, ReplyOptions
} from '../../messaging/message'
import { Asset, Assets } from '../../entities/asset'
import { Person, PersonRawPayload } from '../../entities/person'
import { StaffRawPayload } from '../../entities/staff'
import { Event, EventRawPayload, IEventType, IEventResourceType } from './event'
import { Comment, CommentRawPayload } from './comment'
import Entity, { EntitiesList, EntityFetchOptions } from '../../entities/_base'

export interface FeedOptions {
  universe: Universe
  http: Universe['http']
  mqtt: Universe['mqtt']
  rawPayload?: FeedRawPayload
  initialized?: boolean
}

export const FEED_ENDPOINT: string = 'api/v0/feeds'

export interface FeedRawPayload {
  readonly id?: string
  readonly participants?: Array<string | PersonRawPayload>
  readonly agents?: string[]
  readonly parents?: string[]
  readonly active?: boolean
  readonly deleted?: boolean
  readonly hidden?: boolean
  readonly open?: boolean
  readonly answered?: boolean
  readonly created_at?: string
  readonly latest_activity_at?: string
  readonly updated_at?: string
  readonly top_latest_events?: EventRawPayload[]
  readonly top_latest_messages?: EventRawPayload[]
}

export type FeedlatestEventsRawPayload = EventRawPayload[]
export type FeedEventsRawPayload = EventRawPayload[]

export interface FeedPayload {
  readonly id?: string
  readonly participants?: Array<string | Person>
  readonly agents?: string[]
  readonly parents?: string[]
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly latestActivityAt?: Date | null
  readonly deleted?: boolean
  readonly hidden?: boolean
  readonly open?: boolean
  readonly answered?: boolean
  readonly active?: boolean
  readonly topLatestEvents?: Event[]
  readonly topLatestMessages?: Event[]
}

export interface FeedEventKV {
  eventId: Event['id'] | string
  event: Event
}

export type FeedEventsMap = Map<Event['id'], Event>

interface FeedEventFromAgentBase {
  user: string
  staff: StaffRawPayload['id']
  feed: FeedRawPayload['id']
}

export type FeedPresencePayload = FeedEventFromAgentBase;
export type FeedTypingPayload = FeedEventFromAgentBase;

export declare interface Feed {
  on(event: 'raw-error' | 'error', cb: (error: Error) => void): this
  on(
    event:
    'feed:message' // receive messages in the current scope of this feed
    | 'feed:event' // receive events in the current scope of this feed
    | 'feed:presence' // receive precence events in the current scope of this feed
    | 'feed:typing' // receive typing events in the current scope of this feed
    | 'feed:message:status' // receive message status change events in the current scope of this feed
    | string,
    cb: Function): this
}

export class Feed extends Entity<FeedPayload, FeedRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected mqtt?: Universe['mqtt']
  protected options: FeedOptions
  public initialized: boolean

  public endpoint: string
  private readonly eventsMap: FeedEventsMap = new Map()

  protected _rawPayload?: FeedPayload | null = null

  public id?: string
  public participants?: FeedPayload['participants']
  public agents?: string[]
  public parents?: string[]
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public latestActivityAt?: Date | null
  public deleted?: boolean
  public hidden?: boolean
  public open?: boolean
  public answered?: boolean
  public active?: boolean
  public topLatestEvents?: FeedPayload['topLatestEvents']
  public topLatestMessages?: FeedPayload['topLatestMessages']

  constructor (options: FeedOptions) {
    super()
    this.universe = options.universe
    this.endpoint = FEED_ENDPOINT
    this.http = options.http
    this.mqtt = options.mqtt
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: FeedRawPayload): Feed {
    // NOTE: in order not to trigger potential callers reactivity, we only set the ID if it is not set.
    // in any case the overriding behaviour would be unwanted, but is harder to achieve in a or our TS setup
    if (!this.id) this.id = rawPayload.id

    this.setRawPayload(rawPayload)

    this.agents = rawPayload.agents
    this.parents = rawPayload.parents
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.latestActivityAt = rawPayload.latest_activity_at ? new Date(rawPayload.latest_activity_at) : undefined
    this.deleted = rawPayload.deleted
    this.hidden = rawPayload.hidden
    this.open = rawPayload.open
    this.answered = rawPayload.answered
    this.active = rawPayload.active

    if (Array.isArray(rawPayload.participants)) {
      // NOTE: casting here and a runtime check seems an ugly hack. At the time of writing no
      // better solution was available
      this.participants = rawPayload.participants.map((item: string | PersonRawPayload) => {
        if (typeOf(item) === 'object') {
          return Person.create(item as PersonRawPayload, this.universe, this.http)
        }
        return item as string
      })
    } else if (!rawPayload.participants && !Array.isArray(this.topLatestEvents)) {
      this.participants = undefined
    }

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

    if (Array.isArray(rawPayload.top_latest_messages)) {
      this.topLatestMessages = rawPayload.top_latest_messages.map((item: EventRawPayload) => (Event.create(item, this, this.universe, this.http)))
    } else if (!rawPayload.top_latest_messages && !Array.isArray(this.topLatestMessages)) {
      this.topLatestMessages = undefined
    } // ELSE no-op, meaning we keep what we got

    return this
  }

  public static create (payload: FeedRawPayload, universe: Universe, http: Universe['http'], mqtt: Universe['mqtt']): Feed {
    return new Feed({ rawPayload: payload, universe, http, mqtt, initialized: true })
  }

  public static createUninitialized (payload: FeedRawPayload, universe: Universe, http: Universe['http'], mqtt: Universe['mqtt']): Feed {
    return new Feed({ rawPayload: payload, universe, http, mqtt, initialized: false })
  }

  public serialize (): FeedRawPayload {
    return {
      id: this.id,
      participants: Array.isArray(this.participants) ? this.participants.map((item: Person | string) => {
        if (typeOf(item) === 'object') {
          return (item as Person).serialize()
        }
        return item as string
      }) : undefined,
      agents: this.agents,
      parents: this.parents,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      latest_activity_at: this.latestActivityAt ? this.latestActivityAt.toISOString() : undefined,
      deleted: this.deleted,
      hidden: this.hidden,
      open: this.open,
      active: this.active,
      answered: this.answered,
      top_latest_events: Array.isArray(this.topLatestEvents) ? this.topLatestEvents.map((item: Event) => (item.serialize())) : undefined,
      top_latest_messages: Array.isArray(this.topLatestMessages) ? this.topLatestMessages.map((item: Event) => (item.serialize())) : undefined
    }
  }

  public reply (contentOptions: FeedReplyContentOptions): FeedReply {
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

  public async init (options?: EntityFetchOptions): Promise<Feed | undefined> {
    try {
      await this.fetch(options)

      this.mqtt?.on('message', (msg) => {
        this.handleMessage(msg)
      })

      this.subscibeDefaults()

      return this
    } catch (err) {
      throw this.handleError(new FeedInitializationError(undefined, { error: err }))
    }
  }

  private get defaultSubscriptions (): string[] {
    return [
      universeTopics.api.feedMessages.generateTopic(this.serialize()),
      universeTopics.api.feedEvents.generateTopic(this.serialize()),
      universeTopics.api.feedTyping.generateTopic(this.serialize()),
      universeTopics.api.feedPresence.generateTopic(this.serialize()),
      universeTopics.api.feedMessagesStatus.generateTopic(this.serialize())
    ]
  }

  public deinitialize (): void {
    this.removeAllListeners()
    this.getMqttClient().unsubscribe(this.defaultSubscriptions)
  }

  private subscibeDefaults (): void {
    this.getMqttClient()
      .subscribe(this.defaultSubscriptions)
  }

  /**
   * Safe access the mqtt client. This has a conequence that all the methods that use it need to be aware that they might throw.
   */
  private getMqttClient (): realtime.RealtimeClient {
    if (this.mqtt) return this.mqtt

    throw new realtime.UninstantiatedRealtimeClient()
  }

  /**
   *
   * Parsing and routing logic is being handled here.
   */
  private handleMessage (msg: realtime.RealtimeMessage | realtime.RealtimeMessageMessage): void {
    // NOTE: we are also receiving all other messages, but we do not emit them. This is a srtrong fan-out
    if (universeTopics.api.feedMessagesStatus.isTopic(msg.topic, this.serialize())) {
      let message
      if ((msg as realtime.RealtimeMessageMessage).payload.message) {
        message = Message.deserialize((msg as realtime.RealtimeMessageMessage).payload.message as MessageRawPayload, this.universe, this.http, this)
      }

      this.emit('feed:message:status', { ...msg, message, feed: this })
      return
    }
    // TODO: when reviewing the .isTopic implementation, you'll see that a greedy regex is not what we want, as e.g. feedMessagesStatus
    // will otherwise be fanned out. Due to backwards compat we did not eagerly refactor.
    if (universeTopics.api.feedMessages.isTopic(msg.topic, this.serialize())) {
      let message
      if ((msg as realtime.RealtimeMessageMessage).payload.message) {
        message = Message.deserialize((msg as realtime.RealtimeMessageMessage).payload.message as MessageRawPayload, this.universe, this.http, this)
      }

      this.emit('feed:message', { ...msg, message, feed: this })
      return
    }

    if (universeTopics.api.feedEvents.isTopic(msg.topic, this.serialize())) {
      let event
      if ((msg as realtime.RealtimeMessageMessage).payload.event) {
        event = Event.create((msg as realtime.RealtimeMessageMessage).payload.event as EventRawPayload, this, this.universe, this.http)
      }

      this.emit('feed:event', { ...msg, event, feed: this })
    }

    if (universeTopics.api.feedPresence.isTopic(msg.topic, this.serialize())) {
      let presence
      if ((msg as realtime.RealtimeMessageMessage).payload.presence) {
        presence = (msg as realtime.RealtimeMessageMessage).payload.presence as FeedPresencePayload
      }
      this.emit('feed:presence', { ...msg, presence, feed: this })
    }

    if (universeTopics.api.feedTyping.isTopic(msg.topic, this.serialize())) {
      let typing
      if ((msg as realtime.RealtimeMessageMessage).payload.typing) {
        typing = (msg as realtime.RealtimeMessageMessage).payload.typing as FeedTypingPayload
      }

      this.emit('feed:typing', { ...msg, typing, feed: this })
    }
  }

  public async fetchLatestEvents (options?: EntityFetchOptions): Promise<Event[] | FeedlatestEventsRawPayload | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/events/latest`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        params: {
          ...(options?.query ? options.query : {})
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const events = res.data.data as FeedlatestEventsRawPayload

      if (options && options.raw === true) {
        return events
      }

      events.forEach((eventRaw: EventRawPayload) => {
        const e = Event.create(eventRaw, this, this.universe, this.http)
        this.eventsMap.set(e.id, e)
      })

      return Array.from(this.eventsMap.values())
    } catch (err) {
      throw this.handleError(new FeedFetchLatestEventsRemoteError(undefined, { error: err }))
    }
  }

  public async fetchEvents (options?: UniverseFetchOptions): Promise<Event[] | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/events`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        params: {
          ...(options?.query ? options.query : {})
        },
        responseType: 'json'
      }
      const res = await this.http.getClient()(opts)
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

  public async createFeedEvent (type: IEventType, resource?: string, resourceType?: IEventResourceType): Promise<Event | undefined> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/events`,
        data: {
          type: type,
          resource: resource ?? undefined,
          resource_type: resourceType ?? undefined
        }
      }
      const res = await this.http.getClient()(opts)

      const event = res.data.data[0] as EventRawPayload

      return Event.create(event, this, this.universe, this.http)
    } catch (err) {
      throw this.handleError(new FeedCreateEventRemoteError(undefined, { error: err }))
    }
  }

  public async createFeedComment (content: object, author?: string): Promise<Comment | undefined> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/comments`,
        data: {
          content,
          author
        }
      }
      const res = await this.http.getClient()(opts)

      const comment = res.data.data[0] as CommentRawPayload

      return Comment.create(comment, this, this.universe, this.http)
    } catch (err) {
      throw this.handleError(new FeedCreateEventRemoteError(undefined, { error: err }))
    }
  }

  public async viewed (): Promise<Event | undefined> {
    return await this.createFeedEvent('agent:view')
  }

  public events (): Event[] {
    return Array.from(this.eventsMap.values())
  }

  public getEventsMap (): Feed['eventsMap'] {
    return this.eventsMap
  }

  public presence (payload: FeedPresencePayload): Feed {
    const id = this.id as string

    const topics = [
      'api/feeds/*/presence',
      `api/feeds/${id}/presence`
    ]

    this.mqtt?.publish(topics, payload)

    return this
  }

  public typing (payload: FeedTypingPayload): Feed {
    const id = this.id as string

    const topics = [
      'api/feeds/*/typing',
      `api/feeds/${id}/typing`
    ]

    this.mqtt?.publish(topics, payload)

    return this
  }
}

export interface FeedsOptions {
  universe: Universe
  http: Universe['http']
  mqtt: Universe['mqtt']
}

export class Feeds extends EntitiesList<Feed, FeedRawPayload> {
  public static endpoint: string = 'api/v0/feeds'
  public endpoint: string = Feeds.endpoint
  protected universe: Universe
  protected http: Universe['http']
  private readonly mqtt?: Universe['mqtt']

  constructor (options: FeedsOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.mqtt = options.mqtt
  }

  protected parseItem (payload: FeedRawPayload): Feed {
    return Feed.create(payload, this.universe, this.http, this.mqtt ?? null)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<Feeds> {
    // TODO: research why getStream result is not assignable
    return (await this._getStream(options)) as Feeds
  }
}

export type FeedReplyContentOptions = MessageReplyContentOptions

export type FeedReplyResponse = ReplyResponse

export interface FeedReplyOptions extends ReplyOptions {
  feed: Feed
  universe: Universe
  http: Universe['http']
  rawPayload?: MessageRawPayload
  rawAssets?: FormData
}

export class FeedReply {
  protected feed: Feed
  private readonly universe: Universe
  private readonly http: Universe['http']
  private readonly options?: FeedReplyOptions

  public content: Reply['content']
  public contentType: Reply['contentType']
  public rawAssets?: FormData

  constructor (options: FeedReplyOptions) {
    this.options = options
    this.feed = options.feed
    this.universe = options.universe
    this.http = options.http
    this.content = options.content
    this.rawAssets = options.rawAssets
    // this.contentType = options.contentType
  }

  protected async prepareSendWithAssets (payload: FormData): Promise<Asset[] | undefined> {
    // eslint-disable-next-line no-useless-catch
    try {
      const assetsHandler: Assets = new Assets({
        http: this.http,
        universe: this.universe
      })

      const data = await assetsHandler.post(payload)

      return data
    } catch (err) {
      throw err
    }
  }

  public async send (): Promise<Event | undefined> {
    try {
      let additonalAttachments
      if (this.rawAssets) {
        const assets = await this.prepareSendWithAssets(this.rawAssets)
        if (Array.isArray(assets)) {
          additonalAttachments = assets.map((item: Asset): MessageRawPayloadAttachment => {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return {
              // TODO: move this to mime type, when the API catches up
              type: 'image',
              payload: item.uri
            } as MessageRawPayloadAttachment
          })
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

      const res = await this.http?.getClient().post(`${this.universe.universeBase}/${FEED_ENDPOINT}/${this.feed.id as string}/reply`, {
        content: this.content
      })
      return Event.create(res.data.data[0], this.feed, this.universe, this.http)
    } catch (err) {
      throw new FeedReplyError(undefined, BaseError.handleCommonProperties(err))
    }
  }
}

export class FeedReplyError extends BaseError {
  public name = 'FeedReplyError'
  constructor (
    public message: string = 'Could not send feed reply unexpectedly.',
    properties?: any
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FeedReplyError.prototype)
  }
}

export class FeedInitializationError extends BaseError {
  public name = 'FeedInitializationError'
  constructor (public message: string = 'Could not initialize feed.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FeedInitializationError.prototype)
  }
}

export class FeedFetchRemoteError extends BaseError {
  public name = 'FeedFetchRemoteError'
  constructor (public message: string = 'Could not get feed.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FeedFetchRemoteError.prototype)
  }
}

export class FeedFetchCountRemoteError extends BaseError {
  public name = 'RemoteError ';
  constructor (public message: string = 'Could not get feed count.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FeedFetchCountRemoteError.prototype)
  }
}

export class FeedFetchLatestEventsRemoteError extends BaseError {
  public name = 'FeedFetchLatestEventsRemoteError'
  constructor (public message: string = 'Could not get latest feed events.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FeedFetchLatestEventsRemoteError.prototype)
  }
}

export class FeedFetchEventsRemoteError extends BaseError {
  public name = 'FeedFetchEventsRemoteError'
  constructor (public message: string = 'Could not get feed events.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FeedFetchEventsRemoteError.prototype)
  }
}

export class FeedCreateEventRemoteError extends BaseError {
  public name = 'FeedCreateEventRemoteError'
  constructor (public message: string = 'Could not create feed event.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FeedCreateEventRemoteError.prototype)
  }
}

export class FeedsFetchRemoteError extends BaseError {
  public name = 'FeedsFetchRemoteError'
  constructor (public message: string = 'Could not get feeds.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FeedsFetchRemoteError.prototype)
  }
}
