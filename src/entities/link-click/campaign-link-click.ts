import { BaseError } from '../../errors'
import { SnakeToCamelCase } from 'src/helpers/case-convert-type'
import { Universe } from 'src/universe'
import { UniverseEntityOptions, View } from '../_base'

export interface CampaignLinkClickOptions extends UniverseEntityOptions {
  rawPayload?: CampaignLinkClickRawPayload
}

export interface CampaignLinkClickRawPayload {
  readonly campaign_id: string
  readonly campaign_name: string
  readonly published_at: string
  readonly unique_clicks: number
  readonly total_clicks: number
  readonly original_url: string
}

export interface CampaignLinkClickPayload extends SnakeToCamelCase<Omit<CampaignLinkClickRawPayload, 'published_at'>> {
  publishedAt: Date
}

export type CampaignLinkField = '_all' | keyof CampaignLinkClickRawPayload
export interface CampaignLinkFetchOptions {
  q: string
  field: CampaignLinkField | CampaignLinkField[]
  offset: number
  limit: number
  start: string
  end: string
  cursor_field: 'published_at' | 'updated_at'
}

export class CampaignLinkClick extends View<CampaignLinkClickPayload, CampaignLinkClickRawPayload> implements CampaignLinkClickPayload {
  public get entityName (): string {
    return 'campaign_link_clicks'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: CampaignLinkClickOptions
  public initialized: boolean

  public static readonly endpoint = 'api/v0/link_clicks/analytics/campaigns'

  public publishedAt: Date = new Date()
  public campaignId: string = ''
  public campaignName: string = ''
  public uniqueClicks: number = 0
  public totalClicks: number = 0
  public originalUrl: string = ''

  constructor (options: CampaignLinkClickOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CampaignLinkClickRawPayload): this {
    this.setRawPayload(rawPayload)

    // if none flattened data was introduced rawPayload need to be deeply cloned in case patch/update was introduced
    this.publishedAt = new Date(rawPayload.published_at)
    this.campaignId = rawPayload.campaign_id
    this.campaignName = rawPayload.campaign_name
    this.uniqueClicks = rawPayload.unique_clicks
    this.totalClicks = rawPayload.total_clicks
    this.originalUrl = rawPayload.original_url

    return this
  }

  public static create (payload: CampaignLinkClickRawPayload, universe: Universe, http: Universe['http']): CampaignLinkClick {
    return new CampaignLinkClick({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): CampaignLinkClickRawPayload {
    return {
      campaign_id: this.campaignId,
      campaign_name: this.campaignName,
      published_at: this.publishedAt.toISOString(),
      unique_clicks: this.uniqueClicks,
      total_clicks: this.totalClicks,
      original_url: this.originalUrl
    }
  }
}

export class CampaignLinkClickFetchRemoteError extends BaseError {
  public name = 'CampaignLinkClickFetchRemoteError'
  constructor (public message: string = 'Could not get campaign link clicks.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CampaignLinkClickFetchRemoteError.prototype)
  }
}
