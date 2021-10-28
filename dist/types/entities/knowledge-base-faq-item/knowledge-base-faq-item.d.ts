import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface KnowledgeBaseFaqItemOptions extends UniverseEntityOptions {
    rawPayload?: KnowledgeBaseFaqItemRawPayload;
}
export interface KnowledgeBaseFaqItemRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly locale?: string;
    readonly question?: string;
    readonly answer?: string;
    readonly knowledge_base?: string;
    readonly is_proxy?: boolean;
    readonly proxy_payload?: {
        [key: string]: any;
    };
}
export interface KnowledgeBaseFaqItemPayload {
    readonly id?: KnowledgeBaseFaqItemRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: KnowledgeBaseFaqItemRawPayload['deleted'];
    readonly active?: KnowledgeBaseFaqItemRawPayload['active'];
    readonly locale?: KnowledgeBaseFaqItemRawPayload['locale'];
    readonly question?: KnowledgeBaseFaqItemRawPayload['question'];
    readonly answer?: KnowledgeBaseFaqItemRawPayload['answer'];
    readonly knowledgeBase?: KnowledgeBaseFaqItemRawPayload['knowledge_base'];
    readonly isProxy?: KnowledgeBaseFaqItemRawPayload['is_proxy'];
    readonly proxyPayload?: KnowledgeBaseFaqItemRawPayload['proxy_payload'];
}
export declare class KnowledgeBaseFaqItem extends UniverseEntity<KnowledgeBaseFaqItemPayload, KnowledgeBaseFaqItemRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: KnowledgeBaseFaqItemOptions;
    initialized: boolean;
    endpoint: string;
    id?: KnowledgeBaseFaqItemPayload['id'];
    createdAt?: KnowledgeBaseFaqItemPayload['createdAt'];
    updatedAt?: KnowledgeBaseFaqItemPayload['updatedAt'];
    deleted?: KnowledgeBaseFaqItemPayload['deleted'];
    active?: KnowledgeBaseFaqItemPayload['active'];
    locale?: KnowledgeBaseFaqItemPayload['locale'];
    question?: KnowledgeBaseFaqItemPayload['question'];
    answer?: KnowledgeBaseFaqItemPayload['answer'];
    knowledgeBase?: KnowledgeBaseFaqItemPayload['knowledgeBase'];
    isProxy?: KnowledgeBaseFaqItemPayload['isProxy'];
    proxyPayload?: KnowledgeBaseFaqItemPayload['proxyPayload'];
    constructor(options: KnowledgeBaseFaqItemOptions);
    protected deserialize(rawPayload: KnowledgeBaseFaqItemRawPayload): KnowledgeBaseFaqItem;
    static create(payload: KnowledgeBaseFaqItemRawPayload, universe: Universe, http: Universe['http']): KnowledgeBaseFaqItem;
    serialize(): KnowledgeBaseFaqItemRawPayload;
    init(): Promise<KnowledgeBaseFaqItem | undefined>;
}
export declare class KnowledgeBaseFaqItems {
    static endpoint: string;
}
export declare class KnowledgeBaseFaqItemInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class KnowledgeBaseFaqItemFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class KnowledgeBaseFaqItemsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
