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
    Storefront.prototype.setup = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('storefront setup requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/setup",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        res = _c.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 3:
                        err_2 = _c.sent();
                        throw new StorefrontSetupRemoteError(undefined, { error: err_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefront.prototype.syncProducts = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('storefront setup requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/products",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Content-Length': '0'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 2:
                        res = _b.sent();
                        return [2, res.status];
                    case 3:
                        err_3 = _b.sent();
                        throw this.handleError(new StorefrontSyncProductsRemoteError(undefined, { error: err_3 }));
                    case 4: return [2];
                }
            });
        });
    };
    Storefront.prototype.syncOrders = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_4;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('storefront setup requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/orders",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Content-Length': '0'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 2:
                        res = _b.sent();
                        return [2, res.status];
                    case 3:
                        err_4 = _b.sent();
                        throw this.handleError(new StorefrontSyncOrdersRemoteError(undefined, { error: err_4 }));
                    case 4: return [2];
                }
            });
        });
    };
    Storefront.prototype.syncInventories = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_5;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('storefront setup requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/inventories",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Content-Length': '0'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 2:
                        res = _b.sent();
                        return [2, res.status];
                    case 3:
                        err_5 = _b.sent();
                        throw this.handleError(new StorefrontSyncInventoriesRemoteError(undefined, { error: err_5 }));
                    case 4: return [2];
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
var StorefrontSyncProductsRemoteError = (function (_super) {
    tslib_1.__extends(StorefrontSyncProductsRemoteError, _super);
    function StorefrontSyncProductsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not sync products of storefront.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontSyncProductsRemoteError';
        Object.setPrototypeOf(_this, StorefrontSyncProductsRemoteError.prototype);
        return _this;
    }
    return StorefrontSyncProductsRemoteError;
}(errors_1.BaseError));
exports.StorefrontSyncProductsRemoteError = StorefrontSyncProductsRemoteError;
var StorefrontSyncOrdersRemoteError = (function (_super) {
    tslib_1.__extends(StorefrontSyncOrdersRemoteError, _super);
    function StorefrontSyncOrdersRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not sync orders of storefront.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontSyncOrdersRemoteError';
        Object.setPrototypeOf(_this, StorefrontSyncOrdersRemoteError.prototype);
        return _this;
    }
    return StorefrontSyncOrdersRemoteError;
}(errors_1.BaseError));
exports.StorefrontSyncOrdersRemoteError = StorefrontSyncOrdersRemoteError;
var StorefrontSyncInventoriesRemoteError = (function (_super) {
    tslib_1.__extends(StorefrontSyncInventoriesRemoteError, _super);
    function StorefrontSyncInventoriesRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not sync inventories of storefront.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontSyncInventoriesRemoteError';
        Object.setPrototypeOf(_this, StorefrontSyncInventoriesRemoteError.prototype);
        return _this;
    }
    return StorefrontSyncInventoriesRemoteError;
}(errors_1.BaseError));
exports.StorefrontSyncInventoriesRemoteError = StorefrontSyncInventoriesRemoteError;
var StorefrontSetupRemoteError = (function (_super) {
    tslib_1.__extends(StorefrontSetupRemoteError, _super);
    function StorefrontSetupRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not setup storefront.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontSetupRemoteError';
        Object.setPrototypeOf(_this, StorefrontSetupRemoteError.prototype);
        return _this;
    }
    return StorefrontSetupRemoteError;
}(errors_1.BaseError));
exports.StorefrontSetupRemoteError = StorefrontSetupRemoteError;
//# sourceMappingURL=storefront.js.map