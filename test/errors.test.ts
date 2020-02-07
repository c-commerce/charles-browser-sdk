import * as dotenv from 'dotenv'

dotenv.config()
import * as errors from '../src/errors'

describe('SDK: errors', () => {
  it('can instantiate error', () => {
    expect(new errors.BaseError('some new eror')).toBeDefined()
  })
})
