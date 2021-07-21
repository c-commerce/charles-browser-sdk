"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUnflagRemoteError = exports.EventUnarkRemoteError = exports.EventUnmarkRemoteError = exports.EventMarkRemoteError = exports.EventFetchRemoteError = exports.EventInitializationError = exports.Event = exports.EventResourcesTypesEnum = exports.EventTypesEnum = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../../errors");
var _base_1 = require("../../entities/_base");
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
var Event = (function (_super) {
    tslib_1.__extends(Event, _super);
    function Event(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this._feed = options.feed;
        _this.endpoint = _this._feed.id + "/events";
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Event.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        if (!this.id)
            this.id = rawPayload.id;
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.resource = rawPayload.resource;
        this.resourceType = rawPayload.resource_type;
        this.type = rawPayload.type;
        this.marked = rawPayload.marked;
        this.flagged = rawPayload.flagged;
        this.annotations = rawPayload.annotations;
        this.suggestions = rawPayload.suggestions;
        this.context = rawPayload.context;
        this.feed = rawPayload.feed;
        if (this.payload && !rawPayload.payload) {
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
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            resource: this.resource,
            resource_type: this.resourceType,
            payload: this.payload,
            type: this.type,
            flagged: this.flagged,
            marked: this.marked,
            annotations: this.annotations,
            suggestions: this.suggestions,
            context: this.context,
            feed: this.feed
        };
    };
    Event.prototype.init = function () {
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
                        throw this.handleError(new EventInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.prototype.mark = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/mark")];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 2:
                        err_2 = _a.sent();
                        throw this.handleError(new EventMarkRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.prototype.unmark = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/unmark")];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 2:
                        err_3 = _a.sent();
                        throw this.handleError(new EventUnmarkRemoteError(undefined, { error: err_3 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.prototype.flag = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/flag")];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 2:
                        err_4 = _a.sent();
                        throw this.handleError(new EventUnarkRemoteError(undefined, { error: err_4 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.prototype.unflag = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/unflag")];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 2:
                        err_5 = _a.sent();
                        throw this.handleError(new EventUnflagRemoteError(undefined, { error: err_5 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.eventTypes = EventTypesEnum;
    return Event;
}(_base_1.UniverseEntity));
exports.Event = Event;
var EventInitializationError = (function (_super) {
    tslib_1.__extends(EventInitializationError, _super);
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
var EventFetchRemoteError = (function (_super) {
    tslib_1.__extends(EventFetchRemoteError, _super);
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
var EventMarkRemoteError = (function (_super) {
    tslib_1.__extends(EventMarkRemoteError, _super);
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
var EventUnmarkRemoteError = (function (_super) {
    tslib_1.__extends(EventUnmarkRemoteError, _super);
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
var EventUnarkRemoteError = (function (_super) {
    tslib_1.__extends(EventUnarkRemoteError, _super);
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
var EventUnflagRemoteError = (function (_super) {
    tslib_1.__extends(EventUnflagRemoteError, _super);
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