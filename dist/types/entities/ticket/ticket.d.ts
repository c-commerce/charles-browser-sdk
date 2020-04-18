import Entity, { EntityOptions, EntityRawPayload } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface TicketOptions extends EntityOptions {
    rawPayload?: TicketRawPayload;
}
export interface TicketRawPayload extends EntityRawPayload {
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly due_at?: string;
    readonly closure_at?: string;
    readonly flagged?: boolean;
    readonly author?: string;
    readonly status?: string;
    readonly assignee?: string;
    readonly title?: string;
    readonly description?: string;
    readonly priority?: 'immediate' | 'highest' | 'high' | 'medium' | 'low' | 'lowest' | string;
    readonly attachments?: string[];
    readonly attached_resource?: string;
    readonly attached_resource_type?: 'feed' | 'event' | 'person' | string;
    readonly tags?: string[];
    readonly linked?: object[];
}
export interface TicketPayload {
    readonly id?: TicketRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly dueAt?: Date | null;
    readonly closureAt?: Date | null;
    readonly flagged?: boolean;
    readonly author?: string;
    readonly status?: string;
    readonly assignee?: string;
    readonly title?: string;
    readonly description?: string;
    readonly priority?: TicketRawPayload['priority'];
    readonly attachments?: string[];
    readonly attachedResource?: string;
    readonly attachedResourceType?: TicketRawPayload['attached_resource_type'];
    readonly tags?: string[];
    readonly linked?: TicketRawPayload['linked'];
}
export declare class Ticket extends Entity<TicketPayload, TicketRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: TicketOptions;
    initialized: boolean;
    endpoint: string;
    id?: TicketPayload['id'];
    createdAt?: TicketPayload['createdAt'];
    updatedAt?: TicketPayload['updatedAt'];
    deleted?: TicketPayload['deleted'];
    active?: TicketPayload['active'];
    dueAt?: TicketPayload['dueAt'];
    closureAt?: TicketPayload['closureAt'];
    flagged?: TicketPayload['flagged'];
    author?: TicketPayload['author'];
    status?: TicketPayload['status'];
    assignee?: TicketPayload['assignee'];
    title?: TicketPayload['title'];
    description?: TicketPayload['description'];
    priority?: TicketPayload['priority'];
    attachments?: TicketPayload['attachments'];
    attachedResource?: TicketPayload['attachedResource'];
    attachedResourceType?: TicketPayload['attachedResourceType'];
    tags?: TicketPayload['tags'];
    linked?: TicketPayload['linked'];
    constructor(options: TicketOptions);
    protected deserialize(rawPayload: TicketRawPayload): Ticket;
    static create(payload: TicketRawPayload, universe: Universe, http: Universe['http']): Ticket;
    serialize(): TicketRawPayload;
    init(): Promise<Ticket | undefined>;
}
export declare class Tickets {
    static endpoint: string;
}
export declare class TicketInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TicketFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TicketsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
