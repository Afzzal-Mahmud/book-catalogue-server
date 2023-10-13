export type ILoginUser = {
  email: string
  password: string
}

export type ILoginUserResponse = {
  accessToken: string,
  email: string
  refreshToken?: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}
