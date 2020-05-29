"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var CustomPropertyInputTypesEnum;
(function (CustomPropertyInputTypesEnum) {
    CustomPropertyInputTypesEnum["select"] = "select";
    CustomPropertyInputTypesEnum["radio"] = "radio";
    CustomPropertyInputTypesEnum["textinput"] = "textinput";
    CustomPropertyInputTypesEnum["textbox"] = "textbox";
    CustomPropertyInputTypesEnum["numberinput"] = "numberinput";
    CustomPropertyInputTypesEnum["date"] = "date";
    CustomPropertyInputTypesEnum["datetime"] = "datetime";
})(CustomPropertyInputTypesEnum = exports.CustomPropertyInputTypesEnum || (exports.CustomPropertyInputTypesEnum = {}));
var CustomPropertyTypesEnum;
(function (CustomPropertyTypesEnum) {
    CustomPropertyTypesEnum["string"] = "string";
    CustomPropertyTypesEnum["number"] = "number";
    CustomPropertyTypesEnum["boolean"] = "boolean";
})(CustomPropertyTypesEnum = exports.CustomPropertyTypesEnum || (exports.CustomPropertyTypesEnum = {}));
var CustomProperty = (function (_super) {
    tslib_1.__extends(CustomProperty, _super);
    function CustomProperty(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/custom_properties';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    CustomProperty.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.object = rawPayload.object;
        this.type = rawPayload.type;
        this.input = rawPayload.input;
        this.description = rawPayload.description;
        this.showIn = rawPayload.show_in;
        return this;
    };
    CustomProperty.create = function (payload, universe, http) {
        return new CustomProperty({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    CustomProperty.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            object: this.object,
            type: this.type,
            input: this.input,
            description: this.description,
            show_in: this.showIn
        };
    };
    CustomProperty.prototype.init = function () {
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
                        throw this.handleError(new CustomPropertyInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return CustomProperty;
}(_base_1.default));
exports.CustomProperty = CustomProperty;
var CustomProperties = (function () {
    function CustomProperties() {
    }
    CustomProperties.endpoint = 'api/v0/custom_properties';
    return CustomProperties;
}());
exports.CustomProperties = CustomProperties;
var CustomPropertyInitializationError = (function (_super) {
    tslib_1.__extends(CustomPropertyInitializationError, _super);
    function CustomPropertyInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize custom property.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomPropertyInitializationError';
        Object.setPrototypeOf(_this, CustomPropertyInitializationError.prototype);
        return _this;
    }
    return CustomPropertyInitializationError;
}(errors_1.BaseError));
exports.CustomPropertyInitializationError = CustomPropertyInitializationError;
var CustomPropertyFetchRemoteError = (function (_super) {
    tslib_1.__extends(CustomPropertyFetchRemoteError, _super);
    function CustomPropertyFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get custom property.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomPropertyFetchRemoteError';
        Object.setPrototypeOf(_this, CustomPropertyFetchRemoteError.prototype);
        return _this;
    }
    return CustomPropertyFetchRemoteError;
}(errors_1.BaseError));
exports.CustomPropertyFetchRemoteError = CustomPropertyFetchRemoteError;
var CustomPropertiesFetchRemoteError = (function (_super) {
    tslib_1.__extends(CustomPropertiesFetchRemoteError, _super);
    function CustomPropertiesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get custom properties.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomPropertiesFetchRemoteError';
        Object.setPrototypeOf(_this, CustomPropertiesFetchRemoteError.prototype);
        return _this;
    }
    return CustomPropertiesFetchRemoteError;
}(errors_1.BaseError));
exports.CustomPropertiesFetchRemoteError = CustomPropertiesFetchRemoteError;
//# sourceMappingURL=custom-property.js.map