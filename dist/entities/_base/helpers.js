"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function ndjsonStream(response) {
    var isReader;
    var cancellationRequest = false;
    return new ReadableStream({
        start: function (controller) {
            var reader = response.getReader();
            isReader = reader;
            var decoder = new TextDecoder();
            var dataBuf = '';
            reader.read().then(function processResult(result) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var dataL, data, lines, i, l, dataLine;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (result.done) {
                                    if (cancellationRequest) {
                                        return [2];
                                    }
                                    dataBuf = dataBuf.trim();
                                    if (dataBuf.length !== 0) {
                                        try {
                                            dataL = JSON.parse(dataBuf);
                                            controller.enqueue(dataL);
                                        }
                                        catch (e) {
                                            controller.error(e);
                                            return [2];
                                        }
                                    }
                                    controller.close();
                                    return [2];
                                }
                                data = decoder.decode(result.value, { stream: true });
                                dataBuf += data;
                                lines = dataBuf.split('\n');
                                for (i = 0; i < lines.length - 1; ++i) {
                                    l = lines[i].trim();
                                    if (l.length > 0) {
                                        try {
                                            dataLine = JSON.parse(l);
                                            controller.enqueue(dataLine);
                                        }
                                        catch (e) {
                                            controller.error(e);
                                            cancellationRequest = true;
                                            reader.cancel().catch(function (err) {
                                                throw err;
                                            });
                                            return [2];
                                        }
                                    }
                                }
                                dataBuf = lines[lines.length - 1];
                                return [4, reader.read().then(processResult)];
                            case 1: return [2, _a.sent()];
                        }
                    });
                });
            }).catch(function (err) {
                throw err;
            });
        },
        cancel: function (reason) {
            console.log('Cancel registered due to ', reason);
            cancellationRequest = true;
            isReader.cancel().catch(function (err) {
                throw err;
            });
        }
    });
}
exports.ndjsonStream = ndjsonStream;
//# sourceMappingURL=helpers.js.map