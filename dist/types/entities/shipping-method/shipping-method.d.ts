import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface ShippingMethodOptions extends EntityOptions {
    rawPayload?: ShippingMethodRawPayload;
}
export interface ShippingMethodRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string | null;
    readonly description?: string | null;
    readonly zone_rates?: null | Array<{
        currency: string;
        amount_net?: number | null;
        amount_gross?: number | null;
        zone?: null | {
            country?: string;
            locality?: string;
            region?: string;
        };
    }>;
}
export interface ShippingMethodPayload {
    readonly id?: ShippingMethodRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: ShippingMethodRawPayload['deleted'];
    readonly active?: ShippingMethodRawPayload['active'];
    readonly name?: ShippingMethodRawPayload['name'];
    readonly description?: ShippingMethodRawPayload['description'];
    readonly zoneRates?: ShippingMethodRawPayload['zone_rates'];
}
export declare class ShippingMethod extends Entity<ShippingMethodPayload, ShippingMethodRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: ShippingMethodOptions;
    initialized: boolean;
    endpoint: string;
    id?: ShippingMethodPayload['id'];
    createdAt?: ShippingMethodPayload['createdAt'];
    updatedAt?: ShippingMethodPayload['updatedAt'];
    deleted?: ShippingMethodPayload['deleted'];
    active?: ShippingMethodPayload['active'];
    name?: ShippingMethodPayload['name'];
    description?: ShippingMethodPayload['description'];
    zoneRates?: ShippingMethodPayload['zoneRates'];
    constructor(options: ShippingMethodOptions);
    protected deserialize(rawPayload: ShippingMethodRawPayload): ShippingMethod;
    static create(payload: ShippingMethodRawPayload, universe: Universe, http: Universe['http']): ShippingMethod;
    serialize(): ShippingMethodRawPayload;
    init(): Promise<ShippingMethod | undefined>;
}
export declare class ShippingMethods {
    static endpoint: string;
}
export declare class ShippingMethodInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ShippingMethodFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ShippingMethodsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
