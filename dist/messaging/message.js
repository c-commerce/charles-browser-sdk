"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_1 = require("events");
var errors_1 = require("../errors");
var person_1 = require("../entities/person");
var asset_1 = require("../entities/asset/asset");
var event_1 = require("../eventing/feeds/event");
var Message = (function (_super) {
    tslib_1.__extends(Message, _super);
    function Message(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.options = options;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.id = options.rawPayload.id;
            _this.sourceType = options.rawPayload.source_type;
            _this.sourceApi = options.rawPayload.source_api;
            _this.tz = options.rawPayload.tz;
            _this.date = options.rawPayload.date ? new Date(options.rawPayload.date) : null;
            _this.contentType = options.rawPayload.content_type;
            _this.content = options.rawPayload.content;
            _this.externalReferenceId = options.rawPayload.external_reference_id;
            _this.externalPersonReferenceId = options.rawPayload.external_person_reference_id;
            _this.externalChannelReferenceId = options.rawPayload.external_channel_reference_id;
            _this.rawMessage = options.rawPayload.raw_message;
            _this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : null;
            _this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : null;
            _this.rawPayload = options.rawPayload.raw_payload;
            _this.broker = options.rawPayload.broker;
            _this.deleted = options.rawPayload.deleted;
            _this.isProcessed = options.rawPayload.is_processed;
            _this.processedData = options.rawPayload.processed_data;
            _this.replyables = options.rawPayload.replyables;
            _this.person = options.rawPayload.person ? person_1.Person.create({ id: options.rawPayload.person }, _this.universe, _this.http) : undefined;
            if (options.feed) {
                _this.feed = options.feed;
            }
            else if (options.rawPayload.feed) {
                _this.feed = {
                    id: options.rawPayload.feed
                };
            }
            else {
                _this.feed = undefined;
            }
        }
        return _this;
    }
    Message.deserialize = function (payload, universe, http, feed) {
        return new Message({ rawPayload: payload, universe: universe, http: http, feed: feed });
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
    Message.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    return Message;
}(events_1.EventEmitter));
exports.Message = Message;
var Reply = (function (_super) {
    tslib_1.__extends(Reply, _super);
    function Reply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reply.prototype.prepareSendWithAssets = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assetsHandler, data, err_1;
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
                        err_1 = _a.sent();
                        throw err_1;
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
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var additonalAttachments, assets, attachments, res, err_2;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        additonalAttachments = void 0;
                        if (!this.rawAssets) return [3, 2];
                        return [4, this.prepareSendWithAssets(this.rawAssets)];
                    case 1:
                        assets = _d.sent();
                        if (Array.isArray(assets)) {
                            additonalAttachments = assets.map(function (item) {
                                return {
                                    type: 'image',
                                    payload: item.uri
                                };
                            });
                        }
                        _d.label = 2;
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
                                content: tslib_1.__assign({}, this.content)
                            }))];
                    case 3:
                        res = _d.sent();
                        if (this.feed) {
                            return [2, event_1.Event.create(res.data.data[0], this.feed, this.universe, this.http)];
                        }
                        return [2, res.data.data[0]];
                    case 4:
                        err_2 = _d.sent();
                        throw new MessagesReplyError(undefined, { error: err_2 });
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
        return _this;
    }
    MessageFeedReply.prototype.send = function () {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var additonalAttachments, assets, attachments, res, err_3;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        additonalAttachments = void 0;
                        if (!this.rawAssets) return [3, 2];
                        return [4, this.prepareSendWithAssets(this.rawAssets)];
                    case 1:
                        assets = _d.sent();
                        if (Array.isArray(assets)) {
                            additonalAttachments = assets.map(function (item) {
                                return {
                                    type: 'image',
                                    payload: item.uri
                                };
                            });
                        }
                        _d.label = 2;
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
                                content: tslib_1.__assign({}, this.content)
                            }))];
                    case 3:
                        res = _d.sent();
                        return [2, res.data.data[0]];
                    case 4:
                        err_3 = _d.sent();
                        throw new MessagesReplyError(undefined, { error: err_3 });
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
//# sourceMappingURL=message.js.map