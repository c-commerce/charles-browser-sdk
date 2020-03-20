import Entity, { EntityOptions } from '../../src/entities/_base'

describe('Entities: base', () => {
  it('can instantiate', () => {
    interface ClsOptions extends EntityOptions {
      rawPayload: ClsRawPayload
    }

    interface ClsRawPayload {
      id?: string
    }

    interface ClsPayload {
      id?: string
    }

    class Cls extends Entity<ClsPayload, ClsRawPayload> {
      public id?: ClsPayload['id']
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
        this.id = p.id

        return this
      }

      public serialize(): ClsRawPayload {
        return {
          id: this.id
        }
      }
    }

    const obj = {
      id: '1234'
    }

    const mockUniverse = {
      universeBase: 'https://my-business.hello-charles.com'
    } as EntityOptions['universe']

    const mockHttp = {
      getClient() {
        return (opts: object) => {
          //
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
  })
})
