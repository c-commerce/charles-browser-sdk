"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesFetchRemoteError = exports.FavoriteFetchRemoteError = exports.FavoriteInitializationError = exports.Favorites = exports.Favorite = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Favorite = (function (_super) {
    tslib_1.__extends(Favorite, _super);
    function Favorite(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/favorites';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Favorite.prototype.deserialize = function (rawPayload) {
        var _a, _b, _c;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.pages = rawPayload.pages;
        this.items = (_c = rawPayload.items) !== null && _c !== void 0 ? _c : undefined;
        return this;
    };
    Favorite.create = function (payload, universe, http) {
        return new Favorite({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Favorite.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            pages: this.pages
        };
    };
    Favorite.prototype.init = function () {
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
                        throw this.handleError(new FavoriteInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Favorite;
}(_base_1.default));
exports.Favorite = Favorite;
var Favorites = (function () {
    function Favorites() {
    }
    Favorites.endpoint = 'api/v0/favorites';
    return Favorites;
}());
exports.Favorites = Favorites;
var FavoriteInitializationError = (function (_super) {
    tslib_1.__extends(FavoriteInitializationError, _super);
    function FavoriteInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize favorite.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavoriteInitializationError';
        Object.setPrototypeOf(_this, FavoriteInitializationError.prototype);
        return _this;
    }
    return FavoriteInitializationError;
}(errors_1.BaseError));
exports.FavoriteInitializationError = FavoriteInitializationError;
var FavoriteFetchRemoteError = (function (_super) {
    tslib_1.__extends(FavoriteFetchRemoteError, _super);
    function FavoriteFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get favorite.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavoriteFetchRemoteError';
        Object.setPrototypeOf(_this, FavoriteFetchRemoteError.prototype);
        return _this;
    }
    return FavoriteFetchRemoteError;
}(errors_1.BaseError));
exports.FavoriteFetchRemoteError = FavoriteFetchRemoteError;
var FavoritesFetchRemoteError = (function (_super) {
    tslib_1.__extends(FavoritesFetchRemoteError, _super);
    function FavoritesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get favorites.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavoritesFetchRemoteError';
        Object.setPrototypeOf(_this, FavoritesFetchRemoteError.prototype);
        return _this;
    }
    return FavoritesFetchRemoteError;
}(errors_1.BaseError));
exports.FavoritesFetchRemoteError = FavoritesFetchRemoteError;
//# sourceMappingURL=favorite.js.map