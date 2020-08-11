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

export interface AnalyticsReport {
  count: number
  created_at: string
  metric: AnalyticsReportMetric
  values: Object[]
}
