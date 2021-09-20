"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PossibleDuplicatesFetchRemoteError = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../../errors");
var PossibleDuplicatesFetchRemoteError = (function (_super) {
    tslib_1.__extends(PossibleDuplicatesFetchRemoteError, _super);
    function PossibleDuplicatesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not fetch list with possible duplicated contacts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PossibleDuplicatesFetchRemoteError';
        Object.setPrototypeOf(_this, PossibleDuplicatesFetchRemoteError.prototype);
        return _this;
    }
    return PossibleDuplicatesFetchRemoteError;
}(errors_1.BaseError));
exports.PossibleDuplicatesFetchRemoteError = PossibleDuplicatesFetchRemoteError;
//# sourceMappingURL=possible-duplicates.js.map