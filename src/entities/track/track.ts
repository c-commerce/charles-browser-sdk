
import{ UniverseEntity, UniverseEntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface TrackOptions extends UniverseEntityOptions {
  rawPayload?: TrackRawPayload
}

export interface TrackMilestoneDataRawPayload {
  readonly topic?: string | string[]
  readonly current?: number
  readonly achieved?: boolean
  readonly achievement_at?: number
  readonly vendor?: string
}

export interface TrackMilestoneActivationRawPayload {
  readonly uri?: string
  readonly type?: string
}

export interface TrackMilestoneRawPayload {
  readonly data?: TrackMilestoneDataRawPayload
  readonly kind?: string
  readonly name?: string
  readonly image?: string
  readonly summary?: string
  readonly order_index?: number
  readonly instructions?: string
  readonly activation?: TrackMilestoneActivationRawPayload
}

export interface TrackRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly completed?: boolean
  readonly completed_at?: string
  readonly scope?: string
  readonly assignee?: string
  readonly milestones?: TrackMilestoneRawPayload[]
}

export interface TrackPayload {
  readonly id?: TrackRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: TrackRawPayload['deleted']
  readonly active?: TrackRawPayload['active']
  readonly completed?: TrackRawPayload['completed']
  readonly completed_at?: Date | null
  readonly scope?: TrackRawPayload['scope']
  readonly assignee?: TrackRawPayload['assignee']
  readonly milestones?: TrackRawPayload['milestones']
}

/**
 * Manage staff members.
 *
 * @category Entity
 */
export class Track extends UniverseEntity<TrackPayload, TrackRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: TrackOptions
  public initialized: boolean

  public endpoint: string

  public id?: TrackRawPayload['id']
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public deleted?: TrackRawPayload['deleted']
  public active?: TrackRawPayload['active']
  public completed?: TrackRawPayload['completed']
  public completed_at?: Date | null
  public scope?: TrackRawPayload['scope']
  public assignee?: TrackRawPayload['assignee']
  public milestones?: TrackRawPayload['milestones']

  constructor (options: TrackOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/universe_tracks'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: TrackRawPayload): Track {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.completed = rawPayload.completed
    this.completed_at = rawPayload.completed_at ? new Date(rawPayload.completed_at) : undefined
    this.scope = rawPayload.scope
    this.assignee = rawPayload.assignee
    this.milestones = rawPayload.milestones

    return this
  }

  public static create (payload: TrackRawPayload, universe: Universe, http: Universe['http']): Track {
    return new Track({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): TrackRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      completed: this.completed ?? false,
      completed_at: this.completed_at ? this.completed_at.toISOString() : undefined,
      scope: this.scope,
      assignee: this.assignee,
      milestones: this.milestones
    }
  }

  public async init (): Promise<Track | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new TrackInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Tracks {
  public static endpoint: string = 'api/v0/universe_tracks'
  public static currentEndpoint: string = 'api/v0/universe_tracks/current'
}

export class TrackInitializationError extends BaseError {
  public name = 'TrackInitializationError'
  constructor (public message: string = 'Could not initialize track.', properties?: any) {
    super(message, properties)
  }
}

export class TrackFetchRemoteError extends BaseError {
  public name = 'TrackFetchRemoteError'
  constructor (public message: string = 'Could not get track.', properties?: any) {
    super(message, properties)
  }
}

export class TracksFetchRemoteError extends BaseError {
  public name = 'TracksFetchRemoteError'
  constructor (public message: string = 'Could not get tracks.', properties?: any) {
    super(message, properties)
  }
}
