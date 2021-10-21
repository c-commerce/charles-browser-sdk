"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnExceptionFromError = exports.throwExceptionFromCommonError = void 0;
var universe_1 = require("../universe");
function throwExceptionFromCommonError(error) {
    var exception = returnExceptionFromError(error);
    if (exception) {
        throw exception;
    }
}
exports.throwExceptionFromCommonError = throwExceptionFromCommonError;
function returnExceptionFromError(error) {
    var _a;
    var status = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
    if (status === 401) {
        return new universe_1.UniverseUnauthenticatedError(undefined, { error: error });
    }
    if (status === 403) {
        return new universe_1.UniverseForbiddenError(undefined, { error: error });
    }
    if (status === 502) {
        return new universe_1.UniverseBadGatewayError(undefined, { error: error });
    }
    if (status === 503) {
        return new universe_1.UniverseServiceUnavailableError(undefined, { error: error });
    }
    if (status === 504) {
        return new universe_1.UniverseTimeoutError(undefined, { error: error });
    }
}
exports.returnExceptionFromError = returnExceptionFromError;
//# sourceMappingURL=throwExceptionFromCommonError.js.map