import { BaseError } from '../errors'

export const ANALYTICS_ENDPOINT = 'api/v0/analytics/reports'

export class AnalyticsFetchRemoteError extends BaseError {
  public name = 'AnalyticsFetchRemoteError'
  constructor (public message: string = 'Could not get analytics.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsFetchRemoteError.prototype)
  }
}

export interface AnalyticsReportJob {
  description?: string
  name: string
  title?: string
}

export interface AnalyticsReportQuery {
  start: string
  end: string
  timezone: string
  period?: string
}

export interface AnalyticsReportMetric {
  job: AnalyticsReportJob
  query: AnalyticsReportQuery
}

export interface AnalyticsReport<T = any> {
  count: number
  created_at: string
  metric: AnalyticsReportMetric
  values: T[]
}

export type SubscriptionsAnalyticsReport = AnalyticsReport<[string, number]>

export interface SubscriptionsAnalyticsSummaryReport {
  count: number
  created_at: string
  metric: AnalyticsReportMetric
  summary: number
}

export interface SubscriberBaseAnalyticsReport {
  count: number
  created_at: string
  metric: AnalyticsReportMetric
  values: Array<[string, number]>
}

export interface SubscriberBaseAnalyticsSummaryReport {
  created_at: string
  metric: AnalyticsReportMetric
  summary: number
}

export interface TotalSubscriberBaseAnalyticsReport {
  created_at: string
  metric: AnalyticsReportMetric
  total: number
}

export type SubscriptionAnalyticsResponse = [
  SubscriptionsAnalyticsReport,
  SubscriptionsAnalyticsReport,
  SubscriptionsAnalyticsSummaryReport,
  SubscriptionsAnalyticsSummaryReport
]

export type SubscriberBaseAnalyticsResponse = [
  SubscriberBaseAnalyticsReport,
  SubscriberBaseAnalyticsSummaryReport,
  TotalSubscriberBaseAnalyticsReport
]

export interface FlowsTriggeredAnalyticsResponse {
  week: {
    current: number
    previous: number
  }
  month: {
    current: number
    previous: number
  }
}

export interface MessageBrokerConversationsAnalyticsOptions {
  start: string
  end: string
}

export interface MessageBrokerConversationsAnalyticsResponse {
  created_at: string
  metric: {
    job: AnalyticsReportJob
    query: {
      start: string
      end: string
      resolution: 'DAILY'
    }
  }
  values: Array<{
    date: string
    start: number
    end: number
    conversations: Record<'UTILITY' | 'MARKETING' | 'SERVICE' | 'AUTHENTICATION' | 'UNKNOWN', number>
  }>
}

export interface MessageBrokerMessagesCountAnalyticsOptions {
  start: string
  end: string
}

export interface MessageBrokerMessagesCountAnalyticsResponse {
  created_at: string
  metric: {
    job: AnalyticsReportJob
    query: {
      start: string
      end: string
    }
  }
  count: {
    sent: number
    delivered: number
  }
}

export interface SubscriberMetrics {
  subscribers: number
  unsubscribers: number
  total_subscribers: number
  date: string
}

export interface RevenueFields {
  distinct_person_count?: number
  orders_count?: number
  conversation_business_count?: number
  conversation_marketing_count?: number
  conversation_utility_count?: number
  journeys_count?: number
  journeys_revenue_gross_total?: number
  journeys_revenue_net_total?: number
  campaigns_count?: number
  campaigns_revenue_net_total?: number
  campaigns_revenue_gross_total?: number
  per_conversation_mean?: number
  revenue_gross_total?: number
  revenue_net_total?: number
}

export interface RevenueMetricsValue extends RevenueFields {
  timeframe_start: string // DateTime ISO string
  timeframe_end: string // DateTime ISO string
  label: string
}

export interface RevenueMetrics {
  created_at: string
  metric: {
    job: AnalyticsReportJob
    query: {
      start: string
      end: string
    }
  }
  values: RevenueMetricsValue[]
}
