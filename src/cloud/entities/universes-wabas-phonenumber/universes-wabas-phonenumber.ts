
// import qs from 'qs'
// import { Client } from 'src/client'
import { APICarrier } from '../../../base'
import Entity, { EntityOptions } from '../../../entities/_base'
import { BaseError } from '../../../errors'
import { Cloud } from '../../index'

export interface CloudUniversesWabasPhonenumberOptions extends EntityOptions {
  rawPayload?: CloudUniversesWabasPhonenumberRawPayload
}

export interface CloudUniversesWabasPhonenumberRawPayload {
  readonly id?: string
  readonly created_at?: string
  readonly updated_at?: string
  readonly deleted?: boolean
  readonly active?: boolean
  readonly phonenumber?: string
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
  readonly waba?: object

}

export interface CloudUniversesWabasPhonenumberPayload {
  readonly id?: CloudUniversesWabasPhonenumberRawPayload['id']
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly deleted?: boolean
  readonly active?: boolean
  readonly phonenumber?: CloudUniversesWabasPhonenumberRawPayload['phonenumber']
  readonly organization?: CloudUniversesWabasPhonenumberRawPayload['organization']
  readonly universe?: CloudUniversesWabasPhonenumberRawPayload['universe']
  readonly billable?: CloudUniversesWabasPhonenumberRawPayload['billable']
  readonly approved?: CloudUniversesWabasPhonenumberRawPayload['approved']
  readonly externalName?: CloudUniversesWabasPhonenumberRawPayload['external_name']
  readonly externalReferenceId?: CloudUniversesWabasPhonenumberRawPayload['external_reference_id']
  readonly vendor?: CloudUniversesWabasPhonenumberRawPayload['vendor']
  readonly status?: CloudUniversesWabasPhonenumberRawPayload['status']
  readonly product?: CloudUniversesWabasPhonenumberRawPayload['product']
  readonly payload?: CloudUniversesWabasPhonenumberRawPayload['payload']
  readonly waba?: CloudUniversesWabasPhonenumberRawPayload['waba']
}

/**
 * Manage CloudUniversesWabasPhonenumbers.
 *
 * @category Entity
 */
export class CloudUniversesWabasPhonenumber extends Entity<CloudUniversesWabasPhonenumberPayload, CloudUniversesWabasPhonenumberRawPayload> {
  public get entityName (): string {
    return 'cloud_universes_waba_phonenumber'
  }

  protected apiCarrier: APICarrier
  protected http: Cloud['http']
  protected options: CloudUniversesWabasPhonenumberOptions
  public initialized: boolean

  public endpoint: string

  public id?: CloudUniversesWabasPhonenumberPayload['id']
  public createdAt?: CloudUniversesWabasPhonenumberPayload['createdAt']
  public updatedAt?: CloudUniversesWabasPhonenumberPayload['updatedAt']
  public deleted?: CloudUniversesWabasPhonenumberPayload['deleted']
  public active?: CloudUniversesWabasPhonenumberPayload['active']
  public phonenumber?: CloudUniversesWabasPhonenumberPayload['phonenumber']
  public organization?: CloudUniversesWabasPhonenumberPayload['organization']
  public universe?: CloudUniversesWabasPhonenumberPayload['universe']
  public billable?: CloudUniversesWabasPhonenumberPayload['billable']
  public approved?: CloudUniversesWabasPhonenumberPayload['approved']
  public externalName?: CloudUniversesWabasPhonenumberPayload['externalName']
  public externalReferenceId?: CloudUniversesWabasPhonenumberPayload['externalReferenceId']
  public vendor?: CloudUniversesWabasPhonenumberPayload['vendor']
  public status?: CloudUniversesWabasPhonenumberPayload['status']
  public product?: CloudUniversesWabasPhonenumberPayload['product']
  public payload?: CloudUniversesWabasPhonenumberPayload['payload']
  public waba?: CloudUniversesWabasPhonenumberPayload['waba']

  constructor (options: CloudUniversesWabasPhonenumberOptions) {
    super()
    this.apiCarrier = options.carrier
    this.endpoint = 'api/v0/universes_wabas_phonenumbers'
    this.http = options.http
    this.options = options
    this.initialized = options.initialized ?? false

    if (options?.rawPayload) {
      this.deserialize(options.rawPayload)
    }
  }

  protected deserialize (rawPayload: CloudUniversesWabasPhonenumberRawPayload): this {
    this.setRawPayload(rawPayload)

    this.id = rawPayload.id
    this.createdAt = rawPayload.created_at ? new Date(rawPayload.created_at) : undefined
    this.updatedAt = rawPayload.updated_at ? new Date(rawPayload.updated_at) : undefined
    this.deleted = rawPayload.deleted ?? false
    this.active = rawPayload.active ?? true
    this.phonenumber = rawPayload.phonenumber
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
    this.waba = rawPayload.waba
    return this
  }

  public static create (payload: CloudUniversesWabasPhonenumberRawPayload, carrier: Cloud, http: Cloud['http']): CloudUniversesWabasPhonenumber {
    return new CloudUniversesWabasPhonenumber({ rawPayload: payload, carrier, http, initialized: true })
  }

  public serialize (): CloudUniversesWabasPhonenumberRawPayload {
    return {
      id: this.id,
      created_at: this.createdAt ? this.createdAt.toISOString() : undefined,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : undefined,
      deleted: this.deleted ?? false,
      active: this.active ?? true,
      phonenumber: this.phonenumber,
      organization: this.organization,
      universe: this.universe,
      billable: this.billable,
      approved: this.approved,
      external_name: this.externalName,
      external_reference_id: this.externalReferenceId,
      vendor: this.vendor,
      status: this.status,
      product: this.product,
      payload: this.payload,
      waba: this.waba
    }
  }

  public async init (): Promise<this> {
    try {
      await this.fetch()

      return this
    } catch (err) {
      throw this.handleError(new CloudUniversesWabasPhonenumberInitializationError(undefined, { error: err }))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CloudUniversesWabasPhonenumbers {
  public static endpoint: string = 'api/v0/universes_wabas_phonenumbers'
}

export class CloudUniversesWabasPhonenumberInitializationError extends BaseError {
  public name = 'CloudUniversesWabasPhonenumberInitializationError'
  constructor (public message: string = 'Could not initialize CloudUniverseWabasPhonenumber.', properties?: any) {
    super(message, properties)
  }
}

export class CloudUniversesWabasPhonenumberFetchRemoteError extends BaseError {
  public name = 'CloudUniversesWabasPhonenumberFetchRemoteError'
  constructor (public message: string = 'Could not get CloudUniversesWabasPhonenumber.', properties?: any) {
    super(message, properties)
  }
}

export class CloudUniversesWabasPhonenumbersFetchRemoteError extends BaseError {
  public name = 'CloudUniversesWabasPhonenumbersFetchRemoteError'
  constructor (public message: string = 'Could not get CloudUniversesWabasPhonenumbers.', properties?: any) {
    super(message, properties)
  }
}
