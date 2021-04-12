export declare const CHECKBOX: {
    serialize(input?: Boolean | null | undefined): Boolean | null;
};
interface ICurrencyInput {
    amount?: number;
    currency?: string;
}
export declare const CURRENCYINPUT: {
    serialize(input?: ICurrencyInput | undefined): ICurrencyInput | null;
};
export declare const DATE: {
    serialize(input?: number | Date | null | undefined): string | null;
};
interface IDaterangeInput {
    start?: Date | null | any;
    end?: Date | null | any;
}
export declare const DATERANGE: {
    serialize(input?: IDaterangeInput | null | undefined): Object | null;
};
export declare const DATETIME: {
    serialize(input?: number | Date | null | undefined): string | null;
};
interface IDatetimerangeInput {
    start?: Date | null | any;
    end?: Date | null | any;
}
export declare const DATETIMERANGE: {
    serialize(input?: IDatetimerangeInput | null | undefined): Object | null;
};
export declare const LARGETEXTINPUT: {
    serialize(input?: string | null | undefined): string | null;
};
export declare const MULTISELECT: {
    serialize(inputs?: string[] | number[] | null | undefined): Array<string | number> | null;
};
export declare const NUMBERINPUT: {
    serialize(input?: number | null | undefined): number | null | undefined;
};
interface InumberwithunitinputInput {
    value?: number | null;
    unit?: string | null;
}
export declare const NUMBERWITHUNITINPUT: {
    serialize(input?: InumberwithunitinputInput | null | undefined): InumberwithunitinputInput | null;
};
export declare const PHONENUMBER: {
    serialize(input?: string | null | undefined): string | null;
};
export declare const RADIO: {
    serialize(input?: string | number | null | undefined): string | number | null;
};
export declare const SELECT: {
    serialize(input?: string | number | null | undefined): string | number | null;
};
export declare const TEXTINPUT: {
    serialize(input?: string | null | undefined): string | null;
};
export declare const TIME: {
    serialize(input?: number | Date | null | undefined): string | null;
};
interface ITimerangeInput {
    start?: Date | any;
    end?: Date | any;
}
export declare const TIMERANGE: {
    serialize(input?: ITimerangeInput | null | undefined): Object | null;
};
export {};
