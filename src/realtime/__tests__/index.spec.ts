import { MqttClient } from 'mqtt'
import { RealtimeClient } from '..'

jest.mock('mqtt', () => ({
  connect: () => {
    const _this = {
      on: (ev: string, cb: Function) => {
        if (ev === 'connect') {
          cb()
        }
        return _this
      },
      subscribe: () => {},
      unsubscribe: () => {}
    }

    return _this
  }
}))

describe.only('Realtime -> RealtimeClient', () => {
  it('Handles subscription properly: Single subscription ( single topic )', () => {
    const _instance = new RealtimeClient({ base: 'wss://mock', username: 'mock' })
    expect(_instance.connected).toBeTruthy()

    const subSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'subscribe')
    const unsubSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'unsubscribe')

    _instance.subscribe('MOCK')
    expect(subSpy).toHaveBeenCalled()

    _instance.unsubscribe('MOCK')
    expect(unsubSpy).toHaveBeenCalled()
  })
  it('Handles subscription properly: Multiple subs ( single topic )', () => {
    const _instance = new RealtimeClient({ base: 'wss://mock', username: 'mock' })
    expect(_instance.connected).toBeTruthy()

    const subSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'subscribe')
    const unsubSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'unsubscribe')

    _instance.subscribe('MOCK')
    _instance.subscribe('MOCK')
    _instance.subscribe('MOCK')
    _instance.subscribe('MOCK')
    _instance.subscribe('MOCK')
    expect(subSpy).toHaveBeenCalledTimes(1)
    expect((_instance as any).topicStore.get('MOCK')).toBe(5)

    _instance.unsubscribe('MOCK')
    _instance.unsubscribe('MOCK')
    _instance.unsubscribe('MOCK')
    _instance.unsubscribe('MOCK')
    expect(unsubSpy).toHaveBeenCalledTimes(0)
    _instance.unsubscribe('MOCK')
    expect(unsubSpy).toHaveBeenCalledTimes(1)
  })

  it('Handles subscription properly: Single subscription ( multiple topics )', () => {
    const _instance = new RealtimeClient({ base: 'wss://mock', username: 'mock' })
    expect(_instance.connected).toBeTruthy()

    const subSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'subscribe')
    const unsubSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'unsubscribe')

    _instance.subscribe(['MOCK_1', 'MOCK_2'])
    expect(subSpy).toHaveBeenCalledTimes(2)
    expect(subSpy.mock.calls[0][0]).toBe('MOCK_1')
    expect(subSpy.mock.calls[1][0]).toBe('MOCK_2')

    _instance.unsubscribe(['MOCK_1', 'MOCK_2'])
    expect(unsubSpy).toHaveBeenCalledTimes(2)
    expect(unsubSpy.mock.calls[0][0]).toBe('MOCK_1')
    expect(unsubSpy.mock.calls[1][0]).toBe('MOCK_2')
  })
  it('Handles subscription properly: Multiple subs ( multiple topics )', () => {
    const _instance = new RealtimeClient({ base: 'wss://mock', username: 'mock' })
    expect(_instance.connected).toBeTruthy()

    const subSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'subscribe')
    const unsubSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'unsubscribe')

    _instance.subscribe('MOCK_1')
    _instance.subscribe(['MOCK_1', 'MOCK_2'])
    expect(subSpy).toHaveBeenCalledTimes(2)
    expect(subSpy.mock.calls[0][0]).toBe('MOCK_1')
    expect(subSpy.mock.calls[1][0]).toBe('MOCK_2')
    expect((_instance as any).topicStore.get('MOCK_1')).toBe(2)
    expect((_instance as any).topicStore.get('MOCK_2')).toBe(1)

    _instance.unsubscribe(['MOCK_1', 'MOCK_2'])
    expect(unsubSpy).toHaveBeenCalledTimes(1)
    expect(unsubSpy.mock.calls[0][0]).toBe('MOCK_2')
    _instance.unsubscribe('MOCK_1')
    expect(unsubSpy).toHaveBeenCalledTimes(2)
    expect(unsubSpy.mock.calls[1][0]).toBe('MOCK_1')
    expect((_instance as any).topicStore.get('MOCK_1')).toBeUndefined()
    expect((_instance as any).topicStore.get('MOCK_2')).toBeUndefined()
  })
  it('Handles subscription properly: Forced', () => {
    const _instance = new RealtimeClient({ base: 'wss://mock', username: 'mock' })
    expect(_instance.connected).toBeTruthy()

    const subSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'subscribe')
    const unsubSpy: jest.SpyInstance = jest.spyOn((_instance as any).client as MqttClient, 'unsubscribe')

    _instance.subscribe('MOCK', undefined, true)
    _instance.subscribe('MOCK', undefined, true)
    _instance.subscribe('MOCK', undefined, false)
    expect(subSpy).toHaveBeenCalledTimes(2)

    _instance.unsubscribe('MOCK', undefined, true)
    expect(unsubSpy).toHaveBeenCalled()
  })
})
