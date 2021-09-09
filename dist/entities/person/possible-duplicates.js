"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PossibleDuplicatesFetchRemoteError = exports.PossibleDuplication = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../../errors");
var PossibleDuplication = (function () {
    function PossibleDuplication(options) {
        var _a, _b, _c;
        this.universe = options.universe;
        this.apiCarrier = options.universe;
        this.http = options.http;
        this.options = options;
        this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        this.endpoint = '';
        this.personId = (_b = options.rawPayload) === null || _b === void 0 ? void 0 : _b.person_id;
        this.strategies = (_c = options.rawPayload) === null || _c === void 0 ? void 0 : _c.strategies;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            this.deserialize(options.rawPayload);
        }
    }
    PossibleDuplication.prototype.deserialize = function (rawPayload) {
        this.id = rawPayload.id;
        this.personId = rawPayload.person_id;
        this.strategies = rawPayload.strategies;
        return this;
    };
    PossibleDuplication.prototype.serialize = function () {
        return {
            id: this.id,
            person_id: this.personId,
            strategies: this.strategies
        };
    };
    return PossibleDuplication;
}());
exports.PossibleDuplication = PossibleDuplication;
var PossibleDuplicatesFetchRemoteError = (function (_super) {
    tslib_1.__extends(PossibleDuplicatesFetchRemoteError, _super);
    function PossibleDuplicatesFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not fetch list with possible duplicated contacts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PossibleDuplicatesFetchRemoteError';
        Object.setPrototypeOf(_this, PossibleDuplicatesFetchRemoteError.prototype);
        return _this;
    }
    return PossibleDuplicatesFetchRemoteError;
}(errors_1.BaseError));
exports.PossibleDuplicatesFetchRemoteError = PossibleDuplicatesFetchRemoteError;
//# sourceMappingURL=possible-duplicates.js.map