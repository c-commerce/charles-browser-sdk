import type { RealtimeClient, RealtimeMessage, RealtimeMessageMessage } from '../../../realtime'
import PresenceHandler from '../presence-handler'

interface IMockRealtimeClient extends RealtimeClient {}

function generateMockMqtt (): {
  mockClient: IMockRealtimeClient
  messageOnRelay: ((payload: RealtimeMessage | RealtimeMessageMessage) => void) | undefined
  clientOn: jest.Mock<any, any>
  clientOff: jest.Mock<any, any>
  clientSub: jest.Mock<any, any>
  clientUnSub: jest.Mock<any, any>
  clientPublish: jest.Mock<any, any>
} {
  const clientOn = jest.fn()
  const clientOff = jest.fn()
  const clientSub = jest.fn()
  const clientUnSub = jest.fn()
  const clientPublish = jest.fn()

  const mockRealtimeClient: IMockRealtimeClient = {
    off: clientOff,
    subscribe: clientSub,
    unsubscribe: clientUnSub,
    publish: clientPublish,
    on: clientOn
  } as unknown as IMockRealtimeClient

  return {
    mockClient: mockRealtimeClient,
    get messageOnRelay () { return clientOn.mock.calls[0][1] },
    clientOn,
    clientOff,
    clientSub,
    clientUnSub,
    clientPublish

  }
}

