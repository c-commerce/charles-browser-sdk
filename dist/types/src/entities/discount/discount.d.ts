import Entity, { EntityOptions } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface DiscountOptions extends EntityOptions {
    rawPayload?: DiscountRawPayload;
}
export declare enum DiscountTypesEnum {
    rate = "rate",
    value = "value"
}
export declare type IDiscountType = DiscountTypesEnum.rate | DiscountTypesEnum.value;
export interface DiscountAmountRawPayload {
    currency: string;
    amount: number;
}
export interface DiscountI18NRawPayloadItem {
    locale: string;
    keys: {
        name: string;
    };
}
export interface DiscountRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly type?: IDiscountType;
    readonly value?: DiscountAmountRawPayload;
    readonly name?: string | null;
    readonly i18n?: DiscountI18NRawPayloadItem[] | null;
}
export interface DiscountPayload {
    readonly id?: DiscountRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly type?: DiscountRawPayload['type'];
    readonly value?: DiscountRawPayload['value'];
    readonly name?: DiscountRawPayload['name'];
    readonly i18n?: DiscountRawPayload['i18n'];
}
/**
 * Manage discounts.
 *
 * @category Entity
 */
export declare class Discount extends Entity<DiscountPayload, DiscountRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: DiscountOptions;
    initialized: boolean;
    endpoint: string;
    id?: DiscountPayload['id'];
    createdAt?: DiscountPayload['createdAt'];
    updatedAt?: DiscountPayload['updatedAt'];
    deleted?: DiscountPayload['deleted'];
    active?: DiscountPayload['active'];
    type?: DiscountPayload['type'];
    value?: DiscountPayload['value'];
    name?: DiscountPayload['name'];
    i18n?: DiscountPayload['i18n'];
    constructor(options: DiscountOptions);
    protected deserialize(rawPayload: DiscountRawPayload): Discount;
    static create(payload: DiscountRawPayload, universe: Universe, http: Universe['http']): Discount;
    serialize(): DiscountRawPayload;
    init(): Promise<Discount | undefined>;
}
export declare class Discounts {
    static endpoint: string;
}
export declare class DiscountInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DiscountFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DiscountsFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
