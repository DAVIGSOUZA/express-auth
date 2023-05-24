import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { GetPostsSchema } from "../dto/getPosts.dto";
import { CreatePostSchema } from "../dto/createPost.dto";
import { EditPostSchema } from "../dto/editPost.dto";
import { catchError } from "../error/catchError";

export class PostController {
  constructor(
    private postBusiness: PostBusiness
  ){}

  public createPost = async (req:Request, res:Response) => {
    try {
      const input = CreatePostSchema.parse({
        token: req.headers.authorization,
        content: req.body.content
      })

      const output = await this.postBusiness.createPost(input)

      res.status(201).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public editPost =async (req:Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        postId: req.params.postId,
        token: req.headers.authorization,
        content: req.body.content
      })

      const output = await this.postBusiness.editPost(input)

      res.status(200).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public getPosts = async (req:Request, res:Response) => {
    try {
      const input = GetPostsSchema.parse({token: req.headers.authorization})

      const output = await this.postBusiness.getPosts(input)

      res.status(200).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }
}