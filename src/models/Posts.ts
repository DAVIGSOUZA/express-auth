export type PostDB = {
  id: string
  creator_id: string
  content: string
  likes: number
  dislikes: number
  created_at: string
  updated_at: string
}

export type PostMinimal = {
  id: string
  creator_id: string
  content: string
}