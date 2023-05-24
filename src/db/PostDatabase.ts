import { EditedPost, PostDB, PostMinimal } from "../models/Posts"
import { connectDB } from "./database"

export class PostDatabase {
  public static TABLE_POSTS = 'posts'

  public async editPost(editedPost: EditedPost):Promise<PostDB> {
    const [post] = await connectDB(PostDatabase.TABLE_POSTS)
      .update({content: editedPost.content, updated_at: new Date().toISOString()})
      .where({id: editedPost.id})
      .returning('*')

    return post
  }

  public async getPostById(postId: string):Promise<PostDB> {
    const [post] = await connectDB(PostDatabase.TABLE_POSTS).where({id: postId})

    return post
  }

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