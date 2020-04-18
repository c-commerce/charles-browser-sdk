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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var event = __importStar(require("../../eventing/feeds/event"));
var feed = __importStar(require("../../eventing/feeds/feed"));
var errors_1 = require("../../errors");
var ChannelUser = (function () {
    function ChannelUser(options) {
        var _a;
        this.universe = options.universe;
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
            payload: this.payload
        };
    };
    ChannelUser.prototype.sendMessageFromMessageTemplate = function (messageTemplate, language, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, response, _feed, err_1;
            return __generator(this, function (_a) {
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
    __extends(PersonChannelUserMessageTemplateSendError, _super);
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