import { UniverseEntity, UniverseEntityOptions, EntityRawPayload } from '../../entities/_base'
import { Universe } from '../../universe'
import { Feed } from './feed'
// import { BaseError } from '../../errors'

export interface CommentOptions extends UniverseEntityOptions {
  rawPayload?: CommentRawPayload
  feed: Feed
  universe: Universe
  http: Universe['http']
  initialized?: boolean
}

export interface CommentRawPayload extends EntityRawPayload{
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly content?: object
}

export interface CommentPayload {
  readonly id?: CommentRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly content?: CommentRawPayload['content']
}

export class Comment extends UniverseEntity<CommentPayload, CommentRawPayload> {
  public get entityName (): string {
    return 'comments'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected feed: Feed
  protected http: Universe['http']
  public initialized: boolean
  protected options: CommentOptions

  public endpoint: string
  public id?: CommentPayload['id']
  public createdAt?: CommentPayload['createdAt']
  public updatedAt?: CommentPayload['updatedAt']
  public deleted?: CommentPayload['deleted']
  public content?: CommentPayload['content']

  constructor (options: CommentOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.feed = options.feed
    this.endpoint = `${this.feed.id as string}/comments`
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CommentRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.content = rawPayload.content

    return this
  }

  public static create (payload: CommentRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Comment {
    return new Comment({ rawPayload: payload, universe, http, initialized: true, feed })
  }

  public static createUninitialized (payload: CommentRawPayload, feed: Feed, universe: Universe, http: Universe['http']): Comment {
    return new Comment({ rawPayload: payload, universe, http, initialized: false, feed })
  }

  public serialize (): CommentRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      content: this.content
    }
  }
}
