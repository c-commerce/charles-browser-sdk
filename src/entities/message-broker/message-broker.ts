
import Entity, { EntityOptions, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import { Route, RouteRawPayload } from '../route'
import { profile } from 'console'

export interface MessageBrokerOptions extends EntityOptions {
  rawPayload?: MessageBrokerRawPayload
}

export interface MessageBrokerRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string
  readonly uri?: string
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string | any
  readonly configuration?: object | any
  readonly integration_configuration?: string | any
  readonly is_set_up?: boolean
  readonly metadata?: object | any
  readonly labels?: null | {
    [key: string]: any
  }
  readonly details?: null | {
    routes: RouteRawPayload[]
    [key: string]: any
  }
  readonly profile?: {
    email: string
    description: string
    about: string
    address: string
    vertical: string
    websites: any[]
    logo: string
  } | any
  external_reference_id?: string | null
}

export interface MessageBrokerPayload {
  readonly id?: MessageBrokerRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: MessageBrokerRawPayload['deleted']
  readonly active?: MessageBrokerRawPayload['active']
  readonly name?: MessageBrokerRawPayload['name']
  readonly uri?: MessageBrokerRawPayload['uri']
  readonly isProxy?: MessageBrokerRawPayload['is_proxy']
  readonly proxyVendor?: MessageBrokerRawPayload['proxy_vendor']
  readonly configuration?: MessageBrokerRawPayload['configuration']
  readonly integrationConfiguration?: MessageBrokerRawPayload['integration_configuration']
  readonly isSetUp?: MessageBrokerRawPayload['is_set_up']
  readonly metadata?: MessageBrokerRawPayload['metadata']
  readonly labels?: MessageBrokerRawPayload['labels']
  readonly details?: null | {
    routes: Route[]
    [key: string]: any
  }
  readonly profile?: MessageBrokerRawPayload['profile']
  readonly externalReferenceId?: MessageBrokerRawPayload['external_reference_id']
}

/**
 * Manage messageBrokers.
 *
 * @category Entity
 */
