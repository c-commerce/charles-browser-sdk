"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importStar(require("../_base"));
var errors_1 = require("../../errors");
var order_1 = require("../../entities/order/order");
var channel_user_1 = require("./channel-user");
var email_1 = require("./email");
var cart_1 = require("../cart/cart");
var just_omit_1 = tslib_1.__importDefault(require("just-omit"));
var AddressArray = (function (_super) {
    tslib_1.__extends(AddressArray, _super);
    function AddressArray(items, universe, http, person) {
        var _this = _super.apply(this, items) || this;
        _this.universe = universe;
        _this.http = http;
        _this.person = person;
        Object.setPrototypeOf(_this, AddressArray.prototype);
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resources, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.universe.universeBase + "/" + People.endpoint + "/" + this.person.id + "/addresses",
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, resources, err_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
    tslib_1.__extends(Person, _super);
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
        this.customProperties = rawPayload.custom_properties;
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
            custom_properties: this.customProperties,
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_3;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
            snapshot: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var response, err_4;
                return tslib_1.__generator(this, function (_a) {
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
    Person.prototype.orders = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, orders, ordersMap_1, err_5;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'GET',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/orders",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            params: tslib_1.__assign({}, ((options === null || options === void 0 ? void 0 : options.query) ? options.query : {})),
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 1:
                        res = _b.sent();
                        orders = res.data.data;
                        if (options && options.raw === true) {
                            return [2, orders];
                        }
                        ordersMap_1 = new Map();
                        orders.forEach(function (orderRaw) {
                            var o = order_1.Order.create(orderRaw, _this.universe, _this.http);
                            ordersMap_1.set(o.id, o);
                        });
                        return [2, Array.from(ordersMap_1.values())];
                    case 2:
                        err_5 = _b.sent();
                        throw this.handleError(new PersonFetchOrdersRemoteError(undefined, { error: err_5 }));
                    case 3: return [2];
                }
            });
        });
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
                fetch: function (options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, feeds, err_6;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                opts = {
                                    method: 'GET',
                                    url: this.universe.universeBase + "/" + People.endpoint + "/" + this.id + "/carts",
                                    params: tslib_1.__assign({}, ((options === null || options === void 0 ? void 0 : options.query) ? options.query : {}))
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
                                err_6 = _a.sent();
                                throw new cart_1.CartsFetchRemoteError(undefined, { error: err_6 });
                            case 3: return [2];
                        }
                    });
                }); },
                create: function (cart) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var opts, res, carts, err_7;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
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
                                err_7 = _a.sent();
                                throw new cart_1.CartCreateRemoteError(undefined, { error: err_7 });
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
        return email_1.Email.create(tslib_1.__assign(tslib_1.__assign({}, payload), { person: this.id }), this.universe, this.http);
    };
    Person.prototype.phonenumber = function (payload) {
        return Phonenumber.create(tslib_1.__assign(tslib_1.__assign({}, payload), { person: this.id }), this.universe, this.http);
    };
    Person.prototype.address = function (payload) {
        return Address.create(tslib_1.__assign(tslib_1.__assign({}, payload), { person: this.id }), this.universe, this.http);
    };
    return Person;
}(_base_1.default));
exports.Person = Person;
var People = (function (_super) {
    tslib_1.__extends(People, _super);
    function People(options) {
        var _this = _super.call(this) || this;
        _this.endpoint = People.endpoint;
        _this.universe = options.universe;
        _this.http = options.http;
        return _this;
    }
    People.prototype.parseItem = function (payload) {
        return Person.create(payload, this.universe, this.http);
    };
    People.prototype.getStream = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getStream(options)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    People.endpoint = 'api/v0/people';
    return People;
}(_base_1.EntitiesList));
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
        this.company = rawPayload.company;
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
            company: this.company,
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
var PersonFetchOrdersRemoteError = (function (_super) {
    tslib_1.__extends(PersonFetchOrdersRemoteError, _super);
    function PersonFetchOrdersRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get person orders.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PersonFetchOrdersRemoteError';
        Object.setPrototypeOf(_this, PersonFetchOrdersRemoteError.prototype);
        return _this;
    }
    return PersonFetchOrdersRemoteError;
}(errors_1.BaseError));
exports.PersonFetchOrdersRemoteError = PersonFetchOrdersRemoteError;
var PersonInitializationError = (function (_super) {
    tslib_1.__extends(PersonInitializationError, _super);
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
    tslib_1.__extends(PersonFetchRemoteError, _super);
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
    tslib_1.__extends(PeopleFetchRemoteError, _super);
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
var PeopleFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(PeopleFetchCountRemoteError, _super);
    function PeopleFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get people count.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PeopleFetchCountRemoteError';
        Object.setPrototypeOf(_this, PeopleFetchCountRemoteError.prototype);
        return _this;
    }
    return PeopleFetchCountRemoteError;
}(errors_1.BaseError));
exports.PeopleFetchCountRemoteError = PeopleFetchCountRemoteError;
var PeopleAnalyticsRemoteError = (function (_super) {
    tslib_1.__extends(PeopleAnalyticsRemoteError, _super);
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
    tslib_1.__extends(AddressFetchRemoteError, _super);
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
    tslib_1.__extends(AddressCreateRemoteError, _super);
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