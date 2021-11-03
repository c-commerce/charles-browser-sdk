import { UniverseEntity, UniverseEntityOptions, EntityRawPayload } from '../entities/_base'
import { Universe } from '../universe'
import { BaseError } from '../errors'
import { Person, PersonRawPayload } from '../entities/person'
import { Assets, Asset } from '../entities/asset/asset'
import { FeedRawPayload, Feed } from '../eventing/feeds'
import { Event } from '../eventing/feeds/event'

export interface MessageOptions extends UniverseEntityOptions {
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

export interface MessageStatus {
  date?: any
  status?: 'read' | 'delivered' | 'failed'
  external_person_reference_id?: any
  person?: {
    id?: string
    staff?: string
    user?: string
  } | null
  details?: any
  payload?: any
}

export interface MessageRawPayload extends EntityRawPayload {
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
  readonly message_broker?: string | null
  readonly channel_user?: string | null
  readonly replyables?: {
    reply_to_message?: {
      deadline: string | null
      type: 'http' | string | null
      options: {
        method: 'POST' | string
        uri: 'string'
      }
    }
    reply_to_feed?: {
      deadline: string | null
      type: 'http' | string | null
      options: {
        method: 'POST' | string
        uri: 'string'
      }
    }
  }
  readonly person?: PersonRawPayload['id']
  readonly feed?: FeedRawPayload['id']
  readonly author?: {
    user?: string
    staff?: string
    person?: string
  } | null
  readonly statuses?: MessageStatus[]
  readonly reactions?: Array<{
    // TODO: parse dates
    date?: any
    reaction?: {
      action?: string
      type?: string
      value?: string
      class?: string
    } | null
    external_person_reference_id?: string
    details?: any
    payload?: any
  }>
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
  readonly author?: MessageRawPayload['author']
  readonly messageBroker?: MessageRawPayload['message_broker']
  readonly channelUser?: MessageRawPayload['channel_user']
  readonly statuses?: MessageRawPayload['statuses']
  readonly reactions?: MessageRawPayload['reactions']
  readonly person?: Person
  readonly feed?: Feed
}

// export type Message = MessagePayload

export class Message extends UniverseEntity<MessagePayload, MessageRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: MessageOptions
  public initialized: boolean

  public endpoint: string

  public id?: string
  public sourceType?: string
  public sourceApi?: string
  public tz?: string
  public date?: Date | null
  public contentType?: MessageRawPayload['content_type']
  public content?: MessageRawPayload['content']
  public externalReferenceId?: string
  public externalPersonReferenceId?: string
  public externalChannelReferenceId?: string
  public rawMessage?: string
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public rawPayload?: string
  public broker?: string
  public deleted?: string
  public isProcessed?: string
  public processedData?: string
  public replyables?: MessageRawPayload['replyables']
  public author?: MessageRawPayload['author']
  public messageBroker?: MessagePayload['messageBroker']
  public channelUser?: MessagePayload['channelUser']
  public statuses?: MessagePayload['statuses']
  public reactions?: MessagePayload['reactions']
  public person?: Person
  public feed?: Feed

