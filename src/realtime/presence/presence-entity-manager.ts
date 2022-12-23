import Entity from '../../entities/_base'
import topics from '../../universe/topics'
import { RealtimeClient } from '..'
import PresenceHandler, { PresencePayload, PresenceStaffPayload } from './presence-handler'

export default class PresenceEntityManager<T extends Entity<any, any>> {
  constructor (
    private readonly mqtt: RealtimeClient,
    private readonly entity: T,
    private readonly user: PresenceStaffPayload,
    private readonly onPresenceUpdated: ((presence: PresenceStaffPayload[]) => void),
    private readonly thresholdInSeconds: number,
    private readonly relay: ((presence: PresencePayload) => void) | undefined = undefined,
    private presenceHandler: PresenceHandler | null = null) {
    this.init()
  }

  private init (): void {
    if (this.presenceHandler) {
      this.presenceHandler.connectTracker(this.onPresenceUpdated, this.relay)
    } else {
      const topic = topics.api.entityPresence.generateTopic({
        id: this.entity.id,
        entityName: this.entity.entityName
      })

      this.presenceHandler = new PresenceHandler(
        this.mqtt,
        topic,
        this.user,
        this.onPresenceUpdated,
        this.thresholdInSeconds,
        this.relay
      )
    }
  }

  public disconnect (): void {
    this.presenceHandler?.disconnectTracker(this.onPresenceUpdated, this.relay)
    if (!this.presenceHandler?.hasActiveTrackers()) {
      this.presenceHandler?.destroy()
      this.presenceHandler = null
    }
  }
}
