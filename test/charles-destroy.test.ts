import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import charles, { CharlesClient, v0 } from '../src/charles'
import { Client } from '../src/client'
import { Auth } from '../src/v0'
import { LocalStorageMock } from './util'

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

describe('SDK: can destroy SDK', () => {
  const localStorage = new LocalStorageMock()

  it('Charles  SDK is instantiable and is instance of Charles  client', () => {
    expect(charles).toBeInstanceOf(CharlesClient)
  })

  it('Base has been set automatically', () => {
    if (!charles.options) throw new Error('Options must be defined')
    expect(charles.options.universe).toBe(undefined)
  })

  it('Can call init with new options', () => {
    charles.init({
      universe: 'https://some-universe.hello-charles.com'
    })

    if (!charles.options) throw new Error('Options must be defined')
    expect(charles.options.universe).toBe('https://some-universe.hello-charles.com')
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

    try {
      let { access_token, user } = await charles.auth.loginUsername(options)

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

  it('can destroy and re-hydrate externally', () => {
    charles.destroy()

    const clientInstance = Client.getInstance({})

    expect(clientInstance.getClient().defaults.headers.common['Authorization']).toBeUndefined()

    expect(charles.auth).toBeDefined()
    expect(charles.options).toBeUndefined()
    expect(charles.http).toBeUndefined()
    expect(charles.auth.authenticated).toBe(false)

    charles.init({
      universe: 'https://some-universe.hello-charles.com',
      credentials: {
        accessToken: localStorage.getItem('token')
      },
      user: localStorage.getItem('user')
    })

    expect(charles.auth.accessToken).toBe('mockToken')
    expect(clientInstance.getClient().defaults.headers.common['Authorization']).toBe(
      'Bearer mockToken'
    )
    expect(charles.auth.authenticated).toBe(true)

    const transactions = charles.messages()

    expect(transactions).toBeInstanceOf(v0.Messages)
  })

  // it('can destroy and login', async () => {
  //   charles.destroy()

  //   const clientInstance = Client.getInstance({})

  //   expect(clientInstance.getClient().defaults.headers.common['Authorization']).toBeUndefined()

  //   expect(charles.auth).toBeDefined()
  //   expect(charles.options).toBeUndefined()
  //   expect(charles.http).toBeUndefined()
  //   expect(charles.auth.authenticated).toBe(false)

  //   const options = {
  //     username: user.username,
  //     password: user.password
  //   }

  //   if (process.env.SYSTEM_TEST !== 'true') {
  //     const mock = new MockAdapter(axios)

  //     mock.onPost('https://hello-charles.com/api/v0/users/auth/login').reply(function (config) {
  //       return [
  //         200,
  //         {
  //           data: {
  //             id: '123',
  //             access_token: 'mockToken',
  //             roles: [],
  //             permissions: []
  //           }
  //         }
  //       ]
  //     })
  //   }

  //   try {
  //     let { access_token, user } = await charles.auth.loginUsername(options)

  //     expect(typeof access_token === 'string').toBe(true)
  //     expect(access_token).toBe('sometoken')
  //     expect(typeof user === 'string').toBe(true)
  //     expect(user).toBe('4564')
  //     expect(charles.auth.access_token).toBe('sometoken')
  //     expect(charles.auth.authenticated).toBe(true)
  //     expect(clientInstance.getClient().defaults.headers.common['Authorization']).toBe(
  //       'Bearer sometoken'
  //     )
  //   } catch (err) {
  //     throw err
  //   }
  // })
})
