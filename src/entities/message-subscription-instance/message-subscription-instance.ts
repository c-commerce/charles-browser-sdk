
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface MessageSubscriptionInstanceOptions extends UniverseEntityOptions {
  rawPayload?: MessageSubscriptionInstanceRawPayload
}

export interface MessageSubscriptionInstanceRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly topic?: string
  readonly message_subscription?: string
  readonly channel_user?: string
  readonly person?: string
  readonly status?: string
  readonly date?: Date
  readonly event_route?: string
}

export interface MessageSubscriptionInstancePayload {
  readonly id?: MessageSubscriptionInstanceRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: MessageSubscriptionInstanceRawPayload['deleted']
  readonly active?: MessageSubscriptionInstanceRawPayload['active']

  readonly topic?: MessageSubscriptionInstanceRawPayload['topic']
  readonly messageSubscription?: MessageSubscriptionInstanceRawPayload['message_subscription']
  readonly channelUser?: MessageSubscriptionInstanceRawPayload['channel_user']
  readonly person?: MessageSubscriptionInstanceRawPayload['person']
  readonly status?: MessageSubscriptionInstanceRawPayload['status']
  readonly date?: MessageSubscriptionInstanceRawPayload['date']
  readonly eventRoute?: MessageSubscriptionInstanceRawPayload['event_route']
}

/**
 * Manage message_subscription_instances.
 *
 * @category Entity
 */
export class MessageSubscriptionInstance extends UniverseEntity<MessageSubscriptionInstancePayload, MessageSubscriptionInstanceRawPayload> {
  public get entityName (): string {
    return 'message_subscription_instance'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: MessageSubscriptionInstanceOptions
  public initialized: boolean

  public endpoint: string

  public id?: MessageSubscriptionInstancePayload['id']
  public createdAt?: MessageSubscriptionInstancePayload['createdAt']
  public updatedAt?: MessageSubscriptionInstancePayload['updatedAt']
  public deleted?: MessageSubscriptionInstancePayload['deleted']
  public active?: MessageSubscriptionInstancePayload['active']

  public topic?: MessageSubscriptionInstancePayload['topic']
  public messageSubscription?: MessageSubscriptionInstancePayload['messageSubscription']
  public channelUser?: MessageSubscriptionInstancePayload['channelUser']
  public person?: MessageSubscriptionInstancePayload['person']
  public status?: MessageSubscriptionInstancePayload['status']
  public date?: MessageSubscriptionInstancePayload['date']
  public eventRoute?: MessageSubscriptionInstancePayload['eventRoute']

  constructor (options: MessageSubscriptionInstanceOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/message_subscription_instances'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: MessageSubscriptionInstanceRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.topic = rawPayload.topic
    this.messageSubscription = rawPayload.message_subscription
    this.channelUser = rawPayload.channel_user
    this.person = rawPayload.person
    this.status = rawPayload.status
    this.date = rawPayload.date
    this.eventRoute = rawPayload.event_route

    return this
  }

  public static create (payload: MessageSubscriptionInstanceRawPayload, universe: Universe, http: Universe['http']): MessageSubscriptionInstance {
    return new MessageSubscriptionInstance({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): MessageSubscriptionInstanceRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      topic: this.topic,
      message_subscription: this.messageSubscription,
      channel_user: this.channelUser,
      person: this.person,
      status: this.status,
      date: this.date,
      event_route: this.eventRoute
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new MessageSubscriptionInstanceInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageSubscriptionInstances {
  public static endpoint: string = 'api/v0/message_subscription_instances'
}

export class MessageSubscriptionInstanceInitializationError extends BaseError {
  public name = 'MessageSubscriptionInstanceInitializationError'
  constructor (public message: string = 'Could not initialize message_subscription_instance.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionInstanceInitializationError.prototype)
  }
}

export class MessageSubscriptionInstanceFetchRemoteError extends BaseError {
  public name = 'MessageSubscriptionInstanceFetchRemoteError'
  constructor (public message: string = 'Could not get message_subscription_instance.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionInstanceFetchRemoteError.prototype)
  }
}

export class MessageSubscriptionInstancesFetchRemoteError extends BaseError {
  public name = 'MessageSubscriptionInstancesFetchRemoteError'
  constructor (public message: string = 'Could not get message_subscription_instances.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionInstancesFetchRemoteError.prototype)
  }
}
export class MessageSubscriptionInstanceGetAllRemoteError extends BaseError {
  public name = 'MessageSubscriptionInstanceGetAllRemoteError'
  constructor (public message: string = 'Could not get all message_subscription_instances for message subscription', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionInstanceGetAllRemoteError.prototype)
  }
}
