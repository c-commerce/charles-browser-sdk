
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { ContactLists } from './contact-list'

export interface StaticEntryOptions extends EntityOptions {
  rawPayload?: ContactListStaticEntryRawPayload
}

export interface ContactListStaticEntryRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly effect?: 'include' | 'exclude'
  readonly resource?: {
    type?: 'person'
    payload?: {
      id?: string
    }
  } | {
    type?: 'channel_user'
    payload?: {
      id?: string
    }
  }| {
    type?: 'external_channel_user'
    payload?: {
      message_broker?: string
      channel_user_external_reference_id?: string
    }
  }
  readonly origin_resource?: {
    type?: 'manual'
  } | {
    type?: 'subscription' | 'list'
    resource?: string
  }
  readonly contact_list?: string
}

export interface ContactListStaticEntryPayload {
  readonly id?: ContactListStaticEntryRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ContactListStaticEntryRawPayload['deleted']
  readonly active?: ContactListStaticEntryRawPayload['active']

  readonly effect?: ContactListStaticEntryRawPayload['effect']
  readonly resource?: ContactListStaticEntryRawPayload['resource']
  readonly originResource?: ContactListStaticEntryRawPayload['origin_resource']
  // readonly contactList?: ContactListStaticEntryRawPayload['contact_list']
}

/**
 * Manage static_entries.
 *
 * @category Entity
 */
export class ContactListStaticEntry extends Entity<ContactListStaticEntryPayload, ContactListStaticEntryRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: StaticEntryOptions
  public initialized: boolean

  public endpoint: string

  public id?: ContactListStaticEntryPayload['id']
  public createdAt?: ContactListStaticEntryPayload['createdAt']
  public updatedAt?: ContactListStaticEntryPayload['updatedAt']
  public deleted?: ContactListStaticEntryPayload['deleted']
  public active?: ContactListStaticEntryPayload['active']

  public effect?: ContactListStaticEntryPayload['effect']
  public resource?: ContactListStaticEntryPayload['resource']
  public originResource?: ContactListStaticEntryPayload['originResource']
  // public contactList?: ContactListStaticEntryPayload['contactList']

  constructor (options: StaticEntryOptions) {
    super()
    this.universe = options.universe
    this.endpoint = ''
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
    if (options?.rawPayload && options.rawPayload.contact_list) {
      this.endpoint = `${ContactLists.endpoint}/${options.rawPayload.contact_list}/static_entries`
    }
  }

  protected deserialize (rawPayload: ContactListStaticEntryRawPayload): ContactListStaticEntry {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.effect = rawPayload.effect
    this.resource = rawPayload.resource
    this.originResource = rawPayload.origin_resource
    // this.contactList = rawPayload.contact_list

    return this
  }

  public static create (payload: ContactListStaticEntryRawPayload, universe: Universe, http: Universe['http']): ContactListStaticEntry {
    return new ContactListStaticEntry({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ContactListStaticEntryRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      effect: this.effect,
      resource: this.resource,
      origin_resource: this.originResource
      // contact_list: this.contactList
    }
  }

  public async init (): Promise<ContactListStaticEntry | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ContactListStaticEntryInitializationError(undefined, { error: err }))
    }
  }

  public static createUninitialized (
    payload: ContactListStaticEntryRawPayload,
    universe: Universe,
    http: Universe['http']
  ): ContactListStaticEntry {
    return new ContactListStaticEntry({ rawPayload: payload, universe, http, initialized: false })
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
// export class StaticEntries {
//   public static endpoint: string = 'api/v0/static_entries'
// }

export class ContactListStaticEntryInitializationError extends BaseError {
  public name = 'ContactListStaticEntryInitializationError'
  constructor (public message: string = 'Could not initialize contact list static_entry.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListStaticEntryInitializationError.prototype)
  }
}

export class ContactListStaticEntryFetchRemoteError extends BaseError {
  public name = 'ContactListStaticEntryFetchRemoteError'
  constructor (public message: string = 'Could not get contact list static_entry.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListStaticEntryFetchRemoteError.prototype)
  }
}

export class ContactListStaticEntriesFetchRemoteError extends BaseError {
  public name = 'ContactListStaticEntriesFetchRemoteError'
  constructor (public message: string = 'Could not get contact list static_entries.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListStaticEntriesFetchRemoteError.prototype)
  }
}
export class ContactListStaticEntryCreateRemoteError extends BaseError {
  public name = 'ContactListStaticEntryCreateRemoteError'
  constructor (public message: string = 'Could not create contact list static entry.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListStaticEntryCreateRemoteError.prototype)
  }
}
export class ContactListStaticEntryDeleteRemoteError extends BaseError {
  public name = 'ContactListStaticEntryDeleteRemoteError'
  constructor (public message: string = 'Could not delete contact list static entry.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListStaticEntryDeleteRemoteError.prototype)
  }
}
