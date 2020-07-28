"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Analytics = (function () {
    function Analytics(options) {
        var _a;
        this.universe = options.universe;
        this.http = options.http;
        this.options = options;
        this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            this.deserialize(options.rawPayload);
        }
    }
    Analytics.prototype.deserialize = function (rawPayload) {
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.person = rawPayload.person;
        this.clv = rawPayload.clv;
        this.ordersCount = rawPayload.orders_count;
        this.ordersAmountTotalGrossSum = rawPayload.orders_amount_total_gross_sum;
        this.ordersAmountTotalGrossAggregateSum = rawPayload.orders_amount_total_gross_aggregate_sum;
        return this;
    };
    Analytics.create = function (payload, universe, http) {
        return new Analytics({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Analytics.createUninitialized = function (payload, universe, http) {
        return new Analytics({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    Analytics.prototype.serialize = function () {
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            person: this.person,
            clv: this.clv,
            orders_count: this.ordersCount,
            orders_amount_total_gross_sum: this.ordersAmountTotalGrossSum,
            orders_amount_total_gross_aggregate_sum: this.ordersAmountTotalGrossAggregateSum
        };
    };
    return Analytics;
}());
exports.Analytics = Analytics;
//# sourceMappingURL=analytics.js.map