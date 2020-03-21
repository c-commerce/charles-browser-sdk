
import Entity, { EntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface TicketOptions extends EntityOptions {
  rawPayload?: TicketRawPayload
}

export interface TicketRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly due_at?: string
  readonly closure_at?: string
  readonly flagged?: boolean
  readonly author?: string
  readonly status?: string
  readonly assignee?: string
  readonly title?: string
  readonly description?: string
  readonly priority?: 'immediate' | 'highest' | 'high' | 'medium' | 'low' | 'lowest' | string
  readonly attachments?: string[]
  readonly attached_resource?: string
  readonly attached_resource_type?: 'feed' | 'event' | 'person' | string
  readonly tags?: string[]
  readonly linked?: object[]
}

export interface TicketPayload {
  readonly id?: TicketRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly dueAt?: Date | null
  readonly closureAt?: Date | null
  readonly flagged?: boolean
  readonly author?: string
  readonly status?: string
  readonly assignee?: string
  readonly title?: string
  readonly description?: string
  readonly priority?: TicketRawPayload['priority']
  readonly attachments?: string[]
  readonly attachedResource?: string
  readonly attachedResourceType?: TicketRawPayload['attached_resource_type']
  readonly tags?: string[]
  readonly linked?: TicketRawPayload['linked']
}

/**
 * Manage tickets in a business context.
 *
 * @category Entity
 */
export class Ticket extends Entity<TicketPayload, TicketRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: TicketOptions
  public initialized: boolean

  public endpoint: string
  public id?: TicketPayload['id']
  public createdAt?: TicketPayload['createdAt']
  public updatedAt?: TicketPayload['updatedAt']
  public deleted?: TicketPayload['deleted']
  public active?: TicketPayload['active']
  public dueAt?: TicketPayload['dueAt']
  public closureAt?: TicketPayload['closureAt']
  public flagged?: TicketPayload['flagged']
  public author?: TicketPayload['author']
  public status?: TicketPayload['status']
  public assignee?: TicketPayload['assignee']
  public title?: TicketPayload['title']
  public description?: TicketPayload['description']
  public priority?: TicketPayload['priority']
  public attachments?: TicketPayload['attachments']
  public attachedResource?: TicketPayload['attachedResource']
  public attachedResourceType?: TicketPayload['attachedResourceType']
  public tags?: TicketPayload['tags']
  public linked?: TicketPayload['linked']

  constructor(options: TicketOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/tickets'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize(rawPayload: TicketRawPayload): Ticket {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted || false
    this.active = rawPayload.active || true
    this.dueAt = rawPayload.due_at ? new Date(rawPayload.due_at) : undefined
    this.closureAt = rawPayload.closure_at ? new Date(rawPayload.closure_at) : undefined
    this.flagged = rawPayload.flagged || false
    this.author = rawPayload.author
    this.status = rawPayload.status
    this.assignee = rawPayload.assignee
    this.title = rawPayload.title
    this.description = rawPayload.description
    this.priority = rawPayload.priority
    this.attachments = rawPayload.attachments
    this.attachedResource = rawPayload.attached_resource
    this.attachedResourceType = rawPayload.attached_resource_type
    this.tags = rawPayload.tags
    this.linked = rawPayload.linked

    return this
  }

  public static create(payload: TicketRawPayload, universe: Universe, http: Universe['http']): Ticket {
    return new Ticket({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): TicketRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted || false,
      active: this.active || true,
      due_at: this.dueAt ? this.dueAt.toISOString() : undefined,
      closure_at: this.closureAt ? this.closureAt.toISOString() : undefined,
      flagged: this.flagged,
      author: this.author,
      status: this.status,
      assignee: this.assignee,
      title: this.title,
      description: this.description,
      priority: this.priority,
      attachments: this.attachments,
      attached_resource: this.attachedResource,
      attached_resource_type: this.attachedResourceType,
      tags: this.tags,
      linked: this.linked
    }
  }

  public async init(): Promise<Ticket | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new TicketInitializationError(undefined, { error: err }))
    }
  }

  public async fetch(): Promise<Ticket | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id}`)

      this.deserialize(res.data.data[0] as TicketRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new TicketFetchRemoteError(undefined, { error: err }))
    }
  }
}

export class Tickets {
  public static endpoint: string = 'api/v0/tickets'
}

export class TicketInitializationError extends BaseError {
  public name = 'TicketInitializationError'
  constructor(public message: string = 'Could not initialize ticket.', properties?: any) {
    super(message, properties)
  }
}

export class TicketFetchRemoteError extends BaseError {
  public name = 'TicketFetchRemoteError'
  constructor(public message: string = 'Could not get ticket.', properties?: any) {
    super(message, properties)
  }
}

export class TicketsFetchRemoteError extends BaseError {
  public name = 'TicketsFetchRemoteError'
  constructor(public message: string = 'Could not get tickets.', properties?: any) {
    super(message, properties)
  }
}
