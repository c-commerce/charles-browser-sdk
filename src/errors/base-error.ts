
export class BaseError extends Error {
  public properties?: any
  public message: string

  constructor (message: string, properties?: any) {
    super()
    this.message = message

    this.properties = properties

    Object.setPrototypeOf(this, BaseError.prototype)
  }
}
