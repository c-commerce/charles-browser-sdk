import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { UniverseEntity, UniverseEntityOptions, EntityRawPayload, EntitiesList, EntitiesListExportCsvOptions } from '../_base'
import { PersonEmailRawPayload, PersonPhoneNumberRawPayload, Phonenumber } from './person'
import { Email } from './email'
import qs from 'qs'

export interface PersonNamesRawPayload {
  readonly first_name?: string
  readonly nickname?: string
  readonly middle_name?: string
  readonly last_name?: string
  readonly name?: string
}

export interface PersonNames {
  readonly firstName?: string
  readonly nickname?: string
  readonly middleName?: string
  readonly lastName?: string
  readonly name?: string
}

export interface PersonContactRawPayload extends EntityRawPayload {
  readonly created_at?: string
  readonly tags?: string[]
  readonly active?: boolean
  readonly deleted?: boolean
  readonly gender?: string
  readonly display_name?: string
  readonly date_of_birth?: string
  readonly custom_properties?: object
  readonly channel_participations?: string[]
  readonly sentiment?: string
  readonly sentiment_value?: string
  readonly message_subscriptions_granted?: string[]
  readonly message_subscriptions_withdrawn_or_denied?: string[]
  readonly message_subscription_has_at_least_one_granted?: boolean
  readonly message_subscription_has_at_least_one_opt_out?: boolean
  readonly message_subscription_has_any?: boolean
  readonly message_subscription_has_at_least_one_exclusively_granted?: boolean
  readonly analytics_orders_count?: number
  readonly analytics_last_incoming_message_at?: string
  readonly analytics_notification_campaign_participation?: string[]
  readonly analytics_notification_campaign_reads?: string[]
  readonly analytics_last_order_date?: string
  readonly analytics_notification_campaign_deliveries?: string[]
  readonly analytics_storefront_vendor_tags?: string[]
  readonly analytics_products_bought?: string[]
  readonly analytics_product_categories_bought_from?: string[]
  readonly analytics_last_outgoing_message_at?: string
  readonly analytics_notification_campaign_clicks?: string[]
  readonly names?: PersonNamesRawPayload
  readonly emails?: PersonEmailRawPayload[]
  readonly phonenumbers?: PersonPhoneNumberRawPayload[]
}

export interface PersonContactPayload {
  readonly id?: PersonContactRawPayload['id']
  readonly createdAt?: Date | null
  readonly tags?: PersonContactRawPayload['tags']
  readonly active?: PersonContactRawPayload['active']
  readonly deleted?: PersonContactRawPayload['deleted']
  readonly gender?: PersonContactRawPayload['gender']
  readonly displayName?: PersonContactRawPayload['display_name']
  readonly dateOfBirth?: PersonContactRawPayload['date_of_birth']
  readonly customProperties?: PersonContactRawPayload['custom_properties']
  readonly channelParticipations?: PersonContactRawPayload['channel_participations']
  readonly sentiment?: PersonContactRawPayload['sentiment']
  readonly sentimentValue?: PersonContactRawPayload['sentiment_value']
  readonly messageSubscriptionsGranted?: PersonContactRawPayload['message_subscriptions_granted']
  readonly messageSubscriptionsWithdrawnOrDenied?: PersonContactRawPayload['message_subscriptions_withdrawn_or_denied']
  readonly messageSubscriptionHasAtLeastOneGranted?: PersonContactRawPayload['message_subscription_has_at_least_one_granted']
  readonly messageSubscriptionHasAtLeastOneOptOut?: PersonContactRawPayload['message_subscription_has_at_least_one_opt_out']
  readonly messageSubscriptionHasAny?: PersonContactRawPayload['message_subscription_has_any']
  readonly messageSubscriptionHasAtLeastOneExclusivelyGranted?: PersonContactRawPayload['message_subscription_has_at_least_one_exclusively_granted']
  readonly analyticsOrdersCount?: PersonContactRawPayload['analytics_orders_count']
  readonly analyticsLastIncomingMessageAt?: PersonContactRawPayload['analytics_last_incoming_message_at']
  readonly analyticsNotificationCampaignParticipation?: PersonContactRawPayload['analytics_notification_campaign_participation']
  readonly analyticsNotificationCampaignReads?: PersonContactRawPayload['analytics_notification_campaign_reads']
  readonly analyticsLastOrderDate?: PersonContactRawPayload['analytics_last_order_date']
  readonly analyticsNotificationCampaignDeliveries?: PersonContactRawPayload['analytics_notification_campaign_deliveries']
  readonly analyticsStorefrontVendorTags?: PersonContactRawPayload['analytics_storefront_vendor_tags']
  readonly analyticsProductsBought?: PersonContactRawPayload['analytics_products_bought']
  readonly analyticsProductCategoriesBoughtFrom?: PersonContactRawPayload['analytics_product_categories_bought_from']
  readonly analyticsLastOutgoingMessageAt?: PersonContactRawPayload['analytics_last_outgoing_message_at']
  readonly analyticsNotificationCampaignClicks?: PersonContactRawPayload['analytics_notification_campaign_clicks']
  readonly names?: PersonNames
  readonly emails?: Email[]
  readonly phonenumbers?: Phonenumber[]
}

