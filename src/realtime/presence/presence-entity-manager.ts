import Entity from '../../entities/_base'
import topics from '../../universe/topics'
import { RealtimeClient } from '..'
import PresenceHandler, { PresencePayload, PresenceStaffPayload } from './presence-handler'

export default class PresenceEntityManager<T extends Entity<any, any>, ExtraPayload = never> {
  constructor (
    private readonly mqtt: RealtimeClient,
    private readonly entity: T,
    private readonly user: PresenceStaffPayload,
    private readonly onPresenceUpdated: ((presence: PresenceStaffPayload[]) => void),
    private readonly thresholdInSeconds: number,
    private readonly getExtraPayload: (() => ExtraPayload) | undefined = undefined,
    private readonly relay: ((presence: PresencePayload<ExtraPayload>) => void) | undefined = undefined,
    private presenceHandler: PresenceHandler<ExtraPayload> | null = null) {
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

      this.presenceHandler = new PresenceHandler<ExtraPayload>(
        this.mqtt,
        topic,
        this.user,
        this.onPresenceUpdated,
        this.thresholdInSeconds,
        this.getExtraPayload,
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
