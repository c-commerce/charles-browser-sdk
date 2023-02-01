
// import qs from 'qs'
// import { Client } from 'src/client'
import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import { Cloud } from '../../index'

export interface CloudUniversesWabaOptions extends EntityOptions {
  rawPayload?: CloudUniversesWabaRawPayload
}

export interface CloudUniversesWabaRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly organization?: string
  readonly universe?: string
  readonly billable?: boolean
  readonly approved?: boolean
  readonly external_name?: string
  readonly external_reference_id?: string
  readonly vendor?: string
  readonly status?: string
  readonly product?: string
  readonly payload?: object

}

export interface CloudUniversesWabaPayload {
  readonly id?: CloudUniversesWabaRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly organization?: CloudUniversesWabaRawPayload['organization']
  readonly universe?: CloudUniversesWabaRawPayload['universe']
  readonly billable?: CloudUniversesWabaRawPayload['billable']
  readonly approved?: CloudUniversesWabaRawPayload['approved']
  readonly externalName?: CloudUniversesWabaRawPayload['external_name']
  readonly externalReferenceId?: CloudUniversesWabaRawPayload['external_reference_id']
  readonly vendor?: CloudUniversesWabaRawPayload['vendor']
  readonly status?: CloudUniversesWabaRawPayload['status']
  readonly product?: CloudUniversesWabaRawPayload['product']
  readonly payload?: CloudUniversesWabaRawPayload['payload']
}

/**
 * Manage CloudUniversesWabas.
 *
 * @category Entity
 */
export class CloudUniversesWaba extends Entity<CloudUniversesWabaPayload, CloudUniversesWabaRawPayload> {
  public get entityName (): string {
    return 'cloud_universes_wabas'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: CloudUniversesWabaOptions
  public initialized: boolean

  public endpoint: string

  public id?: CloudUniversesWabaPayload['id']
  public createdAt?: CloudUniversesWabaPayload['createdAt']
  public updatedAt?: CloudUniversesWabaPayload['updatedAt']
  public deleted?: CloudUniversesWabaPayload['deleted']
  public active?: CloudUniversesWabaPayload['active']

  public organization?: CloudUniversesWabaPayload['organization']
  public universe?: CloudUniversesWabaPayload['universe']
  public billable?: CloudUniversesWabaPayload['billable']
  public approved?: CloudUniversesWabaPayload['approved']
  public externalName?: CloudUniversesWabaPayload['externalName']
  public externalReferenceId?: CloudUniversesWabaPayload['externalReferenceId']
  public vendor?: CloudUniversesWabaPayload['vendor']
  public status?: CloudUniversesWabaPayload['status']
  public product?: CloudUniversesWabaPayload['product']
  public payload?: CloudUniversesWabaPayload['payload']

  constructor (options: CloudUniversesWabaOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/universes_wabas'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CloudUniversesWabaRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.organization = rawPayload.organization
    this.universe = rawPayload.universe
    this.billable = rawPayload.billable
    this.approved = rawPayload.approved
    this.externalName = rawPayload.external_name
    this.externalReferenceId = rawPayload.external_reference_id
    this.vendor = rawPayload.vendor
    this.status = rawPayload.status
    this.product = rawPayload.product
    this.payload = rawPayload.payload
    return this
  }

  public static create (payload: CloudUniversesWabaRawPayload, carrier: Cloud, http: Cloud['http']): CloudUniversesWaba {
    return new CloudUniversesWaba({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): CloudUniversesWabaRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      organization: this.organization,
      universe: this.universe,
      billable: this.billable,
      approved: this.approved,
      external_name: this.externalName,
      external_reference_id: this.externalReferenceId,
      vendor: this.vendor,
      status: this.status,
      product: this.product,
      payload: this.payload
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new CloudUniversesWabaInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CloudUniversesWabas {
  public static endpoint: string = 'api/v0/universes_wabas'
}

export class CloudUniversesWabaInitializationError extends BaseError {
  public name = 'CloudUniversesWabaInitializationError'
  constructor (public message: string = 'Could not initialize CloudUniverseWaba.', properties?: any) {
    super(message, properties)
  }
}

export class CloudUniversesWabaFetchRemoteError extends BaseError {
  public name = 'CloudUniversesWabaFetchRemoteError'
  constructor (public message: string = 'Could not get CloudUniversesWaba.', properties?: any) {
    super(message, properties)
  }
}

export class CloudUniversesWabasFetchRemoteError extends BaseError {
  public name = 'CloudUniversesWabasFetchRemoteError'
  constructor (public message: string = 'Could not get CloudUniversesWabas.', properties?: any) {
    super(message, properties)
  }
}
