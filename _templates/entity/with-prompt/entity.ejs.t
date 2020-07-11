---
to: "<%= 'src/entities/' + h.inflection.dasherize(singularizedName, true) + '/' +h.inflection.dasherize(singularizedName, true) + '.ts' %>"
---
<%
  pluralizedName = h.inflection.pluralize(name)
  singularizedName = h.inflection.singularize(name)
  singularizedHumanName = h.inflection.humanize(singularizedName, true)
  humanPlural = h.inflection.humanize(pluralizedName)
  titleHumanPlural = h.changeCase.title(humanPlural, true)
  capitalizedName = h.inflection.capitalize(singularizedName)
  capitalizedPluralName = h.inflection.capitalize(name)
  camelizedName = h.inflection.camelize(name, true)
  camelizedSingularName = h.inflection.camelize(singularizedName, true)
  className  = h.changeCase.pascal(singularizedName, true)
  classListName  = h.changeCase.pascal(pluralizedName, true)
  title  = h.changeCase.title(singularizedName, true)
%>
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface <%= className %>Options extends EntityOptions {
  rawPayload?: <%= className %>RawPayload
}

export interface <%= className %>RawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
}

export interface <%= className %>Payload {
  readonly id?: <%= className %>RawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: <%= className %>RawPayload['deleted']
  readonly active?: <%= className %>RawPayload['active']
}

/**
 * Manage <%= pluralizedName %>.
 *
 * @category Entity
 */
export class <%= className %> extends Entity<<%= className %>Payload, <%= className %>RawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: <%= className %>Options
  public initialized: boolean

  public endpoint: string

  public id?: <%= className %>Payload['id']
  public createdAt?: <%= className %>Payload['createdAt']
  public updatedAt?: <%= className %>Payload['updatedAt']
  public deleted?: <%= className %>Payload['deleted']
  public active?: <%= className %>Payload['active']

  constructor(options: <%= className %>Options) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/<%= version %>/<%= name %>'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize(rawPayload: <%= className %>RawPayload): <%= className %> {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted || false
    this.active = rawPayload.active || true

    return this
  }

  public static create(payload: <%= className %>RawPayload, universe: Universe, http: Universe['http']): <%= className %> {
    return new <%= className %>({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): <%= className %>RawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted || false,
      active: this.active || true
    }
  }

  public async init(): Promise<<%= className %> | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new <%= className %>InitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class <%= classListName %> {
  public static endpoint: string = 'api/<%= version %>/<%= name %>'
}

export class <%= className %>InitializationError extends BaseError {
  public name = '<%= className %>InitializationError'
  constructor(public message: string = 'Could not initialize <%= singularizedName %>.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, <%= className %>InitializationError.prototype)
  }
}

export class <%= className %>FetchRemoteError extends BaseError {
  public name = '<%= className %>FetchRemoteError'
  constructor(public message: string = 'Could not get <%= singularizedName %>.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, <%= className %>FetchRemoteError.prototype)
  }
}

export class <%= classListName %>FetchRemoteError extends BaseError {
  public name = '<%= classListName %>FetchRemoteError'
  constructor(public message: string = 'Could not get <%= pluralizedName %>.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, <%= classListName %>FetchRemoteError.prototype)
  }
}
