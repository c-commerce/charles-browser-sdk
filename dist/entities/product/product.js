"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInventoryError = exports.ProductsFetchCountRemoteError = exports.ProductsFetchRemoteError = exports.ProductFetchRemoteError = exports.ProductInitializationError = exports.Products = exports.Product = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var inventory_1 = require("../inventory");
var errors_1 = require("../../errors");
var Product = (function (_super) {
    tslib_1.__extends(Product, _super);
    function Product(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.customId = rawPayload.custom_id;
        this.name = rawPayload.name;
        this.summary = rawPayload.summary;
        this.description = rawPayload.description;
        this.brand = rawPayload.brand;
        this.assets = rawPayload.assets;
        this.assetsConfig = rawPayload.assets_config;
        this.condition = rawPayload.condition;
        this.manufacturers = rawPayload.manufacturers;
        this.suppliers = rawPayload.suppliers;
        this.producedAt = rawPayload.produced_at ? new Date(rawPayload.produced_at) : undefined;
        this.purchasedAt = rawPayload.purchased_at ? new Date(rawPayload.purchased_at) : undefined;
        this.releasedAt = rawPayload.released_at ? new Date(rawPayload.released_at) : undefined;
        this.similarTo = rawPayload.similar_to;
        this.relatedTo = rawPayload.related_to;
        this.audiences = rawPayload.audiences;
        this.keywords = rawPayload.keywords;
        this.categories = rawPayload.categories;
        this.isProxy = (_c = rawPayload.is_proxy) !== null && _c !== void 0 ? _c : false;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.type = rawPayload.type;
        this.attributes = rawPayload.attributes;
        this.sku = rawPayload.sku;
        this.stockMinimum = rawPayload.stock_minimum;
        this.stockMaximum = rawPayload.stock_maximum;
        this.stockable = (_d = rawPayload.stockable) !== null && _d !== void 0 ? _d : true;
        this.parent = rawPayload.parent;
        this.seasons = rawPayload.seasons;
        this.tags = rawPayload.tags;
        this.codes = rawPayload.codes;
        this.i18n = rawPayload.i18n;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.externalReferenceCustomId = rawPayload.external_reference_custom_id;
        this.clientId = rawPayload.client_id;
        this.discountable = (_e = rawPayload.discountable) !== null && _e !== void 0 ? _e : false;
        this.linkable = (_f = rawPayload.linkable) !== null && _f !== void 0 ? _f : false;
        this.isService = (_g = rawPayload.is_service) !== null && _g !== void 0 ? _g : false;
        this.warrantyNotice = rawPayload.warranty_notice;
        this.refundPolicy = rawPayload.refund_policy;
        this.disclaimer = rawPayload.disclaimer;
        this.offlineAvailable = (_h = rawPayload.offline_available) !== null && _h !== void 0 ? _h : false;
        this.onlineAvailable = (_j = rawPayload.online_available) !== null && _j !== void 0 ? _j : true;
        this.shippingFequired = (_k = rawPayload.shipping_required) !== null && _k !== void 0 ? _k : true;
        this.proxyConfiguration = rawPayload.proxy_configuration;
        this.inventoryExternalReferenceId = rawPayload.inventory_external_reference_id;
        this.links = rawPayload.links;
        this.metadata = rawPayload.metadata;
        this.prices = rawPayload.prices;
        this.children = rawPayload.children;
        this.attributesOptions = rawPayload.options;
        return this;
    };
    Product.create = function (payload, universe, http) {
        return new Product({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Product.prototype.serialize = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            custom_id: this.customId,
            name: this.name,
            summary: this.summary,
            description: this.description,
            brand: this.brand,
            assets: this.assets,
            assets_config: this.assetsConfig,
            condition: this.condition,
            manufacturers: this.manufacturers,
            suppliers: this.suppliers,
            produced_at: this.producedAt ? this.producedAt.toISOString() : undefined,
            purchased_at: this.purchasedAt ? this.purchasedAt.toISOString() : undefined,
            released_at: this.releasedAt ? this.releasedAt.toISOString() : undefined,
            similar_to: this.similarTo,
            related_to: this.relatedTo,
            audiences: this.audiences,
            keywords: this.keywords,
            categories: this.categories,
            is_proxy: (_c = this.isProxy) !== null && _c !== void 0 ? _c : false,
            proxy_vendor: this.proxyVendor,
            type: this.type,
            attributes: this.attributes,
            sku: this.sku,
            stock_minimum: this.stockMinimum,
            stock_maximum: this.stockMaximum,
            stockable: (_d = this.stockable) !== null && _d !== void 0 ? _d : true,
            parent: this.parent,
            seasons: this.seasons,
            tags: this.tags,
            codes: this.codes,
            i18n: this.i18n,
            external_reference_id: this.externalReferenceId,
            external_reference_custom_id: this.externalReferenceCustomId,
            client_id: this.clientId,
            discountable: (_e = this.discountable) !== null && _e !== void 0 ? _e : false,
            linkable: (_f = this.linkable) !== null && _f !== void 0 ? _f : false,
            is_service: (_g = this.isService) !== null && _g !== void 0 ? _g : false,
            warranty_notice: this.warrantyNotice,
            refund_policy: this.refundPolicy,
            disclaimer: this.disclaimer,
            offline_available: (_h = this.offlineAvailable) !== null && _h !== void 0 ? _h : false,
            online_available: (_j = this.onlineAvailable) !== null && _j !== void 0 ? _j : true,
            shipping_required: (_k = this.shippingFequired) !== null && _k !== void 0 ? _k : true,
            proxy_configuration: this.proxyConfiguration,
            inventory_external_reference_id: this.inventoryExternalReferenceId,
            links: this.links,
            metadata: this.metadata,
            prices: this.prices,
            children: this.children,
            options: this.attributesOptions
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
    Product.prototype.inventory = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, resources, err_2;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/inventory",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: undefined,
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 1:
                        response = _c.sent();
                        resources = response.data.data;
                        return [2, resources.map(function (resource) {
                                return inventory_1.Inventory.create(resource, _this.universe, _this.http);
                            })];
                    case 2:
                        err_2 = _c.sent();
                        throw this.handleError(new ProductInventoryError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Product;
}(_base_1.UniverseEntity));
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
        if (message === void 0) { message = 'Could not initialize product.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductInitializationError';
        return _this;
    }
    return ProductInitializationError;
}(errors_1.BaseError));
exports.ProductInitializationError = ProductInitializationError;
var ProductFetchRemoteError = (function (_super) {
    tslib_1.__extends(ProductFetchRemoteError, _super);
    function ProductFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get product.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductFetchRemoteError';
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
        return _this;
    }
    return ProductsFetchRemoteError;
}(errors_1.BaseError));
exports.ProductsFetchRemoteError = ProductsFetchRemoteError;
var ProductsFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(ProductsFetchCountRemoteError, _super);
    function ProductsFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get products.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsFetchRemoteError';
        return _this;
    }
    return ProductsFetchCountRemoteError;
}(errors_1.BaseError));
exports.ProductsFetchCountRemoteError = ProductsFetchCountRemoteError;
var ProductInventoryError = (function (_super) {
    tslib_1.__extends(ProductInventoryError, _super);
    function ProductInventoryError(message, properties) {
        if (message === void 0) { message = 'Could not get product inventory.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductInventoryError';
        return _this;
    }
    return ProductInventoryError;
}(errors_1.BaseError));
exports.ProductInventoryError = ProductInventoryError;
//# sourceMappingURL=product.js.map