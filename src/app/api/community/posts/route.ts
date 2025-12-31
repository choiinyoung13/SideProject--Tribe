import { NextResponse } from 'next/server'
import { tabNumberToCommunityCategory } from '@/lib/utils/tabNumberToCategory'
import { fetchPostsPerPageServer } from '@/app/community/lib/post/fetchPostsPerPageServer'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const pageParam = Number(searchParams.get('pageParam') ?? '0')
  const pageSize = Number(searchParams.get('pageSize') ?? '8')
  const tab = Number(searchParams.get('tab') ?? '0')
  const searchKeyword = searchParams.get('searchKeyword') ?? ''

  const safePageParam = Number.isFinite(pageParam) && pageParam >= 0 ? pageParam : 0
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0 && pageSize <= 50 ? pageSize : 8
  const safeTab = Number.isFinite(tab) && tab >= 0 ? tab : 0

  const category = tabNumberToCommunityCategory(safeTab)

  const data = await fetchPostsPerPageServer(
    safePageParam,
    safePageSize,
    category,
    searchKeyword
  )

  return NextResponse.json(data)
}


