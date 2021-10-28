import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface FavoriteOptions extends UniverseEntityOptions {
    rawPayload?: FavoriteRawPayload;
}
export interface FavoriteRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string | null;
    readonly pages?: null | Array<{
        order_index?: number;
        items: Array<{
            type: 'product' | string;
            resource: string;
        }>;
    }>;
    readonly items?: Array<{
        type: 'product' | string;
        resource: string;
        payload: object | null;
    }>;
}
export interface FavoritePayload {
    readonly id?: FavoriteRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: FavoriteRawPayload['deleted'];
    readonly active?: FavoriteRawPayload['active'];
    readonly name?: FavoriteRawPayload['name'];
    readonly pages?: FavoriteRawPayload['pages'];
    readonly items?: FavoriteRawPayload['items'];
}
export declare class Favorite extends UniverseEntity<FavoritePayload, FavoriteRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: FavoriteOptions;
    initialized: boolean;
    endpoint: string;
    id?: FavoritePayload['id'];
    createdAt?: FavoritePayload['createdAt'];
    updatedAt?: FavoritePayload['updatedAt'];
    deleted?: FavoritePayload['deleted'];
    active?: FavoritePayload['active'];
    name?: FavoritePayload['name'];
    pages?: FavoritePayload['pages'];
    items?: FavoritePayload['items'];
    constructor(options: FavoriteOptions);
    protected deserialize(rawPayload: FavoriteRawPayload): Favorite;
    static create(payload: FavoriteRawPayload, universe: Universe, http: Universe['http']): Favorite;
    serialize(): FavoriteRawPayload;
    init(): Promise<Favorite | undefined>;
}
export declare class Favorites {
    static endpoint: string;
}
export declare class FavoriteInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class FavoriteFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class FavoritesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
