import { UniverseEntity, UniverseEntityOptions, EntityFetchOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import * as knowledgeBaseFaqItem from '../knowledge-base-faq-item/knowledge-base-faq-item';
export interface KnowledgeBaseOptions extends UniverseEntityOptions {
    rawPayload?: KnowledgeBaseRawPayload;
}
export interface KnowledgeBaseRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly external_reference_id?: string;
    readonly name?: string;
    readonly metadata?: {
        [key: string]: any;
    };
    readonly configuration?: {
        [key: string]: any;
    };
    readonly labels?: {
        [key: string]: any;
    };
    readonly nlu?: string;
    readonly is_proxy?: boolean;
    readonly proxy_vendor?: string;
    readonly proxy_payload?: {
        [key: string]: any;
    };
}
export interface KnowledgeBasePayload {
    readonly id?: KnowledgeBaseRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: KnowledgeBaseRawPayload['deleted'];
    readonly active?: KnowledgeBaseRawPayload['active'];
    readonly externalReferenceId?: KnowledgeBaseRawPayload['external_reference_id'];
    readonly name?: KnowledgeBaseRawPayload['name'];
    readonly metadata?: KnowledgeBaseRawPayload['metadata'];
    readonly configuration?: KnowledgeBaseRawPayload['configuration'];
    readonly labels?: KnowledgeBaseRawPayload['labels'];
    readonly nlu?: KnowledgeBaseRawPayload['nlu'];
    readonly isProxy?: KnowledgeBaseRawPayload['is_proxy'];
    readonly proxyVendor?: KnowledgeBaseRawPayload['proxy_vendor'];
    readonly proxyPayload?: KnowledgeBaseRawPayload['proxy_payload'];
}
export declare class KnowledgeBase extends UniverseEntity<KnowledgeBasePayload, KnowledgeBaseRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: KnowledgeBaseOptions;
    initialized: boolean;
    endpoint: string;
    id?: KnowledgeBasePayload['id'];
    createdAt?: KnowledgeBasePayload['createdAt'];
    updatedAt?: KnowledgeBasePayload['updatedAt'];
    deleted?: KnowledgeBasePayload['deleted'];
    active?: KnowledgeBasePayload['active'];
    externalReferenceId?: KnowledgeBasePayload['externalReferenceId'];
    name?: KnowledgeBasePayload['name'];
    metadata?: KnowledgeBasePayload['metadata'];
    configuration?: KnowledgeBasePayload['configuration'];
    labels?: KnowledgeBasePayload['labels'];
    nlu?: KnowledgeBasePayload['nlu'];
    isProxy?: KnowledgeBasePayload['isProxy'];
    proxyVendor?: KnowledgeBasePayload['proxyVendor'];
    proxyPayload?: KnowledgeBasePayload['proxyPayload'];
    constructor(options: KnowledgeBaseOptions);
    protected deserialize(rawPayload: KnowledgeBaseRawPayload): KnowledgeBase;
    static create(payload: KnowledgeBaseRawPayload, universe: Universe, http: Universe['http']): KnowledgeBase;
    serialize(): KnowledgeBaseRawPayload;
    init(): Promise<KnowledgeBase | undefined>;
    knowledgeBaseFaqItems(options?: EntityFetchOptions): Promise<knowledgeBaseFaqItem.KnowledgeBaseFaqItem[] | knowledgeBaseFaqItem.KnowledgeBaseFaqItemRawPayload[] | undefined>;
}
export declare class KnowledgeBases {
    static endpoint: string;
}
export declare class KnowledgeBaseInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class KnowledgeBaseFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class KnowledgeBasesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
