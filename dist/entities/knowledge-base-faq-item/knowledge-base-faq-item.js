"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBaseFaqItemsFetchRemoteError = exports.KnowledgeBaseFaqItemFetchRemoteError = exports.KnowledgeBaseFaqItemInitializationError = exports.KnowledgeBaseFaqItems = exports.KnowledgeBaseFaqItem = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var KnowledgeBaseFaqItem = (function (_super) {
    tslib_1.__extends(KnowledgeBaseFaqItem, _super);
    function KnowledgeBaseFaqItem(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/knowledge_base_faq_items';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    KnowledgeBaseFaqItem.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.locale = rawPayload.locale;
        this.question = rawPayload.question;
        this.answer = rawPayload.answer;
        this.knowledgeBase = rawPayload.knowledge_base;
        this.isProxy = rawPayload.is_proxy;
        this.proxyPayload = rawPayload.proxy_payload;
        return this;
    };
    KnowledgeBaseFaqItem.create = function (payload, universe, http) {
        return new KnowledgeBaseFaqItem({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    KnowledgeBaseFaqItem.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            locale: this.locale,
            question: this.question,
            answer: this.answer,
            knowledge_base: this.knowledgeBase,
            is_proxy: this.isProxy,
            proxy_payload: this.proxyPayload
        };
    };
    KnowledgeBaseFaqItem.prototype.init = function () {
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
                        throw this.handleError(new KnowledgeBaseFaqItemInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return KnowledgeBaseFaqItem;
}(_base_1.default));
exports.KnowledgeBaseFaqItem = KnowledgeBaseFaqItem;
var KnowledgeBaseFaqItems = (function () {
    function KnowledgeBaseFaqItems() {
    }
    KnowledgeBaseFaqItems.endpoint = 'api/v0/knowledge_base_faq_items';
    return KnowledgeBaseFaqItems;
}());
exports.KnowledgeBaseFaqItems = KnowledgeBaseFaqItems;
var KnowledgeBaseFaqItemInitializationError = (function (_super) {
    tslib_1.__extends(KnowledgeBaseFaqItemInitializationError, _super);
    function KnowledgeBaseFaqItemInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize knowledge_base_faq_item.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'KnowledgeBaseFaqItemInitializationError';
        Object.setPrototypeOf(_this, KnowledgeBaseFaqItemInitializationError.prototype);
        return _this;
    }
    return KnowledgeBaseFaqItemInitializationError;
}(errors_1.BaseError));
exports.KnowledgeBaseFaqItemInitializationError = KnowledgeBaseFaqItemInitializationError;
var KnowledgeBaseFaqItemFetchRemoteError = (function (_super) {
    tslib_1.__extends(KnowledgeBaseFaqItemFetchRemoteError, _super);
    function KnowledgeBaseFaqItemFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get knowledge_base_faq_item.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'KnowledgeBaseFaqItemFetchRemoteError';
        Object.setPrototypeOf(_this, KnowledgeBaseFaqItemFetchRemoteError.prototype);
        return _this;
    }
    return KnowledgeBaseFaqItemFetchRemoteError;
}(errors_1.BaseError));
exports.KnowledgeBaseFaqItemFetchRemoteError = KnowledgeBaseFaqItemFetchRemoteError;
var KnowledgeBaseFaqItemsFetchRemoteError = (function (_super) {
    tslib_1.__extends(KnowledgeBaseFaqItemsFetchRemoteError, _super);
    function KnowledgeBaseFaqItemsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get knowledge_base_faq_items.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'KnowledgeBaseFaqItemsFetchRemoteError';
        Object.setPrototypeOf(_this, KnowledgeBaseFaqItemsFetchRemoteError.prototype);
        return _this;
    }
    return KnowledgeBaseFaqItemsFetchRemoteError;
}(errors_1.BaseError));
exports.KnowledgeBaseFaqItemsFetchRemoteError = KnowledgeBaseFaqItemsFetchRemoteError;
//# sourceMappingURL=knowledge-base-faq-item.js.map