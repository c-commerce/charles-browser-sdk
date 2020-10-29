"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Intent = (function (_super) {
    tslib_1.__extends(Intent, _super);
    function Intent(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/intents';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Intent.prototype.deserialize = function (rawPayload) {
        var _a, _b, _c;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.autoReplyEnabled = (_c = rawPayload.auto_reply_enabled) !== null && _c !== void 0 ? _c : false;
        this.name = rawPayload.name;
        this.description = rawPayload.description;
        this.botStaff = rawPayload.bot_staff;
        this.proxyVendor = rawPayload.proxy_vendor;
        this.externalReferenceId = rawPayload.external_reference_id;
        this.externalName = rawPayload.external_name;
        this.nlu = rawPayload.nlu;
        this.messageTemplate = rawPayload.message_template;
        this.logic = rawPayload.logic;
        this.effect = rawPayload.effect;
        this.payload = rawPayload.payload;
        return this;
    };
    Intent.create = function (payload, universe, http) {
        return new Intent({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Intent.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            auto_reply_enabled: this.autoReplyEnabled,
            name: this.name,
            description: this.description,
            bot_staff: this.botStaff,
            proxy_vendor: this.proxyVendor,
            external_reference_id: this.externalReferenceId,
            external_name: this.externalName,
            nlu: this.nlu,
            message_template: this.messageTemplate,
            logic: this.logic,
            effect: this.effect,
            payload: this.payload
        };
    };
    Intent.prototype.init = function () {
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
                        throw this.handleError(new IntentInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Intent;
}(_base_1.default));
exports.Intent = Intent;
var Intents = (function () {
    function Intents() {
    }
    Intents.endpoint = 'api/v0/intents';
    return Intents;
}());
exports.Intents = Intents;
var IntentInitializationError = (function (_super) {
    tslib_1.__extends(IntentInitializationError, _super);
    function IntentInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize intent.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntentInitializationError';
        Object.setPrototypeOf(_this, IntentInitializationError.prototype);
        return _this;
    }
    return IntentInitializationError;
}(errors_1.BaseError));
exports.IntentInitializationError = IntentInitializationError;
var IntentFetchRemoteError = (function (_super) {
    tslib_1.__extends(IntentFetchRemoteError, _super);
    function IntentFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get intent.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntentFetchRemoteError';
        Object.setPrototypeOf(_this, IntentFetchRemoteError.prototype);
        return _this;
    }
    return IntentFetchRemoteError;
}(errors_1.BaseError));
exports.IntentFetchRemoteError = IntentFetchRemoteError;
var IntentsFetchRemoteError = (function (_super) {
    tslib_1.__extends(IntentsFetchRemoteError, _super);
    function IntentsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get intents.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntentsFetchRemoteError';
        Object.setPrototypeOf(_this, IntentsFetchRemoteError.prototype);
        return _this;
    }
    return IntentsFetchRemoteError;
}(errors_1.BaseError));
exports.IntentsFetchRemoteError = IntentsFetchRemoteError;
//# sourceMappingURL=intent.js.map