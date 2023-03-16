import { Universe, UniverseBadRequestError, UniverseForbiddenError } from './index'
import { Client } from '../client'
import { StaffMessageTemplateFavorite } from 'src/entities/staff/staff'

describe('Universe: set hosting environment dynamically', () => {
  const client = Client.getInstance({

  })

  it('can assume production hosting environment ', () => {
    const universe = new Universe({
      name: 'dev',
      http: client,
      base: 'staging-4.hello.charles.com',
      user: {

      }
    })

    expect(universe.universeBase).toBe('https://dev.hello-charles.com')
    expect(universe.injectables.base).toBe('https://dev.hello-charles.com')
  })

  it('can override only hosting environment ', () => {
    const universe = new Universe({
      name: 'dev',
      universeHost: 'example.com',
      http: client,
      base: 'staging-4.hello.charles.com',
      user: {

      }
    })

    expect(universe.universeBase).toBe('https://dev.example.com')
    expect(universe.injectables.base).toBe('https://dev.example.com')
  })

  it('can override whole universe hosting domain ', () => {
    const universe = new Universe({
      name: 'dev',
      universeBase: 'http://localhost:4000',
      http: client,
      base: 'staging-4.hello.charles.com',
      user: {

      }
    })

    expect(universe.universeBase).toBe('http://localhost:4000')
    expect(universe.injectables.base).toBe('http://localhost:4000')
  })
})

const genUniverse = (params: {
  clientMockResolveValue?: any
  clientMockResolvedHeaders?: any
  universeCachedMeData?: any
} = {}): {
  universe: Universe
  clientMock: jest.Mock
} => {
  const clientMock = jest.fn()

  if (params.clientMockResolveValue || params.clientMockResolvedHeaders) {
    clientMock.mockResolvedValue({
      headers: params.clientMockResolvedHeaders,
      data: { data: params.clientMockResolveValue }
    })
  }

  const client = {
    getClient: () => clientMock
  } as unknown as Client

  const universe = new Universe({
    name: 'dev',
    http: client,
    base: 'staging-4.hello.charles.com',
    user: {}
  })

  if (params.universeCachedMeData) {
    (universe as any).me.cachedMeData = params.universeCachedMeData
  }

  return { universe, clientMock }
}

describe('Universe: feeds: can handle basic operations', () => {
  it('can fetch the number of unanswered feeds', async () => {
    const expectedCount = 4
    const { universe, clientMock } = genUniverse({
      clientMockResolvedHeaders: {
        'X-Resource-Count': expectedCount
      }
    })

    const actualCount = await universe.feeds.fetchUnansweredCount()
    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({
      method: 'HEAD',
      url: 'https://dev.hello-charles.com/api/v0/feeds',
      params: {
        answered: false,
        deleted: false,
        kind: ['Contact'],
        open: true
      }
    })

    expect(actualCount).toStrictEqual({ count: expectedCount })
  })

  it('can fetch the number of open feeds', async () => {
    const expectedCount = 4
    const { universe, clientMock } = genUniverse({
      clientMockResolvedHeaders: {
        'X-Resource-Count': expectedCount
      }
    })

    const actualCount = await universe.feeds.fetchOpenCount()
    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({
      method: 'HEAD',
      url: 'https://dev.hello-charles.com/api/v0/feeds',
      params: {
        deleted: false,
        kind: ['Contact'],
        open: true
      }
    })

    expect(actualCount).toStrictEqual({ count: expectedCount })
  })
})

