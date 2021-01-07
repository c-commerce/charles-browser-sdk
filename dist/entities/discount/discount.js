"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountsFetchRemoteError = exports.DiscountFetchRemoteError = exports.DiscountInitializationError = exports.Discounts = exports.Discount = exports.DiscountTypesEnum = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var DiscountTypesEnum;
(function (DiscountTypesEnum) {
    DiscountTypesEnum["rate"] = "rate";
    DiscountTypesEnum["value"] = "value";
})(DiscountTypesEnum = exports.DiscountTypesEnum || (exports.DiscountTypesEnum = {}));
var Discount = (function (_super) {
    tslib_1.__extends(Discount, _super);
    function Discount(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/discounts';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Discount.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.type = rawPayload.type;
        this.value = rawPayload.value;
        this.name = rawPayload.name;
        this.i18n = rawPayload.i18n;
        return this;
    };
    Discount.create = function (payload, universe, http) {
        return new Discount({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Discount.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            type: this.type,
            value: this.value,
            name: this.name,
            i18n: this.i18n
        };
    };
    Discount.prototype.init = function () {
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
                        throw this.handleError(new DiscountInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Discount;
}(_base_1.default));
exports.Discount = Discount;
var Discounts = (function () {
    function Discounts() {
    }
    Discounts.endpoint = 'api/v0/discounts';
    return Discounts;
}());
exports.Discounts = Discounts;
var DiscountInitializationError = (function (_super) {
    tslib_1.__extends(DiscountInitializationError, _super);
    function DiscountInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize discount.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountInitializationError';
        return _this;
    }
    return DiscountInitializationError;
}(errors_1.BaseError));
exports.DiscountInitializationError = DiscountInitializationError;
var DiscountFetchRemoteError = (function (_super) {
    tslib_1.__extends(DiscountFetchRemoteError, _super);
    function DiscountFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get discount.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountFetchRemoteError';
        return _this;
    }
    return DiscountFetchRemoteError;
}(errors_1.BaseError));
exports.DiscountFetchRemoteError = DiscountFetchRemoteError;
var DiscountsFetchRemoteError = (function (_super) {
    tslib_1.__extends(DiscountsFetchRemoteError, _super);
    function DiscountsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get discounts.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountsFetchRemoteError';
        return _this;
    }
    return DiscountsFetchRemoteError;
}(errors_1.BaseError));
exports.DiscountsFetchRemoteError = DiscountsFetchRemoteError;
//# sourceMappingURL=discount.js.map