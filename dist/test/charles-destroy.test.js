"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
/* eslint-disable @typescript-eslint/camelcase */
var dotenv = __importStar(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
var charles_1 = __importStar(require("../src/charles"));
var client_1 = require("../src/client");
var v0_1 = require("../src/v0");
var util_1 = require("./util");
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
describe('SDK: can destroy SDK', function () {
    var localStorage = new util_1.LocalStorageMock();
    it('Charles  SDK is instantiable and is instance of Charles  client', function () {
        expect(charles_1.default).toBeInstanceOf(charles_1.CharlesClient);
    });
    it('Base has been set automatically', function () {
        if (!charles_1.default.options)
            throw new Error('Options must be defined');
        expect(charles_1.default.options.universe).toBe(undefined);
    });
    it('Can call init with new options', function () {
        charles_1.default.init({
            universe: 'https://some-universe.hello-charles.com'
        });
        if (!charles_1.default.options)
            throw new Error('Options must be defined');
        expect(charles_1.default.options.universe).toBe('https://some-universe.hello-charles.com');
        expect(charles_1.default.auth).toBeInstanceOf(v0_1.Auth);
    });
    it('Can do login from instance', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, mock, _a, access_token, user_1, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        username: user.username,
                        password: user.password
                    };
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock = new axios_mock_adapter_1.default(axios_1.default);
                        mock.onPost('https://hello-charles.com/api/v0/users/auth/login').reply(function (config) {
                            return [
                                200,
                                {
                                    data: {
                                        id: '123',
                                        access_token: 'mockToken',
                                        roles: [],
                                        permissions: []
                                    }
                                }
                            ];
                        });
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, charles_1.default.auth.loginUsername(options)];
                case 2:
                    _a = _b.sent(), access_token = _a.access_token, user_1 = _a.user;
                    localStorage.setItem('token', 'mockToken');
                    localStorage.setItem('user', 'mockUser');
                    expect(typeof access_token === 'string').toBe(true);
                    expect(access_token).toBe('mockToken');
                    expect(typeof user_1 === 'string').toBe(true);
                    expect(user_1).toBe('123');
                    expect(charles_1.default.auth.accessToken).toBe('mockToken');
                    expect(charles_1.default.auth.authenticated).toBe(true);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('can destroy and re-hydrate externally', function () {
        charles_1.default.destroy();
        var clientInstance = client_1.Client.getInstance({});
        expect(clientInstance.getClient().defaults.headers.common.Authorization).toBeUndefined();
        expect(charles_1.default.auth).toBeDefined();
        expect(charles_1.default.options).toBeUndefined();
        expect(charles_1.default.http).toBeUndefined();
        expect(charles_1.default.auth.authenticated).toBe(false);
        charles_1.default.init({
            universe: 'https://some-universe.hello-charles.com',
            credentials: {
                accessToken: localStorage.getItem('token')
            },
            user: localStorage.getItem('user')
        });
        expect(charles_1.default.auth.accessToken).toBe('mockToken');
        expect(clientInstance.getClient().defaults.headers.common.Authorization).toBe('Bearer mockToken');
        expect(charles_1.default.auth.authenticated).toBe(true);
        var transactions = charles_1.default.messages();
        expect(transactions).toBeInstanceOf(charles_1.v0.Messages);
    });
    // it('can destroy and login', async () => {
    //   charles.destroy()
    //   const clientInstance = Client.getInstance({})
    //   expect(clientInstance.getClient().defaults.headers.common['Authorization']).toBeUndefined()
    //   expect(charles.auth).toBeDefined()
    //   expect(charles.options).toBeUndefined()
    //   expect(charles.http).toBeUndefined()
    //   expect(charles.auth.authenticated).toBe(false)
    //   const options = {
    //     username: user.username,
    //     password: user.password
    //   }
    //   if (process.env.SYSTEM_TEST !== 'true') {
    //     const mock = new MockAdapter(axios)
    //     mock.onPost('https://hello-charles.com/api/v0/users/auth/login').reply(function (config) {
    //       return [
    //         200,
    //         {
    //           data: {
    //             id: '123',
    //             access_token: 'mockToken',
    //             roles: [],
    //             permissions: []
    //           }
    //         }
    //       ]
    //     })
    //   }
    //   try {
    //     let { access_token, user } = await charles.auth.loginUsername(options)
    //     expect(typeof access_token === 'string').toBe(true)
    //     expect(access_token).toBe('sometoken')
    //     expect(typeof user === 'string').toBe(true)
    //     expect(user).toBe('4564')
    //     expect(charles.auth.access_token).toBe('sometoken')
    //     expect(charles.auth.authenticated).toBe(true)
    //     expect(clientInstance.getClient().defaults.headers.common['Authorization']).toBe(
    //       'Bearer sometoken'
    //     )
    //   } catch (err) {
    //     throw err
    //   }
    // })
});
//# sourceMappingURL=charles-destroy.test.js.map