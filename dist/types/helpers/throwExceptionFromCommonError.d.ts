import { AxiosError } from 'axios';
import { UniverseBadGatewayError, UniverseForbiddenError, UniverseServiceUnavailableError, UniverseTimeoutError, UniverseUnauthenticatedError } from '../universe';
declare type commonException = UniverseBadGatewayError | UniverseForbiddenError | UniverseUnauthenticatedError | UniverseServiceUnavailableError | UniverseTimeoutError;
export declare function throwExceptionFromCommonError(error: AxiosError): void | never;
export declare function returnExceptionFromError(error: AxiosError): commonException | undefined;
export {};
