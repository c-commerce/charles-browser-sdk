
import { UniverseEntity, UniverseEntityOptions, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { Event, EventRawPayload } from '../../eventing/feeds/event'
import qs from 'qs'
import { Feed } from '../../eventing/feeds/feed'

export interface NotificationCampaignOptions extends UniverseEntityOptions {
  rawPayload?: NotificationCampaignRawPayload
}

// export interface NotificationCampaignRawPayloadTargetRef {
//   targetRefs?: Array<{
//     type?: 'list' | 'subscription'
//     resource?: string
//   }>
// }

// todo: use real static entry payload as resource from notification campaign static entries
export interface NotificationCampaignTestRawPayload {
  resource?: object
  communication_language?: string
}

export type NotificationCampaignStatusType =
'draft' // user: campaign has been saved, but nothing else has been done with it. The campaign is not ready to be sent
| 'armed' // user: the campaign is ready to be sent, all recipient are primed and ready to be targetted
| 'paused' // user: the campaign has been paused
| 'cancelled_by_user' // user: a user has cancelled exection of the campaign
| 'cancelled' // user: the campaign has been cancelled
| 'published' // user: the campaign was published and might be executing or will execute
| 'done' // user: the campaign was published the campaign has run. This does not indicate success.
| 'errored' // user: execution was attempted but errored immediately. Errors per target are not indicated

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
  readonly message_template_parameters?: Array<{
    name?: string
    order_index?: number
    value?: string
    logic?: object| null
  }>
  readonly includes?: Array<{
    type?: 'list' | 'subscription'
    resource?: string
  }>
  readonly excludes?: Array<{
    type?: 'list' | 'subscription'
    resource?: string
  }>
  readonly status?: NotificationCampaignStatusType
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
    staff?: string[] | string
    user?: string[] | string
  }
  readonly publisher?: {
    staff?: string[]| string
    user?: string[]| string
  }
  readonly message_author?: string

  readonly is_armed?: boolean
  readonly is_draft?: boolean

  readonly default_language?: string
  readonly analytics?: {
    static_entries_count?: number | null
    [key: string]: any
  }
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
  readonly messageTemplateParameters?: NotificationCampaignRawPayload['message_template_parameters']
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
  readonly defaultLanguage?: NotificationCampaignRawPayload['default_language']
  readonly analytics?: NotificationCampaignRawPayload['analytics']
  readonly messageAuthor?: NotificationCampaignRawPayload['message_author']

}

/**
 * Manage notification_campaigns.
 *
 * @category Entity
 */
