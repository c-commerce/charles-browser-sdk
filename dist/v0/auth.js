"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutFailed = exports.LogoutMissingToken = exports.Auth = exports.isOrgAuth = exports.isTokenAuth = exports.isKeyAuth = exports.isUsernameAuth = exports.AuthTypes = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var errors = tslib_1.__importStar(require("../errors"));
var client_1 = require("../client");
var AuthTypes;
(function (AuthTypes) {
    AuthTypes[AuthTypes["username"] = 1] = "username";
    AuthTypes[AuthTypes["key"] = 2] = "key";
    AuthTypes[AuthTypes["accessToken"] = 3] = "accessToken";
    AuthTypes[AuthTypes["org"] = 4] = "org";
    AuthTypes[AuthTypes["support"] = 5] = "support";
    AuthTypes[AuthTypes["cookie"] = 6] = "cookie";
})(AuthTypes = exports.AuthTypes || (exports.AuthTypes = {}));
function isUsernameAuth(object) {
    return 'password' in object;
}
exports.isUsernameAuth = isUsernameAuth;
function isKeyAuth(object) {
    return 'apiKey' in object;
}
exports.isKeyAuth = isKeyAuth;
function isTokenAuth(object) {
    return 'accessToken' in object;
}
exports.isTokenAuth = isTokenAuth;
function isOrgAuth(object) {
    return 'organization' in object;
}
exports.isOrgAuth = isOrgAuth;
var Auth = (function () {
    function Auth(options) {
        var _a, _b;
        this.authenticated = false;
        this.options = options;
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://hello-charles.com';
        this.authBaseUrl = (_b = this.options.authBaseUrl) !== null && _b !== void 0 ? _b : 'https://hello-charles.com';
        if (!this.options.credentials && options.withCredentials !== true)
            return;
        this.determineAuthType();
        if (this.options.user && this.options.type === AuthTypes.accessToken) {
            this.setDefaultHeader(this.options.user, this.options.credentials.accessToken, this.options.withCredentials);
        }
        else if (options.withCredentials) {
            this.setDefaultHeader(undefined, undefined, options.withCredentials);
        }
    }
    Auth.prototype.clearInstance = function () {
        this.authenticated = false;
        this.options.credentials = undefined;
        this.options.accessToken = undefined;
        this.options.user = undefined;
        this.options.type = undefined;
    };
    Auth.prototype.determineAuthType = function () {
        if (!this.options.credentials && this.options.withCredentials) {
            this.options.type = AuthTypes.cookie;
            return;
        }
        if (isUsernameAuth(this.options.credentials))
            this.options.type = AuthTypes.username;
        if (isKeyAuth(this.options.credentials))
            this.options.type = AuthTypes.key;
        if (isTokenAuth(this.options.credentials))
            this.options.type = AuthTypes.accessToken;
        if (isOrgAuth(this.options.credentials))
            this.options.type = AuthTypes.org;
    };
    Auth.prototype.authenticate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.options.type === AuthTypes.username)) return [3, 2];
                        return [4, this.loginUsername(this.options.credentials)];
                    case 1: return [2, _a.sent()];
                    case 2: throw new errors.AuthenticationFailed('No auth data was provided');
                }
            });
        });
    };
    Auth.prototype.loginUsername = function (authData) {
        var _a, _b;
        if (authData === void 0) { authData = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var username, password, withCredentials, response, err_1, error;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.options.credentials &&
                            this.options.credentials.username &&
                            this.options.credentials.password) {
                            username = this.options.credentials.username;
                            password = this.options.credentials.password;
                        }
                        else if ((authData === null || authData === void 0 ? void 0 : authData.username) && authData.password) {
                            username = authData.username;
                            password = authData.password;
                        }
                        else {
                            throw new errors.UninstantiatedClient();
                        }
                        withCredentials = (_a = authData.withCredentials) !== null && _a !== void 0 ? _a : !!this.options.credentials;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, axios_1.default.post(((_b = authData.authBaseUrl) !== null && _b !== void 0 ? _b : this.authBaseUrl) + "/api/v0/users/auth/login", {
                                email: username,
                                password: password,
                                recaptcha_token: authData.recaptcha_token
                            }, {
                                withCredentials: withCredentials
                            })];
                    case 2:
                        response = _c.sent();
                        this.setDefaultHeader(response.data.data.id, response.data.data.access_token, withCredentials);
                        return [2, {
                                id: response.data.data.id,
                                access_token: response.data.data.access_token,
                                user: response.data.data.id,
                                email: response.data.data.email,
                                name: response.data.data.name,
                                permissions: response.data.data.permissions || [],
                                roles: response.data.data.roles
                            }];
                    case 3:
                        err_1 = _c.sent();
                        error = new errors.AuthenticationFailed(undefined, {
                            error: err_1, body: !!err_1.response && err_1.response.data ? err_1.response.data : null
                        });
                        throw error;
                    case 4: return [2];
                }
            });
        });
    };
    Auth.prototype.requestPasswordReset = function (target) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.authBaseUrl + "/api/v0/users/auth/login/password_reset", {
                                email: target.email
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2, {
                                msg: data.msg
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.PasswordResetRequestFailed(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.setNewPassword = function (nonce) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.authBaseUrl + "/api/v0/users/auth/login/password_set", {
                                password: nonce.password,
                                password_reset_id: nonce.password_reset_id
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2, {
                                msg: data.msg
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new errors.PasswordSetRequestFailed(undefined, { error: err_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.setDefaultHeader = function (user, token, withCredentials) {
        var clientOptions = {
            headers: {},
            withCredentials: withCredentials !== null && withCredentials !== void 0 ? withCredentials : !!this.options.credentials
        };
        if (token && (clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.headers)) {
            clientOptions.headers.Authorization = "Bearer " + token;
        }
        if (user && (clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.headers)) {
            clientOptions.headers['X-Client-ID'] = user;
        }
        this.setAuthed(token, withCredentials);
        this.user = user;
        client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    Auth.prototype.logout = function (options, token) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var withCredentials, opts, data, err_4;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        withCredentials = !!this.options.withCredentials;
                        if (!withCredentials && (!token && !this.accessToken)) {
                            throw new LogoutMissingToken();
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        opts = {
                            headers: {}
                        };
                        if (!withCredentials) {
                            opts.headers.Authorization = "Bearer " + (token !== null && token !== void 0 ? token : this.accessToken);
                        }
                        return [4, axios_1.default.post(((_a = options === null || options === void 0 ? void 0 : options.authBaseUrl) !== null && _a !== void 0 ? _a : this.authBaseUrl) + "/api/v0/users/auth/logout", opts)];
                    case 2:
                        data = (_b.sent()).data;
                        return [2, {
                                msg: data.msg
                            }];
                    case 3:
                        err_4 = _b.sent();
                        throw new LogoutFailed(undefined, { error: err_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Auth.prototype.setAuthed = function (accessToken, withCredentials) {
        if (!accessToken && withCredentials !== true)
            throw new TypeError('setting authed requires access token');
        if (accessToken) {
            this.accessToken = accessToken;
            this.authenticated = true;
        }
        else if (withCredentials === true) {
            this.authenticated = true;
        }
        return this;
    };
    return Auth;
}());
exports.Auth = Auth;
var LogoutMissingToken = (function (_super) {
    tslib_1.__extends(LogoutMissingToken, _super);
    function LogoutMissingToken(message, properties) {
        if (message === void 0) { message = 'Could not log out due to missing token.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LogoutMissingToken';
        return _this;
    }
    return LogoutMissingToken;
}(errors.BaseError));
exports.LogoutMissingToken = LogoutMissingToken;
var LogoutFailed = (function (_super) {
    tslib_1.__extends(LogoutFailed, _super);
    function LogoutFailed(message, properties) {
        if (message === void 0) { message = 'Could not log out.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LogoutFailed';
        return _this;
    }
    return LogoutFailed;
}(errors.BaseError));
exports.LogoutFailed = LogoutFailed;
//# sourceMappingURL=auth.js.map