"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
exports.ANALYTICS_ENDPOINT = 'api/v0/analytics/reports';
var AnalyticsFetchRemoteError = (function (_super) {
    tslib_1.__extends(AnalyticsFetchRemoteError, _super);
    function AnalyticsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get analytics.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsFetchRemoteError';
        Object.setPrototypeOf(_this, AnalyticsFetchRemoteError.prototype);
        return _this;
    }
    return AnalyticsFetchRemoteError;
}(errors_1.BaseError));
exports.AnalyticsFetchRemoteError = AnalyticsFetchRemoteError;
//# sourceMappingURL=analytics.js.map