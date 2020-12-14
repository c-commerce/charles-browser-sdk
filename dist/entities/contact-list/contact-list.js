"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var ContactList = (function (_super) {
    tslib_1.__extends(ContactList, _super);
    function ContactList(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/contact_lists';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    ContactList.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.summary = rawPayload.summary;
        this.filters = rawPayload.filters;
        this.type = rawPayload.type;
        this.author = rawPayload.author;
        return this;
    };
    ContactList.create = function (payload, universe, http) {
        return new ContactList({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    ContactList.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            summary: this.summary,
            filters: this.filters,
            type: this.type,
            author: this.author
        };
    };
    ContactList.prototype.init = function () {
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
                        throw this.handleError(new ContactListInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return ContactList;
}(_base_1.default));
exports.ContactList = ContactList;
var ContactLists = (function () {
    function ContactLists() {
    }
    ContactLists.endpoint = 'api/v0/contact_lists';
    return ContactLists;
}());
exports.ContactLists = ContactLists;
var ContactListInitializationError = (function (_super) {
    tslib_1.__extends(ContactListInitializationError, _super);
    function ContactListInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize contact_list.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListInitializationError';
        Object.setPrototypeOf(_this, ContactListInitializationError.prototype);
        return _this;
    }
    return ContactListInitializationError;
}(errors_1.BaseError));
exports.ContactListInitializationError = ContactListInitializationError;
var ContactListFetchRemoteError = (function (_super) {
    tslib_1.__extends(ContactListFetchRemoteError, _super);
    function ContactListFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get contact_list.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListFetchRemoteError';
        Object.setPrototypeOf(_this, ContactListFetchRemoteError.prototype);
        return _this;
    }
    return ContactListFetchRemoteError;
}(errors_1.BaseError));
exports.ContactListFetchRemoteError = ContactListFetchRemoteError;
var ContactListsFetchRemoteError = (function (_super) {
    tslib_1.__extends(ContactListsFetchRemoteError, _super);
    function ContactListsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get contact_lists.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListsFetchRemoteError';
        Object.setPrototypeOf(_this, ContactListsFetchRemoteError.prototype);
        return _this;
    }
    return ContactListsFetchRemoteError;
}(errors_1.BaseError));
exports.ContactListsFetchRemoteError = ContactListsFetchRemoteError;
var ContactListsFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(ContactListsFetchCountRemoteError, _super);
    function ContactListsFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get count of Contact Lists.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListsFetchCountRemoteError';
        Object.setPrototypeOf(_this, ContactListsFetchCountRemoteError.prototype);
        return _this;
    }
    return ContactListsFetchCountRemoteError;
}(errors_1.BaseError));
exports.ContactListsFetchCountRemoteError = ContactListsFetchCountRemoteError;
//# sourceMappingURL=contact-list.js.map