import { Client } from '../client'

export class CharlesBaseRequest {
  private readonly client: Client

  constructor (http: Client) {
    this.client = http
  }
}
