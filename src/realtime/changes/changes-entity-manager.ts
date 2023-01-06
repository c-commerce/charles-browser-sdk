import Entity from '../../entities/_base'
import { RealtimeClient } from '..'
import { ChangeEventHandler, ChangesHandler, ChangeType, CustomChangeEventHandler } from './changes-handler'
import { isDeletable } from '../../helpers/entity'

export default class ChangesEntityManager<T> implements ChangeEventHandler<T> {
  private readonly changesHandler: ChangesHandler<T>
  public types: ChangeType[]

  constructor (
    private readonly mqtt: RealtimeClient,
    private readonly entity: Entity<any, T>,
    types: ChangeType[] = [ChangeType.updated, ChangeType.deleted],
    private readonly customHandler: Partial<CustomChangeEventHandler<T>> | undefined = undefined) {
    this.changesHandler = new ChangesHandler<T>(
      this.mqtt,
      this,
      {
        id: this.entity.id,
        entityName: this.entity.entityName
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
    this.entity.__updateLocalPayload(payload)
  }

  onDeleted (): void {
    this.customHandler?.onDeleted?.(() => this._internalOnDeleted)
    if (!this.customHandler?.onDeleted) {
      this._internalOnDeleted()
    }
  }

  _internalOnDeleted (): void {
    if (isDeletable(this.entity)) {
      this.entity.deleted = true
      const rawPayload = this.entity.serialize()
      if (rawPayload && 'deleted' in rawPayload) {
        (rawPayload as T & { deleted: boolean }).deleted = true
        this.entity.__updateLocalPayload(rawPayload)
      }
    }
  }

  onUpdated (newPayload: T, oldPayload?: T): void {
    this.customHandler?.onUpdated?.(newPayload, () => this._internalOnUpdated(newPayload, oldPayload), oldPayload)
    if (!this.customHandler?.onUpdated) {
      this._internalOnUpdated(newPayload, oldPayload)
    }
  }

  _internalOnUpdated (newPayload: T, oldPayload?: T): void {
    this.entity.__updateLocalPayload(newPayload)
  }

  public disconnect (): void {
    this.changesHandler.destroy()
  }
}
