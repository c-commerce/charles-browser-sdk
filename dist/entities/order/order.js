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
    __extends(Order, _super);
    function Order(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
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
        this.orderPrompt = rawPayload.order_prompt;
        this.status = rawPayload.status;
        this.proxyPayload = rawPayload.proxy_payload;
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
            order_prompt: this.orderPrompt,
            status: this.status,
            proxy_payload: this.proxyPayload
        };
    };
    Order.prototype.init = function () {
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
                        throw this.handleError(new OrderInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Order;
}(_base_1.default));
exports.Order = Order;
var Orders = (function () {
    function Orders() {
    }
    Orders.endpoint = 'api/v0/orders';
    return Orders;
}());
exports.Orders = Orders;
var OrderInitializationError = (function (_super) {
    __extends(OrderInitializationError, _super);
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
    __extends(OrderFetchRemoteError, _super);
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
var OrdersFetchRemoteError = (function (_super) {
    __extends(OrdersFetchRemoteError, _super);
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
//# sourceMappingURL=order.js.map