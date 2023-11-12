export interface FollowerDB {
    user_id_following: string,
    user_id_follower: string,
    name: string,
    updated_at: string
}

export interface FollowerModel {
    userIdFollowing: string,
    userIdFollower: string,
    name: string,
    updated_at: string
}
export class Follower {
    constructor(
        private userIdFollowing: string,
        private userIdFollower: string,
        private name: string,
        private updatedAt: string
    ) { }

    public getUserIdFollowing(): string {
        return this.userIdFollowing
    }

    public setUserIdFollowing(value: string): void {
        this.userIdFollowing = value
    }

    public getUserIdFollower(): string {
        return this.userIdFollower
    }

    public setUserIdFollower(value: string): void {
        this.userIdFollower = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getupdatedAt(): string {
        return this.updatedAt
    }

    public setupdatedAt(value: string): void {
        this.updatedAt = value
    }

    public toDBModel(): FollowerDB {
        return {
            user_id_following: this.userIdFollowing,
            user_id_follower: this.userIdFollower,
            name: this.name,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): FollowerModel {
        return {
            userIdFollowing: this.userIdFollowing,
            userIdFollower: this.userIdFollower,
            name: this.name,
            updated_at: this.updatedAt
        }
    }
}
