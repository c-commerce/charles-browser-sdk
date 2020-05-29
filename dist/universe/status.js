"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_1 = require("events");
var UniverseHealth = (function (_super) {
    tslib_1.__extends(UniverseHealth, _super);
    function UniverseHealth(opts) {
        var _this = _super.call(this) || this;
        _this.options = opts;
        _this.universe = _this.options.universe;
        return _this;
    }
    return UniverseHealth;
}(events_1.EventEmitter));
exports.UniverseHealth = UniverseHealth;
var UniverseStatus = (function (_super) {
    tslib_1.__extends(UniverseStatus, _super);
    function UniverseStatus(opts) {
        var _this = _super.call(this) || this;
        _this.options = opts;
        _this.universe = _this.options.universe;
        return _this;
    }
    return UniverseStatus;
}(events_1.EventEmitter));
exports.UniverseStatus = UniverseStatus;
//# sourceMappingURL=status.js.map