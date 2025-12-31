'use client'

import type { PostWithAuthor } from '@/app/community/lib/post/_types'
import PostDetail from '@/app/community/components/Community/PostDetail'
import { useRouter } from 'next/navigation'

export default function PostDetailPageClient({ post }: { post: PostWithAuthor }) {
  const router = useRouter()

  return (
    <PostDetail
      userInfo={{
        userId: post.user,
        email: post.author?.email ?? '',
        avatar_url: post.author?.avatar_url ?? '',
        nickname: post.author?.nickname ?? '',
      }}
      post={post}
      onClose={() => router.back()}
    />
  )
}


