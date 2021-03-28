"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderExportRemoteError = exports.OrdersAssociationRemoteError = exports.OrdersFetchRemoteError = exports.OrdersFetchCountRemoteError = exports.OrderFetchRemoteError = exports.OrderInitializationError = exports.Orders = exports.Order = exports.OrderItem = exports.IOrderStatusEnum = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var IOrderStatusEnum;
(function (IOrderStatusEnum) {
    IOrderStatusEnum["open"] = "open";
    IOrderStatusEnum["pending"] = "pending";
    IOrderStatusEnum["completed"] = "completed";
    IOrderStatusEnum["cancelled"] = "cancelled";
})(IOrderStatusEnum = exports.IOrderStatusEnum || (exports.IOrderStatusEnum = {}));
var OrderItem = (function () {
    function OrderItem(options) {
        this.universe = options.universe;
        this.apiCarrier = options.universe;
        this.http = options.http;
        this.options = options;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            this.deserialize(options.rawPayload);
        }
    }
    OrderItem.prototype.deserialize = function (rawPayload) {
        this.qty = rawPayload.qty;
        this.sku = rawPayload.sku;
        this.name = rawPayload.name;
        this.price = rawPayload.price;
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
    OrderItem.create = function (payload, universe, http) {
        return new OrderItem({ rawPayload: payload, universe: universe, http: http });
    };
    OrderItem.prototype.serialize = function () {
        return {
            qty: this.qty,
            sku: this.sku,
            name: this.name,
            price: this.price,
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
    return OrderItem;
}());
exports.OrderItem = OrderItem;
var Order = (function (_super) {
    tslib_1.__extends(Order, _super);
    function Order(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/orders';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Order.prototype.deserialize = function (rawPayload) {
        var _this = this;
        var _a, _b, _c;
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.customId = rawPayload.custom_id;
        this.isProxy = (_c = rawPayload.is_proxy) !== null && _c !== void 0 ? _c : false;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.type = rawPayload.type;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.externalReferenceCustomId = rawPayload.external_reference_custom_id;
        this.clientId = rawPayload.client_id;
        this.person = rawPayload.person;
        this.note = rawPayload.note;
        this.comment = rawPayload.comment;
        this.shippingAddress = rawPayload.shipping_address;
        this.billingAddress = rawPayload.billing_address;
        this.contact = rawPayload.contact;
        this.metadata = rawPayload.metadata;
        this.customProperies = rawPayload.custom_properies;
        this.cart = rawPayload.cart;
        this.shippingFulfillment = rawPayload.shipping_fulfillment;
        this.amountTotalGross = rawPayload.amount_total_gross;
        this.amountTotalNet = rawPayload.amount_total_net;
        this.amountTotalTax = rawPayload.amount_total_tax;
        this.amountTotalShippingGross = rawPayload.amount_total_shipping_gross;
        this.discountAmountTotal = rawPayload.discount_amount_total;
        this.orderPrompt = rawPayload.order_prompt;
        this.status = rawPayload.status;
        this.proxyPayload = rawPayload.proxy_payload;
        this.discounts = rawPayload.discounts;
        this.taxesSummary = rawPayload.taxes_summary;
        this.shippingMethods = rawPayload.shipping_methods;
        if (Array.isArray(rawPayload.items)) {
            this.items = rawPayload.items.map(function (item) { return (OrderItem.create(item, _this.universe, _this.http)); });
        }
        else {
            this.items = [];
        }
        return this;
    };
    Order.create = function (payload, universe, http) {
        return new Order({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Order.prototype.serialize = function () {
        var _a, _b;
        var items;
        if (Array.isArray(this.items)) {
            items = this.items.map(function (item) { return (item.serialize()); });
        }
        return {
            id: this.id,
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
            note: this.note,
            comment: this.comment,
            shipping_address: this.shippingAddress,
            billing_address: this.billingAddress,
            contact: this.contact,
            metadata: this.metadata,
            custom_properies: this.customProperies,
            cart: this.cart,
            items: items,
            shipping_fulfillment: this.shippingFulfillment,
            amount_total_gross: this.amountTotalGross,
            amount_total_net: this.amountTotalNet,
            amount_total_tax: this.amountTotalTax,
            amount_total_shipping_gross: this.amountTotalShippingGross,
            discount_amount_total: this.discountAmountTotal,
            order_prompt: this.orderPrompt,
            status: this.status,
            proxy_payload: this.proxyPayload,
            discounts: this.discounts,
            taxes_summary: this.taxesSummary,
            shipping_methods: this.shippingMethods
        };
    };
    Order.prototype.init = function () {
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
                        throw this.handleError(new OrderInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Order.prototype.associatePerson = function (personId) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('association requires id to be set.');
                        if (!personId)
                            throw new TypeError('association requires new person to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/person/associate/" + personId,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: undefined,
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        response = _c.sent();
                        this.deserialize(response.data.data[0]);
                        return [2, this];
                    case 3:
                        err_2 = _c.sent();
                        throw new OrdersAssociationRemoteError(undefined, { error: err_2 });
                    case 4: return [2];
                }
            });
        });
    };
    return Order;
}(_base_1.UniverseEntity));
exports.Order = Order;
var Orders = (function (_super) {
    tslib_1.__extends(Orders, _super);
    function Orders(options) {
        var _this = _super.call(this) || this;
        _this.endpoint = Orders.endpoint;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.http = options.http;
        return _this;
    }
    Orders.prototype.parseItem = function (payload) {
        return Order.create(payload, this.universe, this.http);
    };
    Orders.prototype.getStream = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getStream(options)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Orders.prototype.exportCsv = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._exportCsv(options)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Orders.endpoint = 'api/v0/orders';
    return Orders;
}(_base_1.EntitiesList));
exports.Orders = Orders;
var OrderInitializationError = (function (_super) {
    tslib_1.__extends(OrderInitializationError, _super);
    function OrderInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize order.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderInitializationError';
        return _this;
    }
    return OrderInitializationError;
}(errors_1.BaseError));
exports.OrderInitializationError = OrderInitializationError;
var OrderFetchRemoteError = (function (_super) {
    tslib_1.__extends(OrderFetchRemoteError, _super);
    function OrderFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get order.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderFetchRemoteError';
        return _this;
    }
    return OrderFetchRemoteError;
}(errors_1.BaseError));
exports.OrderFetchRemoteError = OrderFetchRemoteError;
var OrdersFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(OrdersFetchCountRemoteError, _super);
    function OrdersFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get order count.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersFetchCountRemoteError';
        return _this;
    }
    return OrdersFetchCountRemoteError;
}(errors_1.BaseError));
exports.OrdersFetchCountRemoteError = OrdersFetchCountRemoteError;
var OrdersFetchRemoteError = (function (_super) {
    tslib_1.__extends(OrdersFetchRemoteError, _super);
    function OrdersFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get orders.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersFetchRemoteError';
        return _this;
    }
    return OrdersFetchRemoteError;
}(errors_1.BaseError));
exports.OrdersFetchRemoteError = OrdersFetchRemoteError;
var OrdersAssociationRemoteError = (function (_super) {
    tslib_1.__extends(OrdersAssociationRemoteError, _super);
    function OrdersAssociationRemoteError(message, properties) {
        if (message === void 0) { message = 'Could associate order with person unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersAssociationRemoteError';
        return _this;
    }
    return OrdersAssociationRemoteError;
}(errors_1.BaseError));
exports.OrdersAssociationRemoteError = OrdersAssociationRemoteError;
var OrderExportRemoteError = (function (_super) {
    tslib_1.__extends(OrderExportRemoteError, _super);
    function OrderExportRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not export orders.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderExportRemoteError';
        return _this;
    }
    return OrderExportRemoteError;
}(errors_1.BaseError));
exports.OrderExportRemoteError = OrderExportRemoteError;
//# sourceMappingURL=order.js.map