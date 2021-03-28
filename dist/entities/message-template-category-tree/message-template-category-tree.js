"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplateCategoryTreesFetchRemoteError = exports.MessageTemplateCategoryTreeFetchRemoteError = exports.MessageTemplateCategoryTreeInitializationError = exports.MessageTemplateCategoryTrees = exports.MessageTemplateCategoryTree = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var MessageTemplateCategoryTree = (function (_super) {
    tslib_1.__extends(MessageTemplateCategoryTree, _super);
    function MessageTemplateCategoryTree(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/message_template_category_trees';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    MessageTemplateCategoryTree.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.summary = rawPayload.summary;
        this.description = rawPayload.description;
        this.comment = rawPayload.comment;
        this.children = rawPayload.children;
        return this;
    };
    MessageTemplateCategoryTree.create = function (payload, universe, http) {
        return new MessageTemplateCategoryTree({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    MessageTemplateCategoryTree.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            summary: this.summary,
            description: this.description,
            comment: this.comment,
            children: this.children
        };
    };
    MessageTemplateCategoryTree.prototype.init = function () {
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
                        throw this.handleError(new MessageTemplateCategoryTreeInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return MessageTemplateCategoryTree;
}(_base_1.UniverseEntity));
exports.MessageTemplateCategoryTree = MessageTemplateCategoryTree;
var MessageTemplateCategoryTrees = (function () {
    function MessageTemplateCategoryTrees() {
    }
    MessageTemplateCategoryTrees.endpoint = 'api/v0/message_template_category_trees';
    return MessageTemplateCategoryTrees;
}());
exports.MessageTemplateCategoryTrees = MessageTemplateCategoryTrees;
var MessageTemplateCategoryTreeInitializationError = (function (_super) {
    tslib_1.__extends(MessageTemplateCategoryTreeInitializationError, _super);
    function MessageTemplateCategoryTreeInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize message template category tree.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplateCategoryTreeInitializationError';
        Object.setPrototypeOf(_this, MessageTemplateCategoryTreeInitializationError.prototype);
        return _this;
    }
    return MessageTemplateCategoryTreeInitializationError;
}(errors_1.BaseError));
exports.MessageTemplateCategoryTreeInitializationError = MessageTemplateCategoryTreeInitializationError;
var MessageTemplateCategoryTreeFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageTemplateCategoryTreeFetchRemoteError, _super);
    function MessageTemplateCategoryTreeFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get message template category tree.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplateCategoryTreeFetchRemoteError';
        Object.setPrototypeOf(_this, MessageTemplateCategoryTreeFetchRemoteError.prototype);
        return _this;
    }
    return MessageTemplateCategoryTreeFetchRemoteError;
}(errors_1.BaseError));
exports.MessageTemplateCategoryTreeFetchRemoteError = MessageTemplateCategoryTreeFetchRemoteError;
var MessageTemplateCategoryTreesFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageTemplateCategoryTreesFetchRemoteError, _super);
    function MessageTemplateCategoryTreesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get message template category trees.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplateCategoryTreesFetchRemoteError';
        Object.setPrototypeOf(_this, MessageTemplateCategoryTreesFetchRemoteError.prototype);
        return _this;
    }
    return MessageTemplateCategoryTreesFetchRemoteError;
}(errors_1.BaseError));
exports.MessageTemplateCategoryTreesFetchRemoteError = MessageTemplateCategoryTreesFetchRemoteError;
//# sourceMappingURL=message-template-category-tree.js.map