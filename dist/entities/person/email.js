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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _base_1 = __importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Email = (function (_super) {
    __extends(Email, _super);
    function Email(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/emails';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Email.prototype.deserialize = function (rawPayload) {
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = rawPayload.deleted;
        this.active = rawPayload.active;
        this.person = rawPayload.person;
        this.comment = rawPayload.comment;
        this.value = rawPayload.value;
        return this;
    };
    Email.create = function (payload, universe, http) {
        return new Email({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Email.createUninitialized = function (payload, universe, http) {
        return new Email({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    Email.prototype.serialize = function () {
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: this.deleted,
            active: this.active,
            person: this.person,
            comment: this.comment,
            value: this.value
        };
    };
    return Email;
}(_base_1.default));
exports.Email = Email;
var EmailsFetchRemoteError = (function (_super) {
    __extends(EmailsFetchRemoteError, _super);
    function EmailsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get emails.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EmailsFetchRemoteError';
        Object.setPrototypeOf(_this, EmailsFetchRemoteError.prototype);
        return _this;
    }
    return EmailsFetchRemoteError;
}(errors_1.BaseError));
exports.EmailsFetchRemoteError = EmailsFetchRemoteError;
var EmailCreateRemoteError = (function (_super) {
    __extends(EmailCreateRemoteError, _super);
    function EmailCreateRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not create email'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EmailCreateRemoteError';
        Object.setPrototypeOf(_this, EmailCreateRemoteError.prototype);
        return _this;
    }
    return EmailCreateRemoteError;
}(errors_1.BaseError));
exports.EmailCreateRemoteError = EmailCreateRemoteError;
//# sourceMappingURL=email.js.map