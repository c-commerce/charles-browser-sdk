
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { NotificationCampaign } from './notification-campaign'

export interface StaticEntryOptions extends UniverseEntityOptions {
  rawPayload?: NotificationCampaignStaticEntryRawPayload
}

export interface NotificationCampaignStaticEntryRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly effect?: 'include' | 'exclude'
  readonly resource?: {
    type?: 'person'
    payload?: {
      id?: string
    }
  } | {
    type?: 'channel_user'
    payload?: {
      id?: string
    }
  }| {
    type?: 'external_channel_user'
    payload?: {
      message_broker?: string
      channel_user_external_reference_id?: string
    }
  }
  readonly origin_resource?: {
    type?: 'manual'
  } | {
    type?: 'subscription' | 'list'
    resource?: string
  }
  readonly notification_campaign?: string
  readonly communication_language?: string
  readonly channel_type?: string
  readonly message_broker?: string
}

export interface NotificationCampaignStaticEntryPayload {
  readonly id?: NotificationCampaignStaticEntryRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: NotificationCampaignStaticEntryRawPayload['deleted']
  readonly active?: NotificationCampaignStaticEntryRawPayload['active']

  readonly effect?: NotificationCampaignStaticEntryRawPayload['effect']
  readonly resource?: NotificationCampaignStaticEntryRawPayload['resource']
  readonly originResource?: NotificationCampaignStaticEntryRawPayload['origin_resource']
  readonly notificationCampaign?: NotificationCampaignStaticEntryRawPayload['notification_campaign']
  readonly communicationLanguage?: NotificationCampaignStaticEntryRawPayload['communication_language']
  readonly channelType?: NotificationCampaignStaticEntryRawPayload['channel_type']
  readonly messageBroker?: NotificationCampaignStaticEntryRawPayload['message_broker']

}

/**
 * Manage static_entries.
 *
 * @category Entity
 */
export class NotificationCampaignStaticEntry extends UniverseEntity<NotificationCampaignStaticEntryPayload, NotificationCampaignStaticEntryRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: StaticEntryOptions
  public initialized: boolean

  public endpoint: string

  public id?: NotificationCampaignStaticEntryPayload['id']
  public createdAt?: NotificationCampaignStaticEntryPayload['createdAt']
  public updatedAt?: NotificationCampaignStaticEntryPayload['updatedAt']
  public deleted?: NotificationCampaignStaticEntryPayload['deleted']
  public active?: NotificationCampaignStaticEntryPayload['active']

  public effect?: NotificationCampaignStaticEntryPayload['effect']
  public resource?: NotificationCampaignStaticEntryPayload['resource']
  public originResource?: NotificationCampaignStaticEntryPayload['originResource']
  public noticationCampaign?: NotificationCampaignStaticEntryPayload['notificationCampaign']
  public communicationLanguage?: NotificationCampaignStaticEntryPayload['communicationLanguage']
  public channelType?: NotificationCampaignStaticEntryPayload['channelType']
  public messageBroker?: NotificationCampaignStaticEntryPayload['messageBroker']

  constructor (options: StaticEntryOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = ''
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
    if (options?.rawPayload && options.rawPayload.notification_campaign) {
      this.endpoint = `api/v0/notification_campaigns/${options.rawPayload.notification_campaign}/recipients/static_entries`
    }
  }

  protected deserialize (rawPayload: NotificationCampaignStaticEntryRawPayload): NotificationCampaignStaticEntry {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.effect = rawPayload.effect
    this.resource = rawPayload.resource
    this.originResource = rawPayload.origin_resource
    this.noticationCampaign = rawPayload.notification_campaign
    this.communicationLanguage = rawPayload.communication_language
    this.channelType = rawPayload.channel_type
    this.messageBroker = rawPayload.message_broker

    return this
  }

  public static create (payload: NotificationCampaignStaticEntryRawPayload, universe: Universe, http: Universe['http']): NotificationCampaignStaticEntry {
    return new NotificationCampaignStaticEntry({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): NotificationCampaignStaticEntryRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      effect: this.effect,
      resource: this.resource,
      origin_resource: this.originResource,
      notification_campaign: this.noticationCampaign,
      communication_language: this.communicationLanguage,
      channel_type: this.channelType,
      message_broker: this.messageBroker

    }
  }

  public async init (): Promise<NotificationCampaignStaticEntry | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new NotificationCampaignStaticEntryInitializationError(undefined, { error: err }))
    }
  }

  public static createUninitialized (
    payload: NotificationCampaignStaticEntryRawPayload,
    universe: Universe,
    http: Universe['http']
  ): NotificationCampaignStaticEntry {
    return new NotificationCampaignStaticEntry({ rawPayload: payload, universe, http, initialized: false })
  }
}

export class NotificationCampaignStaticEntryInitializationError extends BaseError {
  public name = 'NotificationCampaignStaticEntryInitializationError'
  constructor (public message: string = 'Could not initialize notification campaign static_entry.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignStaticEntryInitializationError.prototype)
  }
}

export class NotificationCampaignStaticEntryFetchRemoteError extends BaseError {
  public name = 'NotificationCampaignStaticEntryFetchRemoteError'
  constructor (public message: string = 'Could not get notification campaign static_entry.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignStaticEntryFetchRemoteError.prototype)
  }
}

export class ContactListStaticEntriesFetchRemoteError extends BaseError {
  public name = 'ContactListStaticEntriesFetchRemoteError'
  constructor (public message: string = 'Could not get notification campaign static_entries.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListStaticEntriesFetchRemoteError.prototype)
  }
}
export class NotificationCampaignStaticEntryCreateRemoteError extends BaseError {
  public name = 'NotificationCampaignStaticEntryCreateRemoteError'
  constructor (public message: string = 'Could not create notification campaign static entry.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignStaticEntryCreateRemoteError.prototype)
  }
}
export class NotificationCampaignStaticEntryDeleteRemoteError extends BaseError {
  public name = 'NotificationCampaignStaticEntryDeleteRemoteError'
  constructor (public message: string = 'Could not delete notification campaign static entry.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignStaticEntryDeleteRemoteError.prototype)
  }
}
