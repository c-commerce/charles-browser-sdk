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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var readable_stream_1 = require("readable-stream");
var status_1 = require("./status");
var feed_1 = require("../eventing/feeds/feed");
var realtime = __importStar(require("../realtime"));
var errors_1 = require("../errors");
var topics_1 = __importDefault(require("./topics"));
var messaging_1 = require("../messaging");
var uuid = __importStar(require("../helpers/uuid"));
var staff = __importStar(require("../entities/staff/staff"));
var asset = __importStar(require("../entities/asset/asset"));
var person = __importStar(require("../entities/person/person"));
var channelUser = __importStar(require("../entities/person/channel-user"));
var email = __importStar(require("../entities/person/email"));
var product = __importStar(require("../entities/product/product"));
var ticket = __importStar(require("../entities/ticket/ticket"));
var cart = __importStar(require("../entities/cart/cart"));
var order = __importStar(require("../entities/order/order"));
var discount = __importStar(require("../entities/discount/discount"));
var messageTemplate = __importStar(require("../entities/message-template/message-template"));
var product_1 = require("../entities/product/product");
var event_1 = require("../eventing/feeds/event");
var productCategory = __importStar(require("../entities/product-category/product-category"));
var productCategoryTree = __importStar(require("../entities/product-category-tree/product-category-tree"));
var messageTemplateCategory = __importStar(require("../entities/message-template-category/message-template-category"));
var messageTemplateCategoryTree = __importStar(require("../entities/message-template-category-tree/message-template-category-tree"));
var Universe = (function (_super) {
    __extends(Universe, _super);
    function Universe(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.payload = null;
        _this.mqtt = null;
        _this.options = options;
        _this.name = options.name;
        _this.user = options.user;
        _this.base = (_a = _this.options.base) !== null && _a !== void 0 ? _a : 'https://hello-charles.com';
        _this.universeBase = "https://" + _this.name + ".hello-charles.com";
        _this.status = new status_1.UniverseStatus({ universe: _this });
        _this.health = new status_1.UniverseHealth({ universe: _this });
        _this.http = options.http;
        return _this;
    }
    Universe.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.base + "/" + Universe.endpoint + "/" + this.name)];
                    case 1:
                        res = _a.sent();
                        this.setInitialized(res.data.data[0]);
                        this.setMqttClient();
                        this.getMqttClient().on('error', function (error) {
                            _this.handleError(error);
                        });
                        return [2, this];
                    case 2:
                        err_1 = _a.sent();
                        throw new UniverseInitializationError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.parsePayload = function (payload) {
        var _a, _b;
        return {
            createdAt: (_a = new Date(payload.created_at)) !== null && _a !== void 0 ? _a : null,
            updatedAt: (_b = new Date(payload.updated_at)) !== null && _b !== void 0 ? _b : null,
            id: payload.id,
            organization: payload.organization,
            active: payload.active,
            deleted: payload.deleted,
            configuration: payload.configuration,
            name: payload.name
        };
    };
    Universe.prototype.setInitialized = function (payload) {
        this.payload = Universe.parsePayload(payload);
        this.initialized = true;
        return this;
    };
    Universe.prototype.setMqttClient = function () {
        var _this = this;
        var _a;
        var realtimeOpts = {
            base: "wss:" + this.name + ".hello-charles.com",
            username: (_a = this.user.id) !== null && _a !== void 0 ? _a : 'charles-browser-sdk',
            password: this.user.accessToken
        };
        this.mqtt = new realtime.RealtimeClient(realtimeOpts);
        this.mqtt.on('message', function (msg) {
            _this.handleMessage(msg);
        });
        this.subscibeDefaults();
    };
    Object.defineProperty(Universe.prototype, "defaultSubscriptions", {
        get: function () {
            return [
                topics_1.default.api.message.generateTopic(),
                topics_1.default.api.feeds.generateTopic(),
                topics_1.default.api.feedsActivities.generateTopic(),
                topics_1.default.api.feedsMessages.generateTopic(),
                topics_1.default.api.feedsEvents.generateTopic()
            ];
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.subscibeDefaults = function () {
        this.getMqttClient()
            .subscribe(this.defaultSubscriptions);
    };
    Universe.prototype.handleMessage = function (msg) {
        if (topics_1.default.api.clients.arm.isTopic(msg.topic)) {
            this.emit('armed', msg);
            this.getMqttClient().unsubscribe(msg.topic);
            this.emit('message', msg);
            return;
        }
        if (topics_1.default.api.message.isTopic(msg.topic)) {
            var message = void 0;
            if (msg.payload.message) {
                message = messaging_1.Message.deserialize(msg.payload.message, this, this.http);
            }
            this.emit('universe:message', __assign(__assign({}, msg), { message: message }));
            return;
        }
        if (topics_1.default.api.feedsEvents.isTopic(msg.topic)) {
            var event_2;
            var feed = void 0;
            if (msg.payload.event) {
                var feedPayload = { id: msg.payload.event.feed };
                feed = feed_1.Feed.create(feedPayload, this, this.http, this.mqtt);
                event_2 = event_1.Event.create(msg.payload.event, feed, this, this.http);
            }
            this.emit('universe:feeds:events', __assign(__assign({}, msg), { event: event_2, feed: feed }));
        }
        if (topics_1.default.api.feedsMessages.isTopic(msg.topic)) {
            var message = void 0;
            var feed = void 0;
            if (msg.payload.message) {
                message = messaging_1.Message.deserialize(msg.payload.message, this, this.http);
                feed = feed_1.Feed.create(msg.payload.feed, this, this.http, this.mqtt);
            }
            this.emit('universe:feeds:messages', __assign(__assign({}, msg), { message: message, feed: feed }));
            return;
        }
        if (topics_1.default.api.feeds.isTopic(msg.topic)) {
            var feed = void 0;
            if (msg.payload.feed) {
                feed = feed_1.Feed.create(msg.payload.feed, this, this.http, this.mqtt);
            }
            this.emit('universe:feeds', __assign(__assign({}, msg), { feed: feed, action: msg.payload.action }));
            return;
        }
        this.emit('message', msg);
    };
    Universe.prototype.getMqttClient = function () {
        if (this.mqtt)
            return this.mqtt;
        throw new realtime.UninstantiatedRealtimeClient();
    };
    Universe.prototype.create = function (options) {
        return new Universe(options);
    };
    Universe.prototype.deinitialize = function () {
        this.removeAllListeners();
        var client = this.getMqttClient();
        client.unsubscribe(this.defaultSubscriptions, function () {
            client.destroy();
        });
    };
    Object.defineProperty(Universe.prototype, "ready", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.isReady = function () {
        return false;
    };
    Object.defineProperty(Universe.prototype, "connected", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.isConnected = function () {
        return false;
    };
    Universe.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    Universe.prototype.feed = function (payload) {
        return feed_1.Feed.create(payload, this, this.http, this.mqtt);
    };
    Universe.prototype.product = function (payload) {
        return product.Product.create(payload, this, this.http);
    };
    Universe.prototype.staff = function (payload) {
        return staff.Staff.create(payload, this, this.http);
    };
    Universe.prototype.asset = function (payload) {
        return asset.Asset.create(payload, this, this.http);
    };
    Universe.prototype.cart = function (payload) {
        return cart.Cart.create(payload, this, this.http);
    };
    Universe.prototype.order = function (payload) {
        return order.Order.create(payload, this, this.http);
    };
    Universe.prototype.person = function (payload) {
        return person.Person.create(payload, this, this.http);
    };
    Universe.prototype.address = function (payload) {
        return person.Address.create(payload, this, this.http);
    };
    Universe.prototype.phonenumber = function (payload) {
        return person.Phonenumber.create(payload, this, this.http);
    };
    Universe.prototype.channelUser = function (payload) {
        return channelUser.ChannelUser.create(payload, this, this.http);
    };
    Universe.prototype.email = function (payload) {
        return email.Email.create(payload, this, this.http);
    };
    Universe.prototype.ticket = function (payload) {
        return ticket.Ticket.create(payload, this, this.http);
    };
    Universe.prototype.discount = function (payload) {
        return discount.Discount.create(payload, this, this.http);
    };
    Universe.prototype.messageTemplate = function (payload) {
        return messageTemplate.MessageTemplate.create(payload, this, this.http);
    };
    Universe.prototype.productCategory = function (payload) {
        return productCategory.ProductCategory.create(payload, this, this.http);
    };
    Universe.prototype.productCategoryTree = function (payload) {
        return productCategoryTree.ProductCategoryTree.create(payload, this, this.http);
    };
    Universe.prototype.messageTemplateCategory = function (payload) {
        return messageTemplateCategory.MessageTemplateCategory.create(payload, this, this.http);
    };
    Universe.prototype.messageTemplateCategoryTree = function (payload) {
        return messageTemplateCategoryTree.MessageTemplateCategoryTree.create(payload, this, this.http);
    };
    Universe.prototype.me = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opts, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.universeBase + "/api/v0/me"
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        response = _a.sent();
                        return [2, response.data.data];
                    case 2:
                        err_2 = _a.sent();
                        if (err_2.response.status === 401) {
                            throw new UniverseUnauthenticatedError(undefined, { error: err_2 });
                        }
                        throw new UniverseMeError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Object.defineProperty(Universe.prototype, "feeds", {
        get: function () {
            var _this = this;
            return {
                fromJson: function (payloads) {
                    return payloads.map(function (item) { return (feed_1.Feed.create(item, _this, _this.http, _this.mqtt)); });
                },
                toJson: function (feeds) {
                    return feeds.map(function (item) { return (item.serialize()); });
                },
                fetch: function (options) { return __awaiter(_this, void 0, void 0, function () {
                    var opts, res, feeds, err_3;
                    var _this = this;
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + feed_1.Feeds.endpoint,
                                    params: __assign(__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {})), { embed: (_c = (_b = options === null || options === void 0 ? void 0 : options.query) === null || _b === void 0 ? void 0 : _b.embed) !== null && _c !== void 0 ? _c : [
                                            'participants',
                                            'top_latest_events',
                                            'top_latest_messages'
                                        ] })
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _d.sent();
                                feeds = res.data.data;
                                if (options && options.raw === true) {
                                    return [2, feeds];
                                }
                                return [2, feeds.map(function (feed) {
                                        return feed_1.Feed.create(feed, _this, _this.http, _this.mqtt);
                                    })];
                            case 2:
                                err_3 = _d.sent();
                                throw new feed_1.FeedsFetchRemoteError(undefined, { error: err_3 });
                            case 3: return [2];
                        }
                    });
                }); },
                stream: function (options) { return __awaiter(_this, void 0, void 0, function () {
                    var inst, ret;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                inst = new feed_1.Feeds({
                                    universe: this,
                                    http: this.http,
                                    mqtt: this.mqtt
                                });
                                return [4, inst.getStream(options)];
                            case 1:
                                ret = _a.sent();
                                return [2, ret];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.staffs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + staff.Staffs.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return staff.Staff.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_4 = _a.sent();
                        throw new staff.StaffsFetchRemoteError(undefined, { error: err_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.assets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + asset.Assets.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return asset.Asset.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_5 = _a.sent();
                        throw new asset.AssetsFetchRemoteError(undefined, { error: err_5 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.people = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + person.People.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return person.Person.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_6 = _a.sent();
                        throw new person.PeopleFetchRemoteError(undefined, { error: err_6 });
                    case 3: return [2];
                }
            });
        });
    };
    Object.defineProperty(Universe.prototype, "products", {
        get: function () {
            var _this = this;
            return {
                fromJson: function (payloads) {
                    return payloads.map(function (item) { return (product_1.Product.create(item, _this, _this.http)); });
                },
                toJson: function (products) {
                    return products.map(function (item) { return (item.serialize()); });
                },
                fetch: function (options) { return __awaiter(_this, void 0, void 0, function () {
                    var opts, res, resources, err_7;
                    var _this = this;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + product.Products.endpoint,
                                    params: {
                                        embed: (_b = (_a = options === null || options === void 0 ? void 0 : options.query) === null || _a === void 0 ? void 0 : _a.embed) !== null && _b !== void 0 ? _b : 'options'
                                    }
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _c.sent();
                                resources = res.data.data;
                                if (options && options.raw === true) {
                                    return [2, resources];
                                }
                                return [2, resources.map(function (resource) {
                                        return product.Product.create(resource, _this, _this.http);
                                    })];
                            case 2:
                                err_7 = _c.sent();
                                throw new product.ProductsFetchRemoteError(undefined, { error: err_7 });
                            case 3: return [2];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.tickets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + ticket.Tickets.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return ticket.Ticket.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_8 = _a.sent();
                        throw new ticket.TicketsFetchRemoteError(undefined, { error: err_8 });
                    case 3: return [2];
                }
            });
        });
    };
    Object.defineProperty(Universe.prototype, "carts", {
        get: function () {
            var _this = this;
            return {
                fromJson: function (payloads) {
                    return payloads.map(function (item) { return (cart.Cart.create(item, _this, _this.http)); });
                },
                toJson: function (carts) {
                    return carts.map(function (item) { return (item.serialize()); });
                },
                fetch: function (options) { return __awaiter(_this, void 0, void 0, function () {
                    var opts, res, resources, err_9;
                    var _this = this;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + cart.Carts.endpoint,
                                    params: __assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _b.sent();
                                resources = res.data.data;
                                if (options && options.raw === true) {
                                    return [2, resources];
                                }
                                return [2, resources.map(function (resource) {
                                        return cart.Cart.create(resource, _this, _this.http);
                                    })];
                            case 2:
                                err_9 = _b.sent();
                                throw new cart.CartsFetchRemoteError(undefined, { error: err_9 });
                            case 3: return [2];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.orders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_10;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + order.Orders.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return order.Order.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_10 = _a.sent();
                        throw new order.OrdersFetchRemoteError(undefined, { error: err_10 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.discounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_11;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + discount.Discounts.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return discount.Discount.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_11 = _a.sent();
                        throw new discount.DiscountsFetchRemoteError(undefined, { error: err_11 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.messageTemplates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_12;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + messageTemplate.MessageTemplates.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return messageTemplate.MessageTemplate.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_12 = _a.sent();
                        throw new messageTemplate.MessageTemplatesFetchRemoteError(undefined, { error: err_12 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.productCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_13;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + productCategory.ProductCategories.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return productCategory.ProductCategory.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_13 = _a.sent();
                        throw new productCategory.ProductCategoriesFetchRemoteError(undefined, { error: err_13 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.productCategoryTrees = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_14;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + productCategoryTree.ProductCategoryTrees.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return productCategoryTree.ProductCategoryTree.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_14 = _a.sent();
                        throw new productCategoryTree.ProductCategoryTreesFetchRemoteError(undefined, { error: err_14 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.messageTemplateCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_15;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + messageTemplateCategory.MessageTemplateCategories.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return messageTemplateCategory.MessageTemplateCategory.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_15 = _a.sent();
                        throw new messageTemplateCategory.MessageTemplateCategoriesFetchRemoteError(undefined, { error: err_15 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.messageTemplateCategoryTrees = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_16;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + messageTemplateCategoryTree.MessageTemplateCategoryTrees.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return messageTemplateCategoryTree.MessageTemplateCategoryTree.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_16 = _a.sent();
                        throw new messageTemplateCategoryTree.MessageTemplateCategoryTreesFetchRemoteError(undefined, { error: err_16 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.arm = function () {
        var _this = this;
        var mqtt = this.getMqttClient();
        var topicString = topics_1.default.api.clients.arm.generateTopic({ client: uuid.v4() });
        mqtt.subscribe(topicString, function (err) {
            if (err) {
                return _this.handleError(err);
            }
            mqtt.publish(topicString);
        });
        return this;
    };
    Object.defineProperty(Universe.prototype, "search", {
        get: function () {
            var _this = this;
            return {
                people: function (q) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.searchEntity(person.People.endpoint, q)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); },
                feeds: function (q) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.searchEntity(feed_1.Feeds.endpoint, q)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.searchEntity = function (endpoint, q) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + endpoint + "/search", {
                                params: {
                                    q: q
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        return [2, res.data.data];
                    case 2:
                        err_17 = _a.sent();
                        throw new UniverseSearchError(undefined, { error: err_17 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.endpoint = 'api/v0/universes';
    return Universe;
}(readable_stream_1.Readable));
exports.Universe = Universe;
var UnviverseSingleton = (function (_super) {
    __extends(UnviverseSingleton, _super);
    function UnviverseSingleton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnviverseSingleton.getInstance = function (options) {
        if (!UnviverseSingleton.instance) {
            UnviverseSingleton.instance = new UnviverseSingleton(options);
        }
        return UnviverseSingleton.instance;
    };
    UnviverseSingleton.clearInstance = function () {
        UnviverseSingleton.instance.deinitialize();
    };
    return UnviverseSingleton;
}(Universe));
exports.UnviverseSingleton = UnviverseSingleton;
var UniverseInitializationError = (function (_super) {
    __extends(UniverseInitializationError, _super);
    function UniverseInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize universe.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseInitializationError';
        return _this;
    }
    return UniverseInitializationError;
}(errors_1.BaseError));
exports.UniverseInitializationError = UniverseInitializationError;
var UniverseSearchError = (function (_super) {
    __extends(UniverseSearchError, _super);
    function UniverseSearchError(message, properties) {
        if (message === void 0) { message = 'Could not fulfill search unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseSearchError';
        return _this;
    }
    return UniverseSearchError;
}(errors_1.BaseError));
exports.UniverseSearchError = UniverseSearchError;
var UniverseUnauthenticatedError = (function (_super) {
    __extends(UniverseUnauthenticatedError, _super);
    function UniverseUnauthenticatedError(message, properties) {
        if (message === void 0) { message = 'Invalid or expired session.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseUnauthenticatedError';
        Object.setPrototypeOf(_this, UniverseUnauthenticatedError.prototype);
        return _this;
    }
    return UniverseUnauthenticatedError;
}(errors_1.BaseError));
exports.UniverseUnauthenticatedError = UniverseUnauthenticatedError;
var UniverseMeError = (function (_super) {
    __extends(UniverseMeError, _super);
    function UniverseMeError(message, properties) {
        if (message === void 0) { message = 'Unexptected error fetching me data'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseMeError';
        Object.setPrototypeOf(_this, UniverseMeError.prototype);
        return _this;
    }
    return UniverseMeError;
}(errors_1.BaseError));
exports.UniverseMeError = UniverseMeError;
//# sourceMappingURL=index.js.map