'use client'

import { IoSearch } from 'react-icons/io5'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import { useShopSortStore } from '@/store/shopSort.store'
import { useShopFilterStore } from '@/store/shopFilter.store'

export default function FilterSection() {
  const sp = useSearchParams()
  const tab = sp.get('tab')
  const q = (sp.get('q') ?? '').trim()
  const defaultValue = useMemo(() => q, [q])

  const setSort = useShopSortStore(s => s.setSort)
  const resetFilters = useShopFilterStore(s => s.reset)

  // Build reset URL (keeps tab, removes q)
  const resetUrl = useMemo(() => {
    if (!tab) return '/shop'
    return `/shop?tab=${tab}`
  }, [tab])

  const handleReset = () => {
    setSort('추천순')
    resetFilters()
  }

  return (
    <>
      <div className="w-full flex gap-2">
        <form action="/shop" method="GET" className="relative flex-1 min-w-0">
          {tab ? <input type="hidden" name="tab" value={tab} /> : null}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <IoSearch color="rgba(120,120,120,1)" />
          </div>
          <input
            className="w-full pl-11 pr-4 py-2.5 text-sm border-0 rounded-xl bg-[rgba(240,240,240,1)] focus:outline-none placeholder:text-[rgba(180,180,180,1)]"
            type="text"
            placeholder="상품 이름으로 검색"
            name="q"
            defaultValue={defaultValue}
          />
        </form>

        {q && (
          <Link
            href={resetUrl}
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-100 shrink-0"
          >
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline">초기화</span>
          </Link>
        )}
      </div>
    </>
  )
}
