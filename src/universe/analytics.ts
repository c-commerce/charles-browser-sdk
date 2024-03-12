import type { Universe } from './index'

import {
  ANALYTICS_ENDPOINT,
  AnalyticsFetchRemoteError,
  AnalyticsReport,
  FlowsTriggeredAnalyticsResponse,
  MessageBrokerConversationsAnalyticsOptions,
  MessageBrokerConversationsAnalyticsResponse,
  MessageBrokerMessagesCountAnalyticsOptions,
  MessageBrokerMessagesCountAnalyticsResponse,
  RevenueFields,
  RevenueMetrics,
  RevenueVersions,
  SubscriberBaseAnalyticsResponse,
  SubscriberMetrics,
  SubscriptionAnalyticsResponse,
  SyncedContactsResponse
} from '../analytics/analytics'

export interface UniverseAnalyticsOptions {
  start: string
  timezone: string
  end: string
  period?: string
}

export interface UniverseAnalyticsEventsOptions {
  timezone: string
  start: string
  end: string
  datepart?: string
}

/**
 * When you want to filter the revenue data, you can use these filters, which are fields within the revenue data!
 */
export type UniverseRevenueDataFilters =
  | 'origin'
  | 'campaign_id'
  | 'flow_id'
  | 'target'
  | 'order_id'
  | 'person_id'

export interface UniverseRevenueMetricsOptions {
  /**
   * The start date of the timeframe in UTC time zone!
   */
  start: Date | string

  /**
   * The end date of the timeframe in UTC time zone!
   */
  end: Date | string

  /**
   * When provided you can limit the fields returned in the response!
   */
  fields?: Array<keyof RevenueFields>

  /**
   * The groping type for the revenue data, where:
   * - `day`, `week`, `month`, `year` are time based groupings
   * - `version` will group by the various cartesian products of the attribution models
   * - `origin` will group by the various origins of the revenue such a campaign_id and flow_id
   * - `origin_type` will group by the various origin types of the revenue such as campaigns and flows
   * - `target` will group by the various targets of the revenue such as order_id
   * - `target_type` will group by the various target types of the revenue such as order
   *
   * By default, it will group by `day`, `week`, or `month` depending on the timeframe:
   * - more than 90 days -> `month`
   * - more than 30 days -> `week`
   * - otherwise -> `day`
   */
  groupBy?:
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'version'
  | 'origin'
  | 'origin_type'
  | 'target'
  | 'target_type'

  /**
   * When you want to explicitly select the attribution models, this is the field to use.
   * By default, it will return the currently active attribution models.
   *
   * @deprecated Use `versions` instead!
   */
  version?: RevenueVersions[] | RevenueVersions

  /**
   * When you want to explicitly select the attribution models, this is the field to use.
   * By default, it will return the currently active attribution models.
   */
  versions?: RevenueVersions[]

  /**
   * Data filters to apply before aggregations, note that the `start` and `end` dates are always applied!
   */
  filters?: Record<UniverseRevenueDataFilters, string[] | string>

  /**
   * Configure the precision digits of the aggregated values, by default it will be 2 digits!
   */
  precision?: number

  /**
   * The timezone to convert the results to, by default it will be UTC!
   *
   * @future This is not implemented yet!
   */
  tz?: string
}

export interface UniverseAnalytics {
  orders: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  revenues: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  xau: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  subscriberBaseEvents: (
    options?: UniverseAnalyticsEventsOptions
  ) => Promise<SubscriberBaseAnalyticsResponse | undefined>
  subscriptionEventsBySubscriptionId: (
    subscriptionId: string,
    options?: UniverseAnalyticsEventsOptions
  ) => Promise<SubscriptionAnalyticsResponse | undefined>
  subscriptionEvents: (
    options?: UniverseAnalyticsEventsOptions
  ) => Promise<SubscriptionAnalyticsResponse | undefined>
  feedOpenedClosed: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  feedConversion: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  peopleMessagingChannelParticipationDistribution: (
    options?: UniverseAnalyticsOptions
  ) => Promise<AnalyticsReport[] | undefined>
  flowsTriggered: () => Promise<FlowsTriggeredAnalyticsResponse | undefined>
  messageBrokerConversations: (
    options?: MessageBrokerConversationsAnalyticsOptions
  ) => Promise<MessageBrokerConversationsAnalyticsResponse | undefined>
  messageBrokerMessagesCount: (
    options?: MessageBrokerMessagesCountAnalyticsOptions
  ) => Promise<MessageBrokerMessagesCountAnalyticsResponse | undefined>
  subscriberMetrics: () => Promise<SubscriberMetrics | undefined>
  revenueMetrics: (options: UniverseRevenueMetricsOptions) => Promise<RevenueMetrics | undefined>
  syncedContacts: () => Promise<SyncedContactsResponse | undefined>
}

