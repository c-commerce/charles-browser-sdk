import Entity, { EntityOptions, EntityRawPayload } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
import { Order } from '../../entities/order/order';
import { ChannelUser, ChannelUserRawPayload } from './channel-user';
export interface PersonOptions extends EntityOptions {
    rawPayload?: PersonRawPayload;
}
export interface AddressOptions extends PersonOptions {
    rawPayload?: PersonAddressRawPayload;
}
export interface PhonenumberOptions extends PersonOptions {
    rawPayload?: PersonPhonenumberRawPayload;
}
export interface PersonAddressRawPayload extends EntityRawPayload {
    readonly person?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly type?: string;
    readonly lines?: string[];
    readonly locality?: string;
    readonly country?: string;
    readonly region?: string;
    readonly comment?: string;
    readonly postal_code?: string;
}
export interface PersonPhonenumberRawPayload extends EntityRawPayload {
    readonly person?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly type?: string;
    readonly value?: string;
}
export declare type PersonChannelUserRawPayload = ChannelUserRawPayload;
export interface PersonRawPayload extends EntityRawPayload {
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly first_name?: string;
    readonly middle_name?: string;
    readonly last_name?: string;
    readonly name?: string;
    readonly email?: string;
    readonly avatar?: string;
    readonly date_of_birth?: string;
    readonly gender?: string;
    readonly comment?: string;
    readonly tags?: string[];
    readonly measurements?: {
        body?: {
            weight: number;
            height: number;
        };
        shoes?: {
            sizes?: {
                type?: 'womens' | 'mens' | 'kids' | 'babys' | null;
                uk?: number | null;
                eu?: number | null;
                us?: number | null;
            };
        };
    };
    readonly addresses?: PersonAddressRawPayload[];
    readonly phonenumbers?: PersonPhonenumberRawPayload[];
    readonly channel_users?: PersonChannelUserRawPayload[];
}
export interface IPersonCarts {
    fetch: Function;
    fromJson: Function;
    toJson: Function;
    create: Function;
}
export interface PersonPayload {
    readonly id?: PersonRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly firstName?: PersonRawPayload['first_name'];
    readonly middleName?: PersonRawPayload['middle_name'];
    readonly lastName?: PersonRawPayload['last_name'];
    readonly name?: PersonRawPayload['name'];
    readonly email?: PersonRawPayload['email'];
    readonly avatar?: PersonRawPayload['avatar'];
    readonly dateOfBirth?: PersonRawPayload['date_of_birth'];
    readonly gender?: PersonRawPayload['gender'];
    readonly comment?: PersonRawPayload['comment'];
    readonly measurements?: PersonRawPayload['measurements'];
    readonly tags?: PersonRawPayload['tags'];
    readonly addresses?: Address[];
    readonly phonenumbers?: Phonenumber[];
    readonly channelUsers?: ChannelUser[];
}
export interface PersonAnalyticsSnapshotResponse {
    customer_lifetime_value: Array<{
        overall_net_value: number;
        currency: string;
    }>;
    latest_orders: Order[];
    mean_polarity: number;
    mean_nps_score: number;
}
/**
 * Manage people, that usually are generated from channel users.
 *
 * @category Entity
 */
export declare class Person extends Entity<PersonPayload, PersonRawPayload> {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: PersonOptions;
    initialized: boolean;
    endpoint: string;
    id?: PersonPayload['id'];
    createdAt?: PersonPayload['createdAt'];
    updatedAt?: PersonPayload['updatedAt'];
    deleted?: PersonPayload['deleted'];
    active?: PersonPayload['active'];
    firstName?: PersonPayload['firstName'];
    middleName?: PersonPayload['middleName'];
    lastName?: PersonPayload['lastName'];
    name?: PersonPayload['name'];
    email?: PersonPayload['email'];
    avatar?: PersonPayload['avatar'];
    dateOfBirth?: PersonPayload['dateOfBirth'];
    gender?: PersonPayload['gender'];
    comment?: PersonPayload['comment'];
    measurements?: PersonPayload['measurements'];
    tags?: PersonPayload['tags'];
    addresses?: PersonPayload['addresses'];
    phonenumbers?: PersonPayload['phonenumbers'];
    channelUsers?: PersonPayload['channelUsers'];
    constructor(options: PersonOptions);
    protected deserialize(rawPayload: PersonRawPayload): Person;
    static create(payload: PersonRawPayload, universe: Universe, http: Universe['http']): Person;
    serialize(): PersonRawPayload;
    init(): Promise<Person | undefined>;
    analytics(): object;
    /**
     * Carts accessor
     *
     * ```js
     * // fetch all carts of a person
     * await person.carts.fetch()
     * // fetch all feeds as raw structs with some query options
     * await person.carts.fetch({ raw: true })
     * // cast a list of class instances to list of structs
     * person.carts.toJson([cart])
     * // cast a list of structs to list of class instances
     * person.carts.fromJson([cart])
     * // create a cart for this person
     * person.carts.create(cart)
     * ```
     */
    get carts(): IPersonCarts;
}
export declare class People {
    static endpoint: string;
}
export declare class Address {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: AddressOptions;
    initialized: boolean;
    id?: string;
    lines?: string[];
    locality?: string;
    country?: string;
    region?: string;
    postalCode?: string;
    type?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    comment?: string;
    deleted?: boolean;
    active?: boolean;
    constructor(options: AddressOptions);
    protected deserialize(rawPayload: PersonAddressRawPayload): Address;
    static create(payload: PersonAddressRawPayload, universe: Universe, http: Universe['http']): Address;
    static createUninitialized(payload: PersonAddressRawPayload, universe: Universe, http: Universe['http']): Address;
    serialize(): PersonAddressRawPayload;
}
export declare class Phonenumber {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: PhonenumberOptions;
    initialized: boolean;
    id?: string;
    value?: string;
    type?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    comment?: string;
    deleted?: boolean;
    active?: boolean;
    constructor(options: PhonenumberOptions);
    protected deserialize(rawPayload: PersonPhonenumberRawPayload): Phonenumber;
    static create(payload: PersonPhonenumberRawPayload, universe: Universe, http: Universe['http']): Phonenumber;
    static createUninitialized(payload: PersonPhonenumberRawPayload, universe: Universe, http: Universe['http']): Phonenumber;
    serialize(): PersonPhonenumberRawPayload;
}
export declare class PersonInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PersonFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PeopleFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PeopleAnalyticsRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
