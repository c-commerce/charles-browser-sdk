"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var static_entry_1 = require("./static-entry");
var qs_1 = tslib_1.__importDefault(require("qs"));
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
        var _this = this;
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
        if (rawPayload.static_entries && this.initialized) {
            this._staticEntries = rawPayload.static_entries.map(function (i) { return static_entry_1.ContactListStaticEntry.create(i, _this.universe, _this.http); });
        }
        else if (rawPayload.static_entries && !this.initialized) {
            this._staticEntries = rawPayload.static_entries.map(function (i) {
                return static_entry_1.ContactListStaticEntry.createUninitialized(i, _this.universe, _this.http);
            });
        }
        else {
            this._staticEntries = undefined;
        }
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
    ContactList.prototype.preview = function (options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + "/preview" + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 1:
                        res = _c.sent();
                        return [2, res.data.data];
                    case 2:
                        err_2 = _c.sent();
                        throw this.handleError(new ContactListPreviewRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    Object.defineProperty(ContactList.prototype, "staticEntries", {
        get: function () {
            var _a;
            var sea = new StaticEntryArray((_a = this._staticEntries) !== null && _a !== void 0 ? _a : [], this.universe, this.http, this);
            return sea;
        },
        set: function (items) {
            this._staticEntries = items.map(function (item) { return (item); });
        },
        enumerable: true,
        configurable: true
    });
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
var StaticEntryArray = (function (_super) {
    tslib_1.__extends(StaticEntryArray, _super);
    function StaticEntryArray(items, universe, http, contactList) {
        var _this = _super.apply(this, items) || this;
        _this.universe = universe;
        _this.http = http;
        _this.contactList = contactList;
        Object.setPrototypeOf(_this, StaticEntryArray.prototype);
        return _this;
    }
    StaticEntryArray.prototype.fromJson = function (payloads) {
        var _this = this;
        return payloads.map(function (item) { return static_entry_1.ContactListStaticEntry.create(item, _this.universe, _this.http); });
    };
    StaticEntryArray.prototype.toJson = function (items) {
        return items.map(function (item) { return item.serialize(); });
    };
    StaticEntryArray.prototype.fetch = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resources, err_3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.universe.universeBase + "/" + ContactLists.endpoint + "/" + this.contactList.id + "/static_entries",
                            params: tslib_1.__assign({}, ((options === null || options === void 0 ? void 0 : options.query) ? options.query : {}))
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (item) {
                                return static_entry_1.ContactListStaticEntry.create(item, _this.universe, _this.http);
                            })];
                    case 2:
                        err_3 = _a.sent();
                        throw new static_entry_1.ContactListStaticEntryFetchRemoteError(undefined, { error: err_3 });
                    case 3: return [2];
                }
            });
        });
    };
    StaticEntryArray.prototype.create = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resources, err_4;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + ContactLists.endpoint + "/" + this.contactList.id + "/static_entries",
                            data: payload
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (item) {
                                return static_entry_1.ContactListStaticEntry.create(item, _this.universe, _this.http);
                            })[0]];
                    case 2:
                        err_4 = _a.sent();
                        throw new static_entry_1.ContactListStaticEntryCreateRemoteError(undefined, { error: err_4 });
                    case 3: return [2];
                }
            });
        });
    };
    StaticEntryArray.prototype.delete = function (payload, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (payload.id === null || payload.id === undefined)
                            throw new TypeError('delete requires id to be set.');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'DELETE',
                            url: this.universe.universeBase + "/" + ContactLists.endpoint + "/" + this.contactList.id + "/static_entries/" + payload.id + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: undefined,
                            responseType: 'json'
                        };
                        return [4, this.http.getClient()(opts)];
                    case 2:
                        res = _a.sent();
                        return [2, res.status];
                    case 3:
                        err_5 = _a.sent();
                        throw new static_entry_1.ContactListStaticEntryDeleteRemoteError(undefined, { error: err_5 });
                    case 4: return [2];
                }
            });
        });
    };
    return StaticEntryArray;
}(Array));
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
var ContactListPreviewRemoteError = (function (_super) {
    tslib_1.__extends(ContactListPreviewRemoteError, _super);
    function ContactListPreviewRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get preview of Contact List.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContactListPreviewRemoteError';
        Object.setPrototypeOf(_this, ContactListPreviewRemoteError.prototype);
        return _this;
    }
    return ContactListPreviewRemoteError;
}(errors_1.BaseError));
exports.ContactListPreviewRemoteError = ContactListPreviewRemoteError;
//# sourceMappingURL=contact-list.js.map