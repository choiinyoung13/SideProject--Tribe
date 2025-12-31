'use client'

import { IoSearch } from 'react-icons/io5'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import { useShopSortStore } from '@/store/shopSort.store'
import { useShopFilterStore } from '@/store/shopFilter.store'

/**
 * Sidebar search card (placed above Categories in the left sidebar).
 */
export default function SearchSection() {
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
    <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] p-4 border border-gray-100">
      <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 px-3">
        Search
      </div>

      <form action="/shop" method="GET" className="relative">
        {tab ? <input type="hidden" name="tab" value={tab} /> : null}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <IoSearch color="rgba(120,120,120,1)" />
        </div>
        <input
          className="w-full pl-10 pr-4 py-2.5 text-sm border-0 rounded-xl bg-[rgba(240,240,240,1)] focus:outline-none placeholder:text-[rgba(180,180,180,1)]"
          type="text"
          placeholder="상품 이름으로 검색"
          name="q"
          defaultValue={defaultValue}
        />
      </form>

      {/* Reset Button - only show when search is active */}
      {q && (
        <Link
          href={resetUrl}
          onClick={handleReset}
          className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all duration-200 group"
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
          <span>초기화</span>
        </Link>
      )}
    </div>
  )
}
