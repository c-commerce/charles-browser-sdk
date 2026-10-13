import { v4 } from '../../src/helpers/uuid'

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('helpers: uuid', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns a UUID v4 string', () => {
    expect(v4()).toMatch(UUID_V4_REGEX)
  })

  it('delegates to crypto.randomUUID', () => {
    const spy = jest.spyOn(globalThis.crypto, 'randomUUID')

    const id = v4()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(id).toMatch(UUID_V4_REGEX)
  })

  it('returns a different value on each call', () => {
    expect(v4()).not.toEqual(v4())
  })
})
