import express from 'express'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { bookController } from './book.controller'
import { bookValidation } from './book.zod.validation'
const router = express.Router()

router.post(
  '/',
  validateZodRequest(bookValidation.bookZodSchema),
  bookController.createNewBook
)

router.get('/', bookController.getAllBooks)

// posting book review from user
router.post(
  '/:id',
  validateZodRequest(bookValidation.postBookReviewZodSchema),
  bookController.postBookReview
)

router.patch(
  '/:id',
  validateZodRequest(bookValidation.bookZodSchemaOnUpdate),
  bookController.updateBook
)

export const bookRoutes = { router }
