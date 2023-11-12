import z from 'zod'
import { FollowerModel } from '../../models/Follower'

export interface GetFollowerInput {
    token: string,
    id: string
}

export type GetFollowerOutput = FollowerModel[]

export const GetFollowerSchema = z.object({
    token: z.string().min(1),
    id: z.string().min(1)
}).transform(data => data as GetFollowerInput)

