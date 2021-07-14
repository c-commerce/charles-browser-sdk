"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUniversesWabasPhonenumbersFetchRemoteError = exports.CloudUniversesWabasPhonenumberFetchRemoteError = exports.CloudUniversesWabasPhonenumberInitializationError = exports.CloudUniversesWabasPhonenumbers = exports.CloudUniversesWabasPhonenumber = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../../../entities/_base"));
var errors_1 = require("../../../errors");
var CloudUniversesWabasPhonenumber = (function (_super) {
    tslib_1.__extends(CloudUniversesWabasPhonenumber, _super);
    function CloudUniversesWabasPhonenumber(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.apiCarrier = options.carrier;
        _this.endpoint = 'api/v0/universes_wabas_phonenumbers';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    CloudUniversesWabasPhonenumber.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.phonenumber = rawPayload.phonenumber;
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
    CloudUniversesWabasPhonenumber.create = function (payload, carrier, http) {
        return new CloudUniversesWabasPhonenumber({ rawPayload: payload, carrier: carrier, http: http, initialized: true });
    };
    CloudUniversesWabasPhonenumber.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            phonenumber: this.phonenumber,
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
    CloudUniversesWabasPhonenumber.prototype.init = function () {
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
                        throw this.handleError(new CloudUniversesWabasPhonenumberInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return CloudUniversesWabasPhonenumber;
}(_base_1.default));
exports.CloudUniversesWabasPhonenumber = CloudUniversesWabasPhonenumber;
var CloudUniversesWabasPhonenumbers = (function () {
    function CloudUniversesWabasPhonenumbers() {
    }
    CloudUniversesWabasPhonenumbers.endpoint = 'api/v0/universes_wabas_phonenumbers';
    return CloudUniversesWabasPhonenumbers;
}());
exports.CloudUniversesWabasPhonenumbers = CloudUniversesWabasPhonenumbers;
var CloudUniversesWabasPhonenumberInitializationError = (function (_super) {
    tslib_1.__extends(CloudUniversesWabasPhonenumberInitializationError, _super);
    function CloudUniversesWabasPhonenumberInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize CloudUniverseWabasPhonenumber.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniversesWabasPhonenumberInitializationError';
        return _this;
    }
    return CloudUniversesWabasPhonenumberInitializationError;
}(errors_1.BaseError));
exports.CloudUniversesWabasPhonenumberInitializationError = CloudUniversesWabasPhonenumberInitializationError;
var CloudUniversesWabasPhonenumberFetchRemoteError = (function (_super) {
    tslib_1.__extends(CloudUniversesWabasPhonenumberFetchRemoteError, _super);
    function CloudUniversesWabasPhonenumberFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get CloudUniversesWabasPhonenumber.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniversesWabasPhonenumberFetchRemoteError';
        return _this;
    }
    return CloudUniversesWabasPhonenumberFetchRemoteError;
}(errors_1.BaseError));
exports.CloudUniversesWabasPhonenumberFetchRemoteError = CloudUniversesWabasPhonenumberFetchRemoteError;
var CloudUniversesWabasPhonenumbersFetchRemoteError = (function (_super) {
    tslib_1.__extends(CloudUniversesWabasPhonenumbersFetchRemoteError, _super);
    function CloudUniversesWabasPhonenumbersFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get CloudUniversesWabasPhonenumbers.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CloudUniversesWabasPhonenumbersFetchRemoteError';
        return _this;
    }
    return CloudUniversesWabasPhonenumbersFetchRemoteError;
}(errors_1.BaseError));
exports.CloudUniversesWabasPhonenumbersFetchRemoteError = CloudUniversesWabasPhonenumbersFetchRemoteError;
//# sourceMappingURL=universes-wabas-phonenumber.js.map