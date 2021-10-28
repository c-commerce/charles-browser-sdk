export declare class BaseError extends Error {
    properties?: any;
    message: string;
    constructor(message: string, properties?: any);
    static handleCommonProperties<T>(maybeError: T, additionalProperties?: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
}
