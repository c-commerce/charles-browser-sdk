"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsFetchRemoteError = exports.TicketFetchRemoteError = exports.TicketInitializationError = exports.Tickets = exports.Ticket = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var Ticket = (function (_super) {
    tslib_1.__extends(Ticket, _super);
    function Ticket(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/tickets';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Ticket.prototype.deserialize = function (rawPayload) {
        var _a, _b, _c;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.dueAt = rawPayload.due_at ? new Date(rawPayload.due_at) : undefined;
        this.closureAt = rawPayload.closure_at ? new Date(rawPayload.closure_at) : undefined;
        this.flagged = (_c = rawPayload.flagged) !== null && _c !== void 0 ? _c : false;
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
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.fetch()];
                    case 1:
                        _a.sent();
                        return [2, this];
                    case 2:
                        err_1 = _a.sent();
                        throw this.handleError(new TicketInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Ticket;
}(_base_1.UniverseEntity));
exports.Ticket = Ticket;
var Tickets = (function () {
    function Tickets() {
    }
    Tickets.endpoint = 'api/v0/tickets';
    return Tickets;
}());
exports.Tickets = Tickets;
var TicketInitializationError = (function (_super) {
    tslib_1.__extends(TicketInitializationError, _super);
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
var TicketFetchRemoteError = (function (_super) {
    tslib_1.__extends(TicketFetchRemoteError, _super);
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
var TicketsFetchRemoteError = (function (_super) {
    tslib_1.__extends(TicketsFetchRemoteError, _super);
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