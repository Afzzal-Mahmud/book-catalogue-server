import express from 'express'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { authValidation } from './auth.zod.validation'
import { authControllers } from './auth.controller'
import { userValidation } from '../user/user.zod.validation'
import { userController } from '../user/user.controller'

const router = express.Router()

router.post(
  '/signup',
  validateZodRequest(userValidation.userZodSchema),
  userController.createNewUser
)

router.post(
  '/login',
  validateZodRequest(authValidation.loginZodSchema),
  authControllers.loginUser
)

router.post('/logout', authControllers.logOut)

router.post(
  '/refresh-token',
  // validateZodRequest(authValidation.refreshTokenZodSchema),
  authControllers.refreshToken
)

export const authRoutes = { router }
