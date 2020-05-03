import Entity, { EntityOptions } from '../../src/entities/_base'

describe('Entities: base', () => {
  it('can instantiate and prepare data correctly', async () => {
    interface ClsOptions extends EntityOptions {
      rawPayload: ClsRawPayload
    }

    interface ClsRawPayload {
      id?: string
      name?: string | null
    }

    interface ClsPayload {
      id?: string
      name?: string | null
    }

    class Cls extends Entity<ClsPayload, ClsRawPayload> {
      public id?: ClsPayload['id']
      public name?: ClsPayload['name']

      protected universe: EntityOptions['universe']
      protected http: EntityOptions['http']
      protected options: ClsOptions
      public initialized: boolean

      public endpoint: string

      constructor (options: ClsOptions) {
        super()
        this.universe = options.universe
        this.endpoint = 'api/v0/cls_endpoint'
        this.http = options.http
        this.options = options
        this.initialized = options.initialized ?? false

        if (options?.rawPayload) {
          this.deserialize(options.rawPayload)
        }
      }

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      protected deserialize (p: ClsRawPayload) {
        this.setRawPayload(p)

        this.id = p.id
        this.name = p.name

        return this
      }

      public serialize (): ClsRawPayload {
        return {
          id: this.id,
          name: this.name
        }
      }
    }

    const obj = {
      id: '1234',
      name: null
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockUniverse = {
      universeBase: 'https://my-business.hello-charles.com'
    } as EntityOptions['universe']

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
    } as EntityOptions['http']

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

    // eslint-disable-next-line dot-notation
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
    } as EntityOptions['http']

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
})
