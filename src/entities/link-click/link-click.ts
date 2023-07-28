import { SnakeToCamelCase } from '../../helpers/case-convert-type'
import { Universe } from '../../universe'
import Entity, { UniverseEntityOptions } from '../_base'

export interface LinkClickOptions extends UniverseEntityOptions {
  rawPayload?: LinkClickRawPayload
}

export interface LinkClickRawPayload {
  id?: string
  link?: string
  link_id?: string
  original_url?: string
  user_click_at?: string
  user_data?: {[name: string]: any}
  is_first_click?: boolean
}

export interface LinkClickPayload extends SnakeToCamelCase<Omit<LinkClickRawPayload, 'user_click_at'>> {
  userClickAt?: Date
}

export class LinkClick extends Entity<LinkClickPayload, LinkClickRawPayload> implements LinkClickPayload {
  public get entityName (): string {
    return 'link_clicks'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: LinkClickOptions
  public initialized: boolean

  public static readonly endpoint = 'api/v0/link_clicks/analytics/campaigns'
  public endpoint: string = LinkClick.endpoint

  public id: string | undefined
  public userClickAt?: Date
  public originalUrl?: string
  public link?: string
  public linkId?: string
  public userData?: { [name: string]: any }
  public isFirstClick?: boolean

  constructor (options: LinkClickOptions) {
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

  protected deserialize (rawPayload: LinkClickRawPayload): this {
    this.setRawPayload(rawPayload)

    // if none flattened data was introduced rawPayload need to be deeply cloned in case patch/update was introduced

    this.id = rawPayload.id
    this.userClickAt = rawPayload.user_click_at ? new Date(rawPayload.user_click_at) : undefined
    this.originalUrl = rawPayload.original_url
    this.link = rawPayload.link
    this.linkId = rawPayload.link_id
    this.userData = rawPayload.user_data
    this.isFirstClick = rawPayload.is_first_click

    return this
  }

  public static create (payload: LinkClickRawPayload, universe: Universe, http: Universe['http']): LinkClick {
    return new LinkClick({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): LinkClickRawPayload {
    return {
      id: this.id,
      link: this.link,
      link_id: this.linkId,
      original_url: this.originalUrl,
      user_click_at: this.userClickAt?.toISOString(),
      user_data: this.userData,
      is_first_click: this.isFirstClick
    }
  }
}
