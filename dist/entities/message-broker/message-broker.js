"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBrokerMessageTemplateNotificationSendError = exports.MessageBrokerUpdateProfileRemoteError = exports.MessageBrokerProxyChannelInstancesRemoteError = exports.MessageBrokerSyncMessagesRemoteError = exports.MessageBrokerSetupRemoteError = exports.MessageBrokerSyncMessageTemplatesRemoteError = exports.MessageBrokersFetchRemoteError = exports.MessageBrokers = exports.MessageBroker = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var route_1 = require("../route");
var feed = tslib_1.__importStar(require("../../eventing/feeds/feed"));
var event = tslib_1.__importStar(require("../../eventing/feeds/event"));
var MessageBroker = (function (_super) {
    tslib_1.__extends(MessageBroker, _super);
    function MessageBroker(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
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
        var _this = this;
        var _a, _b, _c, _d;
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
        this.labels = rawPayload.labels;
        this.profile = rawPayload.profile;
        this.externalReferenceId = rawPayload.external_reference_id;
        if (rawPayload.details) {
            this.details = {
                routes: Array.isArray((_c = rawPayload.details) === null || _c === void 0 ? void 0 : _c.routes) ? (_d = rawPayload.details) === null || _d === void 0 ? void 0 : _d.routes.map(function (item) { return route_1.Route.create(item, _this.universe, _this.http); }) : []
            };
        }
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
            metadata: this.metadata,
            labels: this.labels,
            profile: this.profile,
            external_reference_id: this.externalReferenceId
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
                            throw new TypeError('message broker syncMessages requires id to be set.');
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
    MessageBroker.prototype.syncMessagesForChannel = function (externalPersonReferenceId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_4;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('message broker syncMessagesForChannel requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/messages/" + externalPersonReferenceId,
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
                        err_4 = _b.sent();
                        throw this.handleError(new MessageBrokerSyncMessagesRemoteError(undefined, { error: err_4 }));
                    case 4: return [2];
                }
            });
        });
    };
    MessageBroker.prototype.getProxyChannelInstances = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_5;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'GET',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/proxy/channel_instances",
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 2:
                        res = _b.sent();
                        return [2, res.data.data];
                    case 3:
                        err_5 = _b.sent();
                        throw this.handleError(new MessageBrokerProxyChannelInstancesRemoteError(undefined, { error: err_5 }));
                    case 4: return [2];
                }
            });
        });
    };
    MessageBroker.prototype.updateProfile = function (payload) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_6;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('message broker profile update requires id to be set');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/profile",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Content-Length': '0'
                            },
                            data: tslib_1.__assign({}, (payload !== null && payload !== void 0 ? payload : undefined)),
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 2:
                        res = _b.sent();
                        return [2, res.status];
                    case 3:
                        err_6 = _b.sent();
                        throw this.handleError(new MessageBrokerUpdateProfileRemoteError(undefined, { error: err_6 }));
                    case 4: return [2];
                }
            });
        });
    };
    MessageBroker.prototype.getProfile = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resources, err_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('message broker profile get requires id to be set');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'GET',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/profile",
                            params: tslib_1.__assign({}, ((options === null || options === void 0 ? void 0 : options.query) ? options.query : {}))
                        };
                        return [4, this.http.getClient()(opts)];
                    case 2:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources];
                    case 3:
                        err_7 = _a.sent();
                        throw this.handleError(new MessageBrokerUpdateProfileRemoteError(undefined, { error: err_7 }));
                    case 4: return [2];
                }
            });
        });
    };
    MessageBroker.prototype.sendMessageFromMessageTemplate = function (messageTemplate, channelUserExternalReferenceId, language, parameters) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, _feed, err_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('message broker notification requires id to be set');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/notifications/templates/" + messageTemplate.id,
                            data: {
                                channel_user_external_reference_id: channelUserExternalReferenceId,
                                parameters: parameters,
                                language: language
                            }
                        };
                        return [4, this.http.getClient()(opts)];
                    case 2:
                        response = _a.sent();
                        _feed = feed.Feed.createUninitialized({ id: response.data.data[0].id }, this.universe, this.http, null);
                        return [2, event.Event.create(response.data.data[0], _feed, this.universe, this.http)];
                    case 3:
                        err_8 = _a.sent();
                        throw new MessageBrokerMessageTemplateNotificationSendError(undefined, { error: err_8 });
                    case 4: return [2];
                }
            });
        });
    };
    return MessageBroker;
}(_base_1.UniverseEntity));
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
var MessageBrokerProxyChannelInstancesRemoteError = (function (_super) {
    tslib_1.__extends(MessageBrokerProxyChannelInstancesRemoteError, _super);
    function MessageBrokerProxyChannelInstancesRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get proxied channel instances of a message broker.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageBrokerProxyChannelInstancesRemoteError';
        Object.setPrototypeOf(_this, MessageBrokerProxyChannelInstancesRemoteError.prototype);
        return _this;
    }
    return MessageBrokerProxyChannelInstancesRemoteError;
}(errors_1.BaseError));
exports.MessageBrokerProxyChannelInstancesRemoteError = MessageBrokerProxyChannelInstancesRemoteError;
var MessageBrokerUpdateProfileRemoteError = (function (_super) {
    tslib_1.__extends(MessageBrokerUpdateProfileRemoteError, _super);
    function MessageBrokerUpdateProfileRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not update profile of message broker.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageBrokerUpdateProfileRemoteError';
        Object.setPrototypeOf(_this, MessageBrokerUpdateProfileRemoteError.prototype);
        return _this;
    }
    return MessageBrokerUpdateProfileRemoteError;
}(errors_1.BaseError));
exports.MessageBrokerUpdateProfileRemoteError = MessageBrokerUpdateProfileRemoteError;
var MessageBrokerMessageTemplateNotificationSendError = (function (_super) {
    tslib_1.__extends(MessageBrokerMessageTemplateNotificationSendError, _super);
    function MessageBrokerMessageTemplateNotificationSendError(message, properties) {
        if (message === void 0) { message = 'Could not create broker notification unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageBrokerMessageTemplateNotificationSendError';
        Object.setPrototypeOf(_this, MessageBrokerMessageTemplateNotificationSendError.prototype);
        return _this;
    }
    return MessageBrokerMessageTemplateNotificationSendError;
}(errors_1.BaseError));
exports.MessageBrokerMessageTemplateNotificationSendError = MessageBrokerMessageTemplateNotificationSendError;
//# sourceMappingURL=message-broker.js.map