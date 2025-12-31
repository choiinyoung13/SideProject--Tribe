import PostCard from './PostCard'
import { fetchPostsPerPage } from '@/app/community/lib/post/fetchPostsPerPage'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect, useMemo, useRef } from 'react'
import { useCommunitySortStore } from '@/store/communitySort.store'
import PostCardSkeletonUI from './PostCardSkeletonUI'

import type { FetchPostsResponse } from '@/app/community/lib/post/_types'
import type { PostWithAuthor } from '@/app/community/lib/post/_types'

interface PostListConProps {
  searchKeyword: string
  tab: string | undefined
}

export default function PostListCon({ searchKeyword, tab }: PostListConProps) {
  const sortValue = useCommunitySortStore(s => s.sort)

  // Shop처럼 inView "진입"에서만 1회 fetch (연속 호출 방지)
  const prevInViewRef = useRef(false)

  const { inView, ref } = useInView({
    threshold: 0.5,
    delay: 0,
  })

  const {
    data: paginatedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery<FetchPostsResponse>({
    queryKey: ['posts', { tab: tab ? Number(tab) : 0, q: searchKeyword }],
    queryFn: ({ pageParam }) =>
      fetchPostsPerPage(
        (pageParam as number) ?? 0,
        8,
        tab ? Number(tab) : 0,
        searchKeyword
      ),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    const isEntering = inView && !prevInViewRef.current
    prevInViewRef.current = inView

    if (isEntering && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  const sortedPosts = useMemo(() => {
    let allPosts: PostWithAuthor[] = []

    if (paginatedData) {
      allPosts = paginatedData.pages.flatMap(page => page.posts)
    }

    const likeCount = (p: PostWithAuthor) =>
      Array.isArray(p.liked) ? p.liked.length : 0
    const createdAtMs = (p: PostWithAuthor) => {
      const ms = Date.parse(p.created_at)
      return Number.isFinite(ms) ? ms : 0
    }

    if (sortValue === '인기순') {
      // 안정 정렬: 좋아요 수 내림차순, 동률이면 최신순(created_at), 그래도 동률이면 id 내림차순
      return [...allPosts].sort((a, b) => {
        const byLikes = likeCount(b) - likeCount(a)
        if (byLikes !== 0) return byLikes

        const byCreatedAt = createdAtMs(b) - createdAtMs(a)
        if (byCreatedAt !== 0) return byCreatedAt

        return b.id - a.id
      })
    } else {
      // 최신순도 안정적으로(혹시 서버/페이지 합치기 순서가 흔들릴 때 대비)
      return [...allPosts].sort((a, b) => {
        const byCreatedAt = createdAtMs(b) - createdAtMs(a)
        if (byCreatedAt !== 0) return byCreatedAt
        return b.id - a.id
      })
    }
  }, [paginatedData, sortValue])

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-202px)] flex flex-col max-[1024px]:min-h-[calc(100vh-200px)] max-[768px]:min-h-[calc(100vh-230px)] max-[600px]:min-h-[calc(100vh-270px)]">
      <div className="flex gap-[20px] w-full flex-wrap">
        {isPending && sortedPosts.length === 0 ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <PostCardSkeletonUI key={index} />
            ))}
          </>
        ) : sortedPosts.length === 0 ? (
          <div className="w-full h-full min-h-[calc(100vh-202px)] flex justify-center items-center text-[1.5rem] max-[1024px]:text-[1.4rem] max-[768px]:min-h-[calc(100vh-220px)] max-[768px]:text-[1.3rem] max-[600px]:min-h-[calc(100vh-270px)] max-[600px]:text-[1.2rem]">
            게시물이 없습니다.
          </div>
        ) : (
          <>
            {sortedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            {hasNextPage && (
              <div
                ref={ref}
                className="w-full flex justify-center items-center py-[22px]"
              >
                {isFetchingNextPage || inView ? (
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
                ) : (
                  <div className="h-[18px]" aria-hidden="true" />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
