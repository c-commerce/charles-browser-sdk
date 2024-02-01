
import { UniverseEntityOptions, UniverseEntity } from '../_base'
import { Universe } from '../../universe'
import { BaseError } from '../../errors'

export interface ConfigurationOptions extends UniverseEntityOptions {
  rawPayload?: ConfigurationRawPayload
}

export interface ConfigurationOOODay {
  all_day: boolean
  slots: Array<{
    start: string
    end: string
  }>
}

// export enum AttributionModel {
//   LAST_TOUCH = 'last_touch',
//   COUPON_CODE_UNSTITCHED = 'coupon_code_unstitched',
//   COUPON_CODE_ALL = 'coupon_code_all'
// }

// export type AttributionModels = Record<AttributionModel, boolean>

// export interface AttributionHistory {
//   date: string
//   value: number
//   enabledModels: AttributionModels
// }

// export interface ConfigurationAttribution {
//   last_touch_attribution_window?: number | null
//   last_touch_attribution_window_history?: AttributionHistory[] | null
//   enabled_attribution_models?: {
//     last_touch?: boolean
//     coupon_code_unstitched?: boolean
//     coupon_code_all?: boolean
//   }
// }

export interface ConfigurationSettings {
  default_timezone?: string | null
  default_currency?: string | null
  default_language?: string | null
  // attribution?: ConfigurationAttribution
  last_touch_attribution_window?: number | null
  last_touch_attribution_window_history?: Array<{
    date: string
    value: number
  }> | null
}

export interface ConfigurationRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly owner?: string
  readonly configuration?: {
    settings?: ConfigurationSettings
    api?: object
    feedback?: object
    out_of_office?: {
      event_route: null | string
      times: {
        monday: ConfigurationOOODay
        tuesday: ConfigurationOOODay
        wednesday: ConfigurationOOODay
        thursday: ConfigurationOOODay
        friday: ConfigurationOOODay
        saturday: ConfigurationOOODay
        sunday: ConfigurationOOODay
      }
    }
  }
  ui?: {
    [key: string]: any
  }
  privacy?: {
    [key: string]: any
  }
  dashboard?: {
    [key: string]: any
  }
}

export interface ConfigurationPayload {
  readonly id?: ConfigurationRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: ConfigurationRawPayload['deleted']
  readonly active?: ConfigurationRawPayload['active']
  readonly owner?: ConfigurationRawPayload['owner']
  readonly configuration?: ConfigurationRawPayload['configuration']
  readonly ui?: ConfigurationRawPayload['ui']
  readonly privacy?: ConfigurationRawPayload['privacy']
  readonly dashboard?: ConfigurationRawPayload['dashboard']
}

/**
 * Manage configurations.
 *
 * @category Entity
 */
export class Configuration extends UniverseEntity<ConfigurationPayload, ConfigurationRawPayload> {
  public get entityName (): string {
    return 'configurations'
  }

  protected universe: Universe
  protected apiCarrier: Universe
  protected http: Universe['http']
  protected options: ConfigurationOptions
  public initialized: boolean

  public endpoint: string

  public id?: ConfigurationPayload['id']
  public createdAt?: ConfigurationPayload['createdAt']
  public updatedAt?: ConfigurationPayload['updatedAt']
  public deleted?: ConfigurationPayload['deleted']
  public active?: ConfigurationPayload['active']
  public owner?: ConfigurationPayload['owner']
  public configuration?: ConfigurationPayload['configuration']
  public ui?: ConfigurationPayload['ui']
  public privacy?: ConfigurationPayload['privacy']
  public dashboard?: ConfigurationPayload['dashboard']

  constructor (options: ConfigurationOptions) {
    super()
    this.universe = options.universe
    this.apiCarrier = options.universe
    this.endpoint = 'api/v0/configurations'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: ConfigurationRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.owner = rawPayload.owner
    this.configuration = rawPayload.configuration
    this.ui = rawPayload.ui
    this.privacy = rawPayload.privacy
    this.dashboard = rawPayload.dashboard

    return this
  }

  public static create (payload: ConfigurationRawPayload, universe: Universe, http: Universe['http']): Configuration {
    return new Configuration({ rawPayload: payload, universe, http, initialized: true })
  }

  public serialize (): ConfigurationRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      owner: this.owner,
      configuration: this.configuration,
      ui: this.ui,
      privacy: this.privacy,
      dashboard: this.dashboard
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new ConfigurationInitializationError(undefined, { error: err }))
    }
  }
}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Configurations {
  public static endpoint: string = 'api/v0/configurations'
}

export class ConfigurationInitializationError extends BaseError {
  public name = 'ConfigurationInitializationError'
  constructor (public message: string = 'Could not initialize configuration.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationInitializationError.prototype)
  }
}

export class ConfigurationFetchRemoteError extends BaseError {
  public name = 'ConfigurationFetchRemoteError'
  constructor (public message: string = 'Could not get configuration.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationFetchRemoteError.prototype)
  }
}

export class ConfigurationsFetchRemoteError extends BaseError {
  public name = 'ConfigurationsFetchRemoteError'
  constructor (public message: string = 'Could not get configurations.', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationsFetchRemoteError.prototype)
  }
}
