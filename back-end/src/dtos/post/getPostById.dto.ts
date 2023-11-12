import z from 'zod'
import { PostModel } from '../../models/Post'

export interface GetPostByIdInput {
    token: string,
    id: string
}

export type GetPostOutput = PostModel[]

export const GetPostByIdSchema = z.object({
    token: z.string().min(1),
    id: z.string().min(1),
}).transform(data => data as GetPostByIdInput)
