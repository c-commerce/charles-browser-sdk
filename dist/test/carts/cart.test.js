"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
// import * as universe from '../../src/universe/index'
var util_1 = require("../util");
var cart_1 = require("../../src/entities/cart/cart");
dotenv.config();
// const legacyId = '4564'
var mock = new axios_mock_adapter_1.default(axios_1.default);
describe('v0: Cart: can handle cart', function () {
    beforeEach(function () {
        mock.reset();
        mock.resetHandlers();
    });
    it('Charles\'s Cart is instantiable', function () { return __awaiter(void 0, void 0, void 0, function () {
        var universeStub, externalStateCart, carts, cart, cartItem;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    mock
                        .onPatch('https://stub-universe.hello-charles.com/api/v0/carts/pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx')
                        .reply(function (config) {
                        return [
                            200,
                            {
                                data: [
                                    {
                                        id: 'pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx',
                                        proxy_vendor: 'shopify',
                                        is_proxy: true,
                                        name: 'My first cart',
                                        created_at: '2020-04-15T22:29:31.065Z',
                                        updated_at: '2020-04-15T22:29:31.065Z',
                                        deleted: false,
                                        active: true,
                                        custom_id: null,
                                        type: 'sale',
                                        external_reference_id: '551644692617',
                                        external_reference_custom_id: null,
                                        client_id: null,
                                        person: null,
                                        note: null,
                                        comment: null,
                                        shipping_address: null,
                                        billing_address: null,
                                        contact: null,
                                        metadata: null,
                                        custom_properties: null,
                                        proxy_payload: null,
                                        shipping_fulfillment: null,
                                        amount_total_gross: 30.99,
                                        amount_total_net: 26.04,
                                        amount_total_tax: 4.95,
                                        amount_total_shipping_gross: null,
                                        order_prompt: 'https://hey-charles-dev-store.myshopify.com/XXXXXXXX/invoices/XXXXXXXXXXX',
                                        status: 'open',
                                        items: [
                                            {
                                                qty: 1,
                                                sku: null,
                                                name: 'T-Shirt xl',
                                                amount: {
                                                    net: null,
                                                    gross: 30.99
                                                },
                                                product: 'pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx',
                                                currency: 'EUR',
                                                vat_rate: 0.19,
                                                sub_title: 'T-Shirt xl',
                                                vat_class: null,
                                                custom_vat_rate: null,
                                                shipping_required: false,
                                                product_external_reference_id: null
                                            }
                                        ]
                                    }
                                ]
                            }
                        ];
                    });
                    universeStub = util_1.stubUniverse();
                    externalStateCart = {
                        id: 'pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx',
                        proxy_vendor: 'shopify',
                        is_proxy: true,
                        name: 'My first cart',
                        items: undefined
                    };
                    carts = universeStub.universe.carts.fromJson([externalStateCart]);
                    cart = carts[0];
                    expect(cart).toBeDefined();
                    expect(cart).toBeInstanceOf(cart_1.Cart);
                    expect(cart.isProxy).toBe(true);
                    expect(cart.proxyVendor).toBe('shopify');
                    expect(cart.items).toStrictEqual([]);
                    externalStateCart.items = [
                        {
                            qty: 1,
                            product: 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'
                        }
                    ];
                    return [4 /*yield*/, cart.patch(externalStateCart)];
                case 1:
                    _c.sent();
                    expect(cart).toBeDefined();
                    expect(cart).toBeInstanceOf(cart_1.Cart);
                    expect(cart.isProxy).toBe(true);
                    expect(cart.proxyVendor).toBe('shopify');
                    expect(cart.items).toBeDefined();
                    expect((_a = cart.items) === null || _a === void 0 ? void 0 : _a.length).toBe(1);
                    if (!cart.items || !cart.items[0]) {
                        throw new TypeError('cart item was undefined');
                    }
                    cartItem = cart.items[0];
                    expect(cartItem).toBeDefined();
                    expect(cartItem).toBeInstanceOf(cart_1.CartItem);
                    expect(cartItem.product).toBe('pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx');
                    expect(cartItem.qty).toBe(1);
                    expect(cartItem.amount).toBeDefined();
                    expect((_b = cartItem.amount) === null || _b === void 0 ? void 0 : _b.gross).toEqual(30.99);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=cart.test.js.map