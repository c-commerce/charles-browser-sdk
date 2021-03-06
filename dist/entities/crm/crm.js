"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRMSyncOrganizationsRemoteError = exports.CRMSetupRemoteError = exports.CRMSyncChannelUsersRemoteError = exports.CRMSyncPipelinesRemoteError = exports.CRMSyncDealsRemoteError = exports.CRMSyncCustomPropertiesRemoteError = exports.CRMsFetchRemoteError = exports.CRMFetchRemoteError = exports.CRMInitializationError = exports.CRMs = exports.CRM = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var CRM = (function (_super) {
    tslib_1.__extends(CRM, _super);
    function CRM(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
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
    CRM.prototype.syncDeals = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('CRM syncDeals requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/deals",
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
                        throw this.handleError(new CRMSyncDealsRemoteError(undefined, { error: err_3 }));
                    case 4: return [2];
                }
            });
        });
    };
    CRM.prototype.syncChannelUsers = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_4;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('CRM syncChannelUsers requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/channel_users",
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
                        throw this.handleError(new CRMSyncChannelUsersRemoteError(undefined, { error: err_4 }));
                    case 4: return [2];
                }
            });
        });
    };
    CRM.prototype.syncPipelines = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_5;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('CRM syncPipelines requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/pipelines",
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
                        throw this.handleError(new CRMSyncPipelinesRemoteError(undefined, { error: err_5 }));
                    case 4: return [2];
                }
            });
        });
    };
    CRM.prototype.syncOrganizations = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_6;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('CRM syncOrganizations requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/people_organizations",
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
                        err_6 = _b.sent();
                        throw this.handleError(new CRMSyncOrganizationsRemoteError(undefined, { error: err_6 }));
                    case 4: return [2];
                }
            });
        });
    };
    CRM.prototype.setup = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_7;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('CRM setup requires id to be set.');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/setup",
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
                        err_7 = _b.sent();
                        throw this.handleError(new CRMSetupRemoteError(undefined, { error: err_7 }));
                    case 4: return [2];
                }
            });
        });
    };
    return CRM;
}(_base_1.UniverseEntity));
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
var CRMSyncDealsRemoteError = (function (_super) {
    tslib_1.__extends(CRMSyncDealsRemoteError, _super);
    function CRMSyncDealsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not start sync of crm deals.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMSyncDealsRemoteError';
        Object.setPrototypeOf(_this, CRMSyncDealsRemoteError.prototype);
        return _this;
    }
    return CRMSyncDealsRemoteError;
}(errors_1.BaseError));
exports.CRMSyncDealsRemoteError = CRMSyncDealsRemoteError;
var CRMSyncPipelinesRemoteError = (function (_super) {
    tslib_1.__extends(CRMSyncPipelinesRemoteError, _super);
    function CRMSyncPipelinesRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not start sync of crm pipelines.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMSyncPipelinesRemoteError';
        Object.setPrototypeOf(_this, CRMSyncPipelinesRemoteError.prototype);
        return _this;
    }
    return CRMSyncPipelinesRemoteError;
}(errors_1.BaseError));
exports.CRMSyncPipelinesRemoteError = CRMSyncPipelinesRemoteError;
var CRMSyncChannelUsersRemoteError = (function (_super) {
    tslib_1.__extends(CRMSyncChannelUsersRemoteError, _super);
    function CRMSyncChannelUsersRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not start sync of crm chanel users.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMSyncChannelUsersRemoteError';
        Object.setPrototypeOf(_this, CRMSyncChannelUsersRemoteError.prototype);
        return _this;
    }
    return CRMSyncChannelUsersRemoteError;
}(errors_1.BaseError));
exports.CRMSyncChannelUsersRemoteError = CRMSyncChannelUsersRemoteError;
var CRMSetupRemoteError = (function (_super) {
    tslib_1.__extends(CRMSetupRemoteError, _super);
    function CRMSetupRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not start setup of crm.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMSetupRemoteError';
        Object.setPrototypeOf(_this, CRMSetupRemoteError.prototype);
        return _this;
    }
    return CRMSetupRemoteError;
}(errors_1.BaseError));
exports.CRMSetupRemoteError = CRMSetupRemoteError;
var CRMSyncOrganizationsRemoteError = (function (_super) {
    tslib_1.__extends(CRMSyncOrganizationsRemoteError, _super);
    function CRMSyncOrganizationsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not start remote org sync.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CRMSyncOrganizationsRemoteError';
        Object.setPrototypeOf(_this, CRMSyncOrganizationsRemoteError.prototype);
        return _this;
    }
    return CRMSyncOrganizationsRemoteError;
}(errors_1.BaseError));
exports.CRMSyncOrganizationsRemoteError = CRMSyncOrganizationsRemoteError;
//# sourceMappingURL=crm.js.map