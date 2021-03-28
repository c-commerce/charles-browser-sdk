import { UniverseEntityOptions } from '../_base';
import { Universe } from '../../universe';
export interface AnalyticsOptions extends UniverseEntityOptions {
    rawPayload?: AnalyticsRawPayload;
}
export interface AnalyticsRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly person?: string;
    readonly clv?: number;
    readonly orders_count?: number;
    readonly orders_amount_total_gross_sum?: number;
    readonly orders_amount_total_gross_aggregate_sum?: object[];
}
export declare class Analytics {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: AnalyticsOptions;
    initialized: boolean;
    id?: AnalyticsRawPayload['id'];
    createdAt?: Date | null;
    updatedAt?: Date | null;
    person?: AnalyticsRawPayload['person'];
    clv?: AnalyticsRawPayload['clv'];
    ordersCount?: AnalyticsRawPayload['orders_count'];
    ordersAmountTotalGrossSum?: AnalyticsRawPayload['orders_amount_total_gross_sum'];
    ordersAmountTotalGrossAggregateSum?: AnalyticsRawPayload['orders_amount_total_gross_aggregate_sum'];
    constructor(options: AnalyticsOptions);
    protected deserialize(rawPayload: AnalyticsRawPayload): Analytics;
    static create(payload: AnalyticsRawPayload, universe: Universe, http: Universe['http']): Analytics;
    static createUninitialized(payload: AnalyticsRawPayload, universe: Universe, http: Universe['http']): Analytics;
    serialize(): AnalyticsRawPayload;
}
