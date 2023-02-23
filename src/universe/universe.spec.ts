import { MeData, Universe, UniverseBadRequestError, UniverseForbiddenError } from './index'
import { Client } from '../client'
import { StaffMessageTemplateFavorite } from 'src/entities/staff/staff'
import { AxiosRequestConfig } from 'axios'

jest.mock('../client', () => ({
  Client: {
    getInstance: jest.fn().mockReturnValue({
      getClient: () => (opts: AxiosRequestConfig) => {
        if (opts.method === 'GET' && opts.url?.includes('api/v0/me')) {
          return ({ data: { data: genMockedMe() } })
        } else if (opts.method === 'PATCH' && opts.url?.includes('api/v0/staff')) {
          const mockedMe = genMockedMe()

          for (const d of opts.data) {
            const patchOp = d as OpPatch
            if (patchOp.op === 'add' && Array.isArray(patchOp.value) && patchOp.value.length === 0) {
              mockedMe.preferences = {
                message_template_favorites: []
              }
            } else if (patchOp.op === 'add' && patchOp.path === '/preferences/message_template_favorites/-') {
              mockedMe.preferences?.message_template_favorites?.push(patchOp.value)
            } else if (patchOp.op === 'replace' && mockedMe.preferences) {
              mockedMe.preferences.message_template_favorites = patchOp.value
            }
          }

          return ({ data: { data: [mockedMe] } })
        }
      }
    })
  }
}))

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

const genMockedFavorite = (n = 1): StaffMessageTemplateFavorite => ({
  id: `MockId${n}`,
  created_at: '2023-02-24T18:29:09.122Z',
  locale: 'fr'
})

const genMockedFavorites = (n = 0): StaffMessageTemplateFavorite[] => {
  const result: StaffMessageTemplateFavorite[] = []
  for (let index = 0; index < n; index++) {
    result.push(genMockedFavorite(index + 1))
  }
  return result
}

const genMockedMe = (n?: number): MeData => ({
  user: {
    sub: '543554a8-9b06-47eb-9ba0-3329bc260be3',
    email: 'mock_email',
    authenticated: true
  },
  permissions: [],
  roles: [
    'admin'
  ],
  preferences: {
    message_template_favorites: n ? genMockedFavorites(n) : undefined
  },
  staff: {
    id: '467bb596-241c-4c3f-ab7a-fa2ff845d995',
    created_at: '2023-02-02T12:41:29.354Z',
    updated_at: '2023-02-24T14:18:50.157Z',
    deleted: false,
    active: true,
    first_name: 'Support',
    display_name: 'CHARLES Support',
    last_name: 'CHARLES',
    type: 'agent',
    user: '21cafad5-7990-4f74-a6a0-56abc0fc77aa',
    permissions: [],
    roles: [
      'admin'
    ],
    invite: null,
    gender: 'male',
    preferences: {
      message_template_favorites: n ? genMockedFavorites(n) : undefined
    }
  }
})

