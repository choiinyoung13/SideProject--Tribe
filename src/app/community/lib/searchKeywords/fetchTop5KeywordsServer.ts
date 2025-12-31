import 'server-only'

import { createSupabaseServerComponentClient } from '@/supabase/supabaseServer'
import type { Keyword } from './_shared'

export async function fetchTop5KeywordsServer(): Promise<Keyword[]> {
  const supabase = await createSupabaseServerComponentClient()

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

  type KeywordRow = {
    keyword: string | null
    search_count: number | null
  }

  const rows = (data ?? []) as KeywordRow[]
  const sortedKeywords = [...rows].sort((a, b) => {
    const aCount = Number(a.search_count ?? 0)
    const bCount = Number(b.search_count ?? 0)

    if (bCount === aCount) {
      return String(a.keyword ?? '').localeCompare(String(b.keyword ?? ''))
    }
    return bCount - aCount
  })

  return sortedKeywords as Keyword[]
}


