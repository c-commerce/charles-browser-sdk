import { Universe } from '../universe'
import { Client } from '../client'
import { isDeletable, isEmbedded, isEntity } from './entity'

class MockClass {
  public static entityName = 'mock-class'

  mockMethod (): void {

  }
}

const client = {
  getClient: () => jest.fn()
} as unknown as Client

const mockUniverse = new Universe({
  name: 'dev',
  http: client,
  base: 'staging-4.hello.charles.com',
  user: {}
})

describe('Entity Helpers:', () => {
  it('isEntity', () => {
    const mockEntity = mockUniverse.notificationCampaigns.fromJson([{}])[0]

    expect(isEntity(mockEntity)).toBe(true)

    const mockObject = new MockClass()
    expect(isEntity(mockObject)).toBe(false)
  })

  it('isDeletable', () => {
    const mockEntity = mockUniverse.notificationCampaigns.fromJson([{}])[0]

    expect(isDeletable(mockEntity)).toBe(true)

    const mockObject = new MockClass()
    expect(isDeletable(mockObject)).toBe(false)
  })

  it('isEmbedded', () => {
    const mocks = mockUniverse.notificationCampaigns.fromJson([{
      message_template: {
        id: 'mockId'
      }
    }, {
      message_template: 'mockId'
    }, {}])

    expect(isEmbedded(mocks[0].messageTemplate)).toBe(true)
    expect(isEmbedded(mocks[1].messageTemplate)).toBe(false)
    expect(isEmbedded(mocks[2].messageTemplate)).toBe(false)
  })
})
