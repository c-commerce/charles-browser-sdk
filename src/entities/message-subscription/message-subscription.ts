
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface MessageSubscriptionOptions extends UniverseEntityOptions {
  rawPayload?: MessageSubscriptionRawPayload
}

export enum IMessageSubscriptionKindEnum {
  GDPRGenernalCommunicationImplicit = 'GDPRGenernalCommunicationImplicit',
  GDPRGenernalCommunicationExplicit = 'GDPRGenernalCommunicationExplicit',
  OneTimeEventImplicit = 'OneTimeEventImplicit',
  OneTimeEventExplicit = 'OneTimeEventExplicit',
  Generic = 'Generic'
}

export type IMessageSubscriptionKindType = IMessageSubscriptionKindEnum.GDPRGenernalCommunicationImplicit |
IMessageSubscriptionKindEnum.GDPRGenernalCommunicationExplicit |
IMessageSubscriptionKindEnum.OneTimeEventImplicit |
IMessageSubscriptionKindEnum.OneTimeEventExplicit |
IMessageSubscriptionKindEnum.Generic

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
  readonly message_templates?: object
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
      message_templates: this.messageTemplates
    }
  }

  public async init (): Promise<MessageSubscription | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new MessageSubscriptionInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageSubscriptions {
  public static endpoint: string = 'api/v0/message_subscriptions'
}

export class MessageSubscriptionInitializationError extends BaseError {
  public name = 'MessageSubscriptionInitializationError'
  constructor (public message: string = 'Could not initialize message_subscription.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageSubscriptionInitializationError.prototype)
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
