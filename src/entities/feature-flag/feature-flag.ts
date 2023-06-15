import { BaseError } from '../../errors'

export interface FeatureFlagRawPayload {
  readonly name: string
  readonly enabled: boolean
}

export class FeatureFlagFetchError extends BaseError {
  public name = 'FeatureFlagFetchError'
  constructor (public message: string = 'Unexptected response making feature flag request.', properties?: any) {
    super(message, properties)

    Object.setPrototypeOf(this, FeatureFlagFetchError.prototype)
  }
}
