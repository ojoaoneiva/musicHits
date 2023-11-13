import { LikeDislikeDB, POST_LIKE, PostDB, PostDBandCreators } from "../models/Post"
import { BaseDatabase } from "./BaseDatabase"
import { UserDatabase } from "./UserDatabase"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(postDB)
    }

    public getPostsAndCreators = async (offset: number, limit: number): Promise<PostDBandCreators[]> => {
        const result = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.title`,
                `${PostDatabase.TABLE_POSTS}.link`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.id as creator_id`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .orderBy(`${PostDatabase.TABLE_POSTS}.created_at`, 'desc')
            .offset(offset) 
            .limit(limit);
    
        return result as PostDBandCreators[];
    }
    

    public getPostsAndCreatorsById = async (id: string): Promise<PostDBandCreators[] | undefined> => {
        const result = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.title`,
                `${PostDatabase.TABLE_POSTS}.link`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.id as creator_id`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            ).where({ [`${PostDatabase.TABLE_POSTS}.creator_id`]: id })

        return result as PostDBandCreators[] | undefined
    }

    public findPostById = async (id: string): Promise<PostDB | undefined> => {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).select().where({ id })

        return result as PostDB | undefined
    }

    public updatePost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id: postDB.id })
    }

    public deletePostById = async (postId: string): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
          .delete()
          .where({ id: postId });
      }      

    public findPostAndCreatorById = async (id: string): Promise<PostDBandCreators | undefined> => {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.id as creator_id`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${PostDatabase.TABLE_POSTS}.id`]: id })

        return result as PostDBandCreators | undefined
    }

    public findLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<POST_LIKE | undefined> => {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
    
        if (result === undefined) {
            return undefined;
        } else {
            return POST_LIKE.ALREADY_LIKED;
        }
    }

    public findLikes = async (likeDislikeDB: LikeDislikeDB): Promise<LikeDislikeDB[] | string> => {
        const result = await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .select(
                `${PostDatabase.TABLE_LIKES_DISLIKES}.user_id`,
                `${PostDatabase.TABLE_LIKES_DISLIKES}.post_id`,
                `${PostDatabase.TABLE_LIKES_DISLIKES}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name`,
                `${PostDatabase.TABLE_POSTS}.link`,
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_LIKES_DISLIKES}.user_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`)
                .join(
                    `${PostDatabase.TABLE_POSTS}`,
                    `${PostDatabase.TABLE_LIKES_DISLIKES}.post_id`,
                    `=`,
                    `${PostDatabase.TABLE_POSTS}.id`)
            .where({
                post_id: likeDislikeDB.post_id
            })
            ;
        if (result === undefined) {
            return "like doesn't exists yet";
        } else {
            return result as LikeDislikeDB[];
        }
    }
    
    public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
    }
    
    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
    }
    
    public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .insert(likeDislikeDB)
    }
}