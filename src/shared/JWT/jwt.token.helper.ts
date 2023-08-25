import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

export const createJsonWebToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}

export const verifyJsonWebToken = (
  token: string,
  secret: Secret
): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}
