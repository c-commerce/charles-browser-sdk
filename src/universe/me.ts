import { ClientError } from '../client'
import { StaffMessageTemplateFavorite } from '../entities/staff/staff'
import { throwExceptionFromCommonError } from '../helpers'
import { MeData, Universe, UniverseBadRequestError, UniverseForbiddenError, UniverseMeError, UniverseMePreferencesError } from '.'
import * as staff from '../entities/staff/staff'

interface MePatchOpts {
  method: 'PATCH'
  url: string
  data: OpPatch[]
}
export interface UniverseMe {
  (skipInterceptors?: boolean): Promise<MeData | never>
  addTemplateFavorite: (favorite: StaffMessageTemplateFavorite) => Promise<staff.StaffRawPayload | never>
  removeTemplateFavorite: (id: string) => Promise<staff.StaffRawPayload | never>
  _patchMeStaffPreferences: (opts: MePatchOpts) => Promise<staff.StaffRawPayload | never>
  _getPatchConfig: () => Promise<{
    staffRequestOpts: MePatchOpts | null
    meData: MeData
  }>
}

/**
   * Fetch the data of the current user.
   * If you receive an instance of UniverseUnauthenticatedError you should logout the current session and create a new one.
   * UniverseUnauthenticatedError: 401
   * UniverseForbiddenError: 403
   * UniverseBadGatewayError: 502
   * UniverseServiceUnavailableError: 503
   * UniverseTimeoutError: 504
*/
export const me: UniverseMe = async function (this: Universe, skipInterceptors = false): Promise<MeData | never> {
  try {
    const opts = {
      method: 'GET',
      url: `${this.universeBase}/api/v0/me`,
      skipInterceptors
    }

    const response = await this.http.getClient()(opts)

    this.setCachedMeData(response?.data?.data)

    return response?.data?.data
  } catch (error) {
    throwExceptionFromCommonError(error as ClientError)
    throw new UniverseMeError(undefined, { error })
  }
}

me._getPatchConfig = async function (this: Universe) {
  const me = this._cachedMeData ?? await this.me()

  return {
    staffRequestOpts: me.staff.id ? {
      method: 'PATCH',
      url: `${this.universeBase}/api/v0/staff/${me.staff.id}`,
      data: []
    } : null,
    meData: me
  }
}

me.addTemplateFavorite = async function (this: Universe, favorite: StaffMessageTemplateFavorite): Promise<staff.StaffRawPayload | never> {
  const { staffRequestOpts, meData } = await this.me._getPatchConfig()

  if (staffRequestOpts === null) throw new UniverseForbiddenError('User does not exist as a staff member.')

  const messageFavorites = meData.preferences?.message_template_favorites
  if (!Array.isArray(messageFavorites) || messageFavorites === undefined) {
    staffRequestOpts.data.push({
      op: 'add',
      path: '/preferences/message_template_favorites',
      value: []
    })
  } else {
    if (messageFavorites.length >= 7) {
      throw new UniverseBadRequestError('Cannot have more than 7 message template favorites per user.', { response: { status: 400 } })
    }
    if (messageFavorites.some(f => f.id === favorite.id)) {
      throw new UniverseBadRequestError('This template has already been added to favorites.', { response: { status: 400 } })
    }
  }

  staffRequestOpts.data.push({
    op: 'add',
    path: '/preferences/message_template_favorites/-',
    value: favorite
  })

  return await this.me._patchMeStaffPreferences(staffRequestOpts)
}

me.removeTemplateFavorite = async function (this: Universe, id: string): Promise<staff.StaffRawPayload | never> {
  const { staffRequestOpts, meData } = await this.me._getPatchConfig()

  if (staffRequestOpts === null) throw new UniverseForbiddenError('User does not exist as a staff member.')

  staffRequestOpts.data.push({
    op: 'replace',
    path: '/preferences/message_template_favorites',
    value: meData.preferences?.message_template_favorites?.filter(f => f.id !== id)
  })

  return await this.me._patchMeStaffPreferences(staffRequestOpts)
}

me._patchMeStaffPreferences = async function (this: Universe, opts: MePatchOpts): Promise<staff.StaffRawPayload | never> {
  try {
    const response = await this.http.getClient()(opts)

    const updatedResource = response?.data?.data?.[0]
    if (this._cachedMeData?.user && updatedResource?.preferences) {
      this.setCachedMeData({
        ...this._cachedMeData,
        preferences: updatedResource.preferences,
        staff: updatedResource
      })
    }

    return updatedResource
  } catch (error) {
    throwExceptionFromCommonError(error as ClientError)
    throw new UniverseMePreferencesError(undefined, { error })
  }
}
