"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var just_safe_get_1 = tslib_1.__importDefault(require("just-safe-get"));
var BaseError = (function (_super) {
    tslib_1.__extends(BaseError, _super);
    function BaseError(message, properties) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.properties = properties;
        Object.setPrototypeOf(_this, BaseError.prototype);
        return _this;
    }
    BaseError.handleCommonProperties = function (maybeError, additionalProperties) {
        var props = Object.assign({ error: maybeError }, additionalProperties !== null && additionalProperties !== void 0 ? additionalProperties : {}, { localizedErrors: just_safe_get_1.default(maybeError, 'response.data.errors') });
        return props;
    };
    return BaseError;
}(Error));
exports.BaseError = BaseError;
//# sourceMappingURL=base-error.js.map