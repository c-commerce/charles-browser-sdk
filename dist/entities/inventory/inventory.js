"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Inventory = (function (_super) {
    tslib_1.__extends(Inventory, _super);
    function Inventory(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/inventories';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Inventory.prototype.deserialize = function (rawPayload) {
        var _a;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.product = rawPayload.product;
        this.location = rawPayload.location;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.sourceApi = rawPayload.source_api;
        this.sourceType = rawPayload.source_type;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.isProxy = rawPayload.is_proxy;
        this.qty = rawPayload.qty;
        return this;
    };
    Inventory.create = function (payload, universe, http) {
        return new Inventory({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Inventory.prototype.serialize = function () {
        var _a;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            product: this.product,
            location: this.location,
            external_reference_id: this.externalReferenceId,
            source_api: this.sourceApi,
            source_type: this.sourceType,
            proxy_vendor: this.proxyVendor,
            is_proxy: this.isProxy,
            qty: this.qty
        };
    };
    Inventory.prototype.init = function () {
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
                        throw this.handleError(new InventoryInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Inventory;
}(_base_1.default));
exports.Inventory = Inventory;
var Inventories = (function () {
    function Inventories() {
    }
    Inventories.endpoint = 'api/v0/inventories';
    return Inventories;
}());
exports.Inventories = Inventories;
var InventoryInitializationError = (function (_super) {
    tslib_1.__extends(InventoryInitializationError, _super);
    function InventoryInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize inventory.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InventoryInitializationError';
        Object.setPrototypeOf(_this, InventoryInitializationError.prototype);
        return _this;
    }
    return InventoryInitializationError;
}(errors_1.BaseError));
exports.InventoryInitializationError = InventoryInitializationError;
var InventoryFetchRemoteError = (function (_super) {
    tslib_1.__extends(InventoryFetchRemoteError, _super);
    function InventoryFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get inventory.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InventoryFetchRemoteError';
        Object.setPrototypeOf(_this, InventoryFetchRemoteError.prototype);
        return _this;
    }
    return InventoryFetchRemoteError;
}(errors_1.BaseError));
exports.InventoryFetchRemoteError = InventoryFetchRemoteError;
var InventoriesFetchRemoteError = (function (_super) {
    tslib_1.__extends(InventoriesFetchRemoteError, _super);
    function InventoriesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get inventories.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InventoriesFetchRemoteError';
        Object.setPrototypeOf(_this, InventoriesFetchRemoteError.prototype);
        return _this;
    }
    return InventoriesFetchRemoteError;
}(errors_1.BaseError));
exports.InventoriesFetchRemoteError = InventoriesFetchRemoteError;
//# sourceMappingURL=inventory.js.map