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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var just_safe_get_1 = __importDefault(require("just-safe-get"));
var BaseError = (function (_super) {
    __extends(BaseError, _super);
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