import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { IBook } from './book.interface'
import { bookServices } from './book.service'
import ApiErrors from '../../../errors/ApiErrors'

const createNewBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body
  const result = await bookServices.createNewBook(bookData)

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book created successfully',
    data: result,
  })
})

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.getEveryBook()

  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Book retrive successfully',
    data: result.data,
  })
})

const getRefrencedBook = catchAsync(async (req: Request, res: Response) => {

  const authorizationHeader = req.header('Authorization')?.split(" ")[1] || ''
  const result = await bookServices.getRefrencedBook(authorizationHeader)

  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Book retrive successfully which is posted by user',
    data: result.data,
  })
})

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await bookServices.getSingleBook(id)

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Single Book retrive successfully',
    data: result,
  })
})

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await bookServices.updateBookInfo(id, updatedData)

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book updated successfully !',
    data: result,
  })
})
const postBookReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const review = req.body

  const result = await bookServices.postBookReview(id, review)

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book Review added successfully !',
    data: result,
  })
})

export const bookController = {
  getAllBooks,
  getRefrencedBook,
  getSingleBook,
  createNewBook,
  updateBook,
  postBookReview,
}
