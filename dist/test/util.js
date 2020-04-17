"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var charles_1 = require("../src/charles");
var universe_1 = require("../src/universe");
var client_1 = require("../src/client");
var LocalStorageMock = /** @class */ (function () {
    function LocalStorageMock() {
        this.store = {};
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    LocalStorageMock.prototype.clear = function () {
        this.store = {};
    };
    LocalStorageMock.prototype.getItem = function (key) {
        return this.store[key] || null;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    LocalStorageMock.prototype.setItem = function (key, value) {
        this.store[key] = value;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    LocalStorageMock.prototype.removeItem = function (key) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.store[key];
    };
    return LocalStorageMock;
}());
exports.LocalStorageMock = LocalStorageMock;
/**
 * Instantiate Charles in the tests - reduce boilerplate
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function initInstance(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var instance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = new charles_1.CharlesClient();
                    instance.init(__assign(__assign({}, options), opts));
                    return [4 /*yield*/, instance.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, instance];
            }
        });
    });
}
exports.initInstance = initInstance;
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
var options = {
    credentials: {
        username: user.username,
        password: user.password
    },
    base: process.env.CHARLES_BASE
};
function stubUniverse() {
    var token = 'UNI_USER_STUB_ACCESS_TOKEN';
    var client = client_1.Client.getInstance({
        token: token
    });
    var opts = {
        name: 'stub-universe',
        http: client,
        base: 'https://hello-charles.local',
        user: {
            id: 'UNI_USER_STUB_ID',
            accessToken: token
        }
    };
    return {
        client: client,
        universe: new universe_1.Universe(opts)
    };
}
exports.stubUniverse = stubUniverse;
//# sourceMappingURL=util.js.map