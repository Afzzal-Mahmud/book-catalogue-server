import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import { userRole } from './user.constant'
import config from '../../../config'
import bcrypt from 'bcrypt'

/* step two --> Create schema */

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: userRole,
      // required: true
    },
    password: { type: String, required: true },
    // profileImage: {
    //   type: String,
    //   required: true
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.pre('save', async function () {
  // this.password means the user password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
})

/* step three --> Create class-oriented model */

type UserModel = Model<IUser, Record<string, unknown>>

/* step four --> Create a model. */
export const User = model<IUser, UserModel>('User', userSchema)
