
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface IntentOptions extends UniverseEntityOptions {
  rawPayload?: IntentRawPayload
}

export interface IntentRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly auto_reply_enabled?: boolean
  readonly name?: string | null
  readonly description?: string | null
  readonly bot_staff?: string | null
  readonly proxy_vendor?: string | null
  readonly external_reference_id?: string | null
  readonly external_name?: string | null
  readonly nlu?: string | null
  readonly message_template?: string | null
  readonly logic?: { [key: string]: any } | null
  readonly effect?: { [key: string]: any } | null
  readonly payload?: { [key: string]: any } | null
}

export interface IntentPayload {
  readonly id?: IntentRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: IntentRawPayload['deleted']
  readonly active?: IntentRawPayload['active']
  readonly autoReplyEnabled?: IntentRawPayload['auto_reply_enabled']
  readonly name?: IntentRawPayload['name']
  readonly description?: IntentRawPayload['description']
  readonly botStaff?: IntentRawPayload['bot_staff']
  readonly proxyVendor?: IntentRawPayload['proxy_vendor']
  readonly externalReferenceId?: IntentRawPayload['external_reference_id']
  readonly externalName?: IntentRawPayload['external_name']
  readonly nlu?: IntentRawPayload['nlu']
  readonly messageTemplate?: IntentRawPayload['message_template']
  readonly logic?: IntentRawPayload['logic']
  readonly effect?: IntentRawPayload['effect']
  readonly payload?: IntentRawPayload['payload']
}

/**
 * Manage intents.
 *
 * @category Entity
 */
export class Intent extends UniverseEntity<IntentPayload, IntentRawPayload> {
  public get entityName (): string {
    return 'intents'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: IntentOptions
  public initialized: boolean

  public endpoint: string

  public id?: IntentPayload['id']
  public createdAt?: IntentPayload['createdAt']
  public updatedAt?: IntentPayload['updatedAt']
  public deleted?: IntentPayload['deleted']
  public active?: IntentPayload['active']
  public autoReplyEnabled?: IntentPayload['autoReplyEnabled']
  public name?: IntentPayload['name']
  public description?: IntentPayload['description']
  public botStaff?: IntentPayload['botStaff']
  public proxyVendor?: IntentPayload['proxyVendor']
  public externalReferenceId?: IntentPayload['externalReferenceId']
  public externalName?: IntentPayload['externalName']
  public nlu?: IntentPayload['nlu']
  public messageTemplate?: IntentPayload['messageTemplate']
  public logic?: IntentPayload['logic']
  public effect?: IntentPayload['effect']
  public payload?: IntentPayload['payload']

  constructor (options: IntentOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/intents'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: IntentRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.autoReplyEnabled = rawPayload.auto_reply_enabled ?? false
    this.name = rawPayload.name
    this.description = rawPayload.description
    this.botStaff = rawPayload.bot_staff
    this.proxyVendor = rawPayload.proxy_vendor
    this.externalReferenceId = rawPayload.external_reference_id
    this.externalName = rawPayload.external_name
    this.nlu = rawPayload.nlu
    this.messageTemplate = rawPayload.message_template
    this.logic = rawPayload.logic
    this.effect = rawPayload.effect
    this.payload = rawPayload.payload

    return this
  }

  public static create (payload: IntentRawPayload, universe: Universe, http: Universe['http']): Intent {
    return new Intent({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): IntentRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      auto_reply_enabled: this.autoReplyEnabled,
      name: this.name,
      description: this.description,
      bot_staff: this.botStaff,
      proxy_vendor: this.proxyVendor,
      external_reference_id: this.externalReferenceId,
      external_name: this.externalName,
      nlu: this.nlu,
      message_template: this.messageTemplate,
      logic: this.logic,
      effect: this.effect,
      payload: this.payload
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new IntentInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Intents {
  public static endpoint: string = 'api/v0/intents'
}

export class IntentInitializationError extends BaseError {
  public name = 'IntentInitializationError'
  constructor (public message: string = 'Could not initialize intent.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, IntentInitializationError.prototype)
  }
}

export class IntentFetchRemoteError extends BaseError {
  public name = 'IntentFetchRemoteError'
  constructor (public message: string = 'Could not get intent.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, IntentFetchRemoteError.prototype)
  }
}

export class IntentsFetchRemoteError extends BaseError {
  public name = 'IntentsFetchRemoteError'
  constructor (public message: string = 'Could not get intents.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, IntentsFetchRemoteError.prototype)
  }
}
