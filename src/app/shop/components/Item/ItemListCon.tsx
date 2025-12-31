'use client'

import { useEffect, useMemo, useRef } from 'react'
import ItemCard from './ItemCard'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
// NOTE: user/cart meta는 items 응답에 포함되어 내려옵니다.

import {
  sortHighestDiscountRate,
  sortHighestPrice,
  sortItmeByFilterObj,
  sortLowestId,
  sortLowestPrice,
} from '@/lib/utils/itemSort'
import { fetchItemsPerPage } from '@/app/shop/lib/fetchItemsPerPage'
import { useInView } from 'react-intersection-observer'
import { useShopFilterStore } from '@/store/shopFilter.store'
import { useShopSortStore } from '@/store/shopSort.store'
import { useShallow } from 'zustand/react/shallow'
import { useSearchParams } from 'next/navigation'
import EmptySearchResult from '@/components/Common/EmptySearchResult'

export default function ItemListCon() {
  const searchParams = useSearchParams()
  const tabValue = Number(searchParams.get('tab') ?? 0) || 0
  const q = (searchParams.get('q') ?? '').trim()

  // "inView 진입" 이벤트에만 반응하기 위한 이전값 저장
  const prevInViewRef = useRef(false)

  const sortValue = useShopSortStore(s => s.sort)
  const filterData = useShopFilterStore(
    useShallow(s => ({
      fast: s.fast,
      hot: s.hot,
      like: s.like,
      size: s.size,
      price: s.price,
      color: s.color,
    }))
  )

  const [ref, inView] = useInView({
    threshold: 0,
    delay: 0,
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['items', tabValue, q],
      queryFn: ({ pageParam }) =>
        fetchItemsPerPage((pageParam as number) ?? 0, 10, tabValue, q),
      initialPageParam: 0,
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
    })

  useEffect(() => {
    // 탭 변경 시, 다음 진입을 다시 감지할 수 있도록 리셋
    prevInViewRef.current = false
  }, [tabValue, q])

  useEffect(() => {
    const isEntering = inView && !prevInViewRef.current
    prevInViewRef.current = inView

    // inView가 false->true로 "진입"했을 때만 1회 fetch
    if (isEntering && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  const allItems = useMemo(
    () => data.pages.flatMap(page => page.items),
    [data.pages]
  )

  const displayItems = useMemo(() => {
    const filtered = sortItmeByFilterObj(allItems, filterData)

    if (sortValue === '추천순') return sortLowestId(filtered.slice())
    if (sortValue === '낮은가격순') return sortLowestPrice(filtered.slice())
    if (sortValue === '높은가격순') return sortHighestPrice(filtered.slice())
    if (sortValue === '할인률순')
      return sortHighestDiscountRate(filtered.slice())

    return filtered
  }, [allItems, filterData, sortValue])

  return (
    <>
      <div className="w-full flex flex-col justify-center">
        <div className="grid w-full grid-cols-5 gap-y-7 gap-x-6 max-[1600px]:grid-cols-4 max-[1300px]:grid-cols-3 max-[1024px]:grid-cols-2">
          {displayItems.length !== 0 ? (
            displayItems.map(
              ({
                id,
                title,
                imgurl,
                originalprice,
                badge,
                discount,
                deliveryperiod,
                isInCart,
                isLiked,
              }) => {
                return (
                  <ItemCard
                    key={id}
                    id={id}
                    title={title}
                    imgurl={imgurl}
                    originalprice={originalprice}
                    badge={badge}
                    discount={discount}
                    isInCart={isInCart}
                    isLiked={isLiked}
                    deliveryPeriod={deliveryperiod}
                  />
                )
              }
            )
          ) : (
            <div className="col-span-full w-full">
              <EmptySearchResult message="해당하는 상품이 없습니다." />
            </div>
          )}
        </div>

        {hasNextPage && displayItems.length !== 0 && (
          <div
            className={`w-full flex justify-center items-center ${
              isFetchingNextPage ? 'py-[22px]' : 'h-px'
            }`}
            ref={ref}
            aria-hidden={!isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <div
                className="flex items-center gap-2"
                aria-busy="true"
                aria-live="polite"
                aria-label="로딩 중"
              >
                <span className="sr-only">Loading…</span>
                <div className="w-2 h-2 rounded-full bg-black motion-safe:animate-dot-pulse" />
                <div
                  className="w-2 h-2 rounded-full bg-black motion-safe:animate-dot-pulse"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-black motion-safe:animate-dot-pulse"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  )
}
