
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface CustomPropertyOptions extends UniverseEntityOptions {
  rawPayload?: CustomPropertyRawPayload
}

export enum CustomPropertyInputTypesEnum {
  checkbox = 'checkbox',
  currencyinput = 'currencyinput',
  date = 'date',
  daterange = 'daterange',
  datetime = 'datetime',
  datetimerange = 'datetimerange',
  largetextinput = 'largetextinput',
  urlinput = 'urlinput',
  multiselect = 'multiselect',
  numberinput = 'numberinput',
  numberwithunitinput = 'numberwithunitinput',
  phonenumber = 'phonenumber',
  radio = 'radio',
  select = 'select',
  textinput = 'textinput',
  time = 'time',
  timerange = 'timerange'
}

export type ICustomPropertyInputType = `${CustomPropertyInputTypesEnum}`

export enum CustomPropertyTypesEnum {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  object = 'object'
}

export type ICustomPropertyType = `${CustomPropertyTypesEnum}`

export interface CustomPropertyRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly disabled?: boolean
  readonly readonly?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly object?: string
  readonly type?: ICustomPropertyType
  readonly input?: {
    type?: ICustomPropertyInputType
    options?: Array<{ label: string, value: string | number } | string[] | number[]> | null
    unit?: string
    placeholder?: Array<{ locale?: string, value?: string | any }> | null
    validation?: {
      type: 'warning' | 'error'
    } | null
    label?: Array<{ locale?: string, value?: string | any }> | null
    description?: Array<{ locale?: string, value?: string | any }> | null
  }
  readonly description?: string
  readonly show_in?: string[]
  readonly icon?: string
  readonly order_index?: number | null
  readonly proxy_vendor?: string | any
  readonly is_proxy?: boolean | null
  readonly external_reference_id?: string | null
  readonly external_label?: object | null

}

export interface CustomPropertyPayload {
  readonly id?: CustomPropertyRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: CustomPropertyRawPayload['deleted']
  readonly disabled?: CustomPropertyRawPayload['disabled']
  readonly readonly?: CustomPropertyRawPayload['readonly']
  readonly active?: CustomPropertyRawPayload['active']
  readonly name?: CustomPropertyRawPayload['name']
  readonly object?: CustomPropertyRawPayload['object']
  readonly type?: CustomPropertyRawPayload['type']
  readonly input?: CustomPropertyRawPayload['input']
  readonly description?: CustomPropertyRawPayload['description']
  readonly showIn?: CustomPropertyRawPayload['show_in']
  readonly icon?: CustomPropertyRawPayload['icon']
  readonly orderIndex?: CustomPropertyRawPayload['order_index']

  readonly proxyVendor?: CustomPropertyRawPayload['proxy_vendor']
  readonly isProxy?: CustomPropertyRawPayload['is_proxy']
  readonly externalReferenceId?: CustomPropertyRawPayload['external_reference_id']
  readonly externalLabel?: CustomPropertyRawPayload['external_label']
}

/**
 * Manage custom properties.
 *
 * @category Entity
 */
export class CustomProperty extends UniverseEntity<CustomPropertyPayload, CustomPropertyRawPayload> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: CustomPropertyOptions
  public initialized: boolean

  public endpoint: string

  public id?: CustomPropertyPayload['id']
  public createdAt?: CustomPropertyPayload['createdAt']
  public updatedAt?: CustomPropertyPayload['updatedAt']
  public deleted?: CustomPropertyPayload['deleted']
  public disabled?: CustomPropertyPayload['disabled']
  public readonly?: CustomPropertyPayload['readonly']
  public active?: CustomPropertyPayload['active']
  public name?: CustomPropertyPayload['name']
  public object?: CustomPropertyPayload['object']
  public type?: CustomPropertyPayload['type']
  public input?: CustomPropertyPayload['input']
  public description?: CustomPropertyPayload['description']
  public showIn?: CustomPropertyPayload['showIn']
  public icon?: CustomPropertyPayload['icon']
  public orderIndex?: CustomPropertyPayload['orderIndex']
  public proxyVendor?: CustomPropertyPayload['proxyVendor']
  public isProxy?: CustomPropertyPayload['isProxy']
  public externalReferenceId?: CustomPropertyPayload['externalReferenceId']
  public externalLabel?: CustomPropertyPayload['externalLabel']

  constructor (options: CustomPropertyOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/custom_properties'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CustomPropertyRawPayload): CustomProperty {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.disabled = rawPayload.disabled ?? false
    this.readonly = rawPayload.readonly ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.object = rawPayload.object
    this.type = rawPayload.type
    this.input = rawPayload.input
    this.description = rawPayload.description
    this.showIn = rawPayload.show_in
    this.icon = rawPayload.icon
    this.orderIndex = rawPayload.order_index
    this.proxyVendor = rawPayload.proxy_vendor
    this.isProxy = rawPayload.is_proxy
    this.externalReferenceId = rawPayload.external_reference_id
    this.externalLabel = rawPayload.external_label

    return this
  }

  public static create (payload: CustomPropertyRawPayload, universe: Universe, http: Universe['http']): CustomProperty {
    return new CustomProperty({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): CustomPropertyRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      disabled: this.disabled ?? false,
      readonly: this.readonly ?? false,
      active: this.active ?? true,
      name: this.name,
      object: this.object,
      type: this.type,
      input: this.input,
      description: this.description,
      show_in: this.showIn,
      icon: this.icon,
      order_index: this.orderIndex,
      proxy_vendor: this.proxyVendor,
      is_proxy: this.isProxy,
      external_reference_id: this.externalReferenceId,
      external_label: this.externalLabel
    }
  }

  public async init (): Promise<CustomProperty | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new CustomPropertyInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CustomProperties {
  public static endpoint: string = 'api/v0/custom_properties'
}

export class CustomPropertyInitializationError extends BaseError {
  public name = 'CustomPropertyInitializationError'
  constructor (public message: string = 'Could not initialize custom property.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomPropertyInitializationError.prototype)
  }
}

export class CustomPropertyFetchRemoteError extends BaseError {
  public name = 'CustomPropertyFetchRemoteError'
  constructor (public message: string = 'Could not get custom property.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomPropertyFetchRemoteError.prototype)
  }
}

export class CustomPropertiesFetchRemoteError extends BaseError {
  public name = 'CustomPropertiesFetchRemoteError'
  constructor (public message: string = 'Could not get custom properties.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomPropertiesFetchRemoteError.prototype)
  }
}
