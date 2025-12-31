import { Card } from './Card'
import { PostType } from '@/types/PostType'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchLikedPostsPerPage } from '@/app/community/lib/post/fetchLikedPostsPerPage'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

type FetchPostsResponse = {
  posts: PostType[]
  nextCursor: number | null
}

export function LikedPostsSection() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const subTab = searchParams.get('subTab')

  const {
    data: likedPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: likedPostLoading,
  } = useInfiniteQuery<FetchPostsResponse>({
    queryKey: ['posts', tab, subTab],
    queryFn: ({ pageParam }) => fetchLikedPostsPerPage((pageParam as number) ?? 0, 8),
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

  if (likedPostLoading) {
    return (
      <div className="mt-[100px] w-full min-h-[500px] h-[calc(100vh-600px)] flex items-center justify-center max-[1024px]:mt-[70px] max-[768px]:mt-[90px]">
        <div className="flex items-center gap-2" aria-label="게시물 로딩 중">
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

  const initialPosts = likedPosts?.pages?.[0]?.posts ?? []
  const isShort = initialPosts.length <= 4

  return (
    <div className={`w-full pt-[20px] ${isShort ? 'mb-[30px]' : 'mb-0'}`}>
      <div className="flex flex-col items-center justify-center">
        <section className="w-full min-h-[565px] flex flex-wrap gap-[20px] max-[1150px]:px-[30px] max-[1150px]:pl-[35px]">
          {likedPosts && likedPosts.pages[0].posts.length > 0 ? (
            likedPosts.pages.flatMap((page, pageIndex) =>
              page.posts.map((post, index) => <Card key={`${pageIndex}-${index}`} post={post} />)
            )
          ) : (
            <div className="flex w-full justify-center items-center [&_p]:text-[1.5rem] max-[600px]:[&_p]:text-[1.3rem] max-[400px]:[&_p]:text-[1.1rem]">
              <p>좋아요한 게시물이 없습니다.</p>
            </div>
          )}
        </section>
        {hasNextPage && !isFetchingNextPage && <div className="w-full h-[30px]" ref={ref} />}
      </div>
    </div>
  )
}


