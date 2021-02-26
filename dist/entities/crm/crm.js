"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRMSyncCustomPropertiesRemoteError = exports.CRMsFetchRemoteError = exports.CRMFetchRemoteError = exports.CRMInitializationError = exports.CRMs = exports.CRM = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var CRM = (function (_super) {
    tslib_1.__extends(CRM, _super);
    function CRM(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/crms';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    CRM.prototype.deserialize = function (rawPayload) {
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
        this.labels = rawPayload.labels;
        return this;
    };
    CRM.create = function (payload, universe, http) {
        return new CRM({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    CRM.prototype.serialize = function () {
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
            metadata: this.metadata,
            labels: this.labels
        };
    };
    CRM.prototype.init = function () {
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
                        throw this.handleError(new CRMInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    CRM.prototype.syncCustomProperties = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('CRM syncCustomProperties requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/custom_properties",
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
                        err_2 = _b.sent();
                        throw this.handleError(new CRMSyncCustomPropertiesRemoteError(undefined, { error: err_2 }));
                    case 4: return [2];
                }
            });
        });
    };
    return CRM;
}(_base_1.default));
exports.CRM = CRM;
var CRMs = (function () {
    function CRMs() {
    }
    CRMs.endpoint = 'api/v0/crms';
    return CRMs;
}());
exports.CRMs = CRMs;
var CRMInitializationError = (function (_super) {
    tslib_1.__extends(CRMInitializationError, _super);
    function CRMInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize crm.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMInitializationError';
        Object.setPrototypeOf(_this, CRMInitializationError.prototype);
        return _this;
    }
    return CRMInitializationError;
}(errors_1.BaseError));
exports.CRMInitializationError = CRMInitializationError;
var CRMFetchRemoteError = (function (_super) {
    tslib_1.__extends(CRMFetchRemoteError, _super);
    function CRMFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get crm.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMFetchRemoteError';
        Object.setPrototypeOf(_this, CRMFetchRemoteError.prototype);
        return _this;
    }
    return CRMFetchRemoteError;
}(errors_1.BaseError));
exports.CRMFetchRemoteError = CRMFetchRemoteError;
var CRMsFetchRemoteError = (function (_super) {
    tslib_1.__extends(CRMsFetchRemoteError, _super);
    function CRMsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get crms.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMsFetchRemoteError';
        Object.setPrototypeOf(_this, CRMsFetchRemoteError.prototype);
        return _this;
    }
    return CRMsFetchRemoteError;
}(errors_1.BaseError));
exports.CRMsFetchRemoteError = CRMsFetchRemoteError;
var CRMSyncCustomPropertiesRemoteError = (function (_super) {
    tslib_1.__extends(CRMSyncCustomPropertiesRemoteError, _super);
    function CRMSyncCustomPropertiesRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not start sync of crms\' custom properties.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMSyncCustomPropertiesRemoteError';
        Object.setPrototypeOf(_this, CRMSyncCustomPropertiesRemoteError.prototype);
        return _this;
    }
    return CRMSyncCustomPropertiesRemoteError;
}(errors_1.BaseError));
exports.CRMSyncCustomPropertiesRemoteError = CRMSyncCustomPropertiesRemoteError;
//# sourceMappingURL=crm.js.map