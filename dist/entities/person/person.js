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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _base_1 = __importDefault(require("../_base"));
var errors_1 = require("../../errors");
/**
 * Manage people, that usually are generated from channel users.
 *
 * @category Entity
 */
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/people';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Person.prototype.deserialize = function (rawPayload) {
        var _this = this;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = rawPayload.deleted || false;
        this.active = rawPayload.active || true;
        this.firstName = rawPayload.first_name;
        this.middleName = rawPayload.middle_name;
        this.lastName = rawPayload.last_name;
        this.name = rawPayload.name;
        this.email = rawPayload.email;
        this.avatar = rawPayload.avatar;
        this.dateOfBirth = rawPayload.date_of_birth;
        this.gender = rawPayload.gender;
        this.comment = rawPayload.comment;
        this.measurements = rawPayload.measurements;
        this.addresses = [];
        if (rawPayload.addresses && this.initialized) {
            this.addresses = rawPayload.addresses.map(function (i) { return (Address.create(i, _this.universe, _this.http)); });
        }
        else if (rawPayload.addresses && !this.initialized) {
            this.addresses = rawPayload.addresses.map(function (i) { return (Address.createUninitialized(i, _this.universe, _this.http)); });
        }
        this.phonenumbers = [];
        if (rawPayload.phonenumbers && this.initialized) {
            this.phonenumbers = rawPayload.phonenumbers.map(function (i) { return (Phonenumber.create(i, _this.universe, _this.http)); });
        }
        else if (rawPayload.phonenumbers && !this.initialized) {
            this.phonenumbers = rawPayload.phonenumbers.map(function (i) { return (Phonenumber.createUninitialized(i, _this.universe, _this.http)); });
        }
        this.channelUsers = [];
        if (rawPayload.channel_users && this.initialized) {
            this.channelUsers = rawPayload.channel_users.map(function (i) { return (ChannelUser.create(i, _this.universe, _this.http)); });
        }
        else if (rawPayload.channel_users && !this.initialized) {
            this.channelUsers = rawPayload.channel_users.map(function (i) { return (ChannelUser.createUninitialized(i, _this.universe, _this.http)); });
        }
        return this;
    };
    Person.create = function (payload, universe, http) {
        return new Person({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Person.prototype.serialize = function () {
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: this.deleted || false,
            active: this.active || true,
            first_name: this.firstName,
            middle_name: this.middleName,
            last_name: this.lastName,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            date_of_birth: this.dateOfBirth,
            gender: this.gender,
            comment: this.comment,
            measurements: this.measurements,
            addresses: Array.isArray(this.addresses) ? this.addresses.map(function (item) { return (item.serialize()); }) : undefined,
            phonenumbers: Array.isArray(this.phonenumbers) ? this.phonenumbers.map(function (item) { return (item.serialize()); }) : undefined,
            channel_users: Array.isArray(this.channelUsers) ? this.channelUsers.map(function (item) { return (item.serialize()); }) : undefined
        };
    };
    Person.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetch({
                                query: {
                                    embed: [
                                        'channel_users',
                                        'phonenumbers',
                                        'addresses'
                                    ]
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                    case 2:
                        err_1 = _a.sent();
                        throw this.handleError(new PersonInitializationError(undefined, { error: err_1 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Person.prototype.analytics = function () {
        var _this = this;
        return {
            snapshot: function () { return __awaiter(_this, void 0, void 0, function () {
                var response, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/analytics/snapshot")];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, {
                                    customer_lifetime_value: response.data.data[0].customer_lifetime_value,
                                    latest_orders: response.data.data[0].latest_orders,
                                    mean_polarity: response.data.data[0].mean_polarity,
                                    mean_nps_score: response.data.data[0].mean_nps_score
                                }];
                        case 2:
                            err_2 = _a.sent();
                            throw new PeopleAnalyticsRemoteError(undefined, { error: err_2 });
                        case 3: return [2 /*return*/];
                    }
                });
            }); }
        };
    };
    return Person;
}(_base_1.default));
exports.Person = Person;
var People = /** @class */ (function () {
    function People() {
    }
    People.endpoint = 'api/v0/people';
    return People;
}());
exports.People = People;
var Address = /** @class */ (function () {
    function Address(options) {
        this.universe = options.universe;
        this.http = options.http;
        this.options = options;
        this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            this.deserialize(options.rawPayload);
        }
    }
    Address.prototype.deserialize = function (rawPayload) {
        this.id = rawPayload.id;
        this.lines = rawPayload.lines;
        this.locality = rawPayload.locality;
        this.country = rawPayload.country;
        this.region = rawPayload.region;
        this.postalCode = rawPayload.postal_code;
        this.type = rawPayload.type;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.comment = rawPayload.comment;
        this.deleted = rawPayload.deleted;
        this.active = rawPayload.active;
        return this;
    };
    Address.create = function (payload, universe, http) {
        return new Address({ rawPayload: payload, universe: universe, http: http, initialized: true });
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
    return Address;
}());
exports.Address = Address;
var Phonenumber = /** @class */ (function () {
    function Phonenumber(options) {
        this.universe = options.universe;
        this.http = options.http;
        this.options = options;
        this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            this.deserialize(options.rawPayload);
        }
    }
    Phonenumber.prototype.deserialize = function (rawPayload) {
        this.id = rawPayload.id;
        this.value = rawPayload.value;
        this.type = rawPayload.type;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = rawPayload.deleted;
        this.active = rawPayload.active;
        return this;
    };
    Phonenumber.create = function (payload, universe, http) {
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
    return Phonenumber;
}());
exports.Phonenumber = Phonenumber;
var ChannelUser = /** @class */ (function () {
    function ChannelUser(options) {
        this.universe = options.universe;
        this.http = options.http;
        this.options = options;
        this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
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
    return ChannelUser;
}());
exports.ChannelUser = ChannelUser;
var PersonInitializationError = /** @class */ (function (_super) {
    __extends(PersonInitializationError, _super);
    function PersonInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize person.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PersonInitializationError';
        return _this;
    }
    return PersonInitializationError;
}(errors_1.BaseError));
exports.PersonInitializationError = PersonInitializationError;
var PersonFetchRemoteError = /** @class */ (function (_super) {
    __extends(PersonFetchRemoteError, _super);
    function PersonFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get person.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PersonFetchRemoteError';
        return _this;
    }
    return PersonFetchRemoteError;
}(errors_1.BaseError));
exports.PersonFetchRemoteError = PersonFetchRemoteError;
var PeopleFetchRemoteError = /** @class */ (function (_super) {
    __extends(PeopleFetchRemoteError, _super);
    function PeopleFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get people.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PeopleFetchRemoteError';
        return _this;
    }
    return PeopleFetchRemoteError;
}(errors_1.BaseError));
exports.PeopleFetchRemoteError = PeopleFetchRemoteError;
var PeopleAnalyticsRemoteError = /** @class */ (function (_super) {
    __extends(PeopleAnalyticsRemoteError, _super);
    function PeopleAnalyticsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get analytics data.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PeopleAnalyticsRemoteError';
        return _this;
    }
    return PeopleAnalyticsRemoteError;
}(errors_1.BaseError));
exports.PeopleAnalyticsRemoteError = PeopleAnalyticsRemoteError;
//# sourceMappingURL=person.js.map