
import { UniverseEntity, UniverseEntityOptions, EntityFetchOptions, EntityDeleteOptions, EntitiesList } from '../_base'
import { Universe, UniverseFetchOptions, UniverseExportCsvOptions } from '../../universe'
import { BaseError } from '../../errors'
import {
  ContactListStaticEntry, ContactListStaticEntryCreateRemoteError,
  ContactListStaticEntryRawPayload, ContactListStaticEntryFetchRemoteError,
  ContactListStaticEntryDeleteRemoteError
} from './static-entry'
import qs from 'qs'
import omit from 'just-omit'
import { RuleGroupExpr } from './audience-builder-types'

export interface ContactListOptions extends UniverseEntityOptions {
  rawPayload?: ContactListRawPayload
}

export interface ContactListImportContact {
  readonly people_phonenumber_external_value?: string
  readonly people_organization_external_name?: string
  readonly people_external_firstname?: string
  readonly people_external_email?: string
}
export interface ContactListImportContacts extends Array<ContactListImportContact> {}

export enum IContactListSplitTypeEnum {
  equally = 'equally',
  amount = 'amount',
  percentage = 'percentage',
  custom = 'custom'
}

export type ICartStatusType = IContactListSplitTypeEnum.equally | IContactListSplitTypeEnum.amount | IContactListSplitTypeEnum.percentage | IContactListSplitTypeEnum.custom

export interface ContactListSplitConfiguration {
  readonly configuration?: {
    type?: ICartStatusType
    amount?: number
  } | object | null
}
export interface ContactListRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean

  readonly name?: string
  readonly summary?: string
  readonly filters?: Array<{
    effect?: 'include' | 'exclude'
    query?: string
  }> | null
  readonly rules?: RuleGroupExpr | null
  readonly type?: 'dynamic' | 'static'
  readonly author?: {
    staff?: string[]
    user?: string[]
  }
  readonly static_entries?: ContactListStaticEntryRawPayload[]
  readonly labels?: Record<string | number | symbol, any>
  readonly parent?: string
  readonly external_list_reference_id?: string
  // only klavyio related, need to be unified somewhere when we support more
  readonly external_list_type?: 'list' | 'segment' | null
  readonly broker?: string
  // as we support list import only from klaviyo right now, only those enums are set.
  // if we support more in the furture, we need to add them here.
  readonly source_type?: 'klaviyo' | null
  readonly source_api?: 'charles_klaviyo_app' | null
  readonly proxy_reference_id?: string
  readonly links?: null | {
    external?: string | null
  }
  readonly last_synced_at?: string
  readonly is_syncing?: boolean
  readonly hide?: string[] | null
}

export interface ContactListPayload {
  readonly id?: ContactListRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ContactListRawPayload['deleted']
  readonly active?: ContactListRawPayload['active']

  readonly name?: ContactListRawPayload['name']
  readonly summary?: ContactListRawPayload['summary']
  readonly filters?: ContactListRawPayload['filters']
  readonly rules?: ContactListRawPayload['rules']
  readonly type?: ContactListRawPayload['type']
  readonly author?: ContactListRawPayload['author']
  readonly staticEntries?: ContactListStaticEntry[]
  readonly labels?: ContactListRawPayload['labels']
  readonly parent?: ContactListRawPayload['parent']
  readonly externalListReferenceId?: ContactListRawPayload['external_list_reference_id']
  readonly externalListType?: ContactListRawPayload['external_list_type']
  readonly broker?: ContactListRawPayload['broker']
  readonly sourceType?: ContactListRawPayload['source_type']
  readonly sourceApi?: ContactListRawPayload['source_api']
  readonly proxyReferenceId?: ContactListRawPayload['proxy_reference_id']
  readonly links?: ContactListRawPayload['links']
  readonly lastSyncedAt?: Date | null
  readonly isSyncing?: ContactListRawPayload['is_syncing']
  readonly hide?: ContactListRawPayload['hide']
}

/**
 * Manage contact_lists.
 *
 * @category Entity
 */
