"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealsFetchRemoteError = exports.DealFetchRemoteError = exports.DealInitializationError = exports.Deals = exports.Deal = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Deal = (function (_super) {
    tslib_1.__extends(Deal, _super);
    function Deal(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/deals';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Deal.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.pipeline = rawPayload.pipeline;
        this.stage = rawPayload.stage;
        this.person = rawPayload.person;
        return this;
    };
    Deal.create = function (payload, universe, http) {
        return new Deal({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Deal.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            pipeline: this.pipeline,
            stage: this.stage,
            person: this.person
        };
    };
    Deal.prototype.init = function () {
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
                        throw this.handleError(new DealInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Deal;
}(_base_1.default));
exports.Deal = Deal;
var Deals = (function () {
    function Deals() {
    }
    Deals.endpoint = 'api/v0/deals';
    return Deals;
}());
exports.Deals = Deals;
var DealInitializationError = (function (_super) {
    tslib_1.__extends(DealInitializationError, _super);
    function DealInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize deal.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealInitializationError';
        Object.setPrototypeOf(_this, DealInitializationError.prototype);
        return _this;
    }
    return DealInitializationError;
}(errors_1.BaseError));
exports.DealInitializationError = DealInitializationError;
var DealFetchRemoteError = (function (_super) {
    tslib_1.__extends(DealFetchRemoteError, _super);
    function DealFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get deal.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealFetchRemoteError';
        Object.setPrototypeOf(_this, DealFetchRemoteError.prototype);
        return _this;
    }
    return DealFetchRemoteError;
}(errors_1.BaseError));
exports.DealFetchRemoteError = DealFetchRemoteError;
var DealsFetchRemoteError = (function (_super) {
    tslib_1.__extends(DealsFetchRemoteError, _super);
    function DealsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get deals.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealsFetchRemoteError';
        Object.setPrototypeOf(_this, DealsFetchRemoteError.prototype);
        return _this;
    }
    return DealsFetchRemoteError;
}(errors_1.BaseError));
exports.DealsFetchRemoteError = DealsFetchRemoteError;
//# sourceMappingURL=deal.js.map