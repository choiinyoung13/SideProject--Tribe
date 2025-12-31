'use client'

import { useState } from 'react'
import ItemFilter from './ItemFilter'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import { useNavigate } from '@/shared/routing/navigation'
import {
  useShopFilterStore,
} from '@/store/shopFilter.store'
import { ArrowUpDown, ChevronDown, Flame, Heart, Truck, Check } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { useShopSortStore } from '@/store/shopSort.store'

export default function ItemFilterCon() {
  const replaceFilter = useShopFilterStore(s => s.replaceFilter)
  const sortValue = useShopSortStore(s => s.sort)
  const setSort = useShopSortStore(s => s.setSort)
  const { fast, hot, like } = useShopFilterStore(
    useShallow(s => ({
      fast: s.fast,
      hot: s.hot,
      like: s.like,
    }))
  )
  const { session } = useAuth()
  const navigate = useNavigate()

  const handleBadgeClick = (badgeType: string, badgeLabel: string) => {
    const next = useShopFilterStore.getState()

    if (badgeType === 'fast') replaceFilter({ ...next, fast: next.fast ? null : (badgeLabel as '빠른배송') })
    if (badgeType === 'hot') replaceFilter({ ...next, hot: next.hot ? null : (badgeLabel as '인기상품') })
    if (badgeType === 'like') replaceFilter({ ...next, like: next.like ? null : (badgeLabel as '찜한상품') })
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] p-4 border border-gray-100">
      <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 px-3">
        Filters
      </div>

      {/* Sort (Desktop/tablet: accordion inside filter box) */}
      <SortAccordion sortValue={sortValue} setSort={setSort} />

      <div className="space-y-1 mb-3">
        {[
          {
            key: 'fast',
            label: '빠른배송',
            icon: <Truck size={18} />,
            active: !!fast,
            onClick: () => handleBadgeClick('fast', '빠른배송'),
          },
          {
            key: 'hot',
            label: '인기상품',
            icon: <Flame size={18} />,
            active: !!hot,
            onClick: () => handleBadgeClick('hot', '인기상품'),
          },
          {
            key: 'like',
            label: '찜한상품',
            icon: <Heart size={18} />,
            active: !!like,
            onClick: () => {
              if (!session) {
                Swal.fire({
                  text: '로그인 후 사용 가능한 기능입니다.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#1E1E1E',
                  cancelButtonColor: '#1E1E1E',
                  confirmButtonText: '로그인',
                  cancelButtonText: '닫기',
                  scrollbarPadding: false,
                }).then(result => {
                  if (result.isConfirmed) navigate('/login')
                })
                return
              }
              handleBadgeClick('like', '찜한상품')
            },
          },
        ].map(row => (
          <button
            key={row.key}
            type="button"
            className={`appearance-none border-0 w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
              row.active
                ? 'bg-[#141414] text-white font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
            }`}
            onClick={row.onClick}
          >
            <span className="flex items-center gap-3 min-w-0">
              <span
                className={`shrink-0 flex items-center justify-center translate-y-[1px] ${
                  row.active
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-emerald-500'
                }`}
              >
                {row.icon}
              </span>
              <span className={`font-medium leading-none truncate ${row.active ? 'text-white' : ''}`}>
                {row.label}
              </span>
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              row.active ? 'bg-white/15 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {row.active ? <Check size={14} className="text-current" /> : '—'}
            </span>
          </button>
        ))}
      </div>

      <ItemFilter type="size" />
      <ItemFilter type="price" />
      <ItemFilter type="color" />
    </div>
  )
}

function SortAccordion({
  sortValue,
  setSort,
}: {
  sortValue: string
  setSort: (next: '추천순' | '낮은가격순' | '높은가격순' | '할인률순') => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-1 mb-3 max-[768px]:hidden">
      <button
        type="button"
        className={`appearance-none border-0 w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
          open ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
        }`}
        onClick={() => setOpen(v => !v)}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 flex items-center justify-center translate-y-[1px] text-gray-400 group-hover:text-emerald-500">
            <ArrowUpDown size={18} />
          </span>
          <span className="font-medium leading-none whitespace-nowrap">정렬</span>
        </span>

        <span className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs text-gray-500 max-w-[8.5rem] truncate whitespace-nowrap" title={sortValue}>
            {sortValue}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {open ? (
        <div className="px-3 pt-2 pb-1">
          <div>
            {(['추천순', '낮은가격순', '높은가격순', '할인률순'] as const).map((opt, i) => {
              const checked = sortValue === opt
              return (
                <div key={opt} className="mt-[10px] mb-[10px] flex items-center">
                  <input
                    type="radio"
                    id={`shop-sort-${i}`}
                    name="shop-sort"
                    checked={checked}
                    onChange={() => {
                      setSort(opt)
                      setOpen(false)
                    }}
                  />
                  <label
                    className="text-[0.9rem] font-[300] ml-[5px] text-[rgba(40,40,40,1)]"
                    htmlFor={`shop-sort-${i}`}
                  >
                    {opt}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
