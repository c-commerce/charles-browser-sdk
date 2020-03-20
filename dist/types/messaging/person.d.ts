/// <reference types="node" />
import { EventEmitter } from 'events';
import { Universe } from '../universe';
export interface PersonOptions {
    universe: Universe;
    http: Universe['http'];
    rawPayload?: PersonRawPayload;
    initialized?: boolean;
}
export interface AddressOptions extends PersonOptions {
    rawPayload?: AddressRawPayload;
}
export interface PhonenumberOptions extends PersonOptions {
    rawPayload?: PhonenumberRawPayload;
}
export interface PersonRawPayload {
    readonly id?: string;
    readonly first_name?: string;
    readonly middle_name?: string;
    readonly last_name?: string;
    readonly name?: string;
    readonly avatar?: string;
    readonly email?: string;
    readonly date_of_birth?: string | null;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly raw_payloads?: object[];
    readonly gender?: string;
    readonly comment?: string;
    readonly origins?: object[];
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly addresses?: AddressRawPayload[];
    readonly phonenumbers?: PhonenumberRawPayload[];
}
export interface AddressRawPayload {
    readonly id?: string;
    readonly lines?: string[];
    readonly locality?: string;
    readonly country?: string;
    readonly region?: string;
    readonly postal_code?: string;
    readonly type?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly comment?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
}
export interface PhonenumberRawPayload {
    readonly id?: string;
    readonly type?: string;
    readonly value?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly created_at?: string;
    readonly updated_at?: string;
}
export interface PersonPayload {
    readonly id?: string;
    readonly firstName?: string;
    readonly middleName?: string;
    readonly lastName?: string;
    readonly name?: string;
    readonly avatar?: string;
    readonly email?: string;
    readonly dateOfBirth?: Date | null;
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly rawPayloads?: object[];
    readonly gender?: string | null;
    readonly comment?: string | null;
    readonly origins?: object[];
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly addresses?: Address[];
    readonly phonenumbers?: Phonenumber[];
}
export interface AddressPayload {
    readonly id?: string;
    readonly lines?: string[];
    readonly locality?: string;
    readonly country?: string;
    readonly region?: string;
    readonly postalCode?: string;
    readonly type?: string;
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly comment?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
}
export interface PhonenumberPayload {
    readonly id?: string;
    readonly type?: string;
    readonly value?: string;
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: boolean;
    readonly active?: boolean;
}
export interface Person extends PersonPayload {
}
export declare class Person extends EventEmitter {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: PersonOptions;
    initialized: boolean;
    readonly id?: string;
    readonly firstName?: string;
    readonly middleName?: string;
    readonly lastName?: string;
    readonly name?: string;
    readonly avatar?: string;
    readonly email?: string;
    readonly dateOfBirth?: Date | null;
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly rawPayloads?: object[];
    readonly gender?: string | null;
    readonly comment?: string | null;
    readonly origins?: object[];
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly addresses?: Address[];
    readonly phonenumbers?: Phonenumber[];
    constructor(options: PersonOptions);
    static deserialize(payload: PersonRawPayload, universe: Universe, http: Universe['http']): Person;
    static createUninitialized(payload: PersonRawPayload, universe: Universe, http: Universe['http']): Person;
    serialize(): PersonRawPayload;
    private handleError;
}
export declare class Address extends EventEmitter {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: AddressOptions;
    initialized: boolean;
    readonly id?: string;
    readonly lines?: string[];
    readonly locality?: string;
    readonly country?: string;
    readonly region?: string;
    readonly postalCode?: string;
    readonly type?: string;
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly comment?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    constructor(options: AddressOptions);
    static deserialize(payload: AddressRawPayload, universe: Universe, http: Universe['http']): Address;
    static createUninitialized(payload: AddressRawPayload, universe: Universe, http: Universe['http']): Address;
    serialize(): AddressRawPayload;
    private handleError;
}
export declare class Phonenumber extends EventEmitter {
    protected universe: Universe;
    protected http: Universe['http'];
    protected options: PhonenumberOptions;
    initialized: boolean;
    readonly id?: string;
    readonly value?: string;
    readonly type?: string;
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly comment?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    constructor(options: PhonenumberOptions);
    static deserialize(payload: PhonenumberRawPayload, universe: Universe, http: Universe['http']): Phonenumber;
    static createUninitialized(payload: PhonenumberRawPayload, universe: Universe, http: Universe['http']): Phonenumber;
    serialize(): PhonenumberRawPayload;
    private handleError;
}
