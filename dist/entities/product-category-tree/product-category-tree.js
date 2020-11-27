"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var ProductCategoryTree = (function (_super) {
    tslib_1.__extends(ProductCategoryTree, _super);
    function ProductCategoryTree(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/product_category_trees';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    ProductCategoryTree.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.summary = rawPayload.summary;
        this.description = rawPayload.description;
        this.children = rawPayload.children;
        this.comment = rawPayload.comment;
        this.storefront = rawPayload.storefront;
        return this;
    };
    ProductCategoryTree.create = function (payload, universe, http) {
        return new ProductCategoryTree({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    ProductCategoryTree.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            summary: this.summary,
            description: this.description,
            children: this.children,
            comment: this.comment,
            storefront: this.storefront
        };
    };
    ProductCategoryTree.prototype.init = function () {
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
                        throw this.handleError(new ProductCategoryTreeInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return ProductCategoryTree;
}(_base_1.default));
exports.ProductCategoryTree = ProductCategoryTree;
var ProductCategoryTrees = (function () {
    function ProductCategoryTrees() {
    }
    ProductCategoryTrees.endpoint = 'api/v0/product_category_trees';
    return ProductCategoryTrees;
}());
exports.ProductCategoryTrees = ProductCategoryTrees;
var ProductCategoryTreeInitializationError = (function (_super) {
    tslib_1.__extends(ProductCategoryTreeInitializationError, _super);
    function ProductCategoryTreeInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize product category tree.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductCategoryTreeInitializationError';
        Object.setPrototypeOf(_this, ProductCategoryTreeInitializationError.prototype);
        return _this;
    }
    return ProductCategoryTreeInitializationError;
}(errors_1.BaseError));
exports.ProductCategoryTreeInitializationError = ProductCategoryTreeInitializationError;
var ProductCategoryTreeFetchRemoteError = (function (_super) {
    tslib_1.__extends(ProductCategoryTreeFetchRemoteError, _super);
    function ProductCategoryTreeFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get product category tree.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductCategoryTreeFetchRemoteError';
        Object.setPrototypeOf(_this, ProductCategoryTreeFetchRemoteError.prototype);
        return _this;
    }
    return ProductCategoryTreeFetchRemoteError;
}(errors_1.BaseError));
exports.ProductCategoryTreeFetchRemoteError = ProductCategoryTreeFetchRemoteError;
var ProductCategoryTreesFetchRemoteError = (function (_super) {
    tslib_1.__extends(ProductCategoryTreesFetchRemoteError, _super);
    function ProductCategoryTreesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get product category trees.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductCategoryTreesFetchRemoteError';
        Object.setPrototypeOf(_this, ProductCategoryTreesFetchRemoteError.prototype);
        return _this;
    }
    return ProductCategoryTreesFetchRemoteError;
}(errors_1.BaseError));
exports.ProductCategoryTreesFetchRemoteError = ProductCategoryTreesFetchRemoteError;
//# sourceMappingURL=product-category-tree.js.map