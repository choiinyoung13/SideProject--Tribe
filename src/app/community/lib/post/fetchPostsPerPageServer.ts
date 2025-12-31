import 'server-only'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import { convertToKoreanCommuniyCategory } from '@/lib/utils/convertToKorean'
import type { FetchPostsResponse, PostAuthor, PostWithAuthor } from './_types'

// server: page별로 게시물 조회 (SSR prefetch/hydration 용)
export async function fetchPostsPerPageServer(
  pageParam: number = 0,
  pageSize: number = 8,
  category: string = 'all',
  searchKeyword: string = ''
): Promise<FetchPostsResponse> {
  const start = pageParam * pageSize
  const end = start + pageSize - 1

  const supabase = await createSupabaseServerComponentClient()

  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(start, end)

  if (category !== 'all') {
    query = query.eq('category', convertToKoreanCommuniyCategory(category))
  }

  if (searchKeyword.trim() !== '') {
    query = query.ilike('title', `%${searchKeyword}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('데이터 조회 오류:', error.message)
    return { posts: [], nextCursor: null }
  }

  if (!data || data.length === 0) {
    return { posts: [], nextCursor: null }
  }

  // author meta (userinfo) join을 확실하게 하기 위해 ids로 2차 조회
  const userIds = Array.from(new Set((data ?? []).map(p => (p as { user?: string }).user).filter(Boolean))) as string[]
  const authorsById = new Map<string, PostAuthor>()

  if (userIds.length > 0) {
    const { data: users, error: userErr } = await supabase
      .from('userinfo')
      .select('id,email,nickname,avatar_url,status_message,username,admin,likes')
      .in('id', userIds)

    if (userErr) {
      console.error('작성자 정보 조회 오류:', userErr.message)
    } else {
      (users ?? []).forEach(u => {
        const a = u as PostAuthor
        if (a?.id) authorsById.set(a.id, a)
      })
    }
  }

  const postsWithAuthor: PostWithAuthor[] = (data ?? []).map(p => {
    const post = p as unknown as import('@/types/PostType').PostType
    return {
      ...post,
      author: post.user ? authorsById.get(post.user) ?? null : null,
    }
  })

  const hasMore = data.length === pageSize
  const nextCursor = hasMore ? pageParam + 1 : null

  return { posts: postsWithAuthor, nextCursor }
}


