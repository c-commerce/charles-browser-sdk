import { UniverseEntity, UniverseEntityOptions } from '../../../entities/_base'

export interface DeletableFacadeEntityOptions extends UniverseEntityOptions {
  rawPayload: DeletableFacadeEntityRawPayload
}

export interface DeletableFacadeEntityRawPayload {
  id?: string
  name?: string | null
  deleted: boolean
}

export interface DeletableFacadeEntityPayload {
  id?: string
  name?: string | null
  deleted: boolean
}

export default class DeletableFacadeEntity extends UniverseEntity<DeletableFacadeEntityPayload, DeletableFacadeEntityRawPayload> {
  public get entityName (): string {
    return 'facadeentity'
  }

  public id!: DeletableFacadeEntityPayload['id']
  public name!: DeletableFacadeEntityPayload['name']
  public deleted!: DeletableFacadeEntityPayload['deleted']

  protected universe: UniverseEntityOptions['universe']
  protected apiCarrier: UniverseEntityOptions['universe']
  protected http: UniverseEntityOptions['http']
  protected options: DeletableFacadeEntityOptions
  public initialized: boolean

  public endpoint: string

  constructor (options: DeletableFacadeEntityOptions) {
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
  protected deserialize (p: DeletableFacadeEntityRawPayload) {
    this.setRawPayload(p)

    this.id = p.id
    this.name = p.name
    this.deleted = p.deleted

    return this
  }

  public serialize (): DeletableFacadeEntityRawPayload {
    return {
      id: this.id,
      name: this.name,
      deleted: this.deleted
    }
  }
}
