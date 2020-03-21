import { EventEmitter } from 'events'
import { diff, jsonPatchPathConverter } from 'just-diff'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface EntityOptions {
  universe: Universe
  http: Universe['http']
  initialized?: boolean
}

export interface EntityRawPayload {
  readonly id?: string
}

export default abstract class Entity<Payload, RawPayload> extends EventEmitter {
  protected abstract universe: Universe
  protected abstract http: Universe['http']

  /**
   * @ignore
   */
  protected _rawPayload?: RawPayload | null = null

  public abstract id?: string
  public abstract endpoint: string

  /**
   * @ignore
   */
  protected setRawPayload(p: RawPayload): Entity<Payload, RawPayload> {
    this._rawPayload = p

    return this
  }

  /**
   * Convert object to a JS struct.
   */
  public abstract serialize(): RawPayload
  protected abstract deserialize(rawPayload: RawPayload): Entity<Payload, RawPayload>

  /**
   * @ignore
   */
  protected handleError(err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
  }

  /**
   * Fetch the current state of this object.
   */
  public async fetch(): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._fetch directly and e.g. handle our error differently
    return this._fetch()
  }

  /**
   * @ignore
   */
  protected async _fetch(): Promise<Entity<Payload, RawPayload>> {
    if (this.id === null || this.id === undefined) throw new TypeError('fetch requires id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as RawPayload)

      return this
    } catch (err) {
      throw new EntityFetchError(undefined, { error: err })
    }
  }

  /**
   * Change this object on the remote by partially applying a change object to it as diff.
   * @param changePart
   */
  public async patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._patch directly and e.g. handle our error differently
    return this._patch(changePart)
  }

  /**
   * @ignore
   */
  protected async _patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>> {
    if (this._rawPayload === null || this._rawPayload === undefined) throw new TypeError('patch requires raw payload to be set.')
    if (!changePart) throw new TypeError('patch requires incoming object to be set.')
    if (this.id === null || this.id === undefined) throw new TypeError('patch requires id to be set.')

    try {
      const patch = diff(
        this._rawPayload as unknown as object,
        // first merge with what we got, in order not to throw away any properties
        { ...this._rawPayload, ...changePart } as unknown as object,
        jsonPatchPathConverter
      )

      const opts = {
        method: 'PATCH',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}`,
        headers: {
          'Content-Type': 'application/json-patch+json'
        },
        data: patch,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as RawPayload)

      return this
    } catch (err) {
      throw new EntityPatchError(undefined, { error: err })
    }
  }

  /**
   * Create this object on the remote.
   */
  public async post(): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._post directly and e.g. handle our error differently
    return this._post()
  }

  /**
   * @ignore
   */
  protected async _post(): Promise<Entity<Payload, RawPayload>> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: this._rawPayload || undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as RawPayload)

      return this
    } catch (err) {
      throw new EntityPostError(undefined, { error: err })
    }
  }

  /**
   * Delete this object on the remote.
   */
  public async delete(): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._delete directly and e.g. handle our error differently
    return this._delete()
  }

  /**
   * @ignore
   */
  protected async _delete(): Promise<Entity<Payload, RawPayload>> {
    if (this.id === null || this.id === undefined) throw new TypeError('delete requires id to be set.')

    try {
      const opts = {
        method: 'DELETE',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }

      const response = await this.http?.getClient()(opts)

      this.deserialize(response.data.data[0] as RawPayload)

      return this
    } catch (err) {
      throw new EntityPostError(undefined, { error: err })
    }
  }

  /**
   * Save a change to this local object, by either creating or patching it on the remote.
   * @param payload
   */
  public async save(payload?: RawPayload): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._save directly and e.g. handle our error differently
    return this._save()
  }

  /**
   * @ignore
   */
  protected async _save(payload?: RawPayload): Promise<Entity<Payload, RawPayload>> {
    if (this.id && payload) {
      return this.patch(payload)
    }

    if (!this.id && payload) {
      this.deserialize(payload)
      return this.post()
    }

    // TODO: this should change if we get PUT or PATCH (application/json) endpoints
    throw new TypeError('save requires a sendable payload')
  }
}

export class EntityPatchError extends BaseError {
  public name = 'EntityPatchError'
  constructor(public message: string = 'Could not partially alter resource unexpectedly.', properties?: any) {
    super(message, properties)
  }
}

export class EntityPostError extends BaseError {
  public name = 'EntityPostError'
  constructor(public message: string = 'Could not create resource unexpectedly.', properties?: any) {
    super(message, properties)
  }
}

export class EntityFetchError extends BaseError {
  public name = 'EntityFetchError'
  constructor(public message: string = 'Could fetch resource unexpectedly.', properties?: any) {
    super(message, properties)
  }
}
