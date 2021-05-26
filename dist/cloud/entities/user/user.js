"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniverseUsersFetchRemoteError = exports.UniverseUserFetchRemoteError = exports.UniverseUserInitializationError = exports.UniverseUsers = exports.UniverseUser = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../../../entities/_base"));
var errors_1 = require("../../../errors");
var UniverseUser = (function (_super) {
    tslib_1.__extends(UniverseUser, _super);
    function UniverseUser(options) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this.apiCarrier = options.carrier;
        _this.endpoint = 'api/v0/users';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if ((_b = options === null || options === void 0 ? void 0 : options.rawPayload) === null || _b === void 0 ? void 0 : _b.universe) {
            _this.endpoint = "api/v0/universes/" + options.rawPayload.universe + "/users";
        }
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    UniverseUser.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.universe = rawPayload.universe;
        this.lightProfile = rawPayload.light_profile;
        return this;
    };
    UniverseUser.create = function (payload, carrier, http) {
        return new UniverseUser({ rawPayload: payload, carrier: carrier, http: http, initialized: true });
    };
    UniverseUser.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            universe: this.universe,
            light_profile: this.lightProfile
        };
    };
    UniverseUser.prototype.init = function () {
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
                        throw this.handleError(new UniverseUserInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return UniverseUser;
}(_base_1.default));
exports.UniverseUser = UniverseUser;
var UniverseUsers = (function () {
    function UniverseUsers() {
    }
    UniverseUsers.endpoint = 'api/v0/users';
    return UniverseUsers;
}());
exports.UniverseUsers = UniverseUsers;
var UniverseUserInitializationError = (function (_super) {
    tslib_1.__extends(UniverseUserInitializationError, _super);
    function UniverseUserInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize UniverseUser.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseUserInitializationError';
        return _this;
    }
    return UniverseUserInitializationError;
}(errors_1.BaseError));
exports.UniverseUserInitializationError = UniverseUserInitializationError;
var UniverseUserFetchRemoteError = (function (_super) {
    tslib_1.__extends(UniverseUserFetchRemoteError, _super);
    function UniverseUserFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get UniverseUser.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseUserFetchRemoteError';
        return _this;
    }
    return UniverseUserFetchRemoteError;
}(errors_1.BaseError));
exports.UniverseUserFetchRemoteError = UniverseUserFetchRemoteError;
var UniverseUsersFetchRemoteError = (function (_super) {
    tslib_1.__extends(UniverseUsersFetchRemoteError, _super);
    function UniverseUsersFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get UniverseUsers.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UniverseUsersFetchRemoteError';
        return _this;
    }
    return UniverseUsersFetchRemoteError;
}(errors_1.BaseError));
exports.UniverseUsersFetchRemoteError = UniverseUsersFetchRemoteError;
//# sourceMappingURL=user.js.map