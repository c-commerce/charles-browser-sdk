
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import qs from 'qs'

export interface ImportOptions extends UniverseEntityOptions {
  rawPayload?: ImportRawPayload
}

export enum IOnDuplicateEnum {
  Update = 'update',
  Skip = 'skip',
}

export type IOnDuplicateType = IOnDuplicateEnum.Update | IOnDuplicateEnum.Skip

export enum IStatusEnum {
  Created = 'created',
  ValidatedError = 'validated_error',
  ValidatedSuccess = 'validated_success',
  Processing = 'processing',
  ProcessedSuccess = 'processed_success',
  ProcessedSuccessWithError = 'processed_success_with_error',
  ProcessedError = 'processed_error'
}

export type IStatusType = IStatusEnum.Created | IStatusEnum.ValidatedError | IStatusEnum.ValidatedSuccess | IStatusEnum.Processing | IStatusEnum.ProcessedSuccess | IStatusEnum.ProcessedSuccessWithError | IStatusEnum.ProcessedError

export enum IImportFromEnum {
  File = 'file',
}

export type IImportFromType = IImportFromEnum.File

export enum IResourceEnum {
  Contacts = 'contacts',
}

export type IResourceType = IResourceEnum.Contacts

export interface ImportRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly resource?: IResourceType | null
  readonly error_strategy?: {
    continue_on_error?: boolean
  }
  readonly validation_strategy?: {
    skip_invalid?: boolean
  }
  readonly duplication_strategy?: {
    on_duplicate?: IOnDuplicateType | null
  }
  readonly field_map?: {
    people_phonenumber_external_value?: {
      source?: string
      update_existing?: boolean
    }
    people_organization_external_name?: {
      source?: string
      update_existing?: boolean
    }
    people_external_firstname?: {
      source?: string
      update_existing?: boolean
    }
    people_external_last_name?: {
      source?: string
      update_existing?: boolean
    }
    people_external_email?: {
      source?: string
      update_existing?: boolean
    }
  }
  readonly auto_assignment?: {
    tags?: string[]
    lists?: string[]
    message_subscriptions_granted?: string[]
    message_subscriptions_denied?: string[]
  }
  readonly status?: IStatusType | null
  readonly import_from?: IImportFromType | null
  readonly date?: Date
  readonly labels?: object
  readonly original_file_name?: string

}

export interface ImportPayload {
  readonly id?: ImportRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ImportRawPayload['deleted']
  readonly active?: ImportRawPayload['active']

  readonly name?: ImportRawPayload['name']
  readonly resource: ImportRawPayload['resource']
  readonly errorStrategy?: ImportRawPayload['error_strategy']
  readonly validationStrategy?: ImportRawPayload['validation_strategy']
  readonly duplicationStrategy?: ImportRawPayload['duplication_strategy']
  readonly fieldMap?: ImportRawPayload['field_map']
  readonly autoAssignment?: ImportRawPayload['auto_assignment']
  readonly status?: ImportRawPayload['status']
  readonly importFrom?: ImportRawPayload['import_from']
  readonly date?: ImportRawPayload['date']
  readonly labels?: ImportRawPayload['labels']
  readonly originalFileName?: ImportRawPayload['original_file_name']
}

/**
 * Manage imports.
 *
 * @category Entity
 */
