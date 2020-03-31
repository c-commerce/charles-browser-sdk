import { EventEmitter } from 'events'
import { Universe } from '../universe'
import { BaseError } from '../errors'
import { Person, PersonRawPayload } from '../entities/person'
import { Assets, Asset, AssetRawPayload, AssetsPostError } from '../entities/asset/asset'
import { FeedRawPayload, Feed } from '../eventing/feeds'
import { Event } from '../eventing/feeds/event'

export interface MessageOptions {
  universe: Universe
  http: Universe['http']
  rawPayload?: MessageRawPayload
  feed?: Feed
}

export interface MessageRawPayloadAttachment {
  type: 'image' | 'document' | string
  // NOTE: the API is capable of digesting any mime type, however both messaging platforms and UIs are not.
  // This likely means that the "group" of types that is denoted by "type" is likely what implementers are after.
  mime_type?: string
  payload: string | null | object
}

export interface MessageRawPayload {
  readonly id?: string
  readonly source_type?: string
  readonly source_api?: string
  readonly tz?: string
  readonly date?: string
  readonly content_type?: 'text' | 'mixed'
  readonly content?: {
    body?: string | null
    attachments?: MessageRawPayloadAttachment[]
  }
  readonly external_reference_id?: string
  readonly external_person_reference_id?: string
  readonly external_channel_reference_id?: string
  readonly raw_message?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly raw_payload?: string
  readonly broker?: string
  readonly deleted?: string
  readonly is_processed?: string
  readonly processed_data?: string
  readonly replyables?: {
    reply_to_message?: {
      deadline: string | null
      type: 'http' | string | null
      options: {
        method: 'POST' | string
        uri: 'string'
      }
    },
    reply_to_feed?: {
      deadline: string | null
      type: 'http' | string | null
      options: {
        method: 'POST' | string
        uri: 'string'
      }
    }
  },
  readonly person?: PersonRawPayload['id']
  readonly feed?: FeedRawPayload['id']
}

export interface MessagePayload {
  readonly id?: string
  readonly sourceType?: string
  readonly sourceApi?: string
  readonly tz?: string
  readonly date?: Date | null
  readonly contentType?: MessageRawPayload['content_type']
  readonly content?: MessageRawPayload['content']
  readonly externalReferenceId?: string
  readonly externalPersonReferenceId?: string
  readonly externalChannelReferenceId?: string
  readonly rawMessage?: string
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly rawPayload?: string
  readonly broker?: string
  readonly deleted?: string
  readonly isProcessed?: string
  readonly processedData?: string
  readonly replyables?: MessageRawPayload['replyables'] | null
  readonly person?: Person
  readonly feed?: Feed
}

export interface Message extends MessagePayload {

}

