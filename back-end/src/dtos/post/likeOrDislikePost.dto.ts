import z from 'zod'

export interface LikeOrDislikePostInput {
    postId: string,
    token: string
}

export type LikeOrDislikePostOutput = undefined

export const LikeOrDislikePostSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as LikeOrDislikePostInput)