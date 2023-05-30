import pick from 'just-pick'
import { RealtimeClient } from '..'
import { ChangeEventHandler, ChangesHandler, ChangeType, CustomChangeEventHandler } from './changes-handler'

export interface RawPayload { id: string, [name: string]: any }

export default class ChangesRawManager<T> implements ChangeEventHandler<T> {
  private readonly changesHandler: ChangesHandler<T>
  public types: ChangeType[]

  constructor (
    private readonly mqtt: RealtimeClient,
    private readonly raw: RawPayload,
    private readonly entityName: string,
    private readonly embeds: Array<keyof T>,
    types: ChangeType[] = ['updated', 'deleted'],
    private readonly customHandler: Partial<CustomChangeEventHandler<T>> | undefined = undefined) {
    this.changesHandler = new ChangesHandler<T>(
      this.mqtt,
      this,
      {
        id: this.raw.id,
        entityName: this.entityName
      },
      types
    )

    this.types = new Proxy(this.changesHandler.types, {})
  }

  onCreated (payload: T): void {
    this.customHandler?.onCreated?.(payload, () => this._internalOnCreated(payload))
    if (!this.customHandler?.onCreated) {
      this._internalOnCreated(payload)
    }
  }

  _internalOnCreated (payload: T): void {
    Object.assign(this.raw, payload)
  }

  onDeleted (): void {
    this.customHandler?.onDeleted?.(() => this._internalOnDeleted)
    if (!this.customHandler?.onDeleted) {
      this._internalOnDeleted()
    }
  }

  _internalOnDeleted (): void {
    if ('deleted' in this.raw) {
      this.raw.deleted = true
    }
  }

  onUpdated (newPayload: T, oldPayload?: T): void {
    this.customHandler?.onUpdated?.(newPayload, () => this._internalOnUpdated(newPayload, oldPayload), oldPayload)
    if (!this.customHandler?.onUpdated) {
      this._internalOnUpdated(newPayload, oldPayload)
    }
  }

  _internalOnUpdated (newPayload: T, oldPayload?: T): void {
    const ignoreables = pick(this.raw, this.embeds as string[])
    Object.assign(this.raw, newPayload, ignoreables)
  }

  public disconnect (): void {
    this.changesHandler.destroy()
  }
}
