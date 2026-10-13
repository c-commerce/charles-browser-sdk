import { v4 } from '../uuid'

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('helpers: uuid', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns a UUID v4 string via randomUUID', () => {
    const spy = jest.spyOn(globalThis.crypto, 'randomUUID')

    const id = v4()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(id).toMatch(UUID_V4_REGEX)
  })

  it('falls back to getRandomValues when randomUUID is unavailable', () => {
    // randomUUID lives on the Crypto prototype: shadow it on the instance, delete the shadow to restore
    Object.defineProperty(globalThis.crypto, 'randomUUID', { value: undefined, configurable: true })
    const spy = jest.spyOn(globalThis.crypto, 'getRandomValues')

    try {
      const id = v4()

      expect(spy).toHaveBeenCalledTimes(1)
      expect(id).toMatch(UUID_V4_REGEX)
    } finally {
      delete (globalThis.crypto as any).randomUUID
    }
  })
})
