import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base'
import { Universe, UniverseFetchOptions } from '../../universe'
import { DataExportFilter } from '../data-export/data-export'
import { BaseError } from '../../errors'
import { AxiosResponse } from 'axios'

export interface AsyncExportOptions extends UniverseEntityOptions {
  rawPayload?: AsyncExportRawPayload
}

export interface AsyncExportRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly job_reference_id?: string
  readonly file_id?: string
  readonly signed_at?: string
  readonly expires_at?: string

  readonly type?: string
  readonly request?: DataExportFilter[]
  readonly staff_ids?: string[]
}

export interface AsyncExportPayload {
  readonly id?: AsyncExportRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: AsyncExportRawPayload['deleted']
  readonly active?: AsyncExportRawPayload['active']

  readonly jobReferenceId?: AsyncExportRawPayload['job_reference_id']
  readonly fileId?: AsyncExportRawPayload['file_id']
  readonly signedAt?: AsyncExportRawPayload['signed_at']
  readonly expiresAt?: AsyncExportRawPayload['expires_at']

  // Not optional - fix the undefined BS later
  readonly type?: AsyncExportRawPayload['type']
  readonly request?: AsyncExportRawPayload['request']
  readonly staffIds?: AsyncExportRawPayload['staff_ids']
}

export class AsyncExport extends UniverseEntity<AsyncExportPayload, AsyncExportRawPayload> {
  public get entityName (): string {
    return 'async_exports'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: AsyncExportOptions
  public initialized: boolean

  public endpoint: string

  public id?: AsyncExportPayload['id']
  public createdAt?: AsyncExportPayload['createdAt']
  public updatedAt?: AsyncExportPayload['updatedAt']
  public deleted?: AsyncExportPayload['deleted']
  public active?: AsyncExportPayload['active']

  public jobReferenceId?: AsyncExportPayload['jobReferenceId']
  public fileId?: AsyncExportPayload['fileId']
  public signedAt?: AsyncExportPayload['signedAt']
  public expiresAt?: AsyncExportPayload['expiresAt']

  public type?: AsyncExportPayload['type']
  public request?: AsyncExportPayload['request']
  public staffIds?: AsyncExportPayload['staffIds']

  constructor (options: AsyncExportOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v1/exports'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: AsyncExportRawPayload): this {
    this.setRawPayload(rawPayload)

    this.type = rawPayload.type
    this.request = rawPayload.request
    this.staffIds = rawPayload.staff_ids

    return this
  }

  public static create (payload: AsyncExportRawPayload, universe: Universe, http: Universe['http']): AsyncExport {
    return new AsyncExport({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): AsyncExportRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active,

      job_reference_id: this.jobReferenceId,
      file_id: this.fileId,
      signed_at: this.signedAt,
      expires_at: this.expiresAt,

      type: this.type,
      // What will this look like
      request: this.request,
      staff_ids: this.staffIds
    }
  }

  public async init (): Promise<AsyncExport | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new AsyncExportInitializationError(undefined, { error: err }))
    }
  }

  // This schedules a job for exporting data. The job will be executed asynchronously.
  // We only care about the status code here, so we don't need to return the payload.
  public async createExport (payload: AsyncExportRawPayload | AsyncExportPayload): Promise<AxiosResponse> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: payload,
        responseType: 'json'
      }

      const response = await this.http.getClient()(opts)

      // Maybe not needed but for now
      // const responseData = response.data.data[0]

      return response
    } catch (err) {
      throw this.handleError(new AsyncExportInitializationError(undefined, { error: err }))
    }
  }

  public async exports (options?: EntityFetchOptions): Promise<AsyncExport[] | AsyncExportRawPayload[] | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        params: options?.query,
        responseType: 'json',
        timeout: options?.timeout ?? 10000
      }

      const response = await this.http.getClient()(opts)

      const resources = response.data.data as AsyncExportRawPayload[]

      if (options && options.raw === true) {
        return resources
      }

      return resources.map((item: AsyncExportRawPayload) => {
        return AsyncExport.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw this.handleError(new AsyncExportInitializationError(undefined, { error: err }))
    }
  }

  public async exportsCount (options?: EntityFetchOptions): Promise<{ count: number } | undefined> {
    try {
      const opts = {
        method: 'HEAD',
        url: `${this.universe.universeBase}/${this.endpoint}`,
        timeout: options?.timeout ?? 10000
      }

      const res = await this.http.getClient()(opts)
      return {
        count: Number(res.headers['x-total-count'] || res.headers['x-resource-count'])
      }
    } catch (error) {
      this.handleError(new AsyncExportsCountRemoteError(undefined, { error }))
    }
  }

  public async export (id: string, options?: UniverseFetchOptions): Promise<AsyncExport | AsyncExportRawPayload |undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${id}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        params: options?.query,
        responseType: 'json',
        timeout: options?.timeout ?? 10000
      }

      const response = await this.http.getClient()(opts)

      const responseData = response.data.data[0]

      return AsyncExport.create(responseData, this.universe, this.http)
    } catch (err) {
      throw this.handleError(new AsyncExportInitializationError(undefined, { error: err }))
    }
  }
}

export class AsyncExportInitializationError extends BaseError {
  public name = 'AsyncExportInitializationError'
  constructor (public message: string = 'Could not initialize async export.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AsyncExportInitializationError.prototype)
  }
}

export class AsyncExportFetchRemoteError extends BaseError {
  public name = 'AsyncExportFetchRemoteError'
  constructor (public message: string = 'Could not get async export.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AsyncExportFetchRemoteError.prototype)
  }
}

export class AsyncExportDeleteError extends BaseError {
  public name = 'AsyncExportDeleteError'
  constructor (public message: string = 'Could not delete async export.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AsyncExportDeleteError.prototype)
  }
}

export class AsyncExportsCountRemoteError extends BaseError {
  public name = 'AsyncExportsCountRemoteError'
  constructor (public message: string = 'Could not get async exports count.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AsyncExportsCountRemoteError.prototype)
  }
}

// TODO: add extra error handlers for async export edge cases such as in progress
