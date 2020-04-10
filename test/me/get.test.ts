import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import * as universe from '../../src/universe/index'
import { stubUniverse } from '../util'

// const legacyId = '4564'

const mock = new MockAdapter(axios)

describe('v0: Me: can get me data', () => {
  beforeEach(() => {
    mock.reset()
    mock.resetHandlers()
  })

  it('Charles\'s Me is instantiable', async () => {
    mock
      .onGet(`https://stub-universe.hello-charles.com/api/v0/me`)
      .reply(function (config) {
        return [
          200,
          {
            data: {
              'user': {
                'sub': 'SOME_USER_ID',
                'roles': [
                  'user',
                  'organization:owner'
                ],
                'permissions': [
                  'user',
                  'universes:admin'
                ],
                'email': 'USER@hey-charles.com'
              },
              'permissions': [],
              'roles': [],
              'staff': {
                'id': 'SOME_STAFF_ID',
                'created_at': '2020-04-10T19:18:01.604Z',
                'updated_at': '2020-04-10T19:18:01.604Z',
                'deleted': false,
                'active': true,
                'first_name': 'FIRSTNAME',
                'middle_name': null,
                'display_name': null,
                'last_name': null,
                'comment': null,
                'type': null,
                'user': 'SOME_USER_ID',
                'permissions': [
                ],
                'roles': [
                  'agent'
                ]
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
    expect(meData?.user.sub).toBe('SOME_USER_ID')
    expect(meData?.staff.id).toBe('SOME_STAFF_ID')
  })

  it('Charles\'s return unautenticated on 401s', async () => {
    mock
      .onGet(`https://stub-universe.hello-charles.com/api/v0/me`)
      .reply(function (config) {
        return [
          401,
          {

          }
        ]
      })

    const universeStub = stubUniverse()

    expect(universeStub.universe.me()).rejects.toBeInstanceOf(universe.UniverseUnauthenticatedError)
  })

  it('Charles\'s return on anything else', async () => {
    mock
      .onGet(`https://stub-universe.hello-charles.com/api/v0/me`)
      .reply(function (config) {
        return [
          500,
          {

          }
        ]
      })

    const universeStub = stubUniverse()

    expect(universeStub.universe.me()).rejects.toBeInstanceOf(universe.UniverseMeError)
  })
})
