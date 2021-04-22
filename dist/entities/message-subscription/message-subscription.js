"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSubscriptionsFetchRemoteError = exports.MessageSubscriptionFetchRemoteError = exports.MessageSubscriptionInitializationError = exports.MessageSubscriptions = exports.MessageSubscription = exports.IMessageSubscriptionKindEnum = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var IMessageSubscriptionKindEnum;
(function (IMessageSubscriptionKindEnum) {
    IMessageSubscriptionKindEnum["GDPRGenernalCommunicationImplicit"] = "GDPRGenernalCommunicationImplicit";
    IMessageSubscriptionKindEnum["GDPRGenernalCommunicationExplicit"] = "GDPRGenernalCommunicationExplicit";
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
            message_templates: this.messageTemplates
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
//# sourceMappingURL=message-subscription.js.map