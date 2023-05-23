import jwt, { JwtPayload } from "jsonwebtoken"
import { enviroments } from "./enviroments"

export type TokenPayload = {
  id: string
  name: string
  role: string
}

export const createToken = (payload: TokenPayload) => {
  const token = jwt.sign(
    payload,
    enviroments.jwt.key,
    { expiresIn: enviroments.jwt.expiration }
  )

  return token
}

export const getTokenPayload = (token:string): TokenPayload | null => {
  try {
    return jwt.verify(token, enviroments.jwt.key) as JwtPayload & TokenPayload
  } 
  
  catch (error) {
    return null
  }
}