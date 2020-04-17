import { BaseError } from './base-error'

export {
  BaseError
}

export class AuthenticationFailed extends BaseError {
  public name = 'AuthenticationFailed'
  constructor (public message: string = 'Authentication was not successful', properties?: any) {
    super(message, properties)
  }
}

export class PasswordResetRequestFailed extends BaseError {
  public name = 'PasswordResetRequestFailed'
  constructor (public message: string = 'Could not reset password', properties?: any) {
    super(message, properties)
  }
}

export class PasswordSetRequestFailed extends BaseError {
  public name = 'PasswordSetRequestFailed'
  constructor (public message: string = 'Could not set password', properties?: any) {
    super(message, properties)
  }
}

export class UninstantiatedClient extends BaseError {
  public name = 'UninstantiatedClient'
  constructor (
    public message: string = 'Cannot instantiate API without instantiated HTTP client',
    properties?: any
  ) {
    super(message, properties)
  }
}
