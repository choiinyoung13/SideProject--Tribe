import type { PostType } from '@/types/PostType'
import type { UserInfoType } from '@/types/UserInfoType'

export type PostAuthor = UserInfoType

export type PostWithAuthor = PostType & {
  author: PostAuthor | null
}

export type FetchPostsResponse = {
  posts: PostWithAuthor[]
  nextCursor: number | null
}


