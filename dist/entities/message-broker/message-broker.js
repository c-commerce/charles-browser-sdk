"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var MessageBroker = (function (_super) {
    tslib_1.__extends(MessageBroker, _super);
    function MessageBroker(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/message_brokers';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    MessageBroker.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.uri = rawPayload.uri;
        this.isProxy = rawPayload.is_proxy;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.configuration = rawPayload.configuration;
        this.integrationConfiguration = rawPayload.integration_configuration;
        this.isSetUp = rawPayload.is_set_up;
        this.metadata = rawPayload.metadata;
        return this;
    };
    MessageBroker.prototype.serialize = function () {
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: this.deleted,
            active: this.active,
            name: this.name,
            uri: this.uri,
            is_proxy: this.isProxy,
            proxy_vendor: this.proxyVendor,
            configuration: this.configuration,
            integration_configuration: this.integrationConfiguration,
            is_set_up: this.isSetUp,
            metadata: this.metadata
        };
    };
    MessageBroker.create = function (payload, universe, http) {
        return new MessageBroker({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    MessageBroker.prototype.syncMessageTemplates = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/message_templates",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Content-Length': '0'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 1:
                        res = _b.sent();
                        return [2, res.status];
                    case 2:
                        err_1 = _b.sent();
                        throw this.handleError(new MessageBrokerSyncMessageTemplatesRemoteError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return MessageBroker;
}(_base_1.default));
exports.MessageBroker = MessageBroker;
var MessageBrokers = (function () {
    function MessageBrokers() {
    }
    MessageBrokers.endpoint = 'api/v0/message_brokers';
    return MessageBrokers;
}());
exports.MessageBrokers = MessageBrokers;
var MessageBrokersFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageBrokersFetchRemoteError, _super);
    function MessageBrokersFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get messageBrokers.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageBrokersFetchRemoteError';
        Object.setPrototypeOf(_this, MessageBrokersFetchRemoteError.prototype);
        return _this;
    }
    return MessageBrokersFetchRemoteError;
}(errors_1.BaseError));
exports.MessageBrokersFetchRemoteError = MessageBrokersFetchRemoteError;
var MessageBrokerSyncMessageTemplatesRemoteError = (function (_super) {
    tslib_1.__extends(MessageBrokerSyncMessageTemplatesRemoteError, _super);
    function MessageBrokerSyncMessageTemplatesRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not sync message templates of broker.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageBrokerSyncMessageTemplatesRemoteError';
        Object.setPrototypeOf(_this, MessageBrokerSyncMessageTemplatesRemoteError.prototype);
        return _this;
    }
    return MessageBrokerSyncMessageTemplatesRemoteError;
}(errors_1.BaseError));
exports.MessageBrokerSyncMessageTemplatesRemoteError = MessageBrokerSyncMessageTemplatesRemoteError;
//# sourceMappingURL=message-broker.js.map