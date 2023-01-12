
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface TagOptions extends UniverseEntityOptions {
  rawPayload?: TagRawPayload
}

export interface TagRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly label?: string
  readonly object?: 'person' | 'feed' | 'event' | 'ticket'
  readonly description?: string | null
  readonly tag_group?: string | null
}

export interface TagPayload {
  readonly id?: TagRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: TagRawPayload['deleted']
  readonly active?: TagRawPayload['active']
  readonly label?: TagRawPayload['label']
  readonly object?: TagRawPayload['object']
  readonly description?: TagRawPayload['description']
  readonly tagGroup?: TagRawPayload['tag_group']
}

/**
 * Manage tags.
 *
 * @category Entity
 */
export class Tag extends UniverseEntity<TagPayload, TagRawPayload> {
  public get entityName (): string {
    return 'tag'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: TagOptions
  public initialized: boolean

  public endpoint: string

  public id?: TagPayload['id']
  public createdAt?: TagPayload['createdAt']
  public updatedAt?: TagPayload['updatedAt']
  public deleted?: TagPayload['deleted']
  public active?: TagPayload['active']
  public label?: TagPayload['label']
  public object?: TagPayload['object']
  public description?: TagPayload['description']
  public tagGroup?: TagPayload['tagGroup']

  constructor (options: TagOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/tags'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: TagRawPayload): Tag {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.label = rawPayload.label
    this.object = rawPayload.object
    this.description = rawPayload.description
    this.tagGroup = rawPayload.tag_group

    return this
  }

  public static create (payload: TagRawPayload, universe: Universe, http: Universe['http']): Tag {
    return new Tag({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): TagRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      label: this.label,
      object: this.object,
      description: this.description,
      tag_group: this.tagGroup
    }
  }

  public async init (): Promise<Tag | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new TagInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Tags {
  public static endpoint: string = 'api/v0/tags'
}

export class TagInitializationError extends BaseError {
  public name = 'TagInitializationError'
  constructor (public message: string = 'Could not initialize tag.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TagInitializationError.prototype)
  }
}

export class TagFetchRemoteError extends BaseError {
  public name = 'TagFetchRemoteError'
  constructor (public message: string = 'Could not get tag.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TagFetchRemoteError.prototype)
  }
}

export class TagsFetchRemoteError extends BaseError {
  public name = 'TagsFetchRemoteError'
  constructor (public message: string = 'Could not get tags.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TagsFetchRemoteError.prototype)
  }
}
