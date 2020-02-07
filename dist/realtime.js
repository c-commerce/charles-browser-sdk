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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = require("mqtt");
var events_1 = __importDefault(require("events"));
var Realtime = /** @class */ (function (_super) {
    __extends(Realtime, _super);
    function Realtime(options) {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.connected = false;
        _this.options = __assign({ endpoint: 'wss://wss.hello-charles.com' }, options);
        _this.client = mqtt_1.connect(_this.options.endpoint);
        _this.initialized = true;
        _this.client.on('connect', function () {
            _this.connected = true;
        });
        _this.client.on('close', function () {
            _this.connected = false;
        });
        return _this;
    }
    Realtime.prototype.isInitialized = function () {
        return this.initialized;
    };
    Realtime.prototype.isConnected = function () {
        return this.connected;
    };
    Realtime.prototype.destroy = function () {
        if (!this.client)
            throw new Error('cannot destroy instance, because a client is not initialized');
        this.client.end();
        this.initialized = false;
    };
    return Realtime;
}(events_1.default.EventEmitter));
exports.default = Realtime;
//# sourceMappingURL=realtime.js.map