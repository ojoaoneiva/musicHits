import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../database/UserDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { HashManager } from '../services/HashManager'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.post('/:followingId', userController.createFollowing)
userRouter.get('/', userController.getUsers)
userRouter.get('/:id', userController.getUsersById)
userRouter.get('/followers/:id', userController.getFollowers)
userRouter.get('/following/:id', userController.getFollowing)
userRouter.put('/', userController.updateUser)