export class Import extends UniverseEntity<ImportPayload, ImportRawPayload> {
  public get entityName (): string {
    return 'imports'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ImportOptions
  public initialized: boolean

  public endpoint: string

  public id?: ImportPayload['id']
  public createdAt?: ImportPayload['createdAt']
  public updatedAt?: ImportPayload['updatedAt']
  public deleted?: ImportPayload['deleted']
  public active?: ImportPayload['active']
  public name?: ImportPayload['name']
  public resource?: ImportPayload['resource']
  public errorStrategy?: ImportPayload['errorStrategy']
  public validationStrategy?: ImportPayload['validationStrategy']
  public duplicationStrategy?: ImportPayload['duplicationStrategy']
  public fieldMap?: ImportPayload['fieldMap']
  public autoAssignment?: ImportPayload['autoAssignment']
  public status?: ImportPayload['status']
  public importFrom?: ImportPayload['importFrom']
  public date?: ImportPayload['date']
  public labels?: ImportPayload['labels']
  public originalFileName?: ImportPayload['originalFileName']

  constructor (options: ImportOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/imports'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ImportRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name
    this.resource = rawPayload.resource
    this.errorStrategy = rawPayload.error_strategy
    this.validationStrategy = rawPayload.validation_strategy
    this.duplicationStrategy = rawPayload.duplication_strategy
    this.fieldMap = rawPayload.field_map
    this.autoAssignment = rawPayload.auto_assignment
    this.status = rawPayload.status
    this.importFrom = rawPayload.import_from
    this.date = rawPayload.date
    this.labels = rawPayload.labels
    this.originalFileName = rawPayload.original_file_name

    return this
  }

  public static create (payload: ImportRawPayload, universe: Universe, http: Universe['http']): Import {
    return new Import({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ImportRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      name: this.name,
      resource: this.resource,
      error_strategy: this.errorStrategy,
      validation_strategy: this.validationStrategy,
      duplication_strategy: this.duplicationStrategy,
      field_map: this.fieldMap,
      auto_assignment: this.autoAssignment,
      status: this.status,
      import_from: this.importFrom,
      date: this.date,
      labels: this.labels,
      original_file_name: this.originalFileName
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ImportInitializationError(undefined, { error: err }))
    }
  }

  /**
   * Preview the import
   */
  public async preview (options?: EntityFetchOptions): Promise<Import> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/preview${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      this.deserialize(res.data.data[0])
      return this
    } catch (err) {
      throw this.handleError(new ImportPreviewRemoteError(undefined, { error: err }))
    }
  }

  /**
   * Process the import
   */
  public async process (options?: EntityFetchOptions): Promise<Import> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/process${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)

      this.deserialize(res.data.data[0])
      return this
    } catch (err) {
      throw this.handleError(new ImportProcessRemoteError(undefined, { error: err }))
    }
  }

  /**
   * Upload the import
   */
  public async upload (payload: FormData): Promise<Import> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/upload`,
        timeout: 60000,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: payload
      }

      const res = await this.http?.getClient()(opts)

      this.deserialize(res.data.data[0])

      return this
    } catch (err) {
      throw this.handleError(new ImportUploadRemoteError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Imports {
  public static endpoint: string = 'api/v0/imports'
}

export class ImportInitializationError extends BaseError {
  public name = 'ImportInitializationError'
  constructor (public message: string = 'Could not initialize import.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImportInitializationError.prototype)
  }
}

export class ImportFetchRemoteError extends BaseError {
  public name = 'ImportFetchRemoteError'
  constructor (public message: string = 'Could not get import.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImportFetchRemoteError.prototype)
  }
}

export class ImportsFetchRemoteError extends BaseError {
  public name = 'ImportsFetchRemoteError'
  constructor (public message: string = 'Could not get imports.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImportsFetchRemoteError.prototype)
  }
}

export class ImportPreviewRemoteError extends BaseError {
  public name = 'ImportPreviewRemoteError'
  constructor (public message: string = 'Could not preview import.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImportPreviewRemoteError.prototype)
  }
}

export class ImportProcessRemoteError extends BaseError {
  public name = 'ImportProcessRemoteError'
  constructor (public message: string = 'Could not process import.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImportProcessRemoteError.prototype)
  }
}

export class ImportUploadRemoteError extends BaseError {
  public name = 'ImportUploadRemoteError'
  constructor (public message: string = 'Could not upload import.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImportUploadRemoteError.prototype)
  }
}

export class ImportsFetchCountRemoteError extends BaseError {
  public name = 'ImportsFetchCountRemoteError'
  constructor (public message: string = 'Could not fetch count of imports.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ImportsFetchCountRemoteError.prototype)
  }
}
