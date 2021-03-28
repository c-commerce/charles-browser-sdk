
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface TagGroupOptions extends UniverseEntityOptions {
  rawPayload?: TagGroupRawPayload
}

export interface TagGroupRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly label?: string
  readonly color?: string | null
  readonly description?: string | null
}

export interface TagGroupPayload {
  readonly id?: TagGroupRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: TagGroupRawPayload['deleted']
  readonly active?: TagGroupRawPayload['active']
  readonly label?: TagGroupRawPayload['label']
  readonly color?: TagGroupRawPayload['color']
  readonly description?: TagGroupRawPayload['description']
}

/**
 * Manage tag groups.
 *
 * @category Entity
 */
export class TagGroup extends UniverseEntity<TagGroupPayload, TagGroupRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: TagGroupOptions
  public initialized: boolean

  public endpoint: string

  public id?: TagGroupPayload['id']
  public createdAt?: TagGroupPayload['createdAt']
  public updatedAt?: TagGroupPayload['updatedAt']
  public deleted?: TagGroupPayload['deleted']
  public active?: TagGroupPayload['active']
  public label?: TagGroupPayload['label']
  public color?: TagGroupPayload['color']
  public description?: TagGroupPayload['description']

  constructor (options: TagGroupOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/tag_groups'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: TagGroupRawPayload): TagGroup {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.label = rawPayload.label
    this.color = rawPayload.color
    this.description = rawPayload.description

    return this
  }

  public static create (payload: TagGroupRawPayload, universe: Universe, http: Universe['http']): TagGroup {
    return new TagGroup({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): TagGroupRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      label: this.label,
      color: this.color,
      description: this.description
    }
  }

  public async init (): Promise<TagGroup | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new TagGroupInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TagGroups {
  public static endpoint: string = 'api/v0/tag_groups'
}

export class TagGroupInitializationError extends BaseError {
  public name = 'TagGroupInitializationError'
  constructor (public message: string = 'Could not initialize tag group.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TagGroupInitializationError.prototype)
  }
}

export class TagGroupFetchRemoteError extends BaseError {
  public name = 'TagGroupFetchRemoteError'
  constructor (public message: string = 'Could not get tag group.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TagGroupFetchRemoteError.prototype)
  }
}

export class TagGroupsFetchRemoteError extends BaseError {
  public name = 'TagGroupsFetchRemoteError'
  constructor (public message: string = 'Could not get tag groups.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TagGroupsFetchRemoteError.prototype)
  }
}
