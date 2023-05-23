import { PostDB, PostMinimal } from "../models/Posts"
import { connectDB } from "./database"

export class PostDatabase {
  public static TABLE_POSTS = 'posts'

  public async createPost(newPost: PostMinimal):Promise<PostDB> {
    const [post] = await connectDB(PostDatabase.TABLE_POSTS)
      .insert(newPost)
      .returning('*')

    return post
  } 

  public async getPosts(): Promise<PostDB[]> {
    return await connectDB(PostDatabase.TABLE_POSTS)
  }
}