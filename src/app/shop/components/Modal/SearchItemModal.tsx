import SearchItem from './SearchItem'
import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '@/app/shop/lib/fetchItems'
import { QUERY_KEYS } from '@/shared/constants/queryKeys'
import { useMemo, useState } from 'react'
import loadingIcon from '@/assets/images/logo/ball-triangle.svg'
import { assetSrc } from '@/shared/lib/asset'
import { useShopSortStore } from '@/store/shopSort.store'
import {
  sortHighestDiscountRate,
  sortHighestPrice,
  sortLowestId,
  sortLowestPrice,
} from '@/lib/utils/itemSort'
import type { ItemType } from '@/types/ItemType'

export default function SearchItemModal({
  type,
  wideModeSearchData,
}: {
  type: string
  wideModeSearchData?: string
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS,
    queryFn: fetchItems,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  })
  const [searchData, setSearchData] = useState('')
  const sortValue = useShopSortStore(s => s.sort)

  const keyword = useMemo(() => {
    const raw = (wideModeSearchData ?? searchData ?? '').trim()
    return raw
  }, [searchData, wideModeSearchData])

  const filteredItems = useMemo(() => {
    const items = (data ?? []) as ItemType[]
    if (!keyword) return items
    return items.filter(item => item.title.includes(keyword))
  }, [data, keyword])

  const sortedItems = useMemo(() => {
    const items = [...filteredItems]

    if (sortValue === '추천순') return sortLowestId(items)
    if (sortValue === '낮은가격순') return sortLowestPrice(items)
    if (sortValue === '높은가격순') return sortHighestPrice(items)
    if (sortValue === '할인률순') return sortHighestDiscountRate(items)

    return items
  }, [filteredItems, sortValue])

  if (isLoading)
    return (
      <div
        className={`bg-white rounded-[10px] min-w-[350px] ${
          type === 'wide' ? 'pt-0 px-[14px] pb-[16px]' : 'p-[16px_14px]'
        }`}
      >
        {type !== 'wide' && (
          <div className="[&_input]:w-full [&_input]:border-0 [&_input]:bg-[rgba(245,245,245,1)] [&_input]:p-[8px_10px] [&_input]:text-[1rem] [&_input]:rounded-[8px] [&_input]:placeholder:text-[rgba(180,180,180,1)] [&_input]:placeholder:text-[0.9rem] [&_input]:focus:outline-none">
            <input
              type="text"
              placeholder="상품 이름으로 검색해주세요."
              value={searchData}
              onChange={e => {
                setSearchData(e.target.value)
              }}
            />
          </div>
        )}
        <div className="w-full h-[200px] flex justify-center items-center">
          <img src={assetSrc(loadingIcon)} alt="" />
        </div>
      </div>
    )

  if (error) return <div>Error...</div>

  if (data)
    return (
      <div
        className={`bg-white rounded-[10px] min-w-[350px] ${
          type === 'wide' ? 'pt-0 px-[14px] pb-[16px]' : 'p-[16px_14px]'
        }`}
      >
        {type !== 'wide' && (
          <div className="[&_input]:w-full [&_input]:border-0 [&_input]:bg-[rgba(245,245,245,1)] [&_input]:p-[8px_10px] [&_input]:text-[1rem] [&_input]:rounded-[8px] [&_input]:placeholder:text-[rgba(180,180,180,1)] [&_input]:placeholder:text-[0.9rem] [&_input]:focus:outline-none">
            <input
              type="text"
              placeholder="상품 이름으로 검색해주세요."
              value={searchData}
              onChange={e => {
                setSearchData(e.target.value)
              }}
            />
          </div>
        )}
        <ul className="w-full">
          {sortedItems.map(item => (
            <SearchItem
              key={item.id}
              title={item.title}
              id={item.id}
              imgUrl={item.imgurl}
            />
          ))}
        </ul>
      </div>
    )
}

