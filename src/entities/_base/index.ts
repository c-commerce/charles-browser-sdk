import { EventEmitter } from 'events'
import { diff, jsonPatchPathConverter } from 'just-diff'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface EntityOptions {
  universe: Universe
  http: Universe['http']
  initialized?: boolean
}

export default abstract class Entity<Payload, RawPayload> extends EventEmitter {
  protected abstract universe: Universe
  protected abstract http: Universe['http']

  protected _rawPayload?: RawPayload | null = null

  public abstract id?: string
  public abstract endpoint: string

  protected setRawPayload(p: RawPayload): Entity<Payload, RawPayload> {
    this._rawPayload = p

    return this
  }

  public abstract serialize(): RawPayload
  protected abstract deserialize(rawPayload: RawPayload): Entity<Payload, RawPayload>

  protected handleError(err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
  }

  public async patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._patch directly and e.g. handle our error differently
    return this._patch(changePart)
  }

  protected async _patch(changePart: RawPayload): Promise<Entity<Payload, RawPayload>> {
    if (this._rawPayload === null || this._rawPayload === undefined) throw new TypeError('patch requires raw payload to be set.')
    if (!changePart) throw new TypeError('patch requires incoming object to be set.')

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
}

export class EntityPatchError extends BaseError {
  public name = 'EntityPatchError'
  constructor(public message: string = 'Could not partially alter resource unexpectedly.', properties?: any) {
    super(message, properties)
  }
}
