import { EventEmitter } from 'events'
import { Universe } from './'

export interface UniverseHealthOptions {
  universe: Universe
}

export interface UniverseStatusOptions {
  universe: Universe
}

export class UniverseHealth extends EventEmitter {
  universe: Universe
  options: UniverseHealthOptions

  constructor(opts: UniverseHealthOptions) {
    super()

    this.options = opts

    this.universe = this.options.universe
  }
}

export class UniverseStatus extends EventEmitter {
  universe: Universe
  options: UniverseStatusOptions

  constructor(opts: UniverseStatusOptions) {
    super()

    this.options = opts

    this.universe = this.options.universe
  }
}
