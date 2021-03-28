import { Readable } from 'readable-stream'
import { Client } from './client'

export interface APICarrierOptions {
  injectables: APICarrierInjectables
}

export interface APICarrierInjectables {
  base: string
}

export abstract class APICarrier extends Readable {
  protected abstract http: Client
  public injectables: APICarrierInjectables

  constructor (options: APICarrierOptions) {
    super()
    this.injectables = options.injectables
  }
}
