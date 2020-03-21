import Entity, { EntityOptions } from '../../src/entities/_base'

describe('Entities: base', () => {
  it('can instantiate and prepare data correctly', async () => {
    interface ClsOptions extends EntityOptions {
      rawPayload: ClsRawPayload
    }

    interface ClsRawPayload {
      id?: string
      name?: string
    }

    interface ClsPayload {
      id?: string
      name?: string
    }

    class Cls extends Entity<ClsPayload, ClsRawPayload> {
      public id?: ClsPayload['id']
      public name?: ClsPayload['name']

      protected universe: EntityOptions['universe']
      protected http: EntityOptions['http']
      protected options: ClsOptions
      public initialized: boolean

      public endpoint: string

      constructor(options: ClsOptions) {
        super()
        this.universe = options.universe
        this.endpoint = 'api/v0/cls_endpoint'
        this.http = options.http
        this.options = options
        this.initialized = options.initialized || false

        if (options && options.rawPayload) {
          this.deserialize(options.rawPayload)
        }
      }

      protected deserialize(p: ClsRawPayload) {
        this.setRawPayload(p)

        this.id = p.id
        this.name = p.name

        return this
      }

      public serialize(): ClsRawPayload {
        return {
          id: this.id,
          name: this.name
        }
      }
    }

    const obj = {
      id: '1234',
      name: undefined
    }

    const mockUniverse = {
      universeBase: 'https://my-business.hello-charles.com'
    } as EntityOptions['universe']

    const mockCallback = jest.fn((opts: object) => {
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

    const mockHttp = {
      getClient() {
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
    expect(inst.patch).toBeInstanceOf(Function)
    expect(inst.serialize()).toStrictEqual({ id: '1234', name: undefined })

    await inst.patch({ name: 'new name' })

    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      data: [
        { 'op': 'replace', 'path': '/name', 'value': 'new name' }
      ],
      headers: {
        'Content-Type': 'application/json-patch+json'
      },
      method: 'PATCH',
      responseType: 'json',
      url: 'https://my-business.hello-charles.com/api/v0/cls_endpoint/1234'
    })

    expect(inst.serialize()).toStrictEqual({ id: '1234', name: 'new name' })
  })
})
