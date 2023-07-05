import Entity from '../../../entities/_base'
import { RealtimeClient } from '../../../realtime'
import ChangesEntityManager from '../changes-entity-manager'
import { ChangeType } from '../changes-handler'
import DeletableFacadeEntity, { DeletableFacadeEntityOptions } from '../__mocks__/deletable-entity'
import FacadeEntity, { FacadeEntityOptions } from '../__mocks__/entity'

const handlerMock = jest.fn()
const destroyMock = jest.fn()

jest.mock('../changes-handler', () => {
  return {
    ...jest.requireActual('../changes-handler'),
    ChangesHandler: function (v1: any, v2: any, v3: any, v4: any) {
      handlerMock(v1, v2, v3, v4)
      return {
        destroy: destroyMock,
        types: ['created']
      }
    }
  }
})

describe('Realtime', () => {
  describe('Changes', () => {
    describe('changes-entity-manager.ts', () => {
      beforeEach(() => {
        destroyMock.mockReset()
        handlerMock.mockReset()
      })

      afterAll(() => {
        jest.unmock('../changes-handler')
      })

      it('initializes mqtt correctly', () => {
        const payload = {
          id: '1',
          entityName: 'my-fake-entity'
        } as unknown as Entity<any, any>

        const manager = new ChangesEntityManager<any>({} as unknown as RealtimeClient, payload)

        expect(handlerMock).toHaveBeenCalled()
      })
      it('destroys correctly', () => {
        const payload = {
          id: '1',
          entityName: 'my-fake-entity'
        } as unknown as Entity<any, any>

        const manager = new ChangesEntityManager<any>({} as unknown as RealtimeClient, payload, ['created'])
        manager.disconnect()

        expect(destroyMock).toHaveBeenCalled()
      })

      it('handles entity deleted correctly #1', () => {
        const entity = new DeletableFacadeEntity({
          rawPayload: {
            id: '1',
            name: 'test',
            deleted: true
          }
        } as unknown as DeletableFacadeEntityOptions)

        const manager = new ChangesEntityManager<any>({} as unknown as RealtimeClient, entity)
        manager.onDeleted({})

        expect(entity.deleted).toBeTruthy()
      })

      it('handles entity deleted correctly #2', () => {
        const entity = new FacadeEntity({
          rawPayload: {
            id: '1',
            name: 'test'
          }
        } as unknown as FacadeEntityOptions)

        const manager = new ChangesEntityManager<any>({} as unknown as RealtimeClient, entity)
        manager.onDeleted({})

        expect('deleted' in entity).toBeFalsy()
      })

      it('handles entity updated correctly', () => {
        const entity = new FacadeEntity({
          rawPayload: {
            id: '1',
            name: 'test'
          }
        } as unknown as FacadeEntityOptions)

        const manager = new ChangesEntityManager<any>({} as unknown as RealtimeClient, entity)
        manager.onUpdated({
          id: '1',
          name: 'test2'
        })

        expect(entity.serialize()).toStrictEqual({
          id: '1',
          name: 'test2'
        })
      })

      it('handles entity created correctly', () => {
        const entity = new FacadeEntity({
          rawPayload: {
            id: '1',
            name: 'test'
          }
        } as unknown as FacadeEntityOptions)

        const manager = new ChangesEntityManager<any>({} as unknown as RealtimeClient, entity)
        manager.onCreated({
          id: '1',
          name: 'test2'
        })

        expect(entity.serialize()).toStrictEqual({
          id: '1',
          name: 'test2'
        })
      })

      it('handles entity through custom handler', () => {
        const entity = new FacadeEntity({
          rawPayload: {
            id: '1',
            name: 'test'
          }
        } as unknown as FacadeEntityOptions)

        const mockOnCreated = jest.fn()

        const manager = new ChangesEntityManager<any>({} as unknown as RealtimeClient, entity, ['created'], {
          onCreated: mockOnCreated
        })
        manager.onCreated({
          id: '1',
          name: 'test2'
        })

        expect(mockOnCreated).toBeCalled()
        expect(entity.serialize()).toStrictEqual({
          id: '1',
          name: 'test'
        })
        mockOnCreated.mock.calls[0][1]()
        expect(entity.serialize()).toStrictEqual({
          id: '1',
          name: 'test2'
        })
      })
    })
  })
})
