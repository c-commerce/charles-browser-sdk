"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../../entities/_base");
var Comment = (function (_super) {
    tslib_1.__extends(Comment, _super);
    function Comment(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.feed = options.feed;
        _this.endpoint = _this.feed.id + "/comments";
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Comment.prototype.deserialize = function (rawPayload) {
        var _a;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.content = rawPayload.content;
        return this;
    };
    Comment.create = function (payload, feed, universe, http) {
        return new Comment({ rawPayload: payload, universe: universe, http: http, initialized: true, feed: feed });
    };
    Comment.createUninitialized = function (payload, feed, universe, http) {
        return new Comment({ rawPayload: payload, universe: universe, http: http, initialized: false, feed: feed });
    };
    Comment.prototype.serialize = function () {
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: this.deleted,
            content: this.content
        };
    };
    return Comment;
}(_base_1.UniverseEntity));
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map