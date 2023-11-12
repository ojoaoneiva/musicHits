import z from 'zod'

export interface LikeOrDislikeCommentInput {
    postId: string,
    token: string
}

export type LikeOrDislikeCommentOutput = undefined

export const LikeOrDislikeCommentSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as LikeOrDislikeCommentInput)