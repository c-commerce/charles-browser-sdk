
import { UniverseEntityOptions } from '../_base'
import { Universe } from '../../universe'
import { RealtimeClient } from 'src/realtime'

export interface AnalyticsOptions extends UniverseEntityOptions {
  rawPayload?: AnalyticsRawPayload
}

export interface AnalyticsRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly person?: string
  readonly clv?: number
  readonly orders_count?: number
  readonly orders_amount_total_gross_sum?: number
  readonly orders_amount_total_gross_aggregate_sum?: object[]
  readonly storefront_vendor_tags?: string[]
}

export class Analytics {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected mqtt: RealtimeClient
  protected options: AnalyticsOptions
  public initialized: boolean

  public id?: AnalyticsRawPayload['id']
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public person?: AnalyticsRawPayload['person']
  public clv?: AnalyticsRawPayload['clv']
  public ordersCount?: AnalyticsRawPayload['orders_count']
  public ordersAmountTotalGrossSum?: AnalyticsRawPayload['orders_amount_total_gross_sum']
  public ordersAmountTotalGrossAggregateSum?: AnalyticsRawPayload['orders_amount_total_gross_aggregate_sum']
  public storeFrontVendorTags?: AnalyticsRawPayload['storefront_vendor_tags']

  constructor (options: AnalyticsOptions) {
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.mqtt = options.mqtt

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: AnalyticsRawPayload): Analytics {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.person = rawPayload.person
    this.clv = rawPayload.clv
    this.ordersCount = rawPayload.orders_count
    this.ordersAmountTotalGrossSum = rawPayload.orders_amount_total_gross_sum
    this.ordersAmountTotalGrossAggregateSum = rawPayload.orders_amount_total_gross_aggregate_sum
    this.storeFrontVendorTags = rawPayload.storefront_vendor_tags
    return this
  }

  public static create (payload: AnalyticsRawPayload, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): Analytics {
    return new Analytics({ rawPayload: payload, universe, http, mqtt, initialized: true })
  }

  public static createUninitialized (payload: AnalyticsRawPayload, universe: Universe, http: Universe['http'], mqtt: RealtimeClient): Analytics {
    return new Analytics({ rawPayload: payload, universe, http, mqtt, initialized: false })
  }

  public serialize (): AnalyticsRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      person: this.person,
      clv: this.clv,
      orders_count: this.ordersCount,
      orders_amount_total_gross_sum: this.ordersAmountTotalGrossSum,
      orders_amount_total_gross_aggregate_sum: this.ordersAmountTotalGrossAggregateSum,
      storefront_vendor_tags: this.storeFrontVendorTags

    }
  }
}
