import 'server-only'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import { tabNumberToCategory } from '@/lib/utils/tabNumberToCategory'

export type ShopCategoryCounts = Record<number, number>

let cache:
  | {
    value: ShopCategoryCounts
    expiresAt: number
  }
  | undefined

export async function fetchShopCategoryCountsServer(): Promise<ShopCategoryCounts> {
  const now = Date.now()
  if (cache && cache.expiresAt > now) return cache.value

  const supabase = await createSupabaseServerComponentClient()

  const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const results = await Promise.all(
    ids.map(async id => {
      if (id === 0) {
        const { count } = await supabase
          .from('items')
          .select('id', { count: 'exact', head: true })
        return [id, count ?? 0] as const
      }

      const category = tabNumberToCategory(id)
      const { count } = await supabase
        .from('items')
        .select('id', { count: 'exact', head: true })
        .eq('category', category)
      return [id, count ?? 0] as const
    })
  )

  const counts: ShopCategoryCounts = results.reduce((acc, [id, c]) => {
    acc[id] = c
    return acc
  }, {} as ShopCategoryCounts)

  cache = { value: counts, expiresAt: now + 60_000 }
  return counts
}

async function fetchShopCategoryCountsForSearch(searchKeyword: string): Promise<ShopCategoryCounts> {
  const supabase = await createSupabaseServerComponentClient()

  const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const results = await Promise.all(
    ids.map(async id => {
      if (id === 0) {
        // 검색어로 필터링된 전체 아이템 개수
        const { count } = await supabase
          .from('items')
          .select('id', { count: 'exact', head: true })
          .ilike('title', `%${searchKeyword}%`)
        return [id, count ?? 0] as const
      }

      // 검색어 + 카테고리로 필터링된 아이템 개수
      const category = tabNumberToCategory(id)
      const { count } = await supabase
        .from('items')
        .select('id', { count: 'exact', head: true })
        .eq('category', category)
        .ilike('title', `%${searchKeyword}%`)
      return [id, count ?? 0] as const
    })
  )

  const counts: ShopCategoryCounts = results.reduce((acc, [id, c]) => {
    acc[id] = c
    return acc
  }, {} as ShopCategoryCounts)

  return counts
}

export async function fetchShopCategoryCounts(searchKeyword: string = ''): Promise<ShopCategoryCounts> {
  // 검색어가 있으면 검색 결과 기준, 없으면 전체 기준으로 카테고리 개수 계산
  return searchKeyword.trim() !== ''
    ? fetchShopCategoryCountsForSearch(searchKeyword.trim())
    : fetchShopCategoryCountsServer()
}


