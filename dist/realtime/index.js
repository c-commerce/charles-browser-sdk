"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mqtt_1 = require("mqtt");
var events_1 = tslib_1.__importDefault(require("events"));
var uuid = tslib_1.__importStar(require("../helpers/uuid"));
var errors_1 = require("../errors");
var defaultMqttOptions = {
    clean: true,
    protocolId: 'MQTT',
    protocolVersion: 4,
    keepalive: 90,
    path: '/ws',
    rejectUnauthorized: false
};
var RealtimeClient = (function (_super) {
    tslib_1.__extends(RealtimeClient, _super);
    function RealtimeClient(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.connected = false;
        _this.offline = false;
        _this.last = null;
        _this.options = tslib_1.__assign({ messageType: 'json' }, options);
        _this.mqttOptions = tslib_1.__assign(tslib_1.__assign({}, defaultMqttOptions), ((_a = options.mqttOptions) !== null && _a !== void 0 ? _a : {}));
        _this.client = mqtt_1.connect(_this.options.base, tslib_1.__assign(tslib_1.__assign({}, _this.mqttOptions), { username: _this.options.username, password: _this.options.password }));
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
            return tslib_1.__assign(tslib_1.__assign({}, base), { topic: topic, attributes: {}, payloadType: 'string', payload: message.toString() });
        }
        return tslib_1.__assign(tslib_1.__assign({}, base), { topic: topic, attributes: {}, payloadType: 'json', payload: JSON.parse(message.toString()) });
    };
    RealtimeClient.prototype.subscribe = function (topic, cb) {
        this.getClient().subscribe(topic, cb);
        return this;
    };
    RealtimeClient.prototype.unsubscribe = function (topic, cb) {
        var _a;
        this.getClient().unsubscribe(topic, (_a = cb) !== null && _a !== void 0 ? _a : undefined);
        return this;
    };
    RealtimeClient.prototype.publish = function (topic, payload) {
        var _this = this;
        if (Array.isArray(topic)) {
            topic.forEach(function (item) {
                _this.getClient().publish(item, payload);
            });
            return this;
        }
        this.getClient().publish(topic, payload);
        return this;
    };
    return RealtimeClient;
}(events_1.default.EventEmitter));
exports.RealtimeClient = RealtimeClient;
var UninstantiatedMqttClient = (function (_super) {
    tslib_1.__extends(UninstantiatedMqttClient, _super);
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
var UninstantiatedRealtimeClient = (function (_super) {
    tslib_1.__extends(UninstantiatedRealtimeClient, _super);
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