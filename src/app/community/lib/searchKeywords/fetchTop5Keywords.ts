import { supabase } from '@/supabase/supabaseClient'

import type { Keyword } from './_shared'

// 인기 키워드를 안정적으로 정렬하여 가져오는 함수
export const fetchTop5Keywords = async (): Promise<Keyword[]> => {
  const { error: deleteError } = await supabase.rpc('delete_and_fetch_keywords')

  if (deleteError) {
    console.error('오래된 키워드 삭제 실패:', deleteError)
    return []
  }

  const { data, error: fetchError } = await supabase.rpc('get_top_keywords', {
    limit_count: 5,
  })

  if (fetchError) {
    console.error('인기 키워드 가져오기 실패:', fetchError)
    return []
  }

  if (!data || !Array.isArray(data)) {
    console.warn('인기 키워드 데이터가 없거나 배열이 아닙니다.')
    return []
  }

  type KeywordRow = {
    keyword: string | null
    search_count: number | null
  }

  const rows = data as KeywordRow[]
  const sortedKeywords = [...rows]
    .filter(row => row.keyword && row.search_count !== null)
    .sort((a, b) => {
      const aCount = Number(a.search_count ?? 0)
      const bCount = Number(b.search_count ?? 0)

      if (bCount === aCount) {
        return String(a.keyword ?? '').localeCompare(String(b.keyword ?? ''))
      }
      return bCount - aCount
    })
    .map(row => ({
      keyword: String(row.keyword ?? ''),
      search_count: Number(row.search_count ?? 0),
    }))

  return sortedKeywords as Keyword[]
}

export type { Keyword } from './_shared'


