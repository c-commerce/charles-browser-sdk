import { environment } from '../src/environment'

describe('SDK: environemt', () => {
  it('Will have set environment version at compile time', () => {
    expect(environment).toBeDefined()
    expect(environment.VERSION).toBeDefined()
    expect(environment.VERSION).toBe(process.env.npm_package_version)
  })
})