describe('SDK: Realtime: Presence handler', () => {
  const MOCK_TOPIC = 'SOMETOPIC'
  const MOCK_STAFF = { id: 'cool-id', name: 'cool name' }
  const MOCK_STAFF_2 = { id: 'cool-id-2', name: 'cool name 2' }
  const MOCK_STAFF_3 = { id: 'cool-id-3', name: 'cool name 3' }
  jest.useFakeTimers()

  it('Must initialize mqtt correctly', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)

    expect(mqttMocks.clientOn).toBeCalledWith('message', expect.any(Function))
    expect(mqttMocks.clientSub).toBeCalledWith(MOCK_TOPIC)

    const MOCK_PRESENCE = { isPresent: true, staff: MOCK_STAFF }
    expect(mqttMocks.clientPublish).toBeCalledWith(MOCK_TOPIC, JSON.stringify(MOCK_PRESENCE))

    handler.destroy()
  })

  it('Must destroy correctly', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    const MOCK_PRESENCE = { isPresent: false, staff: MOCK_STAFF }

    handler.destroy()

    expect(mqttMocks.clientOff).toBeCalledWith('message', mqttMocks.clientOn.mock.calls[0][1])
    expect(mqttMocks.clientUnSub).toBeCalledWith(MOCK_TOPIC)

    expect(mqttMocks.clientPublish).toBeCalledWith(MOCK_TOPIC, JSON.stringify(MOCK_PRESENCE))
  })

  it('Must update presence correctly', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledWith([MOCK_STAFF_2])

    onUpdate.mockReset()

    MOCK_PRESENCE_2.isPresent = false
    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledWith([])

    handler.destroy()
  })

  it('Must update presence correctly for extrnal trackers', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const onUpdate2 = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    handler.connectTracker(onUpdate2)
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledWith([MOCK_STAFF_2])
    expect(onUpdate2).toBeCalledWith([MOCK_STAFF_2])
    expect(handler.hasActiveTrackers).toBeTruthy()
    handler.destroy()
  })

  it('Must disconnect tracker correctly', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const onUpdate2 = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    handler.connectTracker(onUpdate2)
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }
    const MOCK_PRESENCE_3 = { isPresent: true, staff: MOCK_STAFF_3 }

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledWith([MOCK_STAFF_2])
    expect(onUpdate2).toBeCalledWith([MOCK_STAFF_2])

    handler.disconnectTracker(onUpdate2)

    onUpdate.mockReset()
    onUpdate2.mockReset()

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_3
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledWith([MOCK_STAFF_2, MOCK_STAFF_3])
    expect(onUpdate2).not.toBeCalled()

    handler.destroy()
  })

  it('Must track active trackers correctly ... lol', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    handler.disconnectTracker(onUpdate)

    expect(handler.hasActiveTrackers()).toBeFalsy()

    handler.destroy()
  })

  it('Must ignore duplicate publishes', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }

    onUpdate.mockReset()

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate).toBeCalledWith([MOCK_STAFF_2])

    handler.destroy()
  })

  it('Must ignore self publishes', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF }

    onUpdate.mockReset()

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toHaveBeenCalledTimes(0)

    handler.destroy()
  })

  it('Must publish self presence correctly', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    const MOCK_PRESENCE = { isPresent: true, staff: MOCK_STAFF }
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }

    mqttMocks.clientPublish.mockReset()

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(mqttMocks.clientPublish).toHaveBeenCalledTimes(1)
    expect(mqttMocks.clientPublish).toBeCalledWith(MOCK_TOPIC, JSON.stringify(MOCK_PRESENCE))

    handler.destroy()
  })

  it('Must publish self presence extra payload correctly', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const mockExtraPayload: jest.Mock<string> = jest.fn()
    mockExtraPayload.mockReturnValueOnce('SECTION_1')

    // Forced typing here is a form of testing the typing detection it will fail the test if typing is incorrect.
    const handler: PresenceHandler<string> = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3, mockExtraPayload)
    const MOCK_PRESENCE = { isPresent: true, staff: MOCK_STAFF }
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2, extraPayload: 'SECTION_1' }

    mqttMocks.clientPublish.mockReset()

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(mqttMocks.clientPublish).toHaveBeenCalledTimes(1)
    expect(mqttMocks.clientPublish).toBeCalledWith(MOCK_TOPIC, JSON.stringify(MOCK_PRESENCE))

    handler.destroy()
  })

  it('Must periodically publish self presence correctly', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 1)
    mqttMocks.clientPublish.mockReset()

    jest.advanceTimersByTime(3001)
    expect(mqttMocks.clientPublish).toHaveBeenCalledTimes(3)

    handler.destroy()
  })

  it('Must remove external publishes after valid threshold', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 1)
    onUpdate.mockReset()
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledTimes(1)
    expect(onUpdate).toBeCalledWith([MOCK_STAFF_2])
    onUpdate.mockReset()
    jest.advanceTimersByTime(1500)

    expect(onUpdate).toBeCalledTimes(1)
    expect(onUpdate).toBeCalledWith([])

    handler.destroy()
  })

  it('Must relay raw messages correctly & ignore duplicate listeners', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const relay = jest.fn()
    const externalRelay = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3, undefined, relay)
    handler.connectTracker(onUpdate, externalRelay)
    handler.connectTracker(onUpdate, externalRelay)
    onUpdate.mockReset()

    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledTimes(1)

    expect(relay).toBeCalledTimes(1)
    expect(relay).toHaveBeenCalledWith(MOCK_PRESENCE_2)

    expect(externalRelay).toBeCalledTimes(1)
    expect(externalRelay).toHaveBeenCalledWith(MOCK_PRESENCE_2)

    handler.destroy()
  })

  it('Must disconnect relay correctly', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const relay = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3, undefined, relay)
    handler.disconnectTracker(null, relay)
    onUpdate.mockReset()

    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC,
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledTimes(1)

    expect(relay).toBeCalledTimes(0)
    handler.destroy()
  })

  it('Must ignore invalid topics', () => {
    const mqttMocks = generateMockMqtt()
    const onUpdate = jest.fn()
    const handler = new PresenceHandler(mqttMocks.mockClient, MOCK_TOPIC, MOCK_STAFF, onUpdate, 3)
    const MOCK_PRESENCE_2 = { isPresent: true, staff: MOCK_STAFF_2 }
    onUpdate.mockReset()

    mqttMocks.messageOnRelay?.({
      topic: MOCK_TOPIC + 'INVALID',
      payload: MOCK_PRESENCE_2
    } as unknown as RealtimeMessage)

    expect(onUpdate).toBeCalledTimes(0)

    handler.destroy()
  })
})
