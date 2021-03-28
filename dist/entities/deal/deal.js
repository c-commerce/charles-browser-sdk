"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealsFetchCountRemoteError = exports.DealsFetchRemoteError = exports.DealFetchRemoteError = exports.DealInitializationError = exports.Deals = exports.Deal = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var crm_1 = require("../crm");
var Deal = (function (_super) {
    tslib_1.__extends(Deal, _super);
    function Deal(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/deals';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if ((options === null || options === void 0 ? void 0 : options.rawPayload) && options.rawPayload.person) {
            _this.endpoint = "api/v0/people/" + options.rawPayload.person + "/deals";
        }
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Deal.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.person = rawPayload.person;
        this.name = rawPayload.name;
        this.uri = rawPayload.uri;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.kind = rawPayload.kind;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.channelUser = rawPayload.channel_user;
        this.stageExternalReferenceId = rawPayload.stage_external_reference_id;
        this.crm = rawPayload.crm;
        this.currency = rawPayload.currency;
        this.value = rawPayload.value;
        this.status = rawPayload.status;
        this.probability = rawPayload.probability;
        this.date = rawPayload.date;
        this.nextActivityAt = rawPayload.next_activity_at;
        this.closedAt = rawPayload.closed_at;
        this.wonAt = rawPayload.won_at;
        this.lostAt = rawPayload.lost_at;
        this.expectedClosingAt = rawPayload.expected_closing_at;
        this.pipelineExternalReferenceId = rawPayload.pipeline_external_reference_id;
        this.author = rawPayload.author;
        this.owner = rawPayload.owner;
        this.proxyPayload = rawPayload.proxy_payload;
        this.links = rawPayload.links;
        if (rawPayload.stage && this.initialized) {
            this.stage = crm_1.PipelineStage.create(rawPayload.stage, this.universe, this.http);
        }
        else if (rawPayload.stage && !this.initialized) {
            this.stage = crm_1.PipelineStage.createUninitialized(rawPayload.stage, this.universe, this.http);
        }
        else if (!this.stage) {
            this.stage = undefined;
        }
        if (rawPayload.pipeline && this.initialized) {
            this.pipeline = crm_1.Pipeline.create(rawPayload.pipeline, this.universe, this.http);
        }
        else if (rawPayload.pipeline && !this.initialized) {
            this.pipeline = crm_1.Pipeline.createUninitialized(rawPayload.pipeline, this.universe, this.http);
        }
        else if (!this.pipeline) {
            this.pipeline = undefined;
        }
        return this;
    };
    Deal.create = function (payload, universe, http) {
        return new Deal({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Deal.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            pipeline: this.pipeline,
            stage: this.stage,
            person: this.person,
            name: this.name,
            uri: this.uri,
            proxy_vendor: this.proxyVendor,
            kind: this.kind,
            external_reference_id: this.externalReferenceId,
            channel_user: this.channelUser,
            stage_external_reference_id: this.stageExternalReferenceId,
            crm: this.crm,
            currency: this.currency,
            value: this.value,
            status: this.status,
            probability: this.probability,
            date: this.date,
            next_activity_at: this.nextActivityAt,
            closed_at: this.closedAt,
            won_at: this.wonAt,
            lost_at: this.lostAt,
            expected_closing_at: this.expectedClosingAt,
            pipeline_external_reference_id: this.pipelineExternalReferenceId,
            author: this.author,
            owner: this.owner,
            proxy_payload: this.proxyPayload,
            links: this.links
        };
    };
    Deal.prototype.init = function () {
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
                        throw this.handleError(new DealInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Deal;
}(_base_1.UniverseEntity));
exports.Deal = Deal;
var Deals = (function () {
    function Deals() {
    }
    Deals.endpoint = 'api/v0/deals';
    return Deals;
}());
exports.Deals = Deals;
var DealInitializationError = (function (_super) {
    tslib_1.__extends(DealInitializationError, _super);
    function DealInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize deal.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealInitializationError';
        Object.setPrototypeOf(_this, DealInitializationError.prototype);
        return _this;
    }
    return DealInitializationError;
}(errors_1.BaseError));
exports.DealInitializationError = DealInitializationError;
var DealFetchRemoteError = (function (_super) {
    tslib_1.__extends(DealFetchRemoteError, _super);
    function DealFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get deal.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealFetchRemoteError';
        Object.setPrototypeOf(_this, DealFetchRemoteError.prototype);
        return _this;
    }
    return DealFetchRemoteError;
}(errors_1.BaseError));
exports.DealFetchRemoteError = DealFetchRemoteError;
var DealsFetchRemoteError = (function (_super) {
    tslib_1.__extends(DealsFetchRemoteError, _super);
    function DealsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get deals.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealsFetchRemoteError';
        Object.setPrototypeOf(_this, DealsFetchRemoteError.prototype);
        return _this;
    }
    return DealsFetchRemoteError;
}(errors_1.BaseError));
exports.DealsFetchRemoteError = DealsFetchRemoteError;
var DealsFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(DealsFetchCountRemoteError, _super);
    function DealsFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get deals count.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DealsFetchCountRemoteError';
        Object.setPrototypeOf(_this, DealsFetchCountRemoteError.prototype);
        return _this;
    }
    return DealsFetchCountRemoteError;
}(errors_1.BaseError));
exports.DealsFetchCountRemoteError = DealsFetchCountRemoteError;
//# sourceMappingURL=deal.js.map