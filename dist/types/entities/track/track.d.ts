import { UniverseEntity, UniverseEntityOptions, EntityRawPayload } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface TrackOptions extends UniverseEntityOptions {
    rawPayload?: TrackRawPayload;
}
export interface TrackMilestoneDataRawPayload {
    readonly topic?: string | string[];
    readonly current?: number;
    readonly achieved?: boolean;
    readonly achievement_at?: number;
    readonly vendor?: string;
}
export interface TrackMilestoneActivationRawPayload {
    readonly uri?: string;
    readonly type?: string;
}
export interface TrackMilestoneRawPayload {
    readonly data?: TrackMilestoneDataRawPayload;
    readonly kind?: string;
    readonly name?: string;
    readonly image?: string;
    readonly summary?: string;
    readonly order_index?: number;
    readonly instructions?: string;
    readonly activation?: TrackMilestoneActivationRawPayload;
}
export interface TrackRawPayload extends EntityRawPayload {
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly completed?: boolean;
    readonly completed_at?: string;
    readonly scope?: string;
    readonly assignee?: string;
    readonly milestones?: TrackMilestoneRawPayload[];
}
export interface TrackPayload {
    readonly id?: TrackRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: TrackRawPayload['deleted'];
    readonly active?: TrackRawPayload['active'];
    readonly completed?: TrackRawPayload['completed'];
    readonly completed_at?: Date | null;
    readonly scope?: TrackRawPayload['scope'];
    readonly assignee?: TrackRawPayload['assignee'];
    readonly milestones?: TrackRawPayload['milestones'];
}
export declare class Track extends UniverseEntity<TrackPayload, TrackRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: TrackOptions;
    initialized: boolean;
    endpoint: string;
    id?: TrackRawPayload['id'];
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deleted?: TrackRawPayload['deleted'];
    active?: TrackRawPayload['active'];
    completed?: TrackRawPayload['completed'];
    completed_at?: Date | null;
    scope?: TrackRawPayload['scope'];
    assignee?: TrackRawPayload['assignee'];
    milestones?: TrackRawPayload['milestones'];
    constructor(options: TrackOptions);
    protected deserialize(rawPayload: TrackRawPayload): Track;
    static create(payload: TrackRawPayload, universe: Universe, http: Universe['http']): Track;
    serialize(): TrackRawPayload;
    init(): Promise<Track | undefined>;
}
export declare class Tracks {
    static endpoint: string;
    static currentEndpoint: string;
}
export declare class TrackInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TrackFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TracksFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
