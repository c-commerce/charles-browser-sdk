
import qs from 'qs'
import { Client } from '../../../client'
import { APICarrier } from '../../../base'
import Entity, { EntityFetchOptions, EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import { Cloud } from '../../index'
import { UniverseUser, UniverseUserRawPayload, UniverseUsersFetchRemoteError } from '../user'

export interface CloudUniverseOptions extends EntityOptions {
  rawPayload?: CloudUniverseRawPayload
}

export interface DeployOptions {
  readonly method: string
  readonly url: string
  readonly headers: Object
  readonly responseType: string
  readonly data?: {
    readonly ids: [string]
  }
}

export interface CloudUniverseRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: string
  readonly active?: string
  readonly name?: string | null
  readonly configuration?: object
  readonly deployed_configuration?: object
  readonly pool?: string
  readonly organization?: string
  readonly status?: object
  readonly release?: string | null

}

export interface CloudUniversePayload {
  readonly id?: CloudUniverseRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: string
  readonly active?: string
  readonly name?: CloudUniverseRawPayload['name']
  readonly configuration?: CloudUniverseRawPayload['configuration']
  readonly deployed_configuration?: CloudUniverseRawPayload['deployed_configuration']
  readonly pool?: CloudUniverseRawPayload['pool']
  readonly organization?: CloudUniverseRawPayload['organization']
  readonly status?: CloudUniverseRawPayload['status']
  readonly release?: CloudUniverseRawPayload['release']
}

export interface UniverseDeployStatus {
  readonly deployStatus: string | null
  readonly jobStatus: string | null
}

export interface UniversesUpdateAllResponse {
  readonly id: string
  readonly deployStatus: string | null
  readonly jobStatus: string | null
}

export interface UniverseInviteUserRawPayload {
  readonly id?: string
  readonly email?: string
  readonly username?: string
  readonly password?: string
}

export interface UserResult {
  readonly id: string
  readonly email: string
  readonly username: string
}
export interface SaveMultiplePayload {
  readonly ids: [string]
  readonly api: string
  readonly agent_ui: string
}

export interface SaveResponse {
  readonly id: string
  readonly status: string
}

export interface SaveMultipleResponse {
  readonly results: [SaveResponse]
}

/**
 * Manage CloudUniverses.
 *
 * @category Entity
 */
export class CloudUniverse extends Entity<CloudUniversePayload, CloudUniverseRawPayload> {
  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: CloudUniverseOptions
  public initialized: boolean

  public endpoint: string

  public id?: CloudUniversePayload['id']
  public createdAt?: CloudUniversePayload['createdAt']
  public updatedAt?: CloudUniversePayload['updatedAt']
  public deleted?: CloudUniversePayload['deleted']
  public active?: CloudUniversePayload['active']
  public name?: CloudUniversePayload['name']
  public configuration?: CloudUniversePayload['configuration']
  public deployed_configuration?: CloudUniversePayload['deployed_configuration']
  public pool?: CloudUniversePayload['pool']
  public organization?: CloudUniversePayload['organization']
  public status?: CloudUniversePayload['status']
  public release?: CloudUniversePayload['release']