describe('Universe: me: can handle basic operations', () => {
  const client = Client.getInstance({
  })
  const universe = new Universe({
    name: 'dev',
    http: client,
    base: 'staging-4.hello.charles.com',
    user: {

    }
  })

  beforeEach(() => {
    (universe as any)._cachedMeData = genMockedMe()
  })
  it('Me method returns user infos', async () => {
    const me = await universe.me()

    expect(me).toStrictEqual(genMockedMe())
  })

  it('_getMePatchConfig property generates base request config', async () => {
    const mockedMe = genMockedMe()
    const res = await universe.me._getPatchConfig()

    expect(res.meData).toStrictEqual(genMockedMe())
    expect(res.staffRequestOpts).not.toBe(null)
    expect(res.staffRequestOpts)

    expect(res.staffRequestOpts).toEqual({
      method: 'PATCH',
      url: `${universe.universeBase}/api/v0/staff/${mockedMe.staff.id ?? ''}`,
      data: []
    })
  })

  it('can add a template to favorites', async () => {
    const favorite = genMockedFavorite()
    const res = await universe.me.addTemplateFavorite(favorite)

    expect(res.preferences?.message_template_favorites?.[0]).toStrictEqual(favorite)
  })

  it('can remove a template from favorites', async () => {
    const mockedMe = genMockedMe()
    const mockedPatchConfig = jest.fn().mockResolvedValue({
      meData: genMockedMe(2),
      staffRequestOpts: {
        method: 'PATCH',
        url: `${universe.universeBase}/api/v0/staff/${mockedMe.staff.id ?? ''}`,
        data: []
      }
    })
    universe.me._getPatchConfig = mockedPatchConfig

    const { meData } = await universe.me._getPatchConfig()
    expect(meData.preferences).toStrictEqual({
      message_template_favorites: [
        {
          id: 'MockId1',
          created_at: '2023-02-24T18:29:09.122Z',
          locale: 'fr'
        },
        {
          id: 'MockId2',
          created_at: '2023-02-24T18:29:09.122Z',
          locale: 'fr'
        }
      ]
    })

    const res = await universe.me.removeTemplateFavorite('MockId1')
    expect(res.preferences).toStrictEqual({
      message_template_favorites: [
        {
          id: 'MockId2',
          created_at: '2023-02-24T18:29:09.122Z',
          locale: 'fr'
        }
      ]
    })
  })

  it('errors when trying to favorite more than 7 templates', async () => {
    const mockedMe = genMockedMe()
    const mockedPatchConfig = jest.fn().mockResolvedValue({
      meData: genMockedMe(7),
      staffRequestOpts: {
        method: 'PATCH',
        url: `${universe.universeBase}/api/v0/staff/${mockedMe.staff.id ?? ''}`,
        data: []
      }
    })
    universe.me._getPatchConfig = mockedPatchConfig

    const { meData } = await universe.me._getPatchConfig()
    expect(meData.preferences?.message_template_favorites?.length).toBe(7)

    const req: () => void = async () => await universe.me.addTemplateFavorite(genMockedFavorite(8))
    await expect(req).rejects.toThrow(UniverseBadRequestError)
    await expect(req).rejects.toThrow('Cannot have more than 7 message template favorites per user.')
  })

  it('errors when trying to favorite a template which has already been favorited', async () => {
    const mockedMe = genMockedMe()
    const mockedPatchConfig = jest.fn().mockResolvedValue({
      meData: genMockedMe(1),
      staffRequestOpts: {
        method: 'PATCH',
        url: `${universe.universeBase}/api/v0/staff/${mockedMe.staff.id ?? ''}`,
        data: []
      }
    })
    universe.me._getPatchConfig = mockedPatchConfig

    const { meData } = await universe.me._getPatchConfig()
    expect(meData.preferences?.message_template_favorites?.length).toBe(1)

    const req: () => void = async () => await universe.me.addTemplateFavorite(genMockedFavorite(1))
    await expect(req).rejects.toThrow(UniverseBadRequestError)
    await expect(req).rejects.toThrow('This template has already been added to favorites.')
  })

  it('errors when user has no staff id', async () => {
    const mockedPatchConfig = jest.fn().mockResolvedValue({
      meData: genMockedMe(1),
      staffRequestOpts: null
    })
    universe.me._getPatchConfig = mockedPatchConfig

    const addReq: () => void = async () => await universe.me.addTemplateFavorite(genMockedFavorite(2))
    await expect(addReq).rejects.toThrow(UniverseForbiddenError)
    await expect(addReq).rejects.toThrow('User does not exist as a staff member.')

    const removeReq: () => void = async () => await universe.me.removeTemplateFavorite('MockId1')
    await expect(removeReq).rejects.toThrow(UniverseForbiddenError)
    await expect(removeReq).rejects.toThrow('User does not exist as a staff member.')
  })

  it('_patchMeStaffPreferences caches properly', async () => {
    const mockedMe = genMockedMe()

    expect((universe as any)._cachedMeData.preferences.message_template_favorites).toBeUndefined()

    await universe.me._patchMeStaffPreferences({
      method: 'PATCH',
      url: `${universe.universeBase}/api/v0/staff/${mockedMe.staff.id ?? ''}`,
      data: [
        {
          op: 'add',
          path: '/preferences/message_template_favorites',
          value: []
        },
        {
          op: 'add',
          path: '/preferences/message_template_favorites/-',
          value: genMockedFavorite(1)
        }
      ]
    })

    expect((universe as any)._cachedMeData.preferences.message_template_favorites.length).toBe(1)
    expect((universe as any)._cachedMeData.preferences.message_template_favorites[0]).toStrictEqual(genMockedFavorite(1))
  })

  it('_getPatchConfig relies on cache', async () => {
    const mockedMe = genMockedMe()

    expect((universe as any)._cachedMeData.preferences.message_template_favorites).toBeUndefined()
    const setCacheSpy = jest.spyOn(universe as any, 'setCachedMeData')

    await universe.me._patchMeStaffPreferences({
      method: 'PATCH',
      url: `${universe.universeBase}/api/v0/staff/${mockedMe.staff.id ?? ''}`,
      data: [
        {
          op: 'add',
          path: '/preferences/message_template_favorites',
          value: []
        },
        {
          op: 'add',
          path: '/preferences/message_template_favorites/-',
          value: genMockedFavorite(1)
        }
      ]
    })
    expect(setCacheSpy).toHaveBeenCalledTimes(1)

    await universe.me._getPatchConfig()
    expect(setCacheSpy).toHaveBeenCalledTimes(1)
  })
})
