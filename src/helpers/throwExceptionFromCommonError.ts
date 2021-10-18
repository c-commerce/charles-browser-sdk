import { AxiosError } from 'axios'
import {
  UniverseBadGatewayError,
  UniverseForbiddenError, UniverseServiceUnavailableError, UniverseTimeoutError,
  UniverseUnauthenticatedError
} from '../universe'

type commonException = UniverseBadGatewayError | UniverseForbiddenError | UniverseUnauthenticatedError | UniverseServiceUnavailableError | UniverseTimeoutError

export function throwExceptionFromCommonError (error: AxiosError): void | never {
  const exception = returnExceptionFromError(error)
  if (exception) {
    throw exception
  }
}

export function returnExceptionFromError (error: AxiosError): commonException | undefined {
  const status = error?.response?.status
  if (status === 401) {
    return new UniverseUnauthenticatedError(undefined, { error })
  }
  if (status === 403) {
    return new UniverseForbiddenError(undefined, { error })
  }
  if (status === 502) {
    return new UniverseBadGatewayError(undefined, { error })
  }
  if (status === 503) {
    return new UniverseServiceUnavailableError(undefined, { error })
  }
  if (status === 504) {
    return new UniverseTimeoutError(undefined, { error })
  }
}
