"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var contact_list_1 = require("./contact-list");
var ContactListStaticEntry = (function (_super) {
    tslib_1.__extends(ContactListStaticEntry, _super);
    function ContactListStaticEntry(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = '';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        if ((options === null || options === void 0 ? void 0 : options.rawPayload) && options.rawPayload.contact_list) {
            _this.endpoint = contact_list_1.ContactLists.endpoint + "/" + options.rawPayload.contact_list + "/static_entries";
        }
        return _this;
    }
    ContactListStaticEntry.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.effect = rawPayload.effect;
        this.resource = rawPayload.resource;
        this.originResource = rawPayload.origin_resource;
        return this;
    };
    ContactListStaticEntry.create = function (payload, universe, http) {
        return new ContactListStaticEntry({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    ContactListStaticEntry.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            effect: this.effect,
            resource: this.resource,
            origin_resource: this.originResource
        };
    };
    ContactListStaticEntry.prototype.init = function () {
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
                        throw this.handleError(new ContactListStaticEntryInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    ContactListStaticEntry.createUninitialized = function (payload, universe, http) {
        return new ContactListStaticEntry({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    return ContactListStaticEntry;
}(_base_1.default));
exports.ContactListStaticEntry = ContactListStaticEntry;
var ContactListStaticEntryInitializationError = (function (_super) {
    tslib_1.__extends(ContactListStaticEntryInitializationError, _super);
    function ContactListStaticEntryInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize contact list static_entry.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListStaticEntryInitializationError';
        Object.setPrototypeOf(_this, ContactListStaticEntryInitializationError.prototype);
        return _this;
    }
    return ContactListStaticEntryInitializationError;
}(errors_1.BaseError));
exports.ContactListStaticEntryInitializationError = ContactListStaticEntryInitializationError;
var ContactListStaticEntryFetchRemoteError = (function (_super) {
    tslib_1.__extends(ContactListStaticEntryFetchRemoteError, _super);
    function ContactListStaticEntryFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get contact list static_entry.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListStaticEntryFetchRemoteError';
        Object.setPrototypeOf(_this, ContactListStaticEntryFetchRemoteError.prototype);
        return _this;
    }
    return ContactListStaticEntryFetchRemoteError;
}(errors_1.BaseError));
exports.ContactListStaticEntryFetchRemoteError = ContactListStaticEntryFetchRemoteError;
var ContactListStaticEntriesFetchRemoteError = (function (_super) {
    tslib_1.__extends(ContactListStaticEntriesFetchRemoteError, _super);
    function ContactListStaticEntriesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get contact list static_entries.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListStaticEntriesFetchRemoteError';
        Object.setPrototypeOf(_this, ContactListStaticEntriesFetchRemoteError.prototype);
        return _this;
    }
    return ContactListStaticEntriesFetchRemoteError;
}(errors_1.BaseError));
exports.ContactListStaticEntriesFetchRemoteError = ContactListStaticEntriesFetchRemoteError;
var ContactListStaticEntryCreateRemoteError = (function (_super) {
    tslib_1.__extends(ContactListStaticEntryCreateRemoteError, _super);
    function ContactListStaticEntryCreateRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not create contact list static entry.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListStaticEntryCreateRemoteError';
        Object.setPrototypeOf(_this, ContactListStaticEntryCreateRemoteError.prototype);
        return _this;
    }
    return ContactListStaticEntryCreateRemoteError;
}(errors_1.BaseError));
exports.ContactListStaticEntryCreateRemoteError = ContactListStaticEntryCreateRemoteError;
var ContactListStaticEntryDeleteRemoteError = (function (_super) {
    tslib_1.__extends(ContactListStaticEntryDeleteRemoteError, _super);
    function ContactListStaticEntryDeleteRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not delete contact list static entry.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListStaticEntryDeleteRemoteError';
        Object.setPrototypeOf(_this, ContactListStaticEntryDeleteRemoteError.prototype);
        return _this;
    }
    return ContactListStaticEntryDeleteRemoteError;
}(errors_1.BaseError));
exports.ContactListStaticEntryDeleteRemoteError = ContactListStaticEntryDeleteRemoteError;
//# sourceMappingURL=static-entry.js.map