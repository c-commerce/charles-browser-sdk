import charles, { isEntity } from '../src/charles'
import { Product } from '../src/entities/product'
import { UniverseEntityOptions } from '../src/entities/_base'

charles.init({
  universe: 'https://staging-api.hello-charles.com'
})

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const mockUniverse = {
  universeBase: 'https://my-business.hello-charles.com'
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

describe('SDK util: util functions work as expected', () => {
  it('isEntity can check for entity', () => {
    const product = new Product({
      rawPayload: {
        id: '123456-123456'
      },
      universe: mockUniverse,
      http: mockHttp
    })

    expect(isEntity(product)).toBeTruthy()
    expect(isEntity(product.serialize())).toBeFalsy()
    expect(isEntity(false)).toBeFalsy()
    expect(isEntity(undefined)).toBeFalsy()
    expect(isEntity(null)).toBeFalsy()
    expect(isEntity({
      id: 'foo-bar',
      serialize: () => { }
    })).toBeFalsy()
  })

  it('Entity\'s static member isEntity can check for entity', () => {
    const product = new Product({
      rawPayload: {
        id: '123456-123456'
      },
      universe: mockUniverse,
      http: mockHttp
    })

    expect(Product.isEntity(product)).toBeTruthy()
    expect(Product.isEntity(product.serialize())).toBeFalsy()
    expect(Product.isEntity(false)).toBeFalsy()
    expect(Product.isEntity(undefined)).toBeFalsy()
    expect(Product.isEntity(null)).toBeFalsy()
    expect(Product.isEntity({
      id: 'foo-bar',
      serialize: () => { }
    })).toBeFalsy()
  })
})
