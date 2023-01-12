
import { UniverseEntity, UniverseEntityOptions, EntityFetchOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'
import * as knowledgeBaseFaqItem from '../knowledge-base-faq-item/knowledge-base-faq-item'

export interface KnowledgeBaseOptions extends UniverseEntityOptions {
  rawPayload?: KnowledgeBaseRawPayload
}

export interface KnowledgeBaseRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly external_reference_id?: string
  readonly name?: string
  readonly metadata?: {
    [key: string]: any
  }
  readonly configuration?: {
    [key: string]: any
  }
  readonly labels?: {
    [key: string]: any
  }
  readonly nlu?: string
  readonly is_proxy?: boolean
  readonly proxy_vendor?: string
  readonly proxy_payload?: {
    [key: string]: any
  }
}

export interface KnowledgeBasePayload {
  readonly id?: KnowledgeBaseRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: KnowledgeBaseRawPayload['deleted']
  readonly active?: KnowledgeBaseRawPayload['active']
  readonly externalReferenceId?: KnowledgeBaseRawPayload['external_reference_id']
  readonly name?: KnowledgeBaseRawPayload['name']
  readonly metadata?: KnowledgeBaseRawPayload['metadata']
  readonly configuration?: KnowledgeBaseRawPayload['configuration']
  readonly labels?: KnowledgeBaseRawPayload['labels']
  readonly nlu?: KnowledgeBaseRawPayload['nlu']
  readonly isProxy?: KnowledgeBaseRawPayload['is_proxy']
  readonly proxyVendor?: KnowledgeBaseRawPayload['proxy_vendor']
  readonly proxyPayload?: KnowledgeBaseRawPayload['proxy_payload']
}

/**
 * Manage knowledge_bases.
 *
 * @category Entity
 */
export class KnowledgeBase extends UniverseEntity<KnowledgeBasePayload, KnowledgeBaseRawPayload> {
  public get entityName (): string {
    return 'knowledge_base'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: KnowledgeBaseOptions
  public initialized: boolean

  public endpoint: string

  public id?: KnowledgeBasePayload['id']
  public createdAt?: KnowledgeBasePayload['createdAt']
  public updatedAt?: KnowledgeBasePayload['updatedAt']
  public deleted?: KnowledgeBasePayload['deleted']
  public active?: KnowledgeBasePayload['active']
  public externalReferenceId?: KnowledgeBasePayload['externalReferenceId']
  public name?: KnowledgeBasePayload['name']
  public metadata?: KnowledgeBasePayload['metadata']
  public configuration?: KnowledgeBasePayload['configuration']
  public labels?: KnowledgeBasePayload['labels']
  public nlu?: KnowledgeBasePayload['nlu']
  public isProxy?: KnowledgeBasePayload['isProxy']
  public proxyVendor?: KnowledgeBasePayload['proxyVendor']
  public proxyPayload?: KnowledgeBasePayload['proxyPayload']

  constructor (options: KnowledgeBaseOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/knowledge_bases'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: KnowledgeBaseRawPayload): KnowledgeBase {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true

    this.externalReferenceId = rawPayload.external_reference_id
    this.name = rawPayload.name
    this.metadata = rawPayload.metadata
    this.configuration = rawPayload.configuration
    this.labels = rawPayload.labels
    this.nlu = rawPayload.nlu
    this.isProxy = rawPayload.is_proxy
    this.proxyVendor = rawPayload.proxy_vendor
    this.proxyPayload = rawPayload.proxy_payload

    return this
  }

  public static create (payload: KnowledgeBaseRawPayload, universe: Universe, http: Universe['http']): KnowledgeBase {
    return new KnowledgeBase({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): KnowledgeBaseRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      external_reference_id: this.externalReferenceId,
      name: this.name,
      metadata: this.metadata,
      configuration: this.configuration,
      labels: this.labels,
      nlu: this.nlu,
      is_proxy: this.isProxy,
      proxy_vendor: this.proxyVendor,
      proxy_payload: this.proxyPayload
    }
  }

  public async init (): Promise<KnowledgeBase | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new KnowledgeBaseInitializationError(undefined, { error: err }))
    }
  }

  public async knowledgeBaseFaqItems (options?: EntityFetchOptions): Promise<knowledgeBaseFaqItem.KnowledgeBaseFaqItem[] | knowledgeBaseFaqItem.KnowledgeBaseFaqItemRawPayload[] | undefined> {
    if (!this.id) throw new TypeError('fetching knowledge base faq items requires knowledge base id to be set')

    const opts: EntityFetchOptions = {
      ...options,
      query: {
        ...options?.query,
        knowledge_base: this.id
      }
    }

    return await this.universe.makeBaseResourceListRequest<knowledgeBaseFaqItem.KnowledgeBaseFaqItem, knowledgeBaseFaqItem.KnowledgeBaseFaqItems, knowledgeBaseFaqItem.KnowledgeBaseFaqItemRawPayload, EntityFetchOptions, knowledgeBaseFaqItem.KnowledgeBaseFaqItemsFetchRemoteError>(knowledgeBaseFaqItem.KnowledgeBaseFaqItem, knowledgeBaseFaqItem.KnowledgeBaseFaqItems, knowledgeBaseFaqItem.KnowledgeBaseFaqItemsFetchRemoteError, opts)
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class KnowledgeBases {
  public static endpoint: string = 'api/v0/knowledge_bases'
}

export class KnowledgeBaseInitializationError extends BaseError {
  public name = 'KnowledgeBaseInitializationError'
  constructor (public message: string = 'Could not initialize knowledge_basis.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, KnowledgeBaseInitializationError.prototype)
  }
}

export class KnowledgeBaseFetchRemoteError extends BaseError {
  public name = 'KnowledgeBaseFetchRemoteError'
  constructor (public message: string = 'Could not get knowledge_basis.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, KnowledgeBaseFetchRemoteError.prototype)
  }
}

export class KnowledgeBasesFetchRemoteError extends BaseError {
  public name = 'KnowledgeBasesFetchRemoteError'
  constructor (public message: string = 'Could not get knowledge_bases.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, KnowledgeBasesFetchRemoteError.prototype)
  }
}
