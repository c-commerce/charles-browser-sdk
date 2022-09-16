export interface CrmUser {
  id: string
  created_at: string
  updated_at: string
  deleted: boolean
  active: boolean
  username: string
  email: string
  secret: string | null
  authentication_provider: string | null
  parent: string | null
  kind: string
  proxy_vendor: string
  type: string
  external_reference_id: string
  external_custom_id: string | null
  permissions: string | null
  status: string | null
  roles: string | null
  verified: string | null
  authentication_payload: string | null
  payload: CrmUserPayload
  labels: Labels
  user_profile: UserProfile
}

export interface Labels {
  id: string
  api: string
  type: string
}

export interface CrmUserPayload {
  id: number
  lang: number
  name: string
  email: string
  phone: string | null
  is_you: boolean
  locale: string
  created: string
  role_id: number
  icon_url: string | null
  is_admin: number
  modified: string
  active_flag: boolean
  timezone_name: string
  timezone_offset: string
  default_currency: string
  has_created_company: boolean
  signup_flow_variation: string
}

export interface UserProfile {
  id: string
  user: string
  created_at: string
  updated_at: string
  firstname: string | null
  lastname: string | null
  phone: string | null
  avatar: string | null
  locale: string
  display_name: string
  email: string
}

export interface AssociateUsersPayload {
  readonly externalUserReferenceId: string
  readonly staffId: string
}