export class MessageBroker extends Entity<MessageBrokerPayload, MessageBrokerRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: MessageBrokerOptions
  public initialized: boolean

  public endpoint: string

  public id?: MessageBrokerPayload['id']
  public createdAt?: MessageBrokerPayload['createdAt']
  public updatedAt?: MessageBrokerPayload['updatedAt']
  public deleted?: MessageBrokerPayload['deleted']
  public active?: MessageBrokerPayload['active']
  public name?: MessageBrokerPayload['name']
  public uri?: MessageBrokerPayload['uri']
  public isProxy?: MessageBrokerPayload['isProxy']
  public proxyVendor?: MessageBrokerPayload['proxyVendor']
  public configuration?: MessageBrokerPayload['configuration']
  public integrationConfiguration?: MessageBrokerPayload['integrationConfiguration']
  public isSetUp?: MessageBrokerPayload['isSetUp']
  public metadata?: MessageBrokerPayload['metadata']
  public labels?: MessageBrokerPayload['labels']
  public details?: MessageBrokerPayload['details']
  public profile?: MessageBrokerPayload['profile']
  public externalReferenceId?: MessageBrokerPayload['externalReferenceId']

  constructor (options: MessageBrokerOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/message_brokers'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: MessageBrokerRawPayload): MessageBroker {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.uri = rawPayload.uri
    this.isProxy = rawPayload.is_proxy
    this.proxyVendor = rawPayload.proxy_vendor
    this.configuration = rawPayload.configuration
    this.integrationConfiguration = rawPayload.integration_configuration
    this.isSetUp = rawPayload.is_set_up
    this.metadata = rawPayload.metadata
    this.labels = rawPayload.labels
    this.profile = rawPayload.profile
    this.externalReferenceId = rawPayload.external_reference_id

    if (rawPayload.details) {
      this.details = {
        routes: Array.isArray(rawPayload.details?.routes) ? rawPayload.details?.routes.map((item: RouteRawPayload) => Route.create(item, this.universe, this.http)) : []
      }
    }

    return this
  }

  public serialize (): MessageBrokerRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active,
      name: this.name,
      uri: this.uri,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      configuration: this.configuration,
      integration_configuration: this.integrationConfiguration,
      is_set_up: this.isSetUp,
      metadata: this.metadata,
      labels: this.labels,
      profile: this.profile,
      external_reference_id: this.externalReferenceId
    }
  }

  public static create (payload: MessageBrokerRawPayload, universe: Universe, http: Universe['http']): MessageBroker {
    return new MessageBroker({ rawPayload: payload, universe, http, initialized: true })
  }

  public async setup (): Promise<number> {
    if (this.id === null || this.id === undefined) throw new TypeError('messagebroker setup requires id to be set.')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/setup`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw new MessageBrokerSetupRemoteError(undefined, { error: err })
    }
  }

  public async syncMessageTemplates (): Promise<number | undefined> {
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id as string}/sync/message_templates`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }
      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new MessageBrokerSyncMessageTemplatesRemoteError(undefined, { error: err }))
    }
  }

  public async syncMessages (): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('message broker syncMessages requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/messages`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new MessageBrokerSyncMessagesRemoteError(undefined, { error: err }))
    }
  }

  public async syncMessagesForChannel (externalPersonReferenceId: string | number): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('message broker syncMessagesForChannel requires id to be set.')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/sync/messages/${externalPersonReferenceId}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new MessageBrokerSyncMessagesRemoteError(undefined, { error: err }))
    }
  }

  /**
 * Gets all channel instances of a referenced broker. eg.: gets all slack channels
 */
  public async getProxyChannelInstances (): Promise<Array<{ external_reference_id: string, name: string, [key: string]: any }> | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('requires id to be set.')

    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/proxy/channel_instances`,
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.data.data
    } catch (err) {
      throw this.handleError(new MessageBrokerProxyChannelInstancesRemoteError(undefined, { error: err }))
    }
  }

  /**
 * Updates the profile of a message broker
 * @param payload
 */
  public async updateProfile (payload: object): Promise<number | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('message broker profile update requires id to be set')

    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/profile`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': '0'
        },
        data: {
          ...(payload ?? undefined)
        },
        responseType: 'json'
      }

      const res = await this.http?.getClient()(opts)
      return res.status
    } catch (err) {
      throw this.handleError(new MessageBrokerUpdateProfileRemoteError(undefined, { error: err }))
    }
  }

  /**
 * Updates the profile of a message broker
 * @param payload
 */
  public async getProfile (options: EntityFetchOptions): Promise<object | undefined> {
    if (this.id === null || this.id === undefined) throw new TypeError('message broker profile get requires id to be set')

    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${this.endpoint}/${this.id}/profile`,
        params: {
          ...(options?.query ? options.query : {})
        }
      }
      const res = await this.http.getClient()(opts)
      const resources = res.data.data
      return resources
    } catch (err) {
      throw this.handleError(new MessageBrokerUpdateProfileRemoteError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageBrokers {
  public static endpoint: string = 'api/v0/message_brokers'
}

export class MessageBrokersFetchRemoteError extends BaseError {
  public name = 'MessageBrokersFetchRemoteError'
  constructor (public message: string = 'Could not get messageBrokers.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageBrokersFetchRemoteError.prototype)
  }
}

export class MessageBrokerSyncMessageTemplatesRemoteError extends BaseError {
  public name = 'MessageBrokerSyncMessageTemplatesRemoteError'
  constructor (public message: string = 'Could not sync message templates of broker.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageBrokerSyncMessageTemplatesRemoteError.prototype)
  }
}

export class MessageBrokerSetupRemoteError extends BaseError {
  public name = 'MessageBrokerSetupRemoteError'
  constructor (public message: string = 'Could not setup message broker.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageBrokerSetupRemoteError.prototype)
  }
}

export class MessageBrokerSyncMessagesRemoteError extends BaseError {
  public name = 'MessageBrokerSyncMessagesRemoteError'
  constructor (public message: string = 'Could not sync messages of message broker.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageBrokerSyncMessagesRemoteError.prototype)
  }
}

export class MessageBrokerProxyChannelInstancesRemoteError extends BaseError {
  public name = 'MessageBrokerProxyChannelInstancesRemoteError'
  constructor (public message: string = 'Could not get proxied channel instances of a message broker.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageBrokerProxyChannelInstancesRemoteError.prototype)
  }
}
export class MessageBrokerUpdateProfileRemoteError extends BaseError {
  public name = 'MessageBrokerUpdateProfileRemoteError'
  constructor (public message: string = 'Could not update profile of message broker', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, MessageBrokerUpdateProfileRemoteError.prototype)
  }
}
