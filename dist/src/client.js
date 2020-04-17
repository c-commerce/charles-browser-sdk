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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var environment_1 = require("./environment");
var defaultHeaders = {
    'X-Client-Type': 'Charles SDK JavaScript',
    'X-Client-Version': environment_1.environment.VERSION
};
/**
 * The Charles HTTP client is an axios instance that carries the state of of Authentication
 * in - if default headers have been set - has Authorization header.
 *
 * Since this class is a singleton we are destroying state internally through `.clearInstance()`.
 */
var Client = /** @class */ (function () {
    function Client(options) {
        var _a;
        this.responseInterceptorIds = [];
        this.requestInterceptorIds = [];
        this.axiosInstance = axios_1.default.create({
            // baseURL: options.base || 'https://api.hello-charles.com',
            timeout: (_a = options.timeout) !== null && _a !== void 0 ? _a : 10000,
            headers: __assign(__assign({}, options.headers), defaultHeaders)
        });
    }
    Client.getInstance = function (options) {
        // use headers in any case
        if (Client.instance) {
            Client.instance.setDefaults(options);
        }
        if (!Client.instance) {
            Client.instance = new Client(options);
            // ... any one time initialization goes here ...
        }
        return Client.instance;
    };
    Client.clearInstance = function () {
        Client.instance.clearDefaults();
    };
    Client.prototype.getClient = function () {
        return Client.instance.axiosInstance;
    };
    Client.prototype.setDefaults = function (options) {
        Client.instance.axiosInstance.defaults.headers.common = __assign(__assign({}, this.axiosInstance.defaults.headers.common), options.headers);
        Client.instance.axiosInstance.defaults.headers = __assign(__assign({}, this.axiosInstance.defaults.headers), options.headers);
        // NOTE not sure if this is the correct place to inject the interceptors, but it's the most reliable
        if (options.responseInterceptors && options.responseInterceptors.length) {
            // remove previous interceptors
            this.responseInterceptorIds.forEach(function (id) { return Client.instance.axiosInstance.interceptors.response.eject(id); });
            this.responseInterceptorIds = options.responseInterceptors.map(function (interceptor) {
                // first arg is on success, but we want to only listen for errors
                return Client.instance.axiosInstance.interceptors.response.use(undefined, interceptor);
            });
        }
        if (options.requestInterceptors && options.requestInterceptors.length) {
            this.requestInterceptorIds.forEach(function (id) { return Client.instance.axiosInstance.interceptors.request.eject(id); });
            this.requestInterceptorIds = options.requestInterceptors.map(function (interceptor) {
                return Client.instance.axiosInstance.interceptors.request.use(interceptor, undefined);
            });
        }
        return Client.instance;
    };
    Client.prototype.clearDefaults = function () {
        Client.instance.axiosInstance.defaults.headers.common.Authorization = undefined;
        Client.instance.axiosInstance.defaults.headers.Authorization = undefined;
        Client.instance.axiosInstance.defaults.headers.common = __assign({}, defaultHeaders);
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map