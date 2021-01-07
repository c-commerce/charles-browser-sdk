"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagGroupsFetchRemoteError = exports.TagGroupFetchRemoteError = exports.TagGroupInitializationError = exports.TagGroups = exports.TagGroup = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var TagGroup = (function (_super) {
    tslib_1.__extends(TagGroup, _super);
    function TagGroup(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/tag_groups';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    TagGroup.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.label = rawPayload.label;
        this.color = rawPayload.color;
        this.description = rawPayload.description;
        return this;
    };
    TagGroup.create = function (payload, universe, http) {
        return new TagGroup({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    TagGroup.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            label: this.label,
            color: this.color,
            description: this.description
        };
    };
    TagGroup.prototype.init = function () {
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
                        throw this.handleError(new TagGroupInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return TagGroup;
}(_base_1.default));
exports.TagGroup = TagGroup;
var TagGroups = (function () {
    function TagGroups() {
    }
    TagGroups.endpoint = 'api/v0/tag_groups';
    return TagGroups;
}());
exports.TagGroups = TagGroups;
var TagGroupInitializationError = (function (_super) {
    tslib_1.__extends(TagGroupInitializationError, _super);
    function TagGroupInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize tag group.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagGroupInitializationError';
        Object.setPrototypeOf(_this, TagGroupInitializationError.prototype);
        return _this;
    }
    return TagGroupInitializationError;
}(errors_1.BaseError));
exports.TagGroupInitializationError = TagGroupInitializationError;
var TagGroupFetchRemoteError = (function (_super) {
    tslib_1.__extends(TagGroupFetchRemoteError, _super);
    function TagGroupFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get tag group.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagGroupFetchRemoteError';
        Object.setPrototypeOf(_this, TagGroupFetchRemoteError.prototype);
        return _this;
    }
    return TagGroupFetchRemoteError;
}(errors_1.BaseError));
exports.TagGroupFetchRemoteError = TagGroupFetchRemoteError;
var TagGroupsFetchRemoteError = (function (_super) {
    tslib_1.__extends(TagGroupsFetchRemoteError, _super);
    function TagGroupsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get tag groups.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagGroupsFetchRemoteError';
        Object.setPrototypeOf(_this, TagGroupsFetchRemoteError.prototype);
        return _this;
    }
    return TagGroupsFetchRemoteError;
}(errors_1.BaseError));
exports.TagGroupsFetchRemoteError = TagGroupsFetchRemoteError;
//# sourceMappingURL=tag-group.js.map