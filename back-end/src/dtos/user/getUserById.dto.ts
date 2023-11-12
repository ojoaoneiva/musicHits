import z from 'zod'
import { UserModel } from '../../models/User'

export interface GetUserByIdInput {
    token: string,
    id: string
}

export type GetUserByIdOutput = UserModel[]

export const GetUserByIdSchema = z.object({
    token: z.string().min(1),
    id: z.string().min(1)
}).transform(data => data as GetUserByIdInput)