"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Integration = (function (_super) {
    tslib_1.__extends(Integration, _super);
    function Integration(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/integrations';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Integration.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.vendor = rawPayload.vendor;
        this.type = rawPayload.type;
        this.payload = rawPayload.payload;
        return this;
    };
    Integration.create = function (payload, universe, http) {
        return new Integration({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Integration.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            vendor: this.vendor,
            type: this.type,
            payload: this.payload
        };
    };
    Integration.prototype.init = function () {
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
                        throw this.handleError(new IntegrationInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Integration;
}(_base_1.default));
exports.Integration = Integration;
var Integrations = (function () {
    function Integrations() {
    }
    Integrations.endpoint = 'api/v0/integrations';
    return Integrations;
}());
exports.Integrations = Integrations;
var IntegrationInitializationError = (function (_super) {
    tslib_1.__extends(IntegrationInitializationError, _super);
    function IntegrationInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize integration.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationInitializationError';
        Object.setPrototypeOf(_this, IntegrationInitializationError.prototype);
        return _this;
    }
    return IntegrationInitializationError;
}(errors_1.BaseError));
exports.IntegrationInitializationError = IntegrationInitializationError;
var IntegrationFetchRemoteError = (function (_super) {
    tslib_1.__extends(IntegrationFetchRemoteError, _super);
    function IntegrationFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get integration.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationFetchRemoteError';
        Object.setPrototypeOf(_this, IntegrationFetchRemoteError.prototype);
        return _this;
    }
    return IntegrationFetchRemoteError;
}(errors_1.BaseError));
exports.IntegrationFetchRemoteError = IntegrationFetchRemoteError;
var IntegrationsFetchRemoteError = (function (_super) {
    tslib_1.__extends(IntegrationsFetchRemoteError, _super);
    function IntegrationsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get integrations.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationsFetchRemoteError';
        Object.setPrototypeOf(_this, IntegrationsFetchRemoteError.prototype);
        return _this;
    }
    return IntegrationsFetchRemoteError;
}(errors_1.BaseError));
exports.IntegrationsFetchRemoteError = IntegrationsFetchRemoteError;
var AvailableIntegrationsFetchRemoteError = (function (_super) {
    tslib_1.__extends(AvailableIntegrationsFetchRemoteError, _super);
    function AvailableIntegrationsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get available integrations.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AvailableIntegrationsFetchRemoteError';
        Object.setPrototypeOf(_this, AvailableIntegrationsFetchRemoteError.prototype);
        return _this;
    }
    return AvailableIntegrationsFetchRemoteError;
}(errors_1.BaseError));
exports.AvailableIntegrationsFetchRemoteError = AvailableIntegrationsFetchRemoteError;
var IntegrationsSetupRemoteError = (function (_super) {
    tslib_1.__extends(IntegrationsSetupRemoteError, _super);
    function IntegrationsSetupRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not setup vendor integration.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationsSetupRemoteError';
        Object.setPrototypeOf(_this, IntegrationsSetupRemoteError.prototype);
        return _this;
    }
    return IntegrationsSetupRemoteError;
}(errors_1.BaseError));
exports.IntegrationsSetupRemoteError = IntegrationsSetupRemoteError;
//# sourceMappingURL=integration.js.map