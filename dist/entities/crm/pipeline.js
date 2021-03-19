"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinesFetchRemoteError = exports.PipelineFetchRemoteError = exports.PipelineInitializationError = exports.Pipeline = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Pipeline = (function (_super) {
    tslib_1.__extends(Pipeline, _super);
    function Pipeline(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        _this.endpoint = '';
        if ((options === null || options === void 0 ? void 0 : options.rawPayload) && options.rawPayload.crm) {
            _this.endpoint = "api/v0/crms/" + options.rawPayload.crm + "/pipelines";
        }
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Pipeline.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.kind = rawPayload.kind;
        this.crm = rawPayload.crm;
        this.stages = rawPayload.stages;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.proxyPayload = rawPayload.proxy_payload;
        return this;
    };
    Pipeline.create = function (payload, universe, http) {
        return new Pipeline({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Pipeline.createUninitialized = function (payload, universe, http) {
        return new Pipeline({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    Pipeline.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            external_reference_id: this.externalReferenceId,
            kind: this.kind,
            crm: this.crm,
            stages: this.stages,
            proxy_vendor: this.proxyVendor,
            proxy_payload: this.proxyPayload
        };
    };
    Pipeline.prototype.init = function () {
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
                        throw this.handleError(new PipelineInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Pipeline;
}(_base_1.default));
exports.Pipeline = Pipeline;
var PipelineInitializationError = (function (_super) {
    tslib_1.__extends(PipelineInitializationError, _super);
    function PipelineInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize pipeline.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PipelineInitializationError';
        Object.setPrototypeOf(_this, PipelineInitializationError.prototype);
        return _this;
    }
    return PipelineInitializationError;
}(errors_1.BaseError));
exports.PipelineInitializationError = PipelineInitializationError;
var PipelineFetchRemoteError = (function (_super) {
    tslib_1.__extends(PipelineFetchRemoteError, _super);
    function PipelineFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get pipeline.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PipelineFetchRemoteError';
        Object.setPrototypeOf(_this, PipelineFetchRemoteError.prototype);
        return _this;
    }
    return PipelineFetchRemoteError;
}(errors_1.BaseError));
exports.PipelineFetchRemoteError = PipelineFetchRemoteError;
var PipelinesFetchRemoteError = (function (_super) {
    tslib_1.__extends(PipelinesFetchRemoteError, _super);
    function PipelinesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get pipelines.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PipelinesFetchRemoteError';
        Object.setPrototypeOf(_this, PipelinesFetchRemoteError.prototype);
        return _this;
    }
    return PipelinesFetchRemoteError;
}(errors_1.BaseError));
exports.PipelinesFetchRemoteError = PipelinesFetchRemoteError;
//# sourceMappingURL=pipeline.js.map