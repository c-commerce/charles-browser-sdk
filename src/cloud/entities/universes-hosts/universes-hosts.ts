import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import type { Cloud } from '../../index'
import type { LogLevel, ReleaseHistoryResponse, UniverseIam } from '../universe'
import { ReleaseHistoryError } from '../universe'

export interface OperatorPatchableOptions {
  readonly logLevel?: LogLevel
  readonly otlp?: boolean
}

export interface UniversesHostOptions extends EntityOptions {
  rawPayload?: UniversesHostRawPayload
}

export interface UniversesHostRawPayload {
  readonly id?: string
  readonly name?: string
  readonly active?: boolean
  readonly deleted?: boolean
  readonly release?: string
  readonly sql_instance?: string
  readonly created_at?: string
  readonly updated_at?: string
}

export interface UniversesHostPayload {
  readonly id?: UniversesHostRawPayload['id']
  readonly name?: UniversesHostRawPayload['name']
  readonly active?: UniversesHostRawPayload['active']
  readonly deleted?: UniversesHostRawPayload['deleted']
  readonly release?: UniversesHostRawPayload['release']
  readonly sqlInstance?: UniversesHostRawPayload['sql_instance']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
}

export interface UniverseHostDeploymentResult {
  statusCode: number
  timestamp: string
}

export type UniverseHostDeploymentResultMap = Record<string, UniverseHostDeploymentResult>

export interface UniverseHostCRD {
  readonly id: string
  readonly name: string
  readonly sqlInstance: string
  readonly createdAt: string
  readonly configuration: {
    readonly release: {
      readonly author: string
      readonly name: string
      readonly timestamp: Date
    }
    readonly versions: {
      readonly api?: string
      readonly agent_ui?: string
    }
  }
  readonly privileges: UniverseIam[]
  readonly logLevel: LogLevel
  readonly featureFlags: { [key: string]: any }
  readonly otlp: boolean
  readonly userHasPermissions: boolean
  readonly status: string
  readonly applied: boolean
  readonly drift: boolean
  readonly driftExplanation: string
  readonly isLive: boolean
  readonly churned: {
    readonly churnLevel: string
  }
  readonly rawCrd?: any
}

/**
 * Manage universe hosts.
 *
 * @category Entity
 */
