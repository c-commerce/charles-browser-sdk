---
to: "<%= 'src/entities/' + h.inflection.camelize(h.inflection.singularize(h.inflection.humanize(name, true)), true) + '/' + h.inflection.camelize(h.inflection.singularize(h.inflection.humanize(name, true)), true) + '.ts' %>"
---
<%
  pluralizedName = h.inflection.pluralize(h.inflection.humanize(name, true))
  singularizedName = h.inflection.singularize(h.inflection.humanize(name, true))
  capitalizedName = h.inflection.capitalize(singularizedName)
  capitalizedPluralName = h.inflection.capitalize(pluralizedName)
%>
import { EventEmitter } from 'events'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface <%= capitalizedName %>Options {
  universe: Universe
  http: Universe['http']
  rawPayload?: <%= capitalizedName %>RawPayload
  initialized?: boolean
}

export interface <%= capitalizedName %>RawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
}

export interface <%= capitalizedName %>Payload {
  readonly id?: <%= capitalizedName %>RawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
}

export class <%= capitalizedName %> extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: <%= capitalizedName %>Options
  public initialized: boolean

  public endpoint: string
  public id?: string
  public createdAt?: <%= capitalizedName %>Payload['createdAt']
  public updatedAt?: <%= capitalizedName %>Payload['updatedAt']

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

  private deserialize(rawPayload: <%= capitalizedName %>RawPayload): <%= capitalizedName %> {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined

    return this
  }

  public static create(payload: <%= capitalizedName %>RawPayload, universe: Universe, http: Universe['http']): <%= capitalizedName %> {
    return new <%= capitalizedName %>({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): <%= capitalizedName %>RawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined
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

  public async fetch(): Promise<<%= capitalizedName %> | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id}`)

      this.deserialize(res.data.data[0] as <%= capitalizedName %>RawPayload)

      return this
    } catch (err) {
      throw this.handleError(new <%= capitalizedName %>FetchRemoteError(undefined, { error: err }))
    }
  }

  private handleError(err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
  }
}

export class <%= capitalizedPluralName %> {
  public static endpoint: string = 'api/<%= version %>/<%= pluralizedName %>'
}

export class <%= capitalizedName %>InitializationError extends BaseError {
  public name = '<%= capitalizedName %>InitializationError'
  constructor(public message: string = 'Could not initialize <%= singularizedName %>.', properties?: any) {
    super(message, properties)
  }
}

export class <%= capitalizedName %>FetchRemoteError extends BaseError {
  public name = '<%= capitalizedName %>FetchRemoteError'
  constructor(public message: string = 'Could not get <%= singularizedName %>.', properties?: any) {
    super(message, properties)
  }
}

export class <%= capitalizedPluralName %>FetchRemoteError extends BaseError {
  public name = '<%= capitalizedPluralName %>FetchRemoteError'
  constructor(public message: string = 'Could not get <%= pluralizedName %>.', properties?: any) {
    super(message, properties)
  }
}
