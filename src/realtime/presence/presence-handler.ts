import { RealtimeClient, RealtimeMessage, RealtimeMessageMessage } from 'src/realtime'

export interface PresenceStaffPayload { id: string, name: string }
export interface PresencePayload<T> { staff: PresenceStaffPayload, isPresent: boolean, extraPayload?: T }

export default class PresenceHandler<ExtraPayload = never> {
  public readonly currentPresence: PresenceStaffPayload[] = []
  private _selfTimer: ReturnType<typeof setInterval> | null = null
  private readonly _staffTimers: Array<{ staffId: string, timer: ReturnType<typeof setTimeout> }> = []
  private readonly _onPresenceUpdated: Array<(presence: PresenceStaffPayload[]) => void> = []
  private readonly _relays: Array<((presence: PresencePayload<ExtraPayload>) => void)> = []

  constructor (
    private readonly mqtt: RealtimeClient,
    private readonly topic: string,
    private readonly staffToEmit: PresenceStaffPayload,
    onPresenceUpdated: (presence: PresenceStaffPayload[]) => void,
    private readonly thresholdInSeconds: number,
    private readonly getExtraPayload: (() => ExtraPayload) | undefined = undefined,
    relay: ((presence: PresencePayload<ExtraPayload>) => void) | undefined = undefined) {
    this._filterMessages = this._filterMessages.bind(this)

    this._onPresenceUpdated.push(onPresenceUpdated)
    if (relay) {
      this._relays.push(relay)
    }
    this._init()
  }

  private _init (): void {
    this.mqtt.on('message', this._filterMessages)
    this.mqtt.subscribe(this.topic)

    this._publishPresence(true)
    this._startSelfTimer()
  }

  private _filterMessages (message: RealtimeMessage | RealtimeMessageMessage): void {
    if (this.topic === message.topic && message.payload) {
      this._handlePresence(message.payload as PresencePayload<ExtraPayload>)
    }
  }

  private _handlePresence (payload: PresencePayload<ExtraPayload>): void {
    if (payload.staff.id !== this.staffToEmit.id) {
      this._relays.forEach(cb => cb(payload))
      const didChange = this._maybeUpdatePresence(payload)

      if (didChange) {
        if (payload.isPresent) {
          this._publishPresence(true)
        }
        this._onPresenceUpdated.forEach(cb => cb(this.currentPresence.concat()))
      }
      this._startStaffTimer(payload.staff)
    }
  }

  private _maybeUpdatePresence (payload: PresencePayload<ExtraPayload>): boolean {
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
    const payload: PresencePayload<ExtraPayload> = { isPresent, staff: this.staffToEmit }
    // A little performance enhancement is to only send the extra data for when the user is present
    if (this.getExtraPayload && isPresent) {
      payload.extraPayload = this.getExtraPayload()
    }
    this.mqtt.publish(this.topic, JSON.stringify(payload))
  }

  private _startSelfTimer (): void {
    this._selfTimer = setInterval(() => this._publishPresence(true), this.thresholdInSeconds * 1000)
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
    relay: ((presence: PresencePayload<ExtraPayload>) => void) | undefined = undefined): void {
    if (!this._onPresenceUpdated.includes(onPresenceUpdated)) {
      this._onPresenceUpdated.push(onPresenceUpdated)
    }
    if (relay && !this._relays.includes(relay)) {
      this._relays.push(relay)
    }
  }

  public disconnectTracker (
    onPresenceUpdated: ((presence: PresenceStaffPayload[]) => void) | undefined | null,
    relay: ((presence: PresencePayload<ExtraPayload>) => void) | undefined = undefined): void {
    if (onPresenceUpdated && this._onPresenceUpdated.includes(onPresenceUpdated)) {
      this._onPresenceUpdated.splice(this._onPresenceUpdated.indexOf(onPresenceUpdated))
    }
    if (relay && this._relays.includes(relay)) {
      this._relays.splice(this._relays.indexOf(relay), 1)
    }
  }

  public hasActiveTrackers (): boolean {
    return this._onPresenceUpdated.length > 0
  }

  public destroy (): void {
    this._publishPresence(false)
    this.mqtt.off('message', this._filterMessages)
    this.mqtt.unsubscribe(this.topic)
    if (this._selfTimer) {
      clearInterval(this._selfTimer)
    }
    this._staffTimers?.forEach(timer => clearTimeout(timer.timer))
  }
}
