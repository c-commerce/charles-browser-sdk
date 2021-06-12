"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlShortenerShortenError = exports.UrlShortenersFetchRemoteError = exports.UrlShortenerFetchRemoteError = exports.UrlShortenerInitializationError = exports.UrlShorteners = exports.UrlShortener = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var UrlShortener = (function (_super) {
    tslib_1.__extends(UrlShortener, _super);
    function UrlShortener(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/url_shorteners';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    UrlShortener.prototype.deserialize = function (rawPayload) {
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
        this.isDefault = rawPayload.is_default;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.kind = rawPayload.kind;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.configuration = rawPayload.configuration;
        this.integrationConfiguration = rawPayload.integration_configuration;
        this.isSetUp = rawPayload.is_set_up;
        this.labels = rawPayload.labels;
        return this;
    };
    UrlShortener.create = function (payload, universe, http) {
        return new UrlShortener({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    UrlShortener.prototype.serialize = function () {
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
            is_default: this.isDefault,
            proxy_vendor: this.proxyVendor,
            kind: this.kind,
            external_reference_id: this.externalReferenceId,
            configuration: this.configuration,
            integration_configuration: this.integrationConfiguration,
            is_set_up: this.isSetUp,
            labels: this.labels
        };
    };
    UrlShortener.prototype.init = function () {
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
                        throw this.handleError(new UrlShortenerInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    UrlShortener.prototype.shorten = function (request) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_2;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('shorten requires id to be set.');
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: ((_b = (_a = this.apiCarrier) === null || _a === void 0 ? void 0 : _a.injectables) === null || _b === void 0 ? void 0 : _b.base) + "/" + this.endpoint + "/" + this.id + "/shorten",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: request,
                            responseType: 'json'
                        };
                        return [4, ((_c = this.http) === null || _c === void 0 ? void 0 : _c.getClient()(opts))];
                    case 2:
                        response = _d.sent();
                        return [2, response.data.data[0]];
                    case 3:
                        err_2 = _d.sent();
                        throw new UrlShortenerShortenError(undefined, { error: err_2 });
                    case 4: return [2];
                }
            });
        });
    };
    return UrlShortener;
}(_base_1.UniverseEntity));
exports.UrlShortener = UrlShortener;
var UrlShorteners = (function () {
    function UrlShorteners() {
    }
    UrlShorteners.endpoint = 'api/v0/url_shorteners';
    return UrlShorteners;
}());
exports.UrlShorteners = UrlShorteners;
var UrlShortenerInitializationError = (function (_super) {
    tslib_1.__extends(UrlShortenerInitializationError, _super);
    function UrlShortenerInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize url_shortener.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UrlShortenerInitializationError';
        Object.setPrototypeOf(_this, UrlShortenerInitializationError.prototype);
        return _this;
    }
    return UrlShortenerInitializationError;
}(errors_1.BaseError));
exports.UrlShortenerInitializationError = UrlShortenerInitializationError;
var UrlShortenerFetchRemoteError = (function (_super) {
    tslib_1.__extends(UrlShortenerFetchRemoteError, _super);
    function UrlShortenerFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get url_shortener.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UrlShortenerFetchRemoteError';
        Object.setPrototypeOf(_this, UrlShortenerFetchRemoteError.prototype);
        return _this;
    }
    return UrlShortenerFetchRemoteError;
}(errors_1.BaseError));
exports.UrlShortenerFetchRemoteError = UrlShortenerFetchRemoteError;
var UrlShortenersFetchRemoteError = (function (_super) {
    tslib_1.__extends(UrlShortenersFetchRemoteError, _super);
    function UrlShortenersFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get url_shorteners.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UrlShortenersFetchRemoteError';
        Object.setPrototypeOf(_this, UrlShortenersFetchRemoteError.prototype);
        return _this;
    }
    return UrlShortenersFetchRemoteError;
}(errors_1.BaseError));
exports.UrlShortenersFetchRemoteError = UrlShortenersFetchRemoteError;
var UrlShortenerShortenError = (function (_super) {
    tslib_1.__extends(UrlShortenerShortenError, _super);
    function UrlShortenerShortenError(message, properties) {
        if (message === void 0) { message = 'Could not shorten URL.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UrlShortenerShortenError';
        Object.setPrototypeOf(_this, UrlShortenerShortenError.prototype);
        return _this;
    }
    return UrlShortenerShortenError;
}(errors_1.BaseError));
exports.UrlShortenerShortenError = UrlShortenerShortenError;
//# sourceMappingURL=url-shortener.js.map