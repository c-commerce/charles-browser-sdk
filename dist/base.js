"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APICarrier = void 0;
var tslib_1 = require("tslib");
var readable_stream_1 = require("readable-stream");
var APICarrier = (function (_super) {
    tslib_1.__extends(APICarrier, _super);
    function APICarrier(options) {
        var _this = _super.call(this) || this;
        _this.injectables = options.injectables;
        return _this;
    }
    return APICarrier;
}(readable_stream_1.Readable));
exports.APICarrier = APICarrier;
//# sourceMappingURL=base.js.map