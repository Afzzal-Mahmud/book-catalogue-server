import { Request, Response } from 'express'
import config from '../../../config'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface'
import { authServices } from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await authServices.loginUser(loginData)
  const { refreshToken, ...others } = result

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  res.cookie('userState', true)
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  })
})

const logOut = async (req: Request, res: Response) => {
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
    maxAge: 0
  }

  res.cookie('refreshToken', '', cookieOptions)
  // res.clearCookie('refreshToken')
  res.send({
    message: 'Log out successfull',
    statusCode: 200
  });
}

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  /*
  refreshToken must not have the ability to create a new refresh token
  so,I created a new access token through the refresh token
  */

  const { refreshToken } = req.cookies
  const result = await authServices.refreshToken(refreshToken)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Created new access token and User logged in successfully !',
    data: result,
  })
})

export const authControllers = {
  loginUser,
  logOut,
  refreshToken,
}
