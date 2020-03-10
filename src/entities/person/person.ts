
import { EventEmitter } from 'events'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface PersonOptions {
  universe: Universe
  http: Universe['http']
  rawPayload?: PersonRawPayload
  initialized?: boolean
}

export interface PersonRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
}

export interface PersonPayload {
  readonly id?: PersonRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
}

export class Person extends EventEmitter {
  protected universe: Universe
  protected http: Universe['http']
  protected options: PersonOptions
  public initialized: boolean

  public endpoint: string
  public id?: string
  public createdAt?: PersonPayload['createdAt']
  public updatedAt?: PersonPayload['updatedAt']

  constructor(options: PersonOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/people'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized || false

    if (options && options.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  private deserialize(rawPayload: PersonRawPayload): Person {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined

    return this
  }

  public static create(payload: PersonRawPayload, universe: Universe, http: Universe['http']): Person {
    return new Person({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize(): PersonRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined
    }
  }

  public async init(): Promise<Person | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new PersonInitializationError(undefined, { error: err }))
    }
  }

  public async fetch(): Promise<Person | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universe.universeBase}/${this.endpoint}/${this.id}`)

      this.deserialize(res.data.data[0] as PersonRawPayload)

      return this
    } catch (err) {
      throw this.handleError(new PersonFetchRemoteError(undefined, { error: err }))
    }
  }

  private handleError(err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
  }
}

export class People {
  public static endpoint: string = 'api/v0/people'
}

export class PersonInitializationError extends BaseError {
  public name = 'PersonInitializationError'
  constructor(public message: string = 'Could not initialize person.', properties?: any) {
    super(message, properties)
  }
}

export class PersonFetchRemoteError extends BaseError {
  public name = 'PersonFetchRemoteError'
  constructor(public message: string = 'Could not get person.', properties?: any) {
    super(message, properties)
  }
}

export class PeopleFetchRemoteError extends BaseError {
  public name = 'PeopleFetchRemoteError'
  constructor(public message: string = 'Could not get people.', properties?: any) {
    super(message, properties)
  }
}
