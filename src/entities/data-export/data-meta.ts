
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface DataExportMetaOptions extends UniverseEntityOptions {
  rawPayload?: DataExportMetaRawPayload
}

export interface DataExportMetaRawPayload {
  readonly id?: string
  readonly data?: { [key: string]: any }

}

export interface DataExportMetaPayload {
  readonly id?: DataExportMetaRawPayload['id']
  readonly data?: DataExportMetaRawPayload['data']

}

/**
 * Manage DataExportMetas.
 *
 * @category Entity
 */
export class DataExportMeta extends UniverseEntity<DataExportMetaPayload, DataExportMetaRawPayload> {
  public get entityName (): string {
    return 'data_export_meta'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: DataExportMetaOptions
  public initialized: boolean

  public endpoint: string

  public id?: DataExportMetaPayload['id']
  public data?: DataExportMetaPayload['data']

  constructor (options: DataExportMetaOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/data_export_meta'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: DataExportMetaRawPayload): DataExportMeta {
    this.setRawPayload(rawPayload)
    this.id = rawPayload.id
    this.data = rawPayload.data

    return this
  }

  public static create (payload: DataExportMetaRawPayload, universe: Universe, http: Universe['http']): DataExportMeta {
    return new DataExportMeta({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): DataExportMetaRawPayload {
    return {
      id: this.id,
      data: this.data

    }
  }

  public async init (): Promise<DataExportMeta | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new DataExportMetaInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DataExportMetas {
  public static endpoint: string = 'api/v0/data_export_meta'
}

export class DataExportMetaInitializationError extends BaseError {
  public name = 'DataExportMetaInitializationError'
  constructor (public message: string = 'Could not initialize DataExportMeta.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DataExportMetaInitializationError.prototype)
  }
}

export class DataExportMetaFetchRemoteError extends BaseError {
  public name = 'DataExportMetaFetchRemoteError'
  constructor (public message: string = 'Could not get DataExportMeta.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DataExportMetaFetchRemoteError.prototype)
  }
}

export class DataExportMetasFetchRemoteError extends BaseError {
  public name = 'DataExportMetasFetchRemoteError'
  constructor (public message: string = 'Could not get DataExportMetas.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, DataExportMetasFetchRemoteError.prototype)
  }
}
