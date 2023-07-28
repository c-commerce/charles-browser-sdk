import { RealtimeClient } from '../../../realtime'
import PresenceEntityManager from '../presence-entity-manager'
import PresenceHandler, { PresenceStaffPayload } from '../presence-handler'

const handlerMock = jest.fn()

jest.mock('../presence-handler', () => {
  return function (v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, v7: any) {
    handlerMock(v1, v2, v3, v4, v5, v6, v7)
    return { }
  }
})

jest.mock('../../../universe/topics', () => {
  return {
    api: {
      entityPresence: {
        generateTopic: () => '1'
      }
    }
  }
})

describe('SDK: Realtime: Presence entity manager', () => {
  const mockEntity = {
    id: '1',
    entityName: 'mock-entity'
  } as any
  const mockClient = {} as unknown as RealtimeClient
  const mockUser = {} as unknown as PresenceStaffPayload

  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.unmock('../presence-handler')
  })

  function generateMocks (handler: PresenceHandler | undefined = undefined): {
    mockOnUpdated: jest.Mock<any, any>
    manager: PresenceEntityManager<any>
  } {
    const mockOnUpdated = jest.fn()
    const manager = new PresenceEntityManager<any>(
      mockClient,
      mockEntity,
      mockUser,
      mockOnUpdated,
      1,
      undefined,
      undefined,
      handler
    )

    return {
      mockOnUpdated,
      manager
    }
  }

  it('init correctly', () => {
    const { mockOnUpdated } = generateMocks()

    expect(handlerMock).toBeCalledTimes(1)
    expect(handlerMock).toBeCalledWith(mockClient, '1', mockUser, mockOnUpdated, 1, undefined, undefined)
  })

  it('init correctly with existing handler', () => {
    const connectTracker = jest.fn()

    generateMocks({
      connectTracker
    } as unknown as PresenceHandler)

    expect(handlerMock).toBeCalledTimes(0)
    expect(connectTracker).toBeCalledTimes(1)
  })

  it('disconnects correctly', () => {
    const destroy = jest.fn()
    const hasActiveTrackers = jest.fn()
    const disconnectTracker = jest.fn()

    const { manager } = generateMocks({
      destroy,
      hasActiveTrackers,
      disconnectTracker,
      connectTracker: () => {}
    } as unknown as PresenceHandler)

    hasActiveTrackers.mockReturnValueOnce(true)
    manager.disconnect()

    expect(disconnectTracker).toBeCalledTimes(1)

    hasActiveTrackers.mockReturnValueOnce(false)
    manager.disconnect()

    expect(disconnectTracker).toBeCalledTimes(2)
    expect(destroy).toBeCalledTimes(1)
  })
})
