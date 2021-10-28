"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsFetchRemoteError = exports.TagFetchRemoteError = exports.TagInitializationError = exports.Tags = exports.Tag = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var Tag = (function (_super) {
    tslib_1.__extends(Tag, _super);
    function Tag(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/tags';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Tag.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.label = rawPayload.label;
        this.object = rawPayload.object;
        this.description = rawPayload.description;
        this.tagGroup = rawPayload.tag_group;
        return this;
    };
    Tag.create = function (payload, universe, http) {
        return new Tag({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Tag.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            label: this.label,
            object: this.object,
            description: this.description,
            tag_group: this.tagGroup
        };
    };
    Tag.prototype.init = function () {
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
                        throw this.handleError(new TagInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Tag;
}(_base_1.UniverseEntity));
exports.Tag = Tag;
var Tags = (function () {
    function Tags() {
    }
    Tags.endpoint = 'api/v0/tags';
    return Tags;
}());
exports.Tags = Tags;
var TagInitializationError = (function (_super) {
    tslib_1.__extends(TagInitializationError, _super);
    function TagInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize tag.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagInitializationError';
        Object.setPrototypeOf(_this, TagInitializationError.prototype);
        return _this;
    }
    return TagInitializationError;
}(errors_1.BaseError));
exports.TagInitializationError = TagInitializationError;
var TagFetchRemoteError = (function (_super) {
    tslib_1.__extends(TagFetchRemoteError, _super);
    function TagFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get tag.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagFetchRemoteError';
        Object.setPrototypeOf(_this, TagFetchRemoteError.prototype);
        return _this;
    }
    return TagFetchRemoteError;
}(errors_1.BaseError));
exports.TagFetchRemoteError = TagFetchRemoteError;
var TagsFetchRemoteError = (function (_super) {
    tslib_1.__extends(TagsFetchRemoteError, _super);
    function TagsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get tags.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagsFetchRemoteError';
        Object.setPrototypeOf(_this, TagsFetchRemoteError.prototype);
        return _this;
    }
    return TagsFetchRemoteError;
}(errors_1.BaseError));
exports.TagsFetchRemoteError = TagsFetchRemoteError;
//# sourceMappingURL=tag.js.map