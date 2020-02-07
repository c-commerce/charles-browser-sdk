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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var errors = __importStar(require("../errors"));
var client_1 = require("../client");
var AuthTypes;
(function (AuthTypes) {
    AuthTypes[AuthTypes["username"] = 1] = "username";
    AuthTypes[AuthTypes["key"] = 2] = "key";
    AuthTypes[AuthTypes["accessToken"] = 3] = "accessToken";
    AuthTypes[AuthTypes["org"] = 4] = "org";
    AuthTypes[AuthTypes["support"] = 5] = "support";
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
/**
 * @class "v0.Auth"
 */
var Auth = /** @class */ (function () {
    function Auth(options) {
        this.authenticated = false;
        this.options = options;
        this.options.base = this.options.base || 'https://hello-charles.com';
        this.authBaseUrl = this.options.authBaseUrl || 'https://hello-charles.com';
        if (!this.options.credentials)
            return;
        this.determineAuthType();
        if (this.options.user && this.options.type === AuthTypes.accessToken) {
            this.setDefaultHeader(this.options.user, this.options.credentials.accessToken);
        }
    }
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    Auth.prototype.clearInstance = function () {
        this.authenticated = false;
        this.options.credentials = undefined;
        this.options.accessToken = undefined;
        this.options.user = undefined;
        this.options.type = undefined;
    };
    Auth.prototype.determineAuthType = function () {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options.type === AuthTypes.username) {
                    return [2 /*return*/, this.loginUsername(this.options.credentials)];
                }
                throw new errors.AuthenticationFailed('No auth data was provided');
            });
        });
    };
    Auth.prototype.loginUsername = function (authData) {
        if (authData === void 0) { authData = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var username, password, response, err_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options.credentials &&
                            this.options.credentials.username &&
                            this.options.credentials.password) {
                            username = this.options.credentials.username;
                            password = this.options.credentials.password;
                        }
                        else if (authData && authData.username && authData.password) {
                            username = authData.username;
                            password = authData.password;
                        }
                        else {
                            throw new errors.UninstantiatedClient();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.post((authData.authBaseUrl || this.authBaseUrl) + "/api/v0/users/auth/login", {
                                email: username,
                                password: password,
                                recaptcha_token: authData.recaptcha_token
                            })];
                    case 2:
                        response = _a.sent();
                        this.setDefaultHeader(response.data.data.id, response.data.data.access_token);
                        return [2 /*return*/, {
                                access_token: response.data.data.access_token,
                                user: response.data.data.id,
                                email: response.data.data.email,
                                name: response.data.data.name,
                                permissions: response.data.data.permissions || [],
                                roles: response.data.data.roles
                            }];
                    case 3:
                        err_1 = _a.sent();
                        error = new errors.AuthenticationFailed(undefined, {
                            error: err_1, body: err_1.response && err_1.response.data ? err_1.response.data : null
                        });
                        throw error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.requestPasswordReset = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.authBaseUrl + "/api/v0/users/auth/login/password_reset", {
                                email: target.email
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                msg: data.msg
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.PasswordResetRequestFailed(undefined, { error: err_2 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.setNewPassword = function (nonce) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.authBaseUrl + "/api/v0/users/auth/login/password_set", {
                                password: nonce.password,
                                password_reset_id: nonce.password_reset_id
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                msg: data.msg
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new errors.PasswordSetRequestFailed(undefined, { error: err_3 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.setDefaultHeader = function (user, token) {
        var clientOptions = {
            headers: {
                Authorization: "Bearer " + token,
                'X-Client-ID': user
            }
        };
        this.accessToken = token;
        this.user = user;
        this.authenticated = true;
        client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    Auth.prototype.logout = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token && !this.accessToken) {
                            throw new LogoutMissingToken();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(this.authBaseUrl + "/api/v0/users/auth/logout", {
                                headers: {
                                    Authorization: "Bearer " + (token || this.accessToken)
                                }
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                msg: data.msg
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new LogoutFailed(undefined, { error: err_4 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Auth;
}());
exports.Auth = Auth;
var LogoutMissingToken = /** @class */ (function (_super) {
    __extends(LogoutMissingToken, _super);
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
var LogoutFailed = /** @class */ (function (_super) {
    __extends(LogoutFailed, _super);
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