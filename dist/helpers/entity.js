"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEntity = void 0;
var tslib_1 = require("tslib");
var _base_1 = tslib_1.__importDefault(require("../entities/_base"));
function isEntity(object) {
    return object instanceof _base_1.default;
}
exports.isEntity = isEntity;
//# sourceMappingURL=entity.js.map