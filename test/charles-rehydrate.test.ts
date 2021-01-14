/* eslint-disable @typescript-eslint/naming-convention */
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import charles, { CharlesClient, v0 } from '../src/charles'
import { Client } from '../src/client'
import { Auth } from '../src/v0'
import { LocalStorageMock } from './util'
dotenv.config()

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

describe('SDK: can instantiate SDK', () => {
  const localStorage = new LocalStorageMock()

  it('Charles  SDK is instantiable and is instance of Charles  client', () => {
    expect(charles).toBeInstanceOf(CharlesClient)
  })

  // it('Base has been set automatically', () => {
  //   if (!charles.options) throw new Error('Options must be defined')
  //   expect(charles.options.universe).toBe('https://hello-charles.com')
  // })

  it('Can call init with new options', () => {
    charles.init({
      universe: 'https://hello-charles.com'
    })

    if (!charles.options) throw new Error('Options must be defined')

    expect(charles.options.universe).toBe('https://hello-charles.com')
    expect(charles.auth).toBeInstanceOf(Auth)
  })

  it('Can do login from instance', async () => {
    const options = {
      username: user.username,
      password: user.password
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://hello-charles.com/api/v0/users/auth/login').reply(function (config) {
        return [
          200,
          {
            data: {
              id: '123',
              access_token: 'mockToken',
              roles: [],
              permissions: []
            }
          }
        ]
      })
    }

    // eslint-disable-next-line no-useless-catch
    try {
      const { access_token, user } = await charles.auth.loginUsername(options)

      localStorage.setItem('token', 'mockToken')
      localStorage.setItem('user', 'mockUser')

      expect(typeof access_token === 'string').toBe(true)
      expect(access_token).toBe('mockToken')
      expect(typeof user === 'string').toBe(true)
      expect(user).toBe('123')
      expect(charles.auth.accessToken).toBe('mockToken')
      expect(charles.auth.authenticated).toBe(true)
    } catch (err) {
      throw err
    }
  })

  it('can rehydrate', () => {
    const opts = {
      universe: 'https://hello-charles.com',
      credentials: {
        accessToken: localStorage.getItem('token')
      },
      user: localStorage.getItem('user')
    }

    charles.init(opts)

    expect(charles.auth.accessToken).toBe('mockToken')
    expect(charles.auth.authenticated).toBe(true)

    const transactions = charles.messages()

    expect(transactions).toBeInstanceOf(v0.Messages)
  })
})
