
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions, EntitiesList } from '../_base'
import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { BaseError } from '../../errors'
import qs from 'qs'
import { MessageSubscriptionInstance, MessageSubscriptionInstanceGetAllRemoteError, MessageSubscriptionInstanceRawPayload } from '../message-subscription-instance/message-subscription-instance'
import { FeedEventsRawPayload } from 'src/eventing/feeds/feed'

export interface MessageSubscriptionOptions extends UniverseEntityOptions {
  rawPayload?: MessageSubscriptionRawPayload
}

export enum IMessageSubscriptionKindEnum {
  GDPRGenernalCommunicationImplicit = 'GDPRGeneralCommunicationImplicit',
  GDPRGenernalCommunicationExplicit = 'GDPRGeneralCommunicationExplicit',
  OneTimeEventImplicit = 'OneTimeEventImplicit',
  OneTimeEventExplicit = 'OneTimeEventExplicit',
  Generic = 'Generic'
}

export type IMessageSubscriptionKindType = IMessageSubscriptionKindEnum.GDPRGenernalCommunicationImplicit |
IMessageSubscriptionKindEnum.GDPRGenernalCommunicationExplicit |
IMessageSubscriptionKindEnum.OneTimeEventImplicit |
IMessageSubscriptionKindEnum.OneTimeEventExplicit |
IMessageSubscriptionKindEnum.Generic

interface ILogicMatchAnyConfiguration {
  $id: 'api.v0.logic.message.payload.content.body.content.matches_any_string'
  logic: {
    equals_any: [
      {
        var: 'payload.message.content.body'
      },
      string[]
    ]
  }
}

interface ILogicMatchAnyConfigurationWithChannelFilters {
  $id: 'api.v0.logic.message.payload.content.body.content.matches_any_string_and_any_channel'
  logic: {
    and: [
      {
        equals_any: [
          {
            var: 'payload.message.content.body'
          },
          string[]
        ]
      },
      {
        equals_any:
        [
          {
            'var': 'payload.channel_user.source_type'
          },
          string[]
        ]
      }
    ]
  }
}
interface ILogicMatchSubstringConfiguration {
  $id: 'api.v0.logic.message.payload.content.body.content.matches_any_substring'
  logic: {
    contains_any: [
      {
        var: 'payload.message.content.body'
      },
      string[]
    ]
  }
}

interface ILogicMatchSubstringConfigurationWithChannelFilters {
  $id: 'api.v0.logic.message.payload.content.body.content.matches_any_substring_and_any_channel'
  logic: {
    and: [
      {
        contains_any: [
          {
            var: 'payload.message.content.body'
          },
          string[]
        ]
      },
      {
        equals_any:
        [
          {
            'var': 'payload.channel_user.source_type'
          },
          string[]
        ]
      }
    ]
  }
}

export declare type IMessageSubscriptionEventRouteTemplate = {
  kind: 'MessageSubscriptionInstance'
  topic?: never
  topic_template: 'api/feeds/*/incoming_messages/first/message_subscriptions/{{message_subscription.id}}/unsubscribed'
  logic?: null
} | {
  kind: 'MessageSubscriptionInstance'
  topic: 'api/feeds/*/incoming_messages/first/unsubscribed'
  topic_template?: never
  logic?: null
} | {
  kind: 'MessageSubscriptionInstance'
  topic: 'api/feeds/*/messages'
  topic_template?: never
  logic: null | ILogicMatchAnyConfiguration | ILogicMatchSubstringConfiguration | ILogicMatchAnyConfigurationWithChannelFilters | ILogicMatchSubstringConfigurationWithChannelFilters
}

export declare interface IMessageSubscriptionMessagesTemplates {
  consent_request: null | {
    id?: string
  }
  consent_granted_response?: null | {
    id?: string
  }
  consent_denial_response?: null | {
    id?: string
  }
  consent_withdrawal_response?: null | {
    id?: string
    logic?: null | ILogicMatchAnyConfiguration | ILogicMatchSubstringConfiguration | ILogicMatchAnyConfigurationWithChannelFilters | ILogicMatchSubstringConfigurationWithChannelFilters
  }
}

