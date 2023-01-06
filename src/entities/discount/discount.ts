
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface DiscountOptions extends UniverseEntityOptions {
  rawPayload?: DiscountRawPayload
}

export enum DiscountTypesEnum {
  rate = 'rate',
  value = 'value'
}

export type IDiscountType = DiscountTypesEnum.rate | DiscountTypesEnum.value

export interface DiscountAmountRawPayload {
  currency: string
  amount: number
}

export interface DiscountI18NRawPayloadItem {
  locale: string
  keys: {
    name: string
  }
}

export interface DiscountRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly type?: IDiscountType
  readonly value?: DiscountAmountRawPayload
  readonly name?: string | null
  readonly i18n?: DiscountI18NRawPayloadItem[] | null
}

export interface DiscountPayload {
  readonly id?: DiscountRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly type?: DiscountRawPayload['type']
  readonly value?: DiscountRawPayload['value']
  readonly name?: DiscountRawPayload['name']
  readonly i18n?: DiscountRawPayload['i18n']
}

/**
 * Manage discounts.
 *
 * @category Entity
 */
export class Discount extends UniverseEntity<DiscountPayload, DiscountRawPayload> {
  public get entityName (): string {
    return 'discounts'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: DiscountOptions
  public initialized: boolean

  public endpoint: string

  public id?: DiscountPayload['id']
  public createdAt?: DiscountPayload['createdAt']
  public updatedAt?: DiscountPayload['updatedAt']
  public deleted?: DiscountPayload['deleted']
  public active?: DiscountPayload['active']
  public type?: DiscountPayload['type']
  public value?: DiscountPayload['value']
  public name?: DiscountPayload['name']
  public i18n?: DiscountPayload['i18n']

  constructor (options: DiscountOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/discounts'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: DiscountRawPayload): this {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.type = rawPayload.type
    this.value = rawPayload.value
    this.name = rawPayload.name
    this.i18n = rawPayload.i18n

    return this
  }

  public static create (payload: DiscountRawPayload, universe: Universe, http: Universe['http']): Discount {
    return new Discount({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): DiscountRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      type: this.type,
      value: this.value,
      name: this.name,
      i18n: this.i18n
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new DiscountInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Discounts {
  public static endpoint: string = 'api/v0/discounts'
}

export class DiscountInitializationError extends BaseError {
  public name = 'DiscountInitializationError'
  constructor (public message: string = 'Could not initialize discount.', properties?: any) {
    super(message, properties)
  }
}

export class DiscountFetchRemoteError extends BaseError {
  public name = 'DiscountFetchRemoteError'
  constructor (public message: string = 'Could not get discount.', properties?: any) {
    super(message, properties)
  }
}

export class DiscountsFetchRemoteError extends BaseError {
  public name = 'DiscountsFetchRemoteError'
  constructor (public message: string = 'Could not get discounts.', properties?: any) {
    super(message, properties)
  }
}
