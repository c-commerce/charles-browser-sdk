"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleasesFetchRemoteError = exports.ReleaseFetchRemoteError = exports.ReleaseInitializationError = exports.Releases = exports.Release = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../../../entities/_base"));
var errors_1 = require("../../../errors");
var Release = (function (_super) {
    tslib_1.__extends(Release, _super);
    function Release(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.apiCarrier = options.carrier;
        _this.endpoint = 'api/v0/releases';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Release.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.status = rawPayload.status;
        this.configuration = rawPayload.configuration;
        this.product = rawPayload.product;
        this.productName = rawPayload.product_name;
        this.channel = rawPayload.channel;
        this.defaultDisplayName = rawPayload.default_display_name;
        return this;
    };
    Release.create = function (payload, carrier, http) {
        return new Release({ rawPayload: payload, carrier: carrier, http: http, initialized: true });
    };
    Release.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            status: this.status,
            configuration: this.configuration,
            product: this.product,
            product_name: this.productName,
            channel: this.channel,
            default_display_name: this.defaultDisplayName
        };
    };
    Release.prototype.init = function () {
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
                        throw this.handleError(new ReleaseInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Release;
}(_base_1.default));
exports.Release = Release;
var Releases = (function () {
    function Releases() {
    }
    Releases.endpoint = 'api/v0/releases';
    return Releases;
}());
exports.Releases = Releases;
var ReleaseInitializationError = (function (_super) {
    tslib_1.__extends(ReleaseInitializationError, _super);
    function ReleaseInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize Release.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReleaseInitializationError';
        Object.setPrototypeOf(_this, ReleaseInitializationError.prototype);
        return _this;
    }
    return ReleaseInitializationError;
}(errors_1.BaseError));
exports.ReleaseInitializationError = ReleaseInitializationError;
var ReleaseFetchRemoteError = (function (_super) {
    tslib_1.__extends(ReleaseFetchRemoteError, _super);
    function ReleaseFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get Release.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReleaseFetchRemoteError';
        Object.setPrototypeOf(_this, ReleaseFetchRemoteError.prototype);
        return _this;
    }
    return ReleaseFetchRemoteError;
}(errors_1.BaseError));
exports.ReleaseFetchRemoteError = ReleaseFetchRemoteError;
var ReleasesFetchRemoteError = (function (_super) {
    tslib_1.__extends(ReleasesFetchRemoteError, _super);
    function ReleasesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get releases.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReleasesFetchRemoteError';
        Object.setPrototypeOf(_this, ReleasesFetchRemoteError.prototype);
        return _this;
    }
    return ReleasesFetchRemoteError;
}(errors_1.BaseError));
exports.ReleasesFetchRemoteError = ReleasesFetchRemoteError;
//# sourceMappingURL=releases.js.map