export interface PersonContactOptions extends UniverseEntityOptions {
  rawPayload?: PersonContactRawPayload
}

export class PersonContact extends UniverseEntity<PersonContactPayload, PersonContactRawPayload> {
  public get entityName (): string {
    return 'person_contacts'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: PersonContactOptions
  public initialized: boolean

  public endpoint: string

  public id?: PersonContactPayload['id']
  public createdAt?: PersonContactPayload['createdAt']
  public tags?: PersonContactPayload['tags']
  public active?: PersonContactPayload['active']
  public deleted?: PersonContactPayload['deleted']
  public gender?: PersonContactPayload['gender']
  public displayName?: PersonContactPayload['displayName']
  public dateOfBirth?: PersonContactPayload['dateOfBirth']
  public customProperties?: PersonContactPayload['customProperties']
  public channelParticipations?: PersonContactPayload['channelParticipations']
  public sentiment?: PersonContactPayload['sentiment']
  public sentimentValue?: PersonContactPayload['sentimentValue']
  public messageSubscriptionsGranted?: PersonContactPayload['messageSubscriptionsGranted']
  public messageSubscriptionsWithdrawnOrDenied?: PersonContactPayload['messageSubscriptionsWithdrawnOrDenied']
  public messageSubscriptionHasAtLeastOneGranted?: PersonContactPayload['messageSubscriptionHasAtLeastOneGranted']
  public messageSubscriptionHasAtLeastOneOptOut?: PersonContactPayload['messageSubscriptionHasAtLeastOneOptOut']
  public messageSubscriptionHasAny?: PersonContactPayload['messageSubscriptionHasAny']
  public messageSubscriptionHasAtLeastOneExclusivelyGranted?: PersonContactPayload['messageSubscriptionHasAtLeastOneExclusivelyGranted']
  public analyticsOrdersCount?: PersonContactPayload['analyticsOrdersCount']
  public analyticsLastIncomingMessageAt?: PersonContactPayload['analyticsLastIncomingMessageAt']
  public analyticsNotificationCampaignParticipation?: PersonContactPayload['analyticsNotificationCampaignParticipation']
  public analyticsNotificationCampaignReads?: PersonContactPayload['analyticsNotificationCampaignReads']
  public analyticsLastOrderDate?: PersonContactPayload['analyticsLastOrderDate']
  public analyticsNotificationCampaignDeliveries?: PersonContactPayload['analyticsNotificationCampaignDeliveries']
  public analyticsStorefrontVendorTags?: PersonContactPayload['analyticsStorefrontVendorTags']
  public analyticsProductsBought?: PersonContactPayload['analyticsProductsBought']
  public analyticsProductCategoriesBoughtFrom?: PersonContactPayload['analyticsProductCategoriesBoughtFrom']
  public analyticsLastOutgoingMessageAt?: PersonContactPayload['analyticsLastOutgoingMessageAt']
  public analyticsNotificationCampaignClicks?: PersonContactPayload['analyticsNotificationCampaignClicks']
  public names?: PersonContactPayload['names']
  public emails?: PersonContactPayload['emails']
  public phonenumbers?: PersonContactPayload['phonenumbers']

  constructor (options: PersonContactOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/people/optimized'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: PersonContactRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.tags = rawPayload.tags
    this.active = rawPayload.active ?? true
    this.deleted = rawPayload.deleted ?? false
    this.gender = rawPayload.gender
    this.displayName = rawPayload.display_name
    this.dateOfBirth = rawPayload.date_of_birth
    this.customProperties = rawPayload.custom_properties

    this.channelParticipations = rawPayload.channel_participations
    this.sentiment = rawPayload.sentiment
    this.sentimentValue = rawPayload.sentiment_value

    this.messageSubscriptionsGranted = rawPayload.message_subscriptions_granted
    this.messageSubscriptionsWithdrawnOrDenied = rawPayload.message_subscriptions_withdrawn_or_denied
    this.messageSubscriptionHasAtLeastOneGranted = rawPayload.message_subscription_has_at_least_one_granted
    this.messageSubscriptionHasAtLeastOneOptOut = rawPayload.message_subscription_has_at_least_one_opt_out
    this.messageSubscriptionHasAny = rawPayload.message_subscription_has_any
    this.messageSubscriptionHasAtLeastOneExclusivelyGranted = rawPayload.message_subscription_has_at_least_one_exclusively_granted

    this.analyticsOrdersCount = rawPayload.analytics_orders_count
    this.analyticsLastIncomingMessageAt = rawPayload.analytics_last_incoming_message_at
    this.analyticsNotificationCampaignParticipation = rawPayload.analytics_notification_campaign_participation
    this.analyticsNotificationCampaignReads = rawPayload.analytics_notification_campaign_reads
    this.analyticsLastOrderDate = rawPayload.analytics_last_order_date
    this.analyticsNotificationCampaignDeliveries = rawPayload.analytics_notification_campaign_deliveries
    this.analyticsStorefrontVendorTags = rawPayload.analytics_storefront_vendor_tags
    this.analyticsProductsBought = rawPayload.analytics_products_bought
    this.analyticsProductCategoriesBoughtFrom = rawPayload.analytics_product_categories_bought_from
    this.analyticsLastOutgoingMessageAt = rawPayload.analytics_last_outgoing_message_at
    this.analyticsNotificationCampaignClicks = rawPayload.analytics_notification_campaign_clicks

    this.names = rawPayload.names
      ? {
        firstName: rawPayload.names.first_name,
        nickname: rawPayload.names.nickname,
        middleName: rawPayload.names.middle_name,
        lastName: rawPayload.names.last_name,
        name: rawPayload.names.name
      }
      : undefined

    /**
     * We only overwrite virtual properties with undefined if their previous state was null or undefined
     * (that way we can keep embed data across patching)
     */

    if (rawPayload.emails && this.initialized) {
      this.emails = rawPayload.emails.map(i => Email.create(i, this.universe, this.http))
    } else if (rawPayload.emails && !this.initialized) {
      this.emails = rawPayload.emails.map(i =>
        Email.createUninitialized(i, this.universe, this.http)
      )
    } else if (!this.emails) {
      this.emails = undefined
    }

    if (rawPayload.phonenumbers && this.initialized) {
      this.phonenumbers = rawPayload.phonenumbers.map(i =>
        Phonenumber.create(i, this.universe, this.http)
      )
    } else if (rawPayload.phonenumbers && !this.initialized) {
      this.phonenumbers = rawPayload.phonenumbers.map(i =>
        Phonenumber.createUninitialized(i, this.universe, this.http)
      )
    } else if (!this.phonenumbers) {
      this.phonenumbers = undefined
    }

    return this
  }

  public serialize (): PersonContactRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      tags: this.tags,
      active: this.active ?? true,
      deleted: this.deleted ?? false,
      gender: this.gender,
      display_name: this.displayName,
      date_of_birth: this.dateOfBirth,
      custom_properties: this.customProperties,

      channel_participations: this.channelParticipations,
      sentiment: this.sentiment,
      sentiment_value: this.sentimentValue,

      message_subscriptions_granted: this.messageSubscriptionsGranted,
      message_subscription_has_at_least_one_granted: this.messageSubscriptionHasAtLeastOneGranted,
      message_subscription_has_at_least_one_opt_out: this.messageSubscriptionHasAtLeastOneOptOut,
      message_subscription_has_any: this.messageSubscriptionHasAny,
      message_subscription_has_at_least_one_exclusively_granted: this.messageSubscriptionHasAtLeastOneExclusivelyGranted,

      analytics_orders_count: this.analyticsOrdersCount,
      analytics_last_incoming_message_at: this.analyticsLastIncomingMessageAt,
      analytics_notification_campaign_participation: this.analyticsNotificationCampaignParticipation,
      analytics_notification_campaign_reads: this.analyticsNotificationCampaignReads,
      analytics_last_order_date: this.analyticsLastOrderDate,
      analytics_notification_campaign_deliveries: this.analyticsNotificationCampaignDeliveries,
      analytics_storefront_vendor_tags: this.analyticsStorefrontVendorTags,
      analytics_products_bought: this.analyticsProductsBought,
      analytics_product_categories_bought_from: this.analyticsProductCategoriesBoughtFrom,
      analytics_last_outgoing_message_at: this.analyticsLastOutgoingMessageAt,
      analytics_notification_campaign_clicks: this.analyticsNotificationCampaignClicks,

      names: this.names
        ? {
          first_name: this.names.firstName,
          nickname: this.names.nickname,
          middle_name: this.names.middleName,
          last_name: this.names.lastName,
          name: this.names.name
        }
        : undefined,

      emails: Array.isArray(this.emails) ? this.emails.map(item => item.serialize()) : undefined,
      phonenumbers: Array.isArray(this.phonenumbers) ? this.phonenumbers.map(item => item.serialize()) : undefined
    }
  }

  public static create (
    payload: PersonContactRawPayload,
    universe: Universe,
    http: Universe['http']
  ): PersonContact {
    return new PersonContact({ rawPayload: payload, universe, http, initialized: true })
  }
}

export interface PeopleContactsOptions extends UniverseEntityOptions {}

export class PeopleContacts extends EntitiesList<PersonContact, PersonContactRawPayload> {
  public static endpoint: string = 'api/v0/people/optimized'
  public endpoint: string = PeopleContacts.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']

  constructor (options: PeopleContactsOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: PersonContactRawPayload): PersonContact {
    return PersonContact.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<EntitiesList<PersonContact, PersonContactRawPayload>> {
    return (await this._getStream(options)) as PeopleContacts
  }

  public async _exportCsv (options?: EntitiesListExportCsvOptions): Promise<Blob> {
    const opts = {
      method: 'POST',
      url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
      headers: {
        Accept: 'text/csv'
      },
      data: {
        ...options?.body
      },
      responseType: 'blob'
    }

    // eslint-disable-next-line @typescript-eslint/return-await
    return await this.http?.getClient()(opts)
      .then((res: { data: any }) => res.data)
      .catch((err: any) => {
        this.emit('error', err)
        return undefined
      })
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }
}
