---
to: "<%= 'src/entities/' + h.inflection.camelize(h.inflection.singularize(h.inflection.humanize(name, true)), true) + '/' + h.inflection.camelize(h.inflection.singularize(h.inflection.humanize(name, true)), true) + '.ts' %>"
---
<%
  pluralizedName = h.inflection.pluralize(h.inflection.humanize(name, true))
  singularizedName = h.inflection.singularize(h.inflection.humanize(name, true))
  capitalizedName = h.inflection.capitalize(singularizedName)
  capitalizedPluralName = h.inflection.capitalize(pluralizedName)
%>
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface <%= capitalizedName %>Options extends EntityOptions {
  rawPayload?: <%= capitalizedName %>RawPayload
}

export interface <%= capitalizedName %>RawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
}

export interface <%= capitalizedName %>Payload {
  readonly id?: <%= capitalizedName %>RawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: <%= capitalizedName %>RawPayload['deleted']
  readonly active?: <%= capitalizedName %>RawPayload['active']
}

/**
 * Manage <%= pluralizedName %>.
 *
 * @category Entity
 */
export class <%= capitalizedName %> extends Entity<<%= capitalizedName %>Payload, <%= capitalizedName %>RawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: <%= capitalizedName %>Options
  public initialized: boolean

  public endpoint: string

  public id?: <%= capitalizedName %>Payload['id']
  public createdAt?: <%= capitalizedName %>Payload['createdAt']
  public updatedAt?: <%= capitalizedName %>Payload['updatedAt']
  public deleted?: <%= capitalizedName %>Payload['deleted']
  public active?: <%= capitalizedName %>Payload['active']

  constructor(options: <%= capitalizedName %>Options) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/<%= version %>/<%= pluralizedName %>'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize(rawPayload: <%= capitalizedName %>RawPayload): <%= capitalizedName %> {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted || false
    this.active = rawPayload.active || true

    return this
  }

  public static create(payload: <%= capitalizedName %>RawPayload, universe: Universe, http: Universe['http']): <%= capitalizedName %> {
    return new <%= capitalizedName %>({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): <%= capitalizedName %>RawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted || false,
      active: this.active || true
    }
  }

  public async init(): Promise<<%= capitalizedName %> | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new <%= capitalizedName %>InitializationError(undefined, { error: err }))
    }
  }
}

export class <%= capitalizedPluralName %> {
  public static endpoint: string = 'api/<%= version %>/<%= pluralizedName %>'
}

export class <%= capitalizedName %>InitializationError extends BaseError {
  public name = '<%= capitalizedName %>InitializationError'
  constructor(public message: string = 'Could not initialize <%= singularizedName %>.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, <%= capitalizedName %>InitializationError.prototype)
  }
}

export class <%= capitalizedName %>FetchRemoteError extends BaseError {
  public name = '<%= capitalizedName %>FetchRemoteError'
  constructor(public message: string = 'Could not get <%= singularizedName %>.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, <%= capitalizedName %>FetchRemoteError.prototype)
  }
}

export class <%= capitalizedPluralName %>FetchRemoteError extends BaseError {
  public name = '<%= capitalizedPluralName %>FetchRemoteError'
  constructor(public message: string = 'Could not get <%= pluralizedName %>.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, <%= capitalizedPluralName %>FetchRemoteError.prototype)
  }
}