export interface MessageSubscriptionRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly summary?: string
  readonly description?: string
  readonly kind?: IMessageSubscriptionKindType
  readonly scope?: string
  readonly message_templates?: IMessageSubscriptionMessagesTemplates
  readonly event_route_template?: IMessageSubscriptionEventRouteTemplate
  readonly configuration?: {
    skip_feed_reactivation?: boolean
    /**
    * @deprecated auto_close_feed should not be used in favour of auto_close's properties
    */
    auto_close_feed?: boolean
    auto_close?: {
      consent_request?: boolean
      consent_granted_response?: boolean
      consent_denial_response?: boolean
      consent_withdrawal_response?: boolean
    }
    block_optin_resend?: boolean
  }
}

export interface MessageSubscriptionPayload {
  readonly id?: MessageSubscriptionRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: MessageSubscriptionRawPayload['deleted']
  readonly active?: MessageSubscriptionRawPayload['active']

  readonly name?: MessageSubscriptionRawPayload['name']
  readonly summary?: MessageSubscriptionRawPayload['summary']
  readonly description?: MessageSubscriptionRawPayload['description']
  readonly kind?: MessageSubscriptionRawPayload['kind']
  readonly scope?: MessageSubscriptionRawPayload['scope']
  readonly messageTemplates?: MessageSubscriptionRawPayload['message_templates']
  readonly eventRouteTemplate?: MessageSubscriptionRawPayload['event_route_template']
  readonly configuration?: MessageSubscriptionRawPayload['configuration']
}

/**
 * Manage message_subscriptions.
 *
 * @category Entity
 */
