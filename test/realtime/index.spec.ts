import * as dotenv from 'dotenv'
dotenv.config()
import ThRealtime from '../../src/realtime'

describe('SDK: client: can instantiate SDK client', () => {
  it('CharlesRealtime instantiable', () => {
    const realtime = new ThRealtime()
    expect(realtime).toBeInstanceOf(ThRealtime)
    expect(realtime.isInitialized()).toBe(true)
  })
})
