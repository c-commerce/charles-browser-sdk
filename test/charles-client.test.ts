import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { CharlesClient, v0 } from '../src/charles'
import { Client } from '../src/client'

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

describe('SDK: client: can instantiate SDK client', () => {
  it('CharlesClient is instantiable', () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.hello-charles.com/api/v0/users/auth/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: '4564'
            }
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.CHARLES_BASE
    }

    const inst = new CharlesClient(options)
    expect(inst).toBeInstanceOf(CharlesClient)
  })

  it('CharlesClient is instantiable', () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.hello-charles.com/api/v0/users/auth/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: '4564'
            }
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.CHARLES_BASE
    }

    expect(new CharlesClient(options)).toBeInstanceOf(CharlesClient)
  })

  it('CharlesClient is inittable', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.hello-charles.com/api/v0/users/auth/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: '4564'
            }
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.CHARLES_BASE
    }

    const charles = new CharlesClient(options)

    charles.init()

    expect(charles.auth).toBeInstanceOf(v0.Auth)
    expect(charles.http).toBeInstanceOf(Client)
  })
})
