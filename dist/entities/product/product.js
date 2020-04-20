"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _base_1 = __importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Product = (function (_super) {
    __extends(Product, _super);
    function Product(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
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
            metadata: this.metadata,
            prices: this.prices,
            children: this.children,
            options: this.attributesOptions
        };
    };
    Product.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
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
    __extends(ProductInitializationError, _super);
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
    __extends(ProductFetchRemoteError, _super);
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
    __extends(ProductsFetchRemoteError, _super);
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
//# sourceMappingURL=product.js.map