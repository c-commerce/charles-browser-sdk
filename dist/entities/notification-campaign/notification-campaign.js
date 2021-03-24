"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCampaignGetFeedEventsError = exports.NotificationCampaignTestError = exports.NotificationCampaignPublishError = exports.NotificationCampaignArmError = exports.NotificationCampaignPreflightError = exports.NotificationCampaignsFetchCountRemoteError = exports.NotificationCampaignsFetchRemoteError = exports.NotificationCampaignFetchRemoteError = exports.NotificationCampaignInitializationError = exports.NotificationCampaigns = exports.NotificationCampaign = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var event_1 = require("../../eventing/feeds/event");
var qs_1 = tslib_1.__importDefault(require("qs"));
var feed_1 = require("../../eventing/feeds/feed");
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
        this.messageTemplateParameters = rawPayload.message_template_parameters;
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
        this.analytics = rawPayload.analytics;
        this.messageAuthor = rawPayload.message_author;
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
            message_template_parameters: this.messageTemplateParameters,
            includes: this.includes,
            excludes: this.excludes,
            status: this.status,
            statusses: this.statusses,
            schedule: this.schedule,
            execution: this.execution,
            author: this.author,
            publisher: this.publisher,
            is_armed: this.isArmed,
            is_draft: this.isDraft,
            default_language: this.defaultLanguage,
            analytics: this.analytics,
            message_author: this.messageAuthor
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
    NotificationCampaign.prototype.preflightCheck = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('campaign preflight check requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/preflight/check",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        res = _c.sent();
                        this.deserialize(res.data.data[0].notification_campaign);
                        return [2, this];
                    case 3:
                        err_2 = _c.sent();
                        throw new NotificationCampaignPreflightError(undefined, { error: err_2 });
                    case 4: return [2];
                }
            });
        });
    };
    NotificationCampaign.prototype.preflightArm = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_3;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('campaign preflight arm requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/preflight/arm",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        res = _c.sent();
                        this.deserialize(res.data.data[0].notification_campaign);
                        return [2, this];
                    case 3:
                        err_3 = _c.sent();
                        throw new NotificationCampaignArmError(undefined, { error: err_3 });
                    case 4: return [2];
                }
            });
        });
    };
    NotificationCampaign.prototype.publish = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, data, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('campaign publish requires id to be set.');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/publish",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, this.http.getClient()(opts)];
                    case 2:
                        res = _a.sent();
                        data = res.data.data[0];
                        return [2, this.deserialize(data)];
                    case 3:
                        err_4 = _a.sent();
                        throw new NotificationCampaignPublishError(undefined, { error: err_4 });
                    case 4: return [2];
                }
            });
        });
    };
    NotificationCampaign.prototype.test = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, data, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('campaign publish requires id to be set.');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/test",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json',
                            data: payload
                        };
                        return [4, this.http.getClient()(opts)];
                    case 2:
                        res = _a.sent();
                        data = res.data.data;
                        return [2, this.deserialize(data)];
                    case 3:
                        err_5 = _a.sent();
                        throw new NotificationCampaignTestError(undefined, { error: err_5 });
                    case 4: return [2];
                }
            });
        });
    };
    NotificationCampaign.prototype.getFeedEvents = function (options) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resources, _feed_1, err_6;
            var _this = this;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('notification campaign getFeedEvents requires id to be set.');
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'GET',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/feed_events" + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        res = _d.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        _feed_1 = feed_1.Feed.createUninitialized({ id: (_c = resources === null || resources === void 0 ? void 0 : resources[0]) === null || _c === void 0 ? void 0 : _c.feed }, this.universe, this.http, null);
                        return [2, resources.map(function (item) {
                                return event_1.Event.create(item, _feed_1, _this.universe, _this.http);
                            })];
                    case 3:
                        err_6 = _d.sent();
                        throw new NotificationCampaignGetFeedEventsError(undefined, { error: err_6 });
                    case 4: return [2];
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
var NotificationCampaignPreflightError = (function (_super) {
    tslib_1.__extends(NotificationCampaignPreflightError, _super);
    function NotificationCampaignPreflightError(message, properties) {
        if (message === void 0) { message = 'Could not do preflight check on campaign.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignPreflightError';
        Object.setPrototypeOf(_this, NotificationCampaignPreflightError.prototype);
        return _this;
    }
    return NotificationCampaignPreflightError;
}(errors_1.BaseError));
exports.NotificationCampaignPreflightError = NotificationCampaignPreflightError;
var NotificationCampaignArmError = (function (_super) {
    tslib_1.__extends(NotificationCampaignArmError, _super);
    function NotificationCampaignArmError(message, properties) {
        if (message === void 0) { message = 'Could not preflight arm notification_campaign.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignArmError';
        Object.setPrototypeOf(_this, NotificationCampaignArmError.prototype);
        return _this;
    }
    return NotificationCampaignArmError;
}(errors_1.BaseError));
exports.NotificationCampaignArmError = NotificationCampaignArmError;
var NotificationCampaignPublishError = (function (_super) {
    tslib_1.__extends(NotificationCampaignPublishError, _super);
    function NotificationCampaignPublishError(message, properties) {
        if (message === void 0) { message = 'Could not publish notification_campaign.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignPublishError';
        Object.setPrototypeOf(_this, NotificationCampaignPublishError.prototype);
        return _this;
    }
    return NotificationCampaignPublishError;
}(errors_1.BaseError));
exports.NotificationCampaignPublishError = NotificationCampaignPublishError;
var NotificationCampaignTestError = (function (_super) {
    tslib_1.__extends(NotificationCampaignTestError, _super);
    function NotificationCampaignTestError(message, properties) {
        if (message === void 0) { message = 'Could not test notification_campaign.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignTestError';
        Object.setPrototypeOf(_this, NotificationCampaignTestError.prototype);
        return _this;
    }
    return NotificationCampaignTestError;
}(errors_1.BaseError));
exports.NotificationCampaignTestError = NotificationCampaignTestError;
var NotificationCampaignGetFeedEventsError = (function (_super) {
    tslib_1.__extends(NotificationCampaignGetFeedEventsError, _super);
    function NotificationCampaignGetFeedEventsError(message, properties) {
        if (message === void 0) { message = 'Could not get notification_campaign feed events'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationCampaignGetFeedEventsError';
        Object.setPrototypeOf(_this, NotificationCampaignGetFeedEventsError.prototype);
        return _this;
    }
    return NotificationCampaignGetFeedEventsError;
}(errors_1.BaseError));
exports.NotificationCampaignGetFeedEventsError = NotificationCampaignGetFeedEventsError;
//# sourceMappingURL=notification-campaign.js.map