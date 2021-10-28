import { BaseError } from '../errors';
export declare const ANALYTICS_ENDPOINT = "api/v0/analytics/reports";
export declare class AnalyticsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export interface AnalyticsReportJob {
    description?: string;
    name: string;
    title?: string;
}
export interface AnalyticsReportQuery {
    start: string;
    end: string;
    timezone: string;
    period?: string;
}
export interface AnalyticsReportMetric {
    job: AnalyticsReportJob;
    query: AnalyticsReportQuery;
}
export interface AnalyticsReport {
    count: number;
    created_at: string;
    metric: AnalyticsReportMetric;
    values: Object[];
}
