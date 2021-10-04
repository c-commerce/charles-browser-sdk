export interface CrmUser {
  id: string
  created_at: string
  updated_at: string
  deleted: boolean
  active: boolean
  username: string
  email: string
  secret?: string
  authentication_provider?: string
  parent?: string
  kind: string
  proxy_vendor: string
  type: string
  external_reference_id: string
  external_custom_id?: string
  permissions?: string
  status?: string
  roles?: string
  verified?: string
  authentication_payload?: string
  payload: Payload
  labels: Labels
  user_profile: UserProfile
}

export interface Labels {
  id: string
  api: string
  type: string
}

export interface Payload {
  id: number
  lang: number
  name: string
  email: string
  phone: null
  is_you: boolean
  locale: string
  created: string
  role_id: number
  icon_url: null
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
  firstname?: string
  lastname?: string
  phone?: string
  avatar?: string
  locale: string
  display_name: string
  email: string
}
