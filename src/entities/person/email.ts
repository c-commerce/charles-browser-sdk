import Entity, { EntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface EmailRawPayload extends EntityRawPayload {
  readonly person?: string
  readonly type?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly value?: string
  readonly comment?: string
}

export interface EmailOptions extends EntityOptions {
  rawPayload?: EmailRawPayload
}

export interface EmailPayload {
  readonly id?: EmailRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly comment?: EmailRawPayload['comment']
  readonly value?: EmailRawPayload['value']
}

export class Email extends Entity<EmailPayload, EmailRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: EmailOptions
  public initialized: boolean
  public endpoint: string

  public id?: string
  public person?: EmailRawPayload['person']
  public value?: EmailRawPayload['value']
  public type?: string
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public deleted?: EmailRawPayload['deleted']
  public active?: EmailRawPayload['active']
  public comment?: EmailRawPayload['comment']

  constructor (options: EmailOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/emails'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: EmailRawPayload): Email {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active
    this.person = rawPayload.person
    this.comment = rawPayload.comment
    this.value = rawPayload.value

    return this
  }

  public static create (
    payload: EmailRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Email {
    return new Email({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized (
    payload: EmailRawPayload,
    universe: Universe,
    http: Universe['http']
  ): Email {
    return new Email({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize (): EmailRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active,
      person: this.person,
      comment: this.comment,
      value: this.value
    }
  }
}

export class EmailsFetchRemoteError extends BaseError {
  public name = 'EmailsFetchRemoteError'
  constructor (public message: string = 'Could not get emails.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailsFetchRemoteError.prototype)
  }
}

export class EmailCreateRemoteError extends BaseError {
  public name = 'EmailCreateRemoteError'
  constructor (public message: string = 'Could not create email', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailCreateRemoteError.prototype)
  }
}
