import { FollowerDB } from "../models/Follower";
import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"
    public static TABLE_FOLLOWERS = "followers"

    public insertUser = async (userDB: UserDB): Promise<void> => {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB)
    }

    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).select().where({ email })
        return userDB as UserDB | undefined
    }

    public findUserById = async (id: string): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).select().where({ id })
        return userDB as UserDB | undefined
    }

    public getUsers = async (): Promise<UserDB[]> => {
        const result = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            .select(
                `${UserDatabase.TABLE_USERS}.id`,
                `${UserDatabase.TABLE_USERS}.name`,
                `${UserDatabase.TABLE_USERS}.email`,
            )

        return result as UserDB[]
    }

    public getUsersById = async (id: string): Promise<UserDB[]> => {
        const result = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            .select(
                `${UserDatabase.TABLE_USERS}.id`,
                `${UserDatabase.TABLE_USERS}.name`,
                `${UserDatabase.TABLE_USERS}.email`,
                `${UserDatabase.TABLE_USERS}.bio`,
                `${UserDatabase.TABLE_USERS}.profile_photo`,
            ).where({ [`${UserDatabase.TABLE_USERS}.id`]: id })

        return result as UserDB[]
    }

    public getFollowers = async (id: string): Promise<FollowerDB[]> => {
        const result = await BaseDatabase.connection(UserDatabase.TABLE_FOLLOWERS)
            .select(
                `${UserDatabase.TABLE_FOLLOWERS}.user_id_following`,
                `${UserDatabase.TABLE_FOLLOWERS}.user_id_follower`,
                `${UserDatabase.TABLE_FOLLOWERS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${UserDatabase.TABLE_FOLLOWERS}.user_id_follower`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${UserDatabase.TABLE_FOLLOWERS}.user_id_following`]: id })

        return result as FollowerDB[]
    }

    public getFollowing = async (id: string): Promise<FollowerDB[]> => {
        const result = await BaseDatabase.connection(UserDatabase.TABLE_FOLLOWERS)
            .select(
                `${UserDatabase.TABLE_FOLLOWERS}.user_id_following`,
                `${UserDatabase.TABLE_FOLLOWERS}.user_id_follower`,
                `${UserDatabase.TABLE_USERS}.name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${UserDatabase.TABLE_FOLLOWERS}.user_id_following`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${UserDatabase.TABLE_FOLLOWERS}.user_id_follower`]: id })

        return result as FollowerDB[]
    }

    public createFollowing = async (id: string, followingId: string): Promise<string> => {
        const followingUser = await this.getUsersById(followingId);

        if (!followingUser) {
            return "The user to be followed does not exist";
        }

        const existingFollow = await BaseDatabase.connection(UserDatabase.TABLE_FOLLOWERS)
            .where({
                user_id_following: followingId,
                user_id_follower: id,
            });

        if (existingFollow.length > 0) {
            await BaseDatabase.connection(UserDatabase.TABLE_FOLLOWERS)
                .where({
                    user_id_following: followingId,
                    user_id_follower: id,
                })
                .del();
            return "You don't follow this user anymore";
        } else {
            await BaseDatabase.connection(UserDatabase.TABLE_FOLLOWERS)
                .insert({
                    user_id_following: followingId,
                    user_id_follower: id,
                });
            return "You are following this user";
        }
    }

    public updateUser = async (userDB: UserDB): Promise<void> => {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            .update(userDB)
            .where({ id: userDB.id })
    }

}