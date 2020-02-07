import { Client } from '../client'

export class CharlesBaseRequest {
  private client: Client
  constructor(http: Client) {
    this.client = http
  }
}
