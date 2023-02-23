
import { UniverseEntity, UniverseEntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { FeedRawPayload } from '../../eventing/feeds/feed'

export interface StaffOptions extends UniverseEntityOptions {
  rawPayload?: StaffRawPayload
}

export interface StaffMessageTemplateFavorite {
  id: string
  created_at: string
  locale: string
}
export interface StaffPreferences {
  message_template_favorites?: StaffMessageTemplateFavorite[]
}

export interface StaffRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly first_name?: string
  readonly middle_name?: string
  readonly last_name?: string
  readonly display_name?: string
  readonly comment?: string
  readonly type?: 'agent' | 'bot'
  readonly gender?: string
  readonly user?: string
  readonly universe_user?: string
  readonly roles?: string[]
  readonly permissions?: string[]
  readonly invite?: null | {
    [key: string]: any
  }
  readonly custom_id?: string
  readonly preferences?: StaffPreferences
}

export interface StaffPayload {
  readonly id?: StaffRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly firstName?: StaffRawPayload['first_name']
  readonly middleName?: StaffRawPayload['middle_name']
  readonly lastName?: StaffRawPayload['last_name']
  readonly comment?: StaffRawPayload['comment']
  readonly type?: StaffRawPayload['type']
  readonly gender?: StaffRawPayload['gender']
  readonly user?: StaffRawPayload['user']
  readonly universeUser?: StaffRawPayload['universe_user']
  readonly roles?: StaffRawPayload['roles']
  readonly permissions?: StaffRawPayload['permissions']
  readonly invite?: StaffRawPayload['invite']
  readonly customId?: StaffRawPayload['custom_id']
  readonly preferences?: StaffRawPayload['preferences']
}

/**
 * Manage staff members.
 *
 * @category Entity
 */
export class Staff extends UniverseEntity<StaffPayload, StaffRawPayload> {
  public get entityName (): string {
    return 'staff'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: StaffOptions
  public initialized: boolean

  public endpoint: string

  public id?: StaffPayload['id']
  public createdAt?: StaffPayload['createdAt']
  public updatedAt?: StaffPayload['updatedAt']
  public deleted?: StaffPayload['deleted']
  public active?: StaffPayload['active']
  public firstName?: StaffRawPayload['first_name']
  public middleName?: StaffRawPayload['middle_name']
  public lastName?: StaffRawPayload['last_name']
  public comment?: StaffRawPayload['comment']
  public type?: StaffRawPayload['type']
  public gender?: StaffRawPayload['gender']
  public user?: StaffRawPayload['user']
  public universeUser?: StaffRawPayload['universe_user']
  public roles?: StaffRawPayload['roles']
  public permissions?: StaffRawPayload['permissions']
  public invite?: StaffRawPayload['invite']
  public customId?: StaffRawPayload['custom_id']
  public preferences?: StaffRawPayload['preferences']

  constructor (options: StaffOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/staff'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: StaffRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.firstName = rawPayload.first_name
    this.middleName = rawPayload.middle_name
    this.lastName = rawPayload.last_name
    this.comment = rawPayload.comment
    this.type = rawPayload.type
    this.gender = rawPayload.gender
    this.user = rawPayload.user
    this.universeUser = rawPayload.universe_user
    this.roles = rawPayload.roles
    this.permissions = rawPayload.permissions
    this.invite = rawPayload.invite
    this.customId = rawPayload.custom_id
    this.preferences = rawPayload.preferences

    return this
  }

  public static create (payload: StaffRawPayload, universe: Universe, http: Universe['http']): Staff {
    return new Staff({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): StaffRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      first_name: this.firstName,
      middle_name: this.middleName,
      last_name: this.lastName,
      comment: this.comment,
      type: this.type,
      gender: this.gender,
      user: this.user,
      universe_user: this.universeUser,
      roles: this.roles,
      permissions: this.permissions,
      invite: this.invite,
      custom_id: this.customId,
      preferences: this.preferences
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new StaffInitializationError(undefined, { error: err }))
    }
  }

  public async inviteUser (userEmail: string, userFirstName: string): Promise<Staff | undefined> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/invite`,
        data: {
          email: userEmail ?? undefined,
          first_name: userFirstName ?? undefined
        }
      }

      const response = await this.http.getClient()(opts)

      this.deserialize(response.data.data[0] as StaffRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new StaffInviteError(undefined, { error: err }))
    }
  }

  public async feeds (): Promise<FeedRawPayload[] | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/feeds`
      }

      const response = await this.http.getClient()(opts)
      const payloads = response.data.data as FeedRawPayload[]

      return payloads
    } catch (err) {
      throw this.handleError(new StaffFeedsFetchError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Staffs {
  public static endpoint: string = 'api/v0/staff'
}

export class StaffInitializationError extends BaseError {
  public name = 'StaffInitializationError'
  constructor (public message: string = 'Could not initialize staff.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffInitializationError.prototype)
  }
}

export class StaffFetchRemoteError extends BaseError {
  public name = 'StaffFetchRemoteError'
  constructor (public message: string = 'Could not get staff.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffFetchRemoteError.prototype)
  }
}

export class StaffsFetchRemoteError extends BaseError {
  public name = 'StaffsFetchRemoteError'
  constructor (public message: string = 'Could not get staffs.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffsFetchRemoteError.prototype)
  }
}

export class StaffInviteError extends BaseError {
  public name = 'StaffInviteError'
  constructor (public message: string = 'Could not invite user unexpectedly.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffInviteError.prototype)
  }
}

export class StaffFeedsFetchError extends BaseError {
  public name = 'StaffFeedsFetchError'
  constructor (public message: string = 'Could load feeds unexpectedly.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffFeedsFetchError.prototype)
  }
}
