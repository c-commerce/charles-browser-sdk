"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudStatus = exports.CloudHealth = void 0;
var tslib_1 = require("tslib");
var events_1 = require("events");
var CloudHealth = (function (_super) {
    tslib_1.__extends(CloudHealth, _super);
    function CloudHealth(opts) {
        var _this = _super.call(this) || this;
        _this.options = opts;
        _this.universe = _this.options.universe;
        return _this;
    }
    return CloudHealth;
}(events_1.EventEmitter));
exports.CloudHealth = CloudHealth;
var CloudStatus = (function (_super) {
    tslib_1.__extends(CloudStatus, _super);
    function CloudStatus(opts) {
        var _this = _super.call(this) || this;
        _this.options = opts;
        _this.universe = _this.options.universe;
        return _this;
    }
    return CloudStatus;
}(events_1.EventEmitter));
exports.CloudStatus = CloudStatus;
//# sourceMappingURL=status.js.map