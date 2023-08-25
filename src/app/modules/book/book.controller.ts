import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { IBook } from './book.interface'
import { bookServices } from './book.service'

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
  createNewBook,
  updateBook,
  postBookReview,
}
