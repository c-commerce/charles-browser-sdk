import { RealtimeClient, RealtimeMessage, RealtimeMessageMessage } from 'src/realtime'

export interface PresenceStaffPayload { id: string, name: string }
export interface PresencePayload { staff: PresenceStaffPayload, isPresent: boolean }

export default class PresenceHandler {
  public readonly currentPresence: PresenceStaffPayload[] = []
  private _selfTimer: ReturnType<typeof setInterval> | null = null
  private readonly _staffTimers: Array<{ staffId: string, timer: ReturnType<typeof setTimeout> }> = []
  public readonly onPresenceUpdated: Array<(presence: PresenceStaffPayload[]) => void> = []
  private readonly relay: Array<((presence: PresencePayload) => void)> = []

  constructor (
    private readonly mqtt: RealtimeClient,
    private readonly topic: string,
    private readonly staffToEmit: PresenceStaffPayload,
    onPresenceUpdated: (presence: PresenceStaffPayload[]) => void,
    private readonly thresholdInSeconds: number = 10,
    relay: ((presence: PresencePayload) => void) | undefined = undefined) {
    this.onPresenceUpdated.push(onPresenceUpdated)
    relay && this.relay.push(relay)
    this._init()
  }

  private _init (): void {
    this.mqtt.on('message', this._filterMessages)
    this.mqtt.subscribe(this.topic)

    this._publishPresence(true)
    this._startSelfTimer()
  }

  private _filterMessages (message: RealtimeMessage | RealtimeMessageMessage): void {
    if (this.topic === message.topic) {
      this._handlePresence(message.payload as PresencePayload)
    }
  }

  private _handlePresence (payload: PresencePayload): void {
    if (payload.staff.id !== this.staffToEmit.id) {
      this.relay.forEach(cb => cb(payload))
      const didChange = this._maybeUpdatePresence(payload)

      if (didChange) {
        if (payload.isPresent) {
          this._publishPresence(true)
          this._startStaffTimer(payload.staff)
        }
        this.onPresenceUpdated.forEach(cb => cb(this.currentPresence))
      }
    }
  }

  private _maybeUpdatePresence (payload: PresencePayload): boolean {
    if (!payload.isPresent) {
      const idx = this.currentPresence.findIndex(staff => staff.id === payload.staff.id)
      if (idx >= 0) {
        this.currentPresence.splice(idx, 1)
        return true
      }
    } else {
      const idx = this.currentPresence.findIndex(staff => staff.id === payload.staff.id)
      if (idx === -1) {
        this.currentPresence.push(payload.staff)
        return true
      }
    }

    return false
  }

  private _publishPresence (isPresent: boolean): void {
    const payload: PresencePayload = { isPresent, staff: this.staffToEmit }
    this.mqtt.publish(this.topic, payload)
  }

  private _startSelfTimer (): void {
    this._selfTimer = setInterval(() => this._publishPresence, this.thresholdInSeconds * 1000)
  }

  private _startStaffTimer (staff: PresenceStaffPayload): void {
    const idx = this._staffTimers.findIndex(r => r.staffId === staff.id)
    if (idx >= 0) {
      clearTimeout(this._staffTimers[idx].timer)
      this._staffTimers.splice(idx, 1)
    }

    this._staffTimers.push({
      staffId: staff.id,
      timer: setTimeout(() => {
        this._handlePresence({ isPresent: false, staff })
        // Allow extra time to remove the staff to account for network delays etc 1.2 is 20% extra
      }, (this.thresholdInSeconds * 1.2) * 1000)
    })
  }

  public connectTracker (
    onPresenceUpdated: (presence: PresenceStaffPayload[]) => void,
    relay: ((presence: PresencePayload) => void) | undefined = undefined): void {
    this.onPresenceUpdated.push(onPresenceUpdated)
    relay && this.relay.push(relay)
  }

  public disconnectTracker (
    onPresenceUpdated: (presence: PresenceStaffPayload[]) => void,
    relay: ((presence: PresencePayload) => void) | undefined = undefined): void {
    this.onPresenceUpdated.includes(onPresenceUpdated) && this.onPresenceUpdated.splice(this.onPresenceUpdated.indexOf(onPresenceUpdated))
    relay && this.relay.includes(relay) && this.relay.splice(this.relay.indexOf(relay))
  }

  public hasActiveTrackers (): boolean {
    return this.onPresenceUpdated.length > 0
  }

  public destroy (): void {
    this._publishPresence(false)
    this.mqtt.off('message', this._filterMessages)
    this.mqtt.unsubscribe(this.topic)
    this._selfTimer && clearInterval(this._selfTimer)
    this._staffTimers && this._staffTimers.forEach()
  }
}
