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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var errors_1 = require("../errors");
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.options = options;
        if (options && options.rawPayload) {
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
        }
        return _this;
    }
    Message.deserialize = function (payload, universe, http) {
        return new Message({ rawPayload: payload, universe: universe, http: http });
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
            replyables: this.replyables
        };
    };
    Message.prototype.reply = function (contentOptions) {
        return new MessageReply(__assign({ message: this, http: this.http, universe: this.universe, rawPayload: __assign({}, contentOptions) }, contentOptions));
    };
    Message.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    return Message;
}(events_1.EventEmitter));
exports.Message = Message;
var Reply = /** @class */ (function (_super) {
    __extends(Reply, _super);
    function Reply(options) {
        return _super.call(this, options) || this;
    }
    return Reply;
}(Message));
var MessageReply = /** @class */ (function (_super) {
    __extends(MessageReply, _super);
    function MessageReply(options) {
        var _this = _super.call(this, options) || this;
        _this.message = options.message;
        return _this;
    }
    MessageReply.prototype.send = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient().post("" + this.universe.universeBase + ((_c = (_b = this.message.replyables) === null || _b === void 0 ? void 0 : _b.reply_to_message) === null || _c === void 0 ? void 0 : _c.options.uri), {
                                content: this.content
                            }))];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.data[0]];
                    case 2:
                        err_1 = _d.sent();
                        throw new MessagesReplyError(undefined, { error: err_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MessageReply;
}(Reply));
var MessagesReplyError = /** @class */ (function (_super) {
    __extends(MessagesReplyError, _super);
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