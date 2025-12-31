"use client"

import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import PostCard from './PostCard'
import { fetchPostsPerPage } from '@/app/community/lib/post/fetchPostsPerPage'
import EmptySearchResult from '@/components/Common/EmptySearchResult'
import { useCommunitySortStore } from '@/store/communitySort.store'

export default function PostGridClient() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const tabValue = tabParam ? Number(tabParam) : 0
  const q = (searchParams.get('q') ?? '').trim()
  const sortValue = useCommunitySortStore(s => s.sort)

  const prevInViewRef = useRef(false)
  const [ref, inView] = useInView({ threshold: 0, delay: 0 })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['posts', tabValue, q],
      queryFn: ({ pageParam }) =>
        fetchPostsPerPage(pageParam as number, 8, tabValue, q),
      initialPageParam: 0,
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
      staleTime: 60 * 1000,
    })

  // InView Logic
  useEffect(() => {
    prevInViewRef.current = false
  }, [tabValue, q])

  useEffect(() => {
    const isEntering = inView && !prevInViewRef.current
    prevInViewRef.current = inView
    if (isEntering && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  const allPosts = useMemo(
    () => data.pages.flatMap(page => page.posts),
    [data.pages]
  )

  const sortedPosts = useMemo(() => {
    const posts = [...allPosts]
    if (sortValue === '인기순') {
      return posts.sort((a, b) => {
        const aLikes = Array.isArray(a.liked) ? a.liked.length : 0
        const bLikes = Array.isArray(b.liked) ? b.liked.length : 0
        if (bLikes !== aLikes) return bLikes - aLikes
        const aMs = Date.parse(a.created_at)
        const bMs = Date.parse(b.created_at)
        if (Number.isFinite(bMs) && Number.isFinite(aMs) && bMs !== aMs)
          return bMs - aMs
        return b.id - a.id
      })
    }
    return posts
  }, [allPosts, sortValue])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 pb-10">
        {sortedPosts.length > 0 ? (
          sortedPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="col-span-full">
            <EmptySearchResult />
          </div>
        )}
      </div>

      {hasNextPage && sortedPosts.length > 0 && (
        <div
          ref={ref}
          className={`w-full flex justify-center items-center ${isFetchingNextPage ? 'py-[22px]' : 'h-px'
            }`}
          aria-hidden={!isFetchingNextPage}
        >
          {isFetchingNextPage && (
            <div
              className="flex items-center gap-2"
              aria-busy="true"
              aria-live="polite"
              aria-label="로딩 중"
            >
              <span className="sr-only">Loading...</span>
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
          )}
        </div>
      )}
    </>
  )
}
