import { UniverseEntityOptions, UniverseEntity } from '../_base';
import { Universe } from '../../universe';
import { BaseError } from '../../errors';
export interface CustomPropertyOptions extends UniverseEntityOptions {
    rawPayload?: CustomPropertyRawPayload;
}
export declare enum CustomPropertyInputTypesEnum {
    select = "select",
    radio = "radio",
    textinput = "textinput",
    numberinput = "numberinput",
    numberwithunitinput = "numberwithunitinput",
    currencyinput = "currencyinput",
    textbox = "textbox",
    date = "date",
    datetime = "datetime",
    daterange = "daterange"
}
export declare type ICustomPropertyInputType = CustomPropertyInputTypesEnum.select | CustomPropertyInputTypesEnum.radio | CustomPropertyInputTypesEnum.textinput | CustomPropertyInputTypesEnum.textbox | CustomPropertyInputTypesEnum.numberinput | CustomPropertyInputTypesEnum.date | CustomPropertyInputTypesEnum.datetime;
export declare enum CustomPropertyTypesEnum {
    string = "string",
    number = "number",
    boolean = "boolean",
    object = "object"
}
export declare type ICustomPropertyType = CustomPropertyTypesEnum.string | CustomPropertyTypesEnum.number | CustomPropertyTypesEnum.boolean;
export interface CustomPropertyRawPayload {
    readonly id?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly deleted?: boolean;
    readonly active?: boolean;
    readonly name?: string;
    readonly object?: string;
    readonly type?: ICustomPropertyType;
    readonly input?: {
        type?: ICustomPropertyInputType;
        options?: Array<{
            label: string;
            value: string | number;
        } | string[] | number[]> | null;
        unit?: string;
        placeholder?: Array<{
            locale?: string;
            value?: string | any;
        }> | null;
        validation?: {
            type: 'warning' | 'error';
        } | null;
        label?: Array<{
            locale?: string;
            value?: string | any;
        }> | null;
        description?: Array<{
            locale?: string;
            value?: string | any;
        }> | null;
    };
    readonly description?: string;
    readonly show_in?: string[];
    readonly icon?: string;
    readonly order_index?: number | null;
    readonly proxy_vendor?: string | any;
    readonly is_proxy?: boolean | null;
    readonly external_reference_id?: string | null;
    readonly external_label?: object | null;
}
export interface CustomPropertyPayload {
    readonly id?: CustomPropertyRawPayload['id'];
    readonly createdAt?: Date | null;
    readonly updatedAt?: Date | null;
    readonly deleted?: CustomPropertyRawPayload['deleted'];
    readonly active?: CustomPropertyRawPayload['active'];
    readonly name?: CustomPropertyRawPayload['name'];
    readonly object?: CustomPropertyRawPayload['object'];
    readonly type?: CustomPropertyRawPayload['type'];
    readonly input?: CustomPropertyRawPayload['input'];
    readonly description?: CustomPropertyRawPayload['description'];
    readonly showIn?: CustomPropertyRawPayload['show_in'];
    readonly icon?: CustomPropertyRawPayload['icon'];
    readonly orderIndex?: CustomPropertyRawPayload['order_index'];
    readonly proxyVendor?: CustomPropertyRawPayload['proxy_vendor'];
    readonly isProxy?: CustomPropertyRawPayload['is_proxy'];
    readonly externalReferenceId?: CustomPropertyRawPayload['external_reference_id'];
    readonly externalLabel?: CustomPropertyRawPayload['external_label'];
}
export declare class CustomProperty extends UniverseEntity<CustomPropertyPayload, CustomPropertyRawPayload> {
    protected universe: Universe;
    protected apiCarrier: Universe;
    protected http: Universe['http'];
    protected options: CustomPropertyOptions;
    initialized: boolean;
    endpoint: string;
    id?: CustomPropertyPayload['id'];
    createdAt?: CustomPropertyPayload['createdAt'];
    updatedAt?: CustomPropertyPayload['updatedAt'];
    deleted?: CustomPropertyPayload['deleted'];
    active?: CustomPropertyPayload['active'];
    name?: CustomPropertyPayload['name'];
    object?: CustomPropertyPayload['object'];
    type?: CustomPropertyPayload['type'];
    input?: CustomPropertyPayload['input'];
    description?: CustomPropertyPayload['description'];
    showIn?: CustomPropertyPayload['showIn'];
    icon?: CustomPropertyPayload['icon'];
    orderIndex?: CustomPropertyPayload['orderIndex'];
    proxyVendor?: CustomPropertyPayload['proxyVendor'];
    isProxy?: CustomPropertyPayload['isProxy'];
    externalReferenceId?: CustomPropertyPayload['externalReferenceId'];
    externalLabel?: CustomPropertyPayload['externalLabel'];
    constructor(options: CustomPropertyOptions);
    protected deserialize(rawPayload: CustomPropertyRawPayload): CustomProperty;
    static create(payload: CustomPropertyRawPayload, universe: Universe, http: Universe['http']): CustomProperty;
    serialize(): CustomPropertyRawPayload;
    init(): Promise<CustomProperty | undefined>;
}
export declare class CustomProperties {
    static endpoint: string;
}
export declare class CustomPropertyInitializationError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CustomPropertyFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CustomPropertiesFetchRemoteError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
