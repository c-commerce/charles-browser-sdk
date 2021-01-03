import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { v0 } from '../../src/charles'
import { initInstance } from '../util'
dotenv.config()

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const queryParams = {
  read: false,
  ignored: false,
  min_updated_at: new Date().toISOString()
}

const UNIVERSE = 'some-universe'

describe('v0: Messages: can get all messages', () => {
  it("Charles's messages are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
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

      mock.onGet(`https://${UNIVERSE}.hello-charles.com/api/v0/messages`).reply(function (config) {
        return [
          200,
          {
            count: 1,
            data: [{}]
          }
        ]
      })
    }

    const inst = await initInstance({ universe: UNIVERSE })

    const Messages = inst.messages()

    expect(Messages).toBeInstanceOf(v0.Messages)

    const { data } = await Messages.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('Can get all messges with filters', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
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

      mock
        .onGet(`https://${UNIVERSE}.hello-charles.com/api/v0/messages?${qs.stringify(queryParams)}`)
        .reply(function (config) {
          return [
            200,
            {
              count: 1,
              data: [{}]
            }
          ]
        })
    }

    const inst = await initInstance({ universe: UNIVERSE })

    const Messages = inst.messages()

    expect(Messages).toBeInstanceOf(v0.Messages)

    const { data } = await Messages.getAll(queryParams)

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
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

      mock.onGet(`https://${UNIVERSE}.hello-charles.com/api/v0/messages`).reply(function (config) {
        return [205]
      })
    }

    try {
      const inst = await initInstance({ universe: UNIVERSE })
      await inst.messages().getAll()
    } catch (err) {
      expect(err.name).toBe('MessagesFetchFailed')
    }
  })
})
