"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSaveRemoteError = exports.EmailApplyPatchRemoteError = exports.EmailPatchRemoteError = exports.EmailFetchRemoteError = exports.EmailCreateRemoteError = exports.EmailsFetchRemoteError = exports.Email = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var just_omit_1 = tslib_1.__importDefault(require("just-omit"));
var Email = (function (_super) {
    tslib_1.__extends(Email, _super);
    function Email(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        _this.endpoint = '';
        if ((options === null || options === void 0 ? void 0 : options.rawPayload) && options.rawPayload.person) {
            _this.endpoint = "api/v0/people/" + options.rawPayload.person + "/emails";
        }
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
    Email.prototype.patch = function (changePart) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.person) {
                            throw new EmailPatchRemoteError('Email patch requires person to be set.');
                        }
                        return [4, this._patch(just_omit_1.default(changePart, ['person']))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Email.prototype.applyPatch = function (patch) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.person) {
                            throw new EmailApplyPatchRemoteError('Email apply patch requires person to be set.');
                        }
                        return [4, this._applyPatch(patch)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Email.prototype.save = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.person) {
                            throw new EmailSaveRemoteError('Email save requires person to be set.');
                        }
                        return [4, this._save(just_omit_1.default(payload, ['person']))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Email.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.person) {
                            throw new EmailPatchRemoteError('Email delete requires person to be set.');
                        }
                        return [4, this._delete()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return Email;
}(_base_1.UniverseEntity));
exports.Email = Email;
var EmailsFetchRemoteError = (function (_super) {
    tslib_1.__extends(EmailsFetchRemoteError, _super);
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
    tslib_1.__extends(EmailCreateRemoteError, _super);
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
var EmailFetchRemoteError = (function (_super) {
    tslib_1.__extends(EmailFetchRemoteError, _super);
    function EmailFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not fetch emails'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EmailFetchRemoteError';
        Object.setPrototypeOf(_this, EmailFetchRemoteError.prototype);
        return _this;
    }
    return EmailFetchRemoteError;
}(errors_1.BaseError));
exports.EmailFetchRemoteError = EmailFetchRemoteError;
var EmailPatchRemoteError = (function (_super) {
    tslib_1.__extends(EmailPatchRemoteError, _super);
    function EmailPatchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not patch email'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EmailPatchRemoteError';
        Object.setPrototypeOf(_this, EmailPatchRemoteError.prototype);
        return _this;
    }
    return EmailPatchRemoteError;
}(errors_1.BaseError));
exports.EmailPatchRemoteError = EmailPatchRemoteError;
var EmailApplyPatchRemoteError = (function (_super) {
    tslib_1.__extends(EmailApplyPatchRemoteError, _super);
    function EmailApplyPatchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not apply patch to email'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EmailApplyPatchRemoteError';
        Object.setPrototypeOf(_this, EmailApplyPatchRemoteError.prototype);
        return _this;
    }
    return EmailApplyPatchRemoteError;
}(errors_1.BaseError));
exports.EmailApplyPatchRemoteError = EmailApplyPatchRemoteError;
var EmailSaveRemoteError = (function (_super) {
    tslib_1.__extends(EmailSaveRemoteError, _super);
    function EmailSaveRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not save email'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EmailSaveRemoteError';
        Object.setPrototypeOf(_this, EmailSaveRemoteError.prototype);
        return _this;
    }
    return EmailSaveRemoteError;
}(errors_1.BaseError));
exports.EmailSaveRemoteError = EmailSaveRemoteError;
//# sourceMappingURL=email.js.map