import { RealtimeClient } from '../../../realtime'
import { ChangesHandler, ChangeType } from '../changes-handler'

describe('Realtime', () => {
  describe('Changes', () => {
    describe('changes-handler.ts', () => {
      it('initializes mqtt correctly', () => {
        const onMock = jest.fn()
        const subMock = jest.fn()
        const mqtt = {
          on: onMock,
          subscribe: subMock
        }

        const payload = {
          id: '1',
          entityName: 'my-fake-entity'
        }

        const handler = new ChangesHandler<any>(mqtt as unknown as RealtimeClient, {}, payload)

        expect(onMock).toHaveBeenCalled()
        expect(onMock).toHaveBeenCalledWith('message', expect.any(Function))
        expect(subMock).toHaveBeenCalled()
        expect(subMock).toHaveBeenCalledWith('entity/my-fake-entity/1/changed')
      })

      it('destroys correctly', () => {
        const offMock = jest.fn()
        const unsubMock = jest.fn()
        const mqtt = {
          on: jest.fn(),
          off: offMock,
          subscribe: jest.fn(),
          unsubscribe: unsubMock
        }

        const payload = {
          id: '1',
          entityName: 'my-fake-entity'
        }

        const handler = new ChangesHandler<any>(mqtt as unknown as RealtimeClient, {}, payload)
        handler.destroy()

        expect(offMock).toHaveBeenCalled()
        expect(unsubMock).toHaveBeenCalled()
        expect(unsubMock).toHaveBeenCalledWith('entity/my-fake-entity/1/changed')
      })

      it('emits the right actions', () => {
        const onMock = jest.fn()
        const mqtt = {
          on: onMock,
          subscribe: jest.fn()
        }

        const payload = {
          id: '1',
          entityName: 'my-fake-entity'
        }

        const onUpdated = jest.fn()
        const onDeleted = jest.fn()
        const onCreated = jest.fn()

        const handler = new ChangesHandler<any>(mqtt as unknown as RealtimeClient, {
          onUpdated,
          onDeleted,
          onCreated
        }, payload, [ChangeType.created, ChangeType.deleted, ChangeType.updated])

        const subscriber = onMock.mock.calls[0][1]
        subscriber({
          payload: {
            action: 'deleted'
          }
        })
        expect(onDeleted).not.toHaveBeenCalled()
        subscriber({
          topic: 'entity/my-fake-entity/1/changed',
          payload: {
            action: 'deleted'
          }
        })
        expect(onDeleted).toHaveBeenCalled()
        subscriber({
          topic: 'entity/my-fake-entity/1/changed',
          payload: {
            action: 'updated',
            entity: {
              id: 'after'
            },
            before: {
              entity: {
                id: 'before'
              }
            }
          }
        })
        expect(onUpdated).toHaveBeenCalled()
        expect(onUpdated).toHaveBeenCalledWith({ id: 'after' }, { id: 'before' })
        onUpdated.mockReset()
        subscriber({
          topic: 'entity/my-fake-entity/1/changed',
          payload: {
            action: 'updated',
            entity: {
              id: 'after'
            }
          }
        })
        expect(onUpdated).toHaveBeenCalled()
        expect(onUpdated).toHaveBeenCalledWith({ id: 'after' }, undefined)
        subscriber({
          topic: 'entity/my-fake-entity/1/changed',
          payload: {
            action: 'created',
            entity: {
              id: 'after'
            }
          }
        })
        expect(onCreated).toHaveBeenCalled()
        expect(onCreated).toHaveBeenCalledWith({ id: 'after' })
      })

      it('emits the right actions 2', () => {
        const onMock = jest.fn()
        const mqtt = {
          on: onMock,
          subscribe: jest.fn()
        }

        const payload = {
          id: '1',
          entityName: 'my-fake-entity'
        }

        const onDeleted = jest.fn()

        const handler = new ChangesHandler<any>(mqtt as unknown as RealtimeClient, {
          onDeleted
        }, payload, [ChangeType.created, ChangeType.updated])

        const subscriber = onMock.mock.calls[0][1]
        subscriber({
          payload: {
            topic: 'entity/my-fake-entity/1/changed',
            action: 'deleted'
          }
        })
        expect(onDeleted).not.toHaveBeenCalled()
      })

      it('handles empty handlers', () => {
        const onMock = jest.fn()
        const mqtt = {
          on: onMock,
          subscribe: jest.fn()
        }

        const payload = {
          id: '1',
          entityName: 'my-fake-entity'
        }

        const handler = new ChangesHandler<any>(mqtt as unknown as RealtimeClient, {}, payload, [ChangeType.created, ChangeType.deleted, ChangeType.updated])

        const subscriber = onMock.mock.calls[0][1]
        subscriber({
          topic: 'entity/my-fake-entity/1/changed',
          payload: {
            action: 'deleted'
          }
        })
        subscriber({
          topic: 'entity/my-fake-entity/1/changed',
          payload: {
            action: 'updated',
            entity: {
              id: 'after'
            },
            before: {
              entity: {
                id: 'before'
              }
            }
          }
        })
        subscriber({
          topic: 'entity/my-fake-entity/1/changed',
          payload: {
            action: 'created',
            entity: {
              id: 'after'
            }
          }
        })

      // No expects just required to finish correctly without throwing an error
      })
    })
  })
})
