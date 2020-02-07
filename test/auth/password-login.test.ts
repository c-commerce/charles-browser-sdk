import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/charles'

let user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME || user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD || user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey
}

describe('Auth: make auth flow', () => {
  it('v0: Auth: Can make password auth implicitly', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.CHARLES_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://hello-charles.com/api/v0/users/auth/login').reply(function (config) {
        return [
          200,
          {
            data: {
              access_token: '',
              id: 'something',
              roles: [],
              permissions: []
            }
          }
        ]
      })
    }

    const auth = new v0.Auth(options)

    try {
      let data = await auth.authenticate()
      expect(data).toBeTruthy()
      expect(typeof data.access_token === 'string').toBe(true)
      expect(typeof data.user === 'string').toBe(true)
      expect(Array.isArray(data.roles)).toBe(true)
      expect(Array.isArray(data.permissions)).toBe(true)
    } catch (err) {
      throw err
    }
  })

  it('v1: Auth: Can make password auth implicitly', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.CHARLES_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://hello-charles.com/api/v0/users/auth/login').reply(function (config) {
        return [
          200,
          {
            data: {
              access_token: '',
              id: 'something',
              roles: [],
              permissions: []
            }
          }
        ]
      })
    }

    const auth = new v0.Auth(options)

    try {
      let data = await auth.authenticate()
      expect(data).toBeTruthy()
      expect(typeof data.access_token === 'string').toBe(true)
      expect(typeof data.user === 'string').toBe(true)
    } catch (err) {
      throw err
    }
  })
})