export class NotificationCampaign extends UniverseEntity<NotificationCampaignPayload, NotificationCampaignRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
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
  public messageTemplateParameters?: NotificationCampaignPayload['messageTemplateParameters']
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
  public defaultLanguage?: NotificationCampaignPayload['defaultLanguage']
  public analytics?: NotificationCampaignPayload['analytics']
  public messageAuthor?: NotificationCampaignPayload['messageAuthor']

  constructor (options: NotificationCampaignOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
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
    this.messageTemplateParameters = rawPayload.message_template_parameters
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
    this.analytics = rawPayload.analytics
    this.messageAuthor = rawPayload.message_author
    this.defaultLanguage = rawPayload.default_language

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
      message_template_parameters: this.messageTemplateParameters,
      includes: this.includes,
      excludes: this.excludes,
      status: this.status,
      statusses: this.statusses,
      schedule: this.schedule,
      execution: this.execution,
      author: this.author,
      publisher: this.publisher,
      is_armed: this.isArmed,
      is_draft: this.isDraft,
      default_language: this.defaultLanguage,
      analytics: this.analytics,
      message_author: this.messageAuthor
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

  /**
   * For the general behavior see NotificationCampaign#preflightArm, whereas this method does not set any state.
   */
  public async preflightCheck (): Promise<NotificationCampaign> {
    if (this.id === null || this.id === undefined) throw new TypeError('campaign preflight check requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/preflight/check`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      this.deserialize(res.data.data[0].notification_campaign as NotificationCampaignRawPayload)
      return this
    } catch (err) {
      throw new NotificationCampaignPreflightError(undefined, { error: err })
    }
  }

  /**
   *
   * Prepares a campaign for sending, by:
   * - getting all the contact targets and setting them statically
   * - deduplicating them
   * - checking the campaign for executability
   * - setting status
   *
   * If this errors we are exposing API errors messages, that indicate a problem e.g.:
   * - insufficient campaign data
   * - contact targets not being sufficient e.g. missing channel users
   */
  public async preflightArm (): Promise<NotificationCampaign> {
    if (this.id === null || this.id === undefined) throw new TypeError('campaign preflight arm requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/preflight/arm`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      this.deserialize(res.data.data[0].notification_campaign as NotificationCampaignRawPayload)
      return this
    } catch (err) {
      throw new NotificationCampaignArmError(undefined, { error: err })
    }
  }

  public async publish (): Promise<NotificationCampaign> {
    if (this.id === null || this.id === undefined) throw new TypeError('campaign publish requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/publish`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }
      const res = await this.http.getClient()(opts)
      const data = res.data.data[0] as NotificationCampaignRawPayload

      return this.deserialize(data)
    } catch (err) {
      throw new NotificationCampaignPublishError(undefined, { error: err })
    }
  }

  /**
   * Same as publish but used if campaign was halted due to errors or else.
   */
  public async continue (): Promise<NotificationCampaign> {
    if (this.id === null || this.id === undefined) throw new TypeError('campaign continue requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/continue`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }
      const res = await this.http.getClient()(opts)
      const data = res.data.data[0] as NotificationCampaignRawPayload

      return this.deserialize(data)
    } catch (err) {
      throw new NotificationCampaignContinueError(undefined, { error: err })
    }
  }

  public async test (payload: NotificationCampaignTestRawPayload): Promise<NotificationCampaign> {
    if (this.id === null || this.id === undefined) throw new TypeError('campaign publish requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/test`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json',
        data: payload
      }
      const res = await this.http.getClient()(opts)
      const data = res.data.data as NotificationCampaignRawPayload

      return this.deserialize(data)
    } catch (err) {
      throw new NotificationCampaignTestError(undefined, { error: err })
    }
  }

  /**
 * Fetches campaign feed events
 */
  public async getFeedEvents (options?: EntityFetchOptions): Promise<EventRawPayload[]> {
    if (this.id === null || this.id === undefined) throw new TypeError('notification campaign getFeedEvents requires id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/feed_events${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
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
      throw new NotificationCampaignGetFeedEventsError(undefined, { error: err })
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
export class NotificationCampaignPreflightError extends BaseError {
  public name = 'NotificationCampaignPreflightError'
  constructor (public message: string = 'Could not do preflight check on campaign.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignPreflightError.prototype)
  }
}
export class NotificationCampaignArmError extends BaseError {
  public name = 'NotificationCampaignArmError'
  constructor (public message: string = 'Could not preflight arm notification_campaign.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignArmError.prototype)
  }
}
export class NotificationCampaignPublishError extends BaseError {
  public name = 'NotificationCampaignPublishError'
  constructor (public message: string = 'Could not publish notification_campaign.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignPublishError.prototype)
  }
}
export class NotificationCampaignTestError extends BaseError {
  public name = 'NotificationCampaignTestError'
  constructor (public message: string = 'Could not test notification_campaign.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignTestError.prototype)
  }
}
export class NotificationCampaignGetFeedEventsError extends BaseError {
  public name = 'NotificationCampaignGetFeedEventsError'
  constructor (public message: string = 'Could not get notification_campaign feed events', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignGetFeedEventsError.prototype)
  }
}
export class NotificationCampaignContinueError extends BaseError {
  public name = 'NotificationCampaignContinueError'
  constructor (public message: string = 'Could not continue notification campaign', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationCampaignContinueError.prototype)
  }
}
