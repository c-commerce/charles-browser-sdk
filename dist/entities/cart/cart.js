"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPatchOrderPromptError = exports.CartAddItemsRemoteError = exports.CartCreateRemoteError = exports.CartsFetchCountRemoteError = exports.CartsFetchRemoteError = exports.CartFetchRemoteError = exports.CartInitializationError = exports.Carts = exports.Cart = exports.CartItem = exports.ICartStatusEnum = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var ICartStatusEnum;
(function (ICartStatusEnum) {
    ICartStatusEnum["open"] = "open";
    ICartStatusEnum["pending"] = "pending";
    ICartStatusEnum["completed"] = "completed";
    ICartStatusEnum["cancelled"] = "cancelled";
})(ICartStatusEnum = exports.ICartStatusEnum || (exports.ICartStatusEnum = {}));
var CartItem = (function () {
    function CartItem(options) {
        this.universe = options.universe;
        this.apiCarrier = options.universe;
        this.http = options.http;
        this.options = options;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            this.deserialize(options.rawPayload);
        }
    }
    CartItem.prototype.deserialize = function (rawPayload) {
        this.id = rawPayload.id;
        this.qty = rawPayload.qty;
        this.sku = rawPayload.sku;
        this.name = rawPayload.name;
        this.amount = rawPayload.amount;
        this.passive = rawPayload.passive;
        this.currency = rawPayload.currency;
        this.vatRate = rawPayload.vat_rate;
        this.vatClass = rawPayload.vat_class;
        this.customVatRate = rawPayload.custom_vat_rate;
        this.taxRegion = rawPayload.tax_region;
        this.taxCountry = rawPayload.tax_country;
        this.additionalTaxes = rawPayload.additional_taxes;
        this.product = rawPayload.product;
        this.metadata = rawPayload.metadata;
        this.customId = rawPayload.custom_id;
        this.discounts = rawPayload.discounts;
        this.orderIndex = rawPayload.order_index;
        this.customProperties = rawPayload.custom_properties;
        this.shippingRequired = rawPayload.shipping_required;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.externalReferenceCustomId = rawPayload.external_reference_custom_id;
        return this;
    };
    CartItem.create = function (payload, universe, http) {
        return new CartItem({ rawPayload: payload, universe: universe, http: http });
    };
    CartItem.prototype.serialize = function () {
        return {
            id: this.id,
            qty: this.qty,
            sku: this.sku,
            name: this.name,
            amount: this.amount,
            passive: this.passive,
            currency: this.currency,
            vat_rate: this.vatRate,
            vat_class: this.vatClass,
            custom_vat_rate: this.customVatRate,
            tax_region: this.taxRegion,
            tax_country: this.taxCountry,
            additional_taxes: this.additionalTaxes,
            product: this.product,
            metadata: this.metadata,
            custom_id: this.customId,
            discounts: this.discounts,
            order_index: this.orderIndex,
            custom_properties: this.customProperties,
            shipping_required: this.shippingRequired,
            external_reference_id: this.externalReferenceId,
            external_reference_custom_id: this.externalReferenceCustomId
        };
    };
    return CartItem;
}());
exports.CartItem = CartItem;
var Cart = (function (_super) {
    tslib_1.__extends(Cart, _super);
    function Cart(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/carts';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Cart.prototype.deserialize = function (rawPayload) {
        var _this = this;
        var _a, _b, _c;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.currency = rawPayload.currency;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.customId = rawPayload.custom_id;
        this.links = rawPayload.links;
        this.isProxy = (_c = rawPayload.is_proxy) !== null && _c !== void 0 ? _c : false;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.type = rawPayload.type;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.externalReferenceCustomId = rawPayload.external_reference_custom_id;
        this.clientId = rawPayload.client_id;
        this.person = rawPayload.person;
        this.personExternalReferenceId = rawPayload.person_external_reference_id;
        this.note = rawPayload.note;
        this.comment = rawPayload.comment;
        this.shippingAddress = rawPayload.shipping_address;
        this.billingAddress = rawPayload.billing_address;
        this.contact = rawPayload.contact;
        this.metadata = rawPayload.metadata;
        this.customProperies = rawPayload.custom_properies;
        this.shippingFulfillment = rawPayload.shipping_fulfillment;
        this.amountTotalGross = rawPayload.amount_total_gross;
        this.amountTotalNet = rawPayload.amount_total_net;
        this.amountTotalTax = rawPayload.amount_total_tax;
        this.amountTotalShippingGross = rawPayload.amount_total_shipping_gross;
        this.orderPrompt = rawPayload.order_prompt;
        this.storefront = rawPayload.storefront;
        this.status = rawPayload.status;
        this.discounts = rawPayload.discounts;
        this.shippingMethods = rawPayload.shipping_methods;
        this.taxesSummary = rawPayload.taxes_summary;
        this.proxyPayload = rawPayload.proxy_payload;
        if (Array.isArray(rawPayload.items)) {
            this.items = rawPayload.items.map(function (item) { return (CartItem.create(item, _this.universe, _this.http)); });
        }
        else {
            this.items = [];
        }
        return this;
    };
    Cart.create = function (payload, universe, http) {
        return new Cart({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Cart.prototype.serialize = function () {
        var _a, _b;
        var items;
        if (Array.isArray(this.items)) {
            items = this.items.map(function (item) { return (item.serialize()); });
        }
        return {
            id: this.id,
            currency: this.currency,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            custom_id: this.customId,
            is_proxy: this.isProxy,
            proxy_vendor: this.proxyVendor,
            type: this.type,
            external_reference_id: this.externalReferenceId,
            external_reference_custom_id: this.externalReferenceCustomId,
            client_id: this.clientId,
            person: this.person,
            person_external_reference_id: this.personExternalReferenceId,
            note: this.note,
            comment: this.comment,
            shipping_address: this.shippingAddress,
            billing_address: this.billingAddress,
            contact: this.contact,
            metadata: this.metadata,
            custom_properies: this.customProperies,
            items: items,
            links: this.links,
            shipping_fulfillment: this.shippingFulfillment,
            amount_total_gross: this.amountTotalGross,
            amount_total_net: this.amountTotalNet,
            amount_total_tax: this.amountTotalTax,
            amount_total_shipping_gross: this.amountTotalShippingGross,
            order_prompt: this.orderPrompt,
            storefront: this.storefront,
            status: this.status,
            discounts: this.discounts,
            shipping_methods: this.shippingMethods,
            taxes_summary: this.taxesSummary,
            proxy_payload: this.proxyPayload
        };
    };
    Cart.prototype.init = function () {
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
                        throw this.handleError(new CartInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Cart.prototype.addItems = function (itemsOptions) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('addItem requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/items",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: itemsOptions.map(function (itemOption) {
                                var _a;
                                return ({
                                    product: itemOption.product,
                                    qty: (_a = itemOption.qty) !== null && _a !== void 0 ? _a : 1
                                });
                            }),
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        res = _c.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 3:
                        err_2 = _c.sent();
                        throw new CartAddItemsRemoteError(undefined, { error: err_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Cart.prototype.patchOrderPrompt = function (request) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, rawCart, err_3;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('order prompt patch requires cart id to be set');
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PUT',
                            url: ((_b = (_a = this.apiCarrier) === null || _a === void 0 ? void 0 : _a.injectables) === null || _b === void 0 ? void 0 : _b.base) + "/" + this.endpoint + "/" + this.id + "/order_prompt",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: request,
                            responseType: 'json'
                        };
                        return [4, ((_c = this.http) === null || _c === void 0 ? void 0 : _c.getClient()(opts))];
                    case 2:
                        res = _d.sent();
                        rawCart = res.data.data[0];
                        return [2, Cart.create(rawCart, this.universe, this.http)];
                    case 3:
                        err_3 = _d.sent();
                        throw new CartPatchOrderPromptError(undefined, { error: err_3 });
                    case 4: return [2];
                }
            });
        });
    };
    return Cart;
}(_base_1.UniverseEntity));
exports.Cart = Cart;
var Carts = (function () {
    function Carts() {
    }
    Carts.endpoint = 'api/v0/carts';
    return Carts;
}());
exports.Carts = Carts;
var CartInitializationError = (function (_super) {
    tslib_1.__extends(CartInitializationError, _super);
    function CartInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize cart.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartInitializationError';
        Object.setPrototypeOf(_this, CartInitializationError.prototype);
        return _this;
    }
    return CartInitializationError;
}(errors_1.BaseError));
exports.CartInitializationError = CartInitializationError;
var CartFetchRemoteError = (function (_super) {
    tslib_1.__extends(CartFetchRemoteError, _super);
    function CartFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get cart.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartFetchRemoteError';
        Object.setPrototypeOf(_this, CartFetchRemoteError.prototype);
        return _this;
    }
    return CartFetchRemoteError;
}(errors_1.BaseError));
exports.CartFetchRemoteError = CartFetchRemoteError;
var CartsFetchRemoteError = (function (_super) {
    tslib_1.__extends(CartsFetchRemoteError, _super);
    function CartsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get carts.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsFetchRemoteError';
        Object.setPrototypeOf(_this, CartsFetchRemoteError.prototype);
        return _this;
    }
    return CartsFetchRemoteError;
}(errors_1.BaseError));
exports.CartsFetchRemoteError = CartsFetchRemoteError;
var CartsFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(CartsFetchCountRemoteError, _super);
    function CartsFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get carts count.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsFetchCountRemoteError';
        Object.setPrototypeOf(_this, CartsFetchCountRemoteError.prototype);
        return _this;
    }
    return CartsFetchCountRemoteError;
}(errors_1.BaseError));
exports.CartsFetchCountRemoteError = CartsFetchCountRemoteError;
var CartCreateRemoteError = (function (_super) {
    tslib_1.__extends(CartCreateRemoteError, _super);
    function CartCreateRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not create carts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartCreateRemoteError';
        Object.setPrototypeOf(_this, CartCreateRemoteError.prototype);
        return _this;
    }
    return CartCreateRemoteError;
}(errors_1.BaseError));
exports.CartCreateRemoteError = CartCreateRemoteError;
var CartAddItemsRemoteError = (function (_super) {
    tslib_1.__extends(CartAddItemsRemoteError, _super);
    function CartAddItemsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not add items to cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartAddItemsRemoteError';
        Object.setPrototypeOf(_this, CartAddItemsRemoteError.prototype);
        return _this;
    }
    return CartAddItemsRemoteError;
}(errors_1.BaseError));
exports.CartAddItemsRemoteError = CartAddItemsRemoteError;
var CartPatchOrderPromptError = (function (_super) {
    tslib_1.__extends(CartPatchOrderPromptError, _super);
    function CartPatchOrderPromptError(message, properties) {
        if (message === void 0) { message = 'Could not patch order prompt of cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartPatchOrderPromptError';
        Object.setPrototypeOf(_this, CartPatchOrderPromptError.prototype);
        return _this;
    }
    return CartPatchOrderPromptError;
}(errors_1.BaseError));
exports.CartPatchOrderPromptError = CartPatchOrderPromptError;
//# sourceMappingURL=cart.js.map