export class MessageSubscription extends UniverseEntity<MessageSubscriptionPayload, MessageSubscriptionRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: MessageSubscriptionOptions
  public initialized: boolean

  public endpoint: string

  public id?: MessageSubscriptionPayload['id']
  public createdAt?: MessageSubscriptionPayload['createdAt']
  public updatedAt?: MessageSubscriptionPayload['updatedAt']
  public deleted?: MessageSubscriptionPayload['deleted']
  public active?: MessageSubscriptionPayload['active']

  public name?: MessageSubscriptionPayload['name']
  public summary?: MessageSubscriptionPayload['summary']
  public description?: MessageSubscriptionPayload['description']
  public kind?: MessageSubscriptionPayload['kind']
  public scope?: MessageSubscriptionPayload['scope']
  public messageTemplates?: MessageSubscriptionPayload['messageTemplates']
  public eventRouteTemplate?: MessageSubscriptionPayload['eventRouteTemplate']
  public configuration?: MessageSubscriptionPayload['configuration']

  constructor (options: MessageSubscriptionOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/message_subscriptions'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: MessageSubscriptionRawPayload): MessageSubscription {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name
    this.summary = rawPayload.summary
    this.description = rawPayload.description
    this.kind = rawPayload.kind
    this.scope = rawPayload.scope
    this.messageTemplates = rawPayload.message_templates
    this.eventRouteTemplate = rawPayload.event_route_template
    this.configuration = rawPayload.configuration

    return this
  }

  public static create (payload: MessageSubscriptionRawPayload, universe: Universe, http: Universe['http']): MessageSubscription {
    return new MessageSubscription({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): MessageSubscriptionRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      name: this.name,
      summary: this.summary,
      description: this.description,
      kind: this.kind,
      scope: this.scope,
      message_templates: this.messageTemplates,
      event_route_template: this.eventRouteTemplate,
      configuration: this.configuration
    }
  }

  public async init (): Promise<MessageSubscription> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new MessageSubscriptionInitializationError(undefined, { error: err }))
    }
  }

  /**
 * Get a list of all message subscription subscriber instances
 */
  public async subscribers (options?: EntityFetchOptions): Promise<MessageSubscriptionInstanceRawPayload[]> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id as string}/instances${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const resources = res.data.data as MessageSubscriptionInstanceRawPayload[]
      if (options && options.raw === true) {
        return resources
      }

      return resources.map((item: MessageSubscriptionInstanceRawPayload) => {
        return MessageSubscriptionInstance.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw this.handleError(new MessageSubscriptionInstanceGetAllRemoteError(undefined, { error: err }))
    }
  }

  public async triggeredEvents (options: EntityFetchOptions = {}): Promise<FeedEventsRawPayload> {
    if (this.id === null || this.id === undefined) throw new TypeError('MessageSubscription fetch triggered events requires message subscription id to be set')

    try {
      options.query = { context: { message_subscription: this.id }, ...options.query }

      const opts = {
        method: 'GET',
        url: `${this.universe?.universeBase}/api/v0/messages/${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const resource = res.data.data as FeedEventsRawPayload

      return resource
    } catch (err) {
      throw new MessageSubscriptionsFetchTriggeredEventsRemoteError(undefined, { error: err })
    }
  }

  public async triggeredEventsCount (options: EntityFetchOptions = {}): Promise<{ count: number }> {
    if (this.id === null || this.id === undefined) throw new TypeError('MessageSubscription fetch triggered events count requires message subscription id to be set')

    try {
      options.query = { context: { message_subscription: this.id }, ...options.query }

      const opts = {
        method: 'HEAD',
        url: `${this.universe?.universeBase}/api/v0/messages/${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return {
        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
      }
    } catch (err) {
      throw new MessageSubscriptionsFetchTriggeredEventsCountRemoteError(undefined, { error: err })
    }
  }

  /**
   * @deprecated use unified person.handleMessageSubscription(...) instead
   * @param payload MessageSubscriptionInstanceRawPayload
   */
  async createInstance (payload: MessageSubscriptionInstanceRawPayload): Promise<MessageSubscriptionInstance | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('MessageSubscription create instance requires message subscription id to be set')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/instances`,
        data: payload
      }
      const res = await this.http.getClient()(opts)
      const resource = res.data.data as MessageSubscriptionInstanceRawPayload

      return MessageSubscriptionInstance.create(resource, this.universe, this.http)
    } catch (err) {
      throw new MessageSubscriptionsCreateInstanceRemoteError(undefined, { error: err })
    }
  }
}

export interface NotificationCampaignsOptions {
  universe: Universe
  http: Universe['http']
}
export class MessageSubscriptions extends EntitiesList<MessageSubscription, MessageSubscriptionRawPayload> {
  public static endpoint: string = 'api/v0/message_subscriptions'
  public endpoint: string = MessageSubscriptions.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']

  constructor (options: NotificationCampaignsOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: MessageSubscriptionRawPayload): MessageSubscription {
    return MessageSubscription.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<MessageSubscriptions> {
    return (await this._getStream(options)) as MessageSubscriptions
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }

  public async fetch (options: EntityFetchOptions): Promise<MessageSubscription[] | MessageSubscriptionRawPayload[] | undefined> {
    try {
      return await super.fetch(options)
    } catch (err) {
      throw new MessageSubscriptionsFetchRemoteError(undefined, { error: err })
    }
  }
}

export class MessageSubscriptionInitializationError extends BaseError {
  public name = 'MessageSubscriptionInitializationError'
  constructor (public message: string = 'Could not initialize message_subscription.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionInitializationError.prototype)
  }
}

export class MessageSubscriptionDuplicateError extends BaseError {
  public name = 'MessageSubscriptionDuplicateError'
  constructor (public message: string = 'Could not duplicate message_subscription.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionDuplicateError.prototype)
  }
}

export class MessageSubscriptionFetchRemoteError extends BaseError {
  public name = 'MessageSubscriptionFetchRemoteError'
  constructor (public message: string = 'Could not get message_subscription.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionFetchRemoteError.prototype)
  }
}

export class MessageSubscriptionsFetchRemoteError extends BaseError {
  public name = 'MessageSubscriptionsFetchRemoteError'
  constructor (public message: string = 'Could not get message_subscriptions.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionsFetchRemoteError.prototype)
  }
}

export class MessageSubscriptionsFetchTriggeredEventsRemoteError extends BaseError {
  public name = 'MessageSubscriptionsFetchTriggeredEventsRemoteError'
  constructor (public message: string = 'Could not get message_subscription triggered events.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionsFetchTriggeredEventsRemoteError.prototype)
  }
}

export class MessageSubscriptionsFetchTriggeredEventsCountRemoteError extends BaseError {
  public name = 'MessageSubscriptionsFetchTriggeredEventsCountRemoteError'
  constructor (public message: string = 'Could not get message_subscription triggered events count.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionsFetchTriggeredEventsCountRemoteError.prototype)
  }
}
export class MessageSubscriptionsCreateInstanceRemoteError extends BaseError {
  public name = 'MessageSubscriptionsCreateInstanceRemoteError'
  constructor (public message: string = 'Could not create message_subscription instance', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionsCreateInstanceRemoteError.prototype)
  }
}
