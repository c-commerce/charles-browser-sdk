"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationsFetchRemoteError = exports.ConfigurationFetchRemoteError = exports.ConfigurationInitializationError = exports.Configurations = exports.Configuration = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var Configuration = (function (_super) {
    tslib_1.__extends(Configuration, _super);
    function Configuration(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/configurations';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Configuration.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.owner = rawPayload.owner;
        this.configuration = rawPayload.configuration;
        this.ui = rawPayload.ui;
        this.dashboard = rawPayload.dashboard;
        return this;
    };
    Configuration.create = function (payload, universe, http) {
        return new Configuration({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Configuration.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            owner: this.owner,
            configuration: this.configuration,
            ui: this.ui,
            dashboard: this.dashboard
        };
    };
    Configuration.prototype.init = function () {
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
                        throw this.handleError(new ConfigurationInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Configuration;
}(_base_1.UniverseEntity));
exports.Configuration = Configuration;
var Configurations = (function () {
    function Configurations() {
    }
    Configurations.endpoint = 'api/v0/configurations';
    return Configurations;
}());
exports.Configurations = Configurations;
var ConfigurationInitializationError = (function (_super) {
    tslib_1.__extends(ConfigurationInitializationError, _super);
    function ConfigurationInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize configuration.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationInitializationError';
        Object.setPrototypeOf(_this, ConfigurationInitializationError.prototype);
        return _this;
    }
    return ConfigurationInitializationError;
}(errors_1.BaseError));
exports.ConfigurationInitializationError = ConfigurationInitializationError;
var ConfigurationFetchRemoteError = (function (_super) {
    tslib_1.__extends(ConfigurationFetchRemoteError, _super);
    function ConfigurationFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get configuration.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationFetchRemoteError';
        Object.setPrototypeOf(_this, ConfigurationFetchRemoteError.prototype);
        return _this;
    }
    return ConfigurationFetchRemoteError;
}(errors_1.BaseError));
exports.ConfigurationFetchRemoteError = ConfigurationFetchRemoteError;
var ConfigurationsFetchRemoteError = (function (_super) {
    tslib_1.__extends(ConfigurationsFetchRemoteError, _super);
    function ConfigurationsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get configurations.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationsFetchRemoteError';
        Object.setPrototypeOf(_this, ConfigurationsFetchRemoteError.prototype);
        return _this;
    }
    return ConfigurationsFetchRemoteError;
}(errors_1.BaseError));
exports.ConfigurationsFetchRemoteError = ConfigurationsFetchRemoteError;
//# sourceMappingURL=configuration.js.map