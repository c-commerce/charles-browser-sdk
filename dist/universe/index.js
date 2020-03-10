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
var Universe = /** @class */ (function (_super) {
    __extends(Universe, _super);
    function Universe(options) {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.payload = null;
        _this.mqtt = null;
        _this.options = options;
        _this.name = options.name;
        _this.user = options.user;
        _this.base = _this.options.base || 'https://hello-charles.com';
        _this.universeBase = "https://" + _this.name + ".hello-charles.com";
        _this.status = new status_1.UniverseStatus({ universe: _this });
        _this.health = new status_1.UniverseHealth({ universe: _this });
        _this.http = options.http;
        return _this;
    }
    Universe.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.base + "/" + Universe.endpoint + "/" + this.name)];
                    case 1:
                        res = _a.sent();
                        this.setInitialized(res.data.data[0]);
                        this.setMqttClient();
                        return [2 /*return*/, this];
                    case 2:
                        err_1 = _a.sent();
                        throw new UniverseInitializationError(undefined, { error: err_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Universe.parsePayload = function (payload) {
        return {
            createdAt: payload.created_at ? new Date(payload.created_at) : null,
            updatedAt: payload.updated_at ? new Date(payload.updated_at) : null,
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
        var realtimeOpts = {
            base: "wss:" + this.name + ".hello-charles.com",
            username: this.user.id || 'charles-browser-sdk',
            password: this.user.accessToken
        };
        this.mqtt = new realtime.RealtimeClient(realtimeOpts);
        this.mqtt.on('message', function (msg) {
            _this.handleMessage(msg);
        });
        this.subscibeDefaults();
    };
    Universe.prototype.subscibeDefaults = function () {
        this.getMqttClient()
            .subscribe([
            topics_1.default.api.message.generateTopic(),
            topics_1.default.api.feeds.generateTopic(),
            topics_1.default.api.feedsActivities.generateTopic(),
            topics_1.default.api.feedsMessages.generateTopic()
        ]);
    };
    /**
     *
     * Parsing and routing logic is being handled here. We take extensive decisions about type and destinations here.
     */
    Universe.prototype.handleMessage = function (msg) {
        // each arming message will cause an unsubscription
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
            if (msg.payload.message) {
                feed = feed_1.Feed.create(msg.payload.feed, this, this.http, this.mqtt);
            }
            this.emit('universe:feeds', __assign(__assign({}, msg), { feed: feed }));
            return;
        }
        this.emit('message', msg);
    };
    /**
     * Safe access the mqtt client. This has a conequence that all the methods that use it need to be aware that they might throw.
     */
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
        this.getMqttClient().destroy();
    };
    Object.defineProperty(Universe.prototype, "ready", {
        get: function () {
            // TODO: implement
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.isReady = function () {
        // TODO: implement
        return false;
    };
    Object.defineProperty(Universe.prototype, "connected", {
        get: function () {
            // TODO: implement
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Universe.prototype.isConnected = function () {
        // TODO: implement
        return false;
    };
    Universe.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    Universe.prototype.feeds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, feeds, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universeBase + "/" + feed_1.Feeds.endpoint)];
                    case 1:
                        res = _a.sent();
                        feeds = res.data.data;
                        return [2 /*return*/, feeds.map(function (feed) {
                                return feed_1.Feed.create(feed, _this, _this.http, _this.mqtt);
                            })];
                    case 2:
                        err_2 = _a.sent();
                        throw new feed_1.FeedsFetchRemoteError(undefined, { error: err_2 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Universe.prototype.staffs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universeBase + "/" + staff.Staffs.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2 /*return*/, resources.map(function (resource) {
                                return staff.Staff.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_3 = _a.sent();
                        throw new staff.StaffsFetchRemoteError(undefined, { error: err_3 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Universe.prototype.assets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universeBase + "/" + asset.Assets.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2 /*return*/, resources.map(function (resource) {
                                return asset.Asset.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_4 = _a.sent();
                        throw new asset.AssetsFetchRemoteError(undefined, { error: err_4 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Universe.prototype.people = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, resources, err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universeBase + "/" + person.People.endpoint)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2 /*return*/, resources.map(function (resource) {
                                return person.Person.create(resource, _this, _this.http);
                            })];
                    case 2:
                        err_5 = _a.sent();
                        throw new person.PeopleFetchRemoteError(undefined, { error: err_5 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // hygen:handler:injection -  Please, don't delete this line: when running the cli for crud resources the new routes will be automatically added here.
    /**
     * Arm the client by retrieving latest data. Arming emits to the server and listens for the response once.
     */
    Universe.prototype.arm = function () {
        var _this = this;
        var mqtt = this.getMqttClient();
        var topicString = topics_1.default.api.clients.arm.generateTopic({ client: uuid.v4() });
        // NOTE: this requires unsubscribing from this topic in the armed listener
        mqtt.subscribe(topicString, function (err) {
            if (err) {
                return _this.handleError(err);
            }
            mqtt.publish(topicString);
        });
        return this;
    };
    Universe.endpoint = 'api/v0/universes';
    return Universe;
}(readable_stream_1.Readable));
exports.Universe = Universe;
var UnviverseSingleton = /** @class */ (function (_super) {
    __extends(UnviverseSingleton, _super);
    function UnviverseSingleton(options) {
        return _super.call(this, options) || this;
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
var UniverseInitializationError = /** @class */ (function (_super) {
    __extends(UniverseInitializationError, _super);
    function UniverseInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize universe'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseInitializationError';
        return _this;
    }
    return UniverseInitializationError;
}(errors_1.BaseError));
exports.UniverseInitializationError = UniverseInitializationError;
//# sourceMappingURL=index.js.map