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
