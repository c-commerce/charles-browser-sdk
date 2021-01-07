"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksFetchRemoteError = exports.TrackFetchRemoteError = exports.TrackInitializationError = exports.Tracks = exports.Track = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Track = (function (_super) {
    tslib_1.__extends(Track, _super);
    function Track(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/universe_tracks';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Track.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.completed = rawPayload.completed;
        this.completed_at = rawPayload.completed_at ? new Date(rawPayload.completed_at) : undefined;
        this.scope = rawPayload.scope;
        this.assignee = rawPayload.assignee;
        this.milestones = rawPayload.milestones;
        return this;
    };
    Track.create = function (payload, universe, http) {
        return new Track({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Track.prototype.serialize = function () {
        var _a, _b, _c;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            completed: (_c = this.completed) !== null && _c !== void 0 ? _c : false,
            completed_at: this.completed_at ? this.completed_at.toISOString() : undefined,
            scope: this.scope,
            assignee: this.assignee,
            milestones: this.milestones
        };
    };
    Track.prototype.init = function () {
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
                        throw this.handleError(new TrackInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Track;
}(_base_1.default));
exports.Track = Track;
var Tracks = (function () {
    function Tracks() {
    }
    Tracks.endpoint = 'api/v0/universe_tracks';
    Tracks.currentEndpoint = 'api/v0/universe_tracks/current';
    return Tracks;
}());
exports.Tracks = Tracks;
var TrackInitializationError = (function (_super) {
    tslib_1.__extends(TrackInitializationError, _super);
    function TrackInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize track.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TrackInitializationError';
        return _this;
    }
    return TrackInitializationError;
}(errors_1.BaseError));
exports.TrackInitializationError = TrackInitializationError;
var TrackFetchRemoteError = (function (_super) {
    tslib_1.__extends(TrackFetchRemoteError, _super);
    function TrackFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get track.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TrackFetchRemoteError';
        return _this;
    }
    return TrackFetchRemoteError;
}(errors_1.BaseError));
exports.TrackFetchRemoteError = TrackFetchRemoteError;
var TracksFetchRemoteError = (function (_super) {
    tslib_1.__extends(TracksFetchRemoteError, _super);
    function TracksFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get tracks.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TracksFetchRemoteError';
        return _this;
    }
    return TracksFetchRemoteError;
}(errors_1.BaseError));
exports.TracksFetchRemoteError = TracksFetchRemoteError;
//# sourceMappingURL=track.js.map