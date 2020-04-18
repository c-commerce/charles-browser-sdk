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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var just_typeof_1 = __importDefault(require("just-typeof"));
var topics_1 = __importDefault(require("../../universe/topics"));
var realtime = __importStar(require("../../realtime"));
var errors_1 = require("../../errors");
var message_1 = require("../../messaging/message");
var asset_1 = require("../../entities/asset");
var person_1 = require("../../entities/person");
var event_1 = require("./event");
var _base_1 = require("../../entities/_base");
var Feed = (function (_super) {
    __extends(Feed, _super);
    function Feed(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.eventsMap = new Map();
        _this.universe = options.universe;
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
        this.agents = rawPayload.agents;
        this.parents = rawPayload.parents;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.latestActivityAt = rawPayload.latest_activity_at ? new Date(rawPayload.latest_activity_at) : undefined;
        this.deleted = rawPayload.deleted;
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
            active: this.active,
            top_latest_events: Array.isArray(this.topLatestEvents) ? this.topLatestEvents.map(function (item) { return (item.serialize()); }) : undefined
        };
    };
    Feed.prototype.reply = function (contentOptions) {
        return new FeedReply(__assign({ feed: this, http: this.http, universe: this.universe, rawPayload: {
                content: contentOptions.content
            }, rawAssets: contentOptions.rawAssets }, contentOptions));
    };
    Feed.prototype.init = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.fetch()];
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
                topics_1.default.api.feedEvents.generateTopic(this.serialize())
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
        if (topics_1.default.api.feedMessages.isTopic(msg.topic, this.serialize())) {
            var message = void 0;
            if (msg.payload.message) {
                message = message_1.Message.deserialize(msg.payload.message, this.universe, this.http, this);
            }
            this.emit('feed:message', __assign(__assign({}, msg), { message: message, feed: this }));
            return;
        }
        if (topics_1.default.api.feedEvents.isTopic(msg.topic, this.serialize())) {
            var event_2;
            if (msg.payload.message) {
                event_2 = event_1.Event.create(msg.payload.event, this, this.universe, this.http);
            }
            this.emit('feed:event', __assign(__assign({}, msg), { event: event_2, feed: this }));
        }
    };
    Feed.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universe.universeBase + "/" + Feed.endpoint + "/" + this.id)];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 2:
                        err_2 = _a.sent();
                        throw this.handleError(new FeedFetchRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    Feed.prototype.fetchLatestEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, events, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universe.universeBase + "/" + Feed.endpoint + "/" + this.id + "/events/latest")];
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
                        throw this.handleError(new FeedFetchLatestEventsRemoteError(undefined, { error: err_3 }));
                    case 3: return [2];
                }
            });
        });
    };
    Feed.prototype.fetchEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, events, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universe.universeBase + "/" + Feed.endpoint + "/" + this.id + "/events")];
                    case 1:
                        res = _a.sent();
                        events = res.data.data;
                        events.forEach(function (eventRaw) {
                            var e = event_1.Event.create(eventRaw, _this, _this.universe, _this.http);
                            _this.eventsMap.set(e.id, e);
                        });
                        return [2, Array.from(this.eventsMap.values())];
                    case 2:
                        err_4 = _a.sent();
                        throw this.handleError(new FeedFetchEventsRemoteError(undefined, { error: err_4 }));
                    case 3: return [2];
                }
            });
        });
    };
    Feed.prototype.createFeedEvent = function (type, resource, resourceType) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, res, event_3, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + Feed.endpoint + "/" + this.id + "/events",
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
                        err_5 = _a.sent();
                        throw this.handleError(new FeedCreateEventRemoteError(undefined, { error: err_5 }));
                    case 3: return [2];
                }
            });
        });
    };
    Feed.prototype.viewed = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
    Feed.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
        return err;
    };
    Feed.endpoint = 'api/v0/feeds';
    return Feed;
}(events_1.EventEmitter));
exports.Feed = Feed;
var Feeds = (function (_super) {
    __extends(Feeds, _super);
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
    }
    FeedReply.prototype.prepareSendWithAssets = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var assetsHandler, data, err_6;
            return __generator(this, function (_a) {
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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var additonalAttachments, assets, attachments, res, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        additonalAttachments = void 0;
                        if (!this.rawAssets) return [3, 2];
                        return [4, this.prepareSendWithAssets(this.rawAssets)];
                    case 1:
                        assets = _b.sent();
                        if (Array.isArray(assets)) {
                            additonalAttachments = assets.map(function (item) {
                                return {
                                    type: 'image',
                                    payload: item.uri
                                };
                            });
                        }
                        _b.label = 2;
                    case 2:
                        attachments = void 0;
                        if (additonalAttachments && this.content && Array.isArray(this.content.attachments)) {
                            attachments = __spreadArrays(this.content.attachments, additonalAttachments);
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
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient().post(this.universe.universeBase + "/" + Feed.endpoint + "/" + this.feed.id + "/reply", {
                                content: this.content
                            }))];
                    case 3:
                        res = _b.sent();
                        return [2, event_1.Event.create(res.data.data[0], this.feed, this.universe, this.http)];
                    case 4:
                        err_7 = _b.sent();
                        throw new FeedReplyError(undefined, { error: err_7 });
                    case 5: return [2];
                }
            });
        });
    };
    return FeedReply;
}());
exports.FeedReply = FeedReply;
var FeedReplyError = (function (_super) {
    __extends(FeedReplyError, _super);
    function FeedReplyError(message, properties) {
        if (message === void 0) { message = 'Could not send feed reply unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedReplyError';
        return _this;
    }
    return FeedReplyError;
}(errors_1.BaseError));
exports.FeedReplyError = FeedReplyError;
var FeedInitializationError = (function (_super) {
    __extends(FeedInitializationError, _super);
    function FeedInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize feed.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedInitializationError';
        return _this;
    }
    return FeedInitializationError;
}(errors_1.BaseError));
exports.FeedInitializationError = FeedInitializationError;
var FeedFetchRemoteError = (function (_super) {
    __extends(FeedFetchRemoteError, _super);
    function FeedFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get feed.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedFetchRemoteError';
        return _this;
    }
    return FeedFetchRemoteError;
}(errors_1.BaseError));
exports.FeedFetchRemoteError = FeedFetchRemoteError;
var FeedFetchLatestEventsRemoteError = (function (_super) {
    __extends(FeedFetchLatestEventsRemoteError, _super);
    function FeedFetchLatestEventsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get latest feed events.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedFetchLatestEventsRemoteError';
        return _this;
    }
    return FeedFetchLatestEventsRemoteError;
}(errors_1.BaseError));
exports.FeedFetchLatestEventsRemoteError = FeedFetchLatestEventsRemoteError;
var FeedFetchEventsRemoteError = (function (_super) {
    __extends(FeedFetchEventsRemoteError, _super);
    function FeedFetchEventsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get feed events.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedFetchEventsRemoteError';
        return _this;
    }
    return FeedFetchEventsRemoteError;
}(errors_1.BaseError));
exports.FeedFetchEventsRemoteError = FeedFetchEventsRemoteError;
var FeedCreateEventRemoteError = (function (_super) {
    __extends(FeedCreateEventRemoteError, _super);
    function FeedCreateEventRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not create feed event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedCreateEventRemoteError';
        return _this;
    }
    return FeedCreateEventRemoteError;
}(errors_1.BaseError));
exports.FeedCreateEventRemoteError = FeedCreateEventRemoteError;
var FeedsFetchRemoteError = (function (_super) {
    __extends(FeedsFetchRemoteError, _super);
    function FeedsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get feeds.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FeedsFetchRemoteError';
        return _this;
    }
    return FeedsFetchRemoteError;
}(errors_1.BaseError));
exports.FeedsFetchRemoteError = FeedsFetchRemoteError;
//# sourceMappingURL=feed.js.map