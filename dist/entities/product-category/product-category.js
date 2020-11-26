"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var ProductCategory = (function (_super) {
    tslib_1.__extends(ProductCategory, _super);
    function ProductCategory(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/product_categories';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    ProductCategory.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.isProxy = rawPayload.is_proxy;
        this.name = rawPayload.name;
        this.summary = rawPayload.summary;
        this.customId = rawPayload.custom_id;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.externalReferenceCustomId = rawPayload.external_reference_custom_id;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.description = rawPayload.description;
        this.comment = rawPayload.comment;
        this.proxyPayload = rawPayload.proxy_payload;
        return this;
    };
    ProductCategory.create = function (payload, universe, http) {
        return new ProductCategory({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    ProductCategory.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            is_proxy: this.isProxy,
            name: this.name,
            summary: this.summary,
            custom_id: this.customId,
            external_reference_id: this.externalReferenceId,
            external_reference_custom_id: this.externalReferenceCustomId,
            proxy_vendor: this.proxyVendor,
            description: this.description,
            comment: this.comment,
            proxy_payload: this.proxyPayload
        };
    };
    ProductCategory.prototype.init = function () {
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
                        throw this.handleError(new ProductCategoryInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return ProductCategory;
}(_base_1.default));
exports.ProductCategory = ProductCategory;
var ProductCategories = (function () {
    function ProductCategories() {
    }
    ProductCategories.endpoint = 'api/v0/product_categories';
    return ProductCategories;
}());
exports.ProductCategories = ProductCategories;
var ProductCategoryInitializationError = (function (_super) {
    tslib_1.__extends(ProductCategoryInitializationError, _super);
    function ProductCategoryInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize product category.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductCategoryInitializationError';
        Object.setPrototypeOf(_this, ProductCategoryInitializationError.prototype);
        return _this;
    }
    return ProductCategoryInitializationError;
}(errors_1.BaseError));
exports.ProductCategoryInitializationError = ProductCategoryInitializationError;
var ProductCategoryFetchRemoteError = (function (_super) {
    tslib_1.__extends(ProductCategoryFetchRemoteError, _super);
    function ProductCategoryFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get product category.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductCategoryFetchRemoteError';
        Object.setPrototypeOf(_this, ProductCategoryFetchRemoteError.prototype);
        return _this;
    }
    return ProductCategoryFetchRemoteError;
}(errors_1.BaseError));
exports.ProductCategoryFetchRemoteError = ProductCategoryFetchRemoteError;
var ProductCategoriesFetchRemoteError = (function (_super) {
    tslib_1.__extends(ProductCategoriesFetchRemoteError, _super);
    function ProductCategoriesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get product categories.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductCategoriesFetchRemoteError';
        Object.setPrototypeOf(_this, ProductCategoriesFetchRemoteError.prototype);
        return _this;
    }
    return ProductCategoriesFetchRemoteError;
}(errors_1.BaseError));
exports.ProductCategoriesFetchRemoteError = ProductCategoriesFetchRemoteError;
//# sourceMappingURL=product-category.js.map