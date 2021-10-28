"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSubscriptionsCreateInstanceRemoteError = exports.MessageSubscriptionsFetchRemoteError = exports.MessageSubscriptionFetchRemoteError = exports.MessageSubscriptionInitializationError = exports.MessageSubscriptions = exports.MessageSubscription = exports.IMessageSubscriptionKindEnum = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var qs_1 = tslib_1.__importDefault(require("qs"));
var message_subscription_instance_1 = require("../message-subscription-instance/message-subscription-instance");
var IMessageSubscriptionKindEnum;
(function (IMessageSubscriptionKindEnum) {
    IMessageSubscriptionKindEnum["GDPRGenernalCommunicationImplicit"] = "GDPRGeneralCommunicationImplicit";
    IMessageSubscriptionKindEnum["GDPRGenernalCommunicationExplicit"] = "GDPRGeneralCommunicationExplicit";
    IMessageSubscriptionKindEnum["OneTimeEventImplicit"] = "OneTimeEventImplicit";
    IMessageSubscriptionKindEnum["OneTimeEventExplicit"] = "OneTimeEventExplicit";
    IMessageSubscriptionKindEnum["Generic"] = "Generic";
})(IMessageSubscriptionKindEnum = exports.IMessageSubscriptionKindEnum || (exports.IMessageSubscriptionKindEnum = {}));
var MessageSubscription = (function (_super) {
    tslib_1.__extends(MessageSubscription, _super);
    function MessageSubscription(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/message_subscriptions';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    MessageSubscription.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.summary = rawPayload.summary;
        this.description = rawPayload.description;
        this.kind = rawPayload.kind;
        this.scope = rawPayload.scope;
        this.messageTemplates = rawPayload.message_templates;
        this.eventRouteTemplate = rawPayload.event_route_template;
        this.configuration = rawPayload.configuration;
        return this;
    };
    MessageSubscription.create = function (payload, universe, http) {
        return new MessageSubscription({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    MessageSubscription.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            summary: this.summary,
            description: this.description,
            kind: this.kind,
            scope: this.scope,
            message_templates: this.messageTemplates,
            event_route_template: this.eventRouteTemplate,
            configuration: this.configuration
        };
    };
    MessageSubscription.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.fetch()];
                    case 1:
                        _a.sent();
                        return [2, this];
                    case 2:
                        err_1 = _a.sent();
                        throw this.handleError(new MessageSubscriptionInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    MessageSubscription.prototype.subscribers = function (options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resources, err_2;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/instances" + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 1:
                        res = _c.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (item) {
                                return message_subscription_instance_1.MessageSubscriptionInstance.create(item, _this.universe, _this.http);
                            })];
                    case 2:
                        err_2 = _c.sent();
                        throw this.handleError(new message_subscription_instance_1.MessageSubscriptionInstanceGetAllRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    MessageSubscription.prototype.createInstance = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resource, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('MessageSubscription create instance requires message subscription id to be set');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/instances",
                            data: payload
                        };
                        return [4, this.http.getClient()(opts)];
                    case 2:
                        res = _a.sent();
                        resource = res.data.data;
                        return [2, message_subscription_instance_1.MessageSubscriptionInstance.create(resource, this.universe, this.http)];
                    case 3:
                        err_3 = _a.sent();
                        throw new MessageSubscriptionsCreateInstanceRemoteError(undefined, { error: err_3 });
                    case 4: return [2];
                }
            });
        });
    };
    return MessageSubscription;
}(_base_1.UniverseEntity));
exports.MessageSubscription = MessageSubscription;
var MessageSubscriptions = (function () {
    function MessageSubscriptions() {
    }
    MessageSubscriptions.endpoint = 'api/v0/message_subscriptions';
    return MessageSubscriptions;
}());
exports.MessageSubscriptions = MessageSubscriptions;
var MessageSubscriptionInitializationError = (function (_super) {
    tslib_1.__extends(MessageSubscriptionInitializationError, _super);
    function MessageSubscriptionInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize message_subscription.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageSubscriptionInitializationError';
        Object.setPrototypeOf(_this, MessageSubscriptionInitializationError.prototype);
        return _this;
    }
    return MessageSubscriptionInitializationError;
}(errors_1.BaseError));
exports.MessageSubscriptionInitializationError = MessageSubscriptionInitializationError;
var MessageSubscriptionFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageSubscriptionFetchRemoteError, _super);
    function MessageSubscriptionFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get message_subscription.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageSubscriptionFetchRemoteError';
        Object.setPrototypeOf(_this, MessageSubscriptionFetchRemoteError.prototype);
        return _this;
    }
    return MessageSubscriptionFetchRemoteError;
}(errors_1.BaseError));
exports.MessageSubscriptionFetchRemoteError = MessageSubscriptionFetchRemoteError;
var MessageSubscriptionsFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageSubscriptionsFetchRemoteError, _super);
    function MessageSubscriptionsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get message_subscriptions.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageSubscriptionsFetchRemoteError';
        Object.setPrototypeOf(_this, MessageSubscriptionsFetchRemoteError.prototype);
        return _this;
    }
    return MessageSubscriptionsFetchRemoteError;
}(errors_1.BaseError));
exports.MessageSubscriptionsFetchRemoteError = MessageSubscriptionsFetchRemoteError;
var MessageSubscriptionsCreateInstanceRemoteError = (function (_super) {
    tslib_1.__extends(MessageSubscriptionsCreateInstanceRemoteError, _super);
    function MessageSubscriptionsCreateInstanceRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not create message_subscription instance'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageSubscriptionsCreateInstanceRemoteError';
        Object.setPrototypeOf(_this, MessageSubscriptionsCreateInstanceRemoteError.prototype);
        return _this;
    }
    return MessageSubscriptionsCreateInstanceRemoteError;
}(errors_1.BaseError));
exports.MessageSubscriptionsCreateInstanceRemoteError = MessageSubscriptionsCreateInstanceRemoteError;
//# sourceMappingURL=message-subscription.js.map