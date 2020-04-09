
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface MessageTemplateOptions extends EntityOptions {
  rawPayload?: MessageTemplateRawPayload
}

export interface MessageTemplateRawPayloadAttachment {
  type: 'image' | 'document' | string
  // NOTE: the API is capable of digesting any mime type, however both messaging platforms and UIs are not.
  // This likely means that the "group" of types that is denoted by "type" is likely what implementers are after.
  mime_type?: string
  payload: string | null | object
}

export interface MessageTemplateRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly is_proxy?: boolean
  readonly approved?: boolean
  readonly name?: string
  readonly comment?: string
  readonly proxy_vendor?: string
  readonly content?: {
    body?: string | null
    attachments?: MessageTemplateRawPayloadAttachment[] | null
    i18n: {
      locale: string
      body?: string
      attachments?: MessageTemplateRawPayloadAttachment[]
    }[] | null
  } | null
  readonly configuration?: object
  readonly payload?: object
  readonly metadata?: object
}

export interface MessageTemplatePayload {
  readonly id?: MessageTemplateRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: MessageTemplateRawPayload['deleted']
  readonly active?: MessageTemplateRawPayload['active']
  readonly isProxy?: MessageTemplateRawPayload['is_proxy']
  readonly approved?: MessageTemplateRawPayload['approved']
  readonly name?: MessageTemplateRawPayload['name']
  readonly comment?: MessageTemplateRawPayload['comment']
  readonly proxyVendor?: MessageTemplateRawPayload['proxy_vendor']
  readonly content?: MessageTemplateRawPayload['content']
  readonly configuration?: MessageTemplateRawPayload['configuration']
  readonly payload?: MessageTemplateRawPayload['payload']
  readonly metadata?: MessageTemplateRawPayload['metadata']
}

/**
 * Manage messagetemplates.
 *
 * @category Entity
 */
export class MessageTemplate extends Entity<MessageTemplatePayload, MessageTemplateRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: MessageTemplateOptions
  public initialized: boolean
  public endpoint: string

  public id?: MessageTemplatePayload['id']
  public createdAt?: MessageTemplatePayload['createdAt']
  public updatedAt?: MessageTemplatePayload['updatedAt']
  public deleted?: MessageTemplatePayload['deleted']
  public active?: MessageTemplatePayload['active']
  public isProxy?: MessageTemplatePayload['isProxy']
  public approved?: MessageTemplatePayload['approved']
  public name?: MessageTemplatePayload['name']
  public comment?: MessageTemplatePayload['comment']
  public proxyVendor?: MessageTemplatePayload['proxyVendor']
  public content?: MessageTemplatePayload['content']
  public configuration?: MessageTemplatePayload['configuration']
  public payload?: MessageTemplatePayload['payload']
  public metadata?: MessageTemplatePayload['metadata']

  constructor(options: MessageTemplateOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/message_templates'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: MessageTemplateRawPayload): MessageTemplate {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted || false
    this.active = rawPayload.active || true
    this.isProxy = rawPayload.is_proxy
    this.approved = rawPayload.approved
    this.name = rawPayload.name
    this.comment = rawPayload.comment
    this.proxyVendor = rawPayload.proxy_vendor
    this.content = rawPayload.content
    this.configuration = rawPayload.configuration
    this.payload = rawPayload.payload
    this.metadata = rawPayload.metadata

    return this
  }

  public static create (payload: MessageTemplateRawPayload, universe: Universe, http: Universe['http']): MessageTemplate {
    return new MessageTemplate({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): MessageTemplateRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted || false,
      active: this.active || true,
      is_proxy: this.isProxy,
      approved: this.approved,
      name: this.name,
      comment: this.comment,
      proxy_vendor: this.proxyVendor,
      content: this.content,
      configuration: this.configuration,
      payload: this.payload,
      metadata: this.metadata
    }
  }

  public async init (): Promise<MessageTemplate | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new MessageTemplateInitializationError(undefined, { error: err }))
    }
  }
}

export class MessageTemplates {
  public static endpoint: string = 'api/v0/message_templates'
}

export class MessageTemplateInitializationError extends BaseError {
  public name = 'MessageTemplateInitializationError'
  constructor(public message: string = 'Could not initialize messagetemplate.', properties?: any) {
    super(message, properties)
  }
}

export class MessageTemplateFetchRemoteError extends BaseError {
  public name = 'MessageTemplateFetchRemoteError'
  constructor(public message: string = 'Could not get messagetemplate.', properties?: any) {
    super(message, properties)
  }
}

export class MessageTemplatesFetchRemoteError extends BaseError {
  public name = 'MessageTemplatesFetchRemoteError'
  constructor(public message: string = 'Could not get messagetemplates.', properties?: any) {
    super(message, properties)
  }
}
