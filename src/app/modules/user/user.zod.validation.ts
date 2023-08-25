import { z } from 'zod'
import { userRole } from './user.constant'

const userZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string({
      required_error: 'Password is required',
    }),

    // profileImage: z.string().optional(),
  }),
})

const userZodSchemaOnUpdate = z.object({
  body: z.object({
    name: z.string({}).optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email()
      .optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    // profileImage: z.string().optional(),
  }),
})
export const userValidation = {
  userZodSchema,
  userZodSchemaOnUpdate,
}
