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
var _base_1 = __importDefault(require("../_base"));
var errors_1 = require("../../errors");
var Ticket = /** @class */ (function (_super) {
    __extends(Ticket, _super);
    function Ticket(options) {
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.endpoint = 'api/v0/tickets';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = options.initialized || false;
        if (options && options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Ticket.prototype.deserialize = function (rawPayload) {
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = rawPayload.deleted || false;
        this.active = rawPayload.active || true;
        this.dueAt = rawPayload.due_at ? new Date(rawPayload.due_at) : undefined;
        this.closureAt = rawPayload.closure_at ? new Date(rawPayload.closure_at) : undefined;
        this.flagged = rawPayload.flagged || false;
        this.author = rawPayload.author;
        this.status = rawPayload.status;
        this.assignee = rawPayload.assignee;
        this.title = rawPayload.title;
        this.description = rawPayload.description;
        this.priority = rawPayload.priority;
        this.attachments = rawPayload.attachments;
        this.attachedResource = rawPayload.attached_resource;
        this.attachedResourceType = rawPayload.attached_resource_type;
        this.tags = rawPayload.tags;
        this.linked = rawPayload.linked;
        return this;
    };
    Ticket.create = function (payload, universe, http) {
        return new Ticket({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Ticket.prototype.serialize = function () {
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: this.deleted || false,
            active: this.active || true,
            due_at: this.dueAt ? this.dueAt.toISOString() : undefined,
            closure_at: this.closureAt ? this.closureAt.toISOString() : undefined,
            flagged: this.flagged,
            author: this.author,
            status: this.status,
            assignee: this.assignee,
            title: this.title,
            description: this.description,
            priority: this.priority,
            attachments: this.attachments,
            attached_resource: this.attachedResource,
            attached_resource_type: this.attachedResourceType,
            tags: this.tags,
            linked: this.linked
        };
    };
    Ticket.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetch()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                    case 2:
                        err_1 = _a.sent();
                        throw this.handleError(new TicketInitializationError(undefined, { error: err_1 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Ticket.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.getClient().get(this.universe.universeBase + "/" + this.endpoint + "/" + this.id)];
                    case 1:
                        res = _a.sent();
                        this.deserialize(res.data.data[0]);
                        return [2 /*return*/, this];
                    case 2:
                        err_2 = _a.sent();
                        throw this.handleError(new TicketFetchRemoteError(undefined, { error: err_2 }));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Ticket;
}(_base_1.default));
exports.Ticket = Ticket;
var Tickets = /** @class */ (function () {
    function Tickets() {
    }
    Tickets.endpoint = 'api/v0/tickets';
    return Tickets;
}());
exports.Tickets = Tickets;
var TicketInitializationError = /** @class */ (function (_super) {
    __extends(TicketInitializationError, _super);
    function TicketInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize ticket.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TicketInitializationError';
        return _this;
    }
    return TicketInitializationError;
}(errors_1.BaseError));
exports.TicketInitializationError = TicketInitializationError;
var TicketFetchRemoteError = /** @class */ (function (_super) {
    __extends(TicketFetchRemoteError, _super);
    function TicketFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get ticket.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TicketFetchRemoteError';
        return _this;
    }
    return TicketFetchRemoteError;
}(errors_1.BaseError));
exports.TicketFetchRemoteError = TicketFetchRemoteError;
var TicketsFetchRemoteError = /** @class */ (function (_super) {
    __extends(TicketsFetchRemoteError, _super);
    function TicketsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get tickets.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TicketsFetchRemoteError';
        return _this;
    }
    return TicketsFetchRemoteError;
}(errors_1.BaseError));
exports.TicketsFetchRemoteError = TicketsFetchRemoteError;
//# sourceMappingURL=ticket.js.map