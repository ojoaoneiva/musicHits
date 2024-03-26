import { UserDatabase } from "../database/UserDatabase";
import { EditUserInput, EditUserOutput } from "../dtos/user/editUser.dto";
import { GetFollowerInput, GetFollowerOutput } from "../dtos/user/getFollowers";
import { GetUserInput, GetUserOutput } from "../dtos/user/getUser.dto";
import { GetUserByIdInput, GetUserByIdOutput } from "../dtos/user/getUserById.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../erros/BadRequestError";
import { NotFoundError } from "../erros/NotFoundError";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { Follower } from "../models/Follower";
import { USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input

        const existingUser = await this.userDatabase.findUserByEmail(email);
    if (existingUser) {
        throw new BadRequestError("User with this email already exists");
    }

        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            "",
            "",
            new Date().toISOString()
        )

        await this.userDatabase.insertUser(user.toDBModel())

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
            token
        }
        return output
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("Does not exists a User with this email")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.bio,
            userDB.profile_photo,
            userDB.created_at
        )

        const hashedPassword = userDB.password

        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

        if (!isPasswordCorrect) {
            throw new BadRequestError("Invalid email and/or password")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutputDTO = {
            token
        }
        return output
    }

    public getUsers = async (input: GetUserInput): Promise<GetUserOutput> => {
        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const PostDBandCreators = await this.userDatabase.getUsers()

        const users = PostDBandCreators.map((UserDB) => {
            const post = new User(
                UserDB.id,
                UserDB.name,
                UserDB.email,
                UserDB.password,
                UserDB.role,
                UserDB.bio,
                UserDB.profile_photo,
                UserDB.created_at,
            )
            return post.toBusinessModel()
        })

        const output: GetUserOutput = users
        return output
    }

    public getUsersById = async (input: GetUserByIdInput): Promise<GetUserByIdOutput> => {
        const { token, id } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const PostDBandCreators = await this.userDatabase.getUsersById(id)

        const users = PostDBandCreators.map((UserDB) => {
            const post = new User(
                UserDB.id,
                UserDB.name,
                UserDB.email,
                UserDB.password,
                UserDB.role,
                UserDB.bio,
                UserDB.profile_photo,
                UserDB.created_at,
            )
            return post.toBusinessModel()
        })

        const output: GetUserByIdOutput = users
        return output
    }

    public getFollowers = async (input: GetFollowerInput): Promise<GetFollowerOutput> => {
        const { token, id } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const FollowersDB = await this.userDatabase.getFollowers(id)

        const users = FollowersDB.map((FollowersDB) => {
            const post = new Follower(
                FollowersDB.user_id_following,
                FollowersDB.user_id_follower,
                FollowersDB.name,
                FollowersDB.updated_at,

            )
            return post.toBusinessModel()
        })

        const output: GetFollowerOutput = users
        return output
    }

    public getFollowing = async (input: GetFollowerInput): Promise<GetFollowerOutput> => {
        const { token, id } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const FollowersDB = await this.userDatabase.getFollowing(id)

        const users = FollowersDB.map((FollowersDB) => {
            const post = new Follower(
                FollowersDB.user_id_following,
                FollowersDB.user_id_follower,
                FollowersDB.name,
                FollowersDB.updated_at,

            )
            return post.toBusinessModel()
        })

        const output: GetFollowerOutput = users
        return output
    }


    public createFollowing = async (input: GetFollowerInput): Promise<string> => {
        const { token, id } = input;

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const userId = payload.id;
        if (userId === id) {
            throw new BadRequestError("You can't follow yourself");
        }

        const result = await this.userDatabase.createFollowing(userId, id);

        if (result) {
            return result;
        } else {
            throw new BadRequestError("Error while following this user");
        }
    }

    public updateUser = async (input: EditUserInput): Promise<EditUserOutput> => {
        const { token, ...updates } = input;

        const payload = this.tokenManager.getPayload(token);

        if (!payload) {
            throw new UnauthorizedError();
        }

        const existingUser = await this.userDatabase.findUserById(payload.id);

        if (!existingUser) {
            throw new NotFoundError("Does not exists a User with this ID");
        }

        if (updates.name) {
            existingUser.name = updates.name;
        }
        if (updates.bio) {
            existingUser.bio = updates.bio;
        }
        if (updates.profilePhoto) {
            existingUser.profile_photo = updates.profilePhoto;
        }

        await this.userDatabase.updateUser(existingUser);

        const output: EditUserOutput = undefined;
        return output;
    }
}