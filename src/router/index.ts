import { Router } from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../db/UserDatabase'

export const router = Router()

const { signup } = new UserController(
  new UserBusiness(
    new UserDatabase()
  )
)

router.post('/signup', signup)