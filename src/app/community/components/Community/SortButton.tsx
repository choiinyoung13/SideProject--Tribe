import { useRef, useState } from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import SortModal from './SortModal'
import { useCommunitySortStore } from '@/store/communitySort.store'

export default function SortButton() {
  const sortFilterRef = useRef<HTMLDivElement>(null)
  const sortModalRef = useRef<HTMLDivElement>(null)
  const sortDataState = useCommunitySortStore(s => s.sort)
  const [sortModalOpened, setSortModalOpenedState] = useState(false)

  return (
    <div
      className="flex items-center cursor-pointer relative [&_span]:text-[0.9rem] [&_span]:mr-[2px]"
      ref={sortFilterRef}
      onClick={() => {
        setSortModalOpenedState(prev => !prev)
      }}
    >
      <span className="hidden min-[768px]:inline-block mb-[1px] flex-shrink-0">
        {sortDataState}
      </span>
      <div className="relative text-[1.4rem]">
        <BiSortAlt2 color="rgba(80,80,80,1)" />
        {sortModalOpened && (
          <div className="absolute top-[30px] right-[10px] z-[10000]" ref={sortModalRef}>
            <SortModal setSortModalOpenedState={setSortModalOpenedState} />
          </div>
        )}
      </div>
    </div>
  )
}
