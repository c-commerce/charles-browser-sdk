"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingMethodsFetchRemoteError = exports.ShippingMethodFetchRemoteError = exports.ShippingMethodInitializationError = exports.ShippingMethods = exports.ShippingMethod = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var ShippingMethod = (function (_super) {
    tslib_1.__extends(ShippingMethod, _super);
    function ShippingMethod(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/shipping_methods';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    ShippingMethod.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.description = rawPayload.description;
        this.zoneRates = rawPayload.zone_rates;
        return this;
    };
    ShippingMethod.create = function (payload, universe, http) {
        return new ShippingMethod({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    ShippingMethod.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            description: this.description,
            zone_rates: this.zoneRates
        };
    };
    ShippingMethod.prototype.init = function () {
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
                        throw this.handleError(new ShippingMethodInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return ShippingMethod;
}(_base_1.default));
exports.ShippingMethod = ShippingMethod;
var ShippingMethods = (function () {
    function ShippingMethods() {
    }
    ShippingMethods.endpoint = 'api/v0/shipping_methods';
    return ShippingMethods;
}());
exports.ShippingMethods = ShippingMethods;
var ShippingMethodInitializationError = (function (_super) {
    tslib_1.__extends(ShippingMethodInitializationError, _super);
    function ShippingMethodInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize shipping_method.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ShippingMethodInitializationError';
        Object.setPrototypeOf(_this, ShippingMethodInitializationError.prototype);
        return _this;
    }
    return ShippingMethodInitializationError;
}(errors_1.BaseError));
exports.ShippingMethodInitializationError = ShippingMethodInitializationError;
var ShippingMethodFetchRemoteError = (function (_super) {
    tslib_1.__extends(ShippingMethodFetchRemoteError, _super);
    function ShippingMethodFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get shipping_method.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ShippingMethodFetchRemoteError';
        Object.setPrototypeOf(_this, ShippingMethodFetchRemoteError.prototype);
        return _this;
    }
    return ShippingMethodFetchRemoteError;
}(errors_1.BaseError));
exports.ShippingMethodFetchRemoteError = ShippingMethodFetchRemoteError;
var ShippingMethodsFetchRemoteError = (function (_super) {
    tslib_1.__extends(ShippingMethodsFetchRemoteError, _super);
    function ShippingMethodsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get shipping_methods.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ShippingMethodsFetchRemoteError';
        Object.setPrototypeOf(_this, ShippingMethodsFetchRemoteError.prototype);
        return _this;
    }
    return ShippingMethodsFetchRemoteError;
}(errors_1.BaseError));
exports.ShippingMethodsFetchRemoteError = ShippingMethodsFetchRemoteError;
//# sourceMappingURL=shipping-method.js.map