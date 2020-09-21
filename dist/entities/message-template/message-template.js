"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var MessageTemplate = (function (_super) {
    tslib_1.__extends(MessageTemplate, _super);
    function MessageTemplate(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/message_templates';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    MessageTemplate.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.isProxy = rawPayload.is_proxy;
        this.approved = rawPayload.approved;
        this.name = rawPayload.name;
        this.comment = rawPayload.comment;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.categories = rawPayload.categories;
        this.parametersTemplate = rawPayload.parameters_template;
        this.content = rawPayload.content;
        this.configuration = rawPayload.configuration;
        this.payload = rawPayload.payload;
        this.metadata = rawPayload.metadata;
        this.notification = rawPayload.notification;
        this.contentCategory = rawPayload.content_category;
        return this;
    };
    MessageTemplate.create = function (payload, universe, http) {
        return new MessageTemplate({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    MessageTemplate.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            is_proxy: this.isProxy,
            approved: this.approved,
            name: this.name,
            comment: this.comment,
            proxy_vendor: this.proxyVendor,
            categories: this.categories,
            parameters_template: this.parametersTemplate,
            content: this.content,
            configuration: this.configuration,
            payload: this.payload,
            metadata: this.metadata,
            notification: this.notification,
            content_category: this.contentCategory
        };
    };
    MessageTemplate.prototype.init = function () {
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
                        throw this.handleError(new MessageTemplateInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    MessageTemplate.prototype.setup = function (payload) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resource, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/submit",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: payload,
                            responseType: 'json'
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _b.sent();
                        resource = res.data.data;
                        return [2, MessageTemplate.create(resource, this.universe, this.http)];
                    case 2:
                        err_2 = _b.sent();
                        throw new MessageBrokerSubmitRemoteError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return MessageTemplate;
}(_base_1.default));
exports.MessageTemplate = MessageTemplate;
var MessageTemplates = (function () {
    function MessageTemplates() {
    }
    MessageTemplates.endpoint = 'api/v0/message_templates';
    return MessageTemplates;
}());
exports.MessageTemplates = MessageTemplates;
var MessageTemplateInitializationError = (function (_super) {
    tslib_1.__extends(MessageTemplateInitializationError, _super);
    function MessageTemplateInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize messagetemplate.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplateInitializationError';
        return _this;
    }
    return MessageTemplateInitializationError;
}(errors_1.BaseError));
exports.MessageTemplateInitializationError = MessageTemplateInitializationError;
var MessageTemplateFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageTemplateFetchRemoteError, _super);
    function MessageTemplateFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get messagetemplate.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplateFetchRemoteError';
        return _this;
    }
    return MessageTemplateFetchRemoteError;
}(errors_1.BaseError));
exports.MessageTemplateFetchRemoteError = MessageTemplateFetchRemoteError;
var MessageTemplatesFetchRemoteError = (function (_super) {
    tslib_1.__extends(MessageTemplatesFetchRemoteError, _super);
    function MessageTemplatesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get messagetemplates.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageTemplatesFetchRemoteError';
        return _this;
    }
    return MessageTemplatesFetchRemoteError;
}(errors_1.BaseError));
exports.MessageTemplatesFetchRemoteError = MessageTemplatesFetchRemoteError;
var MessageBrokerSubmitRemoteError = (function (_super) {
    tslib_1.__extends(MessageBrokerSubmitRemoteError, _super);
    function MessageBrokerSubmitRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not submit message template.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageBrokerSubmitRemoteError';
        return _this;
    }
    return MessageBrokerSubmitRemoteError;
}(errors_1.BaseError));
exports.MessageBrokerSubmitRemoteError = MessageBrokerSubmitRemoteError;
//# sourceMappingURL=message-template.js.map