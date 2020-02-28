import { EventEmitter } from 'events'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { Reply, MessageRawPayload, MessageReplyContentOptions, ReplyResponse } from '../../messaging/message'

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

export class Feed extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: FeedOptions
  public initialized: boolean

  public readonly id?: string
  public readonly participants?: string[]
  public readonly agents?: string[]
  public readonly parents?: string[]
  public readonly createdAt?: Date | null
  public readonly updatedAt?: Date | null
  public readonly deleted?: boolean
  public readonly active?: boolean

  constructor(options: FeedOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.id = options.rawPayload.id
      this.participants = options.rawPayload.participants
      this.agents = options.rawPayload.agents
      this.parents = options.rawPayload.parents
      this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : undefined
      this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : undefined
      this.deleted = options.rawPayload.deleted
      this.active = options.rawPayload.active
    }
  }

  public static deserialize(payload: FeedRawPayload, universe: Universe, http: Universe['http']): Feed {
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

  private handleError(err: Error) {
    if (this.listeners('error').length > 0) this.emit('error', err)
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
