"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUniversesFetchRemoteError = exports.CloudUniverseFetchRemoteError = exports.CloudUniverseInitializationError = exports.CloudUniverses = exports.CloudUniverse = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../../../entities/_base"));
var errors_1 = require("../../../errors");
var CloudUniverse = (function (_super) {
    tslib_1.__extends(CloudUniverse, _super);
    function CloudUniverse(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.apiCarrier = options.carrier;
        _this.endpoint = 'api/v0/universes';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    CloudUniverse.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        return this;
    };
    CloudUniverse.create = function (payload, carrier, http) {
        return new CloudUniverse({ rawPayload: payload, carrier: carrier, http: http, initialized: true });
    };
    CloudUniverse.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name
        };
    };
    CloudUniverse.prototype.init = function () {
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
                        throw this.handleError(new CloudUniverseInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return CloudUniverse;
}(_base_1.default));
exports.CloudUniverse = CloudUniverse;
var CloudUniverses = (function () {
    function CloudUniverses() {
    }
    CloudUniverses.endpoint = 'api/v0/universes';
    return CloudUniverses;
}());
exports.CloudUniverses = CloudUniverses;
var CloudUniverseInitializationError = (function (_super) {
    tslib_1.__extends(CloudUniverseInitializationError, _super);
    function CloudUniverseInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize CloudUniverse.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniverseInitializationError';
        return _this;
    }
    return CloudUniverseInitializationError;
}(errors_1.BaseError));
exports.CloudUniverseInitializationError = CloudUniverseInitializationError;
var CloudUniverseFetchRemoteError = (function (_super) {
    tslib_1.__extends(CloudUniverseFetchRemoteError, _super);
    function CloudUniverseFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get CloudUniverse.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniverseFetchRemoteError';
        return _this;
    }
    return CloudUniverseFetchRemoteError;
}(errors_1.BaseError));
exports.CloudUniverseFetchRemoteError = CloudUniverseFetchRemoteError;
var CloudUniversesFetchRemoteError = (function (_super) {
    tslib_1.__extends(CloudUniversesFetchRemoteError, _super);
    function CloudUniversesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get CloudUniverses.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniversesFetchRemoteError';
        return _this;
    }
    return CloudUniversesFetchRemoteError;
}(errors_1.BaseError));
exports.CloudUniversesFetchRemoteError = CloudUniversesFetchRemoteError;
//# sourceMappingURL=universe.js.map