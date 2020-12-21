"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var NotificationCampaign = (function (_super) {
    tslib_1.__extends(NotificationCampaign, _super);
    function NotificationCampaign(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/notification_campaigns';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    NotificationCampaign.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.summary = rawPayload.summary;
        this.isPublished = rawPayload.is_published;
        this.publishedAt = rawPayload.published_at;
        this.messageTemplate = rawPayload.message_template;
        this.includes = rawPayload.includes;
        this.excludes = rawPayload.excludes;
        this.status = rawPayload.status;
        this.statusses = rawPayload.statusses;
        this.schedule = rawPayload.schedule;
        this.execution = rawPayload.execution;
        this.author = rawPayload.author;
        this.publisher = rawPayload.publisher;
        this.isArmed = rawPayload.is_armed;
        this.isDraft = rawPayload.is_draft;
        return this;
    };
    NotificationCampaign.create = function (payload, universe, http) {
        return new NotificationCampaign({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    NotificationCampaign.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            summary: this.summary,
            is_published: this.isPublished,
            published_at: this.publishedAt,
            message_template: this.messageTemplate,
            includes: this.includes,
            excludes: this.excludes,
            status: this.status,
            statusses: this.statusses,
            schedule: this.schedule,
            execution: this.execution,
            author: this.author,
            publisher: this.publisher,
            is_armed: this.isArmed,
            is_draft: this.isDraft
        };
    };
    NotificationCampaign.prototype.init = function () {
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
                        throw this.handleError(new NotificationCampaignInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return NotificationCampaign;
}(_base_1.default));
exports.NotificationCampaign = NotificationCampaign;
var NotificationCampaigns = (function () {
    function NotificationCampaigns() {
    }
    NotificationCampaigns.endpoint = 'api/v0/notification_campaigns';
    return NotificationCampaigns;
}());
exports.NotificationCampaigns = NotificationCampaigns;
var NotificationCampaignInitializationError = (function (_super) {
    tslib_1.__extends(NotificationCampaignInitializationError, _super);
    function NotificationCampaignInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize notification_campaign.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignInitializationError';
        Object.setPrototypeOf(_this, NotificationCampaignInitializationError.prototype);
        return _this;
    }
    return NotificationCampaignInitializationError;
}(errors_1.BaseError));
exports.NotificationCampaignInitializationError = NotificationCampaignInitializationError;
var NotificationCampaignFetchRemoteError = (function (_super) {
    tslib_1.__extends(NotificationCampaignFetchRemoteError, _super);
    function NotificationCampaignFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get notification_campaign.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignFetchRemoteError';
        Object.setPrototypeOf(_this, NotificationCampaignFetchRemoteError.prototype);
        return _this;
    }
    return NotificationCampaignFetchRemoteError;
}(errors_1.BaseError));
exports.NotificationCampaignFetchRemoteError = NotificationCampaignFetchRemoteError;
var NotificationCampaignsFetchRemoteError = (function (_super) {
    tslib_1.__extends(NotificationCampaignsFetchRemoteError, _super);
    function NotificationCampaignsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get notification_campaigns.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignsFetchRemoteError';
        Object.setPrototypeOf(_this, NotificationCampaignsFetchRemoteError.prototype);
        return _this;
    }
    return NotificationCampaignsFetchRemoteError;
}(errors_1.BaseError));
exports.NotificationCampaignsFetchRemoteError = NotificationCampaignsFetchRemoteError;
var NotificationCampaignsFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(NotificationCampaignsFetchCountRemoteError, _super);
    function NotificationCampaignsFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get notification_campaigns count.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignsFetchCountRemoteError';
        Object.setPrototypeOf(_this, NotificationCampaignsFetchCountRemoteError.prototype);
        return _this;
    }
    return NotificationCampaignsFetchCountRemoteError;
}(errors_1.BaseError));
exports.NotificationCampaignsFetchCountRemoteError = NotificationCampaignsFetchCountRemoteError;
//# sourceMappingURL=notification-campaign.js.map