import axios from 'axios'
import * as errors from '../errors'
import { Client, ClientOptions } from '../client'

export enum AuthTypes {
  username = 1,
  key,
  accessToken,
  org,
  support
}

export interface AuthOptions {
  type?: AuthTypes | undefined
  credentials?: UsernameAuth | KeyAuth | TokenAuth
  withCredentials?: boolean
  base?: string | undefined
  authBaseUrl?: string | undefined
  user?: string
  accessToken?: string
}

export interface AuthBase {
  baseUrl?: string
}

export interface UsernameAuth extends AuthBase {
  username: string
  password: string
  recaptcha_token?: string
  baseUrl?: string
  authBaseUrl?: string
  withCredentials?: boolean
}

export interface KeyAuth extends AuthBase {
  id: string
  apiKey: string
  baseUrl?: string
}

export interface OrgAuth extends AuthBase {
  organization: string
  username: string
  password: string
  recaptcha_token?: string
  baseUrl?: string
}

export interface SupportAuth extends AuthBase {
  access_token: string
  client_account: string
  recaptcha_token?: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetNonce {
  password: string
  password_reset_id: string
}

export interface PasswordResetRequestResponse {
  msg: string
}
export interface LogoutResponse {
  msg: string
}

export interface TokenAuth {
  accessToken: string
}

export function isUsernameAuth (object: any): object is UsernameAuth {
  return 'password' in object
}

export function isKeyAuth (object: any): object is KeyAuth {
  return 'apiKey' in object
}

export function isTokenAuth (object: any): object is KeyAuth {
  return 'accessToken' in object
}

export function isOrgAuth (object: any): object is KeyAuth {
  return 'organization' in object
}

export interface AuthResponse {
  id: string
  access_token: string
  user: string
  name?: string
  username?: string
  email?: string
  permissions: string[]
  roles: string[]
  is_support?: boolean
}

/**
 * @class "v0.Auth"
 */
export class Auth {
  authenticated: boolean = false
  public options: AuthOptions
  public accessToken?: string
  public user?: string
  public authBaseUrl?: string

  constructor (options: AuthOptions) {
    this.options = options

    this.options.base = this.options.base ?? 'https://hello-charles.com'
    this.authBaseUrl = this.options.authBaseUrl ?? 'https://hello-charles.com'

    if (!this.options.credentials) return

    this.determineAuthType()

    if (this.options.user && this.options.type === AuthTypes.accessToken) {
      this.setDefaultHeader(this.options.user, (this.options.credentials as TokenAuth).accessToken, this.options.withCredentials)
    }
  }

  /**
   * Initialise the SDK instance by authenticating the client
   *
   */
  public clearInstance (): void {
    this.authenticated = false
    this.options.credentials = undefined
    this.options.accessToken = undefined
    this.options.user = undefined
    this.options.type = undefined
  }

  protected determineAuthType (): void {
    if (isUsernameAuth(this.options.credentials)) this.options.type = AuthTypes.username
    if (isKeyAuth(this.options.credentials)) this.options.type = AuthTypes.key
    if (isTokenAuth(this.options.credentials)) this.options.type = AuthTypes.accessToken
    if (isOrgAuth(this.options.credentials)) this.options.type = AuthTypes.org
  }

  async authenticate (): Promise<AuthResponse> {
    if (this.options.type === AuthTypes.username) {
      return await this.loginUsername(this.options.credentials as UsernameAuth)
    }

    throw new errors.AuthenticationFailed('No auth data was provided')
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  async loginUsername (authData: UsernameAuth = {} as UsernameAuth): Promise<AuthResponse> {
    let username: string
    let password: string

    if (
      this.options.credentials &&
      (this.options.credentials as UsernameAuth).username &&
      (this.options.credentials as UsernameAuth).password
    ) {
      username = (this.options.credentials as UsernameAuth).username
      password = (this.options.credentials as UsernameAuth).password
    } else if (authData?.username && authData.password) {
      username = authData.username
      password = authData.password
    } else {
      throw new errors.UninstantiatedClient()
    }

    const withCredentials = authData.withCredentials ?? !!this.options.credentials

    try {
      const response = await axios.post(`${authData.authBaseUrl ?? this.authBaseUrl as string}/api/v0/users/auth/login`, {
        email: username,
        password: password,
        recaptcha_token: authData.recaptcha_token,
        // local override for static auth calling cases e.g. loosely initted SDKs instances
        withCredentials: authData.withCredentials ?? !!this.options.credentials
      })

      this.setDefaultHeader(
        response.data.data.id,
        response.data.data.access_token,
        withCredentials
      )

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        id: response.data.data.id,
        access_token: response.data.data.access_token,
        user: response.data.data.id,
        email: response.data.data.email,
        name: response.data.data.name,
        permissions: response.data.data.permissions || [],
        roles: response.data.data.roles
      } as AuthResponse
    } catch (err) {
      const error = new errors.AuthenticationFailed(undefined, {
        error: err, body: err.response && err.response.data ? err.response.data : null
      })

      throw error
    }
  }

  async requestPasswordReset (target: PasswordResetRequest): Promise<PasswordResetRequestResponse> {
    try {
      const { data } = await axios.post(`${this.authBaseUrl as string}/api/v0/users/auth/login/password_reset`, {
        email: target.email
      })

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        msg: data.msg
      } as PasswordResetRequestResponse
    } catch (err) {
      throw new errors.PasswordResetRequestFailed(undefined, { error: err })
    }
  }

  async setNewPassword (nonce: PasswordResetNonce): Promise<PasswordResetRequestResponse> {
    try {
      const { data } = await axios.post(`${this.authBaseUrl as string}/api/v0/users/auth/login/password_set`, {
        password: nonce.password,
        password_reset_id: nonce.password_reset_id
      })

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        msg: data.msg
      } as PasswordResetRequestResponse
    } catch (err) {
      throw new errors.PasswordSetRequestFailed(undefined, { error: err })
    }
  }

  protected setDefaultHeader (user: string, token: string, withCredentials?: boolean): void {
    const clientOptions: ClientOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Client-ID': user
      },
      withCredentials: withCredentials ?? !!this.options.credentials
    }

    this.setAuthed(token)
    this.user = user

    Client.getInstance(clientOptions).setDefaults(clientOptions)
  }

  public async logout (token?: string): Promise<LogoutResponse> {
    if (!token && !this.accessToken) {
      throw new LogoutMissingToken()
    }

    try {
      const { data } = await axios.get(`${this.authBaseUrl as string}/api/v0/users/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token ?? this.accessToken as string}`
        }
      })

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        msg: data.msg
      } as LogoutResponse
    } catch (err) {
      throw new LogoutFailed(undefined, { error: err })
    }
  }

  public setAuthed (accessToken: string): Auth {
    if (!accessToken) throw new TypeError('setting authed requires access token')
    this.accessToken = accessToken
    this.authenticated = true
    return this
  }
}

export class LogoutMissingToken extends errors.BaseError {
  public name = 'LogoutMissingToken'
  constructor (public message: string = 'Could not log out due to missing token.', properties?: any) {
    super(message, properties)
  }
}

export class LogoutFailed extends errors.BaseError {
  public name = 'LogoutFailed'
  constructor (public message: string = 'Could not log out.', properties?: any) {
    super(message, properties)
  }
}
