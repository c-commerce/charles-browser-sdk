import { EventEmitter } from 'events'
import { Cloud } from './'

export interface CloudHealthOptions {
  universe: Cloud
}

export interface CloudStatusOptions {
  universe: Cloud
}

export class CloudHealth extends EventEmitter {
  universe: Cloud
  options: CloudHealthOptions

  constructor (opts: CloudHealthOptions) {
    super()

    this.options = opts

    this.universe = this.options.universe
  }
}

export class CloudStatus extends EventEmitter {
  universe: Cloud
  options: CloudStatusOptions

  constructor (opts: CloudStatusOptions) {
    super()

    this.options = opts

    this.universe = this.options.universe
  }
}
