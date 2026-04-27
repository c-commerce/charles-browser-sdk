import * as dotenv from 'dotenv'
import type { AxiosError, AxiosResponse } from 'axios'
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

      constructor (err?: Error | unknown, props? : BaseErrorV2Properties) {
        super(err as Error, props)
        Object.setPrototypeOf(this, V2MockErrorClass.prototype)
      }
    }

    {
      const err = new Error('some random error message') as AxiosError

      err.code = '500'
      err.response = {
        data: {

        }
      } as AxiosResponse

      const v2MockError = new V2MockErrorClass(err, { any: 'some random error message v2', prop: 'random.error.key.v2' })

      expect(v2MockError).toBeDefined()
      expect(v2MockError.name).toBeDefined()
      expect(v2MockError.message).toBeDefined()
      expect(v2MockError.message).toEqual('some random error message')
      expect(v2MockError.properties.any).toEqual('some random error message v2')
      expect(v2MockError.properties.prop).toEqual('random.error.key.v2')

      expect(v2MockError.hasHumanReadableAPIErrorMessage()).toBe(false)
      expect(v2MockError.humanReadableAPIErrorMessage).toBe(null)
    }

    {
      const err = new Error('some random error message') as AxiosError

      err.code = '500'
      err.response = {
        data: {
          errors: [
            {
              message: 'Some API message'
            }
          ]
        }
      } as AxiosResponse

      const v2MockError = new V2MockErrorClass(err, { any: 'some random error message v2', prop: 'random.error.key.v2' })

      expect(v2MockError).toBeDefined()
      expect(v2MockError.name).toBeDefined()
      expect(v2MockError.message).toBeDefined()
      expect(v2MockError.message).toEqual('some random error message')
      expect(v2MockError.properties.any).toEqual('some random error message v2')
      expect(v2MockError.properties.prop).toEqual('random.error.key.v2')

      expect(v2MockError.hasHumanReadableAPIErrorMessage()).toBe(true)
      expect(v2MockError.humanReadableAPIErrorMessage).toBe("Some API message")
    }

    {
      const v2MockError = new V2MockErrorClass()

      expect(v2MockError).toBeDefined()
      expect(v2MockError.name).toBeDefined()
      expect(v2MockError.message).toBeDefined()
      expect(v2MockError.message).toEqual('some random error message')
      expect(v2MockError.properties.error).toBeUndefined()

      expect(v2MockError.hasHumanReadableAPIErrorMessage()).toBe(false)
      expect(v2MockError.humanReadableAPIErrorMessage).toBeNull()
    }
  })
})
