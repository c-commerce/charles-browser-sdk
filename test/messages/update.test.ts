import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/charles'
import { initInstance } from '../util'
dotenv.config()

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const messageId = 'asdf5566'
const updateObject = {
  read: true
}

const UNIVERSE = 'some-universe'

describe('v0: Messages: can alter a message', () => {
  it("Charles 's messages are instantiable", async () => {
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
        .onPut(`https://${UNIVERSE}.hello-charles.com/api/v0/messages/${messageId}`)
        .reply(function (config) {
          return [
            200,
            {
              count: 1,
              data: [updateObject]
            }
          ]
        })
    }

    const inst = await initInstance({ universe: UNIVERSE })

    const messages = inst.messages()

    expect(messages).toBeInstanceOf(v0.Messages)

    const { data } = await messages.update(messageId, updateObject)

    expect(data).toMatchObject(updateObject)
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
      mock
        .onPut(`https:/${UNIVERSE}./hello-charles.com/api/v0/message/${messageId}`)
        .reply(function (config) {
          return [205]
        })
    }

    const inst = await initInstance({ universe: UNIVERSE })

    try {
      await inst.messages().update(messageId, updateObject)
    } catch (err: any) {
      expect(err.name).toBe('MessageUpdateFailed')
    }
  })
})
