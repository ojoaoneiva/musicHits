import z from 'zod'
import { PostModel } from '../../models/Post'

export interface GetPostInput {
    token: string,
    offset: number, 
    limit: number
}

export type GetPostOutput = PostModel[]

export const GetPostSchema = z.object({
    token: z.string().min(1),
    offset: z.number().min(0).default(0),
    limit: z.number().min(1).optional()
}).transform(data => data as GetPostInput);
