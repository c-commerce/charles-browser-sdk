import Entity, { EntityOptions, EntityRawPayload } from '../_base'
import { Universe } from '../../universe'
import * as messageTemplate from '../message-template/message-template'
import * as event from '../../eventing/feeds/event'
import * as feed from '../../eventing/feeds/feed'
import { BaseError } from '../../errors'

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
}

export interface ChannelUserOptions extends EntityOptions {
  rawPayload?: ChannelUserRawPayload
}

export class ChannelUser {
  protected universe: Universe
  protected http: Universe['http']
  protected options: ChannelUserOptions
  public initialized: boolean

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

  constructor (options: ChannelUserOptions) {
    this.universe = options.universe
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
      phone: this.phone
    }
  }

  public async sendMessageFromMessageTemplate (messageTemplate: messageTemplate.MessageTemplate, language: string, parameters?: object | object[] | null): Promise<event.Event | undefined> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/api/v0/people/${this.person as string}/channel_users/${this.id as string}/notifications/templates/${messageTemplate.id as string}`,
        data: {
          parameters,
          language
        }
      }
      const response = await this.http.getClient()(opts)

      const _feed = feed.Feed.createUninitialized({ id: response.data.data[0].id }, this.universe, this.http, null)

      return event.Event.create(response.data.data[0], _feed, this.universe, this.http)
    } catch (err) {
      throw new PersonChannelUserMessageTemplateSendError(undefined, { error: err })
    }
  }
}

export class PersonChannelUserMessageTemplateSendError extends BaseError {
  public name = 'PersonChannelUserMessageTemplateSendError'
  constructor (public message: string = 'Could not send message via message template unexpectedl.', properties?: any) {
    super(message, properties)
  }
}
