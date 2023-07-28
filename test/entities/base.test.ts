import { UniverseEntityOptions } from '../../src/entities/_base'
import Cls from './__mocks__/entity-class'

describe('Entities: base', () => {
  it('can instantiate and prepare data correctly', async () => {
    const obj = {
      id: '1234',
      name: null
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockUniverse = {
      universeBase: 'https://my-business.hello-charles.com',
      injectables: {
        base: 'https://my-business.hello-charles.com'
      }
    } as UniverseEntityOptions['universe']

    const mockCallback = jest.fn((opts: object) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        responseStatus: 200,
        data: {
          data: [
            {
              id: '1234',
              name: 'new name'
            }
          ]
        }
      } as object
    })

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockHttp = {
      getClient () {
        return (opts: object) => {
          return mockCallback(opts)
        }
      }
    } as UniverseEntityOptions['http']

    const inst = new Cls({
      rawPayload: obj,
      universe: mockUniverse,
      http: mockHttp
    })

    expect(inst).toBeInstanceOf(Cls)
    expect(inst.delete).toBeInstanceOf(Function)
    expect(inst.save).toBeInstanceOf(Function)
    expect(inst.patch).toBeInstanceOf(Function)
    expect(inst.post).toBeInstanceOf(Function)
    expect(inst.fetch).toBeInstanceOf(Function)
    expect(inst.serialize()).toStrictEqual({ id: '1234', name: null })

    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(inst['_rawPayload']).toStrictEqual({ id: '1234', name: null })

    await inst.patch({ name: 'new name' })

    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      data: [
        { op: 'replace', path: '/name', value: 'new name' }
      ],
      headers: {
        'Content-Type': 'application/json-patch+json'
      },
      method: 'PATCH',
      responseType: 'json',
      url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
    })

    expect(inst.serialize()).toStrictEqual({ id: '1234', name: 'new name' })

    await inst.fetch()

    expect(mockCallback.mock.calls.length).toBe(2)
    expect(mockCallback.mock.calls[1][0]).toStrictEqual({
      data: undefined,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'GET',
      responseType: 'json',
      url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
    })

    expect(inst.serialize()).toStrictEqual({ id: '1234', name: 'new name' })

    await inst.delete()

    expect(mockCallback.mock.calls.length).toBe(3)
    expect(mockCallback.mock.calls[2][0]).toStrictEqual({
      data: undefined,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'DELETE',
      responseType: 'json',
      url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
    })

    const postableMockCallback = jest.fn((opts: object) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        responseStatus: 200,
        data: {
          data: [
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            {
              id: '5678',
              name: 'something'
            } as object
          ]
        }
      } as object
    })

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const postableMockHttp = {
      getClient () {
        return (opts: object) => {
          return postableMockCallback(opts)
        }
      }
    } as UniverseEntityOptions['http']

    const instPostable = new Cls({
      rawPayload: {
        name: 'something'
      },
      universe: mockUniverse,
      http: postableMockHttp
    })

    expect(instPostable).toBeInstanceOf(Cls)
    expect(instPostable.delete).toBeInstanceOf(Function)
    expect(instPostable.save).toBeInstanceOf(Function)
    expect(instPostable.patch).toBeInstanceOf(Function)
    expect(instPostable.post).toBeInstanceOf(Function)
    expect(instPostable.serialize()).toStrictEqual({ id: undefined, name: 'something' })

    await instPostable.post()
    expect(postableMockCallback.mock.calls.length).toBe(1)
    expect(postableMockCallback.mock.calls[0][0]).toStrictEqual({
      data: {
        name: 'something'
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'POST',
      responseType: 'json',
      url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint'
    })

    expect(instPostable.serialize()).toStrictEqual({ id: '5678', name: 'something' })
  })

  it('can handle undefined patches', async () => {
    const obj = {
      id: '1234',
      name: null
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockUniverse = {
      universeBase: 'https://my-business.hello-charles.com',
      injectables: {
        base: 'https://my-business.hello-charles.com'
      }
    } as UniverseEntityOptions['universe']

    const mockCallback = jest.fn((opts: object) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        responseStatus: 200,
        data: {
          data: [
            {
              id: '1234',
              name: 'new name'
            }
          ]
        }
      } as object
    })

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockHttp = {
      getClient () {
        return (opts: object) => {
          return mockCallback(opts)
        }
      }
    } as UniverseEntityOptions['http']

    const inst = new Cls({
      rawPayload: obj,
      universe: mockUniverse,
      http: mockHttp
    })

    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(inst['_rawPayload']).toStrictEqual({ id: '1234', name: null })

    await inst.patch({ name: 'new name', newField: undefined } as any)

    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      data: [
        { op: 'replace', path: '/name', value: 'new name' },
        { op: 'add', path: '/newField', value: null }
      ],
      headers: {
        'Content-Type': 'application/json-patch+json'
      },
      method: 'PATCH',
      responseType: 'json',
      url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
    })

    mockCallback.mockClear()

    await inst.patch({ name: undefined } as any)

    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      data: [
        { op: 'replace', path: '/name', value: null }
      ],
      headers: {
        'Content-Type': 'application/json-patch+json'
      },
      method: 'PATCH',
      responseType: 'json',
      url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
    })

    mockCallback.mockReset()
  })
})
