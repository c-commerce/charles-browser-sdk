import { Universe } from 'src/universe'
import { EntityRawPayload, UniverseEntityOptions } from '../_base'
import { PersonRawPayload, PersonPhonenumberRawPayload } from './person'
import { ChannelUserRawPayload } from './channel-user'
import { BaseError } from '../../errors'

export interface PossibleDuplicatesRawPayload extends EntityRawPayload{
  readonly person_id: string
  readonly strategies: PossibleDuplicatesStrategies
}

interface PossibleDuplicatesStrategies {
  global_phonenumber?: StrategiesResult[]
  name_exact_matches?: StrategiesResult[]
}

interface StrategiesResult {
  document: StrategiesDocument
  kind: string
}

interface StrategiesDocument {
  person: Pick<PersonRawPayload, 'id'| 'kind' | 'name'>
  channel_user?: Pick<ChannelUserRawPayload, 'id' | 'name' | 'phone'>
  phone_number?: Pick<PersonPhonenumberRawPayload, 'id' | 'value'>
}

interface PossibleDuplicationOptions extends UniverseEntityOptions {
  rawPayload: PossibleDuplicatesRawPayload
}

export class PossibleDuplication {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: PossibleDuplicationOptions
  public initialized: boolean
  public endpoint: string

  public id?: string
  public personId: PossibleDuplicatesRawPayload['person_id']
  public strategies: PossibleDuplicatesRawPayload['strategies']

  constructor (options: PossibleDuplicationOptions) {
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.endpoint = ''
    this.personId = options.rawPayload?.person_id
    this.strategies = options.rawPayload?.strategies

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PossibleDuplicatesRawPayload): PossibleDuplication {
    this.id = rawPayload.id
    this.personId = rawPayload.person_id
    this.strategies = rawPayload.strategies

    return this
  }

  public serialize (): PossibleDuplicatesRawPayload {
    return {
      id: this.id,
      person_id: this.personId,
      strategies: this.strategies
    }
  }
}

export class PossibleDuplicatesFetchRemoteError extends BaseError {
  public name = 'PossibleDuplicatesFetchRemoteError'
  constructor (public message: string = 'Could not fetch list with possible duplicated contacts', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PossibleDuplicatesFetchRemoteError.prototype)
  }
}
