import express from 'express'
import { CommentController } from '../controller/CommentController'
import { CommentBusiness } from '../business/CommentBusiness'
import { CommentDatabase } from '../database/CommentDatabase'
import { TokenManager } from '../services/TokenManager'
import { IdGenerator } from '../services/IdGenerator'
import { PostDatabase } from '../database/PostDatabase'

export const commentRouter = express.Router()

const commentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

commentRouter.get("/:id", commentController.getComment)
commentRouter.post("/:id", commentController.createComment)
commentRouter.post("/:id/like", commentController.likeOrDislikeComment)
commentRouter.get("/:id/like", commentController.FindLike)