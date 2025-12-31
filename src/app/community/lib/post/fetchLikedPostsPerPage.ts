import { supabase } from '@/supabase/supabaseClient'
import type { FetchPostsResponse } from './_types'

// 유저가 좋아요 누른 게시물만 조회
export async function fetchLikedPostsPerPage(
  pageParam: number = 0,
  pageSize: number = 8
): Promise<FetchPostsResponse> {
  const start = pageParam * pageSize
  const end = start + pageSize - 1

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인된 유저가 없습니다.')
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .contains('liked', [user.id])
    .order('created_at', { ascending: false })
    .range(start, end)

  if (error) {
    console.error('데이터 조회 오류:', error.message)
    return { posts: [], nextCursor: null }
  }

  if (!data || data.length === 0) {
    return { posts: [], nextCursor: null }
  }

  const hasMore = data.length === pageSize
  const nextCursor = hasMore ? pageParam + 1 : null

  return { posts: data, nextCursor }
}


