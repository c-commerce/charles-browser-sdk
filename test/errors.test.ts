import * as dotenv from 'dotenv'
import { BaseError, BaseErrorV2, BaseErrorV2Properties } from '../src/errors'

dotenv.config()

describe('SDK: errors', () => {
  it('can instantiate V1 error', () => {
    expect(new BaseError('some new eror')).toBeDefined()
  })

  it('can instantiate V2 error', () => {
    class V2MockErrorClass extends BaseErrorV2 {
      public name = 'V2MockErrorClass'
      public message = 'some random error message'

      constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
        super(err as Error, props)
        Object.setPrototypeOf(this, V2MockErrorClass.prototype)
      }
    }

    const v2MockError = new V2MockErrorClass(new Error('some random error message'), { message: 'some random error message v2', key: 'random.error.key.v2' })

    expect(v2MockError).toBeDefined()
    expect(v2MockError.name).toBeDefined()
    expect(v2MockError.message).toBeDefined()
    expect(v2MockError.message).toEqual('some random error message')
    expect(v2MockError.properties.message).toEqual('some random error message v2')
    expect(v2MockError.properties.key).toEqual('random.error.key.v2')
    expect(v2MockError.hasHumanReadableAPIErrorMessage).toBeTruthy()
  })
})
