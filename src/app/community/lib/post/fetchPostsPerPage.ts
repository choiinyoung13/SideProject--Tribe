import type { FetchPostsResponse } from './_types'

// client: page별로 게시물 조회 (API 경유 - Shop과 동일 패턴)
export async function fetchPostsPerPage(
  pageParam: number = 0,
  pageSize: number = 8,
  tab: number = 0,
  searchKeyword: string = ''
): Promise<FetchPostsResponse> {
  const params = new URLSearchParams({
    pageParam: String(pageParam),
    pageSize: String(pageSize),
    tab: String(tab),
    searchKeyword: searchKeyword ?? '',
  })

  const res = await fetch(`/api/community/posts?${params.toString()}`, {
    method: 'GET',
  })

  if (!res.ok) {
    console.error('Error fetching community posts:', await res.text().catch(() => ''))
    return { posts: [], nextCursor: null }
  }

  return (await res.json()) as FetchPostsResponse
}


