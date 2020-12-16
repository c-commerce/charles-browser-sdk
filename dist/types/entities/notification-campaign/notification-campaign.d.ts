import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface NotificationCampaignOptions extends EntityOptions {
    rawPayload?: NotificationCampaignRawPayload;
}
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
    readonly includes?: Array<{
        type?: 'list' | 'subscription';
        resource?: string;
    }>;
    readonly excludes?: Array<{
        type?: 'list' | 'subscription';
        resource?: string;
    }>;
    readonly status?: 'draft' | 'publishing' | 'paused' | 'cancelled_by_user' | 'cancelled' | 'published' | 'errored';
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
    readonly includes?: NotificationCampaignRawPayload['includes'];
    readonly excludes?: NotificationCampaignRawPayload['excludes'];
    readonly status?: NotificationCampaignRawPayload['status'];
    readonly statusses?: NotificationCampaignRawPayload['statusses'];
    readonly schedule?: NotificationCampaignRawPayload['schedule'];
    readonly execution?: NotificationCampaignRawPayload['execution'];
    readonly author?: NotificationCampaignRawPayload['author'];
    readonly publisher?: NotificationCampaignRawPayload['publisher'];
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
    includes?: NotificationCampaignPayload['includes'];
    excludes?: NotificationCampaignPayload['excludes'];
    status?: NotificationCampaignPayload['status'];
    statusses?: NotificationCampaignPayload['statusses'];
    schedule?: NotificationCampaignPayload['schedule'];
    execution?: NotificationCampaignPayload['execution'];
    author?: NotificationCampaignPayload['author'];
    publisher?: NotificationCampaignPayload['publisher'];
    constructor(options: NotificationCampaignOptions);
    protected deserialize(rawPayload: NotificationCampaignRawPayload): NotificationCampaign;
    static create(payload: NotificationCampaignRawPayload, universe: Universe, http: Universe['http']): NotificationCampaign;
    serialize(): NotificationCampaignRawPayload;
    init(): Promise<NotificationCampaign | undefined>;
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