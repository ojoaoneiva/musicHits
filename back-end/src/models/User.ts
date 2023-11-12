export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    bio: string,
    profile_photo: string,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    role: USER_ROLES,
    bio: string,
    profilePhoto: string,
    createdAt: string
}
export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private bio: string,
        private profilePhoto: string,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.id
    }

    public setName(value: string): void {
        this.id = value
    }

    public getEmail(): string {
        return this.id
    }

    public setEmail(value: string): void {
        this.id = value
    }

    public getPassword(): string {
        return this.id
    }

    public setPassword(value: string): void {
        this.id = value
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.id = value
    }

    public getBio(): string {
        return this.bio
    }

    public setBio(value: string): void {
        this.bio = value
    }

    public getProfilePhoto(): string {
        return this.profilePhoto
    }

    public setProfilePhoto(value: string): void {
        this.profilePhoto = value
    }

    public getCreatedAt(): string {
        return this.id
    }

    public setCreatedAt(value: string): void {
        this.id = value
    }

    public toDBModel(): UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            bio: this.bio,
            profile_photo: this.profilePhoto,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): UserModel {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            bio: this.bio,
            profilePhoto: this.profilePhoto,
            createdAt: this.createdAt
        }
    }
}
