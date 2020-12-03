"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var just_typeof_1 = tslib_1.__importDefault(require("just-typeof"));
var topics_1 = tslib_1.__importDefault(require("../../universe/topics"));
var realtime = tslib_1.__importStar(require("../../realtime"));
var errors_1 = require("../../errors");
var message_1 = require("../../messaging/message");
var asset_1 = require("../../entities/asset");
var person_1 = require("../../entities/person");
var event_1 = require("./event");
var comment_1 = require("./comment");
var _base_1 = tslib_1.__importStar(require("../../entities/_base"));
exports.FEED_ENDPOINT = 'api/v0/feeds';
var Feed = (function (_super) {
    tslib_1.__extends(Feed, _super);
    function Feed(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.eventsMap = new Map();
        _this._rawPayload = null;
        _this.universe = options.universe;
        _this.endpoint = exports.FEED_ENDPOINT;
        _this.http = options.http;
        _this.mqtt = options.mqtt;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Feed.prototype.deserialize = function (rawPayload) {
        var _this = this;
        if (!this.id)
            this.id = rawPayload.id;
        this.setRawPayload(rawPayload);
        this.agents = rawPayload.agents;
        this.parents = rawPayload.parents;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.latestActivityAt = rawPayload.latest_activity_at ? new Date(rawPayload.latest_activity_at) : undefined;
        this.deleted = rawPayload.deleted;
        this.hidden = rawPayload.hidden;
        this.open = rawPayload.open;
        this.answered = rawPayload.answered;
        this.active = rawPayload.active;
        if (Array.isArray(rawPayload.participants)) {
            this.participants = rawPayload.participants.map(function (item) {
                if (just_typeof_1.default(item) === 'object') {
                    return person_1.Person.create(item, _this.universe, _this.http);
                }
                return item;
            });
        }
        else if (!rawPayload.participants && !Array.isArray(this.topLatestEvents)) {
            this.participants = undefined;
        }
        if (Array.isArray(rawPayload.top_latest_events)) {
            this.topLatestEvents = rawPayload.top_latest_events.map(function (item) { return (event_1.Event.create(item, _this, _this.universe, _this.http)); });
        }
        else if (!rawPayload.top_latest_events && !Array.isArray(this.topLatestEvents)) {
            this.topLatestEvents = undefined;
        }
        if (Array.isArray(rawPayload.top_latest_messages)) {
            this.topLatestMessages = rawPayload.top_latest_messages.map(function (item) { return (event_1.Event.create(item, _this, _this.universe, _this.http)); });
        }
        else if (!rawPayload.top_latest_messages && !Array.isArray(this.topLatestMessages)) {
            this.topLatestMessages = undefined;
        }
        return this;
    };
    Feed.create = function (payload, universe, http, mqtt) {
        return new Feed({ rawPayload: payload, universe: universe, http: http, mqtt: mqtt, initialized: true });
    };
    Feed.createUninitialized = function (payload, universe, http, mqtt) {
        return new Feed({ rawPayload: payload, universe: universe, http: http, mqtt: mqtt, initialized: false });
    };
    Feed.prototype.serialize = function () {
        return {
            id: this.id,
            participants: Array.isArray(this.participants) ? this.participants.map(function (item) {
                if (just_typeof_1.default(item) === 'object') {
                    return item.serialize();
                }
                return item;
            }) : undefined,
            agents: this.agents,
            parents: this.parents,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            latest_activity_at: this.latestActivityAt ? this.latestActivityAt.toISOString() : undefined,
            deleted: this.deleted,
            hidden: this.hidden,
            open: this.open,
            active: this.active,
            answered: this.answered,
            top_latest_events: Array.isArray(this.topLatestEvents) ? this.topLatestEvents.map(function (item) { return (item.serialize()); }) : undefined,
            top_latest_messages: Array.isArray(this.topLatestMessages) ? this.topLatestMessages.map(function (item) { return (item.serialize()); }) : undefined
        };
    };
    Feed.prototype.reply = function (contentOptions) {
        return new FeedReply(tslib_1.__assign({ feed: this, http: this.http, universe: this.universe, rawPayload: {
                content: contentOptions.content
            }, rawAssets: contentOptions.rawAssets }, contentOptions));
    };
    Feed.prototype.init = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.fetch(options)];
                    case 1:
                        _b.sent();
                        (_a = this.mqtt) === null || _a === void 0 ? void 0 : _a.on('message', function (msg) {
                            _this.handleMessage(msg);
                        });
                        this.subscibeDefaults();
                        return [2, this];
                    case 2:
                        err_1 = _b.sent();
                        throw this.handleError(new FeedInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Object.defineProperty(Feed.prototype, "defaultSubscriptions", {
        get: function () {
            return [
                topics_1.default.api.feedMessages.generateTopic(this.serialize()),
                topics_1.default.api.feedEvents.generateTopic(this.serialize()),
                topics_1.default.api.feedTyping.generateTopic(this.serialize()),
                topics_1.default.api.feedPresence.generateTopic(this.serialize()),
                topics_1.default.api.feedMessagesStatus.generateTopic(this.serialize())
            ];
        },
        enumerable: true,
        configurable: true
    });
    Feed.prototype.deinitialize = function () {
        this.removeAllListeners();
        this.getMqttClient().unsubscribe(this.defaultSubscriptions);
    };
    Feed.prototype.subscibeDefaults = function () {
        this.getMqttClient()
            .subscribe(this.defaultSubscriptions);
    };
    Feed.prototype.getMqttClient = function () {
        if (this.mqtt)
            return this.mqtt;
        throw new realtime.UninstantiatedRealtimeClient();
    };
    Feed.prototype.handleMessage = function (msg) {
        if (topics_1.default.api.feedMessagesStatus.isTopic(msg.topic, this.serialize())) {
            var message = void 0;
            if (msg.payload.message) {
                message = message_1.Message.deserialize(msg.payload.message, this.universe, this.http, this);
            }
            this.emit('feed:message:status', tslib_1.__assign(tslib_1.__assign({}, msg), { message: message, feed: this }));
            return;
        }
        if (topics_1.default.api.feedMessages.isTopic(msg.topic, this.serialize())) {
            var message = void 0;
            if (msg.payload.message) {
                message = message_1.Message.deserialize(msg.payload.message, this.universe, this.http, this);
            }
            this.emit('feed:message', tslib_1.__assign(tslib_1.__assign({}, msg), { message: message, feed: this }));
            return;
        }
        if (topics_1.default.api.feedEvents.isTopic(msg.topic, this.serialize())) {
            var event_2;
            if (msg.payload.event) {
                event_2 = event_1.Event.create(msg.payload.event, this, this.universe, this.http);
            }
            this.emit('feed:event', tslib_1.__assign(tslib_1.__assign({}, msg), { event: event_2, feed: this }));
        }
        if (topics_1.default.api.feedPresence.isTopic(msg.topic, this.serialize())) {
            var presence = void 0;
            if (msg.payload.presence) {
                presence = msg.payload.presence;
            }
            this.emit('feed:presence', tslib_1.__assign(tslib_1.__assign({}, msg), { presence: presence, feed: this }));
        }
        if (topics_1.default.api.feedTyping.isTopic(msg.topic, this.serialize())) {
            var typing = void 0;
            if (msg.payload.typing) {
                typing = msg.payload.typing;
            }
            this.emit('feed:typing', tslib_1.__assign(tslib_1.__assign({}, msg), { typing: typing, feed: this }));
        }
    };
    Feed.prototype.fetchLatestEvents = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, events, err_2;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/events/latest",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            params: tslib_1.__assign({}, ((options === null || options === void 0 ? void 0 : options.query) ? options.query : {})),
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 1:
                        res = _b.sent();
                        events = res.data.data;
                        if (options && options.raw === true) {
                            return [2, events];
                        }
                        events.forEach(function (eventRaw) {
                            var e = event_1.Event.create(eventRaw, _this, _this.universe, _this.http);
                            _this.eventsMap.set(e.id, e);
                        });
                        return [2, Array.from(this.eventsMap.values())];
                    case 2:
                        err_2 = _b.sent();
                        throw this.handleError(new FeedFetchLatestEventsRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    Feed.prototype.fetchEvents = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, events, err_3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/events",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            params: tslib_1.__assign({}, ((options === null || options === void 0 ? void 0 : options.query) ? options.query : {})),
                            responseType: 'json'
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _a.sent();
                        events = res.data.data;
                        events.forEach(function (eventRaw) {
                            var e = event_1.Event.create(eventRaw, _this, _this.universe, _this.http);
                            _this.eventsMap.set(e.id, e);
                        });
                        return [2, Array.from(this.eventsMap.values())];
                    case 2:
                        err_3 = _a.sent();
                        throw this.handleError(new FeedFetchEventsRemoteError(undefined, { error: err_3 }));
                    case 3: return [2];
                }
            });
        });
    };
    Feed.prototype.createFeedEvent = function (type, resource, resourceType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, event_3, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/events",
                            data: {
                                type: type,
                                resource: resource !== null && resource !== void 0 ? resource : undefined,
                                resource_type: resourceType !== null && resourceType !== void 0 ? resourceType : undefined
                            }
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _a.sent();
                        event_3 = res.data.data[0];
                        return [2, event_1.Event.create(event_3, this, this.universe, this.http)];
                    case 2:
                        err_4 = _a.sent();
                        throw this.handleError(new FeedCreateEventRemoteError(undefined, { error: err_4 }));
                    case 3: return [2];
                }
            });
        });
    };
    Feed.prototype.createFeedComment = function (content, author) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, comment, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/comments",
                            data: {
                                content: content,
                                author: author
                            }
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _a.sent();
                        comment = res.data.data[0];
                        return [2, comment_1.Comment.create(comment, this, this.universe, this.http)];
                    case 2:
                        err_5 = _a.sent();
                        throw this.handleError(new FeedCreateEventRemoteError(undefined, { error: err_5 }));
                    case 3: return [2];
                }
            });
        });
    };
    Feed.prototype.viewed = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createFeedEvent('agent:view')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Feed.prototype.events = function () {
        return Array.from(this.eventsMap.values());
    };
    Feed.prototype.getEventsMap = function () {
        return this.eventsMap;
    };
    Feed.prototype.presence = function (payload) {
        var _a;
        var id = this.id;
        var topics = [
            'api/feeds/*/presence',
            "api/feeds/" + id + "/presence"
        ];
        (_a = this.mqtt) === null || _a === void 0 ? void 0 : _a.publish(topics, payload);
        return this;
    };
    Feed.prototype.typing = function (payload) {
        var _a;
        var id = this.id;
        var topics = [
            'api/feeds/*/typing',
            "api/feeds/" + id + "/typing"
        ];
        (_a = this.mqtt) === null || _a === void 0 ? void 0 : _a.publish(topics, payload);
        return this;
    };
    return Feed;
}(_base_1.default));
exports.Feed = Feed;
var Feeds = (function (_super) {
    tslib_1.__extends(Feeds, _super);
    function Feeds(options) {
        var _this = _super.call(this) || this;
        _this.endpoint = Feeds.endpoint;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.mqtt = options.mqtt;
        return _this;
    }
    Feeds.prototype.parseItem = function (payload) {
        var _a;
        return Feed.create(payload, this.universe, this.http, (_a = this.mqtt) !== null && _a !== void 0 ? _a : null);
    };
    Feeds.prototype.getStream = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getStream(options)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Feeds.endpoint = 'api/v0/feeds';
    return Feeds;
}(_base_1.EntitiesList));
exports.Feeds = Feeds;
var FeedReply = (function () {
    function FeedReply(options) {
        this.options = options;
        this.feed = options.feed;
        this.universe = options.universe;
        this.http = options.http;
        this.content = options.content;
        this.rawAssets = options.rawAssets;
        this.causes = options.causes;
    }
    FeedReply.prototype.prepareSendWithAssets = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assetsHandler, data, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        assetsHandler = new asset_1.Assets({
                            http: this.http,
                            universe: this.universe
                        });
                        return [4, assetsHandler.post(payload)];
                    case 1:
                        data = _a.sent();
                        return [2, data];
                    case 2:
                        err_6 = _a.sent();
                        throw err_6;
                    case 3: return [2];
                }
            });
        });
    };
    FeedReply.prototype.send = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var additonalAttachments, assets, attachments, res, err_7;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        additonalAttachments = void 0;
                        if (!this.rawAssets) return [3, 2];
                        return [4, this.prepareSendWithAssets(this.rawAssets)];
                    case 1:
                        assets = _c.sent();
                        if (Array.isArray(assets)) {
                            additonalAttachments = assets.map(function (item) {
                                return {
                                    type: 'image',
                                    payload: item.uri
                                };
                            });
                        }
                        _c.label = 2;
                    case 2:
                        attachments = void 0;
                        if (additonalAttachments && this.content && Array.isArray(this.content.attachments)) {
                            attachments = tslib_1.__spreadArrays(this.content.attachments, additonalAttachments);
                        }
                        else if (this.content && !Array.isArray(this.content.attachments) && additonalAttachments) {
                            attachments = additonalAttachments;
                        }
                        else if (this.content && Array.isArray(this.content.attachments)) {
                            attachments = this.content.attachments;
                        }
                        if (this.content && attachments) {
                            this.content.attachments = attachments;
                        }
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient().post(this.universe.universeBase + "/" + exports.FEED_ENDPOINT + "/" + this.feed.id + "/reply", {
                                content: this.content,
                                causes: (_b = this.causes) !== null && _b !== void 0 ? _b : undefined
                            }))];
                    case 3:
                        res = _c.sent();
                        return [2, event_1.Event.create(res.data.data[0], this.feed, this.universe, this.http)];
                    case 4:
                        err_7 = _c.sent();
                        throw new FeedReplyError(undefined, errors_1.BaseError.handleCommonProperties(err_7));
                    case 5: return [2];
                }
            });
        });
    };
    return FeedReply;
}());
exports.FeedReply = FeedReply;
var FeedReplyError = (function (_super) {
    tslib_1.__extends(FeedReplyError, _super);
    function FeedReplyError(message, properties) {
        if (message === void 0) { message = 'Could not send feed reply unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedReplyError';
        Object.setPrototypeOf(_this, FeedReplyError.prototype);
        return _this;
    }
    return FeedReplyError;
}(errors_1.BaseError));
exports.FeedReplyError = FeedReplyError;
var FeedInitializationError = (function (_super) {
    tslib_1.__extends(FeedInitializationError, _super);
    function FeedInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize feed.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedInitializationError';
        Object.setPrototypeOf(_this, FeedInitializationError.prototype);
        return _this;
    }
    return FeedInitializationError;
}(errors_1.BaseError));
exports.FeedInitializationError = FeedInitializationError;
var FeedFetchRemoteError = (function (_super) {
    tslib_1.__extends(FeedFetchRemoteError, _super);
    function FeedFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get feed.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedFetchRemoteError';
        Object.setPrototypeOf(_this, FeedFetchRemoteError.prototype);
        return _this;
    }
    return FeedFetchRemoteError;
}(errors_1.BaseError));
exports.FeedFetchRemoteError = FeedFetchRemoteError;
var FeedFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(FeedFetchCountRemoteError, _super);
    function FeedFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get feed count.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RemoteError ';
        Object.setPrototypeOf(_this, FeedFetchCountRemoteError.prototype);
        return _this;
    }
    return FeedFetchCountRemoteError;
}(errors_1.BaseError));
exports.FeedFetchCountRemoteError = FeedFetchCountRemoteError;
var FeedFetchLatestEventsRemoteError = (function (_super) {
    tslib_1.__extends(FeedFetchLatestEventsRemoteError, _super);
    function FeedFetchLatestEventsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get latest feed events.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedFetchLatestEventsRemoteError';
        Object.setPrototypeOf(_this, FeedFetchLatestEventsRemoteError.prototype);
        return _this;
    }
    return FeedFetchLatestEventsRemoteError;
}(errors_1.BaseError));
exports.FeedFetchLatestEventsRemoteError = FeedFetchLatestEventsRemoteError;
var FeedFetchEventsRemoteError = (function (_super) {
    tslib_1.__extends(FeedFetchEventsRemoteError, _super);
    function FeedFetchEventsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get feed events.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedFetchEventsRemoteError';
        Object.setPrototypeOf(_this, FeedFetchEventsRemoteError.prototype);
        return _this;
    }
    return FeedFetchEventsRemoteError;
}(errors_1.BaseError));
exports.FeedFetchEventsRemoteError = FeedFetchEventsRemoteError;
var FeedCreateEventRemoteError = (function (_super) {
    tslib_1.__extends(FeedCreateEventRemoteError, _super);
    function FeedCreateEventRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not create feed event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedCreateEventRemoteError';
        Object.setPrototypeOf(_this, FeedCreateEventRemoteError.prototype);
        return _this;
    }
    return FeedCreateEventRemoteError;
}(errors_1.BaseError));
exports.FeedCreateEventRemoteError = FeedCreateEventRemoteError;
var FeedsFetchRemoteError = (function (_super) {
    tslib_1.__extends(FeedsFetchRemoteError, _super);
    function FeedsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get feeds.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedsFetchRemoteError';
        Object.setPrototypeOf(_this, FeedsFetchRemoteError.prototype);
        return _this;
    }
    return FeedsFetchRemoteError;
}(errors_1.BaseError));
exports.FeedsFetchRemoteError = FeedsFetchRemoteError;
//# sourceMappingURL=feed.js.map