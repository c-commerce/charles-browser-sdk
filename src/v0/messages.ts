/* eslint-disable no-async-promise-executor */

import { Client } from '../client'
import { BaseError } from '../errors/base-error'
import { CharlesBaseHandler } from '../base/index'

export interface MessagesOptions {
  user?: string
  base?: string
  universe: string
}

export interface MessagesQueryOptions {
  read?: boolean
  ignored?: boolean
  min_updated_at?: string
}

export interface MessagesResponse {
  data: Message[]
  metadata: object
}

export interface Message {
  message?: string
  consumer_type?: string
  channel?: string
  level?: string
  type?: string
  payload?: object
  metadata?: object
  ignorable?: boolean
  ignored?: boolean
  read?: boolean
  read_at?: string
  deleted?: boolean
  progress?: object
  client_account?: string
}

export class Messages extends CharlesBaseHandler {
  public static baseEndpoint = '/api/v0/messages'
  endpoint: string
  universe: string
  http: Client
  public options: MessagesOptions

  constructor (options: MessagesOptions, http: Client) {
    super(http, { endpoint: Messages.baseEndpoint, base: options.base ?? `https://${options.universe}.hello-charles.com` })
    this.options = options
    this.http = http

    this.endpoint = Messages.baseEndpoint
    this.universe = options.universe
  }

  public async getAll (query?: MessagesQueryOptions | undefined): Promise<MessagesResponse> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return await new Promise(async (resolve, reject) => {
      try {
        const uri = this.getURI({ endpoint: this.endpoint, query })
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) {
          return reject(new MessagesFetchFailed())
        }

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return resolve({
          data: response.data.data,
          metadata: { count: response.data.count }
        } as MessagesResponse)
      } catch (err) {
        return reject(new MessagesFetchFailed(undefined, { error: err }))
      }
    })
  }

  public async update (messageId: string, messageRequest: Message): Promise<MessagesResponse> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return await new Promise(async (resolve, reject) => {
      try {
        const uri = this.getURI({ endpoint: this.endpoint, params: [messageId] })

        const response = await this.http.getClient().put(uri, messageRequest)
        if (response.status !== 200) {
          return reject(new MessageUpdateFailed())
        }

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return resolve({
          data: response.data.data[0] as Message,
          metadata: { count: response.data.count }
        } as MessagesResponse)
      } catch (err) {
        return reject(new MessageUpdateFailed(undefined, { error: err }))
      }
    })
  }
}

export class MessageUpdateFailed extends BaseError {
  public name = 'MessageUpdateFailed'
  constructor (public message: string = 'Could not update message', properties?: any) {
    super(message, properties)
  }
}

export class MessagesFetchFailed extends BaseError {
  public name = 'MessagesFetchFailed'
  constructor (public message: string = 'Could not fetch messages', properties?: any) {
    super(message, properties)
  }
}
