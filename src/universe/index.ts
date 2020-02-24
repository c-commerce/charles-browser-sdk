import { Readable } from 'readable-stream'
import { UniverseHealth, UniverseStatus } from './status'
import { Client } from '../client'
import { RealtimeClient, RealtimeMessage } from '../realtime'
import { BaseError } from '../errors'
import universeTopics from './topics'
import * as uuid from '../helpers/uuid'

export interface IUniverseUser {
  id?: string
  accessToken: string
}

export interface IUniverseOptions {
  name: string
  http: Client
  base: string
  user: IUniverseUser
}

export interface IUniversePayload {
  name: string
  id: string
  active: boolean
  deleted: boolean
  organization: string
  configuration: object | null
  updatedAt: Date | null
  createdAt: Date | null
}

export declare interface Universe {
  on(event: 'raw-error' | 'error', cb: (error: Error) => void): this
  on(event: 'armed' | 'universe:message' | string, cb: Function): this
}

export class Universe extends Readable {
  public status: UniverseStatus
  public health: UniverseHealth
  public options: IUniverseOptions
  public name: IUniverseOptions['name']

  public initialized: boolean = false
  public payload: IUniversePayload | null = null
  public user: IUniverseUser

  private http: Client
  private mqtt: RealtimeClient | null = null
  private base: string
  private static endpoint: string = 'api/v0/universes'

  public constructor(options: IUniverseOptions) {
    super()

    this.options = options
    this.name = options.name
    this.user = options.user
    this.base = this.options.base || 'https://hello-charles.com'

    this.status = new UniverseStatus({ universe: this })
    this.health = new UniverseHealth({ universe: this })
    this.http = options.http

    return this
  }

  public async init(): Promise<Universe | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.base}/${Universe.endpoint}/${this.name}`)

      this.setInitialized(res.data.data[0])
      this.setMqttClient()

      return this
    } catch (err) {
      throw new UniverseInitializationError(undefined, { error: err })
    }
  }

  private static parsePayload(payload: any): IUniversePayload {
    return {
      createdAt: payload.created_at ? new Date(payload.created_at) : null,
      updatedAt: payload.updated_at ? new Date(payload.updated_at) : null,
      id: payload.id,
      organization: payload.organization,
      active: payload.active,
      deleted: payload.deleted,
      configuration: payload.configuration,
      name: payload.name
    }
  }

  private setInitialized(payload: any) {
    this.payload = Universe.parsePayload(payload)
    this.initialized = true
    return this
  }

  private setMqttClient(): void {
    const realtimeOpts = {
      base: `wss:${this.name}.hello-charles.com`,
      username: this.user.id || 'charles-browser-sdk',
      password: this.user.accessToken
    }

    this.mqtt = new RealtimeClient(realtimeOpts)
    this.mqtt.on('message', (msg) => {
      this.handleMessage(msg)
    })
    this.subscibeDefaults()
  }

  private subscibeDefaults() {
    this.getMqttClient()
      .subscribe(universeTopics.api.message.generateTopic())
  }

  private handleMessage(msg: RealtimeMessage) {

    // each arming message will cause an unsubscription
    if (universeTopics.api.clients.arm.isTopic(msg.topic)) {
      this.emit('armed', msg)
      this.getMqttClient().unsubscribe(msg.topic)
      this.emit('message', msg)
      return
    }

    if (universeTopics.api.message.isTopic(msg.topic)) {
      this.emit('universe:message', msg)
      return
    }

    this.emit('message', msg)
  }

  private getMqttClient(): RealtimeClient {
    if (this.mqtt) return this.mqtt

    throw new UninstantiatedRealtimeClient()
  }

  public create(options: IUniverseOptions): Universe {
    return new Universe(options)
  }

  public implode(): void {
    //
  }

  public get ready(): boolean {
    // TODO: implement
    return false
  }

  public isReady(): boolean {
    // TODO: implement
    return false
  }

  public get connected(): boolean {
    // TODO: implement
    return false
  }

  public isConnected(): boolean {
    // TODO: implement
    return false
  }

  private handleError(err: Error) {
    if (this.listeners('error').length > 0) this.emit('error', err)
  }

  /**
   * Arm the client by retrieving latest data. Arming emits to the server and listens for the response once.
   */
  public arm(): Universe {
    const mqtt = this.getMqttClient()
    const topicString = universeTopics.api.clients.arm.generateTopic({ client: uuid.v4() })
    // NOTE: this requires unsubscribing from this topic in the armed listener
    mqtt.subscribe(topicString, (err: Error) => {
      if (err) {
        return this.handleError(err)
      }

      mqtt.publish(topicString)
    })

    return this
  }
}

export class UnviverseSingleton extends Universe {
  private static instance: Universe

  constructor(options: IUniverseOptions) {
    super(options)
  }

  static getInstance(options: IUniverseOptions): Universe {
    if (!UnviverseSingleton.instance) {
      UnviverseSingleton.instance = new UnviverseSingleton(options)
    }

    return UnviverseSingleton.instance
  }

  static clearInstance(): void {
    UnviverseSingleton.instance.implode()
  }
}

export class UniverseInitializationError extends BaseError {
  public name = 'UniverseInitializationError'
  constructor(public message: string = 'Could not initialize universe', properties?: any) {
    super(message, properties)
  }
}

export class UninstantiatedRealtimeClient extends BaseError {
  public name = 'UninstantiatedRealtimeClient'
  constructor(
    public message: string = 'Cannot initialize client API without instantiated Realtime client',
    properties?: any
  ) {
    super(message, properties)
  }
}