  constructor (options: CloudUniverseOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/universes'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  public async destroy (): Promise<String> {
    if (this.id === null || this.id === undefined) throw new TypeError('Universe.deploy requires universe id to be set.')
    const endpoint = `api/v0/universes/${this.id}/deploy/v2`
    let res
    try {
      const opts = {
        method: 'DELETE',
        url: `${this.apiCarrier?.injectables?.base}/${endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      res = await this.http?.getClient()(opts)
      return res.data.msg
    } catch (err) {
      throw this.handleError(new DestroyUniverseError(undefined, { error: err }))
    }
  }

  public async saveMultiple (payload: SaveMultiplePayload): Promise<SaveMultipleResponse> {
    if (this.id === null || this.id === undefined) throw new TypeError('Universe.deploy requires universe id to be set.')
    const saveEndpoint = 'api/v0/universes/'
    let res
    try {
      const opts = {
        method: 'PUT',
        url: `${this.apiCarrier?.injectables?.base}/${saveEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json',
        data: payload
      }

      res = await this.http?.getClient()(opts)
      return res.data as SaveMultipleResponse
    } catch (err) {
      throw this.handleError(new CloudUniverseSaveAllError(undefined, { error: err }, res?.status, res?.data))
    }
  }

  protected deserialize (rawPayload: CloudUniverseRawPayload): CloudUniverse {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? 'false'
    this.active = rawPayload.active ?? 'true'
    this.name = rawPayload.name
    this.configuration = rawPayload.configuration
    this.deployed_configuration = rawPayload?.deployed_configuration ?? undefined
    this.pool = rawPayload.pool
    this.organization = rawPayload.organization
    this.status = rawPayload.status
    this.release = rawPayload.release
    return this
  }

  public static create (payload: CloudUniverseRawPayload, carrier: Cloud, http: Cloud['http']): CloudUniverse {
    return new CloudUniverse({ rawPayload: payload, carrier, http, initialized: true })
  }

  public async getImageTags (image: string): Promise<string[]> {
    const endpoint = `api/v0/image-repository/${image}/tags`
    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }
      const res = await this.http?.getClient()(opts)
      const tags = res.data.data as string[]
      return tags
    } catch (err) {
      throw this.handleError(new CloudUniverseDeployFromUniverseConfigRemoteError(undefined, { error: err }))
    }
  }

  public serialize (): CloudUniverseRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? 'false',
      active: this.active ?? 'true',
      name: this.name,
      configuration: this.configuration,
      deployed_configuration: this?.deployed_configuration ?? undefined,
      pool: this.pool,
      organization: this.organization,
      status: this.status,
      release: this.release
    }
  }

  public async updateAll (): Promise<UniversesUpdateAllResponse[]> {
    try {
      const updateAllEndpoint = `${this.endpoint}/deploy/status`
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${updateAllEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const resource = res.data.data as UniversesUpdateAllResponse[]
      return resource
    } catch (err) {
      throw this.handleError(new UniversesUpdateAllError())
    }
  }

  public async init (): Promise<CloudUniverse | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new CloudUniverseInitializationError(undefined, { error: err }))
    }
  }

  public async invite (payload: UniverseInviteUserRawPayload): Promise<UniverseUserRawPayload> {
    if (this.id === null || this.id === undefined) throw new TypeError('universe.users() requires universe id to be set.')
    const { id, username, email, password } = payload
    if (id && (username ?? email ?? password)) {
      // Either invite a completely new user, or an existing one
      throw new InviteUserInvalidPayloadError()
    }
    try {
      let userId
      if (id) {
        userId = id
      } else {
        const endpointUser = 'v0/users'
        const opts = {
          method: 'POST',
          url: `${this.apiCarrier?.injectables?.base}/${endpointUser}`,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          responseType: 'json'
        }
        const res = await this.http?.getClient()(opts)
        const user = res.data.data as UserResult
        userId = user.id
      }
      const universe = this.id
      const endpointInvite = `v0/universes/${universe}/invite`
      const opts = {
        method: 'POST',
        url: `${this.apiCarrier?.injectables?.base}/${endpointInvite}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }
      const res = await this.http?.getClient()(opts)
      const resource = res.data.data as UniverseUserRawPayload
      return UniverseUser.create(resource, this.apiCarrier as Cloud, this.http)
    } catch (err) {
      throw new InviteUserError()
    }
  }

  public async users (options?: EntityFetchOptions): Promise<UniverseUserRawPayload[]> {
    if (this.id === null || this.id === undefined) throw new TypeError('universe.users() requires universe id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id}/users${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const resources = res.data.data as UniverseUserRawPayload[]
      if (options && options.raw === true) {
        return resources
      }

      return resources.map((item: UniverseUserRawPayload) => {
        return UniverseUser.create(item, this.apiCarrier as Cloud, this.http)
      })
    } catch (err) {
      throw this.handleError(new UniverseUsersFetchRemoteError(undefined, { error: err }))
    }
  }

  public async patchDeployFromRelease (releaseId: string): Promise<CloudUniverse> {
    if (this.id === null || this.id === undefined) throw new TypeError('Universe.deploy requires universe id to be set.')
    if (releaseId === null || releaseId === undefined) throw new TypeError('universe.deploy requires release id to be set.')

    try {
      const opts = {
        method: 'PATCH',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id}/deploy/releases/${releaseId}}`,
        headers: {

        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const resource = res.data.data[0] as CloudUniverseRawPayload

      return CloudUniverse.create(resource, this.apiCarrier as Cloud, this.http)
    } catch (err) {
      throw this.handleError(new CloudUniversePatchDeployFromReleaseRemoteError(undefined, { error: err }))
    }
  }

  public async deployStatus (): Promise<UniverseDeployStatus> {
    if (this.id === null || this.id === undefined) throw new TypeError('Universe.deployStatus requires universe id to be set.')
    const statusEndpoint = `api/v0/universes/${this.id}/deploy/status`
    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${statusEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      const resource = res.data.data as UniverseDeployStatus
      return resource
    } catch (err) {
      throw this.handleError(new CloudUniverseStatusFromUniverseConfigRemoteError(undefined, { error: err }))
    }
  }

  public async deploy (payload?: [string]): Promise<string> {
    if (this.id === null || this.id === undefined) throw new TypeError('Universe.deploy requires universe id to be set.')
    let deployEndpoint = `api/v0/universes/${this.id}/deploy/v2`
    const ids = payload ?? [] as unknown as [string]
    if (ids) {
      deployEndpoint = 'api/v0/universes/deploy/v2'
    }
    try {
      const opts: DeployOptions = {
        method: 'PUT',
        url: `${this.apiCarrier?.injectables?.base}/${deployEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json',
        data: { ids }
      }
      const res = await this.http?.getClient()(opts)
      return res.statusText
    } catch (err) {
      throw this.handleError(new CloudUniverseDeployFromUniverseConfigRemoteError(undefined, { error: err }))
    }
  }

  universe (item: any, universe: any, http: Client): any {
    throw new Error('Method not implemented.')
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CloudUniverses {
  public static endpoint: string = 'api/v0/universes'
}
export class CloudUniverseInitializationError extends BaseError {
  public name = 'CloudUniverseInitializationError'
  constructor (public message: string = 'Could not initialize CloudUniverse.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CloudUniverseInitializationError.prototype)
  }
}

export class CloudUniverseFetchRemoteError extends BaseError {
  public name = 'CloudUniverseFetchRemoteError'
  constructor (public message: string = 'Could not get CloudUniverse.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CloudUniverseFetchRemoteError.prototype)
  }
}

export class CloudUniversesFetchRemoteError extends BaseError {
  public name = 'CloudUniversesFetchRemoteError'
  constructor (public message: string = 'Could not get CloudUniverses.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CloudUniversesFetchRemoteError.prototype)
  }
}

export class CloudUniverseGetImageTagsError extends BaseError {
  public name = 'CloudUniverseGetImageTagsError'
  constructor (public message: string = 'Could not fetch image tags unexpectedly.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CloudUniverseGetImageTagsError.prototype)
  }
}

export class CloudUniverseDeployFromUniverseConfigRemoteError extends BaseError {
  public name = 'CloudUniverseDeployFromUniverseConfigRemoteError'
  constructor (public message: string = 'Could alter deployment unexpectedly.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CloudUniverseDeployFromUniverseConfigRemoteError.prototype)
  }
}
export class CloudUniverseStatusFromUniverseConfigRemoteError extends BaseError {
  public name = 'CloudUniverseStatusFromUniverseConfigRemoteError'
  constructor (public message: string = 'Could not get universe status.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CloudUniverseStatusFromUniverseConfigRemoteError.prototype)
  }
}
export class CloudUniversePatchDeployFromReleaseRemoteError extends BaseError {
  public name = 'CloudUniversePatchDeployFromReleaseRemoteError'
  constructor (public message: string = 'Could alter deployment unexpectedly.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CloudUniversePatchDeployFromReleaseRemoteError.prototype)
  }
}
export class UniversesUpdateAllError extends BaseError {
  public name = 'UniversesUpdateAllError'
  constructor (public message: string = 'Could not update universes.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniversesUpdateAllError.prototype)
  }
}
export class InviteUserInvalidPayloadError extends BaseError {
  public name = 'InviteUserInvalidPayloadError'
  constructor (public message: string = 'Invalid payload: either id or new user information must be provided, ot both', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, InviteUserInvalidPayloadError.prototype)
  }
}
export class CloudUniverseSaveAllError extends BaseError {
  public name = 'CloudUniverseSaveAllError'
  constructor (public message: string = 'Error saving all universes', properties?: any, status: number = 0, data: object = {}) {
    super(`${message}, HTTP response status and data (if any): ${status}, ${JSON.stringify(data)}`, properties)
    Object.setPrototypeOf(this, CloudUniverseSaveAllError.prototype)
  }
}
export class InviteUserError extends BaseError {
  public name = 'InviteUserError'
  constructor (public message: string = 'Error inviting new user', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, InviteUserError.prototype)
  }
}
export class DestroyUniverseError extends BaseError {
  public name = 'InviteUserError'
  constructor (public message: string = 'Error destroying universe', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DestroyUniverseError.prototype)
  }
}
