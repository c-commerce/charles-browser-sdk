
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ContactListOptions extends EntityOptions {
  rawPayload?: ContactListRawPayload
}

export interface ContactListRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly summary?: string
  readonly filters?: Array<{
    effect?: 'include' | 'exclude'
    query?: string
  }> | null
  readonly type?: 'dynamic' | 'static'
  readonly author?: {
    staff?: string[]
    user?: string[]
  }
}

export interface ContactListPayload {
  readonly id?: ContactListRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ContactListRawPayload['deleted']
  readonly active?: ContactListRawPayload['active']

  readonly name?: ContactListRawPayload['name']
  readonly summary?: ContactListRawPayload['summary']
  readonly filters?: ContactListRawPayload['filters']
  readonly type?: ContactListRawPayload['type']
  readonly author?: ContactListRawPayload['author']
}

/**
 * Manage contact_lists.
 *
 * @category Entity
 */
export class ContactList extends Entity<ContactListPayload, ContactListRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: ContactListOptions
  public initialized: boolean

  public endpoint: string

  public id?: ContactListPayload['id']
  public createdAt?: ContactListPayload['createdAt']
  public updatedAt?: ContactListPayload['updatedAt']
  public deleted?: ContactListPayload['deleted']
  public active?: ContactListPayload['active']

  public name?: ContactListPayload['name']
  public summary?: ContactListPayload['summary']
  public filters?: ContactListPayload['filters']
  public type?: ContactListPayload['type']
  public author?: ContactListPayload['author']

  constructor (options: ContactListOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/contact_lists'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ContactListRawPayload): ContactList {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name
    this.summary = rawPayload.summary
    this.filters = rawPayload.filters
    this.type = rawPayload.type
    this.author = rawPayload.author

    return this
  }

  public static create (payload: ContactListRawPayload, universe: Universe, http: Universe['http']): ContactList {
    return new ContactList({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ContactListRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      name: this.name,
      summary: this.summary,
      filters: this.filters,
      type: this.type,
      author: this.author
    }
  }

  public async init (): Promise<ContactList | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ContactListInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ContactLists {
  public static endpoint: string = 'api/v0/contact_lists'
}

export class ContactListInitializationError extends BaseError {
  public name = 'ContactListInitializationError'
  constructor (public message: string = 'Could not initialize contact_list.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListInitializationError.prototype)
  }
}

export class ContactListFetchRemoteError extends BaseError {
  public name = 'ContactListFetchRemoteError'
  constructor (public message: string = 'Could not get contact_list.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListFetchRemoteError.prototype)
  }
}

export class ContactListsFetchRemoteError extends BaseError {
  public name = 'ContactListsFetchRemoteError'
  constructor (public message: string = 'Could not get contact_lists.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListsFetchRemoteError.prototype)
  }
}
export class ContactListsFetchCountRemoteError extends BaseError {
  public name = 'ContactListsFetchCountRemoteError'
  constructor (public message: string = 'Could not get count of Contact Lists.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListsFetchCountRemoteError.prototype)
  }
}
