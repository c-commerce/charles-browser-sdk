import safeGet from 'just-safe-get'
import type { AxiosError } from 'axios'

export class BaseError extends Error {
  public properties?: any
  public message: string

  constructor (message: string, properties?: any) {
    super()
    this.message = message

    this.properties = properties

    Object.setPrototypeOf(this, BaseError.prototype)
  }

  static handleCommonProperties<T>(maybeError: T, additionalProperties?: { [key: string]: any }): { [key: string]: any } {
    const props = Object.assign(
      { error: maybeError },
      additionalProperties ?? {},
      { localizedErrors: safeGet(maybeError, 'response.data.errors') }
    )

    return props
  }
}

interface LocalizeError {
  code: number
  class: string
  message_key: string
  message: string
  description_key: string
  description: string
}

export interface APIErrorPayload {
  errors: LocalizeError[]
}

export interface BaseErrorV2Properties {
  message?: string
  [key: string]: any
}

export class BaseErrorV2 extends Error {
  public properties?: any
  public message: string = 'An unexpected error occurred'
  private readonly localizedErrors: LocalizeError[] | null = null
  public humanReadableAPIErrorMessage?: string | null

  constructor (err: Error | AxiosError<APIErrorPayload>, props?: BaseErrorV2Properties) {
    super()

    if (props?.message) {
      this.message = props.message
    }

    // this is part specific to Axios errors
    const maybeLocalizedAPIErrors = (err as AxiosError)?.response?.data.errors
    if (maybeLocalizedAPIErrors) {
      this.localizedErrors = maybeLocalizedAPIErrors
    }

    if (this.localizedErrors?.[0]?.message) {
      this.humanReadableAPIErrorMessage = this.localizedErrors[0].message
    }

    this.properties = {
      ...(props ?? {}),
      error: err
    }

    Object.setPrototypeOf(this, BaseErrorV2.prototype)
  }

  hasHumanReadableAPIErrorMessage (): boolean {
    return !!(this.hasHumanReadableAPIErrorMessage)
  }
}
