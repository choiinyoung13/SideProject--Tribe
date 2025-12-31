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

  const sortedKeywords = [...data].sort((a, b) => {
    if (b.search_count === a.search_count) {
      return a.keyword.localeCompare(b.keyword)
    }
    return b.search_count - a.search_count
  })

  return sortedKeywords as Keyword[]
}

export type { Keyword } from './_shared'


