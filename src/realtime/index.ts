import { connect, MqttClient, Packet, ClientSubscribeCallback, PacketCallback } from 'mqtt'
import events from 'events'
import * as uuid from '../helpers/uuid'
import { BaseError } from '../errors'

type MqttProtocoldIdOptions = 'MQTT'
type IMessagePayloadTypes = 'json' | 'string'

export interface RealtimeMessage {
  topic: string
  mqttClientId: string | number | undefined
  clientId: string
  receivedAt: Date
  attributes: {
    [key: string]: any
  }
  payloadType: IMessagePayloadTypes
  payload: {
    [key: string]: any
  } | string
}

export interface RealtimeMessageMessage extends RealtimeMessage {
  payload: {
    message: {
      [key: string]: any | object | undefined | null
    }
    event: {
      [key: string]: any | object | undefined | null
    }
  }
}

export interface RealtimeFeedsMessages extends RealtimeMessage {
  payload: {
    message: {
      [key: string]: any | object | undefined | null
    }
    feed: {
      [key: string]: any | object | undefined | null
    }
  }
}

export interface RealtimeFeeds extends RealtimeMessage {
  payload: {
    message: {
      [key: string]: any | object | undefined | null
    }
    feed: {
      [key: string]: any | object | undefined | null
    }
    action: 'create' | 'update'
  }
}

export interface RealtimePeople extends RealtimeMessage {
  payload: {
    person: {
      [key: string]: any | object | undefined | null
    }
    action: 'create' | 'update'
  }
}

export interface RealtimeLastMessageReference {
  mqttClientId: RealtimeMessage['mqttClientId']
  clientId: RealtimeMessage['clientId']
  receivedAt: RealtimeMessage['receivedAt']
}

interface MqttOptions {
  clean?: boolean
  protocolId?: MqttProtocoldIdOptions
  protocolVersion?: number
  keepalive?: number
  path?: string
  rejectUnauthorized: boolean
}

const defaultMqttOptions: MqttOptions = {
  clean: true,
  protocolId: 'MQTT',
  protocolVersion: 4,
  keepalive: 90,
  path: '/ws',
  rejectUnauthorized: false
}

interface RealtimeClientOptions {
  base: string
  messageType?: IMessagePayloadTypes
  username: string
  password: string
  mqttOptions?: MqttOptions
}

export declare type OnMessageCallback = (message:
RealtimeMessage
| RealtimeMessageMessage
) => void

export declare interface RealtimeClient {
  on(event: 'raw-error' | 'error', cb: (error: Error) => void): this
  on(event: 'message', cb: OnMessageCallback): this
  on(event: string, cb: Function): this
}

export class RealtimeClient extends events.EventEmitter {
  public initialized: boolean = false
  public connected: boolean = false
  public offline: boolean = false
  public options: RealtimeClientOptions

  private readonly client?: MqttClient
  private readonly mqttOptions: MqttOptions
  private last: RealtimeLastMessageReference | null = null

  constructor (options: RealtimeClientOptions) {
    super()

    this.options = {
      messageType: 'json',
      ...options
    }

    this.mqttOptions = {
      ...defaultMqttOptions,
      ...(options.mqttOptions ?? {})
    }

    this.client = connect(this.options.base, {
      ...this.mqttOptions,
      username: this.options.username,
      password: this.options.password
    })

    this.initialized = true

    this.client.on('connect', () => {
      this.emit('connect')
      this.connected = true
      this.offline = false
    }).on('close', () => {
      this.emit('close')
      this.connected = false
    }).on('error', (err: Error) => {
      this.handleError(err)
    }).on('reconnect', () => {
      this.emit('reconnect')
    }).on('offline', () => {
      this.emit('offline')
      this.offline = true
    })

    this.client.on('message', (topic: string, message: Buffer, packet: Packet) => {
      this.emit('message', this.handleMessagePayload(topic, message, packet))
    })

    this.on('raw-error', (err: Error) => {
      this.handleError(err)
    })
  }

  public isInitialized (): boolean {
    return this.initialized
  }

  public isConnected (): boolean {
    return this.connected
  }

  private handleError (err: Error): void {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }

  public destroy (): void {
    if (!this.client) throw new Error('cannot destroy instance, because a client is not initialized')

    this.removeAllListeners()
    this.client.end()
    this.offline = true
    this.connected = false
    this.initialized = false
  }

  private getClient (): MqttClient {
    if (this.client) return this.client

    throw new UninstantiatedMqttClient(undefined)
  }

  private handleMessagePayload (topic: string, message: Buffer, packet: Packet):
  RealtimeMessage | RealtimeMessageMessage {
    const base = {
      mqttClientId: packet.messageId,
      clientId: uuid.v4(),
      receivedAt: new Date()
    }
    this.last = Object.assign({}, base)

    if (this.options.messageType === 'string') {
      return {
        ...base,
        topic,
        attributes: {

        },
        payloadType: 'string',
        payload: message.toString()
      }
    }

    return {
      ...base,
      topic,
      attributes: {

      },
      payloadType: 'json',
      payload: JSON.parse(message.toString())
    }
  }

  public subscribe (topic: string | string[], cb?: Function): RealtimeClient {
    this.getClient().subscribe(topic, cb as ClientSubscribeCallback)
    return this
  }

  public unsubscribe (topic: string | string[], cb?: Function): RealtimeClient {
    this.getClient().unsubscribe(topic, cb as PacketCallback ?? undefined)
    return this
  }

  public publish (topic: string, payload?: any): RealtimeClient {
    this.getClient().publish(topic, payload)
    return this
  }
}

export class UninstantiatedMqttClient extends BaseError {
  public name = 'UninstantiatedMqttClient'
  constructor (
    public message: string = 'Cannot client API without instantiated MQTT client',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class UninstantiatedRealtimeClient extends BaseError {
  public name = 'UninstantiatedRealtimeClient'
  constructor (
    public message: string = 'Cannot initialize client API without instantiated Realtime client',
    properties?: any
  ) {
    super(message, properties)
  }
}
