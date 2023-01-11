import { UniverseEntityOptions, EntityRawPayload, EntityFetchOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import * as messageTemplate from '../message-template/message-template'
import * as event from '../../eventing/feeds/event'
import * as feed from '../../eventing/feeds/feed'
import { BaseErrorV2, BaseErrorV2Properties } from '../../errors'
import qs from 'qs'
import type { AxiosError } from 'axios'

export interface ChannelProfile {
  is_verified: boolean
  is_business_follow_user: boolean
  is_user_follow_business: boolean
  follower_count: number
}

export interface ChannelUserRawPayload extends EntityRawPayload {
  readonly person?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly last_source_fetch_at?: string
  readonly broker?: string
  readonly external_person_reference_id?: string | null
  readonly external_person_custom_id?: string | null
  readonly external_channel_reference_id?: string | null
  readonly source_type?: string
  readonly source_api?: string
  readonly payload_name?: string
  readonly comment?: string
  readonly payload?: object | null
  readonly links?: object
  readonly email?: string
  readonly name?: string
  readonly first_name?: string
  readonly middle_name?: string
  readonly last_name?: string
  readonly phone?: string
  readonly channel_profile?: ChannelProfile | null
  readonly verified?: boolean
}
export interface ChannelUserOptions extends UniverseEntityOptions {
  rawPayload?: ChannelUserRawPayload
}

export class ChannelUser extends UniverseEntity<ChannelUserRawPayload, ChannelUserRawPayload> {
  public get entityName (): string {
    return 'channel_user'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ChannelUserOptions
  public initialized: boolean

  public endpoint: string

  public id?: string
  public value?: string
  public type?: string
  public createdAt?: Date | null
  public updatedAt?: Date | null
  public deleted?: ChannelUserRawPayload['deleted']
  public active?: ChannelUserRawPayload['active']
  public person?: ChannelUserRawPayload['person']
  public lastSourceFetchAt?: Date | null
  public broker?: ChannelUserRawPayload['broker']
  public externalPersonReferenceId?: ChannelUserRawPayload['external_person_reference_id']
  public externalPersonCustomId?: ChannelUserRawPayload['external_person_custom_id']
  public externalChannelReferenceId?: ChannelUserRawPayload['external_channel_reference_id']
  public sourceType?: ChannelUserRawPayload['source_type']
  public sourceApi?: ChannelUserRawPayload['source_api']
  public payloadName?: ChannelUserRawPayload['payload_name']
  public comment?: ChannelUserRawPayload['comment']
  public payload?: ChannelUserRawPayload['payload']
  public links?: ChannelUserRawPayload['links']
  public email?: ChannelUserRawPayload['email']
  public name?: ChannelUserRawPayload['name']
  public firstName?: ChannelUserRawPayload['first_name']
  public middleName?: ChannelUserRawPayload['middle_name']
  public lastName?: ChannelUserRawPayload['last_name']
  public phone?: ChannelUserRawPayload['phone']
  public channelProfile?: ChannelUserRawPayload['channel_profile']
  public verified?: ChannelUserRawPayload['verified']

  constructor (options: ChannelUserOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/channel_users'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ChannelUserRawPayload): ChannelUser {
    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted
    this.active = rawPayload.active
    this.person = rawPayload.person
    this.lastSourceFetchAt = rawPayload.last_source_fetch_at ? new Date(rawPayload.last_source_fetch_at) : undefined
    this.broker = rawPayload.broker
    this.externalPersonReferenceId = rawPayload.external_person_reference_id
    this.externalPersonCustomId = rawPayload.external_person_custom_id
    this.externalChannelReferenceId = rawPayload.external_channel_reference_id
    this.sourceType = rawPayload.source_type
    this.sourceApi = rawPayload.source_api
    this.payloadName = rawPayload.payload_name
    this.comment = rawPayload.comment
    this.payload = rawPayload.payload
    this.links = rawPayload.links
    this.email = rawPayload.email
    this.name = rawPayload.name
    this.firstName = rawPayload.first_name
    this.middleName = rawPayload.middle_name
    this.lastName = rawPayload.last_name
    this.phone = rawPayload.phone
    this.channelProfile = rawPayload.channel_profile
    this.verified = rawPayload.verified

    return this
  }

  public static create (payload: ChannelUserRawPayload, universe: Universe, http: Universe['http']): ChannelUser {
    return new ChannelUser({ rawPayload: payload, universe, http, initialized: true })
  }

  public static createUninitialized (payload: ChannelUserRawPayload, universe: Universe, http: Universe['http']): ChannelUser {
    return new ChannelUser({ rawPayload: payload, universe, http, initialized: false })
  }

  public serialize (): ChannelUserRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted,
      active: this.active,
      person: this.person,
      last_source_fetch_at: this.lastSourceFetchAt ? this.lastSourceFetchAt.toISOString() : undefined,
      broker: this.broker,
      external_person_reference_id: this.externalPersonReferenceId,
      external_person_custom_id: this.externalPersonCustomId,
      external_channel_reference_id: this.externalChannelReferenceId,
      source_type: this.sourceType,
      source_api: this.sourceApi,
      payload_name: this.payloadName,
      comment: this.comment,
      payload: this.payload,
      links: this.links,
      email: this.email,
      name: this.name,
      first_name: this.firstName,
      middle_name: this.middleName,
      last_name: this.lastName,
      phone: this.phone,
      channel_profile: this.channelProfile,
      verified: this.verified
    }
  }

  public async sendMessageFromMessageTemplate (messageTemplate: messageTemplate.MessageTemplate, language: string, parameters?: object | object[] | null, extra?: {[key: string]: any}): Promise<event.Event | undefined> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/api/v0/people/${this.person as string}/channel_users/${this.id as string}/notifications/templates/${messageTemplate.id as string}`,
        data: {
          parameters,
          language,
          ...(extra ?? {})
        }
      }
      const response = await this.http.getClient()(opts)

      const _feed = feed.Feed.createUninitialized({ id: response.data.data[0].id }, this.universe, this.http, null)

      return event.Event.create(response.data.data[0], _feed, this.universe, this.http)
    } catch (err) {
      const error = err as AxiosError
      if (error.response?.status === 403) {
        throw new PersonChannelUserMessageTemplateSendForbiddenError(error)
      }
      throw new PersonChannelUserMessageTemplateSendError(error)
    }
  }

  public async verify (options?: EntityFetchOptions): Promise<ChannelUserRawPayload> {
    if (this.id === null || this.id === undefined) throw new TypeError('channel user verify requires id to be set')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/verify${qs.stringify(options?.query ?? {}, { addQueryPrefix: true })}`,
        responseType: 'json'
      }

      const res = await this.http.getClient()(opts)
      const resource = res.data.data[0] as ChannelUserRawPayload
      return ChannelUser.create(resource, this.universe, this.http)
    } catch (err) {
      throw new ChannelUserVerifyRemoteError(err)
    }
  }

  public async acknowledgeIdentityChange (options?: EntityFetchOptions): Promise<ChannelUserRawPayload> {
    if (this.id === null || this.id === undefined) throw new TypeError('channel user acknowledgeIdentityChange requires id to be set')

    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id}/acknowledge_identity${qs.stringify(options?.query ?? {}, { addQueryPrefix: true })}`,
        responseType: 'json'
      }

      const res = await this.http.getClient()(opts)
      const resource = res.data.data[0] as ChannelUserRawPayload
      return ChannelUser.create(resource, this.universe, this.http)
    } catch (err) {
      throw new ChannelUserVerifyRemoteError(err)
    }
  }
}

export class PersonChannelUserMessageTemplateSendError extends BaseErrorV2 {
  public name = 'PersonChannelUserMessageTemplateSendError'
  public message = 'Could not send message via message template unexpectedly.'

  constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
    super(err as Error, props)
    Object.setPrototypeOf(this, PersonChannelUserMessageTemplateSendError.prototype)
  }
}
export class PersonChannelUserMessageTemplateSendForbiddenError extends BaseErrorV2 {
  public name = 'PersonChannelUserMessageTemplateSendForbiddenError'
  public message = 'You are not allowed to send notifications.'
  constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
    super(err as Error, props)
    Object.setPrototypeOf(this, PersonChannelUserMessageTemplateSendForbiddenError.prototype)
  }
}
export class ChannelUserVerifyRemoteError extends BaseErrorV2 {
  public name = 'ChannelUserVerifyRemoteError'
  public message = 'Could not verify channel user unexpectedly.'

  constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
    super(err as Error, props)
    Object.setPrototypeOf(this, ChannelUserVerifyRemoteError.prototype)
  }
}
export class ChannelUserDeleteError extends BaseErrorV2 {
  public name = 'ChannelUserDeleteError'
  public message = 'Could not delete channel user unexpectedly.'

  constructor (err: Error | unknown, props? : BaseErrorV2Properties) {
    super(err as Error, props)
    Object.setPrototypeOf(this, ChannelUserDeleteError.prototype)
  }
}
