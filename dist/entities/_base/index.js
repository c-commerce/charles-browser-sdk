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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var just_diff_1 = require("just-diff");
var errors_1 = require("../../errors");
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._rawPayload = null;
        return _this;
    }
    Entity.prototype.setRawPayload = function (p) {
        this._rawPayload = p;
        return this;
    };
    Entity.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
        return err;
    };
    Entity.prototype.patch = function (changePart) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // we allow implementers to override us by calling ._patch directly and e.g. handle our error differently
                return [2 /*return*/, this._patch(changePart)];
            });
        });
    };
    Entity.prototype._patch = function (changePart) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var patch, opts, response, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this._rawPayload === null || this._rawPayload === undefined)
                            throw new TypeError('patch requires raw payload to be set.');
                        if (!changePart)
                            throw new TypeError('patch requires incoming object to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        patch = just_diff_1.diff(this._rawPayload, changePart, just_diff_1.jsonPatchPathConverter);
                        opts = {
                            method: 'PATCH',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id,
                            headers: {
                                'Content-Type': 'application/json-patch+json'
                            },
                            data: patch,
                            responseType: 'json'
                        };
                        return [4 /*yield*/, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        response = _c.sent();
                        this.deserialize(response.data.data[0]);
                        return [2 /*return*/, this];
                    case 3:
                        err_1 = _c.sent();
                        throw new EntityPatchError(undefined, { error: err_1 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Entity;
}(events_1.EventEmitter));
exports.default = Entity;
var EntityPatchError = /** @class */ (function (_super) {
    __extends(EntityPatchError, _super);
    function EntityPatchError(message, properties) {
        if (message === void 0) { message = 'Could not partially alter resource unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EntityPatchError';
        return _this;
    }
    return EntityPatchError;
}(errors_1.BaseError));
exports.EntityPatchError = EntityPatchError;
//# sourceMappingURL=index.js.map