import { getOptionalUser } from '@/lib/server/auth'
import { getCommunityInitialData } from './lib/server'
import { fetchPostsPerPageServer } from './lib/post/fetchPostsPerPageServer'
import { fetchTop5KeywordsServer } from './lib/searchKeywords/fetchTop5KeywordsServer'
import { tabNumberToCommunityCategory } from '@/lib/utils/tabNumberToCategory'
import { CommunityLayout } from './components/CommunityLayout'
import PostGridClient from './components/Community/PostGridClient'
import WritePostButton from './components/Community/WritePostButton'
import FollowRecommendsClient from './components/Community/FollowRecommendsClient'
import SortAccordion from './components/Community/SortAccordion'
import PopularKeywordsClient from './components/Community/PopularKeywordsClient'
import SearchFormClient from './components/Community/SearchFormClient'
import {
  Calendar,
  ChevronDown,
  Gift,
  Grid,
  HelpCircle,
  Info,
  MessageCircle,
  MoreHorizontal,
  UserPlus,
} from 'lucide-react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ReactQueryHydrate } from '@/components/ReactQueryHydrate'
import Link from 'next/link'
import CommunityResetButton from './components/Community/CommunityResetButton'
import type { FetchPostsResponse } from '@/app/community/lib/post/_types'

type Props = {
  searchParams: Promise<{
    tab?: string
    q?: string
  }>
}

function buildCommunityHref(params: { tab?: number; q?: string }) {
  const sp = new URLSearchParams()
  if (params.tab != null && params.tab !== 0) sp.set('tab', String(params.tab))
  if (params.q) sp.set('q', params.q)
  const qs = sp.toString()
  return qs ? `/community?${qs}` : '/community'
}

export default async function Page({ searchParams }: Props) {
  const { tab, q } = await searchParams
  const tabValue = tab ? Number(tab) : 0
  const searchKeyword = (q ?? '').trim()

  const user = await getOptionalUser()
  const queryClient = new QueryClient()

  const [{ categories, recommends }] = await Promise.all([
    getCommunityInitialData(user?.id ?? null, searchKeyword),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', tabValue, searchKeyword],
      queryFn: ({ pageParam }) =>
        fetchPostsPerPageServer(
          (pageParam as number) ?? 0,
          8,
          tabNumberToCommunityCategory(tabValue),
          searchKeyword
        ),
      initialPageParam: 0,
      getNextPageParam: (lastPage: FetchPostsResponse) =>
        lastPage.nextCursor ?? undefined,
    }),
    // 인기 키워드는 클라이언트에서 tanstack query로 가져오므로 prefetch만 수행
    queryClient.prefetchQuery({
      queryKey: ['top5Keywords'],
      queryFn: fetchTop5KeywordsServer,
    }),
  ])

  const dehydratedState = dehydrate(queryClient)

  const activeCategoryTitle =
    categories.find(c => c.id === tabValue)?.title ?? '전체'

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case '전체':
        return <Grid size={18} />
      case '잡담':
        return <MessageCircle size={18} />
      case '질문':
        return <HelpCircle size={18} />
      case '나눔':
        return <Gift size={18} />
      case '정보':
        return <Info size={18} />
      case '이벤트':
        return <Calendar size={18} />
      default:
        return <MoreHorizontal size={18} />
    }
  }

  return (
    <CommunityLayout>
      <div className="grid grid-cols-1 gap-[1.2rem] items-start animate-fade-in lg:grid-cols-[230px_minmax(0,1fr)_230px]">
        {/* Left Sidebar - Categories */}
        <aside>
          {/* Mobile/Tablet: Accordion */}
          <details className="lg:hidden bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden">
            <summary className="list-none cursor-pointer px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-bold text-gray-900 truncate">
                  카테고리: {activeCategoryTitle}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {categories.find(c => c.id === tabValue)?.count ?? 0}
                </span>
              </div>
              <ChevronDown size={18} className="text-gray-400" />
            </summary>
            <div className="px-3 pb-3">
              <ul className="space-y-1">
                {categories.map(cat => {
                  const isActive = Number(tabValue) === cat.id
                  return (
                    <li key={cat.id}>
                      <Link
                        href={buildCommunityHref({
                          tab: cat.id,
                          q: searchKeyword || undefined,
                        })}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                          isActive
                            ? 'bg-[#141414] text-white font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                        }`}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <span
                            className={`shrink-0 flex items-center justify-center translate-y-[1px] ${
                              isActive
                                ? 'text-white'
                                : 'text-gray-400 group-hover:text-emerald-500'
                            }`}
                          >
                            {getCategoryIcon(cat.title)}
                          </span>
                          <span
                            className={`font-medium leading-none truncate ${
                              isActive ? 'text-white' : ''
                            }`}
                          >
                            {cat.title}
                          </span>
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/15 text-white'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {cat.count}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </details>

          {/* Desktop: Sticky sidebar */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] p-4 border border-gray-100 sticky top-24">
            <ul className="space-y-1">
              {categories.map(cat => {
                const isActive = Number(tabValue) === cat.id
                return (
                  <li key={cat.id}>
                    <Link
                      href={buildCommunityHref({
                        tab: cat.id,
                        q: searchKeyword || undefined,
                      })}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                        isActive
                          ? 'bg-[#141414] text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span
                          className={`shrink-0 flex items-center justify-center translate-y-[1px] ${
                            isActive
                              ? 'text-white'
                              : 'text-gray-400 group-hover:text-emerald-500'
                          }`}
                        >
                          {getCategoryIcon(cat.title)}
                        </span>
                        <span
                          className={`font-medium leading-none truncate ${
                            isActive ? 'text-white' : ''
                          }`}
                        >
                          {cat.title}
                        </span>
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Sort */}
          <div className="hidden lg:block mt-4 bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] p-4 border border-gray-100">
            <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 px-3">
              Filters
            </div>

            <SortAccordion />
          </div>
        </aside>

        {/* Main Feed - Posts */}
        <section className="space-y-6 min-w-0">
          {/* Search & Action Bar */}
          <div className="bg-white rounded-[20px] p-2 shadow-[0_8px_24px_rgba(15,23,42,0.08)] border border-gray-100 flex items-center flex-nowrap gap-2">
            <SearchFormClient />

            <div className="flex gap-2 shrink-0">
              {searchKeyword && (
                <CommunityResetButton
                  resetHref={buildCommunityHref({ tab: tabValue })}
                />
              )}
              <WritePostButton variant="feed" />
            </div>
          </div>

          {/* Grid (Hydration Wrapped) */}
          <ReactQueryHydrate state={dehydratedState}>
            <PostGridClient />
          </ReactQueryHydrate>
        </section>

        {/* Right Sidebar - Widgets */}
        <aside className="space-y-4 hidden lg:block">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200">
            <h3 className="font-bold text-lg mb-1 font-heading">
              식물 키우기, <br />
              어려우신가요?
            </h3>
            <p className="text-emerald-100 text-sm mb-4">
              고수들에게 물어보세요!
            </p>
            <WritePostButton variant="cta" />
          </div>

          <ReactQueryHydrate state={dehydratedState}>
            <PopularKeywordsClient />
          </ReactQueryHydrate>

          <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus size={18} className="text-gray-900" />
              <h3 className="font-bold text-gray-900 font-heading">
                이웃 추천
              </h3>
            </div>
            <FollowRecommendsClient recommends={recommends} />
          </div>
        </aside>
      </div>
    </CommunityLayout>
  )
}
