"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var UniverseHealth = (function (_super) {
    __extends(UniverseHealth, _super);
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
    __extends(UniverseStatus, _super);
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