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
Object.defineProperty(exports, "__esModule", { value: true });
var _base_1 = __importDefault(require("../_base"));
var errors_1 = require("../../errors");
var DiscountTypesEnum;
(function (DiscountTypesEnum) {
    DiscountTypesEnum["rate"] = "rate";
    DiscountTypesEnum["value"] = "value";
})(DiscountTypesEnum = exports.DiscountTypesEnum || (exports.DiscountTypesEnum = {}));
var Discount = (function (_super) {
    __extends(Discount, _super);
    function Discount(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/discounts';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Discount.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.type = rawPayload.type;
        this.value = rawPayload.value;
        this.name = rawPayload.name;
        this.i18n = rawPayload.i18n;
        return this;
    };
    Discount.create = function (payload, universe, http) {
        return new Discount({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Discount.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            type: this.type,
            value: this.value,
            name: this.name,
            i18n: this.i18n
        };
    };
    Discount.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.fetch()];
                    case 1:
                        _a.sent();
                        return [2, this];
                    case 2:
                        err_1 = _a.sent();
                        throw this.handleError(new DiscountInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Discount;
}(_base_1.default));
exports.Discount = Discount;
var Discounts = (function () {
    function Discounts() {
    }
    Discounts.endpoint = 'api/v0/discounts';
    return Discounts;
}());
exports.Discounts = Discounts;
var DiscountInitializationError = (function (_super) {
    __extends(DiscountInitializationError, _super);
    function DiscountInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize discount.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountInitializationError';
        return _this;
    }
    return DiscountInitializationError;
}(errors_1.BaseError));
exports.DiscountInitializationError = DiscountInitializationError;
var DiscountFetchRemoteError = (function (_super) {
    __extends(DiscountFetchRemoteError, _super);
    function DiscountFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get discount.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountFetchRemoteError';
        return _this;
    }
    return DiscountFetchRemoteError;
}(errors_1.BaseError));
exports.DiscountFetchRemoteError = DiscountFetchRemoteError;
var DiscountsFetchRemoteError = (function (_super) {
    __extends(DiscountsFetchRemoteError, _super);
    function DiscountsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get discounts.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountsFetchRemoteError';
        return _this;
    }
    return DiscountsFetchRemoteError;
}(errors_1.BaseError));
exports.DiscountsFetchRemoteError = DiscountsFetchRemoteError;
//# sourceMappingURL=discount.js.map