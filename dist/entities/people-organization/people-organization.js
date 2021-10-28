"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleOrganizationsFetchRemoteError = exports.PeopleOrganizationFetchRemoteError = exports.PeopleOrganizationInitializationError = exports.PeopleOrganizations = exports.PeopleOrganization = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var PeopleOrganization = (function (_super) {
    tslib_1.__extends(PeopleOrganization, _super);
    function PeopleOrganization(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/people_organizations';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    PeopleOrganization.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.customProperties = rawPayload.custom_properties;
        this.address = rawPayload.address;
        this.isProxy = rawPayload.is_proxy;
        this.proxyPayload = rawPayload.proxy_payload;
        return this;
    };
    PeopleOrganization.create = function (payload, universe, http) {
        return new PeopleOrganization({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    PeopleOrganization.createUninitialized = function (payload, universe, http) {
        return new PeopleOrganization({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    PeopleOrganization.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            custom_properties: this.customProperties,
            address: this.address,
            is_proxy: this.isProxy,
            proxy_payload: this.proxyPayload
        };
    };
    PeopleOrganization.prototype.init = function () {
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
                        throw this.handleError(new PeopleOrganizationInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return PeopleOrganization;
}(_base_1.UniverseEntity));
exports.PeopleOrganization = PeopleOrganization;
var PeopleOrganizations = (function () {
    function PeopleOrganizations() {
    }
    PeopleOrganizations.endpoint = 'api/v0/people_organizations';
    return PeopleOrganizations;
}());
exports.PeopleOrganizations = PeopleOrganizations;
var PeopleOrganizationInitializationError = (function (_super) {
    tslib_1.__extends(PeopleOrganizationInitializationError, _super);
    function PeopleOrganizationInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize people_organization.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PeopleOrganizationInitializationError';
        Object.setPrototypeOf(_this, PeopleOrganizationInitializationError.prototype);
        return _this;
    }
    return PeopleOrganizationInitializationError;
}(errors_1.BaseError));
exports.PeopleOrganizationInitializationError = PeopleOrganizationInitializationError;
var PeopleOrganizationFetchRemoteError = (function (_super) {
    tslib_1.__extends(PeopleOrganizationFetchRemoteError, _super);
    function PeopleOrganizationFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get people_organization.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PeopleOrganizationFetchRemoteError';
        Object.setPrototypeOf(_this, PeopleOrganizationFetchRemoteError.prototype);
        return _this;
    }
    return PeopleOrganizationFetchRemoteError;
}(errors_1.BaseError));
exports.PeopleOrganizationFetchRemoteError = PeopleOrganizationFetchRemoteError;
var PeopleOrganizationsFetchRemoteError = (function (_super) {
    tslib_1.__extends(PeopleOrganizationsFetchRemoteError, _super);
    function PeopleOrganizationsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get people_organizations.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PeopleOrganizationsFetchRemoteError';
        Object.setPrototypeOf(_this, PeopleOrganizationsFetchRemoteError.prototype);
        return _this;
    }
    return PeopleOrganizationsFetchRemoteError;
}(errors_1.BaseError));
exports.PeopleOrganizationsFetchRemoteError = PeopleOrganizationsFetchRemoteError;
//# sourceMappingURL=people-organization.js.map