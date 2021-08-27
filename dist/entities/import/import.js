"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportsFetchCountRemoteError = exports.ImportUploadRemoteError = exports.ImportProcessRemoteError = exports.ImportPreviewRemoteError = exports.ImportsFetchRemoteError = exports.ImportFetchRemoteError = exports.ImportInitializationError = exports.Imports = exports.Import = exports.IResourceEnum = exports.IImportFromEnum = exports.IStatusEnum = exports.IOnDuplicateEnum = void 0;
var tslib_1 = require("tslib");
var _base_1 = require("../_base");
var errors_1 = require("../../errors");
var qs_1 = tslib_1.__importDefault(require("qs"));
var IOnDuplicateEnum;
(function (IOnDuplicateEnum) {
    IOnDuplicateEnum["Update"] = "update";
    IOnDuplicateEnum["Skip"] = "skip";
})(IOnDuplicateEnum = exports.IOnDuplicateEnum || (exports.IOnDuplicateEnum = {}));
var IStatusEnum;
(function (IStatusEnum) {
    IStatusEnum["Created"] = "created";
    IStatusEnum["ValidatedError"] = "validated_error";
    IStatusEnum["ValidatedSuccess"] = "validated_success";
    IStatusEnum["Processing"] = "processing";
    IStatusEnum["ProcessedSuccess"] = "processed_success";
    IStatusEnum["ProcessedSuccessWithError"] = "processed_success_with_error";
    IStatusEnum["ProcessedError"] = "processed_error";
})(IStatusEnum = exports.IStatusEnum || (exports.IStatusEnum = {}));
var IImportFromEnum;
(function (IImportFromEnum) {
    IImportFromEnum["File"] = "file";
})(IImportFromEnum = exports.IImportFromEnum || (exports.IImportFromEnum = {}));
var IResourceEnum;
(function (IResourceEnum) {
    IResourceEnum["Contacts"] = "contacts";
})(IResourceEnum = exports.IResourceEnum || (exports.IResourceEnum = {}));
var Import = (function (_super) {
    tslib_1.__extends(Import, _super);
    function Import(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this.universe = options.universe;
        _this.apiCarrier = options.universe;
        _this.endpoint = 'api/v0/imports';
        _this.http = options.http;
        _this.options = options;
        _this.initialized = (_a = options.initialized) !== null && _a !== void 0 ? _a : false;
        if (options === null || options === void 0 ? void 0 : options.rawPayload) {
            _this.deserialize(options.rawPayload);
        }
        return _this;
    }
    Import.prototype.deserialize = function (rawPayload) {
        var _a, _b;
        this.setRawPayload(rawPayload);
        this.id = rawPayload.id;
        this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined;
        this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined;
        this.deleted = (_a = rawPayload.deleted) !== null && _a !== void 0 ? _a : false;
        this.active = (_b = rawPayload.active) !== null && _b !== void 0 ? _b : true;
        this.name = rawPayload.name;
        this.resource = rawPayload.resource;
        this.errorStrategy = rawPayload.error_strategy;
        this.validationStrategy = rawPayload.validation_strategy;
        this.duplicationStrategy = rawPayload.duplication_strategy;
        this.fieldMap = rawPayload.field_map;
        this.autoAssignement = rawPayload.auto_assignement;
        this.status = rawPayload.status;
        this.importFrom = rawPayload.import_from;
        this.date = rawPayload.date;
        this.labels = rawPayload.labels;
        return this;
    };
    Import.create = function (payload, universe, http) {
        return new Import({ rawPayload: payload, universe: universe, http: http, initialized: true });
    };
    Import.prototype.serialize = function () {
        var _a, _b;
        return {
            id: this.id,
            created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
            updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
            deleted: (_a = this.deleted) !== null && _a !== void 0 ? _a : false,
            active: (_b = this.active) !== null && _b !== void 0 ? _b : true,
            name: this.name,
            resource: this.resource,
            error_strategy: this.errorStrategy,
            validation_strategy: this.validationStrategy,
            duplication_strategy: this.duplicationStrategy,
            field_map: this.fieldMap,
            auto_assignement: this.autoAssignement,
            status: this.status,
            import_from: this.importFrom,
            date: this.date,
            labels: this.labels
        };
    };
    Import.prototype.init = function () {
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
                        throw this.handleError(new ImportInitializationError(undefined, { error: err_1 }));
                    case 3: return [2];
                }
            });
        });
    };
    Import.prototype.preview = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/preview" + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 1:
                        res = _b.sent();
                        return [2, res.data.data];
                    case 2:
                        err_2 = _b.sent();
                        throw this.handleError(new ImportPreviewRemoteError(undefined, { error: err_2 }));
                    case 3: return [2];
                }
            });
        });
    };
    Import.prototype.process = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/process" + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 1:
                        res = _b.sent();
                        return [2, res.data.data];
                    case 2:
                        err_3 = _b.sent();
                        throw this.handleError(new ImportProcessRemoteError(undefined, { error: err_3 }));
                    case 3: return [2];
                }
            });
        });
    };
    Import.prototype.upload = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, res, err_4;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        opts = {
                            method: 'POST',
                            url: this.universe.universeBase + "/" + this.endpoint + "/" + this.id + "/upload" + ((options === null || options === void 0 ? void 0 : options.query) ? qs_1.default.stringify(options.query, { addQueryPrefix: true }) : ''),
                            timeout: 60000,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            responseType: 'json'
                        };
                        return [4, ((_a = this.http) === null || _a === void 0 ? void 0 : _a.getClient()(opts))];
                    case 1:
                        res = _b.sent();
                        this.deserialize(res.data.data[0]);
                        return [2, this];
                    case 2:
                        err_4 = _b.sent();
                        throw this.handleError(new ImportUploadRemoteError(undefined, { error: err_4 }));
                    case 3: return [2];
                }
            });
        });
    };
    return Import;
}(_base_1.UniverseEntity));
exports.Import = Import;
var Imports = (function () {
    function Imports() {
    }
    Imports.endpoint = 'api/v0/imports';
    return Imports;
}());
exports.Imports = Imports;
var ImportInitializationError = (function (_super) {
    tslib_1.__extends(ImportInitializationError, _super);
    function ImportInitializationError(message, properties) {
        if (message === void 0) { message = 'Could not initialize import.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ImportInitializationError';
        Object.setPrototypeOf(_this, ImportInitializationError.prototype);
        return _this;
    }
    return ImportInitializationError;
}(errors_1.BaseError));
exports.ImportInitializationError = ImportInitializationError;
var ImportFetchRemoteError = (function (_super) {
    tslib_1.__extends(ImportFetchRemoteError, _super);
    function ImportFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get import.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ImportFetchRemoteError';
        Object.setPrototypeOf(_this, ImportFetchRemoteError.prototype);
        return _this;
    }
    return ImportFetchRemoteError;
}(errors_1.BaseError));
exports.ImportFetchRemoteError = ImportFetchRemoteError;
var ImportsFetchRemoteError = (function (_super) {
    tslib_1.__extends(ImportsFetchRemoteError, _super);
    function ImportsFetchRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not get imports.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ImportsFetchRemoteError';
        Object.setPrototypeOf(_this, ImportsFetchRemoteError.prototype);
        return _this;
    }
    return ImportsFetchRemoteError;
}(errors_1.BaseError));
exports.ImportsFetchRemoteError = ImportsFetchRemoteError;
var ImportPreviewRemoteError = (function (_super) {
    tslib_1.__extends(ImportPreviewRemoteError, _super);
    function ImportPreviewRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not preview import.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ImportPreviewRemoteError';
        Object.setPrototypeOf(_this, ImportPreviewRemoteError.prototype);
        return _this;
    }
    return ImportPreviewRemoteError;
}(errors_1.BaseError));
exports.ImportPreviewRemoteError = ImportPreviewRemoteError;
var ImportProcessRemoteError = (function (_super) {
    tslib_1.__extends(ImportProcessRemoteError, _super);
    function ImportProcessRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not process import.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ImportProcessRemoteError';
        Object.setPrototypeOf(_this, ImportProcessRemoteError.prototype);
        return _this;
    }
    return ImportProcessRemoteError;
}(errors_1.BaseError));
exports.ImportProcessRemoteError = ImportProcessRemoteError;
var ImportUploadRemoteError = (function (_super) {
    tslib_1.__extends(ImportUploadRemoteError, _super);
    function ImportUploadRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not upload import.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ImportUploadRemoteError';
        Object.setPrototypeOf(_this, ImportUploadRemoteError.prototype);
        return _this;
    }
    return ImportUploadRemoteError;
}(errors_1.BaseError));
exports.ImportUploadRemoteError = ImportUploadRemoteError;
var ImportsFetchCountRemoteError = (function (_super) {
    tslib_1.__extends(ImportsFetchCountRemoteError, _super);
    function ImportsFetchCountRemoteError(message, properties) {
        if (message === void 0) { message = 'Could not fetch count of imports.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ImportsFetchCountRemoteError';
        Object.setPrototypeOf(_this, ImportsFetchCountRemoteError.prototype);
        return _this;
    }
    return ImportsFetchCountRemoteError;
}(errors_1.BaseError));
exports.ImportsFetchCountRemoteError = ImportsFetchCountRemoteError;
//# sourceMappingURL=import.js.map