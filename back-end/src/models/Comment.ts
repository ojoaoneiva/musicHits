export interface CommentDB {
    id: string,
    creator_id: string,
    post_id: string,
    content: string,
    likes: number,
    created_at: string,
    updated_at: string,
}

export interface CommentDBandCreators {
    id: string,
    post_id: string,
    content: string,
    likes: number,
    created_at: string,
    updated_at: string,
    creator_id: string,
    creator_name: string
}

export interface CommentModel {
    id: string,
    postId: string,
    content: string,
    likes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export class Comment {
    constructor(
        private id: string,
        private postId: string,
        private content: string,
        private likes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getUserId(): string {
        return this.postId
    }

    public setUserId(value: string): void {
        this.postId = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public addLike(): void {
        this.likes ++
    }

    public removeLike(): void {
        this.likes --
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void {
        this.updatedAt = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public toCommentDB(): CommentDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            post_id: this.postId,
            content: this.content,
            likes: this.likes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        }
    }

    public toBusinessModel(): CommentModel {
        return {
            id: this.id,
            postId: this.postId,
            content: this.content,
            likes: this.likes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }
}

export interface LikeDislikeCommentDB {
    user_id: string,
    comment_id: string
}

export enum COMMENT_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}