export class ContactList extends UniverseEntity<ContactListPayload, ContactListRawPayload> {
  public get entityName (): string {
    return 'contact_lists'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ContactListOptions
  public initialized: boolean

  public endpoint: string

  public id?: ContactListPayload['id']
  public createdAt?: ContactListPayload['createdAt']
  public updatedAt?: ContactListPayload['updatedAt']
  public deleted?: ContactListPayload['deleted']
  public active?: ContactListPayload['active']

  public name?: ContactListPayload['name']
  public summary?: ContactListPayload['summary']
  public filters?: ContactListPayload['filters']
  public rules?: ContactListPayload['rules']
  public type?: ContactListPayload['type']
  public author?: ContactListPayload['author']
  public labels?: ContactListPayload['labels']
  public parent?: ContactListPayload['parent']
  public _staticEntries?: ContactListPayload['staticEntries']
  public externalListReferenceId?: ContactListPayload['externalListReferenceId']
  public externalListType?: ContactListPayload['externalListType']
  public broker?: ContactListPayload['broker']
  public sourceType?: ContactListPayload['sourceType']
  public sourceApi?: ContactListPayload['sourceApi']
  public proxyReferenceId?: ContactListPayload['proxyReferenceId']
  public links?: ContactListPayload['links']
  public lastSyncedAt?: ContactListPayload['lastSyncedAt']
  public isSyncing?: ContactListPayload['isSyncing']
  public hide?: ContactListPayload['hide']
  constructor (options: ContactListOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/contact_lists'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ContactListRawPayload): this {
    // last_synced_at is not editable on client-api and so it has to be ommited as readonly prop
    this.setRawPayload(omit(rawPayload, ['last_synced_at']))

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.summary = rawPayload.summary
    this.filters = rawPayload.filters
    this.rules = rawPayload.rules ?? null
    this.type = rawPayload.type
    this.author = rawPayload.author
    this.labels = rawPayload.labels
    this.parent = rawPayload.parent
    this.externalListReferenceId = rawPayload.external_list_reference_id
    this.externalListType = rawPayload.external_list_type
    this.broker = rawPayload.broker
    this.sourceType = rawPayload.source_type
    this.sourceApi = rawPayload.source_api
    this.proxyReferenceId = rawPayload.proxy_reference_id
    this.links = rawPayload.links
    this.lastSyncedAt = rawPayload.last_synced_at ? new Date(rawPayload.last_synced_at) : undefined
    this.isSyncing = rawPayload.is_syncing
    this.hide = rawPayload.hide ?? null

    if (rawPayload.static_entries && this.initialized) {
      this._staticEntries = rawPayload.static_entries.map(i => ContactListStaticEntry.create(i, this.universe, this.http))
    } else if (rawPayload.static_entries && !this.initialized) {
      this._staticEntries = rawPayload.static_entries.map(i =>
        ContactListStaticEntry.createUninitialized(i, this.universe, this.http)
      )
    } else {
      this._staticEntries = undefined
    }

    return this
  }

  public static create (payload: ContactListRawPayload, universe: Universe, http: Universe['http']): ContactList {
    return new ContactList({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ContactListRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,

      name: this.name,
      summary: this.summary,
      filters: this.filters,
      rules: this.rules ?? null,
      type: this.type,
      author: this.author,
      labels: this.labels,
      parent: this.parent,
      external_list_reference_id: this.externalListReferenceId,
      external_list_type: this.externalListType,
      broker: this.broker,
      source_type: this.sourceType,
      source_api: this.sourceApi,
      proxy_reference_id: this.proxyReferenceId,
      links: this.links,
      is_syncing: this.isSyncing,
      hide: this.hide ?? null
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ContactListInitializationError(undefined, { error: err }))
    }
  }

  public async import (contactList: ContactListImportContacts): Promise<any> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id as string}/static_entries/import`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: contactList,
        responseType: 'json'
      }

      return await this.http?.getClient()(opts)
    } catch (err) {
      throw this.handleError(new ContactListImportRemoteError(undefined, { error: err }))
    }
  }

  /**
 * Get live preview data of a dynamic contact list
 */
  public async preview (options?: EntityFetchOptions): Promise<ContactListStaticEntryRawPayload[]> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id as string}/preview${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json',
        timeout: options?.timeout ?? 10000
      }

      const res = await this.http?.getClient()(opts)
      const resources = res.data.data as ContactListStaticEntryRawPayload[]
      if (options && options.raw === true) {
        return resources
      }

      return resources.map((item: ContactListStaticEntryRawPayload) => {
        return ContactListStaticEntry.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw this.handleError(new ContactListPreviewRemoteError(undefined, { error: err }))
    }
  }

  /**
   * Get a count of the contacts in a dynamic contact list
   * @param options EntityFetchOptions
   */
  public async previewCount (options?: EntityFetchOptions): Promise<{ count: number }> {
    try {
      const opts = {
        method: 'HEAD',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id as string}/preview${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        timeout: options?.timeout ?? 10000
      }

      const res = await this.http.getClient()(opts)

      return {
        count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
      }
    } catch (err) {
      throw this.handleError(new ContactListPreviewCountRemoteError(undefined, { error: err }))
    }
  }

  /**
  * Split a (dynamic) list
  */
  public async split (splitConfig: ContactListSplitConfiguration, options?: EntityFetchOptions): Promise<ContactListRawPayload[]> {
    try {
      const opts = {
        method: 'PUT',
        url: `${this.universe?.universeBase}/${this.endpoint}/${this.id as string}/split${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        responseType: 'json',
        data: splitConfig,
        timeout: options?.timeout ?? 30000
      }

