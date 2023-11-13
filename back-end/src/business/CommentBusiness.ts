import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { NotFoundError } from "../erros/NotFoundError";
import { CommentDatabase } from "../database/CommentDatabase";
import { CreateCommentInput, CreateCommentOutput } from "../dtos/comment/createComment.dto";
import { GetCommentInput, GetCommentOutput } from "../dtos/comment/getComment.dto";
import { COMMENT_LIKE, Comment, LikeDislikeCommentDB } from "../models/Comment";
import { PostDatabase } from "../database/PostDatabase";
import { LikeOrDislikeCommentInput, LikeOrDislikeCommentOutput } from "../dtos/comment/likeOrDislikeComment.dto";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createComment = async (input: CreateCommentInput): Promise<CreateCommentOutput> => {
        const { content, token, idToComment } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }
        const id = this.idGenerator.generate()

        const comment = new Comment(
            id,
            idToComment,
            content,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const commentDB = comment.toCommentDB()
        await this.commentDatabase.insertComment(commentDB)

        const output: CreateCommentOutput = undefined
        return output
    }

    public getComment = async (input: GetCommentInput): Promise<GetCommentOutput> => {
        const { token, idToComment } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postDatabase.findPostById(idToComment)
        if (!postDB) {
            throw new NotFoundError("Does not exists a Post with this ID")
        }

        const CommentDBandCreators = await this.commentDatabase.getCommentsAndCreators(idToComment)

        const comments = CommentDBandCreators.map((CommentDB) => {
            const comment = new Comment(
                CommentDB.id,
                CommentDB.post_id,
                CommentDB.content,
                CommentDB.likes,
                CommentDB.created_at,
                CommentDB.updated_at,
                CommentDB.creator_id,
                CommentDB.creator_name,
            )
            return comment.toBusinessModel()
        })

        const output: GetCommentOutput = comments
        return output
    }

    public likeOrDislikeComment = async (input: LikeOrDislikeCommentInput): Promise<LikeOrDislikeCommentOutput> => {
        const { token, postId } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDBandCreator = await this.commentDatabase.findCommentAndCreatorById(postId)

        if (!commentDBandCreator) {
            throw new NotFoundError("Does not exists a Post with this ID")
        }

        const comment = new Comment(
            commentDBandCreator.id,
            commentDBandCreator.post_id,
            commentDBandCreator.content,
            commentDBandCreator.likes,
            commentDBandCreator.created_at,
            commentDBandCreator.updated_at,
            commentDBandCreator.creator_id,
            commentDBandCreator.creator_name
        )


        const likeDislikeCommentDB: LikeDislikeCommentDB = {
            user_id: payload.id,
            comment_id: postId
        }

        const likeDislikeExists = await this.commentDatabase.findCommentLikeDislike(likeDislikeCommentDB)

        if (likeDislikeExists === COMMENT_LIKE.ALREADY_LIKED) {
            await this.commentDatabase.removeCommentLikeDislike(likeDislikeCommentDB)
            comment.removeLike()
        } else {
            await this.commentDatabase.insertCommentLikeDislike(likeDislikeCommentDB)
            comment.addLike()
        }

        const updatedCommentDB = comment.toCommentDB()
        await this.commentDatabase.updateComment(updatedCommentDB)

        const output: LikeOrDislikeCommentOutput = undefined
        return output
    }

    public findLike = async (input: LikeOrDislikeCommentInput): Promise<string> => {
        const { token, postId } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDBandCreator = await this.commentDatabase.findCommentAndCreatorById(postId)

        if (!postDBandCreator) {
            throw new NotFoundError("Does not exists a Post with this ID")
        }

        const likeDislikeCommentDB: LikeDislikeCommentDB = {
            user_id: payload.id,
            comment_id: postId
        }

        const likeDislikeExists = await this.commentDatabase.findCommentLikeDislike(likeDislikeCommentDB)

        if (likeDislikeExists === COMMENT_LIKE.ALREADY_LIKED) {
            return "like exist"
        } else {
            return "like not exist"
        }
    }
}