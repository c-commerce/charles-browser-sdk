"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversesPoolsFetchRemoteError = exports.UniversesPoolFetchRemoteError = exports.UniversesPoolInitializationError = exports.UniversesPools = exports.UniversesPool = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../../../entities/_base"));
var errors_1 = require("../../../errors");
var UniversesPool = (function (_super) {
    tslib_1.__extends(UniversesPool, _super);
    function UniversesPool(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.apiCarrier = options.carrier;
        _this.endpoint = 'api/v0/universes_pools';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    UniversesPool.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.status = rawPayload.status;
        this.configuration = rawPayload.configuration;
        return this;
    };
    UniversesPool.create = function (payload, carrier, http) {
        return new UniversesPool({ rawPayload: payload, carrier: carrier, http: http, initialized: true });
    };
    UniversesPool.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            status: this.status,
            configuration: this.configuration
        };
    };
    UniversesPool.prototype.init = function () {
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
                        throw this.handleError(new UniversesPoolInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return UniversesPool;
}(_base_1.default));
exports.UniversesPool = UniversesPool;
var UniversesPools = (function () {
    function UniversesPools() {
    }
    UniversesPools.endpoint = 'api/v0/universes_pools';
    return UniversesPools;
}());
exports.UniversesPools = UniversesPools;
var UniversesPoolInitializationError = (function (_super) {
    tslib_1.__extends(UniversesPoolInitializationError, _super);
    function UniversesPoolInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize UniversesPool.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniversesPoolInitializationError';
        Object.setPrototypeOf(_this, UniversesPoolInitializationError.prototype);
        return _this;
    }
    return UniversesPoolInitializationError;
}(errors_1.BaseError));
exports.UniversesPoolInitializationError = UniversesPoolInitializationError;
var UniversesPoolFetchRemoteError = (function (_super) {
    tslib_1.__extends(UniversesPoolFetchRemoteError, _super);
    function UniversesPoolFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get UniversesPool.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniversesPoolFetchRemoteError';
        Object.setPrototypeOf(_this, UniversesPoolFetchRemoteError.prototype);
        return _this;
    }
    return UniversesPoolFetchRemoteError;
}(errors_1.BaseError));
exports.UniversesPoolFetchRemoteError = UniversesPoolFetchRemoteError;
var UniversesPoolsFetchRemoteError = (function (_super) {
    tslib_1.__extends(UniversesPoolsFetchRemoteError, _super);
    function UniversesPoolsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get universes pools.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniversesPoolsFetchRemoteError';
        Object.setPrototypeOf(_this, UniversesPoolsFetchRemoteError.prototype);
        return _this;
    }
    return UniversesPoolsFetchRemoteError;
}(errors_1.BaseError));
exports.UniversesPoolsFetchRemoteError = UniversesPoolsFetchRemoteError;
//# sourceMappingURL=universes-pool.js.map