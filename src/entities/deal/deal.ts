
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { Pipeline, PipelineStage } from '../crm'

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
      person: this.person
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
