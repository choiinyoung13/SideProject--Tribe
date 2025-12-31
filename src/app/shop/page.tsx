import HeaderSection from '@/app/shop/components/Shop/HeaderSection'
import MainSection from '@/app/shop/components/Shop/MainSection'
import Banner from './components/Banner/Banner'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ReactQueryHydrate } from '@/components/ReactQueryHydrate'
import { fetchItemsPerPageServer } from '@/app/shop/lib/fetchItemsPerPageServer'
import { fetchShopCategoryCounts } from '@/app/shop/lib/fetchShopCategoryCountsServer'

type Props = {
  searchParams: Promise<{ tab?: string; q?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { tab, q } = await searchParams
  const tabValue = tab ? Number(tab) : 0
  const searchKeyword = (q ?? '').trim()

  const queryClient = new QueryClient()

  const [counts] = await Promise.all([
    fetchShopCategoryCounts(searchKeyword),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['items', tabValue, searchKeyword],
      queryFn: ({ pageParam }) =>
        fetchItemsPerPageServer(
          (pageParam as number) ?? 0,
          10,
          tabValue,
          searchKeyword
        ),
      initialPageParam: 0,
      getNextPageParam: (lastPage: { nextCursor: number | null }) =>
        lastPage.nextCursor ?? undefined,
    }),
  ])

  const dehydratedState = dehydrate(queryClient)

  return (
    <div className="pt-[100px] max-[1024px]:pt-[90px] max-[768px]:pt-[74px] max-[600px]:pt-[60px]">
      <Banner />
      <div className="w-full z-[97]">
        <HeaderSection counts={counts} />
        <ReactQueryHydrate state={dehydratedState}>
          <MainSection counts={counts} />
        </ReactQueryHydrate>
      </div>
    </div>
  )
}


