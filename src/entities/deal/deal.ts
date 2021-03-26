
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { CRM, Pipeline, PipelineStage } from '../crm'

export interface DealOptions extends EntityOptions {
  rawPayload?: DealRawPayload
}

export interface DealRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly pipeline?: Pipeline
  readonly stage?: PipelineStage
  readonly person?: string
  readonly name?: string
  readonly uri?: string
  readonly proxy_vendor?: string
  readonly kind?: string
  readonly external_reference_id?: string
  readonly channel_user?: string
  readonly stage_external_reference_id?: string
  readonly crm?: string
  readonly currency?: string
  readonly value?: object
  readonly status?: string
  readonly probability?: string
  readonly date?: string
  readonly next_activity_at?: string
  readonly closed_at?: string
  readonly won_at?: string
  readonly lost_at?: string
  readonly expected_closing_at?: string
  readonly pipeline_external_reference_id?: string
  readonly author?: object | string
  readonly owner?: object | string
  readonly proxy_payload?: object
  readonly links?: object
}

export interface DealPayload {
  readonly id?: DealRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: DealRawPayload['deleted']
  readonly active?: DealRawPayload['active']

  readonly pipeline?: DealRawPayload['pipeline']
  readonly stage?: DealRawPayload['stage']
  readonly person?: DealRawPayload['person']
  readonly name?: DealRawPayload['name']
  readonly uri?: DealRawPayload['uri']
  readonly proxyVendor?: DealRawPayload['proxy_vendor']
  readonly kind?: DealRawPayload['kind']
  readonly externalReferenceId?: DealRawPayload['external_reference_id']
  readonly channelUser?: DealRawPayload['channel_user']
  readonly stageExternalReferenceId?: DealRawPayload['stage_external_reference_id']
  readonly crm?: DealRawPayload['crm']
  readonly currency?: DealRawPayload['currency']
  readonly value?: DealRawPayload['value']
  readonly status?: DealRawPayload['status']
  readonly probability?: DealRawPayload['probability']
  readonly date?: DealRawPayload['date']
  readonly nextActivityAt?: DealRawPayload['next_activity_at']
  readonly closedAt?: DealRawPayload['closed_at']
  readonly wonAt?: DealRawPayload['won_at']
  readonly lostAt?: DealRawPayload['lost_at']
  readonly expectedClosingAt?: DealRawPayload['expected_closing_at']
  readonly pipelineExternalReferenceId?: DealRawPayload['pipeline_external_reference_id']
  readonly author?: DealRawPayload['author']
  readonly owner?: DealRawPayload['owner']
  readonly proxyPayload?: DealRawPayload['proxy_payload']
  readonly links?: DealRawPayload['links']
}

/**
 * Manage deals.
 *
 * @category Entity
 */
