
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions, EntitiesList } from '../_base'
import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { BaseError } from '../../errors'

export interface FormProviderOptions extends UniverseEntityOptions {
  rawPayload?: FormProviderRawPayload
}

export interface FormProviderRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly uri?: string
  readonly metadata?: object| any
  readonly configuration?: object| any
  readonly integration_configuration?: string
  readonly is_proxy?: boolean
  readonly is_set_up?: boolean
  readonly proxy_vendor?: string
  readonly external_reference_id?: string
  readonly labels?: object| any
}

export interface FormProviderPayload {
  readonly id?: FormProviderRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: FormProviderRawPayload['deleted']
  readonly active?: FormProviderRawPayload['active']
  readonly name?: FormProviderRawPayload['name']
  readonly uri?: FormProviderRawPayload['uri']
  readonly metadata?: FormProviderRawPayload['metadata']
  readonly configuration?: FormProviderRawPayload['configuration']
  readonly integrationConfiguration?: FormProviderRawPayload['integration_configuration']
  readonly isProxy?: FormProviderRawPayload['is_proxy']
  readonly isSetUp?: FormProviderRawPayload['is_set_up']
  readonly proxyVendor?: FormProviderRawPayload['proxy_vendor']
  readonly externalReferenceId?: FormProviderRawPayload['external_reference_id']
  readonly labels?: FormProviderRawPayload['labels']
}

/**
 * Manage form_providers.
 *
 * @category Entity
 */
export class FormProvider extends UniverseEntity<FormProviderPayload, FormProviderRawPayload> {
  public get entityName (): string {
    return 'form_providers'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: FormProviderOptions
  public initialized: boolean

  public endpoint: string

  public id?: FormProviderPayload['id']
  public createdAt?: FormProviderPayload['createdAt']
  public updatedAt?: FormProviderPayload['updatedAt']
  public deleted?: FormProviderPayload['deleted']
  public active?: FormProviderPayload['active']
  public name?: FormProviderPayload['name']
  public uri?: FormProviderPayload['uri']
  public metadata?: FormProviderPayload['metadata']
  public configuration?: FormProviderPayload['configuration']
  public integrationConfiguration?: FormProviderPayload['integrationConfiguration']
  public isProxy?: FormProviderPayload['isProxy']
  public isSetUp?: FormProviderPayload['isSetUp']
  public proxyVendor?: FormProviderPayload['proxyVendor']
  public externalReferenceId?: FormProviderPayload['externalReferenceId']
  public labels?: FormProviderPayload['labels']

  constructor (options: FormProviderOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/form_providers'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: FormProviderRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.uri = rawPayload.uri
    this.metadata = rawPayload.metadata
    this.configuration = rawPayload.configuration
    this.integrationConfiguration = rawPayload.integration_configuration
    this.isProxy = rawPayload.is_proxy ?? false
    this.isSetUp = rawPayload.is_set_up ?? false
    this.proxyVendor = rawPayload.proxy_vendor
    this.externalReferenceId = rawPayload.external_reference_id
    this.labels = rawPayload.labels

    return this
  }

  public static create (payload: FormProviderRawPayload, universe: Universe, http: Universe['http']): FormProvider {
    return new FormProvider({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): FormProviderRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      uri: this.uri,
      metadata: this.metadata,
      configuration: this.configuration,
      integration_configuration: this.integrationConfiguration,
      is_proxy: this.isProxy ?? false,
      is_set_up: this.isSetUp ?? false,
      proxy_vendor: this.proxyVendor,
      external_reference_id: this.externalReferenceId,
      labels: this.labels
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new FormProviderInitializationError(undefined, { error: err }))
    }
  }

  public async syncFormInstances (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('FormProvider syncFormInstances requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/form_instances`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new FormProviderSyncFormInstancesRemoteError(undefined, { error: err }))
    }
  }
}

export interface FormProvidersOptions {
  universe: Universe
  http: Universe['http']
}

export class FormProviders extends EntitiesList<FormProvider, FormProviderRawPayload> {
  public static endpoint: string = 'api/v0/form_providers'
  public endpoint: string = FormProviders.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']

  constructor (options: FormProvidersOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: FormProviderRawPayload): FormProvider {
    return FormProvider.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<FormProviders> {
    return (await this._getStream(options)) as FormProviders
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }

  public async fetch (options: EntityFetchOptions): Promise<FormProvider[] | FormProviderRawPayload[] | undefined> {
    try {
      return await super.fetch(options)
    } catch (err) {
      throw new FormProvidersFetchRemoteError(undefined, { error: err })
    }
  }
}

export class FormProviderInitializationError extends BaseError {
  public name = 'FormProviderInitializationError'
  constructor (public message: string = 'Could not initialize form_provider.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FormProviderInitializationError.prototype)
  }
}

export class FormProviderFetchRemoteError extends BaseError {
  public name = 'FormProviderFetchRemoteError'
  constructor (public message: string = 'Could not get form_provider.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FormProviderFetchRemoteError.prototype)
  }
}

export class FormProvidersFetchRemoteError extends BaseError {
  public name = 'FormProvidersFetchRemoteError'
  constructor (public message: string = 'Could not get form_providers.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FormProvidersFetchRemoteError.prototype)
  }
}

export class FormProviderSyncFormInstancesRemoteError extends BaseError {
  public name = 'FormProviderSyncFormInstancesRemoteError'
  constructor (public message: string = 'Could not start sync of form_providers form instances', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FormProviderSyncFormInstancesRemoteError.prototype)
  }
}
