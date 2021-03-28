"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesFetchFailed = exports.MessageUpdateFailed = exports.Messages = void 0;
var tslib_1 = require("tslib");
var base_error_1 = require("../errors/base-error");
var index_1 = require("../base/index");
var Messages = (function (_super) {
    tslib_1.__extends(Messages, _super);
    function Messages(options, http) {
        var _a;
        var _this = _super.call(this, http, { endpoint: Messages.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : "https://" + options.universe + ".hello-charles.com" }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Messages.baseEndpoint;
        _this.universe = options.universe;
        return _this;
    }
    Messages.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var uri, response, err_1;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        uri = this.getURI({ endpoint: this.endpoint, query: query });
                                        return [4, this.http.getClient().get(uri)];
                                    case 1:
                                        response = _a.sent();
                                        if (response.status !== 200) {
                                            return [2, reject(new MessagesFetchFailed())];
                                        }
                                        return [2, resolve({
                                                data: response.data.data,
                                                metadata: { count: response.data.count }
                                            })];
                                    case 2:
                                        err_1 = _a.sent();
                                        return [2, reject(new MessagesFetchFailed(undefined, { error: err_1 }))];
                                    case 3: return [2];
                                }
                            });
                        }); })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Messages.prototype.update = function (messageId, messageRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var uri, response, err_2;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        uri = this.getURI({ endpoint: this.endpoint, params: [messageId] });
                                        return [4, this.http.getClient().put(uri, messageRequest)];
                                    case 1:
                                        response = _a.sent();
                                        if (response.status !== 200) {
                                            return [2, reject(new MessageUpdateFailed())];
                                        }
                                        return [2, resolve({
                                                data: response.data.data[0],
                                                metadata: { count: response.data.count }
                                            })];
                                    case 2:
                                        err_2 = _a.sent();
                                        return [2, reject(new MessageUpdateFailed(undefined, { error: err_2 }))];
                                    case 3: return [2];
                                }
                            });
                        }); })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Messages.baseEndpoint = '/api/v0/messages';
    return Messages;
}(index_1.CharlesBaseHandler));
exports.Messages = Messages;
var MessageUpdateFailed = (function (_super) {
    tslib_1.__extends(MessageUpdateFailed, _super);
    function MessageUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessageUpdateFailed';
        return _this;
    }
    return MessageUpdateFailed;
}(base_error_1.BaseError));
exports.MessageUpdateFailed = MessageUpdateFailed;
var MessagesFetchFailed = (function (_super) {
    tslib_1.__extends(MessagesFetchFailed, _super);
    function MessagesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch messages'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessagesFetchFailed';
        return _this;
    }
    return MessagesFetchFailed;
}(base_error_1.BaseError));
exports.MessagesFetchFailed = MessagesFetchFailed;
//# sourceMappingURL=messages.js.map