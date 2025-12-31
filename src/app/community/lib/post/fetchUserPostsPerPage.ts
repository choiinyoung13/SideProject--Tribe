import { supabase } from '@/supabase/supabaseClient'
import type { FetchPostsResponse } from './_types'

// UUID를 받아서 해당 유저가 올린 게시물만 조회
export async function fetchUserPostsPerPage(
  pageParam: number = 0,
  pageSize: number,
  userId: string
): Promise<FetchPostsResponse> {
  const start = pageParam * pageSize
  const end = start + pageSize - 1

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user', userId)
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


