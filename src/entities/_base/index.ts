import { EventEmitter } from 'events'
import { Readable, pipeline } from 'readable-stream'
import {
  SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook, AsyncParallelHook,
  AsyncParallelBailHook, AsyncSeriesHook, AsyncSeriesBailHook, AsyncSeriesWaterfallHook
} from 'tapable'
import { ndjsonStream } from './helpers'
import { diff, jsonPatchPathConverter } from 'just-diff'
import qs from 'qs'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface RawPatchItem {
  op: 'replace' | 'add' | 'remove'
  path: string
  value: any
}

export type RawPatch = RawPatchItem[]

export interface EntityOptions {
  universe: Universe
  http: Universe['http']
  initialized?: boolean
}

export interface EntityRawPayload {
  readonly id?: string
}

export interface EntityFetchQuery {
  [key: string]: any
}
export interface EntityDeleteQuery {
  [key: string]: any
}

export interface EntityFetchOptions {
  raw?: boolean
  query?: EntityFetchQuery
}
export interface EntityDeleteOptions {
  query?: EntityFetchQuery
}

export class HookableEvented extends EventEmitter {

}

export default abstract class Entity<Payload, RawPayload> extends HookableEvented {
  protected hooks: {
    [key: string]: SyncHook | SyncBailHook | SyncWaterfallHook | SyncLoopHook | AsyncParallelHook | AsyncParallelBailHook | AsyncSeriesHook | AsyncSeriesBailHook | AsyncSeriesWaterfallHook
  }

  protected abstract universe: Universe
  protected abstract http: Universe['http']

  /**
   * @ignore
   */
  protected _rawPayload?: RawPayload | null = null

  public abstract id?: string
  public abstract endpoint: string

  constructor () {
    super()
    this.hooks = {
      beforeSetRawPayload: new SyncHook(['beforeSetRawPayload'])
    }
  }

  /**
   * @ignore
   */
  protected setRawPayload (p: RawPayload): Entity<Payload, RawPayload> {
    this.hooks.beforeSetRawPayload.call(p)
    this._rawPayload = JSON.parse(JSON.stringify(p))

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
  protected handleError (err: Error): Error {
    if (this.listeners('error').length > 0) this.emit('error', err)

    return err
  }

  /**
   * Fetch the current state of this object.
   */
  public async fetch (options?: EntityFetchOptions): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._fetch directly and e.g. handle our error differently
    return await this._fetch(options)
  }

  /**
   * @ignore
   */
  protected async _fetch (options?: EntityFetchOptions): Promise<Entity<Payload, RawPayload>> {
    if (this.id === null || this.id === undefined) throw new TypeError('fetch requires id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
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
  public async patch (changePart: RawPayload): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._patch directly and e.g. handle our error differently
    return await this._patch(changePart)
  }

  /**
   * @ignore
   */
  protected async _patch (changePart: RawPayload): Promise<Entity<Payload, RawPayload>> {
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
   * Apply a patch diff directly, for full control. This is useful if you are manipulating deep data
   * and do not want opinionated functions, such as .patch.
   *
   * @param patch
   */
  public async applyPatch (patch: RawPatch): Promise<Entity<Payload, RawPayload>> {
    return await this._applyPatch(patch)
  }

  /**
   * @ignore
   */
  protected async _applyPatch (patch: RawPatch): Promise<Entity<Payload, RawPayload>> {
    if (!patch) throw new TypeError('apply patch requires incoming patch to be set.')
    if (this.id === null || this.id === undefined) throw new TypeError('apply patch requires id to be set.')

    try {
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
  public async post (): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._post directly and e.g. handle our error differently
    return await this._post()
  }

  /**
   * @ignore
   */
  protected async _post (): Promise<Entity<Payload, RawPayload>> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: this._rawPayload ?? undefined,
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
  public async delete (): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._delete directly and e.g. handle our error differently
    return await this._delete()
  }

  /**
   * @ignore
   */
  protected async _delete (): Promise<Entity<Payload, RawPayload>> {
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

      await this.http?.getClient()(opts)
      // delete routes don't respond with data yet, maybe needed in the future..
      // const response = await this.http?.getClient()(opts)
      // this.deserialize(response.data.data[0] as RawPayload)

      return this
    } catch (err) {
      throw new EntityPostError(undefined, { error: err })
    }
  }

  /**
   * Save a change to this local object, by either creating or patching it on the remote.
   * @param payload
   */
  public async save (payload?: RawPayload): Promise<Entity<Payload, RawPayload>> {
    // we allow implementers to override us by calling ._save directly and e.g. handle our error differently
    return await this._save(payload)
  }

  /**
   * @ignore
   */
  protected async _save (payload?: RawPayload): Promise<Entity<Payload, RawPayload>> {
    if (this.id && payload) {
      return await this.patch(payload)
    }

    if (!this.id && payload) {
      this.deserialize(payload)
      return await this.post()
    }

    // TODO: this should change if we get PUT or PATCH (application/json) endpoints
    throw new TypeError('save requires a sendable payload')
  }
}

export class EntityPatchError extends BaseError {
  public name = 'EntityPatchError'
  constructor (public message: string = 'Could not partially alter resource unexpectedly.', properties?: any) {
    super(message, properties)
  }
}

export class EntityPostError extends BaseError {
  public name = 'EntityPostError'
  constructor (public message: string = 'Could not create resource unexpectedly.', properties?: any) {
    super(message, properties)
  }
}

export class EntityFetchError extends BaseError {
  public name = 'EntityFetchError'
  constructor (public message: string = 'Could fetch resource unexpectedly.', properties?: any) {
    super(message, properties)
  }
}

export interface EntitiesListFetchQuery {
  [key: string]: any
}

export interface EntitiesListFetchOptions {
  raw?: boolean
  query?: EntitiesListFetchQuery
}

export abstract class EntitiesList<Entity, RawPayload> extends Readable {
  protected abstract universe: Universe
  protected abstract http: Universe['http']
  // [key: string]: any
  public abstract endpoint: string

  constructor () {
    super({ objectMode: true })
  }

  public _read (): void {

  }

  protected abstract parseItem (payload: RawPayload): Entity

  static pipeline = pipeline

  public abstract getStream(options?: EntitiesListFetchOptions): Promise<EntitiesList<Entity, RawPayload>>

  protected async _getStream (options?: EntitiesListFetchOptions): Promise<EntitiesList<Entity, RawPayload>> {
    const uri = `${this.universe?.universeBase}/${this.endpoint}/${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`
    const response = await fetch(uri, {
      headers: {
        ...this.http.getDefaultHeaders(),
        Accept: 'application/x-ndjson'
      }
    })

    if (!response.body) {
      const err = new TypeError('unexpected stream response')
      this.emit('error', err)
      throw err
    }

    const stream = ndjsonStream(response.body)

    const reader = stream.getReader()
    let read: Function

    reader.read().then(read = (result: any) => {
      if (result.done) {
        this.push(null)
        return
      }

      this.push(this.parseItem(result.value))

      reader.read()
      // @ts-ignore
        .then(read)
        .catch((err: Error) => {
          this.emit('error', err)
        })
    }).catch((err: Error) => {
      this.emit('error', err)
    })

    return this
  }
}
