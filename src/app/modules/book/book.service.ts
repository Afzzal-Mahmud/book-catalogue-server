import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IBook } from './book.interface'
import { Book } from './book.model'
import { Secret } from 'jsonwebtoken'
import ApiErrors from '../../../errors/ApiErrors'
import { verifyJsonWebToken } from '../../../shared/JWT/jwt.token.helper'
import config from '../../../config'

const createNewBook = async (payload: IBook): Promise<IBook> => {
  try {
    const accessToken = payload && payload.reference ? payload.reference : '';
    const verifiedToken = verifyJsonWebToken(
      accessToken,
      config.jwt.secret as Secret
    )
    if (!verifiedToken) {
      throw new ApiErrors(403, "Unauthenticated")
    }
    const { email } = verifiedToken
    // Set the email as the reference in the payload
    payload.reference = email;
    // seting the bookmark property
    payload.bookmark = false
    const bookWithEmptyReview = { ...payload, review: [] }
    const book = await Book.create(bookWithEmptyReview)
    return book
  } catch (error) {
    throw new ApiErrors(500, `Internal Server Erro while creating book${error}`)
  }
}

const getEveryBook = async (): Promise<IGenericResponseOnGet<IBook[]>> => {
  const result = await Book.find({})
  return {
    data: result,
  }
}

const getRefrencedBook = async (accessToken: string): Promise<IGenericResponseOnGet<IBook[]>> => {

  const verifiedToken = verifyJsonWebToken(
    accessToken,
    config.jwt.secret as Secret
  )
  if (!verifiedToken) {
    new ApiErrors(403, "Unauthenticated")
  }

  const { email } = verifiedToken

  const result = await Book.find({ reference: email })
  return {
    data: result
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
  // refreshToken: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {

  const referenceEmail = payload && payload.reference ? payload.reference : '';

  // const verifiedToken = verifyJsonWebToken(
  //   accessToken,
  //   config.jwt.secret as Secret
  // )

  // if (!verifiedToken) {
  //   throw new ApiErrors(403, "Unauthenticated")
  // }

  // const { email } = verifiedToken

  const isBookExist = await Book.findOne({ _id, reference: referenceEmail })
  if (!isBookExist) {
    throw new ApiErrors(404, 'Book not found Or unauthorized')
  }

  const { ...BookData } = payload
  Object.assign(isBookExist, BookData)

  const result = await Book.findOneAndUpdate({ _id, reference: referenceEmail }, payload, {
    new: true,
  })

  if (!result) {
    throw new ApiErrors(401, 'Unauthorized for deletion')
  }

  return result
}

const deleteBook = async (
  _id: string,
  // refreshToken: string
): Promise<IBook | null> => {
  // const verifiedToken = verifyJsonWebToken(
  //   refreshToken,
  //   config.jwt.refresh_secret as Secret
  // )
  // if (!verifiedToken) {
  //   throw new ApiErrors(403, "Unauthenticated")
  // }
  // const { email } = verifiedToken
  // Find and delete the book with matching email and _id
  const isBookExist = await Book.findOne({ _id })
  if (!isBookExist) {
    throw new ApiErrors(404, 'Book not found or Unauthorized')
  }
  const result = await isBookExist.deleteOne({ _id })
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
  getRefrencedBook,
  getSingleBook,
  updateBookInfo,
  deleteBook,
  postBookReview,
}
