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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var events_1 = require("events");
var readable_stream_1 = require("readable-stream");
var tapable_1 = require("tapable");
var helpers_1 = require("./helpers");
var just_diff_1 = require("just-diff");
var qs_1 = __importDefault(require("qs"));
var errors_1 = require("../../errors");
var HookableEvented = (function (_super) {
    __extends(HookableEvented, _super);
    function HookableEvented() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HookableEvented;
}(events_1.EventEmitter));
exports.HookableEvented = HookableEvented;
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        var _this = _super.call(this) || this;
        _this._rawPayload = null;
        _this.hooks = {
            beforeSetRawPayload: new tapable_1.SyncHook(['beforeSetRawPayload'])
        };
        return _this;
    }
    Entity.prototype.setRawPayload = function (p) {
        this.hooks.beforeSetRawPayload.call(p);
        this._rawPayload = JSON.parse(JSON.stringify(p));
        return this;
    };
    Entity.prototype.handleError = function (err) {
        if (this.listeners('error').length > 0)
            this.emit('error', err);
        return err;
    };
    Entity.prototype.fetch = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._fetch(options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._fetch = function (options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var opts, response, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('fetch requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'GET',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: undefined,
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        response = _c.sent();
                        this.deserialize(response.data.data[0]);
                        return [2, this];
                    case 3:
                        err_1 = _c.sent();
                        throw new EntityFetchError(undefined, { error: err_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Entity.prototype.patch = function (changePart) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._patch(changePart)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._patch = function (changePart) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var patch, opts, response, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this._rawPayload === null || this._rawPayload === undefined)
                            throw new TypeError('patch requires raw payload to be set.');
                        if (!changePart)
                            throw new TypeError('patch requires incoming object to be set.');
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('patch requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        patch = just_diff_1.diff(this._rawPayload, __assign(__assign({}, this._rawPayload), changePart), just_diff_1.jsonPatchPathConverter);
                        opts = {
                            method: 'PATCH',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id,
                            headers: {
                                'Content-Type': 'application/json-patch+json'
                            },
                            data: patch,
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        response = _c.sent();
                        this.deserialize(response.data.data[0]);
                        return [2, this];
                    case 3:
                        err_2 = _c.sent();
                        throw new EntityPatchError(undefined, { error: err_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Entity.prototype.applyPatch = function (patch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._applyPatch(patch)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._applyPatch = function (patch) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var opts, response, err_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!patch)
                            throw new TypeError('apply patch requires incoming patch to be set.');
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('apply patch requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'PATCH',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id,
                            headers: {
                                'Content-Type': 'application/json-patch+json'
                            },
                            data: patch,
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        response = _c.sent();
                        this.deserialize(response.data.data[0]);
                        return [2, this];
                    case 3:
                        err_3 = _c.sent();
                        throw new EntityPatchError(undefined, { error: err_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Entity.prototype.post = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._post()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._post = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var opts, response, err_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: (_b = this._rawPayload) !== null && _b !== void 0 ? _b : undefined,
                            responseType: 'json'
                        };
                        return [4, ((_c = this.http) === null || _c === void 0 ? void 0 : _c.getClient()(opts))];
                    case 1:
                        response = _d.sent();
                        this.deserialize(response.data.data[0]);
                        return [2, this];
                    case 2:
                        err_4 = _d.sent();
                        throw new EntityPostError(undefined, { error: err_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Entity.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._delete()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._delete = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var opts, err_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('delete requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        opts = {
                            method: 'DELETE',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: undefined,
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        _c.sent();
                        return [2, this];
                    case 3:
                        err_5 = _c.sent();
                        throw new EntityPostError(undefined, { error: err_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Entity.prototype.save = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._save(payload)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._save = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.id && payload)) return [3, 2];
                        return [4, this.patch(payload)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        if (!(!this.id && payload)) return [3, 4];
                        this.deserialize(payload);
                        return [4, this.post()];
                    case 3: return [2, _a.sent()];
                    case 4: throw new TypeError('save requires a sendable payload');
                }
            });
        });
    };
    return Entity;
}(HookableEvented));
exports.default = Entity;
var EntityPatchError = (function (_super) {
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
var EntityPostError = (function (_super) {
    __extends(EntityPostError, _super);
    function EntityPostError(message, properties) {
        if (message === void 0) { message = 'Could not create resource unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EntityPostError';
        return _this;
    }
    return EntityPostError;
}(errors_1.BaseError));
exports.EntityPostError = EntityPostError;
var EntityFetchError = (function (_super) {
    __extends(EntityFetchError, _super);
    function EntityFetchError(message, properties) {
        if (message === void 0) { message = 'Could fetch resource unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EntityFetchError';
        return _this;
    }
    return EntityFetchError;
}(errors_1.BaseError));
exports.EntityFetchError = EntityFetchError;
var EntitiesList = (function (_super) {
    __extends(EntitiesList, _super);
    function EntitiesList() {
        return _super.call(this, { objectMode: true }) || this;
    }
    EntitiesList.prototype._read = function () {
    };
    EntitiesList.prototype._getStream = function (options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var uri, response, err, stream, reader, read;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : '');
                        return [4, fetch(uri, {
                                headers: __assign(__assign({}, this.http.getDefaultHeaders()), { Accept: 'application/x-ndjson' })
                            })];
                    case 1:
                        response = _b.sent();
                        if (!response.body) {
                            err = new TypeError('unexpected stream response');
                            this.emit('error', err);
                            throw err;
                        }
                        stream = helpers_1.ndjsonStream(response.body);
                        reader = stream.getReader();
                        reader.read().then(read = function (result) {
                            if (result.done) {
                                _this.push(null);
                                return;
                            }
                            _this.push(_this.parseItem(result.value));
                            reader.read()
                                .then(read)
                                .catch(function (err) {
                                _this.emit('error', err);
                            });
                        }).catch(function (err) {
                            _this.emit('error', err);
                        });
                        return [2, this];
                }
            });
        });
    };
    EntitiesList.pipeline = readable_stream_1.pipeline;
    return EntitiesList;
}(readable_stream_1.Readable));
exports.EntitiesList = EntitiesList;
//# sourceMappingURL=index.js.map