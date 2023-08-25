import express from 'express'
import { userController } from './user.controller'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { userValidation } from './user.zod.validation'
const router = express.Router()

/* create-user-route is attached to auth route but controller and service are attached to the user-controller and user-service*/

router.patch(
  '/:id',
  validateZodRequest(userValidation.userZodSchemaOnUpdate),
  userController.updateUser
)

export const userRoutes = { router }
