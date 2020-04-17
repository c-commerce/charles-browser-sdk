import * as dotenv from 'dotenv'
import * as errors from '../src/errors'

dotenv.config()

describe('SDK: errors', () => {
  it('can instantiate error', () => {
    expect(new errors.BaseError('some new eror')).toBeDefined()
  })
})
