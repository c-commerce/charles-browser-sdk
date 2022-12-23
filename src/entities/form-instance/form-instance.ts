
import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions, EntitiesList } from '../_base'
import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { BaseError } from '../../errors'
import qs from 'qs'

export interface FormInstanceOptions extends UniverseEntityOptions {
  rawPayload?: FormInstanceRawPayload
}

export interface FormInstanceRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly uri?: string
  readonly type?: string
  readonly form_provider?: string
  readonly external_reference_id?: string
  readonly configuration?: object | any
  readonly proxy_vendor?: string
  readonly proxy_payload?: object | any
  readonly field_map?: object | any
  readonly auto_assignment?: object | any
  readonly labels?: object | any
  readonly fields?: object[] | any
}

export interface FormInstancePayload {
  readonly id?: FormInstanceRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: FormInstanceRawPayload['deleted']
  readonly active?: FormInstanceRawPayload['active']
  readonly name?: FormInstanceRawPayload['name']
  readonly uri?: FormInstanceRawPayload['uri']
  readonly type?: FormInstanceRawPayload['type']
  readonly formProvider?: FormInstanceRawPayload['form_provider']
  readonly externalReferenceId?: FormInstanceRawPayload['external_reference_id']
  readonly configuration?: FormInstanceRawPayload['configuration']
  readonly proxyVendor?: FormInstanceRawPayload['proxy_vendor']
  readonly proxyPayload?: FormInstanceRawPayload['proxy_payload']
  readonly fieldMap?: FormInstanceRawPayload['field_map']
  readonly autoAssignment?: FormInstanceRawPayload['auto_assignment']
  readonly labels?: FormInstanceRawPayload['labels']
  readonly fields?: FormInstanceRawPayload['fields']
}

/**
 * Manage form_instances.
 *
 * @category Entity
 */
export class FormInstance extends UniverseEntity<FormInstancePayload, FormInstanceRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt: RealtimeClient
  protected options: FormInstanceOptions
  public initialized: boolean

  public endpoint: string

  public id?: FormInstancePayload['id']
  public createdAt?: FormInstancePayload['createdAt']
  public updatedAt?: FormInstancePayload['updatedAt']
  public deleted?: FormInstancePayload['deleted']
  public active?: FormInstancePayload['active']

  public name?: FormInstancePayload['name']
  public uri?: FormInstancePayload['uri']
  public type?: FormInstancePayload['type']
  public formProvider?: FormInstancePayload['formProvider']
  public externalReferenceId?: FormInstancePayload['externalReferenceId']
  public configuration?: FormInstancePayload['configuration']
  public proxyVendor?: FormInstancePayload['proxyVendor']
  public proxyPayload?: FormInstancePayload['proxyPayload']
  public fieldMap?: FormInstancePayload['fieldMap']
  public autoAssignment?: FormInstancePayload['autoAssignment']
  public labels?: FormInstancePayload['labels']
  public fields?: FormInstancePayload['fields']

  constructor (options: FormInstanceOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/form_instances'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.mqtt = options.mqtt

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: FormInstanceRawPayload): FormInstance {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.name = rawPayload.name
    this.uri = rawPayload.uri
    this.type = rawPayload.type
    this.formProvider = rawPayload.form_provider
    this.externalReferenceId = rawPayload.external_reference_id
    this.configuration = rawPayload.configuration
    this.proxyVendor = rawPayload.proxy_vendor
    this.proxyPayload = rawPayload.proxy_payload
    this.fieldMap = rawPayload.field_map
    this.autoAssignment = rawPayload.auto_assignment
    this.labels = rawPayload.labels
    this.fields = rawPayload.fields

    return this
  }

  public static create (payload: FormInstanceRawPayload, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): FormInstance {
    return new FormInstance({ rawPayload: payload, universe, http, mqtt, initialized: true })
  }

  public serialize (): FormInstanceRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      uri: this.uri,
      type: this.type,
      form_provider: this.formProvider,
      external_reference_id: this.externalReferenceId,
      configuration: this.configuration,
      proxy_vendor: this.proxyVendor,
      proxy_payload: this.proxyPayload,
      field_map: this.fieldMap,
      auto_assignment: this.autoAssignment,
      labels: this.labels,
      fields: this.fields
    }
  }

  public async init (): Promise<FormInstance | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new FormInstanceInitializationError(undefined, { error: err }))
    }
  }

  /**
   * Set a webhook for this form instance.
   */
  public async createWebhook (options?: EntityFetchOptions): Promise<FormInstance> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/webhooks${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      this.deserialize(res.data.data[0])

      return this
    } catch (err) {
      throw this.handleError(new FormInstancesCreateWebhookRemoteError(undefined, { error: err }))
    }
  }
}

export interface FormInstancesOptions {
  universe: Universe
  http: Universe['http']
}

export class FormInstances extends EntitiesList<FormInstance, FormInstanceRawPayload> {
  public static endpoint: string = 'api/v0/form_instances'
  public endpoint: string = FormInstances.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt: RealtimeClient

  constructor (options: FormInstancesOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: FormInstanceRawPayload): FormInstance {
    return FormInstance.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<FormInstances> {
    return (await this._getStream(options)) as FormInstances
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }

  public async fetch (options: EntityFetchOptions): Promise<FormInstance[] | FormInstanceRawPayload[] | undefined> {
    try {
      return await super.fetch(options)
    } catch (err) {
      throw new FormInstancesFetchRemoteError(undefined, { error: err })
    }
  }
}

export class FormInstanceInitializationError extends BaseError {
  public name = 'FormInstanceInitializationError'
  constructor (public message: string = 'Could not initialize form_instance.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FormInstanceInitializationError.prototype)
  }
}

export class FormInstanceFetchRemoteError extends BaseError {
  public name = 'FormInstanceFetchRemoteError'
  constructor (public message: string = 'Could not get form_instance.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FormInstanceFetchRemoteError.prototype)
  }
}

export class FormInstancesFetchRemoteError extends BaseError {
  public name = 'FormInstancesFetchRemoteError'
  constructor (public message: string = 'Could not get form_instances.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FormInstancesFetchRemoteError.prototype)
  }
}

export class FormInstancesCreateWebhookRemoteError extends BaseError {
  public name = 'FormInstancesCreateWebhookRemoteError'
  constructor (public message: string = 'Could not create webhook for form_instances.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FormInstancesCreateWebhookRemoteError.prototype)
  }
}
