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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _base_1 = __importDefault(require("../_base"));
var errors_1 = require("../../errors");
var channel_user_1 = require("./channel-user");
var email_1 = require("./email");
var cart_1 = require("../cart/cart");
var just_omit_1 = __importDefault(require("just-omit"));
var AddressArray = (function (_super) {
    __extends(AddressArray, _super);
    function AddressArray(items, universe, http, person) {
        var _this = _super.apply(this, items) || this;
        _this.universe = universe;
        _this.http = http;
        _this.person = person;
        return _this;
    }
    AddressArray.prototype.fromJson = function (payloads) {
        var _this = this;
        return payloads.map(function (item) { return Address.create(item, _this.universe, _this.http); });
    };
    AddressArray.prototype.toJson = function (items) {
        return items.map(function (item) { return item.serialize(); });
    };
    AddressArray.prototype.fetch = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, res, resources, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.universe.universeBase + "/" + People.endpoint + "/" + this.person.id + "/addresses",
                            params: __assign({}, ((options === null || options === void 0 ? void 0 : options.query) ? options.query : {}))
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        if (options && options.raw === true) {
                            return [2, resources];
                        }
                        return [2, resources.map(function (item) {
                                return Address.create(item, _this.universe, _this.http);
                            })];
                    case 2:
                        err_1 = _a.sent();
                        throw new AddressFetchRemoteError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AddressArray.prototype.create = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, res, resources, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + People.endpoint + "/" + this.person.id + "/addresses",
                            data: payload
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        res = _a.sent();
                        resources = res.data.data;
                        return [2, resources.map(function (item) {
                                return Address.create(item, _this.universe, _this.http);
                            })[0]];
                    case 2:
                        err_2 = _a.sent();
                        throw new AddressCreateRemoteError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AddressArray;
}(Array));
var Person = (function (_super) {
    __extends(Person, _super);
    function Person(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/people';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Person.prototype.deserialize = function (rawPayload) {
        var _this = this;
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.firstName = rawPayload.first_name;
        this.middleName = rawPayload.middle_name;
        this.lastName = rawPayload.last_name;
        this.name = rawPayload.name;
        this.nickname = rawPayload.nickname;
        this.avatar = rawPayload.avatar;
        this.dateOfBirth = rawPayload.date_of_birth;
        this.gender = rawPayload.gender;
        this.comment = rawPayload.comment;
        this.measurements = rawPayload.measurements;
        this.tags = rawPayload.tags;
        this.namePreference = rawPayload.name_preference;
        this.emails = [];
        if (rawPayload.emails && this.initialized) {
            this.emails = rawPayload.emails.map(function (i) { return email_1.Email.create(i, _this.universe, _this.http); });
        }
        else if (rawPayload.emails && !this.initialized) {
            this.emails = rawPayload.emails.map(function (i) {
                return email_1.Email.createUninitialized(i, _this.universe, _this.http);
            });
        }
        this._addresses = [];
        if (rawPayload.addresses && this.initialized) {
            this._addresses = rawPayload.addresses.map(function (i) { return Address.create(i, _this.universe, _this.http); });
        }
        else if (rawPayload.addresses && !this.initialized) {
            this._addresses = rawPayload.addresses.map(function (i) {
                return Address.createUninitialized(i, _this.universe, _this.http);
            });
        }
        this.phonenumbers = [];
        if (rawPayload.phonenumbers && this.initialized) {
            this.phonenumbers = rawPayload.phonenumbers.map(function (i) {
                return Phonenumber.create(i, _this.universe, _this.http);
            });
        }
        else if (rawPayload.phonenumbers && !this.initialized) {
            this.phonenumbers = rawPayload.phonenumbers.map(function (i) {
                return Phonenumber.createUninitialized(i, _this.universe, _this.http);
            });
        }
        this.channelUsers = [];
        if (rawPayload.channel_users && this.initialized) {
            this.channelUsers = rawPayload.channel_users.map(function (i) {
                return channel_user_1.ChannelUser.create(i, _this.universe, _this.http);
            });
        }
        else if (rawPayload.channel_users && !this.initialized) {
            this.channelUsers = rawPayload.channel_users.map(function (i) {
                return channel_user_1.ChannelUser.createUninitialized(i, _this.universe, _this.http);
            });
        }
        return this;
    };
    Person.create = function (payload, universe, http) {
        return new Person({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Person.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            first_name: this.firstName,
            middle_name: this.middleName,
            last_name: this.lastName,
            name: this.name,
            nickname: this.nickname,
            avatar: this.avatar,
            date_of_birth: this.dateOfBirth,
            gender: this.gender,
            comment: this.comment,
            measurements: this.measurements,
            tags: this.tags,
            name_preference: this.namePreference,
            emails: Array.isArray(this.emails) ? this.emails.map(function (item) { return item.serialize(); }) : undefined,
            addresses: Array.isArray(this._addresses)
                ? this._addresses.map(function (item) { return item.serialize(); })
                : undefined,
            phonenumbers: Array.isArray(this.phonenumbers)
                ? this.phonenumbers.map(function (item) { return item.serialize(); })
                : undefined,
            channel_users: Array.isArray(this.channelUsers)
                ? this.channelUsers.map(function (item) { return item.serialize(); })
                : undefined
        };
    };
    Person.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.fetch({
                                query: {
                                    embed: ['channel_users', 'phonenumbers', 'addresses', 'emails']
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2, this];
                    case 2:
                        err_3 = _a.sent();
                        throw this.handleError(new PersonInitializationError(undefined, { error: err_3 }));
                    case 3: return [2];
                }
            });
        });
    };
    Person.prototype.patch = function (changePart) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.patch.call(this, just_omit_1.default(changePart, ['emails', 'phonenumbers', 'addresses', 'channel_users']))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Person.prototype.analytics = function () {
        var _this = this;
        return {
            snapshot: function () { return __awaiter(_this, void 0, void 0, function () {
                var response, err_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.http
                                    .getClient()
                                    .get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/analytics/snapshot")];
                        case 1:
                            response = _a.sent();
                            return [2, {
                                    customer_lifetime_value: response.data.data[0].customer_lifetime_value,
                                    latest_orders: response.data.data[0].latest_orders,
                                    mean_polarity: response.data.data[0].mean_polarity,
                                    mean_nps_score: response.data.data[0].mean_nps_score
                                }];
                        case 2:
                            err_4 = _a.sent();
                            throw new PeopleAnalyticsRemoteError(undefined, { error: err_4 });
                        case 3: return [2];
                    }
                });
            }); }
        };
    };
    Object.defineProperty(Person.prototype, "carts", {
        get: function () {
            var _this = this;
            return {
                fromJson: function (payloads) {
                    return payloads.map(function (item) { return cart_1.Cart.create(item, _this.universe, _this.http); });
                },
                toJson: function (feeds) {
                    return feeds.map(function (item) { return item.serialize(); });
                },
                fetch: function (options) { return __awaiter(_this, void 0, void 0, function () {
                    var opts, res, feeds, err_5;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universe.universeBase + "/" + People.endpoint + "/" + this.id + "/carts",
                                    params: __assign({}, ((options === null || options === void 0 ? void 0 : options.query) ? options.query : {}))
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _a.sent();
                                feeds = res.data.data;
                                if (options && options.raw === true) {
                                    return [2, feeds];
                                }
                                return [2, feeds.map(function (feed) {
                                        return cart_1.Cart.create(feed, _this.universe, _this.http);
                                    })];
                            case 2:
                                err_5 = _a.sent();
                                throw new cart_1.CartsFetchRemoteError(undefined, { error: err_5 });
                            case 3: return [2];
                        }
                    });
                }); },
                create: function (cart) { return __awaiter(_this, void 0, void 0, function () {
                    var opts, res, carts, err_6;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'POST',
                                    url: this.universe.universeBase + "/" + People.endpoint + "/" + this.id + "/carts",
                                    data: cart
                                };
                                return [4, this.http.getClient()(opts)];
                            case 1:
                                res = _a.sent();
                                carts = res.data.data;
                                return [2, carts.map(function (feed) {
                                        return cart_1.Cart.create(feed, _this.universe, _this.http);
                                    })[0]];
                            case 2:
                                err_6 = _a.sent();
                                throw new cart_1.CartCreateRemoteError(undefined, { error: err_6 });
                            case 3: return [2];
                        }
                    });
                }); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "addresses", {
        get: function () {
            var _a;
            var ret = new AddressArray((_a = this._addresses) !== null && _a !== void 0 ? _a : [], this.universe, this.http, this);
            return ret;
        },
        set: function (items) {
            this._addresses = items.map(function (item) { return (item); });
        },
        enumerable: true,
        configurable: true
    });
    Person.prototype.email = function (payload) {
        return email_1.Email.create(__assign(__assign({}, payload), { person: this.id }), this.universe, this.http);
    };
    Person.prototype.phonenumber = function (payload) {
        return Phonenumber.create(__assign(__assign({}, payload), { person: this.id }), this.universe, this.http);
    };
    Person.prototype.address = function (payload) {
        return Address.create(__assign(__assign({}, payload), { person: this.id }), this.universe, this.http);
    };
    return Person;
}(_base_1.default));
exports.Person = Person;
var People = (function () {
    function People() {
    }
    People.endpoint = 'api/v0/people';
    return People;
}());
exports.People = People;
var Address = (function () {
    function Address(options) {
        var _a;
        this.universe = options.universe;
        this.http = options.http;
        this.options = options;
        this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
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
var Phonenumber = (function () {
    function Phonenumber(options) {
        var _a;
        this.universe = options.universe;
        this.http = options.http;
        this.options = options;
        this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
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
var PersonInitializationError = (function (_super) {
    __extends(PersonInitializationError, _super);
    function PersonInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize person.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PersonInitializationError';
        Object.setPrototypeOf(_this, PersonInitializationError.prototype);
        return _this;
    }
    return PersonInitializationError;
}(errors_1.BaseError));
exports.PersonInitializationError = PersonInitializationError;
var PersonFetchRemoteError = (function (_super) {
    __extends(PersonFetchRemoteError, _super);
    function PersonFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get person.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PersonFetchRemoteError';
        Object.setPrototypeOf(_this, PersonFetchRemoteError.prototype);
        return _this;
    }
    return PersonFetchRemoteError;
}(errors_1.BaseError));
exports.PersonFetchRemoteError = PersonFetchRemoteError;
var PeopleFetchRemoteError = (function (_super) {
    __extends(PeopleFetchRemoteError, _super);
    function PeopleFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get people.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PeopleFetchRemoteError';
        Object.setPrototypeOf(_this, PeopleFetchRemoteError.prototype);
        return _this;
    }
    return PeopleFetchRemoteError;
}(errors_1.BaseError));
exports.PeopleFetchRemoteError = PeopleFetchRemoteError;
var PeopleAnalyticsRemoteError = (function (_super) {
    __extends(PeopleAnalyticsRemoteError, _super);
    function PeopleAnalyticsRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get analytics data.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PeopleAnalyticsRemoteError';
        Object.setPrototypeOf(_this, PeopleAnalyticsRemoteError.prototype);
        return _this;
    }
    return PeopleAnalyticsRemoteError;
}(errors_1.BaseError));
exports.PeopleAnalyticsRemoteError = PeopleAnalyticsRemoteError;
var AddressFetchRemoteError = (function (_super) {
    __extends(AddressFetchRemoteError, _super);
    function AddressFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get fetch person address data.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AddressFetchRemoteError';
        Object.setPrototypeOf(_this, AddressFetchRemoteError.prototype);
        return _this;
    }
    return AddressFetchRemoteError;
}(errors_1.BaseError));
exports.AddressFetchRemoteError = AddressFetchRemoteError;
var AddressCreateRemoteError = (function (_super) {
    __extends(AddressCreateRemoteError, _super);
    function AddressCreateRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not create person address.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AddressCreateRemoteError';
        Object.setPrototypeOf(_this, AddressCreateRemoteError.prototype);
        return _this;
    }
    return AddressCreateRemoteError;
}(errors_1.BaseError));
exports.AddressCreateRemoteError = AddressCreateRemoteError;
//# sourceMappingURL=person.js.map