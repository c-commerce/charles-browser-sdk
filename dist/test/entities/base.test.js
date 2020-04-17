"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _base_1 = __importDefault(require("../../src/entities/_base"));
describe('Entities: base', function () {
    it('can instantiate and prepare data correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var Cls, obj, mockUniverse, mockCallback, mockHttp, inst, postableMockCallback, postableMockHttp, instPostable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Cls = /** @class */ (function (_super) {
                        __extends(Cls, _super);
                        function Cls(options) {
                            var _a;
                            var _this = _super.call(this) || this;
                            _this.universe = options.universe;
                            _this.endpoint = 'api/v0/cls_endpoint';
                            _this.http = options.http;
                            _this.options = options;
                            _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
                            if (options === null || options === void 0 ? void 0 : options.rawPayload) {
                                _this.deserialize(options.rawPayload);
                            }
                            return _this;
                        }
                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        Cls.prototype.deserialize = function (p) {
                            this.setRawPayload(p);
                            this.id = p.id;
                            this.name = p.name;
                            return this;
                        };
                        Cls.prototype.serialize = function () {
                            return {
                                id: this.id,
                                name: this.name
                            };
                        };
                        return Cls;
                    }(_base_1.default));
                    obj = {
                        id: '1234',
                        name: undefined
                    };
                    mockUniverse = {
                        universeBase: 'https://my-business.hello-charles.com'
                    };
                    mockCallback = jest.fn(function (opts) {
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        return {
                            responseStatus: 200,
                            data: {
                                data: [
                                    {
                                        id: '1234',
                                        name: 'new name'
                                    }
                                ]
                            }
                        };
                    });
                    mockHttp = {
                        getClient: function () {
                            return function (opts) {
                                return mockCallback(opts);
                            };
                        }
                    };
                    inst = new Cls({
                        rawPayload: obj,
                        universe: mockUniverse,
                        http: mockHttp
                    });
                    expect(inst).toBeInstanceOf(Cls);
                    expect(inst.delete).toBeInstanceOf(Function);
                    expect(inst.save).toBeInstanceOf(Function);
                    expect(inst.patch).toBeInstanceOf(Function);
                    expect(inst.post).toBeInstanceOf(Function);
                    expect(inst.fetch).toBeInstanceOf(Function);
                    expect(inst.serialize()).toStrictEqual({ id: '1234', name: undefined });
                    return [4 /*yield*/, inst.patch({ name: 'new name' })];
                case 1:
                    _a.sent();
                    expect(mockCallback.mock.calls.length).toBe(1);
                    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
                        data: [
                            { op: 'replace', path: '/name', value: 'new name' }
                        ],
                        headers: {
                            'Content-Type': 'application/json-patch+json'
                        },
                        method: 'PATCH',
                        responseType: 'json',
                        url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
                    });
                    expect(inst.serialize()).toStrictEqual({ id: '1234', name: 'new name' });
                    return [4 /*yield*/, inst.fetch()];
                case 2:
                    _a.sent();
                    expect(mockCallback.mock.calls.length).toBe(2);
                    expect(mockCallback.mock.calls[1][0]).toStrictEqual({
                        data: undefined,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        method: 'GET',
                        responseType: 'json',
                        url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
                    });
                    expect(inst.serialize()).toStrictEqual({ id: '1234', name: 'new name' });
                    return [4 /*yield*/, inst.delete()];
                case 3:
                    _a.sent();
                    expect(mockCallback.mock.calls.length).toBe(3);
                    expect(mockCallback.mock.calls[2][0]).toStrictEqual({
                        data: undefined,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        method: 'DELETE',
                        responseType: 'json',
                        url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
                    });
                    postableMockCallback = jest.fn(function (opts) {
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        return {
                            responseStatus: 200,
                            data: {
                                data: [
                                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                                    {
                                        id: '5678',
                                        name: 'something'
                                    }
                                ]
                            }
                        };
                    });
                    postableMockHttp = {
                        getClient: function () {
                            return function (opts) {
                                return postableMockCallback(opts);
                            };
                        }
                    };
                    instPostable = new Cls({
                        rawPayload: {
                            name: 'something'
                        },
                        universe: mockUniverse,
                        http: postableMockHttp
                    });
                    expect(instPostable).toBeInstanceOf(Cls);
                    expect(instPostable.delete).toBeInstanceOf(Function);
                    expect(instPostable.save).toBeInstanceOf(Function);
                    expect(instPostable.patch).toBeInstanceOf(Function);
                    expect(instPostable.post).toBeInstanceOf(Function);
                    expect(instPostable.serialize()).toStrictEqual({ id: undefined, name: 'something' });
                    return [4 /*yield*/, instPostable.post()];
                case 4:
                    _a.sent();
                    expect(postableMockCallback.mock.calls.length).toBe(1);
                    expect(postableMockCallback.mock.calls[0][0]).toStrictEqual({
                        data: {
                            name: 'something'
                        },
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        method: 'POST',
                        responseType: 'json',
                        url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint'
                    });
                    expect(instPostable.serialize()).toStrictEqual({ id: '5678', name: 'something' });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=base.test.js.map