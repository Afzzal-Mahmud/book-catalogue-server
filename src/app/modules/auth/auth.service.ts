import { Secret } from 'jsonwebtoken'
import ApiErrors from '../../../errors/ApiErrors'

import config from '../../../config'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import {
  createJsonWebToken,
  verifyJsonWebToken,
} from '../../../shared/JWT/jwt.token.helper'
import { User } from '../user/user.model'
import { passwordMatched } from '../../../shared/bycript/bycript.methods'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload

  const isUserExist = await User.findOne(
    { email },
    { email: 1, role: 1, password: 1 }
  )

  if (!isUserExist) {
    throw new ApiErrors(404, 'User does not exist')
  }

  const passwordMatching = await passwordMatched(password, isUserExist.password)

  if (!passwordMatching) {
    throw new ApiErrors(400, 'Password is incorrect')
  }

  // user object-data for token genaration
  const userData = {
    email: isUserExist.email,
    role: isUserExist.role,
  }

  const accessToken = createJsonWebToken(
    userData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  // refresh token
  const refreshToken = createJsonWebToken(
    userData,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    email,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  try {
    // Verify token
    const verifiedToken = verifyJsonWebToken(
      token,
      config.jwt.refresh_secret as Secret
    )

    if (!verifiedToken) {
      throw new ApiErrors(403, 'Unauthenticated')
    }

    const { email } = verifiedToken

    // Check if the user exists
    const isUserExist = await User.findOne(
      { email },
      { email: 1, role: 1 }
    )
    if (!isUserExist) {
      throw new ApiErrors(404, 'User not found')
    }

    // Generate new token
    const newAccessToken = createJsonWebToken(
      { email: isUserExist.email, role: isUserExist.role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    )

    return { accessToken: newAccessToken }
  } catch (err) {
    throw new ApiErrors(403, 'Invalid Refresh Token')
  }
}

export const authServices = { loginUser, refreshToken }
