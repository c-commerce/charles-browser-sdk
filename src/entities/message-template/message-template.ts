
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { Event, EventRawPayload } from '../../eventing/feeds/event'
import qs from 'qs'
import { Feed } from '../../eventing/feeds/feed'

export interface MessageTemplateOptions extends UniverseEntityOptions {
  rawPayload?: MessageTemplateRawPayload
}
export interface MessageTemplateRawPayloadAttachment {
  type: 'image' | 'document' | 'video' | 'audio' | 'asset' | string
  // NOTE: the API is capable of digesting any mime type, however both messaging platforms and UIs are not.
  // This likely means that the "group" of types that is denoted by "type" is likely what implementers are after.
  mime_type?: string
  payload: string | null | object
}

export interface MessageTemplateRawPayloadLocation {
  type?: 'location'
  lat?: number
  lng?: number
  zoom?: number
  name?: string
  address_string?: string
}

export interface MessageTemplateRawPayloadCarouselItemAction {
  type?: 'button' | string
  button_type?: 'postback' | string
  text?: string
  payload?: string
}
export interface MessageTemplateRawPayloadCarouselItem {
  title?: string
  sub_title?: string
  image_url?: string
  actions?: MessageTemplateRawPayloadCarouselItemAction[]
}
export interface MessageTemplateRawPayloadCarousel {
  type?: string
  items?: MessageTemplateRawPayloadCarouselItem[]
}

export interface MessageTemplateRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly is_proxy?: boolean
  // DEPRECATED
  readonly approved?: boolean
  readonly name?: string
  readonly comment?: string
  readonly proxy_vendor?: 'messenger_people' | 'charles_messaging_whatsapp_t' | string | null
  readonly categories?: string[] | null
  readonly content?: {
    // DEPRECATED
    body?: string | null
    // DEPRECATED
    attachments?: MessageTemplateRawPayloadAttachment[] | null
    i18n?: Array<{
      locale?: string
      status?: string
      rejection_reason?: string | null
      body?: string
      header?: {
        type?: 'text' | string | null
        payload?: string | null
      } | null
      footer?: {
        type?: 'text' | null
        payload?: string
      } | null
      attachments?: MessageTemplateRawPayloadAttachment[] | MessageTemplateRawPayloadLocation[] | MessageTemplateRawPayloadCarousel[] | any
      approved?: boolean
      quick_replies?: {
        translate?: boolean
        translation_prepend?: string | null
        translation_append?: string | null
        replies?: Array<{
          type?: 'text' | string | null
          payload?: string | null
          text?: string
          image_url?: string
        }>
      }
    }> | null
  } | null
  readonly configuration?: object
  readonly payload?: object
  readonly metadata?: object
  readonly parameters_template?: {
    type?: 'list' | 'map'
    parameters?: { [key: string]: any } | Array<{
      name?: string
      required?: boolean | null
      order_index?: number
      logic?: object| null
    }>
  } | null
  readonly notification?: boolean
  readonly content_category?: string
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
  readonly categories?: MessageTemplateRawPayload['categories']
  readonly parametersTemplate?: MessageTemplateRawPayload['parameters_template']
  readonly content?: MessageTemplateRawPayload['content']
  readonly configuration?: MessageTemplateRawPayload['configuration']
  readonly payload?: MessageTemplateRawPayload['payload']
  readonly metadata?: MessageTemplateRawPayload['metadata']
  readonly notification?: MessageTemplateRawPayload['notification']
  readonly contentCategory?: MessageTemplateRawPayload['content_category']
}

/**
 * Manage messagetemplates.
 *
 * @category Entity
 */
export class MessageTemplate extends UniverseEntity<MessageTemplatePayload, MessageTemplateRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
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
  public categories?: MessageTemplatePayload['categories']
  public parametersTemplate?: MessageTemplatePayload['parametersTemplate']
  public content?: MessageTemplatePayload['content']
  public configuration?: MessageTemplatePayload['configuration']
  public payload?: MessageTemplatePayload['payload']
  public metadata?: MessageTemplatePayload['metadata']
  public notification?: MessageTemplatePayload['notification']
  public contentCategory?: MessageTemplatePayload['contentCategory']

  constructor (options: MessageTemplateOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/message_templates'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: MessageTemplateRawPayload): MessageTemplate {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.isProxy = rawPayload.is_proxy
    this.approved = rawPayload.approved
    this.name = rawPayload.name
    this.comment = rawPayload.comment
    this.proxyVendor = rawPayload.proxy_vendor
    this.categories = rawPayload.categories
    this.parametersTemplate = rawPayload.parameters_template
    this.content = rawPayload.content
    this.configuration = rawPayload.configuration
    this.payload = rawPayload.payload
    this.metadata = rawPayload.metadata
    this.notification = rawPayload.notification
    this.contentCategory = rawPayload.content_category

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
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      is_proxy: this.isProxy,
      approved: this.approved,
      name: this.name,
      comment: this.comment,
      proxy_vendor: this.proxyVendor,
      categories: this.categories,
      parameters_template: this.parametersTemplate,
      content: this.content,
      configuration: this.configuration,
      payload: this.payload,
      metadata: this.metadata,
      notification: this.notification,
      content_category: this.contentCategory
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

  /**
 * Submit a message template update(notification) to the respective broker
 */
  public async submit (payload: object): Promise<MessageTemplate> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id as string}/submit`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: payload,
        responseType: 'json'
      }
      const res = await this.http.getClient()(opts)
      const resource = res.data.data as MessageTemplateRawPayload
      return MessageTemplate.create(resource, this.universe, this.http)
    } catch (err) {
      throw new MessageTemplateSubmitRemoteError(undefined, { error: err })
    }
  }

  public async preview (language: String, payload?: Object, options?: EntityFetchOptions): Promise<EventRawPayload[]> {
    if (!language) throw new TypeError('message template preview requires language to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/preview${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        data: {
          language,
          ...payload
        }
      }
      const res = await this.http?.getClient()(opts)
      const resources = res.data.data as EventRawPayload[]
      if (options && options.raw === true) {
        return resources
      }

      const _feed = Feed.createUninitialized({ id: resources?.[0]?.feed }, this.universe, this.http, null)

      return resources.map((item: EventRawPayload) => {
        return Event.create(item, _feed, this.universe, this.http)
      })
    } catch (err) {
      throw new MessageTemplatePreviewRemoteError(undefined, { error: err })
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageTemplates {
  public static endpoint: string = 'api/v0/message_templates'
}

export class MessageTemplateInitializationError extends BaseError {
  public name = 'MessageTemplateInitializationError'
  constructor (public message: string = 'Could not initialize messagetemplate.', properties?: any) {
    super(message, properties)
  }
}

export class MessageTemplateFetchRemoteError extends BaseError {
  public name = 'MessageTemplateFetchRemoteError'
  constructor (public message: string = 'Could not get messagetemplate.', properties?: any) {
    super(message, properties)
  }
}

export class MessageTemplatesFetchRemoteError extends BaseError {
  public name = 'MessageTemplatesFetchRemoteError'
  constructor (public message: string = 'Could not get messagetemplates.', properties?: any) {
    super(message, properties)
  }
}
export class MessageTemplateSubmitRemoteError extends BaseError {
  public name = 'MessageTemplateSubmitRemoteError'
  constructor (public message: string = 'Could not submit message template.', properties?: any) {
    super(message, properties)
  }
}
export class MessageTemplatePreviewRemoteError extends BaseError {
  public name = 'MessageTemplatePreviewRemoteError'
  constructor (public message: string = 'Could not preview message template.', properties?: any) {
    super(message, properties)
  }
}
