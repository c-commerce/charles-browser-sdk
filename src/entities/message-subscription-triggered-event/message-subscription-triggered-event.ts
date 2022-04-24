
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface MessageSubscriptionTriggeredEventOptions extends UniverseEntityOptions {
  rawPayload?: MessageSubscriptionTriggeredEventRawPayload
}

export declare interface IMessageSubscriptionTriggeredEventStatus {
  success: null | boolean
  message?: null | string
}

export interface MessageSubscriptionTriggeredEventRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly recipient_name?: string
  readonly status?: IMessageSubscriptionTriggeredEventStatus
  readonly feed?: string
}

export interface MessageSubscriptionTriggeredEventPayload {
  readonly id?: MessageSubscriptionTriggeredEventRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly recipient_name?: MessageSubscriptionTriggeredEventRawPayload['recipient_name']
  readonly status?: MessageSubscriptionTriggeredEventRawPayload['status']
  readonly feed?: MessageSubscriptionTriggeredEventRawPayload['feed']
}

/**
 * Manage message_subscription_triggered_events.
 *
 * @category Entity
 */
export class MessageSubscriptionTriggeredEvent extends UniverseEntity<MessageSubscriptionTriggeredEventPayload, MessageSubscriptionTriggeredEventRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: MessageSubscriptionTriggeredEventOptions
  public initialized: boolean

  public endpoint: string

  public id?: MessageSubscriptionTriggeredEventPayload['id']
  public createdAt?: MessageSubscriptionTriggeredEventPayload['createdAt']
  public updatedAt?: MessageSubscriptionTriggeredEventPayload['updatedAt']
  public recipient_name?: MessageSubscriptionTriggeredEventPayload['recipient_name']
  public status?: MessageSubscriptionTriggeredEventPayload['status']
  public feed?: MessageSubscriptionTriggeredEventPayload['feed']

  constructor (options: MessageSubscriptionTriggeredEventOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/message_subscription_triggered_events'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: MessageSubscriptionTriggeredEventRawPayload): MessageSubscriptionTriggeredEvent {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.recipient_name = rawPayload.recipient_name
    this.status = rawPayload.status
    this.feed = rawPayload.feed

    return this
  }

  public serialize (): MessageSubscriptionTriggeredEventRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      recipient_name: this.recipient_name,
      status: this.status,
      feed: this.feed
    }
  }

  public async init (): Promise<MessageSubscriptionTriggeredEvent> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new MessageSubscriptionTriggeredEventInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageSubscriptionTriggeredEvents {
  public static endpoint: string = 'api/v0/message_subscription_triggered_events'
}

export class MessageSubscriptionTriggeredEventInitializationError extends BaseError {
  public name = 'MessageSubscriptionTriggeredEventInitializationError'
  constructor (public message: string = 'Could not initialize message_subscription_triggered_events.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionTriggeredEventInitializationError.prototype)
  }
}

export class MessageSubscriptionTriggeredEventsFetchRemoteError extends BaseError {
  public name = 'MessageSubscriptionTriggeredEventsFetchRemoteError'
  constructor (public message: string = 'Could not get message_subscription_triggered_events.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionTriggeredEventsFetchRemoteError.prototype)
  }
}