      const res = await this.http?.getClient()(opts)

      const resources = res.data.data as ContactListRawPayload[]
      if (options && options.raw === true) {
        return resources
      }

      return resources.map((item: ContactListRawPayload) => {
        return ContactList.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw this.handleError(new ContactListSplitRemoteError(undefined, { error: err }))
    }
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    const opts = {
      method: 'GET',
      timeout: 60000,
      url: `${this.apiCarrier?.injectables?.base}/${this.endpoint}/${this.id as string}/preview/export${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
      headers: {
        Accept: 'text/csv'
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

  /**
   * Static entry accessor
   *
   * ```js
   * // fetch all static entries of a contact list
   * await contactList.staticEntries.fetch()
   * // fetch all static entries as raw structs with some query options
   * await contactList.staticEntries.fetch({ raw: true })
   * // cast a list of class instances to list of structs
   * contactList.staticEntries.toJson([staticEntry])
   * // cast a list of structs to list of class instances
   * contactList.staticEntries.fromJson([staticEntry])
   * // create a static entry for this contact list
   * contactList.staticEntries.create(staticEntry)
   * ```
   */
  get staticEntries (): StaticEntryArray<ContactListStaticEntry> {
    const sea = new StaticEntryArray<ContactListStaticEntry>(this._staticEntries ?? [], this.universe, this.http, this)
    return sea
  }

  set staticEntries (items: StaticEntryArray<ContactListStaticEntry>) {
    this._staticEntries = items.map((item: ContactListStaticEntry) => (item))
  }
}

class StaticEntryArray<T> extends Array<T> {
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected contactList: ContactList

  constructor (items: T[], universe: Universe, http: Universe['http'], contactList: ContactList) {
    super(...items)
    this.universe = universe
    this.apiCarrier = universe
    this.http = http
    this.contactList = contactList
    Object.setPrototypeOf(this, StaticEntryArray.prototype)
  }

  public fromJson (payloads: ContactListStaticEntryRawPayload[]): ContactListStaticEntry[] {
    return payloads.map(item => ContactListStaticEntry.create(item, this.universe, this.http))
  }

  public toJson (items: ContactListStaticEntry[]): ContactListStaticEntryRawPayload[] {
    return items.map(item => item.serialize())
  }

  public async fetch (
    options?: EntityFetchOptions
  ): Promise<ContactListStaticEntry[] | ContactListStaticEntryRawPayload[] | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/${ContactLists.endpoint}/${this.contactList.id as string}/static_entries`,
        params: {
          ...(options?.query ? options.query : {})
        }
      }
      const res = await this.http.getClient()(opts)
      const resources = res.data.data as ContactListStaticEntryRawPayload[]

      if (options && options.raw === true) {
        return resources
      }

      return resources.map((item: ContactListStaticEntryRawPayload) => {
        return ContactListStaticEntry.create(item, this.universe, this.http)
      })
    } catch (err) {
      throw new ContactListStaticEntryFetchRemoteError(undefined, { error: err })
    }
  }

  async create (payload: ContactListStaticEntryRawPayload): Promise<ContactListStaticEntry | undefined> {
    try {
      const opts = {
        method: 'POST',
        url: `${this.universe.universeBase}/${ContactLists.endpoint}/${this.contactList.id as string}/static_entries`,
        data: payload
      }
      const res = await this.http.getClient()(opts)
      const resources = res.data.data as ContactListStaticEntryRawPayload[]

      return resources.map((item: ContactListStaticEntryRawPayload) => {
        return ContactListStaticEntry.create(item, this.universe, this.http)
      })[0]
    } catch (err) {
      throw new ContactListStaticEntryCreateRemoteError(undefined, { error: err })
    }
  }

  async delete (payload: ContactListStaticEntryRawPayload | ContactListStaticEntry, options?: EntityDeleteOptions): Promise<number> {
    if (payload.id === null || payload.id === undefined) throw new TypeError('delete requires id to be set.')

    try {
      const opts = {
        method: 'DELETE',
        url: `${this.universe.universeBase}/${ContactLists.endpoint}/${this.contactList.id as string}/static_entries/${payload.id}${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: undefined,
        responseType: 'json'
      }
      const res = await this.http.getClient()(opts)
      return res.status
    } catch (err) {
      throw new ContactListStaticEntryDeleteRemoteError(undefined, { error: err })
    }
  }

  async deleteStaticEntriesById (ids: Array<ContactListStaticEntryRawPayload['id']>, options?: EntityDeleteOptions): Promise<number> {
    if (!Array.isArray(ids) || !ids.length) throw new TypeError('deletion of static entries requires IDs to be set.')

    try {
      const opts = {
        method: 'DELETE',
        url: `${this.universe.universeBase}/${ContactLists.endpoint}/${this.contactList.id as string}/static_entries${options?.query ? qs.stringify(options.query, { addQueryPrefix: true }) : ''}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: ids,
        responseType: 'json'
      }
      const res = await this.http.getClient()(opts)
      return res.status
    } catch (err) {
      throw new ContactListStaticEntryDeleteRemoteError(undefined, { error: err })
    }
  }
}

