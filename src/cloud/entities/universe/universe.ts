
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

export interface CloudUniverseRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string | null
  readonly configuration?: object
  readonly pool?: string
  readonly organization?: string
  readonly status?: object
  readonly release?: string

}

export interface CloudUniversePayload {
  readonly id?: CloudUniverseRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: CloudUniverseRawPayload['name']
  readonly configuration?: CloudUniverseRawPayload['configuration']
  readonly pool?: CloudUniverseRawPayload['pool']
  readonly organization?: CloudUniverseRawPayload['organization']
  readonly status?: CloudUniverseRawPayload['status']
  readonly release?: CloudUniverseRawPayload['release']
}

export interface UniverseDeployStatus {
  readonly deployStatus: string | null
  readonly jobStatus: string | null
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

  protected deserialize (rawPayload: CloudUniverseRawPayload): CloudUniverse {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.configuration = rawPayload.configuration
    this.pool = rawPayload.pool
    this.organization = rawPayload.organization
    this.status = rawPayload.status
    this.release = rawPayload.release
    return this
  }

  public static create (payload: CloudUniverseRawPayload, carrier: Cloud, http: Cloud['http']): CloudUniverse {
    return new CloudUniverse({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): CloudUniverseRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      configuration: this.configuration,
      pool: this.pool,
      organization: this.organization,
      status: this.status,
      release: this.release
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

  public async deploy (): Promise<string> {
    if (this.id === null || this.id === undefined) throw new TypeError('Universe.deploy requires universe id to be set.')
    const deployEndpoint = `api/v0/universes/${this.id}/deploy/v2`
    try {
      const opts = {
        method: 'PUT',
        url: `${this.apiCarrier?.injectables?.base}/${deployEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
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
