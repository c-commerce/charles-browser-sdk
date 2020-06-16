"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var readable_stream_1 = require("readable-stream");
var status_1 = require("./status");
var feed_1 = require("../eventing/feeds/feed");
var realtime = tslib_1.__importStar(require("../realtime"));
var errors_1 = require("../errors");
var topics_1 = tslib_1.__importDefault(require("./topics"));
var messaging_1 = require("../messaging");
var uuid = tslib_1.__importStar(require("../helpers/uuid"));
var staff = tslib_1.__importStar(require("../entities/staff/staff"));
var asset = tslib_1.__importStar(require("../entities/asset/asset"));
var person = tslib_1.__importStar(require("../entities/person/person"));
var channelUser = tslib_1.__importStar(require("../entities/person/channel-user"));
var email = tslib_1.__importStar(require("../entities/person/email"));
var product = tslib_1.__importStar(require("../entities/product/product"));
var ticket = tslib_1.__importStar(require("../entities/ticket/ticket"));
var cart = tslib_1.__importStar(require("../entities/cart/cart"));
var order = tslib_1.__importStar(require("../entities/order/order"));
var discount = tslib_1.__importStar(require("../entities/discount/discount"));
var messageTemplate = tslib_1.__importStar(require("../entities/message-template/message-template"));
var product_1 = require("../entities/product/product");
var event_1 = require("../eventing/feeds/event");
var productCategory = tslib_1.__importStar(require("../entities/product-category/product-category"));
var productCategoryTree = tslib_1.__importStar(require("../entities/product-category-tree/product-category-tree"));
var messageTemplateCategory = tslib_1.__importStar(require("../entities/message-template-category/message-template-category"));
var messageTemplateCategoryTree = tslib_1.__importStar(require("../entities/message-template-category-tree/message-template-category-tree"));
var customProperty = tslib_1.__importStar(require("../entities/custom-property/custom-property"));
var tag = tslib_1.__importStar(require("../entities/tag/tag"));
var tagGroup = tslib_1.__importStar(require("../entities/tag-group/tag-group"));
var configuration = tslib_1.__importStar(require("../entities/configuration/configuration"));
var inventory = tslib_1.__importStar(require("../entities/inventory/inventory"));
var integration = tslib_1.__importStar(require("../entities/integration/integration"));
var Universe = (function (_super) {
    tslib_1.__extends(Universe, _super);
    function Universe(options) {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.payload = null;
        _this.mqtt = null;
        _this.options = options;
        _this.name = options.name;
        _this.user = options.user;
        _this.base = (_a = _this.options.base) !== null && _a !== void 0 ? _a : 'https://hello-charles.com';
        _this.universeBase = (_b = options.universeBase) !== null && _b !== void 0 ? _b : "https://" + _this.name + ".hello-charles.com";
        _this.mqttUniverseBase = (_c = options.mqttUniverseBase) !== null && _c !== void 0 ? _c : "wss://" + _this.name + ".hello-charles.com";
        _this.status = new status_1.UniverseStatus({ universe: _this });
        _this.health = new status_1.UniverseHealth({ universe: _this });
        _this.http = options.http;
        return _this;
    }
    Universe.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
            base: this.mqttUniverseBase,
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
                topics_1.default.api.feedsEvents.generateTopic(),
                topics_1.default.api.people.generateTopic()
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
            this.emit('universe:message', tslib_1.__assign(tslib_1.__assign({}, msg), { message: message }));
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
            this.emit('universe:feeds:events', tslib_1.__assign(tslib_1.__assign({}, msg), { event: event_2, feed: feed }));
        }
        if (topics_1.default.api.feedsMessages.isTopic(msg.topic)) {
            var message = void 0;
            var feed = void 0;
            if (msg.payload.message) {
                message = messaging_1.Message.deserialize(msg.payload.message, this, this.http);
                feed = feed_1.Feed.create(msg.payload.feed, this, this.http, this.mqtt);
            }
            this.emit('universe:feeds:messages', tslib_1.__assign(tslib_1.__assign({}, msg), { message: message, feed: feed }));
            return;
        }
        if (topics_1.default.api.feeds.isTopic(msg.topic)) {
            var feed = void 0;
            if (msg.payload.feed) {
                feed = feed_1.Feed.create(msg.payload.feed, this, this.http, this.mqtt);
            }
            this.emit('universe:feeds', tslib_1.__assign(tslib_1.__assign({}, msg), { feed: feed, action: msg.payload.action }));
            return;
        }
        if (topics_1.default.api.people.isTopic(msg.topic)) {
            var _person = void 0;
            if (msg.payload.person) {
                _person = person.Person.create(msg.payload.person, this, this.http);
            }
            this.emit('universe:people', tslib_1.__assign(tslib_1.__assign({}, msg), { _person: _person }));
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
    Universe.prototype.customProperty = function (payload) {
        return customProperty.CustomProperty.create(payload, this, this.http);
    };
    Universe.prototype.tag = function (payload) {
        return tag.Tag.create(payload, this, this.http);
    };
    Universe.prototype.tagGroup = function (payload) {
        return tagGroup.TagGroup.create(payload, this, this.http);
    };
    Universe.prototype.configuration = function (payload) {
        return configuration.Configuration.create(payload, this, this.http);
    };
    Universe.prototype.inventory = function (payload) {
        return inventory.Inventory.create(payload, this, this.http);
    };
    Universe.prototype.integration = function (payload) {
        return integration.Integration.create(payload, this, this.http);
    };
    Universe.prototype.me = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_2;
            return tslib_1.__generator(this, function (_a) {
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
                fetch: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, feeds, err_3;
                    var _this = this;
                    var _a, _b, _c;
                    return tslib_1.__generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + feed_1.Feeds.endpoint,
                                    params: tslib_1.__assign(tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {})), { embed: (_c = (_b = options === null || options === void 0 ? void 0 : options.query) === null || _b === void 0 ? void 0 : _b.embed) !== null && _c !== void 0 ? _c : [
                                            'participants',
                                            'participants.channel_users',
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
                stream: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var inst, ret;
                    return tslib_1.__generator(this, function (_a) {
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
    Universe.prototype.staffs = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_4;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + staff.Staffs.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return staff.Staff.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_4 = _b.sent();
                        throw new staff.StaffsFetchRemoteError(undefined, { error: err_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.assets = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_5;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_6;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
                fetch: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, resources, err_7;
                    var _this = this;
                    var _a, _b, _c;
                    return tslib_1.__generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + product.Products.endpoint,
                                    params: tslib_1.__assign(tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {})), { embed: (_c = (_b = options === null || options === void 0 ? void 0 : options.query) === null || _b === void 0 ? void 0 : _b.embed) !== null && _c !== void 0 ? _c : 'options' })
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _d.sent();
                                resources = res.data.data;
                                if (options && options.raw === true) {
                                    return [2, resources];
                                }
                                return [2, resources.map(function (resource) {
                                        return product.Product.create(resource, _this, _this.http);
                                    })];
                            case 2:
                                err_7 = _d.sent();
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_8;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
                fetch: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, resources, err_9;
                    var _this = this;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + cart.Carts.endpoint,
                                    params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_10;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_11;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_12;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
    Universe.prototype.productCategories = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_13;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + productCategory.ProductCategories.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return productCategory.ProductCategory.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_13 = _b.sent();
                        throw new productCategory.ProductCategoriesFetchRemoteError(undefined, { error: err_13 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.productCategoryTrees = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_14;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + productCategoryTree.ProductCategoryTrees.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return productCategoryTree.ProductCategoryTree.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_14 = _b.sent();
                        throw new productCategoryTree.ProductCategoryTreesFetchRemoteError(undefined, { error: err_14 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.messageTemplateCategories = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_15;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_16;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
    Universe.prototype.customProperties = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_17;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + customProperty.CustomProperties.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (resource) {
                                return customProperty.CustomProperty.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_17 = _a.sent();
                        throw new customProperty.CustomPropertiesFetchRemoteError(undefined, { error: err_17 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.tags = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_18;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + tag.Tags.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return tag.Tag.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_18 = _b.sent();
                        throw new tag.TagsFetchRemoteError(undefined, { error: err_18 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.tagGroups = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_19;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + tagGroup.TagGroups.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return tagGroup.TagGroup.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_19 = _b.sent();
                        throw new tagGroup.TagGroupsFetchRemoteError(undefined, { error: err_19 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.configurations = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_20;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + configuration.Configurations.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return configuration.Configuration.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_20 = _b.sent();
                        throw new configuration.ConfigurationsFetchRemoteError(undefined, { error: err_20 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.inventories = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_21;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + inventory.Inventories.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return inventory.Inventory.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_21 = _b.sent();
                        throw new inventory.InventoriesFetchRemoteError(undefined, { error: err_21 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.integrations = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_22;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + integration.Integrations.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return integration.Integration.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_22 = _b.sent();
                        throw new integration.IntegrationsFetchRemoteError(undefined, { error: err_22 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.availableIntegrations = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_23;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + integration.Integrations.endpoint + "/available", {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        return [2, resources];
                    case 2:
                        err_23 = _b.sent();
                        throw new integration.AvailableIntegrationsFetchRemoteError(undefined, { error: err_23 });
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
                people: function (q) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.searchEntity(person.People.endpoint, q)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); },
                products: function (q) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.searchEntity(product.Products.endpoint, q)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); },
                feeds: function (q) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_24;
            return tslib_1.__generator(this, function (_a) {
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
                        err_24 = _a.sent();
                        throw new UniverseSearchError(undefined, { error: err_24 });
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
    tslib_1.__extends(UnviverseSingleton, _super);
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
    tslib_1.__extends(UniverseInitializationError, _super);
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
    tslib_1.__extends(UniverseSearchError, _super);
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
    tslib_1.__extends(UniverseUnauthenticatedError, _super);
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
    tslib_1.__extends(UniverseMeError, _super);
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