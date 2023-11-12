import express from 'express'
import { PostController } from '../controller/PostController'
import { PostBusiness } from '../business/PostBusiness'
import { PostDatabase } from '../database/PostDatabase'
import { TokenManager } from '../services/TokenManager'
import { IdGenerator } from '../services/IdGenerator'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPosts)
postRouter.get("/user/:id", postController.getPostsById)
postRouter.post("/", postController.createPost)
postRouter.post("/:id/like", postController.likeOrDislikePost)
postRouter.get("/:id/like", postController.FindLike)
postRouter.get("/:id/", postController.GetLikes)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id", postController.updatePost)