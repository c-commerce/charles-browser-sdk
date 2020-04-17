import { Client } from '../client'
import qs from 'qs'

export interface CharlesBaseHandlerOptions {
  endpoint: string
  base: string
}

// interface ParamsArrayItem {
//   [key: string]: any
// }
// interface ParamsArray extends Array<string | ParamsArrayItem> { 0: ParamsArrayItem; 1: string }

export interface CharlesBaseHandlerUriOptions {
  endpoint: string
  query?: {
    [key: string]: any
  }
  params?: string[]
}

export class CharlesBaseHandler {
  private readonly handlerOptions: CharlesBaseHandlerOptions
  private readonly client: Client

  constructor (http: Client, handlerOptions: CharlesBaseHandlerOptions) {
    this.client = http
    this.handlerOptions = handlerOptions
  }

  getURI (options: CharlesBaseHandlerUriOptions): string {
    let queryString = ''
    if (options.query) {
      queryString = qs.stringify(options.query, { addQueryPrefix: true })
    }

    let params = ''
    if (Array.isArray(options.params)) {
      params = '/' + options.params.map((item) => {
        return item
      }).join('/')
    }

    return `${this.handlerOptions.base}${options.endpoint}${params}${queryString}`
  }
}
