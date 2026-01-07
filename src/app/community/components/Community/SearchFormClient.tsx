'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { saveSearchKeywords } from '@/app/community/lib/searchKeywords/saveSearchKeywords'

function buildCommunityHref(params: { tab?: number; q?: string }) {
  const sp = new URLSearchParams()
  if (params.tab != null && params.tab !== 0) sp.set('tab', String(params.tab))
  if (params.q) sp.set('q', params.q)
  const qs = sp.toString()
  return qs ? `/community?${qs}` : '/community'
}

export default function SearchFormClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const tabParam = searchParams.get('tab')
  const tabValue = tabParam ? Number(tabParam) : 0
  const currentQ = (searchParams.get('q') ?? '').trim()
  const [searchValue, setSearchValue] = useState(currentQ)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedValue = searchValue.trim()
    
    if (!trimmedValue) {
      // 검색어가 없으면 검색어만 제거하고 이동
      router.push(buildCommunityHref({ tab: tabValue }))
      return
    }

    // 1. 검색어 저장
    try {
      await saveSearchKeywords(trimmedValue)
      
      // 2. 인기 키워드 목록 갱신
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['top5Keywords'] })
        queryClient.refetchQueries({ queryKey: ['top5Keywords'] })
      }, 300)
    } catch (error) {
      console.error('키워드 저장 실패:', error)
    }

    // 3. 페이지 이동
    router.push(buildCommunityHref({ tab: tabValue, q: trimmedValue }))
  }

  return (
    <div className="relative flex-1 min-w-0">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <form onSubmit={handleSubmit}>
        {tabValue ? (
          <input type="hidden" name="tab" value={String(tabValue)} />
        ) : null}
        <input
          type="text"
          className="block w-full pl-11 pr-3 py-3 border-none rounded-2xl text-gray-900 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-sm font-medium"
          placeholder="궁금한 키워드를 검색해보세요 (예: 몬스테라, 분갈이)"
          name="q"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </form>
    </div>
  )
}

