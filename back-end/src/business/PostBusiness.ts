import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInput, CreatePostOutput } from "../dtos/post/createPost.dto";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Post";
import { GetPostInput, GetPostOutput } from "../dtos/post/getPost.dto";
import { NotFoundError } from "../erros/NotFoundError";
import { LikeOrDislikePostInput } from "../dtos/post/likeOrDislikePost.dto";
import { GetPostByIdInput } from "../dtos/post/getPostById.dto";
import { EditPostInput, EditPostOutput } from "../dtos/post/editPost.dto";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createPost = async (input: CreatePostInput): Promise<CreatePostOutput> => {
        const { title, link, content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }
        const id = this.idGenerator.generate()

        const post = new Post(
            id,
            title,
            link,
            content,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const postDB = post.toPostDB()
        await this.postDatabase.insertPost(postDB)

        const output: CreatePostOutput = undefined
        return output
    }

    public getPosts = async (input: GetPostInput): Promise<GetPostOutput> => {
      const { token, offset, limit } = input;

      const payload = this.tokenManager.getPayload(token);

      if (!payload) {
          throw new UnauthorizedError();
      }

      const PostDBandCreators = await this.postDatabase.getPostsAndCreators(offset, limit); // Modifique esta chamada

      const posts = PostDBandCreators.map((PostDB) => {
          const post = new Post(
              PostDB.id,
              PostDB.title,
              PostDB.link,
              PostDB.content,
              PostDB.likes,
              PostDB.created_at,
              PostDB.updated_at,
              PostDB.creator_id,
              PostDB.creator_name,
          );
          return post.toBusinessModel();
      });

      const output: GetPostOutput = posts;
      return output;
  }

    public getPostsById = async (input: GetPostByIdInput): Promise<GetPostOutput | undefined> => {
        const { token, id } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const PostDBandCreators = await this.postDatabase.getPostsAndCreatorsById(id)
        if(PostDBandCreators){
        const posts = PostDBandCreators.map((PostDB) => {
            const post = new Post(
                PostDB.id,
                PostDB.title,
                PostDB.link,
                PostDB.content,
                PostDB.likes,
                PostDB.created_at,
                PostDB.updated_at,
                PostDB.creator_id,
                PostDB.creator_name,
            )
            return post.toBusinessModel()
        })

        const output: GetPostOutput = posts
        return output
    }
    }


    public updatePost = async (input: EditPostInput): Promise<EditPostOutput> => {
        const { token, idToEdit, ...updates } = input;
      
        const payload = this.tokenManager.getPayload(token);
      
        if (!payload) {
          throw new UnauthorizedError();
        }
      
        const existingPost = await this.postDatabase.findPostById(idToEdit);
      
        if (!existingPost) {
          throw new NotFoundError("Does not exists a Post with this ID");
        }
      
        if (payload.id !== existingPost.creator_id) {
          throw new UnauthorizedError("Only the creator can edit this post");
        }
      
        if (updates.title) {
          existingPost.title = updates.title;
        }
        if (updates.link) {
          existingPost.link = updates.link;
        }
        if (updates.content) {
          existingPost.content = updates.content;
        }
      
        await this.postDatabase.updatePost(existingPost);
      
        const output: EditPostOutput = undefined;
        return output;
      }
      

public deletePost = async (input: GetPostByIdInput): Promise<void> => {
    const { token, id } = input;
  
    const payload = this.tokenManager.getPayload(token);
  
    if (!payload) {
      throw new UnauthorizedError();
    }
  
    const postDBandCreator = await this.postDatabase.findPostAndCreatorById(id);
  
    if (!postDBandCreator) {
      throw new NotFoundError("Does not exists a Post with this ID");
    }
  
    if (payload.id !== postDBandCreator.creator_id) {
      throw new UnauthorizedError("Only the creator can delete this post");
    }
  
    await this.postDatabase.deletePostById(id);
  }

    public likeOrDislikePost = async (input: LikeOrDislikePostInput): Promise<any> => {
        const { token, postId } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDBandCreator = await this.postDatabase.findPostAndCreatorById(postId)

        if (!postDBandCreator) {
            throw new NotFoundError("Does not exists a Post with this ID")
        }

        const post = new Post(
            postDBandCreator.id,
            postDBandCreator.title,
            postDBandCreator.link,
            postDBandCreator.content,
            postDBandCreator.likes,
            postDBandCreator.created_at,
            postDBandCreator.updated_at,
            postDBandCreator.creator_id,
            postDBandCreator.creator_name
        )

        const likeDislikeDB: LikeDislikeDB = {
            user_id: payload.id,
            post_id: postId
        }

        const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB)

        if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
            } else {

            await this.postDatabase.insertLikeDislike(likeDislikeDB)
                post.addLike()
            }

        const updatedPostDB = post.toPostDB()
        await this.postDatabase.updatePost(updatedPostDB)

        const output = updatedPostDB
        return output
    }

    public findLike = async (input: LikeOrDislikePostInput): Promise<string> => {
      const { token, postId } = input

      const payload = this.tokenManager.getPayload(token)

      if (!payload) {
          throw new UnauthorizedError()
      }

      const postDBandCreator = await this.postDatabase.findPostAndCreatorById(postId)

      if (!postDBandCreator) {
          throw new NotFoundError("Does not exists a Post with this ID")
      }

      const likeDislikeDB: LikeDislikeDB = {
          user_id: payload.id,
          post_id: postId
      }

      const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB)

      if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
          return "like exist"
          } else {
            return "like does not exist"
          }
  }

  public getLikes = async (input: LikeOrDislikePostInput): Promise<any> => {
    const { token, postId } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
        throw new UnauthorizedError()
    }

    const postDBandCreator = await this.postDatabase.findPostAndCreatorById(postId)

      if (!postDBandCreator) {
          throw new NotFoundError("Does not exists a Post with this ID")
      }

    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      post_id: postId
  }

    const postLikes = await this.postDatabase.findLikes(likeDislikeDB)

    if (!postLikes) {
        throw new NotFoundError("Post with 0 likes")
    }
    else{
      return postLikes
    }

}
}