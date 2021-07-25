"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsFetchRemoteError = exports.ProductFetchRemoteError = exports.ProductInitializationError = exports.Products = exports.Product = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../../../entities/_base"));
var errors_1 = require("../../../errors");
var Product = (function (_super) {
    tslib_1.__extends(Product, _super);
    function Product(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.apiCarrier = options.carrier;
        _this.endpoint = 'api/v0/products';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Product.prototype.deserialize = function (rawPayload) {
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
        this.channel = rawPayload.channel;
        this.defaultDisplayName = rawPayload.default_display_name;
        return this;
    };
    Product.create = function (payload, carrier, http) {
        return new Product({ rawPayload: payload, carrier: carrier, http: http, initialized: true });
    };
    Product.prototype.serialize = function () {
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
            channel: this.channel,
            default_display_name: this.defaultDisplayName
        };
    };
    Product.prototype.init = function () {
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
                        throw this.handleError(new ProductInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Product;
}(_base_1.default));
exports.Product = Product;
var Products = (function () {
    function Products() {
    }
    Products.endpoint = 'api/v0/products';
    return Products;
}());
exports.Products = Products;
var ProductInitializationError = (function (_super) {
    tslib_1.__extends(ProductInitializationError, _super);
    function ProductInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize Product.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductInitializationError';
        Object.setPrototypeOf(_this, ProductInitializationError.prototype);
        return _this;
    }
    return ProductInitializationError;
}(errors_1.BaseError));
exports.ProductInitializationError = ProductInitializationError;
var ProductFetchRemoteError = (function (_super) {
    tslib_1.__extends(ProductFetchRemoteError, _super);
    function ProductFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get Product.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductFetchRemoteError';
        Object.setPrototypeOf(_this, ProductFetchRemoteError.prototype);
        return _this;
    }
    return ProductFetchRemoteError;
}(errors_1.BaseError));
exports.ProductFetchRemoteError = ProductFetchRemoteError;
var ProductsFetchRemoteError = (function (_super) {
    tslib_1.__extends(ProductsFetchRemoteError, _super);
    function ProductsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get products.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsFetchRemoteError';
        Object.setPrototypeOf(_this, ProductsFetchRemoteError.prototype);
        return _this;
    }
    return ProductsFetchRemoteError;
}(errors_1.BaseError));
exports.ProductsFetchRemoteError = ProductsFetchRemoteError;
//# sourceMappingURL=products.js.map