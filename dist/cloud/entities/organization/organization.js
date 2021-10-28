"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsFetchRemoteError = exports.OrganizationFetchRemoteError = exports.OrganizationInitializationError = exports.Organizations = exports.Organization = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../../../entities/_base"));
var errors_1 = require("../../../errors");
var Organization = (function (_super) {
    tslib_1.__extends(Organization, _super);
    function Organization(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.apiCarrier = options.carrier;
        _this.endpoint = 'api/v0/organizations';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Organization.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.status = rawPayload.status;
        this.verified = rawPayload.verified;
        this.owner = rawPayload.owner;
        return this;
    };
    Organization.create = function (payload, carrier, http) {
        return new Organization({ rawPayload: payload, carrier: carrier, http: http, initialized: true });
    };
    Organization.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            status: this.status,
            verified: this.verified,
            owner: this.owner
        };
    };
    Organization.prototype.init = function () {
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
                        throw this.handleError(new OrganizationInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Organization;
}(_base_1.default));
exports.Organization = Organization;
var Organizations = (function () {
    function Organizations() {
    }
    Organizations.endpoint = 'api/v0/organizations';
    return Organizations;
}());
exports.Organizations = Organizations;
var OrganizationInitializationError = (function (_super) {
    tslib_1.__extends(OrganizationInitializationError, _super);
    function OrganizationInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize organization.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrganizationInitializationError';
        Object.setPrototypeOf(_this, OrganizationInitializationError.prototype);
        return _this;
    }
    return OrganizationInitializationError;
}(errors_1.BaseError));
exports.OrganizationInitializationError = OrganizationInitializationError;
var OrganizationFetchRemoteError = (function (_super) {
    tslib_1.__extends(OrganizationFetchRemoteError, _super);
    function OrganizationFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get organization.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrganizationFetchRemoteError';
        Object.setPrototypeOf(_this, OrganizationFetchRemoteError.prototype);
        return _this;
    }
    return OrganizationFetchRemoteError;
}(errors_1.BaseError));
exports.OrganizationFetchRemoteError = OrganizationFetchRemoteError;
var OrganizationsFetchRemoteError = (function (_super) {
    tslib_1.__extends(OrganizationsFetchRemoteError, _super);
    function OrganizationsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get organizations.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrganizationsFetchRemoteError';
        Object.setPrototypeOf(_this, OrganizationsFetchRemoteError.prototype);
        return _this;
    }
    return OrganizationsFetchRemoteError;
}(errors_1.BaseError));
exports.OrganizationsFetchRemoteError = OrganizationsFetchRemoteError;
//# sourceMappingURL=organization.js.map