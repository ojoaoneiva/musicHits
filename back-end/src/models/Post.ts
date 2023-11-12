export interface PostDB {
    id: string,
    creator_id: string,
    title: string,
    link: string,
    content: string,
    likes: number,
    created_at: string,
    updated_at: string,
}

export interface PostDBandCreators {
    id: string,
    title: string,
    link: string,
    content: string,
    likes: number,
    created_at: string,
    updated_at: string,
    creator_id: string,
    creator_name: string
}

export interface PostModel {
    id: string,
    title: string,
    link: string,
    content: string,
    likes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export class Post {
    constructor(
        private id: string,
        private title: string,
        private link: string,
        private content: string,
        private likes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getTitle(): string {
        return this.title
    }
    public getLink(): string {
        return this.link
    }
    public getContent(): string {
        return this.content
    }

    public setTitle(value: string): void {
        this.title = value
    }
    public setLink(value: string): void {
        this.link = value
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
        this.likes++
    }

    public removeLike(): void {
        this.likes--
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

    public toPostDB(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            title: this.title,
            link: this.link,
            content: this.content,
            likes: this.likes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        }
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            title: this.title,
            link: this.link,
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

export interface LikeDislikeDB {
    user_id: string,
    post_id: string
}

export enum POST_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}