export class Deal extends Entity<DealPayload, DealRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: DealOptions
  public initialized: boolean

  public endpoint: string

  public id?: DealPayload['id']
  public createdAt?: DealPayload['createdAt']
  public updatedAt?: DealPayload['updatedAt']
  public deleted?: DealPayload['deleted']
  public active?: DealPayload['active']

  public pipeline?: DealPayload['pipeline']
  public stage?: DealPayload['stage']
  public person?: DealPayload['person']
  public name?: DealPayload['name']
  public uri?: DealPayload['uri']
  public proxyVendor?: DealPayload['proxyVendor']
  public kind?: DealPayload['kind']
  public externalReferenceId?: DealPayload['externalReferenceId']
  public channelUser?: DealPayload['channelUser']
  public stageExternalReferenceId?: DealPayload['stageExternalReferenceId']
  public crm?: DealPayload['crm']
  public currency?: DealPayload['currency']
  public value?: DealPayload['value']
  public status?: DealPayload['status']
  public probability?: DealPayload['probability']
  public date?: DealPayload['date']
  public nextActivityAt?: DealPayload['nextActivityAt']
  public closedAt?: DealPayload['closedAt']
  public wonAt?: DealPayload['wonAt']
  public lostAt?: DealPayload['lostAt']
  public expectedClosingAt?: DealPayload['expectedClosingAt']
  public pipelineExternalReferenceId?: DealPayload['pipelineExternalReferenceId']
  public author?: DealPayload['author']
  public owner?: DealPayload['owner']
  public proxyPayload?: DealPayload['proxyPayload']
  public links?: DealPayload['links']

  constructor (options: DealOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/deals'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload && options.rawPayload.person) {
      this.endpoint = `api/v0/people/${options.rawPayload.person}/deals`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: DealRawPayload): Deal {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.person = rawPayload.person
    this.name = rawPayload.name
    this.uri = rawPayload.uri
    this.proxyVendor = rawPayload.proxy_vendor
    this.kind = rawPayload.kind
    this.externalReferenceId = rawPayload.external_reference_id
    this.channelUser = rawPayload.channel_user
    this.stageExternalReferenceId = rawPayload.stage_external_reference_id
    this.crm = rawPayload.crm
    this.currency = rawPayload.currency
    this.value = rawPayload.value
    this.status = rawPayload.status
    this.probability = rawPayload.probability
    this.date = rawPayload.date
    this.nextActivityAt = rawPayload.next_activity_at
    this.closedAt = rawPayload.closed_at
    this.wonAt = rawPayload.won_at
    this.lostAt = rawPayload.lost_at
    this.expectedClosingAt = rawPayload.expected_closing_at
    this.pipelineExternalReferenceId = rawPayload.pipeline_external_reference_id
    this.author = rawPayload.author
    this.owner = rawPayload.owner
    this.proxyPayload = rawPayload.proxy_payload
    this.links = rawPayload.links

    if (rawPayload.stage && this.initialized) {
      this.stage = PipelineStage.create(rawPayload.stage, this.universe, this.http)
    } else if (rawPayload.stage && !this.initialized) {
      this.stage = PipelineStage.createUninitialized(rawPayload.stage, this.universe, this.http)
    } else if (!this.stage) {
      this.stage = undefined
    }

    if (rawPayload.pipeline && this.initialized) {
      this.pipeline = Pipeline.create(rawPayload.pipeline, this.universe, this.http)
    } else if (rawPayload.pipeline && !this.initialized) {
      this.pipeline = Pipeline.createUninitialized(rawPayload.pipeline, this.universe, this.http)
    } else if (!this.pipeline) {
      this.pipeline = undefined
    }

    return this
  }

  public static create (payload: DealRawPayload, universe: Universe, http: Universe['http']): Deal {
    return new Deal({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): DealRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      pipeline: this.pipeline,
      stage: this.stage,
      person: this.person,
      name: this.name,
      uri: this.uri,
      proxy_vendor: this.proxyVendor,
      kind: this.kind,
      external_reference_id: this.externalReferenceId,
      channel_user: this.channelUser,
      stage_external_reference_id: this.stageExternalReferenceId,
      crm: this.crm,
      currency: this.currency,
      value: this.value,
      status: this.status,
      probability: this.probability,
      date: this.date,
      next_activity_at: this.nextActivityAt,
      closed_at: this.closedAt,
      won_at: this.wonAt,
      lost_at: this.lostAt,
      expected_closing_at: this.expectedClosingAt,
      pipeline_external_reference_id: this.pipelineExternalReferenceId,
      author: this.author,
      owner: this.owner,
      proxy_payload: this.proxyPayload,
      links: this.links
    }
  }

  public async init (): Promise<Deal | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new DealInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Deals {
  public static endpoint: string = 'api/v0/deals'
}

export class DealInitializationError extends BaseError {
  public name = 'DealInitializationError'
  constructor (public message: string = 'Could not initialize deal.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealInitializationError.prototype)
  }
}

export class DealFetchRemoteError extends BaseError {
  public name = 'DealFetchRemoteError'
  constructor (public message: string = 'Could not get deal.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealFetchRemoteError.prototype)
  }
}

export class DealsFetchRemoteError extends BaseError {
  public name = 'DealsFetchRemoteError'
  constructor (public message: string = 'Could not get deals.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealsFetchRemoteError.prototype)
  }
}
export class DealsFetchCountRemoteError extends BaseError {
  public name = 'DealsFetchCountRemoteError'
  constructor (public message: string = 'Could not get deals count.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DealsFetchCountRemoteError.prototype)
  }
}
