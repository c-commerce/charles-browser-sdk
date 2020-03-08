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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = require("mqtt");
var events_1 = __importDefault(require("events"));
var uuid = __importStar(require("../helpers/uuid"));
var errors_1 = require("../errors");
var defaultMqttOptions = {
    clean: true,
    protocolId: 'MQTT',
    protocolVersion: 4,
    keepalive: 90,
    path: '/ws',
    rejectUnauthorized: false
};
var RealtimeClient = /** @class */ (function (_super) {
    __extends(RealtimeClient, _super);
    function RealtimeClient(options) {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.connected = false;
        _this.offline = false;
        _this.last = null;
        _this.options = __assign({ messageType: 'json' }, options);
        _this.mqttOptions = __assign(__assign({}, defaultMqttOptions), (options.mqttOptions || {}));
        _this.client = mqtt_1.connect(_this.options.base, __assign(__assign({}, _this.mqttOptions), { username: _this.options.username, password: _this.options.password }));
        _this.initialized = true;
        _this.client.on('connect', function () {
            _this.emit('connect');
            _this.connected = true;
            _this.offline = false;
        }).on('close', function () {
            _this.emit('close');
            _this.connected = false;
        }).on('error', function (err) {
            _this.handleError(err);
        }).on('reconnect', function () {
            _this.emit('reconnect');
        }).on('offline', function () {
            _this.emit('offline');
            _this.offline = true;
        });
        _this.client.on('message', function (topic, message, packet) {
            _this.emit('message', _this.handleMessagePayload(topic, message, packet));
        });
        _this.on('raw-error', function (err) {
            _this.handleError(err);
        });
        return _this;
    }
    RealtimeClient.prototype.isInitialized = function () {
        return this.initialized;
    };
    RealtimeClient.prototype.isConnected = function () {
        return this.connected;
    };
    RealtimeClient.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    RealtimeClient.prototype.destroy = function () {
        if (!this.client)
            throw new Error('cannot destroy instance, because a client is not initialized');
        this.removeAllListeners();
        this.client.end();
        this.offline = true;
        this.connected = false;
        this.initialized = false;
    };
    RealtimeClient.prototype.getClient = function () {
        if (this.client)
            return this.client;
        throw new UninstantiatedMqttClient(undefined);
    };
    RealtimeClient.prototype.handleMessagePayload = function (topic, message, packet) {
        var base = {
            mqttClientId: packet.messageId,
            clientId: uuid.v4(),
            receivedAt: new Date()
        };
        this.last = Object.assign({}, base);
        if (this.options.messageType === 'string') {
            return __assign(__assign({}, base), { topic: topic, attributes: {}, payloadType: 'string', payload: message.toString() });
        }
        return __assign(__assign({}, base), { topic: topic, attributes: {}, payloadType: 'json', payload: JSON.parse(message.toString()) });
    };
    RealtimeClient.prototype.subscribe = function (topic, cb) {
        this.getClient().subscribe(topic, cb);
        return this;
    };
    RealtimeClient.prototype.unsubscribe = function (topic) {
        this.getClient().unsubscribe(topic);
        return this;
    };
    RealtimeClient.prototype.publish = function (topic, payload) {
        this.getClient().publish(topic, payload);
        return this;
    };
    return RealtimeClient;
}(events_1.default.EventEmitter));
exports.RealtimeClient = RealtimeClient;
var UninstantiatedMqttClient = /** @class */ (function (_super) {
    __extends(UninstantiatedMqttClient, _super);
    function UninstantiatedMqttClient(message, properties) {
        if (message === void 0) { message = 'Cannot client API without instantiated MQTT client'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UninstantiatedMqttClient';
        return _this;
    }
    return UninstantiatedMqttClient;
}(errors_1.BaseError));
exports.UninstantiatedMqttClient = UninstantiatedMqttClient;
var UninstantiatedRealtimeClient = /** @class */ (function (_super) {
    __extends(UninstantiatedRealtimeClient, _super);
    function UninstantiatedRealtimeClient(message, properties) {
        if (message === void 0) { message = 'Cannot initialize client API without instantiated Realtime client'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UninstantiatedRealtimeClient';
        return _this;
    }
    return UninstantiatedRealtimeClient;
}(errors_1.BaseError));
exports.UninstantiatedRealtimeClient = UninstantiatedRealtimeClient;
//# sourceMappingURL=index.js.map