"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudHealthzError = exports.CloudSelfError = exports.CloudVersionsError = exports.CloudApiRequestError = exports.CloudInitializationError = exports.CloudSingleton = exports.Cloud = exports.CloudMeError = exports.CloudUnauthenticatedError = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var status_1 = require("./status");
var base_1 = require("../base");
var errors_1 = require("../errors");
var universe = tslib_1.__importStar(require("./entities/universe"));
var universeUser = tslib_1.__importStar(require("./entities/user"));
var organization = tslib_1.__importStar(require("./entities/organization"));
var universesPool = tslib_1.__importStar(require("./entities/universes-pool"));
var universesWaba = tslib_1.__importStar(require("./entities/universes-waba"));
var CloudUnauthenticatedError = (function (_super) {
    tslib_1.__extends(CloudUnauthenticatedError, _super);
    function CloudUnauthenticatedError(message, properties) {
        if (message === void 0) { message = 'Invalid or expired session.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUnauthenticatedError';
        Object.setPrototypeOf(_this, CloudUnauthenticatedError.prototype);
        return _this;
    }
    return CloudUnauthenticatedError;
}(errors_1.BaseError));
exports.CloudUnauthenticatedError = CloudUnauthenticatedError;
var CloudMeError = (function (_super) {
    tslib_1.__extends(CloudMeError, _super);
    function CloudMeError(message, properties) {
        if (message === void 0) { message = 'Unexptected error fetching me data'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudMeError';
        Object.setPrototypeOf(_this, CloudMeError.prototype);
        return _this;
    }
    return CloudMeError;
}(errors_1.BaseError));
exports.CloudMeError = CloudMeError;
var Cloud = (function (_super) {
    tslib_1.__extends(Cloud, _super);
    function Cloud(options) {
        var _a, _b;
        var _this = _super.call(this, {
            injectables: {
                base: (_a = options.cloudBase) !== null && _a !== void 0 ? _a : 'https://staging-3.hello-charles.com'
            }
        }) || this;
        _this.initialized = false;
        _this.mqtt = null;
        _this.options = options;
        _this.user = options.user;
        _this.cloudBase = (_b = options.cloudBase) !== null && _b !== void 0 ? _b : 'https://staging-3.hello-charles.com';
        _this.status = new status_1.CloudStatus({ universe: _this });
        _this.health = new status_1.CloudHealth({ universe: _this });
        _this.http = options.http;
        return _this;
    }
    Cloud.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.setInitialized(null);
                    return [2, this];
                }
                catch (err) {
                    throw new CloudInitializationError(undefined, { error: err });
                }
                return [2];
            });
        });
    };
    Object.defineProperty(Cloud, "errors", {
        get: function () {
            return {
                CloudUnauthenticatedError: CloudUnauthenticatedError,
                CloudMeError: CloudMeError
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cloud.prototype, "errors", {
        get: function () {
            return Cloud.errors;
        },
        enumerable: false,
        configurable: true
    });
    Cloud.prototype.setInitialized = function (payload) {
        this.initialized = true;
        return this;
    };
    Cloud.prototype.deinitialize = function () {
        this.removeAllListeners();
    };
    Object.defineProperty(Cloud.prototype, "ready", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Cloud.prototype.isReady = function () {
        return false;
    };
    Object.defineProperty(Cloud.prototype, "connected", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Cloud.prototype.isConnected = function () {
        return false;
    };
    Cloud.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    Cloud.prototype.baseResourceFactory = function (proto, payload) {
        return proto.create(payload, this, this.http);
    };
    Cloud.prototype.universe = function (payload) {
        return universe.CloudUniverse.create(payload, this, this.http);
    };
    Cloud.prototype.universeUser = function (payload) {
        return universeUser.UniverseUser.create(payload, this, this.http);
    };
    Cloud.prototype.organization = function (payload) {
        return organization.Organization.create(payload, this, this.http);
    };
    Cloud.prototype.universePool = function (payload) {
        return universesPool.UniversesPool.create(payload, this, this.http);
    };
    Cloud.prototype.universesWaba = function (payload) {
        return universesWaba.CloudUniversesWaba.create(payload, this, this.http);
    };
    Cloud.prototype.apiRequest = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        opts = {
                            method: options.method,
                            path: "" + options.path + (options.query ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            data: (_a = options.data) !== null && _a !== void 0 ? _a : undefined
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient()(opts)];
                    case 2:
                        res = _b.sent();
                        return [2, res.data.data];
                    case 3:
                        err_1 = _b.sent();
                        throw new CloudApiRequestError(undefined, { error: err_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Cloud.prototype.setCachedMeData = function (data) {
        if (!data) {
            this._cachedMeData = undefined;
        }
        else {
            this._cachedMeData = Object.assign({}, data);
        }
        return this;
    };
    Object.defineProperty(Cloud.prototype, "authData", {
        get: function () {
            return {
                me: this._cachedMeData
            };
        },
        enumerable: false,
        configurable: true
    });
    Cloud.prototype.me = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.cloudBase + "/api/v0/me"
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        response = _b.sent();
                        this.setCachedMeData(response.data.data);
                        return [2, response.data.data];
                    case 2:
                        err_2 = _b.sent();
                        if (((_a = err_2 === null || err_2 === void 0 ? void 0 : err_2.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                            throw new CloudUnauthenticatedError(undefined, { error: err_2 });
                        }
                        throw new CloudMeError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Cloud.prototype.makeBaseResourceListRequest = function (proto, listProto, errorProto, options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_3;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.cloudBase + "/" + listProto.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return proto.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_3 = _b.sent();
                        throw new errorProto(undefined, { error: err_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Cloud.prototype.universes = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.makeBaseResourceListRequest(universe.CloudUniverse, universe.CloudUniverses, universe.CloudUniversesFetchRemoteError, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Cloud.prototype.universeUsers = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.makeBaseResourceListRequest(universeUser.UniverseUser, universeUser.UniverseUsers, universeUser.UniverseUsersFetchRemoteError, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Cloud.prototype.organizations = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.makeBaseResourceListRequest(organization.Organization, organization.Organizations, organization.OrganizationsFetchRemoteError, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Cloud.prototype.universesPools = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.makeBaseResourceListRequest(universesPool.UniversesPool, universesPool.UniversesPools, universesPool.UniversesPoolsFetchRemoteError, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Cloud.prototype.universesWabas = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.makeBaseResourceListRequest(universesWaba.CloudUniversesWaba, universesWaba.CloudUniversesWabas, universesWaba.CloudUniversesWabasFetchRemoteError, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Cloud.prototype.versions = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_4;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.cloudBase + "/api/versions")];
                    case 1:
                        res = _b.sent();
                        return [2, {
                                multiverse: (_a = res.data) === null || _a === void 0 ? void 0 : _a.multiverse
                            }];
                    case 2:
                        err_4 = _b.sent();
                        throw new CloudVersionsError(undefined, { error: err_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Cloud.prototype.healthz = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_5;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.cloudBase + "/api/healthz")];
                    case 1:
                        res = _b.sent();
                        return [2, {
                                message: (_a = res.data) === null || _a === void 0 ? void 0 : _a.msg
                            }];
                    case 2:
                        err_5 = _b.sent();
                        throw new CloudHealthzError(undefined, { error: err_5 });
                    case 3: return [2];
                }
            });
        });
    };
    Cloud.endpoint = 'api/v0';
    return Cloud;
}(base_1.APICarrier));
exports.Cloud = Cloud;
var CloudSingleton = (function (_super) {
    tslib_1.__extends(CloudSingleton, _super);
    function CloudSingleton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloudSingleton.getInstance = function (options) {
        if (!CloudSingleton.instance) {
            CloudSingleton.instance = new CloudSingleton(options);
        }
        return CloudSingleton.instance;
    };
    CloudSingleton.clearInstance = function () {
        CloudSingleton.instance.deinitialize();
    };
    return CloudSingleton;
}(Cloud));
exports.CloudSingleton = CloudSingleton;
var CloudInitializationError = (function (_super) {
    tslib_1.__extends(CloudInitializationError, _super);
    function CloudInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize cloud.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudInitializationError';
        return _this;
    }
    return CloudInitializationError;
}(errors_1.BaseError));
exports.CloudInitializationError = CloudInitializationError;
var CloudApiRequestError = (function (_super) {
    tslib_1.__extends(CloudApiRequestError, _super);
    function CloudApiRequestError(message, properties) {
        if (message === void 0) { message = 'Unexptected error making api request.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudApiRequestError';
        Object.setPrototypeOf(_this, CloudApiRequestError.prototype);
        return _this;
    }
    return CloudApiRequestError;
}(errors_1.BaseError));
exports.CloudApiRequestError = CloudApiRequestError;
var CloudVersionsError = (function (_super) {
    tslib_1.__extends(CloudVersionsError, _super);
    function CloudVersionsError(message, properties) {
        if (message === void 0) { message = 'Unexptected response making versions request.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudVersionsError';
        Object.setPrototypeOf(_this, CloudVersionsError.prototype);
        return _this;
    }
    return CloudVersionsError;
}(errors_1.BaseError));
exports.CloudVersionsError = CloudVersionsError;
var CloudSelfError = (function (_super) {
    tslib_1.__extends(CloudSelfError, _super);
    function CloudSelfError(message, properties) {
        if (message === void 0) { message = 'Unexptected response making self request.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudSelfError';
        Object.setPrototypeOf(_this, CloudSelfError.prototype);
        return _this;
    }
    return CloudSelfError;
}(errors_1.BaseError));
exports.CloudSelfError = CloudSelfError;
var CloudHealthzError = (function (_super) {
    tslib_1.__extends(CloudHealthzError, _super);
    function CloudHealthzError(message, properties) {
        if (message === void 0) { message = 'Unexptected response making health request.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudHealthzError';
        Object.setPrototypeOf(_this, CloudHealthzError.prototype);
        return _this;
    }
    return CloudHealthzError;
}(errors_1.BaseError));
exports.CloudHealthzError = CloudHealthzError;
//# sourceMappingURL=index.js.map