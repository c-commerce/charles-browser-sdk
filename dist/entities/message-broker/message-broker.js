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
    MessageBroker.prototype.setup = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('messagebroker setup requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/setup",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        res = _c.sent();
                        return [2, res.status];
                    case 3:
                        err_1 = _c.sent();
                        throw new MessageBrokerSetupRemoteError(undefined, { error: err_1 });
                    case 4: return [2];
                }
            });
        });
    };
    MessageBroker.prototype.syncMessageTemplates = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
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
                        err_2 = _b.sent();
                        throw this.handleError(new MessageBrokerSyncMessageTemplatesRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    MessageBroker.prototype.syncMessages = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('message broker setup requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/messages",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Content-Length': '0'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 2:
                        res = _b.sent();
                        return [2, res.status];
                    case 3:
                        err_3 = _b.sent();
                        throw this.handleError(new MessageBrokerSyncMessagesRemoteError(undefined, { error: err_3 }));
                    case 4: return [2];
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
var MessageBrokerSetupRemoteError = (function (_super) {
    tslib_1.__extends(MessageBrokerSetupRemoteError, _super);
    function MessageBrokerSetupRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not setup message broker.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageBrokerSetupRemoteError';
        Object.setPrototypeOf(_this, MessageBrokerSetupRemoteError.prototype);
        return _this;
    }
    return MessageBrokerSetupRemoteError;
}(errors_1.BaseError));
exports.MessageBrokerSetupRemoteError = MessageBrokerSetupRemoteError;
var MessageBrokerSyncMessagesRemoteError = (function (_super) {
    tslib_1.__extends(MessageBrokerSyncMessagesRemoteError, _super);
    function MessageBrokerSyncMessagesRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not sync messages of message broker.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageBrokerSyncMessagesRemoteError';
        Object.setPrototypeOf(_this, MessageBrokerSyncMessagesRemoteError.prototype);
        return _this;
    }
    return MessageBrokerSyncMessagesRemoteError;
}(errors_1.BaseError));
exports.MessageBrokerSyncMessagesRemoteError = MessageBrokerSyncMessagesRemoteError;
//# sourceMappingURL=message-broker.js.map