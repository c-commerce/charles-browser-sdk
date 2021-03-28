
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { PipelineStage } from './pipeline-stage'

export interface PipelineOptions extends UniverseEntityOptions {
  rawPayload?: PipelineRawPayload
}

export interface PipelineRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly external_reference_id?: string
  readonly kind?: string
  readonly crm?: string
  readonly stages?: PipelineStage[]
  readonly proxy_vendor?: string
  readonly proxy_payload?: object
}

export interface PipelinePayload {
  readonly id?: PipelineRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: PipelineRawPayload['deleted']
  readonly active?: PipelineRawPayload['active']
  readonly name?: PipelineRawPayload['name']
  readonly externalReferenceId?: PipelineRawPayload['external_reference_id']
  readonly kind?: PipelineRawPayload['kind']
  readonly crm?: PipelineRawPayload['crm']
  readonly stages?: PipelineRawPayload['stages']
  readonly proxyVendor?: PipelineRawPayload['proxy_vendor']
  readonly proxyPayload?: PipelineRawPayload['proxy_payload']
}

/**
 * Manage pipelines.
 *
 * @category Entity
 */
export class Pipeline extends UniverseEntity<PipelinePayload, PipelineRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: PipelineOptions
  public initialized: boolean
  public endpoint: string

  public id?: PipelinePayload['id']
  public createdAt?: PipelinePayload['createdAt']
  public updatedAt?: PipelinePayload['updatedAt']
  public deleted?: PipelinePayload['deleted']
  public active?: PipelinePayload['active']
  public name?: PipelinePayload['name']
  public externalReferenceId?: PipelinePayload['externalReferenceId']
  public kind?: PipelinePayload['kind']
  public crm?: PipelinePayload['crm']
  public stages?: PipelinePayload['stages']
  public proxyVendor?: PipelinePayload['proxyVendor']
  public proxyPayload?: PipelinePayload['proxyPayload']

  constructor (options: PipelineOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    this.endpoint = ''

    if (options?.rawPayload && options.rawPayload.crm) {
      this.endpoint = `api/v0/crms/${options.rawPayload.crm}/pipelines`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PipelineRawPayload): Pipeline {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name
    this.externalReferenceId = rawPayload.external_reference_id
    this.kind = rawPayload.kind
    this.crm = rawPayload.crm
    this.proxyVendor = rawPayload.proxy_vendor
    this.proxyPayload = rawPayload.proxy_payload

    if (rawPayload.stages && this.initialized) {
      this.stages = rawPayload.stages.map(i =>
        PipelineStage.create(i, this.universe, this.http)
      )
    } else if (rawPayload.stages && !this.initialized) {
      this.stages = rawPayload.stages.map(i =>
        PipelineStage.createUninitialized(i, this.universe, this.http)
      )
    } else if (!this.stages) {
      this.stages = undefined
    }

    return this
  }

  public static create (payload: PipelineRawPayload, universe: Universe, http: Universe['http']): Pipeline {
    return new Pipeline({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized (
    payload: PipelineRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Pipeline {
    return new Pipeline({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize (): PipelineRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      external_reference_id: this.externalReferenceId,
      kind: this.kind,
      crm: this.crm,
      stages: this.stages,
      proxy_vendor: this.proxyVendor,
      proxy_payload: this.proxyPayload
    }
  }

  public async init (): Promise<Pipeline | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new PipelineInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
// export class Pipelines {
//   public static endpoint: string = 'api/v0/pipelines'
// }

export class PipelineInitializationError extends BaseError {
  public name = 'PipelineInitializationError'
  constructor (public message: string = 'Could not initialize pipeline.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PipelineInitializationError.prototype)
  }
}

export class PipelineFetchRemoteError extends BaseError {
  public name = 'PipelineFetchRemoteError'
  constructor (public message: string = 'Could not get pipeline.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PipelineFetchRemoteError.prototype)
  }
}

export class PipelinesFetchRemoteError extends BaseError {
  public name = 'PipelinesFetchRemoteError'
  constructor (public message: string = 'Could not get pipelines.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PipelinesFetchRemoteError.prototype)
  }
}
