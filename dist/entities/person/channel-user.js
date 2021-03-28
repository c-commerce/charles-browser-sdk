"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonChannelUserMessageTemplateSendError = exports.ChannelUser = void 0;
var tslib_1 = require("tslib");
var event = tslib_1.__importStar(require("../../eventing/feeds/event"));
var feed = tslib_1.__importStar(require("../../eventing/feeds/feed"));
var errors_1 = require("../../errors");
var ChannelUser = (function () {
    function ChannelUser(options) {
        var _a;
        this.universe = options.universe;
        this.apiCarrier = options.universe;
        this.http = options.http;
        this.options = options;
        this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            this.deserialize(options.rawPayload);
        }
    }
    ChannelUser.prototype.deserialize = function (rawPayload) {
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = rawPayload.deleted;
        this.active = rawPayload.active;
        this.person = rawPayload.person;
        this.lastSourceFetchAt = rawPayload.last_source_fetch_at ? new Date(rawPayload.last_source_fetch_at) : undefined;
        this.broker = rawPayload.broker;
        this.externalPersonReferenceId = rawPayload.external_person_reference_id;
        this.externalPersonCustomId = rawPayload.external_person_custom_id;
        this.externalChannelReferenceId = rawPayload.external_channel_reference_id;
        this.sourceType = rawPayload.source_type;
        this.sourceApi = rawPayload.source_api;
        this.payloadName = rawPayload.payload_name;
        this.comment = rawPayload.comment;
        this.payload = rawPayload.payload;
        this.links = rawPayload.links;
        this.email = rawPayload.email;
        this.name = rawPayload.name;
        this.firstName = rawPayload.first_name;
        this.middleName = rawPayload.middle_name;
        this.lastName = rawPayload.last_name;
        this.phone = rawPayload.phone;
        return this;
    };
    ChannelUser.create = function (payload, universe, http) {
        return new ChannelUser({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    ChannelUser.createUninitialized = function (payload, universe, http) {
        return new ChannelUser({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    ChannelUser.prototype.serialize = function () {
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: this.deleted,
            active: this.active,
            person: this.person,
            last_source_fetch_at: this.lastSourceFetchAt ? this.lastSourceFetchAt.toISOString() : undefined,
            broker: this.broker,
            external_person_reference_id: this.externalPersonReferenceId,
            external_person_custom_id: this.externalPersonCustomId,
            external_channel_reference_id: this.externalChannelReferenceId,
            source_type: this.sourceType,
            source_api: this.sourceApi,
            payload_name: this.payloadName,
            comment: this.comment,
            payload: this.payload,
            links: this.links,
            email: this.email,
            name: this.name,
            first_name: this.firstName,
            middle_name: this.middleName,
            last_name: this.lastName,
            phone: this.phone
        };
    };
    ChannelUser.prototype.sendMessageFromMessageTemplate = function (messageTemplate, language, parameters) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, _feed, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/api/v0/people/" + this.person + "/channel_users/" + this.id + "/notifications/templates/" + messageTemplate.id,
                            data: {
                                parameters: parameters,
                                language: language
                            }
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        response = _a.sent();
                        _feed = feed.Feed.createUninitialized({ id: response.data.data[0].id }, this.universe, this.http, null);
                        return [2, event.Event.create(response.data.data[0], _feed, this.universe, this.http)];
                    case 2:
                        err_1 = _a.sent();
                        throw new PersonChannelUserMessageTemplateSendError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return ChannelUser;
}());
exports.ChannelUser = ChannelUser;
var PersonChannelUserMessageTemplateSendError = (function (_super) {
    tslib_1.__extends(PersonChannelUserMessageTemplateSendError, _super);
    function PersonChannelUserMessageTemplateSendError(message, properties) {
        if (message === void 0) { message = 'Could not send message via message template unexpectedl.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PersonChannelUserMessageTemplateSendError';
        return _this;
    }
    return PersonChannelUserMessageTemplateSendError;
}(errors_1.BaseError));
exports.PersonChannelUserMessageTemplateSendError = PersonChannelUserMessageTemplateSendError;
//# sourceMappingURL=channel-user.js.map