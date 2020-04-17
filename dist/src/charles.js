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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
// import * as EventEmitter from 'events'
var events_1 = __importDefault(require("events"));
var v0 = __importStar(require("./v0"));
exports.v0 = v0;
var errors = __importStar(require("./errors"));
var client_1 = require("./client");
var environment_1 = require("./environment");
var universe_1 = require("./universe");
exports.defaultOptions = {
    universe: undefined
};
var CharlesClient = /** @class */ (function (_super) {
    __extends(CharlesClient, _super);
    function CharlesClient(options) {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.auth = new v0.Auth({ base: exports.defaultOptions.universe });
        if (!options)
            return _this;
        if (_this.handleOptions(options)) {
            _this.initialized = true;
        }
        return _this;
    }
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    CharlesClient.prototype.init = function (options) {
        if (options === void 0) { options = exports.defaultOptions; }
        // in cases where credentials and / or tokens and / or users are already
        // we will short circuit the client initialisations
        if (this.handleOptions(options))
            return;
        // in all other cases we will instantiate clients, that need to be authenticated
        // by the caller before any API will be available
        var clientOptions = {
            headers: {}
        };
        if (options.universe) {
            this.auth = new v0.Auth({ base: options.universe });
        }
        if (options.responseInterceptors) {
            clientOptions.responseInterceptors = options.responseInterceptors;
        }
        if (options.requestInterceptors) {
            clientOptions.requestInterceptors = options.requestInterceptors;
        }
        this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    /**
     * De-Initialise the SDK instance and all its state
     *
     */
    CharlesClient.prototype.destroy = function () {
        client_1.Client.clearInstance();
        if (this.auth) {
            this.auth.clearInstance();
        }
        this.http = undefined;
        this.options = undefined;
        this.user = undefined;
    };
    CharlesClient.prototype.handleOptions = function (options) {
        this.options = options;
        // this.options.universe = this.options.universe
        this.user = this.options.user;
        if (options.credentials) {
            var authOptions = {
                credentials: options.credentials,
                base: this.options.base,
                user: this.user
            };
            var clientOptions = {
                headers: {},
                responseInterceptors: options.responseInterceptors
            };
            this.auth = new v0.Auth(authOptions);
            if (options.credentials.accessToken) {
                this.auth.setAuthed(options.credentials.accessToken);
            }
            if (options.credentials.accessToken && clientOptions.headers) {
                clientOptions.headers.Authorization = "Bearer " + options.credentials.accessToken;
            }
            this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
            return true;
        }
        return false;
    };
    CharlesClient.prototype.generateAuthenticatedInstance = function (type, maybeOptions) {
        if (!this.options ||
            !this.options.universe ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        // eslint-disable-next-line new-cap
        return new type(__assign({ user: this.auth.user, universe: this.options.universe }, maybeOptions), this.http);
    };
    /**
     * Create a reference to a universe via singleton or instance
     */
    CharlesClient.prototype.universe = function (name, options) {
        if (!this.http || !this.auth.accessToken) {
            throw new errors.UninstantiatedClient('Cannot invoke universe without instantiated http client');
        }
        var opts = {
            http: this.http,
            name: name,
            base: (options === null || options === void 0 ? void 0 : options.base) ? options.base : 'https://hello-charles.com',
            user: {
                accessToken: this.auth.accessToken,
                id: this.options ? this.options.user : undefined
            }
        };
        if (options && options.singleton === true) {
            return universe_1.UnviverseSingleton.getInstance(opts);
        }
        return new universe_1.Universe(opts);
    };
    /**
     * Create an authenticated Messages instance
     *
     */
    CharlesClient.prototype.messages = function () {
        return this.generateAuthenticatedInstance(v0.Messages);
    };
    CharlesClient.environment = environment_1.environment;
    return CharlesClient;
}(events_1.default.EventEmitter));
exports.CharlesClient = CharlesClient;
var Charles = /** @class */ (function (_super) {
    __extends(Charles, _super);
    function Charles(options) {
        var _this = _super.call(this, options) || this;
        // only emit errors, when we have listeners to prevent unhandled rejects etc.
        _this.on('raw-error', function (err) {
            if (_this.listeners('error').length > 0)
                _this.emit('error', err);
        });
        return _this;
    }
    Charles.getInstance = function (options) {
        if (!Charles.instance) {
            Charles.instance = new Charles(options);
        }
        return Charles.instance;
    };
    return Charles;
}(CharlesClient));
exports.Charles = Charles;
exports.default = Charles.getInstance({ universe: exports.defaultOptions.universe });
//# sourceMappingURL=charles.js.map