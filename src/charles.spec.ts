import { Charles } from './charles'

describe('Name of the group', () => {
  it('can override host in factory after instantation', () => {
    const universeName = 'targetname'
    const inst = new Charles({
      universe: universeName,
      withCredentials: true
    })

    inst.init({

    })

    const universe = inst.universe(universeName, {
      universeHost: 'example.com'
    })

    expect(universe.universeBase).toBe('https://targetname.example.com')
    expect(universe.injectables.base).toBe('https://targetname.example.com')
  })

  it('can target prod env default ', () => {
    const universeName = 'targetname'
    const inst = new Charles({
      universe: universeName,
      withCredentials: true
    })

    inst.init({

    })

    const universe = inst.universe(universeName, {

    })

    expect(universe.universeBase).toBe('https://targetname.hello-charles.com')
    expect(universe.injectables.base).toBe('https://targetname.hello-charles.com')
  })

  it('can override universe URL on universe instantiation ', () => {
    const universeName = 'targetname'
    const inst = new Charles({
      universe: universeName,
      withCredentials: true
    })

    inst.init({

    })

    const universe = inst.universe(universeName, {
      universeBase: 'http://localhost:4000'
    })

    expect(universe.universeBase).toBe('http://localhost:4000')
    expect(universe.injectables.base).toBe('http://localhost:4000')
  })
})
