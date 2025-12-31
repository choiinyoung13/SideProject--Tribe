'use client'

import { useState } from 'react'
import SelectOptionBox from './ItemFilterSelectOptionBox'
import { convertToKorean } from '@/lib/utils/convertToKorean'
import { ChevronDown, Palette, Ruler, Wallet } from 'lucide-react'
import { useShopFilterStore } from '@/store/shopFilter.store'

interface ItemFilterProps {
  type: 'size' | 'price' | 'color'
}

export default function ItemFilter({ type }: ItemFilterProps) {
  const [isActive, setIsActive] = useState(false)
  const selected = useShopFilterStore(s => s[type])
  const isApplied = selected !== null

  const label = convertToKorean(type)
  const icon =
    type === 'size' ? (
      <Ruler size={18} />
    ) : type === 'price' ? (
      <Wallet size={18} />
    ) : (
      <Palette size={18} />
    )

  return (
    <div className="mt-1">
      <button
        type="button"
        className={`appearance-none border-0 w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
          isApplied
            ? 'bg-[#141414] text-white font-semibold'
            : isActive
              ? 'bg-gray-50 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
        }`}
        onClick={() => setIsActive(v => !v)}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span
            className={`shrink-0 flex items-center justify-center translate-y-[1px] ${
              isApplied ? 'text-white' : 'text-gray-400 group-hover:text-emerald-500'
            }`}
          >
            {icon}
          </span>
          <span className="font-medium leading-none whitespace-nowrap">{label}</span>
        </span>

        <span className="flex items-center gap-1.5 shrink-0">
          <span
            className={`text-xs max-w-[8.5rem] truncate whitespace-nowrap ${
              isApplied ? 'text-white/85' : 'text-gray-500'
            }`}
            title={selected ? String(selected) : 'All'}
          >
            {selected ? String(selected) : 'All'}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${isActive ? 'rotate-180' : ''} ${
              isApplied ? 'text-white/80' : 'text-gray-400'
            }`}
          />
        </span>
      </button>

      {isActive ? (
        <div className="px-3 pt-2 pb-1">
          <SelectOptionBox type={type} onSelect={() => setIsActive(false)} />
        </div>
      ) : null}
    </div>
  )
}
