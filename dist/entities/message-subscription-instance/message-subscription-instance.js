"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSubscriptionInstanceGetAllRemoteError = exports.MessageSubscriptionInstancesFetchRemoteError = exports.MessageSubscriptionInstanceFetchRemoteError = exports.MessageSubscriptionInstanceInitializationError = exports.MessageSubscriptionInstances = exports.MessageSubscriptionInstance = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var MessageSubscriptionInstance = (function (_super) {
    tslib_1.__extends(MessageSubscriptionInstance, _super);
    function MessageSubscriptionInstance(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/message_subscription_instances';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    MessageSubscriptionInstance.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.topic = rawPayload.topic;
        this.messageSubscription = rawPayload.message_subscription;
        this.channelUser = rawPayload.channel_user;
        this.person = rawPayload.person;
        this.status = rawPayload.status;
        this.date = rawPayload.date;
        this.eventRoute = rawPayload.event_route;
        return this;
    };
    MessageSubscriptionInstance.create = function (payload, universe, http) {
        return new MessageSubscriptionInstance({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    MessageSubscriptionInstance.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            topic: this.topic,
            message_subscription: this.messageSubscription,
            channel_user: this.channelUser,
            person: this.person,
            status: this.status,
            date: this.date,
            event_route: this.eventRoute
        };
    };
    MessageSubscriptionInstance.prototype.init = function () {
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
                        throw this.handleError(new MessageSubscriptionInstanceInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return MessageSubscriptionInstance;
}(_base_1.UniverseEntity));
exports.MessageSubscriptionInstance = MessageSubscriptionInstance;
var MessageSubscriptionInstances = (function () {
    function MessageSubscriptionInstances() {
    }
    MessageSubscriptionInstances.endpoint = 'api/v0/message_subscription_instances';
    return MessageSubscriptionInstances;
}());
exports.MessageSubscriptionInstances = MessageSubscriptionInstances;
var MessageSubscriptionInstanceInitializationError = (function (_super) {
    tslib_1.__extends(MessageSubscriptionInstanceInitializationError, _super);
    function MessageSubscriptionInstanceInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize message_subscription_instance.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageSubscriptionInstanceInitializationError';
        Object.setPrototypeOf(_this, MessageSubscriptionInstanceInitializationError.prototype);
        return _this;
    }
    return MessageSubscriptionInstanceInitializationError;
}(errors_1.BaseError));
exports.MessageSubscriptionInstanceInitializationError = MessageSubscriptionInstanceInitializationError;
var MessageSubscriptionInstanceFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageSubscriptionInstanceFetchRemoteError, _super);
    function MessageSubscriptionInstanceFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get message_subscription_instance.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageSubscriptionInstanceFetchRemoteError';
        Object.setPrototypeOf(_this, MessageSubscriptionInstanceFetchRemoteError.prototype);
        return _this;
    }
    return MessageSubscriptionInstanceFetchRemoteError;
}(errors_1.BaseError));
exports.MessageSubscriptionInstanceFetchRemoteError = MessageSubscriptionInstanceFetchRemoteError;
var MessageSubscriptionInstancesFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageSubscriptionInstancesFetchRemoteError, _super);
    function MessageSubscriptionInstancesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get message_subscription_instances.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageSubscriptionInstancesFetchRemoteError';
        Object.setPrototypeOf(_this, MessageSubscriptionInstancesFetchRemoteError.prototype);
        return _this;
    }
    return MessageSubscriptionInstancesFetchRemoteError;
}(errors_1.BaseError));
exports.MessageSubscriptionInstancesFetchRemoteError = MessageSubscriptionInstancesFetchRemoteError;
var MessageSubscriptionInstanceGetAllRemoteError = (function (_super) {
    tslib_1.__extends(MessageSubscriptionInstanceGetAllRemoteError, _super);
    function MessageSubscriptionInstanceGetAllRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get all message_subscription_instances for message subscription'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageSubscriptionInstanceGetAllRemoteError';
        Object.setPrototypeOf(_this, MessageSubscriptionInstanceGetAllRemoteError.prototype);
        return _this;
    }
    return MessageSubscriptionInstanceGetAllRemoteError;
}(errors_1.BaseError));
exports.MessageSubscriptionInstanceGetAllRemoteError = MessageSubscriptionInstanceGetAllRemoteError;
//# sourceMappingURL=message-subscription-instance.js.map