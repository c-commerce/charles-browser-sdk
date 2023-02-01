import Entity, { UniverseEntity, UniverseEntityOptions, EntityRawPayload, RawPatch } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import omit from 'just-omit'

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

export interface EmailOptions extends UniverseEntityOptions {
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

export class Email extends UniverseEntity<EmailPayload, EmailRawPayload> {
  public get entityName (): string {
    return 'emails'
  }

  protected universe: Universe
  protected apiCarrier: Universe
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
    this.apiCarrier = options.universe
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false
    this.endpoint = ''

    if (options?.rawPayload && options.rawPayload.person) {
      this.endpoint = `api/v0/people/${options.rawPayload.person}/emails`
    }

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: EmailRawPayload): this {
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

  public async patch (changePart: EmailRawPayload): Promise<this> {
    if (!this.person) {
      throw new EmailPatchRemoteError('Email patch requires person to be set.')
    }
    return await this._patch(omit(changePart, ['person']))
  }

  public async applyPatch (patch: RawPatch): Promise<this> {
    if (!this.person) {
      throw new EmailApplyPatchRemoteError('Email apply patch requires person to be set.')
    }
    return await this._applyPatch(patch)
  }

  public async save (payload: EmailRawPayload): Promise<this> {
    if (!this.person) {
      throw new EmailSaveRemoteError('Email save requires person to be set.')
    }
    return await this._save(omit(payload, ['person']))
  }

  public async delete (): Promise<this> {
    if (!this.person) {
      throw new EmailPatchRemoteError('Email delete requires person to be set.')
    }
    return await this._delete()
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
export class EmailFetchRemoteError extends BaseError {
  public name = 'EmailFetchRemoteError'
  constructor (public message: string = 'Could not fetch emails', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailFetchRemoteError.prototype)
  }
}
export class EmailPatchRemoteError extends BaseError {
  public name = 'EmailPatchRemoteError'
  constructor (public message: string = 'Could not patch email', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailPatchRemoteError.prototype)
  }
}
export class EmailApplyPatchRemoteError extends BaseError {
  public name = 'EmailApplyPatchRemoteError'
  constructor (public message: string = 'Could not apply patch to email', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailApplyPatchRemoteError.prototype)
  }
}
export class EmailSaveRemoteError extends BaseError {
  public name = 'EmailSaveRemoteError'
  constructor (public message: string = 'Could not save email', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailSaveRemoteError.prototype)
  }
}
