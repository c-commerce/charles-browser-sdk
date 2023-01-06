import { UniverseEntity, UniverseEntityOptions } from '../../../entities/_base'

export interface FacadeEntityOptions extends UniverseEntityOptions {
  rawPayload: FacadeEntityRawPayload
}

export interface FacadeEntityRawPayload {
  id?: string
  name?: string | null
}

export interface FacadeEntityPayload {
  id?: string
  name?: string | null
}

export default class FacadeEntity extends UniverseEntity<FacadeEntityPayload, FacadeEntityRawPayload> {
  public get entityName (): string {
    return 'facadeentity'
  }

  public id?: FacadeEntityPayload['id']
  public name?: FacadeEntityPayload['name']

  protected universe: UniverseEntityOptions['universe']
  protected apiCarrier: UniverseEntityOptions['universe']
  protected http: UniverseEntityOptions['http']
  protected options: FacadeEntityOptions
  public initialized: boolean

  public endpoint: string

  constructor (options: FacadeEntityOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/facadeentity_endpoint'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected deserialize (p: FacadeEntityRawPayload) {
    this.setRawPayload(p)

    this.id = p.id
    this.name = p.name

    return this
  }

  public serialize (): FacadeEntityRawPayload {
    return {
      id: this.id,
      name: this.name
    }
  }
}
