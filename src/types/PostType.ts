type CommentType = {
  id: string
  user: string
  text: string
  timestamp: string
}

type LikedType = {
  id: string
}

export type PostType = {
  id: number
  title: string
  content: string
  img_urls: string[]
  liked: LikedType[] | null
  comments: CommentType[] | null
  user: string
  category: string
  created_at: string
}
