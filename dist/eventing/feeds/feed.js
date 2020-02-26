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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Feed = /** @class */ (function (_super) {
    __extends(Feed, _super);
    function Feed(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            _this.id = options.rawPayload.id;
            _this.participants = options.rawPayload.participants;
            _this.agents = options.rawPayload.agents;
            _this.parents = options.rawPayload.parents;
            _this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : undefined;
            _this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : undefined;
            _this.deleted = options.rawPayload.deleted;
            _this.active = options.rawPayload.active;
        }
        return _this;
    }
    Feed.deserialize = function (payload, universe, http) {
        return new Feed({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Feed.createUninitialized = function (payload, universe, http) {
        return new Feed({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    Feed.prototype.serialize = function () {
        return {
            id: this.id,
            participants: this.participants,
            agents: this.agents,
            parents: this.parents,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: this.deleted,
            active: this.active
        };
    };
    Feed.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    return Feed;
}(events_1.EventEmitter));
exports.Feed = Feed;
//# sourceMappingURL=feed.js.map