"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThingsBindRemoteError = exports.ThingsFetchRemoteError = exports.ThingFetchRemoteError = exports.ThingInitializationError = exports.Things = exports.Thing = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Thing = (function (_super) {
    tslib_1.__extends(Thing, _super);
    function Thing(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/things';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Thing.prototype.deserialize = function (rawPayload) {
        var _a, _b, _c;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.kind = rawPayload.kind;
        this.name = rawPayload.name;
        this.configuration = rawPayload.configuration;
        this.groups = rawPayload.groups;
        this.labels = rawPayload.labels;
        this.autoDisconnect = (_c = rawPayload.auto_disconnect) !== null && _c !== void 0 ? _c : false;
        this.lastActivityAt = rawPayload.last_activity_at ? new Date(rawPayload.last_activity_at) : undefined;
        return this;
    };
    Thing.create = function (payload, universe, http) {
        return new Thing({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Thing.prototype.serialize = function () {
        var _a, _b, _c;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            kind: this.kind,
            name: this.name,
            configuration: this.configuration,
            groups: this.groups,
            labels: this.labels,
            auto_disconnect: (_c = this.autoDisconnect) !== null && _c !== void 0 ? _c : false,
            last_activity_at: this.lastActivityAt ? this.lastActivityAt.toISOString() : undefined
        };
    };
    Thing.prototype.init = function () {
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
                        throw this.handleError(new ThingInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Thing.prototype.bind = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._bind(payload)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Thing.prototype._bind = function (payload) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response, err_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'PUT',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + this.endpoint + "/bind",
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: tslib_1.__assign(tslib_1.__assign({}, (payload !== null && payload !== void 0 ? payload : this._rawPayload)), { id: undefined }),
                            responseType: 'json'
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 1:
                        response = _c.sent();
                        this.deserialize(response.data.data[0]);
                        return [2, this];
                    case 2:
                        err_2 = _c.sent();
                        throw new ThingsBindRemoteError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return Thing;
}(_base_1.default));
exports.Thing = Thing;
var Things = (function () {
    function Things() {
    }
    Things.endpoint = 'api/v0/things';
    return Things;
}());
exports.Things = Things;
var ThingInitializationError = (function (_super) {
    tslib_1.__extends(ThingInitializationError, _super);
    function ThingInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize thing.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ThingInitializationError';
        Object.setPrototypeOf(_this, ThingInitializationError.prototype);
        return _this;
    }
    return ThingInitializationError;
}(errors_1.BaseError));
exports.ThingInitializationError = ThingInitializationError;
var ThingFetchRemoteError = (function (_super) {
    tslib_1.__extends(ThingFetchRemoteError, _super);
    function ThingFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get thing.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ThingFetchRemoteError';
        Object.setPrototypeOf(_this, ThingFetchRemoteError.prototype);
        return _this;
    }
    return ThingFetchRemoteError;
}(errors_1.BaseError));
exports.ThingFetchRemoteError = ThingFetchRemoteError;
var ThingsFetchRemoteError = (function (_super) {
    tslib_1.__extends(ThingsFetchRemoteError, _super);
    function ThingsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get things.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ThingsFetchRemoteError';
        Object.setPrototypeOf(_this, ThingsFetchRemoteError.prototype);
        return _this;
    }
    return ThingsFetchRemoteError;
}(errors_1.BaseError));
exports.ThingsFetchRemoteError = ThingsFetchRemoteError;
var ThingsBindRemoteError = (function (_super) {
    tslib_1.__extends(ThingsBindRemoteError, _super);
    function ThingsBindRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not bind thing unexpectedly.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ThingsBindRemoteError';
        Object.setPrototypeOf(_this, ThingsBindRemoteError.prototype);
        return _this;
    }
    return ThingsBindRemoteError;
}(errors_1.BaseError));
exports.ThingsBindRemoteError = ThingsBindRemoteError;
//# sourceMappingURL=thing.js.map