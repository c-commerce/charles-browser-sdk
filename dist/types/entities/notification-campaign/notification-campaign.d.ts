import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface NotificationCampaignOptions extends EntityOptions {
    rawPayload?: NotificationCampaignRawPayload;
}
export interface NotificationCampaignTestRawPayload {
    resource?: object;
    communication_language?: string;
}
export declare type NotificationCampaignStatusType = 'draft' | 'armed' | 'paused' | 'cancelled_by_user' | 'cancelled' | 'published' | 'done' | 'errored';
export interface NotificationCampaignRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly summary?: string;
    readonly is_published?: boolean;
    readonly published_at?: string;
    readonly message_template?: string;
    readonly message_template_parameters?: Array<{
        name?: string;
        order_index?: number;
        value?: string;
        logic?: object | null;
    }>;
    readonly includes?: Array<{
        type?: 'list' | 'subscription';
        resource?: string;
    }>;
    readonly excludes?: Array<{
        type?: 'list' | 'subscription';
        resource?: string;
    }>;
    readonly status?: NotificationCampaignStatusType;
    readonly statusses?: Array<{
        kind?: 'PausedRateLimitted';
        active?: boolean;
        created_at?: string;
        updated_at?: string;
        message?: string;
    }>;
    readonly schedule?: {
        enabled?: boolean;
        at?: string;
    };
    readonly execution?: {
        enabled?: boolean;
        halt_on_error?: boolean;
        publication_date?: string;
        publication_time?: string;
        publication_in_recipient_timezone_enabled?: boolean;
        recipient_timezone_inference_enabled?: boolean;
        priorities?: string[];
        rate_limitation?: {
            priority?: 'emergency';
        } | {
            priority?: 'guaranteed_concurrency' | 'best_effort_concurrency';
            concurrency_maximum?: number;
        };
    };
    readonly author?: {
        staff?: string[];
        user?: string[];
    };
    readonly publisher?: {
        staff?: string[];
        user?: string[];
    };
    readonly is_armed?: boolean;
    readonly is_draft?: boolean;
    readonly default_language?: string;
}
export interface NotificationCampaignPayload {
    readonly id?: NotificationCampaignRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: NotificationCampaignRawPayload['deleted'];
    readonly active?: NotificationCampaignRawPayload['active'];
    readonly name?: NotificationCampaignRawPayload['name'];
    readonly summary?: NotificationCampaignRawPayload['summary'];
    readonly isPublished?: NotificationCampaignRawPayload['is_published'];
    readonly publishedAt?: NotificationCampaignRawPayload['published_at'];
    readonly messageTemplate?: NotificationCampaignRawPayload['message_template'];
    readonly messageTemplateParameters?: NotificationCampaignRawPayload['message_template_parameters'];
    readonly includes?: NotificationCampaignRawPayload['includes'];
    readonly excludes?: NotificationCampaignRawPayload['excludes'];
    readonly status?: NotificationCampaignRawPayload['status'];
    readonly statusses?: NotificationCampaignRawPayload['statusses'];
    readonly schedule?: NotificationCampaignRawPayload['schedule'];
    readonly execution?: NotificationCampaignRawPayload['execution'];
    readonly author?: NotificationCampaignRawPayload['author'];
    readonly publisher?: NotificationCampaignRawPayload['publisher'];
    readonly isArmed?: NotificationCampaignRawPayload['is_armed'];
    readonly isDraft?: NotificationCampaignRawPayload['is_draft'];
    readonly defaultLanguage?: NotificationCampaignRawPayload['default_language'];
}
export declare class NotificationCampaign extends Entity<NotificationCampaignPayload, NotificationCampaignRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: NotificationCampaignOptions;
    initialized: boolean;
    endpoint: string;
    id?: NotificationCampaignPayload['id'];
    createdAt?: NotificationCampaignPayload['createdAt'];
    updatedAt?: NotificationCampaignPayload['updatedAt'];
    deleted?: NotificationCampaignPayload['deleted'];
    active?: NotificationCampaignPayload['active'];
    name?: NotificationCampaignPayload['name'];
    summary?: NotificationCampaignPayload['summary'];
    isPublished?: NotificationCampaignPayload['isPublished'];
    publishedAt?: NotificationCampaignPayload['publishedAt'];
    messageTemplate?: NotificationCampaignPayload['messageTemplate'];
    messageTemplateParameters?: NotificationCampaignPayload['messageTemplateParameters'];
    includes?: NotificationCampaignPayload['includes'];
    excludes?: NotificationCampaignPayload['excludes'];
    status?: NotificationCampaignPayload['status'];
    statusses?: NotificationCampaignPayload['statusses'];
    schedule?: NotificationCampaignPayload['schedule'];
    execution?: NotificationCampaignPayload['execution'];
    author?: NotificationCampaignPayload['author'];
    publisher?: NotificationCampaignPayload['publisher'];
    isArmed?: NotificationCampaignPayload['isArmed'];
    isDraft?: NotificationCampaignPayload['isDraft'];
    defaultLanguage?: NotificationCampaignPayload['defaultLanguage'];
    constructor(options: NotificationCampaignOptions);
    protected deserialize(rawPayload: NotificationCampaignRawPayload): NotificationCampaign;
    static create(payload: NotificationCampaignRawPayload, universe: Universe, http: Universe['http']): NotificationCampaign;
    serialize(): NotificationCampaignRawPayload;
    init(): Promise<NotificationCampaign | undefined>;
    preflightCheck(): Promise<NotificationCampaign>;
    preflightArm(): Promise<NotificationCampaign>;
    publish(): Promise<NotificationCampaign>;
    test(payload: NotificationCampaignTestRawPayload): Promise<NotificationCampaign>;
}
export declare class NotificationCampaigns {
    static endpoint: string;
}
export declare class NotificationCampaignInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NotificationCampaignFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NotificationCampaignsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NotificationCampaignsFetchCountRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NotificationCampaignPreflightError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NotificationCampaignArmError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NotificationCampaignPublishError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class NotificationCampaignTestError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
