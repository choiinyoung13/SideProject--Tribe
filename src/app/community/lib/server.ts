import 'server-only'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import type { UserInfoType } from '@/types/UserInfoType'

export type CommunityCategory = {
  id: number
  title: string
  count: number
}

type CommunityInitialData = {
  categories: CommunityCategory[]
  recommends: UserInfoType[]
}

// NOTE:
// Next의 unstable_cache/cache scope 안에서는 cookies() 같은 "dynamic source"를 쓸 수 없습니다.
// createSupabaseServerComponentClient()가 cookies()를 읽기 때문에, 여기서는 Next cache 대신
// 단순 module-level TTL cache로 categories만 캐싱합니다. (user/session과 무관한 데이터)
let categoriesCache:
  | {
    value: CommunityCategory[]
    expiresAt: number
  }
  | undefined

// NOTE:
// 이웃 추천은 "게시물 많은 순"이지만, 매 요청마다 posts 전체를 스캔하면 느릴 수 있어서
// module-level TTL cache로 상위 유저 목록만 짧게 캐싱합니다.
let recommendsCache:
  | {
    value: UserInfoType[]
    expiresAt: number
  }
  | undefined

async function getCommunityCategoriesCached(): Promise<CommunityCategory[]> {
  const now = Date.now()
  if (categoriesCache && categoriesCache.expiresAt > now) {
    return categoriesCache.value
  }

  const supabase = await createSupabaseServerComponentClient()

  // categories (posts.category 집계)
  const { data: posts } = await supabase.from('posts').select('category')
  const postsSafe = posts ?? []

  const categoryCounts = postsSafe.reduce(
    (acc: Record<string, number>, post) => {
      const category = post.category || '기타'
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {}
  )

  const categories = [
    { id: 0, title: '전체', count: postsSafe.length },
    { id: 1, title: '잡담', count: categoryCounts['잡담'] || 0 },
    { id: 2, title: '이벤트', count: categoryCounts['이벤트'] || 0 },
    { id: 3, title: '질문', count: categoryCounts['질문'] || 0 },
    { id: 4, title: '나눔', count: categoryCounts['나눔'] || 0 },
    { id: 5, title: '정보', count: categoryCounts['정보'] || 0 },
    { id: 6, title: '기타', count: categoryCounts['기타'] || 0 },
  ] satisfies CommunityCategory[]

  categoriesCache = { value: categories, expiresAt: now + 60_000 }
  return categories
}

async function getTopUsersByPostCountCached(): Promise<UserInfoType[]> {
  const now = Date.now()
  if (recommendsCache && recommendsCache.expiresAt > now) {
    return recommendsCache.value
  }

  const supabase = await createSupabaseServerComponentClient()

  // posts.user 집계 → 유저별 게시물 수 카운트
  const { data: posts } = await supabase.from('posts').select('user')
  const postsSafe = (posts ?? []) as Array<{ user: string | null }>

  const counts = postsSafe.reduce((acc: Record<string, number>, row) => {
    const uid = row.user
    if (!uid) return acc
    acc[uid] = (acc[uid] || 0) + 1
    return acc
  }, {})

  // 상위 유저 id만 먼저 뽑고(여유 있게 20명), 그 id들의 userinfo를 한번에 가져오기
  const rankedUserIds = Object.entries(counts)
    .sort((a, b) => {
      const diff = b[1] - a[1]
      if (diff !== 0) return diff
      return a[0].localeCompare(b[0])
    })
    .slice(0, 20)
    .map(([uid]) => uid)

  if (rankedUserIds.length === 0) {
    recommendsCache = { value: [], expiresAt: now + 60_000 }
    return []
  }

  const { data: users } = await supabase
    .from('userinfo')
    .select('id,email,nickname,avatar_url,status_message,username,admin,likes')
    .in('id', rankedUserIds)

  const usersSafe = (users ?? []) as UserInfoType[]
  const byId = new Map(usersSafe.map(u => [u.id, u]))

  const ordered = rankedUserIds.map(id => byId.get(id)).filter(Boolean) as UserInfoType[]

  recommendsCache = { value: ordered, expiresAt: now + 60_000 }
  return ordered
}

async function getCommunityCategoriesForSearch(searchKeyword: string): Promise<CommunityCategory[]> {
  const supabase = await createSupabaseServerComponentClient()

  // 검색어로 필터링된 posts만 가져오기
  const { data: posts } = await supabase
    .from('posts')
    .select('category')
    .ilike('title', `%${searchKeyword}%`)

  const postsSafe = posts ?? []

  const categoryCounts = postsSafe.reduce(
    (acc: Record<string, number>, post) => {
      const category = post.category || '기타'
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {}
  )

  const categories = [
    { id: 0, title: '전체', count: postsSafe.length },
    { id: 1, title: '잡담', count: categoryCounts['잡담'] || 0 },
    { id: 2, title: '이벤트', count: categoryCounts['이벤트'] || 0 },
    { id: 3, title: '질문', count: categoryCounts['질문'] || 0 },
    { id: 4, title: '나눔', count: categoryCounts['나눔'] || 0 },
    { id: 5, title: '정보', count: categoryCounts['정보'] || 0 },
    { id: 6, title: '기타', count: categoryCounts['기타'] || 0 },
  ] satisfies CommunityCategory[]

  return categories
}

async function getCommunityRecommends(userId: string | null): Promise<UserInfoType[]> {
  const ranked = await getTopUsersByPostCountCached()
  const filtered = userId ? ranked.filter(u => u.id !== userId) : ranked
  return filtered.slice(0, 4)
}

export async function getCommunityInitialData(
  userId: string | null,
  searchKeyword: string = ''
): Promise<CommunityInitialData> {
  const [categories, recommends] = await Promise.all([
    // 검색어가 있으면 검색 결과 기준, 없으면 전체 기준으로 카테고리 개수 계산
    searchKeyword.trim() !== ''
      ? getCommunityCategoriesForSearch(searchKeyword.trim())
      : getCommunityCategoriesCached(),
    getCommunityRecommends(userId),
  ])

  return { categories, recommends }
}


