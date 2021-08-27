import { UniverseEntityOptions, UniverseEntity, EntityFetchOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface ImportOptions extends UniverseEntityOptions {
    rawPayload?: ImportRawPayload;
}
export declare enum IOnDuplicateEnum {
    Update = "update",
    Skip = "skip"
}
export declare type IOnDuplicateType = IOnDuplicateEnum.Update | IOnDuplicateEnum.Skip;
export declare enum IStatusEnum {
    Created = "created",
    ValidatedError = "validated_error",
    ValidatedSuccess = "validated_success",
    Processing = "processing",
    ProcessedSuccess = "processed_success",
    ProcessedSuccessWithError = "processed_success_with_error",
    ProcessedError = "processed_error"
}
export declare type IStatusType = IStatusEnum.Created | IStatusEnum.ValidatedError | IStatusEnum.ValidatedSuccess | IStatusEnum.Processing | IStatusEnum.ProcessedSuccess | IStatusEnum.ProcessedSuccessWithError | IStatusEnum.ProcessedError;
export declare enum IImportFromEnum {
    File = "file"
}
export declare type IImportFromType = IImportFromEnum.File;
export declare enum IResourceEnum {
    Contacts = "contacts"
}
export declare type IResourceType = IResourceEnum.Contacts;
export interface ImportRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly resource?: IResourceType | null;
    readonly error_strategy?: {
        continue_on_error?: boolean;
    };
    readonly validation_strategy?: {
        skip_invalid?: boolean;
    };
    readonly duplication_strategy?: {
        on_duplicate?: IOnDuplicateType | null;
    };
    readonly field_map?: {
        people_phonenumber_external_value?: {
            source?: string;
            update_existing?: boolean;
        };
        people_organization_external_name?: {
            source?: string;
            update_existing?: boolean;
        };
        people_external_firstname?: {
            source?: string;
            update_existing?: boolean;
        };
        people_external_last_name?: {
            source?: string;
            update_existing?: boolean;
        };
        people_external_email?: {
            source?: string;
            update_existing?: boolean;
        };
    };
    readonly auto_assignement?: {
        tags?: string[];
        lists?: string[];
        message_subscriptions_granted?: string[];
        message_subscriptions_denied?: string[];
    };
    readonly status?: IStatusType | null;
    readonly import_from?: IImportFromType | null;
    readonly date?: Date;
    readonly labels?: object;
}
export interface ImportPayload {
    readonly id?: ImportRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ImportRawPayload['deleted'];
    readonly active?: ImportRawPayload['active'];
    readonly name?: ImportRawPayload['name'];
    readonly resource: ImportRawPayload['resource'];
    readonly errorStrategy?: ImportRawPayload['error_strategy'];
    readonly validationStrategy?: ImportRawPayload['validation_strategy'];
    readonly duplicationStrategy?: ImportRawPayload['duplication_strategy'];
    readonly fieldMap?: ImportRawPayload['field_map'];
    readonly autoAssignement?: ImportRawPayload['auto_assignement'];
    readonly status?: ImportRawPayload['status'];
    readonly importFrom?: ImportRawPayload['import_from'];
    readonly date?: ImportRawPayload['date'];
    readonly labels: ImportRawPayload['labels'];
}
export declare class Import extends UniverseEntity<ImportPayload, ImportRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: ImportOptions;
    initialized: boolean;
    endpoint: string;
    id?: ImportPayload['id'];
    createdAt?: ImportPayload['createdAt'];
    updatedAt?: ImportPayload['updatedAt'];
    deleted?: ImportPayload['deleted'];
    active?: ImportPayload['active'];
    name?: ImportPayload['name'];
    resource?: ImportPayload['resource'];
    errorStrategy?: ImportPayload['errorStrategy'];
    validationStrategy?: ImportPayload['validationStrategy'];
    duplicationStrategy?: ImportPayload['duplicationStrategy'];
    fieldMap?: ImportPayload['fieldMap'];
    autoAssignement?: ImportPayload['autoAssignement'];
    status?: ImportPayload['status'];
    importFrom?: ImportPayload['importFrom'];
    date?: ImportPayload['date'];
    labels?: ImportPayload['labels'];
    constructor(options: ImportOptions);
    protected deserialize(rawPayload: ImportRawPayload): Import;
    static create(payload: ImportRawPayload, universe: Universe, http: Universe['http']): Import;
    serialize(): ImportRawPayload;
    init(): Promise<Import | undefined>;
    preview(options?: EntityFetchOptions): Promise<ImportRawPayload[]>;
    process(options?: EntityFetchOptions): Promise<ImportRawPayload[]>;
    upload(payload: FormData): Promise<Import>;
}
export declare class Imports {
    static endpoint: string;
}
export declare class ImportInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ImportFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ImportsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ImportPreviewRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ImportProcessRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ImportUploadRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ImportsFetchCountRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
