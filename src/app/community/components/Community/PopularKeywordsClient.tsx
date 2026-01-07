'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import {
  fetchTop5Keywords,
  type Keyword,
} from '@/app/community/lib/searchKeywords/fetchTop5Keywords'
import { useSearchParams } from 'next/navigation'

function buildCommunityHref(params: { tab?: number; q?: string }) {
  const sp = new URLSearchParams()
  if (params.tab != null && params.tab !== 0) sp.set('tab', String(params.tab))
  if (params.q) sp.set('q', params.q)
  const qs = sp.toString()
  return qs ? `/community?${qs}` : '/community'
}

export default function PopularKeywordsClient() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const tabValue = tabParam ? Number(tabParam) : 0

  const { data: keywords, isLoading, error } = useQuery<Keyword[]>({
    queryKey: ['top5Keywords'],
    queryFn: fetchTop5Keywords,
    staleTime: 1000 * 30, // 30초로 줄여서 더 자주 업데이트
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true, // 창 포커스 시 자동 refetch
  })

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-gray-900" />
        <h3 className="font-bold text-gray-900 font-heading">주간 인기 키워드</h3>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-8 bg-gray-100 rounded animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-sm text-gray-500 text-center py-4">
            키워드를 불러오는 중 오류가 발생했습니다.
          </div>
        ) : keywords && keywords.length > 0 ? (
          keywords.slice(0, 5).map((kw, idx) => {
            const rank = idx + 1
            return (
              <Link
                key={`${kw.keyword}-${idx}`}
                href={buildCommunityHref({
                  tab: tabValue,
                  q: kw.keyword,
                })}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                      rank <= 3
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {rank}
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                    {kw.keyword}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{kw.search_count}</span>
              </Link>
            )
          })
        ) : (
          <div className="text-sm text-gray-500 text-center py-4">
            인기 키워드가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

