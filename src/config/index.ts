import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refresh_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
}
