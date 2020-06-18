"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
var Event = (function (_super) {
    tslib_1.__extends(Event, _super);
    function Event(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.feed = options.feed;
        _this.endpoint = _this.feed.id + "/events";
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Event.prototype.deserialize = function (rawPayload) {
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
        this.suggestions = rawPayload.suggestions;
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
            annotations: this.annotations,
            suggestions: this.suggestions
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
    Event.prototype.fetch = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id)];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 2:
                        err_2 = _a.sent();
                        throw this.handleError(new EventFetchRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.prototype.mark = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_3;
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
                        err_3 = _a.sent();
                        throw this.handleError(new EventMarkRemoteError(undefined, { error: err_3 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.prototype.unmark = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_4;
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
                        err_4 = _a.sent();
                        throw this.handleError(new EventUnmarkRemoteError(undefined, { error: err_4 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.prototype.flag = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_5;
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
                        err_5 = _a.sent();
                        throw this.handleError(new EventUnarkRemoteError(undefined, { error: err_5 }));
                    case 3: return [2];
                }
            });
        });
    };
    Event.prototype.unflag = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, err_6;
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
                        err_6 = _a.sent();
                        throw this.handleError(new EventUnflagRemoteError(undefined, { error: err_6 }));
                    case 3: return [2];
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