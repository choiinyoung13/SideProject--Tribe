import { supabase } from '../../../supabase/supabaseClient'
import { PostType } from '../../../types/PostType'
import { convertToKoreanCommuniyCategory } from '../../../utill/convertToKorean'

export type FetchPostsResponse = {
  posts: PostType[]
  nextCursor: number | null
}

// page별로 게시물 조회
export async function fetchPostsPerPage(
  pageParam: number = 0,
  pageSize: number = 8,
  category: string = 'all',
  searchKeyword: string = ''
): Promise<FetchPostsResponse> {
  const start = pageParam * pageSize
  const end = start + pageSize - 1

  console.log('카테고리:', category)
  console.log('검색어:', searchKeyword)

  // 기본 쿼리 설정 (정렬과 범위만 적용)
  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(start, end)

  // category가 "all"이 아닐 때만 eq 필터 추가
  if (category !== 'all') {
    query = query.eq('category', convertToKoreanCommuniyCategory(category))
  }

  // searchKeyword가 빈 문자열이 아닐 때 title 필드에서 필터링
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

  const hasMore = data.length === pageSize
  const nextCursor = hasMore ? pageParam + 1 : null

  return { posts: data, nextCursor }
}

// 유저가 좋아요 누른 게시물만 조회
export async function fetchLikedPostsPerPage(
  pageParam: number = 0,
  pageSize: number = 8
): Promise<FetchPostsResponse> {
  const start = pageParam * pageSize
  const end = start + pageSize - 1

  // 현재 로그인된 유저의 세션 정보를 가져옴
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인된 유저가 없습니다.')
  }

  // Supabase에서 좋아요 누른 게시물만 가져오기
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

// 해당 유저가 올린 게시물만 조회
export async function fetchMyPostsPerPage(
  pageParam: number = 0,
  pageSize: number = 8
): Promise<FetchPostsResponse> {
  const start = pageParam * pageSize
  const end = start + pageSize - 1

  // 현재 로그인된 유저의 세션 정보를 가져옴
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인된 유저가 없습니다.')
  }

  // Supabase에서 해당 유저가 올린 게시물만 가져오기
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user', user.id)
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
