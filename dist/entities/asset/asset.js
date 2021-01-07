"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsUploadError = exports.AssetUploadAndTransformError = exports.AssetsPostError = exports.AssetsFetchRemoteError = exports.AssetFetchRemoteError = exports.AssetInitializationError = exports.Assets = exports.Asset = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var qs_1 = tslib_1.__importDefault(require("qs"));
var Asset = (function (_super) {
    tslib_1.__extends(Asset, _super);
    function Asset(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/assets';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Asset.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.uri = rawPayload.uri;
        this.mimeType = rawPayload.mime_type;
        this.storageType = rawPayload.storage_type;
        this.payloadId = rawPayload.payload_id;
        this.originalName = rawPayload.original_name;
        this.comment = rawPayload.comment;
        this.metadata = rawPayload.metadata;
        this.public = rawPayload.public;
        this.optimizations = rawPayload.optimizations;
        return this;
    };
    Asset.create = function (payload, universe, http) {
        return new Asset({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Asset.prototype.serialize = function () {
        var _a, _b, _c, _d;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            uri: this.uri,
            mime_type: this.mimeType,
            storage_type: this.storageType,
            payload_id: this.payloadId,
            original_name: this.originalName,
            comment: this.comment,
            metadata: (_c = this.metadata) !== null && _c !== void 0 ? _c : null,
            public: (_d = this.public) !== null && _d !== void 0 ? _d : false,
            optimizations: this.optimizations
        };
    };
    Asset.prototype.init = function () {
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
                        throw this.handleError(new AssetInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Asset.prototype.upload = function (payload, options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var queryOptions, opts, res, data, err_2;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        queryOptions = tslib_1.__assign({ public: true }, options);
                        opts = {
                            timeout: 60000,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient().post(((_b = this.universe) === null || _b === void 0 ? void 0 : _b.universeBase) + "/" + Assets.endpoint + qs_1.default.stringify(queryOptions, { addQueryPrefix: true }), payload, opts))];
                    case 1:
                        res = _c.sent();
                        data = res === null || res === void 0 ? void 0 : res.data.data;
                        return [2, data.map(function (item) {
                                return Asset.create(item, _this.universe, _this.http);
                            })];
                    case 2:
                        err_2 = _c.sent();
                        throw new AssetsUploadError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Asset.prototype.uploadAndTransform = function (payload, contentType, options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var queryOptions, opts, res, data, err_3;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        queryOptions = tslib_1.__assign({ public: true }, options);
                        opts = {
                            method: 'POST',
                            url: ((_a = this.universe) === null || _a === void 0 ? void 0 : _a.universeBase) + "/" + Assets.endpoint + qs_1.default.stringify(queryOptions, { addQueryPrefix: true }),
                            headers: {
                                'Content-Type': contentType
                            },
                            data: payload !== null && payload !== void 0 ? payload : undefined
                        };
                        return [4, ((_b = this.http) === null || _b === void 0 ? void 0 : _b.getClient()(opts))];
                    case 1:
                        res = _c.sent();
                        data = res === null || res === void 0 ? void 0 : res.data.data;
                        return [2, data.map(function (item) {
                                return Asset.create(item, _this.universe, _this.http);
                            })];
                    case 2:
                        err_3 = _c.sent();
                        throw new AssetUploadAndTransformError(undefined, { error: err_3 });
                    case 3: return [2];
                }
            });
        });
    };
    return Asset;
}(_base_1.default));
exports.Asset = Asset;
var Assets = (function () {
    function Assets(options) {
        this.options = options;
        this.http = options.http;
        this.universe = options.universe;
    }
    Assets.prototype.post = function (payload, options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var queryOptions, opts, res, data, err_4;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        queryOptions = tslib_1.__assign({ public: true }, options);
                        opts = {
                            timeout: 60000,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient().post(((_b = this.universe) === null || _b === void 0 ? void 0 : _b.universeBase) + "/" + Assets.endpoint + qs_1.default.stringify(queryOptions, { addQueryPrefix: true }), payload, opts))];
                    case 1:
                        res = _c.sent();
                        data = res === null || res === void 0 ? void 0 : res.data.data;
                        return [2, data.map(function (item) {
                                return Asset.create(item, _this.universe, _this.http);
                            })];
                    case 2:
                        err_4 = _c.sent();
                        throw new AssetsPostError(undefined, { error: err_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Assets.endpoint = 'api/v0/assets';
    return Assets;
}());
exports.Assets = Assets;
var AssetInitializationError = (function (_super) {
    tslib_1.__extends(AssetInitializationError, _super);
    function AssetInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize asset.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AssetInitializationError';
        return _this;
    }
    return AssetInitializationError;
}(errors_1.BaseError));
exports.AssetInitializationError = AssetInitializationError;
var AssetFetchRemoteError = (function (_super) {
    tslib_1.__extends(AssetFetchRemoteError, _super);
    function AssetFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get asset.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AssetFetchRemoteError';
        return _this;
    }
    return AssetFetchRemoteError;
}(errors_1.BaseError));
exports.AssetFetchRemoteError = AssetFetchRemoteError;
var AssetsFetchRemoteError = (function (_super) {
    tslib_1.__extends(AssetsFetchRemoteError, _super);
    function AssetsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get assets.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AssetsFetchRemoteError';
        return _this;
    }
    return AssetsFetchRemoteError;
}(errors_1.BaseError));
exports.AssetsFetchRemoteError = AssetsFetchRemoteError;
var AssetsPostError = (function (_super) {
    tslib_1.__extends(AssetsPostError, _super);
    function AssetsPostError(message, properties) {
        if (message === void 0) { message = 'Could not create assets.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AssetsPostError';
        return _this;
    }
    return AssetsPostError;
}(errors_1.BaseError));
exports.AssetsPostError = AssetsPostError;
var AssetUploadAndTransformError = (function (_super) {
    tslib_1.__extends(AssetUploadAndTransformError, _super);
    function AssetUploadAndTransformError(message, properties) {
        if (message === void 0) { message = 'Could not upload and transform asset.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AssetUploadAndTransformError';
        return _this;
    }
    return AssetUploadAndTransformError;
}(errors_1.BaseError));
exports.AssetUploadAndTransformError = AssetUploadAndTransformError;
var AssetsUploadError = (function (_super) {
    tslib_1.__extends(AssetsUploadError, _super);
    function AssetsUploadError(message, properties) {
        if (message === void 0) { message = 'Could not upload assets.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AssetsUploadError';
        return _this;
    }
    return AssetsUploadError;
}(errors_1.BaseError));
exports.AssetsUploadError = AssetsUploadError;
//# sourceMappingURL=asset.js.map