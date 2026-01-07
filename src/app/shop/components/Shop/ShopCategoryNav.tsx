'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Calendar,
  ChevronDown,
  Gift,
  Grid,
  Home,
  Leaf,
  Package,
  Sparkles,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import type { ShopCategoryCounts } from '@/app/shop/lib/fetchShopCategoryCountsServer'

type Mode = 'sidebar' | 'accordion'

const categories = [
  { id: 0, title: '전체' },
  { id: 1, title: '이벤트' },
  { id: 2, title: '선물용' },
  { id: 3, title: '인테리어용' },
  { id: 4, title: '랭킹' },
  { id: 5, title: '추천' },
  { id: 6, title: '화환/식물' },
  { id: 7, title: '화분자재류' },
  { id: 8, title: '원예자재류' },
] as const

function hrefForTab(tabId: number, searchKeyword?: string) {
  const sp = new URLSearchParams()
  if (tabId) sp.set('tab', String(tabId))
  if (searchKeyword) sp.set('q', searchKeyword)
  const qs = sp.toString()
  return qs ? `/shop?${qs}` : '/shop'
}

function getCategoryIcon(title: (typeof categories)[number]['title']) {
  switch (title) {
    case '전체':
      return <Grid size={18} />
    case '이벤트':
      return <Calendar size={18} />
    case '선물용':
      return <Gift size={18} />
    case '인테리어용':
      return <Home size={18} />
    case '랭킹':
      return <TrendingUp size={18} />
    case '추천':
      return <Sparkles size={18} />
    case '화환/식물':
      return <Leaf size={18} />
    case '화분자재류':
      return <Package size={18} />
    case '원예자재류':
      return <Wrench size={18} />
    default:
      return <Grid size={18} />
  }
}

function CategoryList({
  activeTab,
  counts,
  searchKeyword,
}: {
  activeTab: number
  counts?: ShopCategoryCounts
  searchKeyword?: string
}) {
  return (
    <ul className="space-y-1">
      {categories.map(cat => {
        const isActive = activeTab === cat.id
        const count = counts?.[cat.id] ?? 0
        return (
          <li key={cat.id}>
            <Link
              href={hrefForTab(cat.id, searchKeyword)}
              scroll={false}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                isActive
                  ? 'bg-[#141414] text-white font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
              }`}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span
                  className={`shrink-0 flex items-center justify-center translate-y-[1px] ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-emerald-500'
                  }`}
                >
                  {getCategoryIcon(cat.title)}
                </span>
                <span
                  className={`font-medium leading-none truncate ${
                    isActive ? 'text-white' : ''
                  }`}
                >
                  {cat.title}
                </span>
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {count}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default function ShopCategoryNav({
  mode = 'sidebar',
  counts,
}: {
  mode?: Mode
  counts?: ShopCategoryCounts
}) {
  const sp = useSearchParams()
  const tab = sp.get('tab')
  const q = sp.get('q')
  const searchKeyword = q ?? undefined
  const activeTab = tab ? Number(tab) : 0
  const activeTitle = categories.find(c => c.id === activeTab)?.title ?? '전체'
  const activeCount = counts?.[activeTab] ?? 0

  if (mode === 'accordion') {
    return (
      <details className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <summary className="list-none cursor-pointer px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-bold text-gray-900 truncate">
              카테고리: {activeTitle}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          </div>
          <ChevronDown size={18} className="text-gray-400 shrink-0" />
        </summary>
        <div className="px-3 pb-3">
          <CategoryList
            activeTab={activeTab}
            counts={counts}
            searchKeyword={searchKeyword}
          />
        </div>
      </details>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] p-4 border border-gray-100">
      <CategoryList
        activeTab={activeTab}
        counts={counts}
        searchKeyword={searchKeyword}
      />
    </div>
  )
}
