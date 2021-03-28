"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffInviteError = exports.StaffsFetchRemoteError = exports.StaffFetchRemoteError = exports.StaffInitializationError = exports.Staffs = exports.Staff = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var Staff = (function (_super) {
    tslib_1.__extends(Staff, _super);
    function Staff(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/staff';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Staff.prototype.deserialize = function (rawPayload) {
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
        this.comment = rawPayload.comment;
        this.type = rawPayload.type;
        this.gender = rawPayload.gender;
        this.user = rawPayload.user;
        this.roles = rawPayload.roles;
        this.permissions = rawPayload.permissions;
        this.invite = rawPayload.invite;
        return this;
    };
    Staff.create = function (payload, universe, http) {
        return new Staff({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Staff.prototype.serialize = function () {
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
            comment: this.comment,
            type: this.type,
            gender: this.gender,
            user: this.user,
            roles: this.roles,
            permissions: this.permissions,
            invite: this.invite
        };
    };
    Staff.prototype.init = function () {
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
                        throw this.handleError(new StaffInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Staff.prototype.inviteUser = function (userEmail, userFirstName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/invite",
                            data: {
                                email: userEmail !== null && userEmail !== void 0 ? userEmail : undefined,
                                first_name: userFirstName !== null && userFirstName !== void 0 ? userFirstName : undefined
                            }
                        };
                        return [4, this.http.getClient()(opts)];
                    case 1:
                        response = _a.sent();
                        this.deserialize(response.data.data[0]);
                        return [2, this];
                    case 2:
                        err_2 = _a.sent();
                        throw this.handleError(new StaffInviteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Staff;
}(_base_1.UniverseEntity));
exports.Staff = Staff;
var Staffs = (function () {
    function Staffs() {
    }
    Staffs.endpoint = 'api/v0/staff';
    return Staffs;
}());
exports.Staffs = Staffs;
var StaffInitializationError = (function (_super) {
    tslib_1.__extends(StaffInitializationError, _super);
    function StaffInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize staff.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffInitializationError';
        return _this;
    }
    return StaffInitializationError;
}(errors_1.BaseError));
exports.StaffInitializationError = StaffInitializationError;
var StaffFetchRemoteError = (function (_super) {
    tslib_1.__extends(StaffFetchRemoteError, _super);
    function StaffFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get staff.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffFetchRemoteError';
        return _this;
    }
    return StaffFetchRemoteError;
}(errors_1.BaseError));
exports.StaffFetchRemoteError = StaffFetchRemoteError;
var StaffsFetchRemoteError = (function (_super) {
    tslib_1.__extends(StaffsFetchRemoteError, _super);
    function StaffsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get staffs.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffsFetchRemoteError';
        return _this;
    }
    return StaffsFetchRemoteError;
}(errors_1.BaseError));
exports.StaffsFetchRemoteError = StaffsFetchRemoteError;
var StaffInviteError = (function (_super) {
    tslib_1.__extends(StaffInviteError, _super);
    function StaffInviteError(message, properties) {
        if (message === void 0) { message = 'Could not invite user unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffInviteError';
        return _this;
    }
    return StaffInviteError;
}(errors_1.BaseError));
exports.StaffInviteError = StaffInviteError;
//# sourceMappingURL=staff.js.map