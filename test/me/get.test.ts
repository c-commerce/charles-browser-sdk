// import * as dotenv from 'dotenv'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// dotenv.config()
// import { v0 } from '../../src/charles'
// import { initInstance } from '../util'

// const legacyId = '4564'

// const mock = new MockAdapter(axios)
// afterEach(() => {
//   mock.reset()
// })

// const meResponse = {
//   role: 'owner',
//   scopes: ['products:read', 'products:create', 'products:delete']
// }

describe.skip('v0: Me: can get me data', () => {
  it('skip', () => {
    //
  })
  //   it("Charles's Me is instantiable", async () => {
  //     if (process.env.SYSTEM_TEST !== 'true') {
  //       mock
  //         .onPost('https://hello-charles.com/api/v0/users/auth/login')
  //         .reply(function (config) {
  //           return [
  //             200,
  //             {
  //               data: {
  //                 id: '123',
  //                 access_token: 'mockToken',
  //                 roles: [],
  //                 permissions: []
  //               }
  //             }
  //           ]
  //         })

  //       mock
  //         .onGet(`https://api.hello-charles.com/api/v0/me`)
  //         .reply(function (config) {
  //           return [
  //             200,
  //             {
  //               count: 1,
  //               results: [meResponse]
  //             }
  //           ]
  //         })
  //     }

  //     const inst = await initInstance()

  //     const Me = inst.me()

  //     expect(Me).toBeInstanceOf(v0.Me)

  //     const { data } = await Me.get()

  //     expect(data).toMatchObject(meResponse)
  //   })

  //   it('rejects on status codes that are not 200', async () => {
  //     if (process.env.SYSTEM_TEST !== 'true') {
  //       mock
  //         .onPost('https://hello-charles.com/api/v0/users/auth/login')
  //         .reply(function (config) {
  //           return [
  //             200,
  //             {
  //               data: {
  //                 id: '123',
  //                 access_token: 'mockToken',
  //                 roles: [],
  //                 permissions: []
  //               }
  //             }
  //           ]
  //         })

  //       mock
  //         .onGet(`https://api.hello-charles.com/api/v0/me`)
  //         .reply(function (config) {
  //           return [205]
  //         })
  //     }

  //     try {
  //       const inst = await initInstance()
  //       await inst.me().get()
  //     } catch (err) {
  //       expect(err.name).toBe('MeFetchFailed')
  //     }
  //   })

  //   it('can send errors attached to the response', async () => {
  //     const errorsArr = [
  //       {
  //         id: '1234',
  //         label: 'some.error.key',
  //         errorDetails: { msg: 'Error message' }
  //       }
  //     ]

  //     if (process.env.SYSTEM_TEST !== 'true') {
  //       mock
  //         .onPost('https://hello-charles.com/api/v0/users/auth/login')
  //         .reply(function (config) {
  //           return [
  //             200,
  //             {
  //               data: {
  //                 id: '123',
  //                 access_token: 'mockToken',
  //                 roles: [],
  //                 permissions: []
  //               }
  //             }
  //           ]
  //         })

  //       mock.onGet(`https://api.hello-charles.com/api/v0/me`).reply(function (config) {
  //         return [
  //           200,
  //           {
  //             count: 1,
  //             errors: errorsArr,
  //             results: [meResponse]
  //           }
  //         ]
  //       })
  //     }

  //     const inst = await initInstance()

  //     const Me = inst.me()

  //     expect(Me).toBeInstanceOf(v0.Me)

  //     const { data, errors } = await Me.get()

  //     expect(data).toMatchObject(meResponse)
  //     expect(errors).toMatchObject(errorsArr)
  //   })
})
