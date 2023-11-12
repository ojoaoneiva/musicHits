import z from 'zod'
import { UserModel } from '../../models/User'

export interface GetUserInput {
    token: string
}

export type GetUserOutput = UserModel[]

export const GetUserSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as GetUserInput)