import { Request, Response } from 'express';
import { ZodError } from "zod";
import { CreatePostSchema } from "../dtos/post/createPost.dto";
import { BaseError } from "../erros/BaseError";
import { PostBusiness } from '../business/PostBusiness';
import { GetPostSchema } from '../dtos/post/getPost.dto';
import { LikeOrDislikePostSchema } from '../dtos/post/likeOrDislikePost.dto';
import { GetPostByIdSchema } from '../dtos/post/getPostById.dto';
import { EditPostSchema } from '../dtos/post/editPost.dto';
import { BadRequestError } from '../erros/BadRequestError';

export class PostController {
    constructor(
        private postBusiness: PostBusiness,
    ) { }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input = CreatePostSchema.parse({
                title: req.body.title,
                link: req.body.link,
                content: req.body.content,
                token: req.headers.authorization,
            })

            const output = await this.postBusiness.createPost(input)
            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send("The properties: title, link and content are all required")
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Unespected error")
            }
        }
    }

    public getPosts = async (req: Request, res: Response) => {
        try {
            const { offset, limit } = req.query;
            const validatedOffset = offset ? Math.max(0, Number(offset)) : 0;
            const validatedLimit = limit && Number(limit) >= 1 ? Number(limit) : 5;

            const input = GetPostSchema.parse({
                token: req.headers.authorization,
                offset: validatedOffset,
                limit: validatedLimit,
            });

            const output = await this.postBusiness.getPosts(input);
            res.status(200).send(output);

        } catch (error) {
            console.log(error);

            if (error instanceof ZodError) {
                res.status(400).send(error.issues);
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send("Unespected error");
            }
        }
    };

    public getPostsById = async (req: Request, res: Response) => {
        try {
            const input = GetPostByIdSchema.parse({
                token: req.headers.authorization,
                id: req.params.id,
            })

            const output = await this.postBusiness.getPostsById(input)
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

    public updatePost = async (req: Request, res: Response) => {
        try {
            const validProperties = ['title', 'link', 'content'];
            const isValidRequest = Object.keys(req.body).every(key => validProperties.includes(key));
            if (!isValidRequest) {
                throw new BadRequestError("Invalid properties in the body");
            }

            const input = EditPostSchema.parse({
                title: req.body.title,
                link: req.body.link,
                content: req.body.content,
                token: req.headers.authorization,
                idToEdit: req.params.id,
            });

            const output = await this.postBusiness.updatePost(input);
            res.status(201).send(output);

        } catch (error) {
            console.log(error);

            if (error instanceof ZodError) {
                res.status(400).send(error.issues);
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send("Unespected error");
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input = GetPostByIdSchema.parse({
                token: req.headers.authorization,
                id: req.params.id,
            })

            const output = await this.postBusiness.deletePost(input)
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

    public likeOrDislikePost = async (req: Request, res: Response) => {
        try {
            const input = LikeOrDislikePostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
            });

            const output = await this.postBusiness.likeOrDislikePost(input);
            res.status(200).send(output);

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

    public FindLike = async (req: Request, res: Response) => {
        try {
            const input = LikeOrDislikePostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
            });

            const output = await this.postBusiness.findLike(input);
            res.status(200).send(output);

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

    public GetLikes = async (req: Request, res: Response) => {
        try {
            const input = LikeOrDislikePostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
            });

            const output = await this.postBusiness.getLikes(input);
            res.status(200).send(output);

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
