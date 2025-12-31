import 'server-only'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import type { PostAuthor, PostWithAuthor } from './_types'

export async function fetchPostByIdServer(postId: number): Promise<PostWithAuthor | null> {
  const supabase = await createSupabaseServerComponentClient()

  const { data: postRow, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .maybeSingle()

  if (error) {
    console.error('fetchPostByIdServer error:', error.message)
    return null
  }
  if (!postRow) return null

  const post = postRow as unknown as import('@/types/PostType').PostType

  let author: PostAuthor | null = null
  if (post.user) {
    const { data: users, error: userErr } = await supabase
      .from('userinfo')
      .select('id,email,nickname,avatar_url,status_message,username,admin,likes')
      .eq('id', post.user)
      .maybeSingle()

    if (userErr) {
      console.error('fetchPostByIdServer author error:', userErr.message)
    } else {
      author = (users ?? null) as unknown as PostAuthor | null
    }
  }

  return { ...post, author }
}


