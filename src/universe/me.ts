import { Client, ClientError } from '../client'
import { StaffMessageTemplateFavorite } from '../entities/staff/staff'
import { throwExceptionFromCommonError } from '../helpers'
import { MeData, Universe, UniverseBadRequestError, UniverseForbiddenError, UniverseMeError, UniverseMePreferencesError, UniverseSessionError } from '.'
import { PatchOpts } from 'src/helpers/json-patch-type'

type addTemplateFavoriteArg = Omit<StaffMessageTemplateFavorite, 'created_at'>
type removeTemplateFavoriteArg = Omit<StaffMessageTemplateFavorite, 'created_at'> & {created_at?: string}

export class UniverseMe {
  private cachedMeData?: MeData
  private readonly universe: Universe
  private readonly http: Client
  constructor ({ universe, http }: {universe: Universe, http: Client}) {
    this.universe = universe
    this.http = http
  }

  private async patchStaffPreferences (opts: PatchOpts): Promise<MeData> {
    try {
      const response = await this.http.getClient()(opts)

      const updatedStaff = response?.data?.data?.[0]

      if (!this.cachedMeData || !this.cachedMeData.user) throw new UniverseMeError()

      this.setCachedMeData({
        ...this.cachedMeData,
        preferences: updatedStaff.preferences,
        staff: updatedStaff
      })

      return this.cachedMeData
    } catch (error) {
      throwExceptionFromCommonError(error as ClientError)
      throw new UniverseMePreferencesError(undefined, { error })
    }
  }

  private async getPatchConfig (): Promise<{
    staffRequestOpts: PatchOpts | null
    meData: MeData | undefined
  }> {
    const me = this.cachedMeData ?? await this.fetch()

    return {
      staffRequestOpts: me?.staff.id ? {
        method: 'PATCH',
        url: `${this.universe.universeBase}/api/v0/staff/${me.staff.id}`,
        data: []
      } : null,
      meData: me
    }
  }

  private setCachedMeData (data?: MeData | null): void {
    if (!data) {
      this.cachedMeData = undefined
    } else {
      this.cachedMeData = Object.assign({}, data)
    }
  }

  public async fetch (skipInterceptors = false): Promise<MeData | undefined> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/api/v0/me`,
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

  public async session (): Promise<MeData> {
    try {
      const opts = {
        method: 'GET',
        url: `${this.universe.universeBase}/api/v0/me/session`
      }

      const response = await this.http.getClient()(opts)

      return response?.data?.data
    } catch (error) {
      throwExceptionFromCommonError(error as ClientError)

      throw new UniverseSessionError(undefined, { error })
    }
  }

  public async addTemplateFavorite (favorite: addTemplateFavoriteArg): Promise<MeData> {
    const { staffRequestOpts, meData } = await this.getPatchConfig()

    if (staffRequestOpts === null) throw new UniverseForbiddenError('User does not exist as a staff member.')

    const messageFavorites = meData?.preferences?.message_template_favorites
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
      if (messageFavorites.some(f => f.id === favorite.id && f.locale === favorite.locale)) {
        throw new UniverseBadRequestError('This template has already been added to favorites.', { response: { status: 400 } })
      }
    }

    staffRequestOpts.data.push({
      op: 'add',
      path: '/preferences/message_template_favorites/-',
      value: {
        ...favorite,
        created_at: new Date().toISOString()
      }
    })

    return await this.patchStaffPreferences(staffRequestOpts)
  }

  public async removeTemplateFavorite (favorite: removeTemplateFavoriteArg): Promise<MeData> {
    const { staffRequestOpts, meData } = await this.getPatchConfig()

    if (staffRequestOpts === null) throw new UniverseForbiddenError('User does not exist as a staff member.')

    staffRequestOpts.data.push({
      op: 'replace',
      path: '/preferences/message_template_favorites',
      value: meData?.preferences?.message_template_favorites?.filter(f => !(f.id === favorite.id && f.locale === favorite.locale))
    })

    return await this.patchStaffPreferences(staffRequestOpts)
  }
}
