"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Storefront = (function (_super) {
    tslib_1.__extends(Storefront, _super);
    function Storefront(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/storefronts';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Storefront.prototype.deserialize = function (rawPayload) {
        var _a, _b;
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
        return this;
    };
    Storefront.create = function (payload, universe, http) {
        return new Storefront({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Storefront.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            uri: this.uri,
            is_proxy: this.isProxy,
            proxy_vendor: this.proxyVendor,
            configuration: this.configuration,
            integration_configuration: this.integrationConfiguration,
            is_set_up: this.isSetUp,
            metadata: this.metadata
        };
    };
    Storefront.prototype.init = function () {
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
                        throw this.handleError(new StorefrontInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Storefront;
}(_base_1.default));
exports.Storefront = Storefront;
var Storefronts = (function () {
    function Storefronts() {
    }
    Storefronts.endpoint = 'api/v0/storefronts';
    return Storefronts;
}());
exports.Storefronts = Storefronts;
var StorefrontInitializationError = (function (_super) {
    tslib_1.__extends(StorefrontInitializationError, _super);
    function StorefrontInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize storefront.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontInitializationError';
        Object.setPrototypeOf(_this, StorefrontInitializationError.prototype);
        return _this;
    }
    return StorefrontInitializationError;
}(errors_1.BaseError));
exports.StorefrontInitializationError = StorefrontInitializationError;
var StorefrontFetchRemoteError = (function (_super) {
    tslib_1.__extends(StorefrontFetchRemoteError, _super);
    function StorefrontFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get storefront.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontFetchRemoteError';
        Object.setPrototypeOf(_this, StorefrontFetchRemoteError.prototype);
        return _this;
    }
    return StorefrontFetchRemoteError;
}(errors_1.BaseError));
exports.StorefrontFetchRemoteError = StorefrontFetchRemoteError;
var StorefrontsFetchRemoteError = (function (_super) {
    tslib_1.__extends(StorefrontsFetchRemoteError, _super);
    function StorefrontsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get storefronts.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchRemoteError';
        Object.setPrototypeOf(_this, StorefrontsFetchRemoteError.prototype);
        return _this;
    }
    return StorefrontsFetchRemoteError;
}(errors_1.BaseError));
exports.StorefrontsFetchRemoteError = StorefrontsFetchRemoteError;
//# sourceMappingURL=storefront.js.map