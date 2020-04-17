"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var CharlesBaseHandler = /** @class */ (function () {
    function CharlesBaseHandler(http, handlerOptions) {
        this.client = http;
        this.handlerOptions = handlerOptions;
    }
    CharlesBaseHandler.prototype.getURI = function (options) {
        var queryString = '';
        if (options.query) {
            queryString = qs_1.default.stringify(options.query, { addQueryPrefix: true });
        }
        var params = '';
        if (Array.isArray(options.params)) {
            params = '/' + options.params.map(function (item) {
                return item;
            }).join('/');
        }
        return "" + this.handlerOptions.base + options.endpoint + params + queryString;
    };
    return CharlesBaseHandler;
}());
exports.CharlesBaseHandler = CharlesBaseHandler;
//# sourceMappingURL=handler.js.map