import express from 'express'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { bookController } from './book.controller'
import { bookValidation } from './book.zod.validation'
const router = express.Router()

// getting posted book by user
router.get(
  '/userbook',
  bookController.getRefrencedBook
)
router.post(
  '/',
  validateZodRequest(bookValidation.bookZodSchema),
  bookController.createNewBook
)

router.get('/', bookController.getAllBooks)
router.get('/:id', bookController.getSingleBook)

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

router.delete(
  '/:id',
  bookController.deleteBook
)

export const bookRoutes = { router }
