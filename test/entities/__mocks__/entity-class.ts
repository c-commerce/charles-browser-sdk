import { UniverseEntity, UniverseEntityOptions } from '../../../src/entities/_base'

export interface ClsOptions extends UniverseEntityOptions {
  rawPayload: ClsRawPayload
}

export interface ClsRawPayload {
  id?: string
  name?: string | null
}

export interface ClsPayload {
  id?: string
  name?: string | null
}

export default class Cls extends UniverseEntity<ClsPayload, ClsRawPayload> {
  public get entityName (): string {
    return 'cls'
  }

  public id?: ClsPayload['id']
  public name?: ClsPayload['name']

  protected universe: UniverseEntityOptions['universe']
  protected apiCarrier: UniverseEntityOptions['universe']
  protected http: UniverseEntityOptions['http']
  protected options: ClsOptions
  public initialized: boolean

  public endpoint: string

  constructor (options: ClsOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/cls_endpoint'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected deserialize (p: ClsRawPayload) {
    this.setRawPayload(p)

    this.id = p.id
    this.name = p.name

    return this
  }

  public serialize (): ClsRawPayload {
    return {
      id: this.id,
      name: this.name
    }
  }
}
