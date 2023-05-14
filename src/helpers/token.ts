import jwt, { JwtPayload } from "jsonwebtoken"
import { enviroments } from "./enviroments"

export const createToken = (payload: string | object) => {
  const token = jwt.sign(
    payload,
    enviroments.jwt.key,
    { expiresIn: enviroments.jwt.expiration }
  )

  return token
}

export const getTokenPayload = (token:string): string | JwtPayload | null => {
  try {
    return jwt.verify(token, enviroments.jwt.key)
  } 
  
  catch (error) {
    return null
  }
}