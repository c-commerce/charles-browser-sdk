"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var readable_stream_1 = require("readable-stream");
var qs_1 = tslib_1.__importDefault(require("qs"));
var status_1 = require("./status");
var feed_1 = require("../eventing/feeds/feed");
var realtime = tslib_1.__importStar(require("../realtime"));
var errors_1 = require("../errors");
var topics_1 = tslib_1.__importDefault(require("./topics"));
var messaging_1 = require("../messaging");
var uuid = tslib_1.__importStar(require("../helpers/uuid"));
var analytics_1 = require("../analytics/analytics");
var staff = tslib_1.__importStar(require("../entities/staff/staff"));
var track = tslib_1.__importStar(require("../entities/track/track"));
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
var messageBroker = tslib_1.__importStar(require("../entities/message-broker/message-broker"));
var storefront = tslib_1.__importStar(require("../entities/storefront/storefront"));
var shippingMethod = tslib_1.__importStar(require("../entities/shipping-method/shipping-method"));
var route = tslib_1.__importStar(require("../entities/route/route"));
var thing = tslib_1.__importStar(require("../entities/thing/thing"));
var nlu = tslib_1.__importStar(require("../entities/nlu/nlu"));
var intent = tslib_1.__importStar(require("../entities/intent/intent"));
var message = tslib_1.__importStar(require("../messaging/message"));
var location = tslib_1.__importStar(require("../entities/location/location"));
var contactList = tslib_1.__importStar(require("../entities/contact-list/contact-list"));
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
            var message_1;
            if (msg.payload.message) {
                message_1 = messaging_1.Message.deserialize(msg.payload.message, this, this.http);
            }
            this.emit('universe:message', tslib_1.__assign(tslib_1.__assign({}, msg), { message: message_1 }));
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
            var message_2;
            var feed = void 0;
            if (msg.payload.message) {
                message_2 = messaging_1.Message.deserialize(msg.payload.message, this, this.http);
                feed = feed_1.Feed.create(msg.payload.feed, this, this.http, this.mqtt);
            }
            this.emit('universe:feeds:messages', tslib_1.__assign(tslib_1.__assign({}, msg), { message: message_2, feed: feed }));
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
    Universe.prototype.baseResourceFactory = function (proto, payload) {
        return proto.create(payload, this, this.http);
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
    Universe.prototype.track = function (payload) {
        return track.Track.create(payload, this, this.http);
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
    Universe.prototype.messageBroker = function (payload) {
        return messageBroker.MessageBroker.create(payload, this, this.http);
    };
    Universe.prototype.storefront = function (payload) {
        return storefront.Storefront.create(payload, this, this.http);
    };
    Universe.prototype.shippingMethod = function (payload) {
        return shippingMethod.ShippingMethod.create(payload, this, this.http);
    };
    Universe.prototype.route = function (payload) {
        return route.Route.create(payload, this, this.http);
    };
    Universe.prototype.thing = function (payload) {
        return thing.Thing.create(payload, this, this.http);
    };
    Universe.prototype.nlu = function (payload) {
        return nlu.Nlu.create(payload, this, this.http);
    };
    Universe.prototype.intent = function (payload) {
        return intent.Intent.create(payload, this, this.http);
    };
    Universe.prototype.location = function (payload) {
        return location.Location.create(payload, this, this.http);
    };
    Universe.prototype.message = function (payload) {
        return message.Message.create(payload, this, this.http);
    };
    Universe.prototype.contactList = function (payload) {
        return contactList.ContactList.create(payload, this, this.http);
    };
    Universe.prototype.apiRequest = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        opts = {
                            method: options.method,
                            path: "" + options.path + (options.query ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            data: (_a = options.data) !== null && _a !== void 0 ? _a : undefined
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient()(opts)];
                    case 2:
                        res = _b.sent();
                        return [2, res.data.data];
                    case 3:
                        err_2 = _b.sent();
                        throw new UniverseApiRequestError(undefined, { error: err_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Universe.prototype.me = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_3;
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
                        err_3 = _a.sent();
                        if (err_3.response.status === 401) {
                            throw new UniverseUnauthenticatedError(undefined, { error: err_3 });
                        }
                        throw new UniverseMeError(undefined, { error: err_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.makeAnalyticsRequest = function (endpointSlug, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.universeBase + "/" + analytics_1.ANALYTICS_ENDPOINT + endpointSlug,
                            params: options
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _a.sent();
                        return [2, res.data.data];
                    case 2:
                        err_4 = _a.sent();
                        throw new analytics_1.AnalyticsFetchRemoteError(undefined, { error: err_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Object.defineProperty(Universe.prototype, "analytics", {
        get: function () {
            var _this = this;
            return {
                orders: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.makeAnalyticsRequest('/commerce/orders/distribution/count', options)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); },
                revenues: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.makeAnalyticsRequest('/commerce/revenues/distribution', options)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); },
                xau: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.makeAnalyticsRequest('/messages/xau/count', options)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); },
                peopleMessagingChannelParticipationDistribution: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.makeAnalyticsRequest('/people/channel_participation/distribution', options)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); },
                feedOpenedClosed: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.makeAnalyticsRequest('/feeds/open_close/distribution/count', options)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
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
                    var opts, res, feeds, err_5;
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
                                err_5 = _d.sent();
                                throw new feed_1.FeedsFetchRemoteError(undefined, { error: err_5 });
                            case 3: return [2];
                        }
                    });
                }); },
                fetchCount: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, err_6;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'HEAD',
                                    url: this.universeBase + "/" + feed_1.Feeds.endpoint,
                                    params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _b.sent();
                                return [2, {
                                        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
                                    }];
                            case 2:
                                err_6 = _b.sent();
                                throw new feed_1.FeedFetchCountRemoteError(undefined, { error: err_6 });
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
    Object.defineProperty(Universe.prototype, "people", {
        get: function () {
            var _this = this;
            return {
                fromJson: function (payloads) {
                    return payloads.map(function (item) { return (person.Person.create(item, _this, _this.http)); });
                },
                toJson: function (people) {
                    return people.map(function (item) { return (item.serialize()); });
                },
                fetch: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, resources, err_7;
                    var _this = this;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + person.People.endpoint,
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
                                        return person.Person.create(resource, _this, _this.http);
                                    })];
                            case 2:
                                err_7 = _b.sent();
                                throw new person.PeopleFetchRemoteError(undefined, { error: err_7 });
                            case 3: return [2];
                        }
                    });
                }); },
                fetchCount: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, err_8;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'HEAD',
                                    url: this.universeBase + "/" + person.People.endpoint,
                                    params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _b.sent();
                                return [2, {
                                        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
                                    }];
                            case 2:
                                err_8 = _b.sent();
                                throw new person.PeopleFetchCountRemoteError(undefined, { error: err_8 });
                            case 3: return [2];
                        }
                    });
                }); },
                stream: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var inst, ret;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                inst = new person.People({
                                    universe: this,
                                    http: this.http
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
            var res, resources, err_9;
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
                        err_9 = _b.sent();
                        throw new staff.StaffsFetchRemoteError(undefined, { error: err_9 });
                    case 3: return [2];
                }
            });
        });
    };
    Object.defineProperty(Universe.prototype, "tracks", {
        get: function () {
            var _this = this;
            return {
                fromJson: function (payloads) {
                    return payloads.map(function (item) { return (track.Track.create(item, _this, _this.http)); });
                },
                toJson: function (products) {
                    return products.map(function (item) { return (item.serialize()); });
                },
                fetch: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var res, resources, err_10;
                    var _this = this;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4, this.http.getClient().get(this.universeBase + "/" + track.Tracks.endpoint, {
                                        params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                    })];
                            case 1:
                                res = _b.sent();
                                resources = res.data.data;
                                if (options && options.raw === true) {
                                    return [2, resources];
                                }
                                return [2, resources.map(function (resource) {
                                        return track.Track.create(resource, _this, _this.http);
                                    })];
                            case 2:
                                err_10 = _b.sent();
                                throw new track.TracksFetchRemoteError(undefined, { error: err_10 });
                            case 3: return [2];
                        }
                    });
                }); },
                fetchCount: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, err_11;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'HEAD',
                                    url: this.universeBase + "/" + track.Tracks.endpoint,
                                    params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _b.sent();
                                return [2, {
                                        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
                                    }];
                            case 2:
                                err_11 = _b.sent();
                                throw new track.TracksFetchRemoteError(undefined, { error: err_11 });
                            case 3: return [2];
                        }
                    });
                }); },
                current: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var res, resources, err_12;
                    var _this = this;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4, this.http.getClient().get(this.universeBase + "/" + track.Tracks.currentEndpoint, {
                                        params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                    })];
                            case 1:
                                res = _b.sent();
                                resources = res.data.data;
                                if (options && options.raw === true) {
                                    return [2, resources];
                                }
                                return [2, resources.map(function (resource) {
                                        return track.Track.create(resource, _this, _this.http);
                                    })];
                            case 2:
                                err_12 = _b.sent();
                                throw new track.TracksFetchRemoteError(undefined, { error: err_12 });
                            case 3: return [2];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.assets = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_13;
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
                        err_13 = _a.sent();
                        throw new asset.AssetsFetchRemoteError(undefined, { error: err_13 });
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
                    var opts, res, resources, err_14;
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
                                err_14 = _d.sent();
                                throw new product.ProductsFetchRemoteError(undefined, { error: err_14 });
                            case 3: return [2];
                        }
                    });
                }); },
                fetchCount: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, err_15;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'HEAD',
                                    url: this.universeBase + "/" + product.Products.endpoint,
                                    params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _b.sent();
                                return [2, {
                                        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
                                    }];
                            case 2:
                                err_15 = _b.sent();
                                throw new product.ProductsFetchCountRemoteError(undefined, { error: err_15 });
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
            var res, resources, err_16;
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
                        err_16 = _a.sent();
                        throw new ticket.TicketsFetchRemoteError(undefined, { error: err_16 });
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
                    var opts, res, resources, err_17;
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
                                err_17 = _b.sent();
                                throw new cart.CartsFetchRemoteError(undefined, { error: err_17 });
                            case 3: return [2];
                        }
                    });
                }); },
                fetchCount: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, err_18;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'HEAD',
                                    url: this.universeBase + "/" + cart.Carts.endpoint,
                                    params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _b.sent();
                                return [2, {
                                        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
                                    }];
                            case 2:
                                err_18 = _b.sent();
                                throw new cart.CartsFetchCountRemoteError(undefined, { error: err_18 });
                            case 3: return [2];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Universe.prototype, "orders", {
        get: function () {
            var _this = this;
            return {
                fromJson: function (payloads) {
                    return payloads.map(function (item) { return (order.Order.create(item, _this, _this.http)); });
                },
                toJson: function (orders) {
                    return orders.map(function (item) { return (item.serialize()); });
                },
                fetch: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, resources, err_19;
                    var _this = this;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + order.Orders.endpoint,
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
                                        return order.Order.create(resource, _this, _this.http);
                                    })];
                            case 2:
                                err_19 = _b.sent();
                                throw new order.OrdersFetchRemoteError(undefined, { error: err_19 });
                            case 3: return [2];
                        }
                    });
                }); },
                fetchCount: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, err_20;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'HEAD',
                                    url: this.universeBase + "/" + order.Orders.endpoint,
                                    params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _b.sent();
                                return [2, {
                                        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
                                    }];
                            case 2:
                                err_20 = _b.sent();
                                throw new order.OrdersFetchCountRemoteError(undefined, { error: err_20 });
                            case 3: return [2];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.discounts = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_21;
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
                        err_21 = _a.sent();
                        throw new discount.DiscountsFetchRemoteError(undefined, { error: err_21 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.messageTemplates = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_22;
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
                        err_22 = _a.sent();
                        throw new messageTemplate.MessageTemplatesFetchRemoteError(undefined, { error: err_22 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.productCategories = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_23;
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
                        err_23 = _b.sent();
                        throw new productCategory.ProductCategoriesFetchRemoteError(undefined, { error: err_23 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.productCategoryTrees = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_24;
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
                        err_24 = _b.sent();
                        throw new productCategoryTree.ProductCategoryTreesFetchRemoteError(undefined, { error: err_24 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.messageTemplateCategories = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_25;
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
                        err_25 = _a.sent();
                        throw new messageTemplateCategory.MessageTemplateCategoriesFetchRemoteError(undefined, { error: err_25 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.messageTemplateCategoryTrees = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_26;
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
                        err_26 = _a.sent();
                        throw new messageTemplateCategoryTree.MessageTemplateCategoryTreesFetchRemoteError(undefined, { error: err_26 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.customProperties = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_27;
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
                        err_27 = _a.sent();
                        throw new customProperty.CustomPropertiesFetchRemoteError(undefined, { error: err_27 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.makeBaseResourceListRequest = function (proto, listProto, errorProto, options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_28;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + listProto.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return proto.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_28 = _b.sent();
                        throw new errorProto(undefined, { error: err_28 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.tags = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.makeBaseResourceListRequest(tag.Tag, tag.Tags, tag.TagsFetchRemoteError, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Universe.prototype.tagGroups = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.makeBaseResourceListRequest(tagGroup.TagGroup, tagGroup.TagGroups, tagGroup.TagGroupsFetchRemoteError, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Universe.prototype.configurations = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_29;
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
                        err_29 = _b.sent();
                        throw new configuration.ConfigurationsFetchRemoteError(undefined, { error: err_29 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.inventories = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_30;
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
                        err_30 = _b.sent();
                        throw new inventory.InventoriesFetchRemoteError(undefined, { error: err_30 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.integrations = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_31;
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
                        err_31 = _b.sent();
                        throw new integration.IntegrationsFetchRemoteError(undefined, { error: err_31 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.availableIntegrations = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_32;
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
                        err_32 = _b.sent();
                        throw new integration.AvailableIntegrationsFetchRemoteError(undefined, { error: err_32 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.setupIntegration = function (payload, setupEndpoint) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_33;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universeBase + "/" + integration.Integrations.endpoint + "/setup/" + setupEndpoint,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: {
                                payload: payload
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 1:
                        res = _b.sent();
                        return [2, res.status];
                    case 2:
                        err_33 = _b.sent();
                        throw new integration.IntegrationsSetupRemoteError(undefined, { error: err_33 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.messageBrokers = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_34;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + messageBroker.MessageBrokers.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return messageBroker.MessageBroker.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_34 = _b.sent();
                        throw new messageBroker.MessageBrokersFetchRemoteError(undefined, { error: err_34 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.storefronts = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_35;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + storefront.Storefronts.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return storefront.Storefront.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_35 = _b.sent();
                        throw new storefront.StorefrontsFetchRemoteError(undefined, { error: err_35 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.shippingMethods = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_36;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + shippingMethod.ShippingMethods.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return shippingMethod.ShippingMethod.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_36 = _b.sent();
                        throw new shippingMethod.ShippingMethodsFetchRemoteError(undefined, { error: err_36 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.routes = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_37;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + route.Routes.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return route.Route.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_37 = _b.sent();
                        throw new route.RoutesFetchRemoteError(undefined, { error: err_37 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.things = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_38;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + thing.Things.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return thing.Thing.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_38 = _b.sent();
                        throw new thing.ThingsFetchRemoteError(undefined, { error: err_38 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.nlus = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_39;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + nlu.Nlus.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return nlu.Nlu.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_39 = _b.sent();
                        throw new nlu.NlusFetchRemoteError(undefined, { error: err_39 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.intents = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_40;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + intent.Intents.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return intent.Intent.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_40 = _b.sent();
                        throw new intent.IntentsFetchRemoteError(undefined, { error: err_40 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.locations = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, resources, err_41;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/" + location.Locations.endpoint, {
                                params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                            })];
                    case 1:
                        res = _b.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (resource) {
                                return location.Location.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_41 = _b.sent();
                        throw new location.LocationsFetchRemoteError(undefined, { error: err_41 });
                    case 3: return [2];
                }
            });
        });
    };
    Object.defineProperty(Universe.prototype, "contactLists", {
        get: function () {
            var _this = this;
            return {
                fromJson: function (payloads) {
                    return payloads.map(function (item) { return (contactList.ContactList.create(item, _this, _this.http)); });
                },
                toJson: function (contactLists) {
                    return contactLists.map(function (item) { return (item.serialize()); });
                },
                fetch: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, resources, err_42;
                    var _this = this;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universeBase + "/" + contactList.ContactLists.endpoint,
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
                                        return contactList.ContactList.create(resource, _this, _this.http);
                                    })];
                            case 2:
                                err_42 = _b.sent();
                                throw new contactList.ContactListsFetchRemoteError(undefined, { error: err_42 });
                            case 3: return [2];
                        }
                    });
                }); },
                fetchCount: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, err_43;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'HEAD',
                                    url: this.universeBase + "/" + contactList.ContactLists.endpoint,
                                    params: tslib_1.__assign({}, ((_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _b.sent();
                                return [2, {
                                        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
                                    }];
                            case 2:
                                err_43 = _b.sent();
                                throw new contactList.ContactListsFetchCountRemoteError(undefined, { error: err_43 });
                            case 3: return [2];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
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
    Universe.prototype.versions = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_44;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/api/versions")];
                    case 1:
                        res = _b.sent();
                        return [2, {
                                universe: (_a = res.data) === null || _a === void 0 ? void 0 : _a.universe
                            }];
                    case 2:
                        err_44 = _b.sent();
                        throw new UniverseVersionsError(undefined, { error: err_44 });
                    case 3: return [2];
                }
            });
        });
    };
    Universe.prototype.healthz = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_45;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universeBase + "/api/healthz")];
                    case 1:
                        res = _b.sent();
                        return [2, {
                                message: (_a = res.data) === null || _a === void 0 ? void 0 : _a.msg
                            }];
                    case 2:
                        err_45 = _b.sent();
                        throw new UniverseHealthzError(undefined, { error: err_45 });
                    case 3: return [2];
                }
            });
        });
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
            var res, err_46;
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
                        err_46 = _a.sent();
                        throw new UniverseSearchError(undefined, { error: err_46 });
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
var UniverseApiRequestError = (function (_super) {
    tslib_1.__extends(UniverseApiRequestError, _super);
    function UniverseApiRequestError(message, properties) {
        if (message === void 0) { message = 'Unexptected error making api request.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseApiRequestError';
        Object.setPrototypeOf(_this, UniverseApiRequestError.prototype);
        return _this;
    }
    return UniverseApiRequestError;
}(errors_1.BaseError));
exports.UniverseApiRequestError = UniverseApiRequestError;
var UniverseVersionsError = (function (_super) {
    tslib_1.__extends(UniverseVersionsError, _super);
    function UniverseVersionsError(message, properties) {
        if (message === void 0) { message = 'Unexptected response making versions request.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseVersionsError';
        Object.setPrototypeOf(_this, UniverseVersionsError.prototype);
        return _this;
    }
    return UniverseVersionsError;
}(errors_1.BaseError));
exports.UniverseVersionsError = UniverseVersionsError;
var UniverseHealthzError = (function (_super) {
    tslib_1.__extends(UniverseHealthzError, _super);
    function UniverseHealthzError(message, properties) {
        if (message === void 0) { message = 'Unexptected response making health request.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseHealthzError';
        Object.setPrototypeOf(_this, UniverseHealthzError.prototype);
        return _this;
    }
    return UniverseHealthzError;
}(errors_1.BaseError));
exports.UniverseHealthzError = UniverseHealthzError;
//# sourceMappingURL=index.js.map