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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var errors_1 = require("../../errors");
var EventTypesEnum;
(function (EventTypesEnum) {
    EventTypesEnum["resource"] = "resource";
    EventTypesEnum["followUp"] = "follow_up";
    EventTypesEnum["personFeedbackPending"] = "person:feedback_pending";
    EventTypesEnum["conversationCompleted"] = "conversation:completed";
    EventTypesEnum["agentView"] = "agent:view";
})(EventTypesEnum = exports.EventTypesEnum || (exports.EventTypesEnum = {}));
var EventResourcesTypesEnum;
(function (EventResourcesTypesEnum) {
    EventResourcesTypesEnum["message"] = "message";
    EventResourcesTypesEnum["merge"] = "merge";
    EventResourcesTypesEnum["order"] = "order";
    EventResourcesTypesEnum["cart"] = "cart";
})(EventResourcesTypesEnum = exports.EventResourcesTypesEnum || (exports.EventResourcesTypesEnum = {}));
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.feed = options.feed;
        _this.endpoint = _this.feed.id + "/events";
        _this.http = options.http;
        _this.options = options;
        _this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Event.prototype.deserialize = function (rawPayload) {
        // NOTE: in order not to trigger potential callers reactivity, we only set the ID if it is not set.
        // in any case the overriding behaviour would be unwanted, but is harder to achieve in a or our TS setup
        if (!this.id)
            this.id = rawPayload.id;
        this.id = rawPayload.id;
        this.resource = rawPayload.resource;
        this.resourceType = rawPayload.resource_type;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.type = rawPayload.type;
        this.marked = rawPayload.marked;
        this.flagged = rawPayload.flagged;
        this.annotations = rawPayload.annotations;
        // for the time being we are trying not to override existing data if the remote is not sending any
        // e.g. in special calls
        if (this.payload && !rawPayload.payload) {
            // no-op
        }
        else {
            this.payload = rawPayload.payload;
        }
        return this;
    };
    Event.create = function (payload, feed, universe, http) {
        return new Event({ rawPayload: payload, universe: universe, http: http, initialized: true, feed: feed });
    };
    Event.createUninitialized = function (payload, feed, universe, http) {
        return new Event({ rawPayload: payload, universe: universe, http: http, initialized: false, feed: feed });
    };
    Event.prototype.serialize = function () {
        return {
            id: this.id,
            resource: this.resource,
            resource_type: this.resourceType,
            payload: this.payload,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            type: this.type,
            flagged: this.flagged,
            marked: this.marked,
            annotations: this.annotations
        };
    };
    Event.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetch()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                    case 2:
                        err_1 = _a.sent();
                        throw this.handleError(new EventInitializationError(undefined, { error: err_1 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Event.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id)];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2 /*return*/, this];
                    case 2:
                        err_2 = _a.sent();
                        throw this.handleError(new EventFetchRemoteError(undefined, { error: err_2 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Event.prototype.mark = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/mark")];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2 /*return*/, this];
                    case 2:
                        err_3 = _a.sent();
                        throw this.handleError(new EventMarkRemoteError(undefined, { error: err_3 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Event.prototype.unmark = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/unmark")];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2 /*return*/, this];
                    case 2:
                        err_4 = _a.sent();
                        throw this.handleError(new EventUnmarkRemoteError(undefined, { error: err_4 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Event.prototype.flag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/flag")];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2 /*return*/, this];
                    case 2:
                        err_5 = _a.sent();
                        throw this.handleError(new EventUnarkRemoteError(undefined, { error: err_5 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Event.prototype.unflag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/unflag")];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2 /*return*/, this];
                    case 2:
                        err_6 = _a.sent();
                        throw this.handleError(new EventUnflagRemoteError(undefined, { error: err_6 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Event.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
        return err;
    };
    Event.eventTypes = EventTypesEnum;
    return Event;
}(events_1.EventEmitter));
exports.Event = Event;
var EventInitializationError = /** @class */ (function (_super) {
    __extends(EventInitializationError, _super);
    function EventInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EventInitializationError';
        return _this;
    }
    return EventInitializationError;
}(errors_1.BaseError));
exports.EventInitializationError = EventInitializationError;
var EventFetchRemoteError = /** @class */ (function (_super) {
    __extends(EventFetchRemoteError, _super);
    function EventFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EventFetchRemoteError';
        return _this;
    }
    return EventFetchRemoteError;
}(errors_1.BaseError));
exports.EventFetchRemoteError = EventFetchRemoteError;
var EventMarkRemoteError = /** @class */ (function (_super) {
    __extends(EventMarkRemoteError, _super);
    function EventMarkRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not mark event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EventMarkRemoteError';
        return _this;
    }
    return EventMarkRemoteError;
}(errors_1.BaseError));
exports.EventMarkRemoteError = EventMarkRemoteError;
var EventUnmarkRemoteError = /** @class */ (function (_super) {
    __extends(EventUnmarkRemoteError, _super);
    function EventUnmarkRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not unmark event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EventUnmarkRemoteError';
        return _this;
    }
    return EventUnmarkRemoteError;
}(errors_1.BaseError));
exports.EventUnmarkRemoteError = EventUnmarkRemoteError;
var EventUnarkRemoteError = /** @class */ (function (_super) {
    __extends(EventUnarkRemoteError, _super);
    function EventUnarkRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not flag event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EventUnarkRemoteError';
        return _this;
    }
    return EventUnarkRemoteError;
}(errors_1.BaseError));
exports.EventUnarkRemoteError = EventUnarkRemoteError;
var EventUnflagRemoteError = /** @class */ (function (_super) {
    __extends(EventUnflagRemoteError, _super);
    function EventUnflagRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not unflag event.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EventUnflagRemoteError';
        return _this;
    }
    return EventUnflagRemoteError;
}(errors_1.BaseError));
exports.EventUnflagRemoteError = EventUnflagRemoteError;
//# sourceMappingURL=event.js.map