import topics from '../../universe/topics'
import { RealtimeClient, RealtimeMessage, RealtimeMessageMessage } from '..'

export type ChangeType = 'created' | 'deleted' | 'updated'

export interface PayloadData {
  id?: string
  entityName?: string
}

export interface ChangeEventHandler<T> {
  onCreated: (payload: T) => void
  onDeleted: (payload: T) => void
  onUpdated: (newPayload: T, oldPayload?: T) => void
}

export interface CustomChangeEventHandler<T> {
  onCreated: (payload: T, internalReaction: () => void) => void
  onDeleted: (payload: T, internalReaction: () => void) => void
  onUpdated: (newPayload: T, internalReaction: () => void, oldPayload?: T) => void
}

export interface EntityChangedMessage<T> extends RealtimeMessage {
  payload: {
    action: ChangeType
    entity: T
    before?: {
      entity: T
    }
  }
}

export class ChangesHandler<T> {
  public types: ChangeType[]
  private readonly topic: string

  constructor (
    private readonly mqtt: RealtimeClient,
    private readonly eventHandler: Partial<ChangeEventHandler<T>>,
    payload: PayloadData,
    types: ChangeType[] = ['updated', 'deleted']
  ) {
    this._filterMessages = this._filterMessages.bind(this)
    this.types = types.concat()
    this.topic = topics.api.entityChanges.generateTopic(payload)
    this._init()
  }

  private _init (): void {
    this.mqtt.on('message', this._filterMessages)
    this.mqtt.subscribe(this.topic)
  }

  private _filterMessages (message: RealtimeMessage | RealtimeMessageMessage): void {
    if (this._isChangeTopic(message) && this.types.includes(message.payload.action)) {
      switch (message.payload.action) {
        case 'created':
          this.eventHandler.onCreated?.(message.payload.entity)
          break
        case 'updated':
          this.eventHandler.onUpdated?.(message.payload.entity, message.payload.before?.entity)
          break
        case 'deleted':
          this.eventHandler.onDeleted?.(message.payload.entity)
          break
      }
    }
  }

  private _isChangeTopic (message: RealtimeMessage | RealtimeMessageMessage): message is EntityChangedMessage<T> {
    return message.topic === this.topic
  }

  public destroy (): void {
    this.mqtt.unsubscribe(this.topic)
    this.mqtt.off('message', this._filterMessages)
  }
}
