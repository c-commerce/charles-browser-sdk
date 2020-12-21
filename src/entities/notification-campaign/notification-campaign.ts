
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface NotificationCampaignOptions extends EntityOptions {
  rawPayload?: NotificationCampaignRawPayload
}

// export interface NotificationCampaignRawPayloadTargetRef {
//   targetRefs?: Array<{
//     type?: 'list' | 'subscription'
//     resource?: string
//   }>
// }

export interface NotificationCampaignRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly summary?: string
  readonly is_published?: boolean
  readonly published_at?: string
  readonly message_template?: string
  readonly includes?: Array<{
    type?: 'list' | 'subscription'
    resource?: string
  }>
  readonly excludes?: Array<{
    type?: 'list' | 'subscription'
    resource?: string
  }>
  readonly status?: 'draft'|'publishing'|'paused'|'cancelled_by_user'|'cancelled'|'published'|'errored'
  readonly statusses?: Array<{
    kind?: 'PausedRateLimitted'
    active?: boolean
    created_at?: string
    updated_at?: string
    message?: string
  }>
  readonly schedule?: {
    enabled?: boolean
    at?: string
  }
  readonly execution?: {
    enabled?: boolean
    halt_on_error?: boolean
    publication_date?: string
    publication_time?: string
    publication_in_recipient_timezone_enabled?: boolean
    recipient_timezone_inference_enabled?: boolean
    priorities?: string[]
    rate_limitation?: {
      priority?: 'emergency'
    } | {
      priority?: 'guaranteed_concurrency' | 'best_effort_concurrency'
      concurrency_maximum?: number
    }
  }
  readonly author?: {
    staff?: string[]
    user?: string[]
  }
  readonly publisher?: {
    staff?: string[]
    user?: string[]
  }

  readonly is_armed?: boolean
  readonly is_draft?: boolean

}

export interface NotificationCampaignPayload {
  readonly id?: NotificationCampaignRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: NotificationCampaignRawPayload['deleted']
  readonly active?: NotificationCampaignRawPayload['active']

  readonly name?: NotificationCampaignRawPayload['name']
  readonly summary?: NotificationCampaignRawPayload['summary']
  readonly isPublished?: NotificationCampaignRawPayload['is_published']
  readonly publishedAt?: NotificationCampaignRawPayload['published_at']
  readonly messageTemplate?: NotificationCampaignRawPayload['message_template']
  readonly includes?: NotificationCampaignRawPayload['includes']
  readonly excludes?: NotificationCampaignRawPayload['excludes']
  readonly status?: NotificationCampaignRawPayload['status']
  readonly statusses?: NotificationCampaignRawPayload['statusses']
  readonly schedule?: NotificationCampaignRawPayload['schedule']
  readonly execution?: NotificationCampaignRawPayload['execution']
  readonly author?: NotificationCampaignRawPayload['author']
  readonly publisher?: NotificationCampaignRawPayload['publisher']
  readonly isArmed?: NotificationCampaignRawPayload['is_armed']
  readonly isDraft?: NotificationCampaignRawPayload['is_draft']

}

/**
 * Manage notification_campaigns.
 *
 * @category Entity
 */
export class NotificationCampaign extends Entity<NotificationCampaignPayload, NotificationCampaignRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: NotificationCampaignOptions
  public initialized: boolean

  public endpoint: string

  public id?: NotificationCampaignPayload['id']
  public createdAt?: NotificationCampaignPayload['createdAt']
  public updatedAt?: NotificationCampaignPayload['updatedAt']
  public deleted?: NotificationCampaignPayload['deleted']
  public active?: NotificationCampaignPayload['active']

  public name?: NotificationCampaignPayload['name']
  public summary?: NotificationCampaignPayload['summary']
  public isPublished?: NotificationCampaignPayload['isPublished']
  public publishedAt?: NotificationCampaignPayload['publishedAt']
  public messageTemplate?: NotificationCampaignPayload['messageTemplate']
  public includes?: NotificationCampaignPayload['includes']
  public excludes?: NotificationCampaignPayload['excludes']
  public status?: NotificationCampaignPayload['status']
  public statusses?: NotificationCampaignPayload['statusses']
  public schedule?: NotificationCampaignPayload['schedule']
  public execution?: NotificationCampaignPayload['execution']
  public author?: NotificationCampaignPayload['author']
  public publisher?: NotificationCampaignPayload['publisher']
  public isArmed?: NotificationCampaignPayload['isArmed']
  public isDraft?: NotificationCampaignPayload['isDraft']

  constructor (options: NotificationCampaignOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/notification_campaigns'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: NotificationCampaignRawPayload): NotificationCampaign {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name
    this.summary = rawPayload.summary
    this.isPublished = rawPayload.is_published
    this.publishedAt = rawPayload.published_at
    this.messageTemplate = rawPayload.message_template
    this.includes = rawPayload.includes
    this.excludes = rawPayload.excludes
    this.status = rawPayload.status
    this.statusses = rawPayload.statusses
    this.schedule = rawPayload.schedule
    this.execution = rawPayload.execution
    this.author = rawPayload.author
    this.publisher = rawPayload.publisher
    this.isArmed = rawPayload.is_armed
    this.isDraft = rawPayload.is_draft

    return this
  }

  public static create (payload: NotificationCampaignRawPayload, universe: Universe, http: Universe['http']): NotificationCampaign {
    return new NotificationCampaign({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): NotificationCampaignRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      name: this.name,
      summary: this.summary,
      is_published: this.isPublished,
      published_at: this.publishedAt,
      message_template: this.messageTemplate,
      includes: this.includes,
      excludes: this.excludes,
      status: this.status,
      statusses: this.statusses,
      schedule: this.schedule,
      execution: this.execution,
      author: this.author,
      publisher: this.publisher,
      is_armed: this.isArmed,
      is_draft: this.isDraft

    }
  }

  public async init (): Promise<NotificationCampaign | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new NotificationCampaignInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class NotificationCampaigns {
  public static endpoint: string = 'api/v0/notification_campaigns'
}

export class NotificationCampaignInitializationError extends BaseError {
  public name = 'NotificationCampaignInitializationError'
  constructor (public message: string = 'Could not initialize notification_campaign.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignInitializationError.prototype)
  }
}

export class NotificationCampaignFetchRemoteError extends BaseError {
  public name = 'NotificationCampaignFetchRemoteError'
  constructor (public message: string = 'Could not get notification_campaign.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignFetchRemoteError.prototype)
  }
}

export class NotificationCampaignsFetchRemoteError extends BaseError {
  public name = 'NotificationCampaignsFetchRemoteError'
  constructor (public message: string = 'Could not get notification_campaigns.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignsFetchRemoteError.prototype)
  }
}
export class NotificationCampaignsFetchCountRemoteError extends BaseError {
  public name = 'NotificationCampaignsFetchCountRemoteError'
  constructor (public message: string = 'Could not get notification_campaigns count.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignsFetchCountRemoteError.prototype)
  }
}
