"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_error_1 = require("./base-error");
exports.BaseError = base_error_1.BaseError;
var AuthenticationFailed = (function (_super) {
    tslib_1.__extends(AuthenticationFailed, _super);
    function AuthenticationFailed(message, properties) {
        if (message === void 0) { message = 'Authentication was not successful'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuthenticationFailed';
        return _this;
    }
    return AuthenticationFailed;
}(base_error_1.BaseError));
exports.AuthenticationFailed = AuthenticationFailed;
var PasswordResetRequestFailed = (function (_super) {
    tslib_1.__extends(PasswordResetRequestFailed, _super);
    function PasswordResetRequestFailed(message, properties) {
        if (message === void 0) { message = 'Could not reset password'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PasswordResetRequestFailed';
        return _this;
    }
    return PasswordResetRequestFailed;
}(base_error_1.BaseError));
exports.PasswordResetRequestFailed = PasswordResetRequestFailed;
var PasswordSetRequestFailed = (function (_super) {
    tslib_1.__extends(PasswordSetRequestFailed, _super);
    function PasswordSetRequestFailed(message, properties) {
        if (message === void 0) { message = 'Could not set password'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PasswordSetRequestFailed';
        return _this;
    }
    return PasswordSetRequestFailed;
}(base_error_1.BaseError));
exports.PasswordSetRequestFailed = PasswordSetRequestFailed;
var UninstantiatedClient = (function (_super) {
    tslib_1.__extends(UninstantiatedClient, _super);
    function UninstantiatedClient(message, properties) {
        if (message === void 0) { message = 'Cannot instantiate API without instantiated HTTP client'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UninstantiatedClient';
        return _this;
    }
    return UninstantiatedClient;
}(base_error_1.BaseError));
exports.UninstantiatedClient = UninstantiatedClient;
//# sourceMappingURL=index.js.map