import { EventEmitter } from 'events'

export interface MessageOptions {
  rawPayload: MessageRawPayload
}

export interface MessageRawPayload {
  readonly id?: string
  readonly source_type?: string
  readonly source_api?: string
  readonly tz?: string
  readonly date?: Date
  readonly content_type?: string
  readonly content?: string
  readonly external_reference_id?: string
  readonly external_person_reference_id?: string
  readonly external_channel_reference_id?: string
  readonly raw_message?: string
  readonly created_at?: Date
  readonly updated_at?: Date
  readonly raw_payload?: string
  readonly broker?: string
  readonly deleted?: string
  readonly is_processed?: string
  readonly processed_data?: string
  readonly replyables?: string
}

export interface MessagePayload {
  readonly id?: string
  readonly sourceType?: string
  readonly sourceApi?: string
  readonly tz?: string
  readonly date?: Date
  readonly contentType?: string
  readonly content?: string
  readonly externalReferenceId?: string
  readonly externalPersonReferenceId?: string
  readonly externalChannelReferenceId?: string
  readonly rawMessage?: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
  readonly rawPayload?: string
  readonly broker?: string
  readonly deleted?: string
  readonly isProcessed?: string
  readonly processedData?: string
  readonly replyables?: string
}

export interface Message extends MessagePayload {

}

export class Message extends EventEmitter {
  private options?: MessageOptions | null = null

  public readonly id?: string
  public readonly sourceType?: string
  public readonly sourceApi?: string
  public readonly tz?: string
  public readonly date?: Date
  public contentType?: string
  public content?: string
  public readonly externalReferenceId?: string
  public readonly externalPersonReferenceId?: string
  public readonly externalChannelReferenceId?: string
  public readonly rawMessage?: string
  public readonly createdAt?: Date
  public readonly updatedAt?: Date
  public readonly rawPayload?: string
  public readonly broker?: string
  public readonly deleted?: string
  public readonly isProcessed?: string
  public readonly processedData?: string
  public readonly replyables?: string

  constructor(options?: MessageOptions) {
    super()
    this.options = options

    if (options && options.rawPayload) {
      this.id = options.rawPayload.id
      this.sourceType = options.rawPayload.source_type
      this.sourceApi = options.rawPayload.source_api
      this.tz = options.rawPayload.tz
      this.date = options.rawPayload.date
      this.contentType = options.rawPayload.content_type
      this.content = options.rawPayload.content
      this.externalReferenceId = options.rawPayload.external_reference_id
      this.externalPersonReferenceId = options.rawPayload.external_person_reference_id
      this.externalChannelReferenceId = options.rawPayload.external_channel_reference_id
      this.rawMessage = options.rawPayload.raw_message
      this.createdAt = options.rawPayload.created_at
      this.updatedAt = options.rawPayload.updated_at
      this.rawPayload = options.rawPayload.raw_payload
      this.broker = options.rawPayload.broker
      this.deleted = options.rawPayload.deleted
      this.isProcessed = options.rawPayload.is_processed
      this.processedData = options.rawPayload.processed_data
      this.replyables = options.rawPayload.replyables
    }
  }

  public static deserialize(payload: MessageRawPayload): Message {
    const msg = new Message({ rawPayload: payload })

    return msg
  }

  public serialize(): MessageRawPayload {
    return {
      id: this.id,
      source_type: this.sourceType,
      source_api: this.sourceApi,
      tz: this.tz,
      date: this.date,
      content_type: this.contentType,
      content: this.content,
      external_reference_id: this.externalReferenceId,
      external_person_reference_id: this.externalPersonReferenceId,
      external_channel_reference_id: this.externalChannelReferenceId,
      raw_message: this.rawMessage,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      raw_payload: this.rawPayload,
      broker: this.broker,
      deleted: this.deleted,
      is_processed: this.isProcessed,
      processed_data: this.processedData,
      replyables: this.replyables
    }
  }

  private handleError(err: Error) {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }
}