export class UniversesHost extends Entity<UniversesHostPayload, UniversesHostRawPayload> {
  public get entityName (): string {
    return 'universe_hosts'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: UniversesHostOptions
  public initialized: boolean

  public endpoint: string

  public id?: UniversesHostPayload['id']
  public name?: UniversesHostPayload['name']
  public active?: UniversesHostPayload['active']
  public deleted?: UniversesHostPayload['deleted']
  public release?: UniversesHostPayload['release']
  public sqlInstance?: UniversesHostPayload['sqlInstance']
  public createdAt?: UniversesHostPayload['createdAt']
  public updatedAt?: UniversesHostPayload['updatedAt']

  constructor (options: UniversesHostOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/mt-hosts'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: UniversesHostRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.name = rawPayload.name
    this.active = rawPayload.active ?? true
    this.deleted = rawPayload.deleted ?? false
    this.release = rawPayload.release
    this.sqlInstance = rawPayload.sql_instance
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined

    return this
  }

  public static create (payload: UniversesHostRawPayload, carrier: Cloud, http: Cloud['http']): UniversesHost {
    return new UniversesHost({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): UniversesHostRawPayload {
    return {
      id: this.id,
      name: this.name,
      active: this.active ?? true,
      deleted: this.deleted ?? false,
      release: this.release,
      sql_instance: this.sqlInstance,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new UniverseHostInitializationError(undefined, { error: err }))
    }
  }

  public async save (payload?: UniversesHostRawPayload): Promise<this> {
    try {
      const opts = {
        method: this.id ? 'PUT' : 'POST',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}${this.id ? `/${this.id}` : ''}`,
        data: payload ?? this.serialize(),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      const res = await this.http?.getClient()(opts)
      this.deserialize(res.data.data)

      return this
    } catch (err) {
      throw this.handleError(new UniverseHostSaveError(undefined, { error: err }))
    }
  }

  public async fetchCrd (): Promise<UniverseHostCRD> {
    const operatorEndpoint = `api/v0/operator/mt-hosts/${this.id}`
    try {
      const opts = {
        method: 'GET',
        url: `${this.apiCarrier?.injectables?.base}/${operatorEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }
      const res = await this.http?.getClient()(opts)
      const { status, msg, data } = res.data
      if (status === 200) {
        return data
      } else {
        throw this.handleError(new UniverseHostOperatorError())
      }
    } catch (err) {
      throw this.handleError(new UniverseHostOperatorError())
    }
  }

  public async deploy (): Promise<this> {
    const deployEndpoint = `api/v0/mt-hosts/${this.id}/deploy`
    try {
      const opts = {
        method: 'POST',
        url: `${this.apiCarrier?.injectables?.base}/${deployEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      await this.http?.getClient()(opts)

      return this
    } catch (err) {
      throw this.handleError(new UniverseHostOperatorError(undefined, { error: err }))
    }
  }

  public async patchRelease (release: string): Promise<UniverseHostDeploymentResult> {
    const patchEndpoint = `api/v0/mt-hosts/release`
    try {
      const opts = {
        method: 'PATCH',
        url: `${this.apiCarrier?.injectables?.base}/${patchEndpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: {
          hostIds: [this.id],
          release
        }
      }

      const res = await this.http?.getClient()(opts)
      return res.data.data[`mthost-${this.id}`]
    } catch (err) {
      throw this.handleError(new UniverseHostOperatorError(undefined, { error: err }))
    }
  }

  public async patchOptions (payload: OperatorPatchableOptions): Promise<void> {
    const endpoint = `api/v0/universes/operator/${this.id}/options`
    try {
      const opts = {
        method: 'PATCH',
        url: `${this.apiCarrier?.injectables?.base}/${endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json',
        data: {
          ...payload,
          kind: 'MTHOST'
        }
      }
      const res = await this.http?.getClient()(opts)
      const { status } = res.data
      if (status !== 200) {
        throw this.handleError(new UniverseHostOperatorError())
      }
    } catch (err) {
      throw this.handleError(new UniverseHostOperatorError())
    }
  }

  public async fetchReleaseHistory (): Promise<ReleaseHistoryResponse[]> {
      const endpoint = `api/v0/universes/release-history/${this.id}`
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
        const { status, msg, data } = res.data
        if (status === 200) {
          return data
        } else {
          throw this.handleError(new ReleaseHistoryError())
        }
      } catch (err) {
        throw this.handleError(new ReleaseHistoryError())
      }
    }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UniversesHosts {
  public static endpoint: string = 'api/v0/mt-hosts'
}

export class UniverseHostInitializationError extends BaseError {
  public name = 'UniverseHostInitializationError'
  constructor (public message: string = 'Could not initialize UniverseHost.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniverseHostInitializationError.prototype)
  }
}

export class UniverseHostFetchRemoteError extends BaseError {
  public name = 'UniverseHostFetchRemoteError'
  constructor (public message: string = 'Could not get UniverseHost.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniverseHostFetchRemoteError.prototype)
  }
}

export class UniverseHostsFetchRemoteError extends BaseError {
  public name = 'UniverseHostsFetchRemoteError'
  constructor (public message: string = 'Could not get universe hosts.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniverseHostsFetchRemoteError.prototype)
  }
}

export class UniverseHostSaveError extends BaseError {
  public name = 'UniverseHostSaveError'
  constructor (public message: string = 'Could not save UniverseHost.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniverseHostSaveError.prototype)
  }
}

export class UniverseHostOperatorError extends BaseError {
  public name = 'UniverseHostOperatorError'
  constructor (public message: string = 'Could not fetch universe host from operator.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, UniverseHostOperatorError.prototype)
  }
}
