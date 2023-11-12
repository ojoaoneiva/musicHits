import z from 'zod'
import { FollowerModel } from '../../models/Follower'

export interface CreateFollowingInput {
    token: string,
    followingId: string
}

export type CreateFollowingOutput = string

export const CreateFollowingSchema = z.object({
    token: z.string().min(1),
    followingId: z.string().min(1)
}).transform(data => data as CreateFollowingInput)

