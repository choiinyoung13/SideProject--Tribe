import { useRef } from 'react'
import { useShopSortStore, type ShopSortValue } from '@/store/shopSort.store'
import { Check } from 'lucide-react'

interface WebSortModalProps {
  className?: string
  setSortModalOpenedState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WebSortModal({
  className,
  setSortModalOpenedState,
}: WebSortModalProps) {
  const sortDataState = useShopSortStore(s => s.sort)
  const setSortDataState = useShopSortStore(s => s.setSort)

  const sortDatas = useRef(['추천순', '낮은가격순', '높은가격순', '할인률순'])

  return (
    <>
      <div
        className={`rounded-2xl border border-gray-100 bg-white p-2 shadow-lg w-[160px] max-[600px]:w-[140px] ${className || ''}`}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {sortDatas.current.map((data: string, i: number) => {
          const isActive = sortDataState === data
          return (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm cursor-pointer transition-colors ${
                isActive
                  ? 'bg-gray-50 text-gray-900 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => {
                setSortDataState(data as ShopSortValue)
                setSortModalOpenedState(prev => !prev)
              }}
            >
              <span className="truncate">{data}</span>
              {isActive ? (
                <Check size={16} className="text-gray-900" />
              ) : (
                <span className="w-4" />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
