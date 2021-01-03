
import Entity, { EntityOptions } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface FavoriteOptions extends EntityOptions {
  rawPayload?: FavoriteRawPayload
}

export interface FavoriteRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly name?: string | null
  readonly pages?: null | Array<{
    order_index?: number
    items: Array<{
      type: 'product' | string
      resource: string
    }>
  }>
  //  virutal props
  readonly items?: Array<{
    type: 'product' | string
    resource: string
    payload: object | null
  }>
}

export interface FavoritePayload {
  readonly id?: FavoriteRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: FavoriteRawPayload['deleted']
  readonly active?: FavoriteRawPayload['active']
  readonly name?: FavoriteRawPayload['name']
  readonly pages?: FavoriteRawPayload['pages']
  readonly items?: FavoriteRawPayload['items']
}

/**
 * Manage favorites.
 *
 * @category Entity
 */
export class Favorite extends Entity<FavoritePayload, FavoriteRawPayload> {
  protected universe: Universe
  protected http: Universe['http']
  protected options: FavoriteOptions
  public initialized: boolean

  public endpoint: string

  public id?: FavoritePayload['id']
  public createdAt?: FavoritePayload['createdAt']
  public updatedAt?: FavoritePayload['updatedAt']
  public deleted?: FavoritePayload['deleted']
  public active?: FavoritePayload['active']
  public name?: FavoritePayload['name']
  public pages?: FavoritePayload['pages']
  public items?: FavoritePayload['items']

  constructor (options: FavoriteOptions) {
    super()
    this.universe = options.universe
    this.endpoint = 'api/v0/favorites'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: FavoriteRawPayload): Favorite {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.name = rawPayload.name
    this.pages = rawPayload.pages
    this.items = rawPayload.items ?? undefined

    return this
  }

  public static create (payload: FavoriteRawPayload, universe: Universe, http: Universe['http']): Favorite {
    return new Favorite({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): FavoriteRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      name: this.name,
      pages: this.pages
      // NOTE: we are serializing items
    }
  }

  public async init (): Promise<Favorite | undefined> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new FavoriteInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Favorites {
  public static endpoint: string = 'api/v0/favorites'
}

export class FavoriteInitializationError extends BaseError {
  public name = 'FavoriteInitializationError'
  constructor (public message: string = 'Could not initialize favorite.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FavoriteInitializationError.prototype)
  }
}

export class FavoriteFetchRemoteError extends BaseError {
  public name = 'FavoriteFetchRemoteError'
  constructor (public message: string = 'Could not get favorite.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FavoriteFetchRemoteError.prototype)
  }
}

export class FavoritesFetchRemoteError extends BaseError {
  public name = 'FavoritesFetchRemoteError'
  constructor (public message: string = 'Could not get favorites.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, FavoritesFetchRemoteError.prototype)
  }
}
