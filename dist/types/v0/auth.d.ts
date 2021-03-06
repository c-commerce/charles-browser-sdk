import * as errors from '../errors';
export declare enum AuthTypes {
    username = 1,
    key = 2,
    accessToken = 3,
    org = 4,
    support = 5,
    cookie = 6
}
export interface AuthOptions {
    type?: AuthTypes | undefined;
    credentials?: UsernameAuth | KeyAuth | TokenAuth;
    withCredentials?: boolean;
    base?: string | undefined;
    authBaseUrl?: string | undefined;
    user?: string;
    accessToken?: string;
}
export interface AuthBase {
    baseUrl?: string;
}
export interface UsernameAuth extends AuthBase {
    username: string;
    password: string;
    recaptcha_token?: string;
    baseUrl?: string;
    authBaseUrl?: string;
    withCredentials?: boolean;
}
export interface KeyAuth extends AuthBase {
    id: string;
    apiKey: string;
    baseUrl?: string;
}
export interface OrgAuth extends AuthBase {
    organization: string;
    username: string;
    password: string;
    recaptcha_token?: string;
    baseUrl?: string;
}
export interface SupportAuth extends AuthBase {
    access_token: string;
    client_account: string;
    recaptcha_token?: string;
}
export interface PasswordResetRequest {
    email: string;
}
export interface PasswordResetNonce {
    password: string;
    password_reset_id: string;
}
export interface PasswordResetRequestResponse {
    msg: string;
}
export interface LogoutResponse {
    msg: string;
}
export interface TokenAuth {
    accessToken: string;
}
export interface LogoutOptions {
    authBaseUrl?: string;
    withCredentials?: boolean;
}
export declare function isUsernameAuth(object: any): object is UsernameAuth;
export declare function isKeyAuth(object: any): object is KeyAuth;
export declare function isTokenAuth(object: any): object is KeyAuth;
export declare function isOrgAuth(object: any): object is KeyAuth;
export interface AuthResponse {
    id: string;
    access_token: string;
    user: string;
    name?: string;
    username?: string;
    email?: string;
    permissions: string[];
    roles: string[];
    is_support?: boolean;
}
export declare class Auth {
    authenticated: boolean;
    options: AuthOptions;
    accessToken?: string;
    user?: string;
    authBaseUrl?: string;
    constructor(options: AuthOptions);
    clearInstance(): void;
    protected determineAuthType(): void;
    authenticate(): Promise<AuthResponse>;
    loginUsername(authData?: UsernameAuth): Promise<AuthResponse>;
    requestPasswordReset(target: PasswordResetRequest): Promise<PasswordResetRequestResponse>;
    setNewPassword(nonce: PasswordResetNonce): Promise<PasswordResetRequestResponse>;
    protected setDefaultHeader(user?: string, token?: string, withCredentials?: boolean): void;
    logout(options?: LogoutOptions, token?: string): Promise<LogoutResponse>;
    setAuthed(accessToken?: string, withCredentials?: boolean): Auth;
}
export declare class LogoutMissingToken extends errors.BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class LogoutFailed extends errors.BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
