
import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import type { Cloud } from '../../index'

export interface UniverseUserOptions extends EntityOptions {
  rawPayload?: UniverseUserRawPayload
}

export interface UniverseUserRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly universe?: string
  readonly light_profile?: object
  // readonly username?: string
  // readonly email?: string
  // readonly permissions?: string[]
  // readonly roles?: string[]
  // readonly status?: string
}

export interface UniverseUserPayload {
  readonly id?: UniverseUserRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly universe?: UniverseUserRawPayload['universe']
  readonly lightProfile?: UniverseUserRawPayload['light_profile']
  // readonly username?: UniverseUserRawPayload['username']
  // readonly email?: UniverseUserRawPayload['email']
  // readonly permissions?: UniverseUserRawPayload['permissions']
  // readonly roles?: UniverseUserRawPayload['roles']
  // readonly status?: UniverseUserRawPayload['status']
}

/**
 * Manage UniverseUsers.
 *
 * @category Entity
 */
export class UniverseUser extends Entity<UniverseUserPayload, UniverseUserRawPayload> {
  public get entityName (): string {
    return 'universe_user'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: UniverseUserOptions
  public initialized: boolean

  public endpoint: string

  public id?: UniverseUserPayload['id']
  public createdAt?: UniverseUserPayload['createdAt']
  public updatedAt?: UniverseUserPayload['updatedAt']
  public deleted?: UniverseUserPayload['deleted']
  public active?: UniverseUserPayload['active']
  public universe?: UniverseUserPayload['universe']
  public lightProfile?: UniverseUserPayload['lightProfile']
  // public username?: UniverseUserPayload['username']
  // public email?: UniverseUserPayload['email']
  // public permissions?: UniverseUserPayload['permissions']
  // public roles?: UniverseUserPayload['roles']
  // public status?: UniverseUserPayload['status']

  constructor (options: UniverseUserOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/users'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload?.universe) {
      this.endpoint = `api/v0/universes/${options.rawPayload.universe}/users`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: UniverseUserRawPayload): UniverseUser {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.universe = rawPayload.universe
    this.lightProfile = rawPayload.light_profile
    // this.username = rawPayload.username
    // this.email = rawPayload.email
    // this.permissions = rawPayload.permissions
    // this.roles = rawPayload.roles
    // this.status = rawPayload.status

    return this
  }

  public static create (payload: UniverseUserRawPayload, carrier: Cloud, http: Cloud['http']): UniverseUser {
    return new UniverseUser({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): UniverseUserRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      universe: this.universe,
      light_profile: this.lightProfile
      // username: this.username,
      // email: this.email,
      // permissions: this.permissions,
      // roles: this.roles,
      // status: this.status
    }
  }

  public async init (): Promise<UniverseUser | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new UniverseUserInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UniverseUsers {
  public static endpoint: string = 'api/v0/users'
}

export class UniverseUserInitializationError extends BaseError {
  public name = 'UniverseUserInitializationError'
  constructor (public message: string = 'Could not initialize UniverseUser.', properties?: any) {
    super(message, properties)
  }
}

export class UniverseUserFetchRemoteError extends BaseError {
  public name = 'UniverseUserFetchRemoteError'
  constructor (public message: string = 'Could not get UniverseUser.', properties?: any) {
    super(message, properties)
  }
}

export class UniverseUsersFetchRemoteError extends BaseError {
  public name = 'UniverseUsersFetchRemoteError'
  constructor (public message: string = 'Could not get UniverseUsers.', properties?: any) {
    super(message, properties)
  }
}
