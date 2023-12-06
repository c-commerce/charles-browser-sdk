import type { Universe } from './index'

import {
  ANALYTICS_ENDPOINT,
  AnalyticsFetchRemoteError,
  AnalyticsReport,
  SubscriptionAnalyticsResponse,
  SubscriberBaseAnalyticsResponse,
  FlowsTriggeredAnalyticsResponse,
  MessageBrokerConversationsAnalyticsOptions,
  MessageBrokerConversationsAnalyticsResponse,
  MessageBrokerMessagesCountAnalyticsOptions,
  MessageBrokerMessagesCountAnalyticsResponse,
  SubscriberMetrics,
  RevenueMetrics,
  RevenueFields,
  RevenueVersions
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

export interface UniverseRevenueMetricsOptions {
  groupBy?: 'day' | 'week' | 'month' | 'year' | 'version'
  version?: RevenueVersions | RevenueVersions[]
  // The following fields are date iso strings
  start: string
  end: string
  fields?: Array<keyof RevenueFields>
}

export interface UniverseAnalytics {
  orders: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  revenues: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  xau: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  subscriberBaseEvents: (options?: UniverseAnalyticsEventsOptions) => Promise<SubscriberBaseAnalyticsResponse | undefined>
  subscriptionEventsBySubscriptionId: (subscriptionId: string, options?: UniverseAnalyticsEventsOptions) => Promise<SubscriptionAnalyticsResponse | undefined>
  subscriptionEvents: (options?: UniverseAnalyticsEventsOptions) => Promise<SubscriptionAnalyticsResponse | undefined>
  feedOpenedClosed: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  feedConversion: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  peopleMessagingChannelParticipationDistribution: (options?: UniverseAnalyticsOptions) => Promise<AnalyticsReport[] | undefined>
  flowsTriggered: () => Promise<FlowsTriggeredAnalyticsResponse | undefined>
  messageBrokerConversations: (options?: MessageBrokerConversationsAnalyticsOptions) => Promise<MessageBrokerConversationsAnalyticsResponse | undefined>
  messageBrokerMessagesCount: (options?: MessageBrokerMessagesCountAnalyticsOptions) => Promise<MessageBrokerMessagesCountAnalyticsResponse | undefined>
  subscriberMetrics: () => Promise<SubscriberMetrics | undefined>
  revenueMetrics: (options: UniverseRevenueMetricsOptions) => Promise<RevenueMetrics | undefined>
}

export function analytics (this: Universe): UniverseAnalytics {
  const makeAnalyticsRequest = async <TResult, TOptions>(endpointSlug: string, options?: TOptions): Promise<TResult> => {
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
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>('/commerce/orders/distribution/count', options)
    },
    revenues: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>('/commerce/revenues/distribution', options)
    },
    xau: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>('/messages/xau/count', options)
    },
    subscriberBaseEvents: async (options?: UniverseAnalyticsEventsOptions): Promise<SubscriberBaseAnalyticsResponse | undefined> => {
      return await makeAnalyticsRequest<SubscriberBaseAnalyticsResponse, UniverseAnalyticsEventsOptions>('/events/subscriptions/subscriber_base', options)
    },
    subscriptionEventsBySubscriptionId: async (subscriptionId: string, options?: UniverseAnalyticsEventsOptions): Promise<SubscriptionAnalyticsResponse | undefined> => {
      return await makeAnalyticsRequest<SubscriptionAnalyticsResponse, UniverseAnalyticsEventsOptions>(`/events/subscriptions/${subscriptionId}`, options)
    },
    subscriptionEvents: async (options?: UniverseAnalyticsEventsOptions): Promise<SubscriptionAnalyticsResponse | undefined> => {
      return await makeAnalyticsRequest<SubscriptionAnalyticsResponse, UniverseAnalyticsEventsOptions>('/events/subscriptions', options)
    },
    peopleMessagingChannelParticipationDistribution: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>('/people/channel_participation/distribution', options)
    },
    feedOpenedClosed: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>('/feeds/open_close/distribution/count', options)
    },
    feedConversion: async (options?: UniverseAnalyticsOptions): Promise<AnalyticsReport[]> => {
      return await makeAnalyticsRequest<AnalyticsReport[], UniverseAnalyticsOptions>('/feeds/conversion/counts', options)
    },
    flowsTriggered: async (): Promise<FlowsTriggeredAnalyticsResponse> => {
      return await makeAnalyticsRequest<FlowsTriggeredAnalyticsResponse, undefined>('/flows_triggered')
    },
    messageBrokerConversations: async (options?: MessageBrokerConversationsAnalyticsOptions): Promise<MessageBrokerConversationsAnalyticsResponse> => {
      return await makeAnalyticsRequest<MessageBrokerConversationsAnalyticsResponse, MessageBrokerConversationsAnalyticsOptions>('/message_broker/conversations', options)
    },
    messageBrokerMessagesCount: async (options?: MessageBrokerMessagesCountAnalyticsOptions): Promise<MessageBrokerMessagesCountAnalyticsResponse> => {
      return await makeAnalyticsRequest<MessageBrokerMessagesCountAnalyticsResponse, MessageBrokerMessagesCountAnalyticsOptions>('/message_broker/messages_count', options)
    },
    subscriberMetrics: async (options?: UniverseAnalyticsOptions): Promise<SubscriberMetrics> => {
      return await makeAnalyticsRequest<SubscriberMetrics, undefined>('/universe/subscriptions')
    },
    revenueMetrics: async (options: UniverseRevenueMetricsOptions): Promise<RevenueMetrics> => {
      return await makeAnalyticsRequest<RevenueMetrics, UniverseRevenueMetricsOptions>('/attribution', options)
    }
  }
}
