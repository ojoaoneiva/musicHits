import z from 'zod'

export interface EditPostInput {
    title?: string;
    link?: string;
    content?: string;
    token: string;
    idToEdit: string;
  }
  

export type EditPostOutput = undefined

export const EditPostSchema = z.object({
    title: z.string().optional(),
  link: z.string().optional(),
  content: z.string().optional(),
    token: z.string().min(1),
    idToEdit: z.string().min(1)
}).transform(data => data as EditPostInput)