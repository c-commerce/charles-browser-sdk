"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsFetchRemoteError = exports.LocationFetchRemoteError = exports.LocationInitializationError = exports.Locations = exports.Location = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Location = (function (_super) {
    tslib_1.__extends(Location, _super);
    function Location(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/locations';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Location.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.description = rawPayload.description;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.sourceType = rawPayload.source_type;
        this.sourceApi = rawPayload.source_api;
        this.hasInventory = rawPayload.has_inventory;
        this.useInventory = rawPayload.use_inventory;
        this.isDefault = rawPayload.is_default;
        this.canSell = rawPayload.can_sell;
        this.addresses = rawPayload.addresses;
        return this;
    };
    Location.create = function (payload, universe, http) {
        return new Location({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Location.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            description: this.description,
            external_reference_id: this.externalReferenceId,
            proxy_vendor: this.proxyVendor,
            source_type: this.sourceType,
            source_api: this.sourceApi,
            has_inventory: this.hasInventory,
            use_inventory: this.useInventory,
            is_default: this.isDefault,
            can_sell: this.canSell,
            addresses: this.addresses
        };
    };
    Location.prototype.init = function () {
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
                        throw this.handleError(new LocationInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Location;
}(_base_1.default));
exports.Location = Location;
var Locations = (function () {
    function Locations() {
    }
    Locations.endpoint = 'api/v0/locations';
    return Locations;
}());
exports.Locations = Locations;
var LocationInitializationError = (function (_super) {
    tslib_1.__extends(LocationInitializationError, _super);
    function LocationInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize location.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LocationInitializationError';
        Object.setPrototypeOf(_this, LocationInitializationError.prototype);
        return _this;
    }
    return LocationInitializationError;
}(errors_1.BaseError));
exports.LocationInitializationError = LocationInitializationError;
var LocationFetchRemoteError = (function (_super) {
    tslib_1.__extends(LocationFetchRemoteError, _super);
    function LocationFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get location.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LocationFetchRemoteError';
        Object.setPrototypeOf(_this, LocationFetchRemoteError.prototype);
        return _this;
    }
    return LocationFetchRemoteError;
}(errors_1.BaseError));
exports.LocationFetchRemoteError = LocationFetchRemoteError;
var LocationsFetchRemoteError = (function (_super) {
    tslib_1.__extends(LocationsFetchRemoteError, _super);
    function LocationsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get locations.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LocationsFetchRemoteError';
        Object.setPrototypeOf(_this, LocationsFetchRemoteError.prototype);
        return _this;
    }
    return LocationsFetchRemoteError;
}(errors_1.BaseError));
exports.LocationsFetchRemoteError = LocationsFetchRemoteError;
//# sourceMappingURL=location.js.map