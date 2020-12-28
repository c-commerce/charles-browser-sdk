"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_1 = tslib_1.__importDefault(require("events"));
var v0 = tslib_1.__importStar(require("./v0"));
exports.v0 = v0;
var errors = tslib_1.__importStar(require("./errors"));
var client_1 = require("./client");
var environment_1 = require("./environment");
var universe_1 = require("./universe");
exports.Universe = universe_1.Universe;
exports.defaultOptions = {
    universe: undefined
};
var CharlesClient = (function (_super) {
    tslib_1.__extends(CharlesClient, _super);
    function CharlesClient(options) {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.auth = new v0.Auth({ base: exports.defaultOptions.universe, withCredentials: options === null || options === void 0 ? void 0 : options.withCredentials });
        if (!options)
            return _this;
        if (_this.handleOptions(options)) {
            _this.initialized = true;
        }
        return _this;
    }
    CharlesClient.prototype.init = function (options) {
        if (options === void 0) { options = exports.defaultOptions; }
        var _a, _b;
        if (this.handleOptions(options))
            return;
        var withCredentials = (_a = options.withCredentials) !== null && _a !== void 0 ? _a : !!((_b = this.options) === null || _b === void 0 ? void 0 : _b.withCredentials);
        var clientOptions = {
            headers: {},
            withCredentials: withCredentials
        };
        if (options.universe) {
            this.auth = new v0.Auth({ base: options.universe, withCredentials: withCredentials });
        }
        if (options.responseInterceptors) {
            clientOptions.responseInterceptors = options.responseInterceptors;
        }
        if (options.requestInterceptors) {
            clientOptions.requestInterceptors = options.requestInterceptors;
        }
        this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
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
        var _a, _b;
        this.options = options;
        this.user = this.options.user;
        var withCredentials = (_a = options.withCredentials) !== null && _a !== void 0 ? _a : !!((_b = this.options) === null || _b === void 0 ? void 0 : _b.withCredentials);
        if (options.credentials) {
            var authOptions = {
                credentials: options.credentials,
                base: this.options.base,
                user: this.user,
                withCredentials: withCredentials
            };
            var clientOptions = {
                headers: {},
                responseInterceptors: options.responseInterceptors,
                withCredentials: withCredentials
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
        return new type(tslib_1.__assign({ user: this.auth.user, universe: this.options.universe }, maybeOptions), this.http);
    };
    CharlesClient.prototype.universe = function (name, options) {
        if (!this.http || !this.auth.accessToken) {
            throw new errors.UninstantiatedClient('Cannot invoke universe without instantiated http client');
        }
        var opts = {
            http: this.http,
            name: name,
            base: (options === null || options === void 0 ? void 0 : options.base) ? options.base : 'https://hello-charles.com',
            universeBase: options === null || options === void 0 ? void 0 : options.universeBase,
            mqttUniverseBase: options === null || options === void 0 ? void 0 : options.mqttUniverseBase,
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
    CharlesClient.prototype.messages = function () {
        return this.generateAuthenticatedInstance(v0.Messages);
    };
    CharlesClient.environment = environment_1.environment;
    return CharlesClient;
}(events_1.default.EventEmitter));
exports.CharlesClient = CharlesClient;
var Charles = (function (_super) {
    tslib_1.__extends(Charles, _super);
    function Charles(options) {
        var _this = _super.call(this, options) || this;
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