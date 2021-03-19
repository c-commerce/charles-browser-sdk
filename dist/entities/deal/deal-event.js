"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealEventsFetchRemoteError = exports.DealEventFetchRemoteError = exports.DealEventInitializationError = exports.DealEvent = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var DealEvent = (function (_super) {
    tslib_1.__extends(DealEvent, _super);
    function DealEvent(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        _this.endpoint = '';
        if ((options === null || options === void 0 ? void 0 : options.rawPayload) && options.rawPayload.deal) {
            _this.endpoint = "api/v0/deals/" + options.rawPayload.deal + "/events";
        }
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    DealEvent.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.type = rawPayload.type;
        this.resource = rawPayload.resource;
        this.resourceType = rawPayload.resource_type;
        this.deal = rawPayload.deal;
        this.author = rawPayload.author;
        this.proxyPayload = rawPayload.proxy_payload;
        return this;
    };
    DealEvent.create = function (payload, universe, http) {
        return new DealEvent({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    DealEvent.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            type: this.type,
            resource: this.resource,
            resource_type: this.resourceType,
            deal: this.deal,
            author: this.author,
            proxy_payload: this.proxyPayload
        };
    };
    DealEvent.prototype.init = function () {
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
                        throw this.handleError(new DealEventInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return DealEvent;
}(_base_1.default));
exports.DealEvent = DealEvent;
var DealEventInitializationError = (function (_super) {
    tslib_1.__extends(DealEventInitializationError, _super);
    function DealEventInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize deal_event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealEventInitializationError';
        Object.setPrototypeOf(_this, DealEventInitializationError.prototype);
        return _this;
    }
    return DealEventInitializationError;
}(errors_1.BaseError));
exports.DealEventInitializationError = DealEventInitializationError;
var DealEventFetchRemoteError = (function (_super) {
    tslib_1.__extends(DealEventFetchRemoteError, _super);
    function DealEventFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get deal_event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealEventFetchRemoteError';
        Object.setPrototypeOf(_this, DealEventFetchRemoteError.prototype);
        return _this;
    }
    return DealEventFetchRemoteError;
}(errors_1.BaseError));
exports.DealEventFetchRemoteError = DealEventFetchRemoteError;
var DealEventsFetchRemoteError = (function (_super) {
    tslib_1.__extends(DealEventsFetchRemoteError, _super);
    function DealEventsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get deal_events.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealEventsFetchRemoteError';
        Object.setPrototypeOf(_this, DealEventsFetchRemoteError.prototype);
        return _this;
    }
    return DealEventsFetchRemoteError;
}(errors_1.BaseError));
exports.DealEventsFetchRemoteError = DealEventsFetchRemoteError;
//# sourceMappingURL=deal-event.js.map