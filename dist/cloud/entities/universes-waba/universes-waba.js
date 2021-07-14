"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUniversesWabasFetchRemoteError = exports.CloudUniversesWabaFetchRemoteError = exports.CloudUniversesWabaInitializationError = exports.CloudUniversesWabas = exports.CloudUniversesWaba = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../../../entities/_base"));
var errors_1 = require("../../../errors");
var CloudUniversesWaba = (function (_super) {
    tslib_1.__extends(CloudUniversesWaba, _super);
    function CloudUniversesWaba(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.apiCarrier = options.carrier;
        _this.endpoint = 'api/v0/universes_wabas';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    CloudUniversesWaba.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.organization = rawPayload.organization;
        this.universe = rawPayload.universe;
        this.billable = rawPayload.billable;
        this.approved = rawPayload.approved;
        this.externalName = rawPayload.external_name;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.vendor = rawPayload.vendor;
        this.status = rawPayload.status;
        this.product = rawPayload.product;
        this.payload = rawPayload.payload;
        return this;
    };
    CloudUniversesWaba.create = function (payload, carrier, http) {
        return new CloudUniversesWaba({ rawPayload: payload, carrier: carrier, http: http, initialized: true });
    };
    CloudUniversesWaba.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            organization: this.organization,
            universe: this.universe,
            billable: this.billable,
            approved: this.approved,
            external_name: this.externalName,
            external_reference_id: this.externalReferenceId,
            vendor: this.vendor,
            status: this.status,
            product: this.product,
            payload: this.payload
        };
    };
    CloudUniversesWaba.prototype.init = function () {
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
                        throw this.handleError(new CloudUniversesWabaInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return CloudUniversesWaba;
}(_base_1.default));
exports.CloudUniversesWaba = CloudUniversesWaba;
var CloudUniversesWabas = (function () {
    function CloudUniversesWabas() {
    }
    CloudUniversesWabas.endpoint = 'api/v0/universes_wabas';
    return CloudUniversesWabas;
}());
exports.CloudUniversesWabas = CloudUniversesWabas;
var CloudUniversesWabaInitializationError = (function (_super) {
    tslib_1.__extends(CloudUniversesWabaInitializationError, _super);
    function CloudUniversesWabaInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize CloudUniverseWaba.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniversesWabaInitializationError';
        return _this;
    }
    return CloudUniversesWabaInitializationError;
}(errors_1.BaseError));
exports.CloudUniversesWabaInitializationError = CloudUniversesWabaInitializationError;
var CloudUniversesWabaFetchRemoteError = (function (_super) {
    tslib_1.__extends(CloudUniversesWabaFetchRemoteError, _super);
    function CloudUniversesWabaFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get CloudUniversesWaba.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniversesWabaFetchRemoteError';
        return _this;
    }
    return CloudUniversesWabaFetchRemoteError;
}(errors_1.BaseError));
exports.CloudUniversesWabaFetchRemoteError = CloudUniversesWabaFetchRemoteError;
var CloudUniversesWabasFetchRemoteError = (function (_super) {
    tslib_1.__extends(CloudUniversesWabasFetchRemoteError, _super);
    function CloudUniversesWabasFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get CloudUniversesWabas.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniversesWabasFetchRemoteError';
        return _this;
    }
    return CloudUniversesWabasFetchRemoteError;
}(errors_1.BaseError));
exports.CloudUniversesWabasFetchRemoteError = CloudUniversesWabasFetchRemoteError;
//# sourceMappingURL=universes-waba.js.map