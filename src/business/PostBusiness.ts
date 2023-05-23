import { PostDatabase } from "../db/PostDatabase";
import { CreatePostInputDTO } from "../dto/createPost.dto";
import { GetPostsInputDTO } from "../dto/getPosts.dto";
import { AppError } from "../error/AppError";
import { generateId } from "../helpers/generatedId";
import { getTokenPayload } from "../helpers/token";

export class PostBusiness {
  constructor (
    private postDatabase: PostDatabase
  ){}

  public createPost =async (input: CreatePostInputDTO) => {
    const { token, content } = input

    const tokenPayload = getTokenPayload(token)

    if (tokenPayload == null) {
      throw new AppError(400, 'Não autorizado')
    }

    return await this.postDatabase.createPost({
      id: generateId(),
      creator_id: tokenPayload.id,
      content
    })

  }

  public getPosts = async (input: GetPostsInputDTO) => {
    const { token } = input
    
    const tokenPayload = getTokenPayload(token)

    if (tokenPayload == null) {
      throw new AppError(400, 'Não autorizado')
    }

    return await this.postDatabase.getPosts()
  }
}