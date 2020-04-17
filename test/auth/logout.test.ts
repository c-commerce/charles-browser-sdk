import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/charles'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

describe('Auth: logout', () => {
  it('fails on missing token', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.CHARLES_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet('https://hello-charles.com/api/v0/users/auth/logout').reply(function (config) {
        return [500]
      })
    }

    const auth = new v0.Auth(options)

    try {
      const data = await auth.logout()
    } catch (err) {
      expect(err.name).toBe('LogoutMissingToken')
    }
  })

  it('can log out', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.CHARLES_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://hello-charles.com/api/v0/users/auth/login').reply(function (config) {
        return [
          200,
          {
            data: {
              access_token: 'something',
              roles: [],
              permissions: []
            }
          }
        ]
      })

      mock.onGet('https://hello-charles.com/api/v0/users/auth/logout').reply(function (config) {
        return [
          200,
          {
            msg: 'Logout successful.'
          }
        ]
      })
    }

    const auth = new v0.Auth(options)

    // eslint-disable-next-line no-useless-catch
    try {
      await auth.authenticate()
      const data = await auth.logout()
      expect(data).toBeTruthy()
      expect(data.msg === 'Logout successful.').toBe(true)
    } catch (err) {
      throw err
    }
  })

  it('rejects', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.CHARLES_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://hello-charles.com/api/v0/users/auth/login').reply(function (config) {
        return [
          200,
          {
            data: {
              access_token: 'something',
              roles: [],
              permissions: []
            }
          }
        ]
      })

      mock.onGet('https://hello-charles.com/api/v0/users/auth/logout').reply(function (config) {
        return [500]
      })
    }

    const auth = new v0.Auth(options)

    try {
      await auth.authenticate()
      const data = await auth.logout()
    } catch (err) {
      expect(err.name).toBe('LogoutFailed')
    }
  })
})
