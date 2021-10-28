"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStagesFetchRemoteError = exports.PipelineStageFetchRemoteError = exports.PipelineStageInitializationError = exports.PipelineStage = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var PipelineStage = (function (_super) {
    tslib_1.__extends(PipelineStage, _super);
    function PipelineStage(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        _this.endpoint = '';
        if ((options === null || options === void 0 ? void 0 : options.rawPayload) && options.rawPayload.crm && options.rawPayload.pipeline) {
            _this.endpoint = "api/v0/crms/" + options.rawPayload.crm + "/pipelines/" + options.rawPayload.pipeline + "/stages";
        }
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    PipelineStage.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.kind = rawPayload.kind;
        this.name = rawPayload.name;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.orderIndex = rawPayload.order_index;
        this.crm = rawPayload.crm;
        this.pipeline = rawPayload.pipeline;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.proxyPayload = rawPayload.proxy_payload;
        return this;
    };
    PipelineStage.create = function (payload, universe, http) {
        return new PipelineStage({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    PipelineStage.createUninitialized = function (payload, universe, http) {
        return new PipelineStage({ rawPayload: payload, universe: universe, http: http, initialized: false });
    };
    PipelineStage.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            kind: this.kind,
            name: this.name,
            external_reference_id: this.externalReferenceId,
            order_index: this.orderIndex,
            crm: this.crm,
            pipeline: this.pipeline,
            proxy_vendor: this.proxyVendor,
            proxy_payload: this.proxyPayload
        };
    };
    PipelineStage.prototype.init = function () {
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
                        throw this.handleError(new PipelineStageInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return PipelineStage;
}(_base_1.UniverseEntity));
exports.PipelineStage = PipelineStage;
var PipelineStageInitializationError = (function (_super) {
    tslib_1.__extends(PipelineStageInitializationError, _super);
    function PipelineStageInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize pipeline_stage.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PipelineStageInitializationError';
        Object.setPrototypeOf(_this, PipelineStageInitializationError.prototype);
        return _this;
    }
    return PipelineStageInitializationError;
}(errors_1.BaseError));
exports.PipelineStageInitializationError = PipelineStageInitializationError;
var PipelineStageFetchRemoteError = (function (_super) {
    tslib_1.__extends(PipelineStageFetchRemoteError, _super);
    function PipelineStageFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get pipeline_stage.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PipelineStageFetchRemoteError';
        Object.setPrototypeOf(_this, PipelineStageFetchRemoteError.prototype);
        return _this;
    }
    return PipelineStageFetchRemoteError;
}(errors_1.BaseError));
exports.PipelineStageFetchRemoteError = PipelineStageFetchRemoteError;
var PipelineStagesFetchRemoteError = (function (_super) {
    tslib_1.__extends(PipelineStagesFetchRemoteError, _super);
    function PipelineStagesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get pipeline_stages.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PipelineStagesFetchRemoteError';
        Object.setPrototypeOf(_this, PipelineStagesFetchRemoteError.prototype);
        return _this;
    }
    return PipelineStagesFetchRemoteError;
}(errors_1.BaseError));
exports.PipelineStagesFetchRemoteError = PipelineStagesFetchRemoteError;
//# sourceMappingURL=pipeline-stage.js.map