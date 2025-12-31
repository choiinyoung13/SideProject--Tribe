import { useRef } from 'react'
import {
  useCommunitySortStore,
  type CommunitySortValue,
} from '@/store/communitySort.store'
import { Check } from 'lucide-react'

interface SortModalProps {
  className?: string
  setSortModalOpenedState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SortModal({
  className,
  setSortModalOpenedState,
}: SortModalProps) {
  const sortDataState = useCommunitySortStore(s => s.sort)
  const setSortDataState = useCommunitySortStore(s => s.setSort)
  const sortDatas = useRef(['최신순', '인기순'])

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
                setSortDataState(data as CommunitySortValue)
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
