"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Nlu = (function (_super) {
    tslib_1.__extends(Nlu, _super);
    function Nlu(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/nlus';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Nlu.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.description = rawPayload.description;
        this.botStaff = rawPayload.bot_staff;
        this.isProxy = rawPayload.is_proxy;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.configuration = rawPayload.configuration;
        this.integrationConfiguration = rawPayload.integration_configuration;
        this.isSetUp = rawPayload.is_set_up;
        this.payload = rawPayload.payload;
        this.metadata = rawPayload.metadata;
        this.links = rawPayload.links;
        return this;
    };
    Nlu.create = function (payload, universe, http) {
        return new Nlu({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Nlu.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            description: this.description,
            bot_staff: this.botStaff,
            is_proxy: this.isProxy,
            proxy_vendor: this.proxyVendor,
            configuration: this.configuration,
            integration_configuration: this.integrationConfiguration,
            is_set_up: this.isSetUp,
            payload: this.payload,
            metadata: this.metadata,
            links: this.links
        };
    };
    Nlu.prototype.init = function () {
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
                        throw this.handleError(new NluInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Nlu.prototype.syncIntents = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'PUT',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/sync/intents",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Content-Length': '0'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 1:
                        res = _b.sent();
                        return [2, res.status];
                    case 2:
                        err_2 = _b.sent();
                        throw this.handleError(new NlusSyncIntentsRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Nlu;
}(_base_1.default));
exports.Nlu = Nlu;
var Nlus = (function () {
    function Nlus() {
    }
    Nlus.endpoint = 'api/v0/nlus';
    return Nlus;
}());
exports.Nlus = Nlus;
var NluInitializationError = (function (_super) {
    tslib_1.__extends(NluInitializationError, _super);
    function NluInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize nlu.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NluInitializationError';
        Object.setPrototypeOf(_this, NluInitializationError.prototype);
        return _this;
    }
    return NluInitializationError;
}(errors_1.BaseError));
exports.NluInitializationError = NluInitializationError;
var NluFetchRemoteError = (function (_super) {
    tslib_1.__extends(NluFetchRemoteError, _super);
    function NluFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get nlu.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NluFetchRemoteError';
        Object.setPrototypeOf(_this, NluFetchRemoteError.prototype);
        return _this;
    }
    return NluFetchRemoteError;
}(errors_1.BaseError));
exports.NluFetchRemoteError = NluFetchRemoteError;
var NlusFetchRemoteError = (function (_super) {
    tslib_1.__extends(NlusFetchRemoteError, _super);
    function NlusFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get nlus.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NlusFetchRemoteError';
        Object.setPrototypeOf(_this, NlusFetchRemoteError.prototype);
        return _this;
    }
    return NlusFetchRemoteError;
}(errors_1.BaseError));
exports.NlusFetchRemoteError = NlusFetchRemoteError;
var NlusSyncIntentsRemoteError = (function (_super) {
    tslib_1.__extends(NlusSyncIntentsRemoteError, _super);
    function NlusSyncIntentsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not sync intents of nlu.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NlusSyncIntentsRemoteError';
        Object.setPrototypeOf(_this, NlusSyncIntentsRemoteError.prototype);
        return _this;
    }
    return NlusSyncIntentsRemoteError;
}(errors_1.BaseError));
exports.NlusSyncIntentsRemoteError = NlusSyncIntentsRemoteError;
//# sourceMappingURL=nlu.js.map