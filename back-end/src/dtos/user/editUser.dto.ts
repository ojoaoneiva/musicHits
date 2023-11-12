import z from 'zod'

export interface EditUserInput {
    name?: string; 
    bio?: string;
    profilePhoto?: string;
    token: string;
  }
  

export type EditUserOutput = undefined

export const EditUserSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  profilePhoto: z.string().optional(),
    token: z.string().min(1),
}).transform(data => data as EditUserInput)