
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ShippingMethodOptions extends UniverseEntityOptions {
  rawPayload?: ShippingMethodRawPayload
}

export interface ShippingMethodRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string | null
  readonly description?: string | null
  readonly zone_rates?: null | Array<{
    currency: string
    amount_net?: number | null
    amount_gross?: number | null
    zone?: null | {
      country?: string
      locality?: string
      region?: string
    }
  }>
}

export interface ShippingMethodPayload {
  readonly id?: ShippingMethodRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ShippingMethodRawPayload['deleted']
  readonly active?: ShippingMethodRawPayload['active']
  readonly name?: ShippingMethodRawPayload['name']
  readonly description?: ShippingMethodRawPayload['description']
  readonly zoneRates?: ShippingMethodRawPayload['zone_rates']
}

/**
 * Manage shipping_methods.
 *
 * @category Entity
 */
export class ShippingMethod extends UniverseEntity<ShippingMethodPayload, ShippingMethodRawPayload> {
  public get entityName (): string {
    return 'shipping_methods'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ShippingMethodOptions
  public initialized: boolean

  public endpoint: string

  public id?: ShippingMethodPayload['id']
  public createdAt?: ShippingMethodPayload['createdAt']
  public updatedAt?: ShippingMethodPayload['updatedAt']
  public deleted?: ShippingMethodPayload['deleted']
  public active?: ShippingMethodPayload['active']
  public name?: ShippingMethodPayload['name']
  public description?: ShippingMethodPayload['description']
  public zoneRates?: ShippingMethodPayload['zoneRates']

  constructor (options: ShippingMethodOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/shipping_methods'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ShippingMethodRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.description = rawPayload.description
    this.zoneRates = rawPayload.zone_rates

    return this
  }

  public static create (payload: ShippingMethodRawPayload, universe: Universe, http: Universe['http']): ShippingMethod {
    return new ShippingMethod({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ShippingMethodRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      description: this.description,
      zone_rates: this.zoneRates
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ShippingMethodInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ShippingMethods {
  public static endpoint: string = 'api/v0/shipping_methods'
}

export class ShippingMethodInitializationError extends BaseError {
  public name = 'ShippingMethodInitializationError'
  constructor (public message: string = 'Could not initialize shipping_method.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ShippingMethodInitializationError.prototype)
  }
}

export class ShippingMethodFetchRemoteError extends BaseError {
  public name = 'ShippingMethodFetchRemoteError'
  constructor (public message: string = 'Could not get shipping_method.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ShippingMethodFetchRemoteError.prototype)
  }
}

export class ShippingMethodsFetchRemoteError extends BaseError {
  public name = 'ShippingMethodsFetchRemoteError'
  constructor (public message: string = 'Could not get shipping_methods.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ShippingMethodsFetchRemoteError.prototype)
  }
}
