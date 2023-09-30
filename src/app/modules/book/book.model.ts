import { Model, Schema, model } from 'mongoose'
import { IBook } from './book.interface'
/* step two --> Create schema */
const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    reference: { type: String, required: true },
    review: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

/* step three --> Create class-oriented model */

type BookModel = Model<IBook, Record<string, unknown>>

/* step four --> Create a model. */
export const Book = model<IBook, BookModel>('Book', BookSchema)
