"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeysFetchRemoteError = exports.ApiKeyFetchRemoteError = exports.ApiKeyInitializationError = exports.ApiKeys = exports.ApiKey = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var ApiKey = (function (_super) {
    tslib_1.__extends(ApiKey, _super);
    function ApiKey(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/api_keys';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    ApiKey.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.description = rawPayload.description;
        this.permissions = rawPayload.permissions;
        this.labels = rawPayload.labels;
        this.apiKey = rawPayload.api_key;
        return this;
    };
    ApiKey.create = function (payload, universe, http) {
        return new ApiKey({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    ApiKey.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            description: this.description,
            permissions: this.permissions,
            labels: this.labels,
            api_key: this.apiKey
        };
    };
    ApiKey.prototype.init = function () {
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
                        throw this.handleError(new ApiKeyInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return ApiKey;
}(_base_1.UniverseEntity));
exports.ApiKey = ApiKey;
var ApiKeys = (function () {
    function ApiKeys() {
    }
    ApiKeys.endpoint = 'api/v0/api_keys';
    return ApiKeys;
}());
exports.ApiKeys = ApiKeys;
var ApiKeyInitializationError = (function (_super) {
    tslib_1.__extends(ApiKeyInitializationError, _super);
    function ApiKeyInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize api_key.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ApiKeyInitializationError';
        Object.setPrototypeOf(_this, ApiKeyInitializationError.prototype);
        return _this;
    }
    return ApiKeyInitializationError;
}(errors_1.BaseError));
exports.ApiKeyInitializationError = ApiKeyInitializationError;
var ApiKeyFetchRemoteError = (function (_super) {
    tslib_1.__extends(ApiKeyFetchRemoteError, _super);
    function ApiKeyFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get api_key.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ApiKeyFetchRemoteError';
        Object.setPrototypeOf(_this, ApiKeyFetchRemoteError.prototype);
        return _this;
    }
    return ApiKeyFetchRemoteError;
}(errors_1.BaseError));
exports.ApiKeyFetchRemoteError = ApiKeyFetchRemoteError;
var ApiKeysFetchRemoteError = (function (_super) {
    tslib_1.__extends(ApiKeysFetchRemoteError, _super);
    function ApiKeysFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get api_keys.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ApiKeysFetchRemoteError';
        Object.setPrototypeOf(_this, ApiKeysFetchRemoteError.prototype);
        return _this;
    }
    return ApiKeysFetchRemoteError;
}(errors_1.BaseError));
exports.ApiKeysFetchRemoteError = ApiKeysFetchRemoteError;
//# sourceMappingURL=api-key.js.map