export class Message extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: MessageOptions

  public readonly id?: string
  public readonly sourceType?: string
  public readonly sourceApi?: string
  public readonly tz?: string
  public readonly date?: Date | null
  public contentType?: MessageRawPayload['content_type']
  public content?: MessageRawPayload['content']
  public readonly externalReferenceId?: string
  public readonly externalPersonReferenceId?: string
  public readonly externalChannelReferenceId?: string
  public readonly rawMessage?: string
  public readonly createdAt?: Date | null
  public readonly updatedAt?: Date | null
  public readonly rawPayload?: string
  public readonly broker?: string
  public readonly deleted?: string
  public readonly isProcessed?: string
  public readonly processedData?: string
  public readonly replyables?: MessageRawPayload['replyables']
  public readonly person?: Person
  public readonly feed?: Feed

  constructor(options: MessageOptions) {
    super()
    this.universe = options.universe
    this.http = options.http
    this.options = options

    if (options && options.rawPayload) {
      this.id = options.rawPayload.id
      this.sourceType = options.rawPayload.source_type
      this.sourceApi = options.rawPayload.source_api
      this.tz = options.rawPayload.tz
      this.date = options.rawPayload.date ? new Date(options.rawPayload.date) : null
      this.contentType = options.rawPayload.content_type
      this.content = options.rawPayload.content
      this.externalReferenceId = options.rawPayload.external_reference_id
      this.externalPersonReferenceId = options.rawPayload.external_person_reference_id
      this.externalChannelReferenceId = options.rawPayload.external_channel_reference_id
      this.rawMessage = options.rawPayload.raw_message
      this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : null
      this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : null
      this.rawPayload = options.rawPayload.raw_payload
      this.broker = options.rawPayload.broker
      this.deleted = options.rawPayload.deleted
      this.isProcessed = options.rawPayload.is_processed
      this.processedData = options.rawPayload.processed_data
      this.replyables = options.rawPayload.replyables
      this.person = options.rawPayload.person ? Person.create({ id: options.rawPayload.person }, this.universe, this.http) : undefined

      if (options.feed) {
        this.feed = options.feed
      } else if (options.rawPayload.feed) {
        this.feed = {
          id: options.rawPayload.feed
        } as Feed
      } else {
        this.feed = undefined
      }
    }
  }

  public static deserialize(payload: MessageRawPayload, universe: Universe, http: Universe['http'], feed?: Feed): Message {
    return new Message({ rawPayload: payload, universe, http, feed })
  }

  public serialize(): MessageRawPayload {
    return {
      id: this.id,
      source_type: this.sourceType,
      source_api: this.sourceApi,
      tz: this.tz,
      date: this.date ? this.date.toISOString() : undefined,
      content_type: this.contentType,
      content: this.content,
      external_reference_id: this.externalReferenceId,
      external_person_reference_id: this.externalPersonReferenceId,
      external_channel_reference_id: this.externalChannelReferenceId,
      raw_message: this.rawMessage,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      raw_payload: this.rawPayload,
      broker: this.broker,
      deleted: this.deleted,
      is_processed: this.isProcessed,
      processed_data: this.processedData,
      replyables: this.replyables,
      person: this.person ? this.person.id : undefined,
      feed: this.feed ? this.feed.id : undefined
    }
  }

  public reply(contentOptions: MessageReplyContentOptions): MessageReply {
    return new MessageReply({
      message: this,
      http: this.http,
      universe: this.universe,
      rawPayload: {
        content: contentOptions.content
      },
      ...contentOptions
    })
  }

  public replyFeed(contentOptions: MessageReplyContentOptions): MessageFeedReply {
    return new MessageFeedReply({
      message: this,
      http: this.http,
      universe: this.universe,
      rawPayload: {
        content: contentOptions.content
      },
      ...contentOptions
    })
  }

  private handleError(err: Error) {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }
}

export interface MessageReplyContentOptions {
  content: MessagePayload['content']
  rawAssets?: FormData
}

export interface ReplyOptions extends MessageOptions, MessageReplyContentOptions { }

export interface MessageReplyOptions extends ReplyOptions {
  message: Message
  rawAssets?: FormData
}

export interface ReplyResponse extends MessageRawPayload {

}

export class Reply extends Message {
  constructor(options: ReplyOptions) {
    super(options)
  }

  protected async prepareSendWithAssets(payload: FormData): Promise<Asset[] | undefined> {
    try {
      const assetsHandler = new Assets({
        http: this.options.http,
        universe: this.options.universe
      })

      const data = await assetsHandler.post(payload)

      return data
    } catch (err) {
      throw err
    }
  }
}

export class MessageReply extends Reply {
  private message: Message
  private rawAssets?: FormData

  constructor(options: MessageReplyOptions) {
    super(options)

    this.message = options.message
    this.rawAssets = options.rawAssets
  }

  public async send(): Promise<Event | ReplyResponse | undefined> {
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

      const res = await this.http?.getClient().post(`${this.universe.universeBase}${this.message.replyables?.reply_to_message?.options.uri}`, {
        content: {
          ...this.content
        }
      })

      if (this.feed) {
        return Event.create(res.data.data[0], this.feed, this.universe, this.http)
      }

      return res.data.data[0] as ReplyResponse
    } catch (err) {
      throw new MessagesReplyError(undefined, { error: err })
    }
  }
}

export class MessageFeedReply extends Reply {
  private message: Message
  private rawAssets?: FormData

  constructor(options: MessageReplyOptions) {
    super(options)

    this.message = options.message
    this.rawAssets = options.rawAssets
  }

  public async send(): Promise<ReplyResponse | undefined> {
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

      const res = await this.http?.getClient().post(`${this.universe.universeBase}${this.message.replyables?.reply_to_feed?.options.uri}`, {
        content: {
          ...this.content
        }
      })
      return res.data.data[0] as ReplyResponse
    } catch (err) {
      throw new MessagesReplyError(undefined, { error: err })
    }
  }
}

export class MessagesReplyError extends BaseError {
  public name = 'MessagesReplyError'
  constructor(
    public message: string = 'Could not send reply unexpectedly.',
    properties?: any
  ) {
    super(message, properties)
  }
}