export interface ContactListsOptions {
  universe: Universe
  http: Universe['http']
}
export class ContactLists extends EntitiesList<ContactList, ContactListRawPayload> {
  public static endpoint: string = 'api/v0/contact_lists'
  public endpoint: string = ContactLists.endpoint
  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']

  constructor (options: ContactListsOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.http = options.http
  }

  protected parseItem (payload: ContactListRawPayload): ContactList {
    return ContactList.create(payload, this.universe, this.http)
  }

  public async getStream (options?: UniverseFetchOptions): Promise<ContactLists> {
    return (await this._getStream(options)) as ContactLists
  }

  public async exportCsv (options?: UniverseExportCsvOptions): Promise<Blob> {
    return (await this._exportCsv(options))
  }

  public async fetch (options: EntityFetchOptions): Promise<ContactList[] | ContactListRawPayload[] | undefined> {
    try {
      return await super.fetch(options)
    } catch (err) {
      throw new ContactListsFetchRemoteError(undefined, { error: err })
    }
  }
}

export class ContactListInitializationError extends BaseError {
  public name = 'ContactListInitializationError'
  constructor (public message: string = 'Could not initialize contact_list.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListInitializationError.prototype)
  }
}

export class ContactListFetchRemoteError extends BaseError {
  public name = 'ContactListFetchRemoteError'
  constructor (public message: string = 'Could not get contact_list.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListFetchRemoteError.prototype)
  }
}

export class ContactListsFetchRemoteError extends BaseError {
  public name = 'ContactListsFetchRemoteError'
  constructor (public message: string = 'Could not get contact_lists.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListsFetchRemoteError.prototype)
  }
}
export class ContactListsFetchCountRemoteError extends BaseError {
  public name = 'ContactListsFetchCountRemoteError'
  constructor (public message: string = 'Could not get count of Contact Lists.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListsFetchCountRemoteError.prototype)
  }
}
export class ContactListPreviewRemoteError extends BaseError {
  public name = 'ContactListPreviewRemoteError'
  constructor (public message: string = 'Could not get preview of Contact List.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListPreviewRemoteError.prototype)
  }
}
export class ContactListImportRemoteError extends BaseError {
  public name = 'ContactListImportRemoteError'
  constructor (public message: string = 'Could not import contacts into Contact List.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListImportRemoteError.prototype)
  }
}
export class ContactListPreviewCountRemoteError extends BaseError {
  public name = 'ContactListPreviewCountRemoteError'
  constructor (public message: string = 'Could not get preview count of Contact List.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListPreviewCountRemoteError.prototype)
  }
}
export class ContactListSplitRemoteError extends BaseError {
  public name = 'ContactListSplitRemoteError'
  constructor (public message: string = 'Could not split contact list.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ContactListSplitRemoteError.prototype)
  }
}
