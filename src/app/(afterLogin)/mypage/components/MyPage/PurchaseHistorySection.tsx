import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPurchaseHistoryPerPage } from '@/lib/user/fetchUserInfo'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { Card } from './Card'
import { useSearchParams } from 'next/navigation'

type PurchaseHistory = {
  id: number
  price: number
  title: string
  img_url: string
  amount: number
  created_at: string
  additional_product: string
}

type FetchPurchaseHistoryResponse = {
  posts: PurchaseHistory[]
  nextCursor: number | null
}

export function PurchaseHistorySection() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const subTab = searchParams.get('subTab')

  const {
    data: purchaseHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: purchaseHistoryLoading,
  } = useInfiniteQuery<FetchPurchaseHistoryResponse>({
    queryKey: ['purchaseHistory', tab, subTab],
    queryFn: ({ pageParam }) => fetchPurchaseHistoryPerPage((pageParam as number) ?? 0, 8),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    staleTime: 0,
    gcTime: 0,
  })

  const { ref, inView } = useInView({
    threshold: 0.5,
    initialInView: true,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  if (purchaseHistoryLoading) {
    return (
      <div className="mt-[100px] w-full min-h-[500px] h-[calc(100vh-600px)] flex items-center justify-center max-[1024px]:mt-[70px] max-[768px]:mt-[90px]">
        <div className="flex items-center gap-2" aria-label="구매 내역 로딩 중">
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
      </div>
    )
  }

  return (
    <div className="w-full pt-[20px]">
      <div className="flex flex-col items-center justify-center">
        <section className="w-full min-h-[565px] flex flex-wrap gap-[20px] max-[1150px]:px-[30px] max-[1150px]:pl-[35px]">
          {purchaseHistory && purchaseHistory.pages[0].posts.length > 0 ? (
            purchaseHistory.pages.flatMap((page, pageIndex) =>
              page.posts.map((purchase, index) => (
                <Card key={`${pageIndex}-${index}`} purchase={purchase} />
              ))
            )
          ) : (
            <div className="flex w-full justify-center items-center [&_p]:text-[1.5rem] max-[600px]:[&_p]:text-[1.3rem] max-[400px]:[&_p]:text-[1.1rem]">
              <p>구매 내역이 없습니다.</p>
            </div>
          )}
        </section>
        {hasNextPage && !isFetchingNextPage && <div className="w-full h-[30px]" ref={ref} />}
      </div>
    </div>
  )
}


