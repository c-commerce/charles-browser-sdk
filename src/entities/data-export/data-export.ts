
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface DataExportOptions extends UniverseEntityOptions {
  rawPayload?: DataExportRawPayload
}

export interface DataExportRawPayload {
  readonly data?: { [key: string]: any }
  readonly name?: string
  readonly dateRange?: { [key: string]: any }
  readonly filteredColumn?: string
}

export interface DataExportPayload {
  readonly data?: DataExportRawPayload['data']
  readonly name?: DataExportRawPayload['name']
  readonly dateRange?: DataExportRawPayload['dateRange']
  readonly filteredColumn?: DataExportRawPayload['filteredColumn']
}

/**
 * Manage DataExports.
 *
 * @category Entity
 */
export class DataExport extends UniverseEntity<DataExportPayload, DataExportRawPayload> {
  public get entityName (): string {
    return 'data_exports'
  }

  public id?: string | undefined
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: DataExportOptions
  public initialized: boolean
  public endpoint: string
  public data?: DataExportPayload['data']
  public dateRange?: DataExportPayload['dateRange']
  public filteredColumn?: DataExportPayload['filteredColumn']

  constructor (options: DataExportOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/data_export/'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload && options.rawPayload.name) {
      this.endpoint = `api/v0/data_export/${options.rawPayload.name}`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: DataExportRawPayload): this {
    this.setRawPayload(rawPayload)

    this.data = rawPayload.data
    this.dateRange = rawPayload.dateRange
    this.filteredColumn = rawPayload.filteredColumn

    return this
  }

  public static create (payload: DataExportRawPayload, universe: Universe, http: Universe['http']): DataExport {
    return new DataExport({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): DataExportRawPayload {
    return {
      data: this.data

    }
  }

  public async fetchData (): Promise<DataExport | undefined> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: this._rawPayload ?? undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)
      return response.data.data
    } catch (err) {
      throw this.handleError(new DataExportInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DataExports {
  public static endpoint: string = 'api/v0/data_export_meta'
}

export class DataExportInitializationError extends BaseError {
  public name = 'DataExportInitializationError'
  constructor (public message: string = 'Could not initialize DataExport.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DataExportInitializationError.prototype)
  }
}

export class DataExportFetchRemoteError extends BaseError {
  public name = 'DataExportFetchRemoteError'
  constructor (public message: string = 'Could not get DataExport.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DataExportFetchRemoteError.prototype)
  }
}

export class DataExportsFetchRemoteError extends BaseError {
  public name = 'DataExportsFetchRemoteError'
  constructor (public message: string = 'Could not get DataExports.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DataExportsFetchRemoteError.prototype)
  }
}