describe('Universe: me: can handle basic operations', () => {
  beforeAll(() => jest.useFakeTimers().setSystemTime(new Date('1993-08-06')))
  afterAll(() => jest.useRealTimers())

  it('fetch method fetches user infos and caches the data', async () => {
    const expectedMe = { foo: 'bar' }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: expectedMe
    })

    expect((universe as any).me.cachedMeData).toBe(undefined)

    const actualMe = await universe.me.fetch()

    expect((universe as any).me.cachedMeData).toEqual(expectedMe)
    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({ method: 'GET', skipInterceptors: false, url: 'https://dev.hello-charles.com/api/v0/me' })
    expect(actualMe).toBe(expectedMe)
  })

  it('fetch method fetches user infos (despite existing cache) and updates the cache', async () => {
    const previousMe = { foo: 'a' }
    const updatedMe = { foo: 'b' }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: updatedMe,
      universeCachedMeData: previousMe
    })

    expect((universe as any).me.cachedMeData).toEqual(previousMe)

    const actualMe = await universe.me.fetch()

    expect((universe as any).me.cachedMeData).toEqual(updatedMe)
    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({ method: 'GET', skipInterceptors: false, url: 'https://dev.hello-charles.com/api/v0/me' })
    expect(actualMe).toBe(updatedMe)
  })

  it('getPatchConfig method fetches me data and returns expected config', async () => {
    const expectedMe = {
      staff: { id: 'EXPECTED_STAFF_ID' }
    }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: expectedMe
    })

    expect((universe as any).me.cachedMeData).toBe(undefined)

    const res = await (universe.me as any).getPatchConfig()

    expect((universe as any).me.cachedMeData).toEqual(expectedMe)
    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({ method: 'GET', skipInterceptors: false, url: 'https://dev.hello-charles.com/api/v0/me' })

    expect(res.meData).toBe(expectedMe)
    expect(res.staffRequestOpts).toEqual({
      method: 'PATCH',
      url: 'https://dev.hello-charles.com/api/v0/staff/EXPECTED_STAFF_ID',
      data: []
    })
  })

  it('getPatchConfig method relies on cachedMeData when existing and returns expected config', async () => {
    const expectedMe = {
      staff: { id: 'EXPECTED_STAFF_ID' }
    }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: expectedMe,
      universeCachedMeData: expectedMe
    })

    expect((universe as any).me.cachedMeData).toBe(expectedMe)

    const res = await (universe.me as any).getPatchConfig()

    expect((universe as any).me.cachedMeData).toEqual(expectedMe)
    expect(clientMock).toHaveBeenCalledTimes(0)

    expect(res.meData).toBe(expectedMe)
    expect(res.staffRequestOpts).toEqual({
      method: 'PATCH',
      url: 'https://dev.hello-charles.com/api/v0/staff/EXPECTED_STAFF_ID',
      data: []
    })
  })

  it('addTemplateFavorite method can add a template to an existing message_template_favorites and cache it', async () => {
    const previousFavorite = {
      id: 'MockId',
      created_at: 'MockTime',
      locale: 'fr'
    }

    const newFavorite = {
      id: 'MockId2',
      created_at: '1993-08-06T00:00:00.000Z',
      locale: 'de'
    }
    const previousPreferences = {
      message_template_favorites: [previousFavorite]
    }
    const previousMe = {
      user: 'UserId',
      staff: { id: 'EXPECTED_STAFF_ID', preferences: previousPreferences },
      preferences: previousPreferences
    }

    const expectedMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: [previousFavorite, newFavorite]
        }
      },
      preferences: {
        message_template_favorites: [previousFavorite, newFavorite]
      }
    }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: [expectedMe.staff],
      universeCachedMeData: previousMe
    })

    expect((universe as any).me.cachedMeData).toBe(previousMe)

    const res = await universe.me.addTemplateFavorite(newFavorite)

    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({
      data: [
        {
          op: 'add',
          path: '/preferences/message_template_favorites/-',
          value: newFavorite
        }
      ],
      method: 'PATCH',
      url: 'https://dev.hello-charles.com/api/v0/staff/EXPECTED_STAFF_ID'
    })
    expect(res).toStrictEqual(expectedMe)
    expect((universe as any).me.cachedMeData).toStrictEqual(expectedMe)
  })

  it('addTemplateFavorite method can add a template to an empty preferences object and cache it', async () => {
    const newFavorite = {
      id: 'MockId2',
      created_at: '1993-08-06T00:00:00.000Z',
      locale: 'de'
    }
    const previousPreferences = {
    }
    const previousMe = {
      user: 'UserId',
      staff: { id: 'EXPECTED_STAFF_ID', preferences: previousPreferences },
      preferences: previousPreferences
    }

    const expectedMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: [newFavorite]
        }
      },
      preferences: {
        message_template_favorites: [newFavorite]
      }
    }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: [expectedMe.staff],
      universeCachedMeData: previousMe
    })

    expect((universe as any).me.cachedMeData).toBe(previousMe)

    const res = await universe.me.addTemplateFavorite(newFavorite)

    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({
      data: [
        {
          op: 'add',
          path: '/preferences/message_template_favorites',
          value: []
        },
        {
          op: 'add',
          path: '/preferences/message_template_favorites/-',
          value: newFavorite
        }
      ],
      method: 'PATCH',
      url: 'https://dev.hello-charles.com/api/v0/staff/EXPECTED_STAFF_ID'
    })
    expect(res).toStrictEqual(expectedMe)
    expect((universe as any).me.cachedMeData).toStrictEqual(expectedMe)
  })

  it('addTemplateFavorite method errors when trying to add an 8th favorite', async () => {
    const favorites: StaffMessageTemplateFavorite[] = []

    for (let i = 1; i < 8; i++) {
      favorites.push({
        id: `MockId${i}`,
        created_at: 'datetime',
        locale: 'fr'
      })
    }
    const meData = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: favorites
        }
      },
      preferences: {
        message_template_favorites: favorites
      }
    }

    const { universe, clientMock } = genUniverse({
      universeCachedMeData: meData
    })
    const addReq: () => void = async () => await universe.me.addTemplateFavorite({
      id: 'MockId8',
      locale: 'de'
    })

    await expect(addReq).rejects.toThrow(UniverseBadRequestError)
    await expect(addReq).rejects.toThrow('Cannot have more than 7 message template favorites per user.')

    expect(clientMock).not.toHaveBeenCalled()
  })

  it('addTemplateFavorite method errors when trying to append a template which had already been favorited', async () => {
    const meData = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: [
            {
              id: 'MockId',
              created_at: 'datetime',
              locale: 'fr'
            }
          ]
        }
      },
      preferences: {
        message_template_favorites: [{
          id: 'MockId',
          created_at: 'datetime',
          locale: 'fr'
        }]
      }
    }

    const { universe, clientMock } = genUniverse({
      universeCachedMeData: meData
    })
    const addReq: () => void = async () => await universe.me.addTemplateFavorite({
      id: 'MockId',
      locale: 'fr'
    })

    await expect(addReq).rejects.toThrow(UniverseBadRequestError)
    await expect(addReq).rejects.toThrow('This template has already been added to favorites.')

    expect(clientMock).not.toHaveBeenCalled()
  })

  it('removeTemplateFavorite method can remove a template to an empty preferences object and cache it', async () => {
    const previousMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: [{
            id: 'MockId2',
            created_at: 'MockTime2',
            locale: 'de'
          }]
        }
      },
      preferences: {
        message_template_favorites: [{
          id: 'MockId2',
          created_at: 'MockTime2',
          locale: 'de'
        }]
      }
    }

    const expectedMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: []
        }
      },
      preferences: {
        message_template_favorites: []
      }
    }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: [expectedMe.staff],
      universeCachedMeData: previousMe
    })

    expect((universe as any).me.cachedMeData).toBe(previousMe)

    const res = await universe.me.removeTemplateFavorite({
      id: 'MockId2',
      created_at: 'MockTime2',
      locale: 'de'
    })

    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({
      data: [{
        op: 'replace',
        path: '/preferences/message_template_favorites',
        value: []
      }],
      method: 'PATCH',
      url: 'https://dev.hello-charles.com/api/v0/staff/EXPECTED_STAFF_ID'
    })
    expect(res).toStrictEqual(expectedMe)
    expect((universe as any).me.cachedMeData).toStrictEqual(expectedMe)
  })

  it('removeTemplateFavorite method returns undefined when preferences object does not contain a message_template_favorites property', async () => {
    const previousMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
        }
      },
      preferences: {}
    }

    const expectedMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {}
      },
      preferences: {}
    }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: [expectedMe.staff],
      universeCachedMeData: previousMe
    })

    expect((universe as any).me.cachedMeData).toBe(previousMe)

    const res = await universe.me.removeTemplateFavorite({
      id: 'MockId2',
      created_at: 'MockTime2',
      locale: 'de'
    })

    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({
      data: [{
        op: 'replace',
        path: '/preferences/message_template_favorites',
        value: undefined
      }],
      method: 'PATCH',
      url: 'https://dev.hello-charles.com/api/v0/staff/EXPECTED_STAFF_ID'
    })
    expect(res).toStrictEqual(expectedMe)
    expect((universe as any).me.cachedMeData).toStrictEqual(expectedMe)
  })

  it('removeTemplateFavorite method can remove multiple instances of the same template', async () => {
    const previousMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: [{
            id: 'MockId2',
            created_at: 'MockTime2',
            locale: 'de'
          },
          {
            id: 'MockId2',
            created_at: 'MockTime2',
            locale: 'de'
          }]
        }
      },
      preferences: {
        message_template_favorites: [{
          id: 'MockId2',
          created_at: 'MockTime2',
          locale: 'de'
        },
        {
          id: 'MockId2',
          created_at: 'MockTime2',
          locale: 'de'
        }]
      }
    }

    const expectedMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: []
        }
      },
      preferences: {
        message_template_favorites: []
      }
    }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: [expectedMe.staff],
      universeCachedMeData: previousMe
    })

    expect((universe as any).me.cachedMeData).toBe(previousMe)

    const res = await universe.me.removeTemplateFavorite({
      id: 'MockId2',
      created_at: 'MockTime2',
      locale: 'de'
    })

    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({
      data: [{
        op: 'replace',
        path: '/preferences/message_template_favorites',
        value: []
      }],
      method: 'PATCH',
      url: 'https://dev.hello-charles.com/api/v0/staff/EXPECTED_STAFF_ID'
    })
    expect(res).toStrictEqual(expectedMe)
    expect((universe as any).me.cachedMeData).toStrictEqual(expectedMe)
  })

  it('removeTemplateFavorite method only removes one locale of the same template', async () => {
    const previousMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: [{
            id: 'MockId2',
            created_at: 'MockTime2',
            locale: 'de'
          },
          {
            id: 'MockId2',
            created_at: 'MockTime2',
            locale: 'fr'
          }]
        }
      },
      preferences: {
        message_template_favorites: [{
          id: 'MockId2',
          created_at: 'MockTime2',
          locale: 'de'
        },
        {
          id: 'MockId2',
          created_at: 'MockTime2',
          locale: 'fr'
        }]
      }
    }

    const expectedMe = {
      user: 'UserId',
      staff: {
        id: 'EXPECTED_STAFF_ID',
        preferences: {
          message_template_favorites: [{
            id: 'MockId2',
            created_at: 'MockTime2',
            locale: 'fr'
          }]
        }
      },
      preferences: {
        message_template_favorites: [{
          id: 'MockId2',
          created_at: 'MockTime2',
          locale: 'fr'
        }]
      }
    }

    const { universe, clientMock } = genUniverse({
      clientMockResolveValue: [expectedMe.staff],
      universeCachedMeData: previousMe
    })

    expect((universe as any).me.cachedMeData).toBe(previousMe)

    const res = await universe.me.removeTemplateFavorite({
      id: 'MockId2',
      created_at: 'MockTime2',
      locale: 'de'
    })

    expect(clientMock).toHaveBeenCalledTimes(1)
    expect(clientMock).toHaveBeenCalledWith({
      data: [{
        op: 'replace',
        path: '/preferences/message_template_favorites',
        value: [{
          id: 'MockId2',
          created_at: 'MockTime2',
          locale: 'fr'
        }]
      }],
      method: 'PATCH',
      url: 'https://dev.hello-charles.com/api/v0/staff/EXPECTED_STAFF_ID'
    })
    expect(res).toStrictEqual(expectedMe)
    expect((universe as any).me.cachedMeData).toStrictEqual(expectedMe)
  })

  it('Template favorites methods error when user has no staff entity', async () => {
    const meData = {
      user: 'UserId',
      staff: {

      }
    }

    const { universe, clientMock } = genUniverse({
      universeCachedMeData: meData
    })

    const addReq: () => void = async () => await universe.me.addTemplateFavorite({
      id: 'MockId2',
      locale: 'de'
    })

    await expect(addReq).rejects.toThrow(UniverseForbiddenError)
    await expect(addReq).rejects.toThrow('User does not exist as a staff member.')

    const removeReq: () => void = async () => await universe.me.removeTemplateFavorite({
      id: 'MockId2',
      created_at: 'MockTime2',
      locale: 'de'
    })
    await expect(removeReq).rejects.toThrow(UniverseForbiddenError)
    await expect(removeReq).rejects.toThrow('User does not exist as a staff member.')
    expect(clientMock).not.toHaveBeenCalled()
  })
})
