
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { RealtimeClient } from 'src/realtime'
import { BaseError } from '../../errors'

export interface PipelineStageOptions extends UniverseEntityOptions {
  rawPayload?: PipelineStageRawPayload
}

export interface PipelineStageRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly kind?: string
  readonly name?: string
  readonly external_reference_id?: string
  readonly order_index?: number
  readonly crm?: string
  readonly pipeline?: string
  readonly proxy_vendor?: string
  readonly proxy_payload?: object
}

export interface PipelineStagePayload {
  readonly id?: PipelineStageRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: PipelineStageRawPayload['deleted']
  readonly active?: PipelineStageRawPayload['active']

  readonly kind?: PipelineStageRawPayload['kind']
  readonly name?: PipelineStageRawPayload['name']
  readonly externalReferenceId?: PipelineStageRawPayload['external_reference_id']
  readonly orderIndex?: PipelineStageRawPayload['order_index']
  readonly crm?: PipelineStageRawPayload['crm']
  readonly pipeline?: PipelineStageRawPayload['pipeline']
  readonly proxyVendor?: PipelineStageRawPayload['proxy_vendor']
  readonly proxyPayload?: PipelineStageRawPayload['proxy_payload']
}

/**
 * Manage pipeline_stages.
 *
 * @category Entity
 */
export class PipelineStage extends UniverseEntity<PipelineStagePayload, PipelineStageRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt: RealtimeClient
  protected options: PipelineStageOptions
  public initialized: boolean

  public endpoint: string

  public id?: PipelineStagePayload['id']
  public createdAt?: PipelineStagePayload['createdAt']
  public updatedAt?: PipelineStagePayload['updatedAt']
  public deleted?: PipelineStagePayload['deleted']
  public active?: PipelineStagePayload['active']

  public kind?: PipelineStagePayload['kind']
  public name?: PipelineStagePayload['name']
  public externalReferenceId?: PipelineStagePayload['externalReferenceId']
  public orderIndex?: PipelineStagePayload['orderIndex']
  public crm?: PipelineStagePayload['crm']
  public pipeline?: PipelineStagePayload['pipeline']
  public proxyVendor?: PipelineStagePayload['proxyVendor']
  public proxyPayload?: PipelineStagePayload['proxyPayload']

  constructor (options: PipelineStageOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.mqtt = options.mqtt
    this.endpoint = ''

    if (options?.rawPayload && options.rawPayload.crm && options.rawPayload.pipeline) {
      this.endpoint = `api/v0/crms/${options.rawPayload.crm}/pipelines/${options.rawPayload.pipeline}/stages`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PipelineStageRawPayload): PipelineStage {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.kind = rawPayload.kind
    this.name = rawPayload.name
    this.externalReferenceId = rawPayload.external_reference_id
    this.orderIndex = rawPayload.order_index
    this.crm = rawPayload.crm
    this.pipeline = rawPayload.pipeline
    this.proxyVendor = rawPayload.proxy_vendor
    this.proxyPayload = rawPayload.proxy_payload

    return this
  }

  public static create (payload: PipelineStageRawPayload, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): PipelineStage {
    return new PipelineStage({ rawPayload: payload, universe, http, mqtt, initialized: true })
  }

  public static createUninitialized (
    payload: PipelineStageRawPayload,
    universe: Universe,
    http: Universe['http'],
    mqtt: RealtimeClient
  ): PipelineStage {
    return new PipelineStage({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize (): PipelineStageRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      kind: this.kind,
      name: this.name,
      external_reference_id: this.externalReferenceId,
      order_index: this.orderIndex,
      crm: this.crm,
      pipeline: this.pipeline,
      proxy_vendor: this.proxyVendor,
      proxy_payload: this.proxyPayload
    }
  }

  public async init (): Promise<PipelineStage | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new PipelineStageInitializationError(undefined, { error: err }))
    }
  }
}

export class PipelineStageInitializationError extends BaseError {
  public name = 'PipelineStageInitializationError'
  constructor (public message: string = 'Could not initialize pipeline_stage.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PipelineStageInitializationError.prototype)
  }
}

export class PipelineStageFetchRemoteError extends BaseError {
  public name = 'PipelineStageFetchRemoteError'
  constructor (public message: string = 'Could not get pipeline_stage.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PipelineStageFetchRemoteError.prototype)
  }
}

export class PipelineStagesFetchRemoteError extends BaseError {
  public name = 'PipelineStagesFetchRemoteError'
  constructor (public message: string = 'Could not get pipeline_stages.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PipelineStagesFetchRemoteError.prototype)
  }
}
