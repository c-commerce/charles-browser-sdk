import safeGet from 'just-safe-get'

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
