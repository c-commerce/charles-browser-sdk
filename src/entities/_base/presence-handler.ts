import { RealtimeClient, RealtimeMessage, RealtimeMessageMessage } from 'src/realtime'

export interface PresenceUserPayload { id: string, name: string }
export interface PresencePayload { user: PresenceUserPayload, isPresent: boolean }

export default class PresenceHandler {
  public readonly currentPresence: PresenceUserPayload[] = []
  private _selfTimer: ReturnType<typeof setInterval> | null = null
  private readonly _userTimers: Array<{ userId: string, timer: ReturnType<typeof setTimeout> }> = []
  public readonly onPresenceUpdated: Array<(presence: PresenceUserPayload[]) => void> = []
  private readonly relay: Array<((presence: PresencePayload) => void)> = []

  constructor (
    private readonly mqtt: RealtimeClient,
    private readonly topic: string,
    private readonly userToEmit: PresenceUserPayload,
    onPresenceUpdated: (presence: PresenceUserPayload[]) => void,
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
    if (payload.user.id !== this.userToEmit.id) {
      this.relay.forEach(cb => cb(payload))
      const didChange = this._maybeUpdatePresence(payload)

      if (didChange) {
        if (payload.isPresent) {
          this._publishPresence(true)
          this._startUserTimer(payload.user)
        }
        this.onPresenceUpdated.forEach(cb => cb(this.currentPresence))
      }
    }
  }

  private _maybeUpdatePresence (payload: PresencePayload): boolean {
    if (!payload.isPresent) {
      const idx = this.currentPresence.findIndex(user => user.id === payload.user.id)
      if (idx >= 0) {
        this.currentPresence.splice(idx, 1)
        return true
      }
    } else {
      const idx = this.currentPresence.findIndex(user => user.id === payload.user.id)
      if (idx === -1) {
        this.currentPresence.push(payload.user)
        return true
      }
    }

    return false
  }

  private _publishPresence (isPresent: boolean): void {
    const payload: PresencePayload = { isPresent, user: this.userToEmit }
    this.mqtt.publish(this.topic, payload)
  }

  private _startSelfTimer (): void {
    this._selfTimer = setInterval(() => this._publishPresence, this.thresholdInSeconds * 1000)
  }

  private _startUserTimer (user: PresenceUserPayload): void {
    const idx = this._userTimers.findIndex(r => r.userId === user.id)
    if (idx >= 0) {
      clearTimeout(this._userTimers[idx].timer)
      this._userTimers.splice(idx, 1)
    }

    this._userTimers.push({
      userId: user.id,
      timer: setTimeout(() => {
        this._handlePresence({ isPresent: false, user })
        // Allow extra time to remove the user to account for network delays etc 1.2 is 20% extra
      }, (this.thresholdInSeconds * 1.2) * 1000)
    })
  }

  public connectTracker (
    onPresenceUpdated: (presence: PresenceUserPayload[]) => void,
    relay: ((presence: PresencePayload) => void) | undefined = undefined): void {
    this.onPresenceUpdated.push(onPresenceUpdated)
    relay && this.relay.push(relay)
  }

  public disconnectTracker (
    onPresenceUpdated: (presence: PresenceUserPayload[]) => void,
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
  }
}
