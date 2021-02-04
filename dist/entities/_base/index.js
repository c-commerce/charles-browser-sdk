"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesList = exports.EntityFetchError = exports.EntityPutError = exports.EntityDeleteError = exports.EntityPostError = exports.EntityPatchError = exports.HookableEvented = void 0;
var tslib_1 = require("tslib");
var just_omit_1 = tslib_1.__importDefault(require("just-omit"));
var events_1 = require("events");
var readable_stream_1 = require("readable-stream");
var tapable_1 = require("tapable");
var helpers_1 = require("./helpers");
var just_diff_1 = require("just-diff");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../../errors");
var HookableEvented = (function (_super) {
    tslib_1.__extends(HookableEvented, _super);
    function HookableEvented() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HookableEvented;
}(events_1.EventEmitter));
exports.HookableEvented = HookableEvented;
var Entity = (function (_super) {
    tslib_1.__extends(Entity, _super);
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._fetch(options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._fetch = function (options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_1;
            return tslib_1.__generator(this, function (_c) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._patch(changePart)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._patch = function (changePart) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var patch, opts, response, err_2;
            return tslib_1.__generator(this, function (_c) {
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
                        patch = just_diff_1.diff(this._rawPayload, tslib_1.__assign(tslib_1.__assign({}, this._rawPayload), changePart), just_diff_1.jsonPatchPathConverter);
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._applyPatch(patch)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._applyPatch = function (patch) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_3;
            return tslib_1.__generator(this, function (_c) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._post()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._post = function () {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_4;
            return tslib_1.__generator(this, function (_d) {
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
    Entity.prototype.put = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._put()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._put = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var part, opts, response, err_5;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.id === null || this.id === undefined)
                            throw new TypeError('put requires id to be set.');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        part = just_omit_1.default(this.serialize(), ['id', 'created_at', 'updated_at']);
                        opts = {
                            method: 'PUT',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + this.id,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: part,
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 2:
                        response = _c.sent();
                        this.deserialize(response.data.data[0]);
                        return [2, this];
                    case 3:
                        err_5 = _c.sent();
                        throw new EntityPutError(undefined, { error: err_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Entity.prototype.delete = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._delete()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._delete = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, err_6;
            return tslib_1.__generator(this, function (_c) {
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
                        err_6 = _c.sent();
                        throw new EntityDeleteError(undefined, { error: err_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Entity.prototype.save = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._save(payload)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Entity.prototype._save = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.id && payload === undefined)) return [3, 2];
                        return [4, this.put()];
                    case 1: return [2, _a.sent()];
                    case 2:
                        if (!(this.id && payload)) return [3, 4];
                        return [4, this.patch(payload)];
                    case 3: return [2, _a.sent()];
                    case 4:
                        if (!(!this.id && payload)) return [3, 6];
                        this.deserialize(payload);
                        return [4, this.post()];
                    case 5: return [2, _a.sent()];
                    case 6: throw new TypeError('save requires a sendable payload');
                }
            });
        });
    };
    return Entity;
}(HookableEvented));
exports.default = Entity;
var EntityPatchError = (function (_super) {
    tslib_1.__extends(EntityPatchError, _super);
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
    tslib_1.__extends(EntityPostError, _super);
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
var EntityDeleteError = (function (_super) {
    tslib_1.__extends(EntityDeleteError, _super);
    function EntityDeleteError(message, properties) {
        if (message === void 0) { message = 'Could not delete resource unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EntityDeleteError';
        return _this;
    }
    return EntityDeleteError;
}(errors_1.BaseError));
exports.EntityDeleteError = EntityDeleteError;
var EntityPutError = (function (_super) {
    tslib_1.__extends(EntityPutError, _super);
    function EntityPutError(message, properties) {
        if (message === void 0) { message = 'Could not alter resource unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'EntityPutError';
        return _this;
    }
    return EntityPutError;
}(errors_1.BaseError));
exports.EntityPutError = EntityPutError;
var EntityFetchError = (function (_super) {
    tslib_1.__extends(EntityFetchError, _super);
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
    tslib_1.__extends(EntitiesList, _super);
    function EntitiesList() {
        return _super.call(this, { objectMode: true }) || this;
    }
    EntitiesList.prototype._read = function () {
    };
    EntitiesList.prototype._getStream = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err, stream, reader, read;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/" + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : '');
                        return [4, fetch(uri, {
                                headers: tslib_1.__assign(tslib_1.__assign({}, this.http.getDefaultHeaders()), { Accept: 'application/x-ndjson' })
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
    EntitiesList.prototype._exportCsv = function (options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        opts = {
                            method: 'GET',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            headers: {
                                Accept: 'text/csv'
                            },
                            responseType: 'blob'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts).then(function (res) { return res.data; }).catch(function (err) {
                                _this.emit('error', err);
                                return undefined;
                            }))];
                    case 1: return [2, _c.sent()];
                }
            });
        });
    };
    EntitiesList.pipeline = readable_stream_1.pipeline;
    return EntitiesList;
}(readable_stream_1.Readable));
exports.EntitiesList = EntitiesList;
//# sourceMappingURL=index.js.map