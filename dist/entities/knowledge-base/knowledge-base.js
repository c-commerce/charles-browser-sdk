"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBasesFetchRemoteError = exports.KnowledgeBaseFetchRemoteError = exports.KnowledgeBaseInitializationError = exports.KnowledgeBases = exports.KnowledgeBase = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var knowledgeBaseFaqItem = tslib_1.__importStar(require("../knowledge-base-faq-item/knowledge-base-faq-item"));
var KnowledgeBase = (function (_super) {
    tslib_1.__extends(KnowledgeBase, _super);
    function KnowledgeBase(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/knowledge_bases';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    KnowledgeBase.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.name = rawPayload.name;
        this.metadata = rawPayload.metadata;
        this.configuration = rawPayload.configuration;
        this.labels = rawPayload.labels;
        this.nlu = rawPayload.nlu;
        this.isProxy = rawPayload.is_proxy;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.proxyPayload = rawPayload.proxy_payload;
        return this;
    };
    KnowledgeBase.create = function (payload, universe, http) {
        return new KnowledgeBase({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    KnowledgeBase.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            external_reference_id: this.externalReferenceId,
            name: this.name,
            metadata: this.metadata,
            configuration: this.configuration,
            labels: this.labels,
            nlu: this.nlu,
            is_proxy: this.isProxy,
            proxy_vendor: this.proxyVendor,
            proxy_payload: this.proxyPayload
        };
    };
    KnowledgeBase.prototype.init = function () {
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
                        throw this.handleError(new KnowledgeBaseInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    KnowledgeBase.prototype.knowledgeBaseFaqItems = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.id)
                            throw new TypeError('fetching knowledge base faq items requires knowledge base id to be set');
                        opts = tslib_1.__assign(tslib_1.__assign({}, options), { query: tslib_1.__assign(tslib_1.__assign({}, options === null || options === void 0 ? void 0 : options.query), { knowledge_base: this.id }) });
                        return [4, this.universe.makeBaseResourceListRequest(knowledgeBaseFaqItem.KnowledgeBaseFaqItem, knowledgeBaseFaqItem.KnowledgeBaseFaqItems, knowledgeBaseFaqItem.KnowledgeBaseFaqItemsFetchRemoteError, opts)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return KnowledgeBase;
}(_base_1.UniverseEntity));
exports.KnowledgeBase = KnowledgeBase;
var KnowledgeBases = (function () {
    function KnowledgeBases() {
    }
    KnowledgeBases.endpoint = 'api/v0/knowledge_bases';
    return KnowledgeBases;
}());
exports.KnowledgeBases = KnowledgeBases;
var KnowledgeBaseInitializationError = (function (_super) {
    tslib_1.__extends(KnowledgeBaseInitializationError, _super);
    function KnowledgeBaseInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize knowledge_basis.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'KnowledgeBaseInitializationError';
        Object.setPrototypeOf(_this, KnowledgeBaseInitializationError.prototype);
        return _this;
    }
    return KnowledgeBaseInitializationError;
}(errors_1.BaseError));
exports.KnowledgeBaseInitializationError = KnowledgeBaseInitializationError;
var KnowledgeBaseFetchRemoteError = (function (_super) {
    tslib_1.__extends(KnowledgeBaseFetchRemoteError, _super);
    function KnowledgeBaseFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get knowledge_basis.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'KnowledgeBaseFetchRemoteError';
        Object.setPrototypeOf(_this, KnowledgeBaseFetchRemoteError.prototype);
        return _this;
    }
    return KnowledgeBaseFetchRemoteError;
}(errors_1.BaseError));
exports.KnowledgeBaseFetchRemoteError = KnowledgeBaseFetchRemoteError;
var KnowledgeBasesFetchRemoteError = (function (_super) {
    tslib_1.__extends(KnowledgeBasesFetchRemoteError, _super);
    function KnowledgeBasesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get knowledge_bases.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'KnowledgeBasesFetchRemoteError';
        Object.setPrototypeOf(_this, KnowledgeBasesFetchRemoteError.prototype);
        return _this;
    }
    return KnowledgeBasesFetchRemoteError;
}(errors_1.BaseError));
exports.KnowledgeBasesFetchRemoteError = KnowledgeBasesFetchRemoteError;
//# sourceMappingURL=knowledge-base.js.map