"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var MessageTemplateCategory = (function (_super) {
    tslib_1.__extends(MessageTemplateCategory, _super);
    function MessageTemplateCategory(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/message_template_categories';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    MessageTemplateCategory.prototype.deserialize = function (rawPayload) {
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
        this.customId = rawPayload.custom_id;
        return this;
    };
    MessageTemplateCategory.create = function (payload, universe, http) {
        return new MessageTemplateCategory({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    MessageTemplateCategory.prototype.serialize = function () {
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
            custom_id: this.customId
        };
    };
    MessageTemplateCategory.prototype.init = function () {
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
                        throw this.handleError(new MessageTemplateCategoryInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return MessageTemplateCategory;
}(_base_1.default));
exports.MessageTemplateCategory = MessageTemplateCategory;
var MessageTemplateCategories = (function () {
    function MessageTemplateCategories() {
    }
    MessageTemplateCategories.endpoint = 'api/v0/message_template_categories';
    return MessageTemplateCategories;
}());
exports.MessageTemplateCategories = MessageTemplateCategories;
var MessageTemplateCategoryInitializationError = (function (_super) {
    tslib_1.__extends(MessageTemplateCategoryInitializationError, _super);
    function MessageTemplateCategoryInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize product category.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplateCategoryInitializationError';
        Object.setPrototypeOf(_this, MessageTemplateCategoryInitializationError.prototype);
        return _this;
    }
    return MessageTemplateCategoryInitializationError;
}(errors_1.BaseError));
exports.MessageTemplateCategoryInitializationError = MessageTemplateCategoryInitializationError;
var MessageTemplateCategoryFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageTemplateCategoryFetchRemoteError, _super);
    function MessageTemplateCategoryFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get product category.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplateCategoryFetchRemoteError';
        Object.setPrototypeOf(_this, MessageTemplateCategoryFetchRemoteError.prototype);
        return _this;
    }
    return MessageTemplateCategoryFetchRemoteError;
}(errors_1.BaseError));
exports.MessageTemplateCategoryFetchRemoteError = MessageTemplateCategoryFetchRemoteError;
var MessageTemplateCategoriesFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageTemplateCategoriesFetchRemoteError, _super);
    function MessageTemplateCategoriesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get product categories.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplateCategoriesFetchRemoteError';
        Object.setPrototypeOf(_this, MessageTemplateCategoriesFetchRemoteError.prototype);
        return _this;
    }
    return MessageTemplateCategoriesFetchRemoteError;
}(errors_1.BaseError));
exports.MessageTemplateCategoriesFetchRemoteError = MessageTemplateCategoriesFetchRemoteError;
//# sourceMappingURL=message-template-category.js.map