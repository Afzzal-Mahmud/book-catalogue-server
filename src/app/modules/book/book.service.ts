import ApiErrors from '../../../errors/ApiErrors'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IBook } from './book.interface'
import { Book } from './book.model'

const createNewBook = async (payload: IBook): Promise<IBook> => {
  try {
    const bookWithEmptyReview = { ...payload, review: [] }
    const book = await Book.create(bookWithEmptyReview)
    return book
  } catch (error) {
    throw new ApiErrors(404, `Book not found${error}`)
  }
}

const getEveryBook = async (): Promise<IGenericResponseOnGet<IBook[]>> => {
  const result = await Book.find({})
  return {
    data: result,
  }
}

const getSingleBook = async (_id: string): Promise<IBook | null> => {
  const isBookExist = await Book.findOne({ _id })
  if (!isBookExist) {
    throw new ApiErrors(404, 'Book not found')
  }
  const result = isBookExist
  return result
}

const updateBookInfo = async (
  _id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isBookExist = await Book.findOne({ _id })
  if (!isBookExist) {
    throw new ApiErrors(404, 'Book not found')
  }

  const { ...BookData } = payload
  Object.assign(isBookExist, BookData)

  const result = await Book.findOneAndUpdate({ _id }, payload, {
    new: true,
  })

  return result
}

const postBookReview = async (
  _id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isBookExist = await Book.findOne({ _id })
  if (!isBookExist) {
    throw new ApiErrors(404, 'Book not found')
  }
  console.log(payload, 'review from frontend')
  if (payload.review && Array.isArray(payload.review)) {
    // Initialize the review array if it doesn't exist
    if (!isBookExist.review) {
      isBookExist.review = []
    }

    // Push each review to the review array
    isBookExist.review.push(...payload.review)
  }

  // Save the updated book document
  await isBookExist.save()
  return isBookExist
}

export const bookServices = {
  createNewBook,
  getEveryBook,
  getSingleBook,
  updateBookInfo,
  postBookReview,
}
