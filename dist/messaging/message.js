"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageInitializationError = exports.MessagesReplyError = exports.MessageFeedReply = exports.MessageReply = exports.Reply = exports.Message = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../entities/_base");
var errors_1 = require("../errors");
var person_1 = require("../entities/person");
var asset_1 = require("../entities/asset/asset");
var event_1 = require("../eventing/feeds/event");
var Message = (function (_super) {
    tslib_1.__extends(Message, _super);
    function Message(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/messages';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload, options);
        }
        return _this;
    }
    Message.deserialize = function (payload, universe, http, feed) {
        return new Message({ rawPayload: payload, universe: universe, http: http, feed: feed });
    };
    Message.prototype.deserialize = function (rawPayload, options) {
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.sourceType = rawPayload.source_type;
        this.sourceApi = rawPayload.source_api;
        this.tz = rawPayload.tz;
        this.date = rawPayload.date ? new Date(rawPayload.date) : null;
        this.contentType = rawPayload.content_type;
        this.content = rawPayload.content;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.externalPersonReferenceId = rawPayload.external_person_reference_id;
        this.externalChannelReferenceId = rawPayload.external_channel_reference_id;
        this.rawMessage = rawPayload.raw_message;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : null;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : null;
        this.rawPayload = rawPayload.raw_payload;
        this.broker = rawPayload.broker;
        this.deleted = rawPayload.deleted;
        this.isProcessed = rawPayload.is_processed;
        this.processedData = rawPayload.processed_data;
        this.replyables = rawPayload.replyables;
        this.author = rawPayload.author;
        this.person = rawPayload.person ? person_1.Person.create({ id: rawPayload.person }, this.universe, this.http) : undefined;
        if (options === null || options === void 0 ? void 0 : options.feed) {
            this.feed = options.feed;
        }
        else if (rawPayload.feed) {
            this.feed = {
                id: rawPayload.feed
            };
        }
        else {
            this.feed = undefined;
        }
        return this;
    };
    Message.create = function (payload, universe, http, feed) {
        return new Message({ rawPayload: payload, universe: universe, http: http, initialized: true, feed: feed });
    };
    Message.prototype.serialize = function () {
        return {
            id: this.id,
            source_type: this.sourceType,
            source_api: this.sourceApi,
            tz: this.tz,
            date: this.date ? this.date.toISOString() : undefined,
            content_type: this.contentType,
            content: this.content,
            external_reference_id: this.externalReferenceId,
            external_person_reference_id: this.externalPersonReferenceId,
            external_channel_reference_id: this.externalChannelReferenceId,
            raw_message: this.rawMessage,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            raw_payload: this.rawPayload,
            broker: this.broker,
            deleted: this.deleted,
            is_processed: this.isProcessed,
            processed_data: this.processedData,
            replyables: this.replyables,
            author: this.author,
            person: this.person ? this.person.id : undefined,
            feed: this.feed ? this.feed.id : undefined
        };
    };
    Message.prototype.reply = function (contentOptions) {
        return new MessageReply(tslib_1.__assign({ message: this, http: this.http, universe: this.universe, rawPayload: {
                content: contentOptions.content
            } }, contentOptions));
    };
    Message.prototype.replyFeed = function (contentOptions) {
        return new MessageFeedReply(tslib_1.__assign({ message: this, http: this.http, universe: this.universe, rawPayload: {
                content: contentOptions.content
            } }, contentOptions));
    };
    Message.prototype.init = function () {
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
                        throw this.handleError(new MessageInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Message;
}(_base_1.UniverseEntity));
exports.Message = Message;
var Reply = (function (_super) {
    tslib_1.__extends(Reply, _super);
    function Reply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reply.prototype.prepareSendWithAssets = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assetsHandler, data, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        assetsHandler = new asset_1.Assets({
                            http: this.options.http,
                            universe: this.options.universe
                        });
                        return [4, assetsHandler.post(payload)];
                    case 1:
                        data = _a.sent();
                        return [2, data];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2];
                }
            });
        });
    };
    return Reply;
}(Message));
exports.Reply = Reply;
var MessageReply = (function (_super) {
    tslib_1.__extends(MessageReply, _super);
    function MessageReply(options) {
        var _this = _super.call(this, options) || this;
        _this.message = options.message;
        _this.rawAssets = options.rawAssets;
        return _this;
    }
    MessageReply.prototype.send = function () {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var additonalAttachments, assets, attachments, res, err_3;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        additonalAttachments = void 0;
                        if (!this.rawAssets) return [3, 2];
                        return [4, this.prepareSendWithAssets(this.rawAssets)];
                    case 1:
                        assets = _e.sent();
                        if (Array.isArray(assets)) {
                            additonalAttachments = assets.map(function (item) {
                                return {
                                    type: 'image',
                                    payload: item.uri
                                };
                            });
                        }
                        _e.label = 2;
                    case 2:
                        attachments = void 0;
                        if (additonalAttachments && this.content && Array.isArray(this.content.attachments)) {
                            attachments = tslib_1.__spreadArrays(this.content.attachments, additonalAttachments);
                        }
                        else if (this.content && !Array.isArray(this.content.attachments) && additonalAttachments) {
                            attachments = additonalAttachments;
                        }
                        else if (this.content && Array.isArray(this.content.attachments)) {
                            attachments = this.content.attachments;
                        }
                        if (this.content && attachments) {
                            this.content.attachments = attachments;
                        }
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient().post("" + this.universe.universeBase + ((_c = (_b = this.message.replyables) === null || _b === void 0 ? void 0 : _b.reply_to_message) === null || _c === void 0 ? void 0 : _c.options.uri), {
                                content: tslib_1.__assign({}, this.content),
                                causes: (_d = this.causes) !== null && _d !== void 0 ? _d : undefined
                            }))];
                    case 3:
                        res = _e.sent();
                        if (this.feed) {
                            return [2, event_1.Event.create(res.data.data[0], this.feed, this.universe, this.http)];
                        }
                        return [2, res.data.data[0]];
                    case 4:
                        err_3 = _e.sent();
                        throw new MessagesReplyError(undefined, { error: err_3 });
                    case 5: return [2];
                }
            });
        });
    };
    return MessageReply;
}(Reply));
exports.MessageReply = MessageReply;
var MessageFeedReply = (function (_super) {
    tslib_1.__extends(MessageFeedReply, _super);
    function MessageFeedReply(options) {
        var _this = _super.call(this, options) || this;
        _this.message = options.message;
        _this.rawAssets = options.rawAssets;
        _this.causes = options.causes;
        return _this;
    }
    MessageFeedReply.prototype.send = function () {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var additonalAttachments, assets, attachments, res, err_4;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        additonalAttachments = void 0;
                        if (!this.rawAssets) return [3, 2];
                        return [4, this.prepareSendWithAssets(this.rawAssets)];
                    case 1:
                        assets = _e.sent();
                        if (Array.isArray(assets)) {
                            additonalAttachments = assets.map(function (item) {
                                return {
                                    type: 'image',
                                    payload: item.uri
                                };
                            });
                        }
                        _e.label = 2;
                    case 2:
                        attachments = void 0;
                        if (additonalAttachments && this.content && Array.isArray(this.content.attachments)) {
                            attachments = tslib_1.__spreadArrays(this.content.attachments, additonalAttachments);
                        }
                        else if (this.content && !Array.isArray(this.content.attachments) && additonalAttachments) {
                            attachments = additonalAttachments;
                        }
                        else if (this.content && Array.isArray(this.content.attachments)) {
                            attachments = this.content.attachments;
                        }
                        if (this.content && attachments) {
                            this.content.attachments = attachments;
                        }
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient().post("" + this.universe.universeBase + ((_c = (_b = this.message.replyables) === null || _b === void 0 ? void 0 : _b.reply_to_feed) === null || _c === void 0 ? void 0 : _c.options.uri), {
                                content: tslib_1.__assign({}, this.content),
                                causes: (_d = this.causes) !== null && _d !== void 0 ? _d : undefined
                            }))];
                    case 3:
                        res = _e.sent();
                        return [2, res.data.data[0]];
                    case 4:
                        err_4 = _e.sent();
                        throw new MessagesReplyError(undefined, { error: err_4 });
                    case 5: return [2];
                }
            });
        });
    };
    return MessageFeedReply;
}(Reply));
exports.MessageFeedReply = MessageFeedReply;
var MessagesReplyError = (function (_super) {
    tslib_1.__extends(MessagesReplyError, _super);
    function MessagesReplyError(message, properties) {
        if (message === void 0) { message = 'Could not send reply unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessagesReplyError';
        return _this;
    }
    return MessagesReplyError;
}(errors_1.BaseError));
exports.MessagesReplyError = MessagesReplyError;
var MessageInitializationError = (function (_super) {
    tslib_1.__extends(MessageInitializationError, _super);
    function MessageInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize message.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageInitializationError';
        return _this;
    }
    return MessageInitializationError;
}(errors_1.BaseError));
exports.MessageInitializationError = MessageInitializationError;
//# sourceMappingURL=message.js.map