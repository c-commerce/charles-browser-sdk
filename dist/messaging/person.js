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
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            _this.id = options.rawPayload.id;
            _this.firstName = options.rawPayload.first_name;
            _this.middleName = options.rawPayload.middle_name;
            _this.lastName = options.rawPayload.last_name;
            _this.name = options.rawPayload.name;
            _this.avatar = options.rawPayload.avatar;
            _this.email = options.rawPayload.email;
            _this.dateOfBirth = options.rawPayload.date_of_birth ? new Date(options.rawPayload.date_of_birth) : null;
            _this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : null;
            _this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : null;
            _this.rawPayloads = options.rawPayload.raw_payloads;
            _this.gender = options.rawPayload.gender;
            _this.comment = options.rawPayload.comment;
            _this.origins = options.rawPayload.origins;
            _this.deleted = options.rawPayload.deleted || false;
            _this.active = options.rawPayload.active || false;
            _this.addresses = [];
            if (options.rawPayload.addresses && _this.initialized) {
                _this.addresses = options.rawPayload.addresses.map(function (i) { return (Address.deserialize(i, _this.universe, _this.http)); });
            }
            else if (options.rawPayload.addresses && !_this.initialized) {
                _this.addresses = options.rawPayload.addresses.map(function (i) { return (Address.createUninitialized(i, _this.universe, _this.http)); });
            }
            _this.phonenumbers = [];
            if (options.rawPayload.phonenumbers && _this.initialized) {
                _this.phonenumbers = options.rawPayload.phonenumbers.map(function (i) { return (Phonenumber.deserialize(i, _this.universe, _this.http)); });
            }
            else if (options.rawPayload.phonenumbers && !_this.initialized) {
                _this.phonenumbers = options.rawPayload.phonenumbers.map(function (i) { return (Phonenumber.createUninitialized(i, _this.universe, _this.http)); });
            }
        }
        return _this;
    }
    Person.deserialize = function (payload, universe, http) {
        return new Person({ rawPayload: payload, universe: universe, http: http });
    };
    Person.createUninitialized = function (payload, universe, http) {
        return new Person({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    Person.prototype.serialize = function () {
        return {
            id: this.id,
            first_name: this.firstName,
            middle_name: this.middleName,
            last_name: this.lastName,
            name: this.name,
            avatar: this.avatar,
            email: this.email,
            date_of_birth: this.dateOfBirth ? this.dateOfBirth.toISOString() : undefined,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            raw_payloads: this.rawPayloads,
            gender: this.gender || undefined,
            comment: this.comment || undefined,
            origins: this.origins,
            deleted: this.deleted,
            active: this.active,
            addresses: this.addresses,
            phonenumbers: this.phonenumbers
        };
    };
    Person.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    return Person;
}(events_1.EventEmitter));
exports.Person = Person;
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            _this.id = options.rawPayload.id;
            _this.lines = options.rawPayload.lines;
            _this.locality = options.rawPayload.locality;
            _this.country = options.rawPayload.country;
            _this.region = options.rawPayload.region;
            _this.postalCode = options.rawPayload.postal_code;
            _this.type = options.rawPayload.type;
            _this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : undefined;
            _this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : undefined;
            _this.comment = options.rawPayload.comment;
            _this.deleted = options.rawPayload.deleted;
            _this.active = options.rawPayload.active;
        }
        return _this;
    }
    Address.deserialize = function (payload, universe, http) {
        return new Address({ rawPayload: payload, universe: universe, http: http });
    };
    Address.createUninitialized = function (payload, universe, http) {
        return new Address({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    Address.prototype.serialize = function () {
        return {
            id: this.id,
            lines: this.lines,
            locality: this.locality,
            country: this.country,
            region: this.region,
            postal_code: this.postalCode,
            type: this.type,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            comment: this.comment,
            deleted: this.deleted,
            active: this.active
        };
    };
    Address.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    return Address;
}(events_1.EventEmitter));
exports.Address = Address;
var Phonenumber = /** @class */ (function (_super) {
    __extends(Phonenumber, _super);
    function Phonenumber(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            _this.id = options.rawPayload.id;
            _this.value = options.rawPayload.value;
            _this.type = options.rawPayload.type;
            _this.createdAt = options.rawPayload.created_at ? new Date(options.rawPayload.created_at) : undefined;
            _this.updatedAt = options.rawPayload.updated_at ? new Date(options.rawPayload.updated_at) : undefined;
            _this.deleted = options.rawPayload.deleted;
            _this.active = options.rawPayload.active;
        }
        return _this;
    }
    Phonenumber.deserialize = function (payload, universe, http) {
        return new Phonenumber({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Phonenumber.createUninitialized = function (payload, universe, http) {
        return new Phonenumber({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    Phonenumber.prototype.serialize = function () {
        return {
            id: this.id,
            value: this.value,
            type: this.type,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: this.deleted,
            active: this.active
        };
    };
    Phonenumber.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
    };
    return Phonenumber;
}(events_1.EventEmitter));
exports.Phonenumber = Phonenumber;
//# sourceMappingURL=person.js.map