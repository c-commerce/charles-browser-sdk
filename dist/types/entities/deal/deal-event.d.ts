import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface DealEventOptions extends EntityOptions {
    rawPayload?: DealEventRawPayload;
}
export interface DealEventRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly type?: string;
    readonly resource?: string | object;
    readonly resource_type?: string;
    readonly deal?: string;
    readonly author?: string;
    readonly proxy_payload?: object;
}
export interface DealEventPayload {
    readonly id?: DealEventRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: DealEventRawPayload['deleted'];
    readonly active?: DealEventRawPayload['active'];
    readonly type?: DealEventRawPayload['type'];
    readonly resource?: DealEventRawPayload['resource'];
    readonly resourceType?: DealEventRawPayload['resource_type'];
    readonly deal?: DealEventRawPayload['deal'];
    readonly author?: DealEventRawPayload['author'];
    readonly proxyPayload?: DealEventRawPayload['proxy_payload'];
}
export declare class DealEvent extends Entity<DealEventPayload, DealEventRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: DealEventOptions;
    initialized: boolean;
    endpoint: string;
    id?: DealEventPayload['id'];
    createdAt?: DealEventPayload['createdAt'];
    updatedAt?: DealEventPayload['updatedAt'];
    deleted?: DealEventPayload['deleted'];
    active?: DealEventPayload['active'];
    type?: DealEventPayload['type'];
    resource?: DealEventPayload['resource'];
    resourceType?: DealEventPayload['resourceType'];
    deal?: DealEventPayload['deal'];
    author?: DealEventPayload['author'];
    proxyPayload?: DealEventPayload['proxyPayload'];
    constructor(options: DealEventOptions);
    protected deserialize(rawPayload: DealEventRawPayload): DealEvent;
    static create(payload: DealEventRawPayload, universe: Universe, http: Universe['http']): DealEvent;
    serialize(): DealEventRawPayload;
    init(): Promise<DealEvent | undefined>;
}
export declare class DealEventInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DealEventFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DealEventsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
