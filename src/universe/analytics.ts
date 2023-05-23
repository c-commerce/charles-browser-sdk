import type { Universe } from './index'

import {
  ANALYTICS_ENDPOINT,
  AnalyticsFetchRemoteError,
  AnalyticsReport,
  SubscriptionAnalyticsResponse,
  SubscriberBaseAnalyticsResponse
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

export interface UniverseAnalyticsMonthWeekTrendReport {
  week: {
    current: number
    previous: number
  }
  month: {
    current: number
    previous: number
  }
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
  flowsTriggered: () => Promise<UniverseAnalyticsMonthWeekTrendReport | undefined>
}

export function analytics (this: Universe): UniverseAnalytics {
  const makeAnalyticsRequest = async <T, K>(endpointSlug: string, options?: K): Promise<T> => {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universeBase}/${ANALYTICS_ENDPOINT}${endpointSlug}`,
        params: options
      }

      const res = await this.http.getClient()(opts)
      return res.data.data as T
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
    flowsTriggered: async (): Promise<UniverseAnalyticsMonthWeekTrendReport> => {
      return await makeAnalyticsRequest<UniverseAnalyticsMonthWeekTrendReport, undefined>('/flows_triggered')
    }
  }
}
