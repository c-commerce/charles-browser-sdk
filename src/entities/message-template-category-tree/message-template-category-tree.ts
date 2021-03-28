
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface MessageTemplateCategoryTreeOptions extends UniverseEntityOptions {
  rawPayload?: MessageTemplateCategoryTreeRawPayload
}

export interface MessageTemplateCategoryTreeRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly summary?: string
  readonly description?: string
  readonly comment?: string
  // TODO: implement recursive children definition. Currenctly there is no value in that definition
  readonly children?: null | any[]
}

export interface MessageTemplateCategoryTreePayload {
  readonly id?: MessageTemplateCategoryTreeRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: MessageTemplateCategoryTreeRawPayload['deleted']
  readonly active?: MessageTemplateCategoryTreeRawPayload['active']
  readonly name?: MessageTemplateCategoryTreeRawPayload['name']
  readonly summary?: MessageTemplateCategoryTreeRawPayload['summary']
  readonly description?: MessageTemplateCategoryTreeRawPayload['description']
  readonly comment?: MessageTemplateCategoryTreeRawPayload['comment']
  readonly children?: MessageTemplateCategoryTreeRawPayload['children']
}

/**
 * Manage message template category trees.
 *
 * @category Entity
 */
export class MessageTemplateCategoryTree extends UniverseEntity<MessageTemplateCategoryTreePayload, MessageTemplateCategoryTreeRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: MessageTemplateCategoryTreeOptions
  public initialized: boolean

  public endpoint: string

  public id?: MessageTemplateCategoryTreePayload['id']
  public createdAt?: MessageTemplateCategoryTreePayload['createdAt']
  public updatedAt?: MessageTemplateCategoryTreePayload['updatedAt']
  public deleted?: MessageTemplateCategoryTreePayload['deleted']
  public active?: MessageTemplateCategoryTreePayload['active']
  public name?: MessageTemplateCategoryTreePayload['name']
  public summary?: MessageTemplateCategoryTreePayload['summary']
  public description?: MessageTemplateCategoryTreePayload['description']
  public comment?: MessageTemplateCategoryTreePayload['comment']
  public children?: MessageTemplateCategoryTreePayload['children']

  constructor (options: MessageTemplateCategoryTreeOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/message_template_category_trees'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: MessageTemplateCategoryTreeRawPayload): MessageTemplateCategoryTree {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.summary = rawPayload.summary
    this.description = rawPayload.description
    this.comment = rawPayload.comment
    this.children = rawPayload.children

    return this
  }

  public static create (payload: MessageTemplateCategoryTreeRawPayload, universe: Universe, http: Universe['http']): MessageTemplateCategoryTree {
    return new MessageTemplateCategoryTree({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): MessageTemplateCategoryTreeRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      summary: this.summary,
      description: this.description,
      comment: this.comment,
      children: this.children
    }
  }

  public async init (): Promise<MessageTemplateCategoryTree | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new MessageTemplateCategoryTreeInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageTemplateCategoryTrees {
  public static endpoint: string = 'api/v0/message_template_category_trees'
}

export class MessageTemplateCategoryTreeInitializationError extends BaseError {
  public name = 'MessageTemplateCategoryTreeInitializationError'
  constructor (public message: string = 'Could not initialize message template category tree.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageTemplateCategoryTreeInitializationError.prototype)
  }
}

export class MessageTemplateCategoryTreeFetchRemoteError extends BaseError {
  public name = 'MessageTemplateCategoryTreeFetchRemoteError'
  constructor (public message: string = 'Could not get message template category tree.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageTemplateCategoryTreeFetchRemoteError.prototype)
  }
}

export class MessageTemplateCategoryTreesFetchRemoteError extends BaseError {
  public name = 'MessageTemplateCategoryTreesFetchRemoteError'
  constructor (public message: string = 'Could not get message template category trees.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageTemplateCategoryTreesFetchRemoteError.prototype)
  }
}
