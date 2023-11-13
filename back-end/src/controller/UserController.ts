import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../erros/BaseError";
import { SignupSchema } from '../dtos/user/signup.dto';
import { LoginSchema } from '../dtos/user/login.dto';
import { GetUserSchema } from '../dtos/user/getUser.dto';
import { GetFollowerSchema } from '../dtos/user/getFollowers';
import { EditUserSchema } from '../dtos/user/editUser.dto';
import { BadRequestError } from '../erros/BadRequestError';

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            const output = await this.userBusiness.signup(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input = LoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            })

            const output = await this.userBusiness.login(input)
            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const input = GetUserSchema.parse({
                token: req.headers.authorization
            })

            const output = await this.userBusiness.getUsers(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }

    public getUsersById = async (req: Request, res: Response) => {
        try {
            const input = GetFollowerSchema.parse({
                token: req.headers.authorization,
                id: req.params.id,
            })

            const output = await this.userBusiness.getUsersById(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }

    public getFollowers = async (req: Request, res: Response) => {
        try {
            const input = GetFollowerSchema.parse({
                token: req.headers.authorization,
                id: req.params.id,
            })

            const output = await this.userBusiness.getFollowers(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }

    public getFollowing = async (req: Request, res: Response) => {
        try {
            const input = GetFollowerSchema.parse({
                token: req.headers.authorization,
                id: req.params.id,
            })

            const output = await this.userBusiness.getFollowing(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }

    public createFollowing = async (req: Request, res: Response) => {
        try {
            const input = GetFollowerSchema.parse({
                token: req.headers.authorization,
                id: req.params.followingId,
            })

            const output = await this.userBusiness.createFollowing(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            const validProperties = ['name', 'bio', 'profilePhoto'];
            const isValidRequest = Object.keys(req.body).every(key => validProperties.includes(key));
            if (!isValidRequest) {
                throw new BadRequestError("Invalid properties in the body");
            }

            const input = EditUserSchema.parse({
                name: req.body.name || "",
                bio: req.body.bio || "",
                profilePhoto: req.body.profilePhoto || "",
                token: req.headers.authorization,
            })

            const output = await this.userBusiness.updateUser(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }
}