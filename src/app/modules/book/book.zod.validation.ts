import { z } from 'zod'

const bookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationYear: z.number({
      required_error: 'Publication year is required',
    }),
    details: z.string({
      required_error: 'Details are required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    image: z.string({
      required_error: 'Book Image is required',
    }),
    review: z.array(z.string()).optional(),
  }),
})

const bookZodSchemaOnUpdate = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationYear: z.number().optional(),
    details: z.string().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
  }),
})
const postBookReviewZodSchema = z.object({
  body: z.object({
    review: z.array(z.string()),
  }),
})

export const bookValidation = {
  bookZodSchema,
  bookZodSchemaOnUpdate,
  postBookReviewZodSchema,
}
