import { CharlesClient } from '../src/charles'
import { Universe } from '../src/universe'
import { Client } from '../src/client'

export class LocalStorageMock {
  private store = {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  clear () {
    this.store = {}
  }

  getItem (key: string): any {
    return (this.store as any)[key] || null
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setItem (key: string, value: string | null) {
    (this.store as any)[key] = value as any
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  removeItem (key: string) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (this.store as any)[key]
  }
}

/**
 * Instantiate Charles in the tests - reduce boilerplate
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function initInstance (opts?: object) {
  const instance = new CharlesClient()
  instance.init({
    ...options,
    ...opts
  })

  await instance.auth.loginUsername({
    username: user.username,
    password: user.password
  })

  return instance
}

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const options = {
  credentials: {
    username: user.username,
    password: user.password
  },
  base: process.env.CHARLES_BASE
}

export function stubUniverse (): { universe: Universe, client: Client } {
  const token = 'UNI_USER_STUB_ACCESS_TOKEN'

  const client = Client.getInstance({
    token: token
  })

  const opts = {
    name: 'stub-universe',
    http: client,
    base: 'https://hello-charles.local',
    user: {
      id: 'UNI_USER_STUB_ID',
      accessToken: token
    }
  }

  return {
    client: client,
    universe: new Universe(opts)
  }
}
