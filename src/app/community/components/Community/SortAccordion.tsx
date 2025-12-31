"use client"

import { useState } from 'react'
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import { useCommunitySortStore } from '@/store/communitySort.store'

export default function SortAccordion() {
  const [open, setOpen] = useState(false)
  const sortValue = useCommunitySortStore(s => s.sort)
  const setSort = useCommunitySortStore(s => s.setSort)

  return (
    <div className="mt-1 mb-3">
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
          <span
            className="text-xs text-gray-500 max-w-[8.5rem] truncate whitespace-nowrap"
            title={sortValue}
          >
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
            {(['최신순', '인기순'] as const).map((opt, i) => {
              const checked = sortValue === opt
              return (
                <div key={opt} className="mt-[10px] mb-[10px] flex items-center">
                  <input
                    type="radio"
                    id={`community-sort-${i}`}
                    name="community-sort"
                    checked={checked}
                    onChange={() => {
                      setSort(opt)
                      setOpen(false)
                    }}
                  />
                  <label
                    className="text-[0.9rem] font-[300] ml-[5px] text-[rgba(40,40,40,1)]"
                    htmlFor={`community-sort-${i}`}
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