export function analytics (this: Universe): UniverseAnalytics {
  const makeAnalyticsRequest = async <TResult, TOptions>(
    endpointSlug: string,
    options?: TOptions
  ): Promise<TResult> => {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universeBase}/${ANALYTICS_ENDPOINT}${endpointSlug}`,
        params: options
      }

      const res = await this.http.getClient()(opts)
      return res.data.data as TResult
    } catch (err) {
      throw new AnalyticsFetchRemoteError(undefined, { error: err })
    }
  }

  return {
    orders: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>(
        '/commerce/orders/distribution/count',
        options
      )
    },
    revenues: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>(
        '/commerce/revenues/distribution',
        options
      )
    },
    xau: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>(
        '/messages/xau/count',
        options
      )
    },
    subscriberBaseEvents: async (
      options?: UniverseAnalyticsEventsOptions
    ): Promise<SubscriberBaseAnalyticsResponse | undefined> => {
      return await makeAnalyticsRequest<
      SubscriberBaseAnalyticsResponse,
      UniverseAnalyticsEventsOptions
      >('/events/subscriptions/subscriber_base', options)
    },
    subscriptionEventsBySubscriptionId: async (
      subscriptionId: string,
      options?: UniverseAnalyticsEventsOptions
    ): Promise<SubscriptionAnalyticsResponse | undefined> => {
      return await makeAnalyticsRequest<
      SubscriptionAnalyticsResponse,
      UniverseAnalyticsEventsOptions
      >(`/events/subscriptions/${subscriptionId}`, options)
    },
    subscriptionEvents: async (
      options?: UniverseAnalyticsEventsOptions
    ): Promise<SubscriptionAnalyticsResponse | undefined> => {
      return await makeAnalyticsRequest<
      SubscriptionAnalyticsResponse,
      UniverseAnalyticsEventsOptions
      >('/events/subscriptions', options)
    },
    peopleMessagingChannelParticipationDistribution: async (
      options?: UniverseAnalyticsOptions
    ): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>(
        '/people/channel_participation/distribution',
        options
      )
    },
    feedOpenedClosed: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>(
        '/feeds/open_close/distribution/count',
        options
      )
    },
    feedConversion: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>(
        '/feeds/conversion/counts',
        options
      )
    },
    flowsTriggered: async (): Promise<FlowsTriggeredAnalyticsResponse> => {
      return await makeAnalyticsRequest<FlowsTriggeredAnalyticsResponse, undefined>(
        '/flows_triggered'
      )
    },
    messageBrokerConversations: async (
      options?: MessageBrokerConversationsAnalyticsOptions
    ): Promise<MessageBrokerConversationsAnalyticsResponse> => {
      return await makeAnalyticsRequest<
      MessageBrokerConversationsAnalyticsResponse,
      MessageBrokerConversationsAnalyticsOptions
      >('/message_broker/conversations', options)
    },
    messageBrokerMessagesCount: async (
      options?: MessageBrokerMessagesCountAnalyticsOptions
    ): Promise<MessageBrokerMessagesCountAnalyticsResponse> => {
      return await makeAnalyticsRequest<
      MessageBrokerMessagesCountAnalyticsResponse,
      MessageBrokerMessagesCountAnalyticsOptions
      >('/message_broker/messages_count', options)
    },
    subscriberMetrics: async (options?: UniverseAnalyticsOptions): Promise<SubscriberMetrics> => {
      return await makeAnalyticsRequest<SubscriberMetrics, undefined>('/universe/subscriptions')
    },
    revenueMetrics: async (options: UniverseRevenueMetricsOptions): Promise<RevenueMetrics> => {
      return await makeAnalyticsRequest<RevenueMetrics, UniverseRevenueMetricsOptions>(
        '/attribution',
        options
      )
    },
    syncedContacts: async (): Promise<SyncedContactsResponse> => {
      return await makeAnalyticsRequest<SyncedContactsResponse, undefined>('/synced_contacts')
    }
  }
}
