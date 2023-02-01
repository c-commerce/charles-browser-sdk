
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface KnowledgeBaseFaqItemOptions extends UniverseEntityOptions {
  rawPayload?: KnowledgeBaseFaqItemRawPayload
}

export interface KnowledgeBaseFaqItemRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly locale?: string
  readonly question?: string
  readonly answer?: string
  readonly knowledge_base?: string
  readonly is_proxy?: boolean
  readonly proxy_payload?: {
    [key: string]: any
  }
}

export interface KnowledgeBaseFaqItemPayload {
  readonly id?: KnowledgeBaseFaqItemRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: KnowledgeBaseFaqItemRawPayload['deleted']
  readonly active?: KnowledgeBaseFaqItemRawPayload['active']
  readonly locale?: KnowledgeBaseFaqItemRawPayload['locale']
  readonly question?: KnowledgeBaseFaqItemRawPayload['question']
  readonly answer?: KnowledgeBaseFaqItemRawPayload['answer']
  readonly knowledgeBase?: KnowledgeBaseFaqItemRawPayload['knowledge_base']
  readonly isProxy?: KnowledgeBaseFaqItemRawPayload['is_proxy']
  readonly proxyPayload?: KnowledgeBaseFaqItemRawPayload['proxy_payload']
}

/**
 * Manage knowledge_base_faq_items.
 *
 * @category Entity
 */
export class KnowledgeBaseFaqItem extends UniverseEntity<KnowledgeBaseFaqItemPayload, KnowledgeBaseFaqItemRawPayload> {
  public get entityName (): string {
    return 'knowledge_base_faq_items'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: KnowledgeBaseFaqItemOptions
  public initialized: boolean

  public endpoint: string

  public id?: KnowledgeBaseFaqItemPayload['id']
  public createdAt?: KnowledgeBaseFaqItemPayload['createdAt']
  public updatedAt?: KnowledgeBaseFaqItemPayload['updatedAt']
  public deleted?: KnowledgeBaseFaqItemPayload['deleted']
  public active?: KnowledgeBaseFaqItemPayload['active']
  public locale?: KnowledgeBaseFaqItemPayload['locale']
  public question?: KnowledgeBaseFaqItemPayload['question']
  public answer?: KnowledgeBaseFaqItemPayload['answer']
  public knowledgeBase?: KnowledgeBaseFaqItemPayload['knowledgeBase']
  public isProxy?: KnowledgeBaseFaqItemPayload['isProxy']
  public proxyPayload?: KnowledgeBaseFaqItemPayload['proxyPayload']

  constructor (options: KnowledgeBaseFaqItemOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/knowledge_base_faq_items'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: KnowledgeBaseFaqItemRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.locale = rawPayload.locale
    this.question = rawPayload.question
    this.answer = rawPayload.answer
    this.knowledgeBase = rawPayload.knowledge_base
    this.isProxy = rawPayload.is_proxy
    this.proxyPayload = rawPayload.proxy_payload

    return this
  }

  public static create (payload: KnowledgeBaseFaqItemRawPayload, universe: Universe, http: Universe['http']): KnowledgeBaseFaqItem {
    return new KnowledgeBaseFaqItem({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): KnowledgeBaseFaqItemRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      locale: this.locale,
      question: this.question,
      answer: this.answer,
      knowledge_base: this.knowledgeBase,
      is_proxy: this.isProxy,
      proxy_payload: this.proxyPayload
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new KnowledgeBaseFaqItemInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class KnowledgeBaseFaqItems {
  public static endpoint: string = 'api/v0/knowledge_base_faq_items'
}

export class KnowledgeBaseFaqItemInitializationError extends BaseError {
  public name = 'KnowledgeBaseFaqItemInitializationError'
  constructor (public message: string = 'Could not initialize knowledge_base_faq_item.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, KnowledgeBaseFaqItemInitializationError.prototype)
  }
}

export class KnowledgeBaseFaqItemFetchRemoteError extends BaseError {
  public name = 'KnowledgeBaseFaqItemFetchRemoteError'
  constructor (public message: string = 'Could not get knowledge_base_faq_item.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, KnowledgeBaseFaqItemFetchRemoteError.prototype)
  }
}

export class KnowledgeBaseFaqItemsFetchRemoteError extends BaseError {
  public name = 'KnowledgeBaseFaqItemsFetchRemoteError'
  constructor (public message: string = 'Could not get knowledge_base_faq_items.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, KnowledgeBaseFaqItemsFetchRemoteError.prototype)
  }
}
