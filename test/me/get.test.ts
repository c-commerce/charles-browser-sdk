/* eslint-disable @typescript-eslint/no-floating-promises */
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as universe from '../../src/universe/index'
import { stubUniverse } from '../util'
dotenv.config()

const mock = new MockAdapter(axios)

const mockMe = (code: number): void => {
  mock
    .onGet('https://stub-universe.hello-charles.com/api/v0/me')
    .reply(function (config) {
      return [code, {}]
    })
}

describe('v0: Me: can get me data', () => {
  beforeEach(() => {
    mock.reset()
    mock.resetHandlers()
  })

  it('Charles\'s Me is instantiable', async () => {
    mock
      .onGet('https://stub-universe.hello-charles.com/api/v0/me')
      .reply(function (config) {
        return [
          200,
          {
            data: {
              user: {
                sub: 'SOME_USER_ID',
                roles: [
                  'user',
                  'organization:owner'
                ],
                permissions: [
                  'user',
                  'universes:admin'
                ],
                email: 'USER@hey-charles.com'
              },
              permissions: [],
              roles: [],
              preferences: {
                message_template_favorites: [
                  {
                    id: 'MOCK_TEMP_1'
                  },
                  {
                    id: 'MOCK_TEMP_2'
                  }
                ]
              },
              staff: {
                id: 'SOME_STAFF_ID',
                created_at: '2020-04-10T19:18:01.604Z',
                updated_at: '2020-04-10T19:18:01.604Z',
                deleted: false,
                active: true,
                first_name: 'FIRSTNAME',
                middle_name: null,
                display_name: null,
                last_name: null,
                comment: null,
                type: null,
                user: 'SOME_USER_ID',
                permissions: [
                ],
                roles: [
                  'agent'
                ],
                preferences: {
                  message_template_favorites: [
                    {
                      id: 'MOCK_TEMP_1'
                    },
                    {
                      id: 'MOCK_TEMP_2'
                    }
                  ]
                }
              }
            }
          }
        ]
      })

    const universeStub = stubUniverse()

    const meData = await universeStub.universe.me()

    expect(meData).toBeDefined()
    expect(meData?.staff).toBeDefined()
    expect(meData?.user).toBeDefined()
    expect(meData?.preferences).toBeDefined()
    expect(meData?.user.sub).toBe('SOME_USER_ID')
    expect(meData?.staff.id).toBe('SOME_STAFF_ID')
    expect(meData?.staff.preferences?.message_template_favorites?.length).toBe(2)
  })

  test.each`
    code   | expected
    ${401} | ${universe.UniverseUnauthenticatedError}
    ${403} | ${universe.UniverseForbiddenError}
    ${502} | ${universe.UniverseBadGatewayError}
    ${503} | ${universe.UniverseServiceUnavailableError}
    ${504} | ${universe.UniverseTimeoutError}
    ${500} | ${universe.UniverseMeError}
  `('returns exception $expected when the error code is $code', async ({ code, expected }) => {
    mockMe(code)
    await expect(stubUniverse().universe.me()).rejects.toBeInstanceOf(expected)
  })
})
