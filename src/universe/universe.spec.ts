import { Universe } from './index'
import { Client } from '../client'

describe('Universe: set hosting environment dynamically', () => {
  const client = Client.getInstance({

  })

  it('can assume production hosting environment ', () => {
    const universe = new Universe({
      name: 'dev',
      http: client,
      base: 'staging-4.hello.charles.com',
      user: {

      }
    })

    expect(universe.universeBase).toBe('https://dev.hello-charles.com')
    expect(universe.injectables.base).toBe('https://dev.hello-charles.com')
  })
  it('can override only hosting environment ', () => {
    const universe = new Universe({
      name: 'dev',
      universeHost: 'example.com',
      http: client,
      base: 'staging-4.hello.charles.com',
      user: {

      }
    })

    expect(universe.universeBase).toBe('https://dev.example.com')
    expect(universe.injectables.base).toBe('https://dev.example.com')
  })

  it('can override whole universe hosting domain ', () => {
    const universe = new Universe({
      name: 'dev',
      universeBase: 'http://localhost:4000',
      http: client,
      base: 'staging-4.hello.charles.com',
      user: {

      }
    })

    expect(universe.universeBase).toBe('http://localhost:4000')
    expect(universe.injectables.base).toBe('http://localhost:4000')
  })
})
