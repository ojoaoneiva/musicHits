import z from 'zod'

export interface CreatePostInput {
    title: string,
    link: string,
    content: string,
    token: string
}

export type CreatePostOutput = undefined 

export const CreatePostSchema = z.object({
    title: z.string().min(1),
    link: z.string().min(1),
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreatePostInput)