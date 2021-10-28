"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorefrontScriptsFetchRemoteError = exports.StorefrontScriptFetchRemoteError = exports.StorefrontScriptInitializationError = exports.StorefrontScriptNoStorefrontError = exports.StorefrontScripts = exports.StorefrontScript = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var StorefrontScript = (function (_super) {
    tslib_1.__extends(StorefrontScript, _super);
    function StorefrontScript(options) {
        var _a, _b, _c, _d;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        _this.endpoint = 'api/v0/storefronts';
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        if (((_b = options === null || options === void 0 ? void 0 : options.rawPayload) === null || _b === void 0 ? void 0 : _b.storefront) && ((_c = options === null || options === void 0 ? void 0 : options.rawPayload) === null || _c === void 0 ? void 0 : _c.storefront.length) > 0) {
            _this.endpoint = "api/v0/storefronts/" + ((_d = options === null || options === void 0 ? void 0 : options.rawPayload) === null || _d === void 0 ? void 0 : _d.storefront) + "/scripts";
        }
        return _this;
    }
    StorefrontScript.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.storefront = rawPayload.storefront;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.name = rawPayload.name;
        this.src = rawPayload.src;
        this.displayScope = rawPayload.display_scope;
        this.cacheEnabled = rawPayload.cache_enabled;
        this.isProxy = rawPayload.is_proxy;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.configuration = rawPayload.configuration;
        this.isSetUp = rawPayload.is_set_up;
        this.metadata = rawPayload.metadata;
        return this;
    };
    StorefrontScript.create = function (payload, universe, http) {
        return new StorefrontScript({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    StorefrontScript.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            storefront: this.storefront,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            src: this.src,
            display_scope: this.displayScope,
            cache_enabled: this.cacheEnabled,
            is_proxy: this.isProxy,
            proxy_vendor: this.proxyVendor,
            configuration: this.configuration,
            is_set_up: this.isSetUp,
            metadata: this.metadata
        };
    };
    StorefrontScript.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storefront || this.storefront.length === 0) {
                            throw new StorefrontScriptNoStorefrontError('Cannot init storefront script without a storefront"');
                        }
                        if (!this.id || this.id.length === 0) {
                            throw new StorefrontScriptNoStorefrontError('Cannot init storefront script without an id"');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.fetch()];
                    case 2:
                        _a.sent();
                        return [2, this];
                    case 3:
                        err_1 = _a.sent();
                        throw this.handleError(new StorefrontScriptInitializationError(undefined, { error: err_1 }));
                    case 4: return [2];
                }
            });
        });
    };
    StorefrontScript.prototype.patch = function (changePart) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storefront || this.storefront.length === 0) {
                            throw new StorefrontScriptNoStorefrontError('Cannot patch storefront script without a storefront"');
                        }
                        return [4, this._patch(changePart)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    StorefrontScript.prototype.post = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storefront || this.storefront.length === 0) {
                            throw new StorefrontScriptNoStorefrontError('Cannot post storefront script without a storefront"');
                        }
                        return [4, this._post()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    StorefrontScript.prototype.put = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storefront || this.storefront.length === 0) {
                            throw new StorefrontScriptNoStorefrontError('Cannot post storefront script without a storefront"');
                        }
                        return [4, this._put()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    StorefrontScript.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storefront || this.storefront.length === 0) {
                            throw new StorefrontScriptNoStorefrontError('Cannot post storefront script without a storefront"');
                        }
                        return [4, this._delete()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    StorefrontScript.prototype.save = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storefront || this.storefront.length === 0) {
                            throw new StorefrontScriptNoStorefrontError('Cannot post storefront script without a storefront"');
                        }
                        return [4, this._save(payload)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return StorefrontScript;
}(_base_1.UniverseEntity));
exports.StorefrontScript = StorefrontScript;
var StorefrontScripts = (function () {
    function StorefrontScripts() {
    }
    StorefrontScripts.endpoint = 'api/v0/storefronts';
    return StorefrontScripts;
}());
exports.StorefrontScripts = StorefrontScripts;
var StorefrontScriptNoStorefrontError = (function (_super) {
    tslib_1.__extends(StorefrontScriptNoStorefrontError, _super);
    function StorefrontScriptNoStorefrontError(message, properties) {
        if (message === void 0) { message = 'Could not initialize storefront script without a storefront. (pass storefront id)'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontScriptNoStorefrontError';
        Object.setPrototypeOf(_this, StorefrontScriptNoStorefrontError.prototype);
        return _this;
    }
    return StorefrontScriptNoStorefrontError;
}(errors_1.BaseError));
exports.StorefrontScriptNoStorefrontError = StorefrontScriptNoStorefrontError;
var StorefrontScriptInitializationError = (function (_super) {
    tslib_1.__extends(StorefrontScriptInitializationError, _super);
    function StorefrontScriptInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize storefront script.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontScriptInitializationError';
        Object.setPrototypeOf(_this, StorefrontScriptInitializationError.prototype);
        return _this;
    }
    return StorefrontScriptInitializationError;
}(errors_1.BaseError));
exports.StorefrontScriptInitializationError = StorefrontScriptInitializationError;
var StorefrontScriptFetchRemoteError = (function (_super) {
    tslib_1.__extends(StorefrontScriptFetchRemoteError, _super);
    function StorefrontScriptFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get storefront script.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontScriptFetchRemoteError';
        Object.setPrototypeOf(_this, StorefrontScriptFetchRemoteError.prototype);
        return _this;
    }
    return StorefrontScriptFetchRemoteError;
}(errors_1.BaseError));
exports.StorefrontScriptFetchRemoteError = StorefrontScriptFetchRemoteError;
var StorefrontScriptsFetchRemoteError = (function (_super) {
    tslib_1.__extends(StorefrontScriptsFetchRemoteError, _super);
    function StorefrontScriptsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get storefront scripts.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontScriptsFetchRemoteError';
        Object.setPrototypeOf(_this, StorefrontScriptsFetchRemoteError.prototype);
        return _this;
    }
    return StorefrontScriptsFetchRemoteError;
}(errors_1.BaseError));
exports.StorefrontScriptsFetchRemoteError = StorefrontScriptsFetchRemoteError;
//# sourceMappingURL=storefront-script.js.map