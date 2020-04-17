"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var errors = __importStar(require("../src/errors"));
dotenv.config();
describe('SDK: errors', function () {
    it('can instantiate error', function () {
        expect(new errors.BaseError('some new eror')).toBeDefined();
    });
});
//# sourceMappingURL=errors.test.js.map