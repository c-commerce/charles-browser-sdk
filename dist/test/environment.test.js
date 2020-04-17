"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../src/environment");
describe('SDK: environemt', function () {
    it('Will have set environment version at compile time', function () {
        expect(environment_1.environment).toBeDefined();
        expect(environment_1.environment.VERSION).toBeDefined();
        expect(environment_1.environment.VERSION).toBe(process.env.npm_package_version);
    });
});
//# sourceMappingURL=environment.test.js.map