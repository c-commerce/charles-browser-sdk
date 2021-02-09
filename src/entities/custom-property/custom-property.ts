
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface CustomPropertyOptions extends EntityOptions {
  rawPayload?: CustomPropertyRawPayload
}

export enum CustomPropertyInputTypesEnum {
  select = 'select',
  radio = 'radio',
  textinput = 'textinput',
  numberinput = 'numberinput',
  numberwithunitinput = 'numberwithunitinput',
  currencyinput = 'currencyinput',
  textbox = 'textbox',
  date = 'date',
  datetime = 'datetime',
  daterange = 'daterange'
}

export type ICustomPropertyInputType = CustomPropertyInputTypesEnum.select | CustomPropertyInputTypesEnum.radio | CustomPropertyInputTypesEnum.textinput | CustomPropertyInputTypesEnum.textbox | CustomPropertyInputTypesEnum.numberinput | CustomPropertyInputTypesEnum.date | CustomPropertyInputTypesEnum.datetime

export enum CustomPropertyTypesEnum {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  object = 'object'
}
export type ICustomPropertyType = CustomPropertyTypesEnum.string | CustomPropertyTypesEnum.number | CustomPropertyTypesEnum.boolean

export interface CustomPropertyRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
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
}

export interface CustomPropertyPayload {
  readonly id?: CustomPropertyRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: CustomPropertyRawPayload['deleted']
  readonly active?: CustomPropertyRawPayload['active']
  readonly name?: CustomPropertyRawPayload['name']
  readonly object?: CustomPropertyRawPayload['object']
  readonly type?: CustomPropertyRawPayload['type']
  readonly input?: CustomPropertyRawPayload['input']
  readonly description?: CustomPropertyRawPayload['description']
  readonly showIn?: CustomPropertyRawPayload['show_in']
  readonly icon?: CustomPropertyRawPayload['icon']
  readonly orderIndex?: CustomPropertyRawPayload['order_index']

}

/**
 * Manage custom properties.
 *
 * @category Entity
 */
export class CustomProperty extends Entity<CustomPropertyPayload, CustomPropertyRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: CustomPropertyOptions
  public initialized: boolean

  public endpoint: string

  public id?: CustomPropertyPayload['id']
  public createdAt?: CustomPropertyPayload['createdAt']
  public updatedAt?: CustomPropertyPayload['updatedAt']
  public deleted?: CustomPropertyPayload['deleted']
  public active?: CustomPropertyPayload['active']
  public name?: CustomPropertyPayload['name']
  public object?: CustomPropertyPayload['object']
  public type?: CustomPropertyPayload['type']
  public input?: CustomPropertyPayload['input']
  public description?: CustomPropertyPayload['description']
  public showIn?: CustomPropertyPayload['showIn']
  public icon?: CustomPropertyPayload['icon']
  public orderIndex?: CustomPropertyPayload['orderIndex']

  constructor (options: CustomPropertyOptions) {
    super()
    this.universe = options.universe
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
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.object = rawPayload.object
    this.type = rawPayload.type
    this.input = rawPayload.input
    this.description = rawPayload.description
    this.showIn = rawPayload.show_in
    this.icon = rawPayload.icon
    this.orderIndex = rawPayload.order_index

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
      active: this.active ?? true,
      name: this.name,
      object: this.object,
      type: this.type,
      input: this.input,
      description: this.description,
      show_in: this.showIn,
      icon: this.icon,
      order_index: this.orderIndex
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
