"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
var charles_1 = require("../src/charles");
var client_1 = require("../src/client");
dotenv.config();
var user = {
    username: 'test@example.com',
    password: '12345678',
    clientAccount: 'someuuid',
    apiKey: '12345678'
};
if (process.env.SYSTEM_TEST) {
    user.username = (_a = process.env.SYSTEM_TEST_USERNAME) !== null && _a !== void 0 ? _a : user.username;
    user.password = (_b = process.env.SYSTEM_TEST_PASSWORD) !== null && _b !== void 0 ? _b : user.password;
    user.clientAccount = (_c = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID) !== null && _c !== void 0 ? _c : user.clientAccount;
    user.apiKey = (_d = process.env.SYSTEM_TEST_API_KEY) !== null && _d !== void 0 ? _d : user.apiKey;
}
describe('SDK: client: can instantiate SDK client', function () {
    it('CharlesClient is instantiable', function () {
        if (process.env.SYSTEM_TEST !== 'true') {
            var mock = new axios_mock_adapter_1.default(axios_1.default);
            mock.onPost('https://api.hello-charles.com/api/v0/users/auth/login').reply(function (config) {
                return [
                    200,
                    {
                        token: '',
                        user: {
                            id: '123',
                            legacy_id: '4564'
                        }
                    }
                ];
            });
        }
        var options = {
            credentials: {
                username: user.username,
                password: user.password
            },
            base: process.env.CHARLES_BASE
        };
        var inst = new charles_1.CharlesClient(options);
        expect(inst).toBeInstanceOf(charles_1.CharlesClient);
    });
    it('CharlesClient is instantiable', function () {
        if (process.env.SYSTEM_TEST !== 'true') {
            var mock = new axios_mock_adapter_1.default(axios_1.default);
            mock.onPost('https://api.hello-charles.com/api/v0/users/auth/login').reply(function (config) {
                return [
                    200,
                    {
                        token: '',
                        user: {
                            id: '123',
                            legacy_id: '4564'
                        }
                    }
                ];
            });
        }
        var options = {
            credentials: {
                username: user.username,
                password: user.password
            },
            base: process.env.CHARLES_BASE
        };
        expect(new charles_1.CharlesClient(options)).toBeInstanceOf(charles_1.CharlesClient);
    });
    it('CharlesClient is inittable', function () {
        if (process.env.SYSTEM_TEST !== 'true') {
            var mock = new axios_mock_adapter_1.default(axios_1.default);
            mock.onPost('https://api.hello-charles.com/api/v0/users/auth/login').reply(function (config) {
                return [
                    200,
                    {
                        token: '',
                        user: {
                            id: '123',
                            legacy_id: '4564'
                        }
                    }
                ];
            });
        }
        var options = {
            credentials: {
                username: user.username,
                password: user.password
            },
            base: process.env.CHARLES_BASE
        };
        var charles = new charles_1.CharlesClient(options);
        charles.init();
        expect(charles.auth).toBeInstanceOf(charles_1.v0.Auth);
        expect(charles.http).toBeInstanceOf(client_1.Client);
    });
});
//# sourceMappingURL=charles-client.test.js.map