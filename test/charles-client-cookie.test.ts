import * as dotenv from 'dotenv'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
import { CharlesClient, v0 } from '../src/charles'
import { Client } from '../src/client'
dotenv.config()

describe('SDK: client: can instantiate SDK client with cookie auth', () => {
  it('CharlesClient is instantiable', () => {
    const options = {
      withCredentials: true,
      base: process.env.CHARLES_BASE
    }

    const inst = new CharlesClient(options)
    expect(inst).toBeInstanceOf(CharlesClient)
    expect(inst.auth.authenticated).toBe(true)
  })

  it('CharlesClient is inittable', () => {
    const options = {
      withCredentials: true,
      base: process.env.CHARLES_BASE
    }

    const charles = new CharlesClient(options)

    charles.init()

    expect(charles.auth).toBeInstanceOf(v0.Auth)
    expect(charles.auth.options.type).toBe(6)
    expect(charles.http).toBeInstanceOf(Client)
    expect(charles.http?.getClient().defaults.withCredentials).toBe(true)

    expect(charles.auth.authenticated).toBe(true)
  })
})
