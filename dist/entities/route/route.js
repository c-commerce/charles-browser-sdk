"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesFetchRemoteError = exports.RouteFetchRemoteError = exports.RouteInitializationError = exports.Routes = exports.Route = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Route = (function (_super) {
    tslib_1.__extends(Route, _super);
    function Route(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/routes';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Route.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.description = rawPayload.description;
        this.topic = rawPayload.topic;
        this.logic = rawPayload.logic;
        this.effect = rawPayload.effect;
        this.kind = rawPayload.kind;
        this.labels = rawPayload.labels;
        return this;
    };
    Route.create = function (payload, universe, http) {
        return new Route({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Route.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            description: this.description,
            topic: this.topic,
            logic: this.logic,
            effect: this.effect,
            kind: this.kind,
            labels: this.labels
        };
    };
    Route.prototype.init = function () {
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
                        throw this.handleError(new RouteInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Route;
}(_base_1.default));
exports.Route = Route;
var Routes = (function () {
    function Routes() {
    }
    Routes.endpoint = 'api/v0/routes';
    return Routes;
}());
exports.Routes = Routes;
var RouteInitializationError = (function (_super) {
    tslib_1.__extends(RouteInitializationError, _super);
    function RouteInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize route.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RouteInitializationError';
        Object.setPrototypeOf(_this, RouteInitializationError.prototype);
        return _this;
    }
    return RouteInitializationError;
}(errors_1.BaseError));
exports.RouteInitializationError = RouteInitializationError;
var RouteFetchRemoteError = (function (_super) {
    tslib_1.__extends(RouteFetchRemoteError, _super);
    function RouteFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get route.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RouteFetchRemoteError';
        Object.setPrototypeOf(_this, RouteFetchRemoteError.prototype);
        return _this;
    }
    return RouteFetchRemoteError;
}(errors_1.BaseError));
exports.RouteFetchRemoteError = RouteFetchRemoteError;
var RoutesFetchRemoteError = (function (_super) {
    tslib_1.__extends(RoutesFetchRemoteError, _super);
    function RoutesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get routes.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RoutesFetchRemoteError';
        Object.setPrototypeOf(_this, RoutesFetchRemoteError.prototype);
        return _this;
    }
    return RoutesFetchRemoteError;
}(errors_1.BaseError));
exports.RoutesFetchRemoteError = RoutesFetchRemoteError;
//# sourceMappingURL=route.js.map