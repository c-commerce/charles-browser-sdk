export declare class BaseError extends Error {
    properties?: any;
    message: string;
    constructor(message: string, properties?: any);
}