  constructor (options: MessageOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/messages'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload, options)
    }
  }

  public static deserialize (payload: MessageRawPayload, universe: Universe, http: Universe['http'], feed?: Feed): Message {
    return new Message({ rawPayload: payload, universe, http, feed })
  }

  protected deserialize (rawPayload: MessageRawPayload, options?: MessageOptions): Message {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.sourceType = rawPayload.source_type
    this.sourceApi = rawPayload.source_api
    this.tz = rawPayload.tz
    this.date = rawPayload.date ? new Date(rawPayload.date) : null
    this.contentType = rawPayload.content_type
    this.content = rawPayload.content
    this.externalReferenceId = rawPayload.external_reference_id
    this.externalPersonReferenceId = rawPayload.external_person_reference_id
    this.externalChannelReferenceId = rawPayload.external_channel_reference_id
    this.rawMessage = rawPayload.raw_message
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : null
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : null
    this.rawPayload = rawPayload.raw_payload
    this.broker = rawPayload.broker
    this.deleted = rawPayload.deleted
    this.isProcessed = rawPayload.is_processed
    this.processedData = rawPayload.processed_data
    this.replyables = rawPayload.replyables
    this.author = rawPayload.author
    this.person = rawPayload.person ? Person.create({ id: rawPayload.person }, this.universe, this.http) : undefined
    this.messageBroker = rawPayload.message_broker
    this.channelUser = rawPayload.channel_user
    this.statuses = rawPayload.statuses
    this.reactions = rawPayload.reactions

    // TODO: check if this functionality is still needed or at all wanted. What
    // we likely try to achieve is harmonizing messages from from fetches and MQTT events.
    // However this might lead to subtle bugs, see below...
    if (options?.feed) {
      this.feed = options.feed
    } else if (rawPayload.feed) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      this.feed = {
        id: rawPayload.feed
      } as Feed
    } else {
      this.feed = undefined
    }

    return this
  }

  public static create (payload: MessageRawPayload, universe: Universe, http: Universe['http'], feed?: Feed): Message {
    return new Message({ rawPayload: payload, universe, http, initialized: true, feed })
  }

  public serialize (): MessageRawPayload {
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
      author: this.author,
      message_broker: this.messageBroker,
      channel_user: this.channelUser,
      statuses: this.statuses,
      reactions: this.reactions,
      person: this.person ? this.person.id : undefined,
      // TODO: this likely seems a bug because of the above, associated comment
      feed: this.feed ? this.feed.id : undefined
    }
  }

  public reply (contentOptions: MessageReplyContentOptions): MessageReply {
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

  public replyFeed (contentOptions: MessageReplyContentOptions): MessageFeedReply {
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

  public async init (): Promise<Message | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new MessageInitializationError(undefined, { error: err }))
    }
  }

  public async like (): Promise<Message | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('like requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id}/reactions/like`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as MessageRawPayload)

      return this
    } catch (err) {
      throw new MessageLikeError(undefined, { error: err })
    }
  }

  public async unlike (): Promise<Message | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('unlike requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id}/reactions/unlike`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as MessageRawPayload)

      return this
    } catch (err) {
      throw new MessageUnlikeError(undefined, { error: err })
    }
  }

  public async setStatuses (statuses: MessageStatus[]): Promise<MessageStatus[] | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('setting status requires id to be set.')

    const data: {reads?: MessageStatus[], deliveries?: MessageStatus[]} = {}

    const reads = statuses.filter((item) => (item.status === 'read'))
    if (reads.length) {
      data.reads = reads
    }

    const deliveries = statuses.filter((item) => (item.status === 'delivered' || item.status === 'failed'))
    if (deliveries.length) {
      data.deliveries = deliveries
    }

    try {
      const opts = {
        method: 'POST',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id}/statuses`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      return response.data.data as MessageStatus[]
    } catch (err) {
      throw new MessageSetStatusError(undefined, { error: err })
    }
  }

  public async setStatus (status: MessageStatus): Promise<MessageStatus[] | undefined> {
    return await this.setStatuses([status])
  }
}

export interface MessageReplyContentOptions {
  content: MessagePayload['content']
  rawAssets?: FormData
  causes?: object[] | null
}

export interface ReplyOptions extends MessageOptions, MessageReplyContentOptions { }

export interface MessageReplyOptions extends ReplyOptions {
  message: Message
  rawAssets?: FormData
}

export type ReplyResponse = MessageRawPayload

export class Reply extends Message {
  // constructor (options: ReplyOptions) {
  //   super(options)
  // }

  protected async prepareSendWithAssets (payload: FormData): Promise<Asset[] | undefined> {
    // eslint-disable-next-line no-useless-catch
    try {
      const assetsHandler: Assets = new Assets({
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
  private readonly message: Message
  private readonly rawAssets?: FormData
  private readonly causes?: object[] | null

  constructor (options: MessageReplyOptions) {
    super(options)

    this.message = options.message
    this.rawAssets = options.rawAssets
  }

  public async send (): Promise<Event | ReplyResponse | undefined> {
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

      const res = await this.http?.getClient().post(`${this.universe.universeBase}${this.message.endpoint}/${this.message.id as string}/reply`, {
        content: {
          ...this.content
        },
        causes: this.causes ?? undefined
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
  private readonly message: Message
  private readonly rawAssets?: FormData
  private readonly causes?: object[] | null

  constructor (options: MessageReplyOptions) {
    super(options)

    this.message = options.message
    this.rawAssets = options.rawAssets
    this.causes = options.causes
  }

  public async send (): Promise<ReplyResponse | undefined> {
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

      const res = await this.http?.getClient().post(`${this.universe.universeBase}${this.message.feed?.endpoint as string}/${this.message.feed?.id as string}`, {
        content: {
          ...this.content
        },
        causes: this.causes ?? undefined
      })
      return res.data.data[0] as ReplyResponse
    } catch (err) {
      throw new MessagesReplyError(undefined, { error: err })
    }
  }
}

export class MessagesReplyError extends BaseError {
  public name = 'MessagesReplyError'
  constructor (
    public message: string = 'Could not send reply unexpectedly.',
    properties?: any
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, MessagesReplyError.prototype)
  }
}

export class MessageInitializationError extends BaseError {
  public name = 'MessageInitializationError'
  constructor (public message: string = 'Could not initialize message.', properties?: any) {
    super(message, properties)
  }
}

export class MessageLikeError extends BaseError {
  public name = 'MessageLikeError'
  constructor (public message: string = 'Could not like message.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageInitializationError.prototype)
  }
}

export class MessageUnlikeError extends BaseError {
  public name = 'MessageUnlikeError'
  constructor (public message: string = 'Could not unlike message.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageUnlikeError.prototype)
  }
}

export class MessageSetStatusError extends BaseError {
  public name = 'MessageSetStatusError'
  constructor (public message: string = 'Could not set statuses of message unexpectedly.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSetStatusError.prototype)
  }
}
