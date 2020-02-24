"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(options) {
        var _this = _super.call(this) || this;
        _this.options = null;
        _this.options = options;
        if (options && options.rawPayload) {
            _this.id = options.rawPayload.id;
            _this.sourceType = options.rawPayload.source_type;
            _this.sourceApi = options.rawPayload.source_api;
            _this.tz = options.rawPayload.tz;
            _this.date = options.rawPayload.date;
            _this.contentType = options.rawPayload.content_type;
            _this.content = options.rawPayload.content;
            _this.externalReferenceId = options.rawPayload.external_reference_id;
            _this.externalPersonReferenceId = options.rawPayload.external_person_reference_id;
            _this.externalChannelReferenceId = options.rawPayload.external_channel_reference_id;
            _this.rawMessage = options.rawPayload.raw_message;
            _this.createdAt = options.rawPayload.created_at;
            _this.updatedAt = options.rawPayload.updated_at;
            _this.rawPayload = options.rawPayload.raw_payload;
            _this.broker = options.rawPayload.broker;
            _this.deleted = options.rawPayload.deleted;
            _this.isProcessed = options.rawPayload.is_processed;
            _this.processedData = options.rawPayload.processed_data;
            _this.replyables = options.rawPayload.replyables;
        }
        return _this;
    }
    Message.deserialize = function (payload) {
        var msg = new Message({ rawPayload: payload });
        return msg;
    };
    Message.prototype.serialize = function () {
        return {
            id: this.id,
            source_type: this.sourceType,
            source_api: this.sourceApi,
            tz: this.tz,
            date: this.date,
            content_type: this.contentType,
            content: this.content,
            external_reference_id: this.externalReferenceId,
            external_person_reference_id: this.externalPersonReferenceId,
            external_channel_reference_id: this.externalChannelReferenceId,
            raw_message: this.rawMessage,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            raw_payload: this.rawPayload,
            broker: this.broker,
            deleted: this.deleted,
            is_processed: this.isProcessed,
            processed_data: this.processedData,
            replyables: this.replyables
        };
    };
    Message.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    return Message;
}(events_1.EventEmitter));
exports.Message = Message;
//# sourceMappingURL=message.js.map