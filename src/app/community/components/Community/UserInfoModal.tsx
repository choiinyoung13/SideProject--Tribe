import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUserPostsPerPage } from '@/app/community/lib/post/fetchUserPostsPerPage'
import type { FetchPostsResponse } from '@/app/community/lib/post/_types'
import { useInView } from 'react-intersection-observer'
import { UserRecommendCard } from './UserRecommendCard'

import type { UserInfoType } from '@/types/UserInfoType'

export default function UserInfoModal({
  user,
  onClose,
}: {
  user: UserInfoType | null
  onClose: () => void
}) {

  // 모달이 열릴 때 body 스크롤을 막고, 모달을 닫을 때 스크롤을 다시 허용
  // 및 활동(내가 올린 게시물) 데이터 페칭
  const {
    data: myPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: myPostLoading,
  } = useInfiniteQuery<FetchPostsResponse>({
    queryKey: ['posts', user!.id],
    queryFn: ({ pageParam }) =>
      fetchUserPostsPerPage((pageParam as number) ?? 0, 9, user!.id),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    staleTime: 0,
    gcTime: 0,
    enabled: !!user,
  })

  const { ref, inView } = useInView({
    threshold: 1,
    initialInView: true,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!user) return null

  // Modal은 Portal을 통해 body 바로 아래에 렌더링
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 z-[1005] w-screen min-w-[375px] h-screen bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
      <div className="bg-white p-[20px] rounded-[8px] w-[90%] max-w-[600px] flex flex-col items-center relative">
        <button
          className="absolute top-[15px] right-[10px] bg-transparent border-0 text-[16px] cursor-pointer [&_svg]:text-[1.5rem]"
          onClick={onClose}
        >
          <IoClose />
        </button>
        <div className="w-full">
          <div className="flex w-full items-center justify-start">
            <img
              className="w-[50px] h-[50px] rounded-full max-[600px]:w-[40px] max-[600px]:h-[40px] max-[400px]:w-[30px] max-[400px]:h-[30px]"
              src={
                user.avatar_url
                  ? user.avatar_url
                  : 'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg'
              }
              alt={user.nickname || user.email}
            />
            <div className="flex flex-col gap-[8px] ml-[12px]">
              <div className="text-[1.1rem] font-bold text-[rgba(30,30,30,1)] max-[600px]:text-[0.95rem] max-[400px]:text-[0.85rem]">
                {user.nickname || user.email.split('@')[0]}
              </div>
              <p className="text-[0.9rem] text-[#555] text-center max-[600px]:text-[0.8rem] max-[400px]:text-[0.7rem]">
                {user.status_message}
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex mt-[20px] flex-col items-center w-full max-h-[523px] justify-center overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}
        >
          <section className="w-full max-h-[523px] flex flex-wrap gap-[14px]">
            {myPostLoading ? (
              <div className="flex w-full h-[250px] justify-center items-center">
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
            ) : myPosts && myPosts.pages[0]?.posts.length > 0 ? (
              myPosts.pages.flatMap((page, pageIndex) =>
                page.posts.map((post, index) => (
                  <UserRecommendCard
                    key={`${pageIndex}-${index}`}
                    post={post}
                  />
                ))
              )
            ) : (
              <div className="flex w-full h-[250px] justify-center items-center [&_p]:text-[1.2rem] max-[600px]:[&_p]:text-[1rem] max-[400px]:[&_p]:text-[0.9rem]">
                <p>등록된 게시물이 없습니다.</p>
              </div>
            )}
            {/* 무한 스크롤 감지를 위한 div */}
            {hasNextPage && !isFetchingNextPage && (
              <div className="w-full h-0 border border-transparent" ref={ref} />
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body // body 바로 아래에 렌더링
  )
}
