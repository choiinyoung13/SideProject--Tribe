import { useEffect, useRef, useState } from 'react'
import { Heart, MessageSquare, Share2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import { useNavigate } from '@/shared/routing/navigation'
import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { togglePostLike } from '@/app/community/lib/post/togglePostLike'
import UserInfoModal from './UserInfoModal'
import type { PostWithAuthor } from '@/app/community/lib/post/_types'
import type { FetchPostsResponse } from '@/app/community/lib/post/_types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.extend(relativeTime)
dayjs.locale('ko')

interface PostCardProps {
  post: PostWithAuthor
}

export default function PostCard({ post }: PostCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isProfileLoaded, setIsProfileLoaded] = useState(false)
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false)
  const profileImgRef = useRef<HTMLImageElement | null>(null)
  const { session } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    // 이미지가 hydration 전에 이미 로드되면 onLoad 이벤트를 놓칠 수 있어서 보정
    if (profileImgRef.current?.complete) {
      setIsProfileLoaded(true)
    }
  }, [post.author?.avatar_url])

  const { mutate } = useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId, userId }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // 이전 데이터 백업
      const previousQueries = queryClient.getQueriesData({ queryKey: ['posts'] })

      // 모든 posts 쿼리에 대해 낙관적 업데이트
      queryClient.setQueriesData<InfiniteData<FetchPostsResponse>>(
        { queryKey: ['posts'] },
        old => {
          if (!old) return old

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              posts: page.posts.map(p => {
                if (p.id !== postId) return p

                const currentLiked = Array.isArray(p.liked) ? p.liked : []
                const isCurrentlyLiked = currentLiked.includes(userId)
                const newLiked = isCurrentlyLiked
                  ? currentLiked.filter(id => id !== userId)
                  : [...currentLiked, userId]

                return {
                  ...p,
                  liked: newLiked,
                }
              }),
            })),
          }
        }
      )

      // 롤백을 위한 이전 데이터 반환
      return { previousQueries }
    },
    onError: (error, _variables, context) => {
      console.error('좋아요 업데이트 오류:', error)

      // 이전 데이터로 롤백
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }

      Swal.fire({
        text: '좋아요 업데이트에 실패했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    },
    onSettled: () => {
      // 성공/실패 관계없이 최종적으로 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
    },
  })

  const isUserLoggedIn = !!session?.user.id
  const isLikedArray = Array.isArray(post.liked)
  const isUserInLikedList =
    isUserLoggedIn && isLikedArray && post.liked?.includes(session.user.id)
  const isLiked = !!isUserInLikedList

  const handleCardClick = () => {
    navigate(`/community/post/${post.id}`)
  }

  const handleUserInfoClick = () => {
    setIsUserInfoModalOpen(true)
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const firstImgUrl =
    Array.isArray(post.img_urls) && post.img_urls.length > 0
      ? post.img_urls[0]
      : null

  const likesCount = Array.isArray(post.liked) ? post.liked.length : 0
  const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0
  const createdAtText = post.created_at ? dayjs(post.created_at).fromNow() : ''
  const authorName =
    post.author?.nickname ??
    (post.author?.email ? post.author.email.split('@')[0] : '사용자')
  const authorAvatar =
    post.author?.avatar_url ||
    'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg'
  const snippet =
    typeof post.content === 'string' && post.content.trim()
      ? post.content.replace(/\s+/g, ' ').trim()
      : ''

  return (
    <>
      {isUserInfoModalOpen && post.author && (
        <UserInfoModal
          user={post.author}
          onClose={() => setIsUserInfoModalOpen(false)}
        />
      )}

      <article
        onClick={handleCardClick}
        className="group bg-white rounded-[24px] shadow-[0_10px_28px_rgba(15,23,42,0.10)] border border-gray-100 hover:shadow-[0_18px_46px_rgba(15,23,42,0.16)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          {!isImageLoaded && <div className="absolute inset-0 bg-gray-100" />}
          <img
            src={
              firstImgUrl ??
              'https://picsum.photos/seed/botanica-fallback/600/600'
            }
            alt={post.title}
            draggable={false}
            loading="lazy"
            onLoad={handleImageLoad}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-700 shadow-sm">
            {post.category}
          </div>

          {/* Hover Overlay Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              type="button"
              className="appearance-none border-0 bg-white w-11 h-11 flex items-center justify-center rounded-full shadow-lg text-gray-700 hover:text-emerald-600 hover:scale-110 transition-all"
              onClick={e => {
                e.stopPropagation()
                if (!session) {
                  Swal.fire({
                    text: '로그인 후 사용 가능한 기능입니다.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#1E1E1E',
                    cancelButtonColor: '#1E1E1E',
                    confirmButtonText: '로그인',
                    cancelButtonText: '닫기',
                    scrollbarPadding: false,
                  }).then(result => {
                    if (result.isConfirmed) navigate('/login')
                  })
                  return
                }
                mutate({ postId: post.id, userId: session.user.id })
              }}
              aria-label="좋아요"
            >
              <Heart
                size={20}
                className={isLiked ? 'fill-emerald-600 text-emerald-600' : ''}
              />
            </button>
            <button
              type="button"
              className="appearance-none border-0 bg-white w-11 h-11 flex items-center justify-center rounded-full shadow-lg text-gray-700 hover:text-blue-600 hover:scale-110 transition-all"
              onClick={async e => {
                e.stopPropagation()
                const url = `${window.location.origin}/community#post-${post.id}`
                try {
                  const nav =
                    typeof window !== 'undefined' ? window.navigator : undefined

                  if (nav?.share) {
                    await nav.share({ title: post.title, text: snippet, url })
                    return
                  }
                  if (nav?.clipboard?.writeText) {
                    await nav.clipboard.writeText(url)
                    Swal.fire({
                      text: '링크를 복사했습니다.',
                      icon: 'success',
                      confirmButtonColor: '#1E1E1E',
                      confirmButtonText: '확인',
                      scrollbarPadding: false,
                    })
                    return
                  }
                  window.prompt('링크를 복사해 주세요.', url)
                } catch (err) {
                  console.error('share error:', err)
                  Swal.fire({
                    text: '공유에 실패했습니다.',
                    icon: 'error',
                    confirmButtonColor: '#1E1E1E',
                    confirmButtonText: '확인',
                    scrollbarPadding: false,
                  })
                }
              }}
              aria-label="공유"
            >
              <Share2 size={20} className="shrink-0" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors font-heading">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-5 flex-grow leading-relaxed">
            {snippet}
          </p>

          {/* Footer Info */}
          <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
            <button
              type="button"
              className="appearance-none border-0 flex items-center gap-2 min-w-0 text-left rounded-xl px-2 py-1 -mx-2 -my-1 bg-transparent hover:bg-transparent focus-visible:outline-none transition-colors"
              onClick={e => {
                e.stopPropagation()
                handleUserInfoClick()
              }}
            >
              {!isProfileLoaded && (
                <div className="w-8 h-8 rounded-full border border-gray-100 bg-gray-100 animate-pulse" />
              )}
              <img
                ref={profileImgRef}
                src={authorAvatar}
                alt={authorName}
                className={`w-8 h-8 rounded-full border border-gray-100 object-cover transition-opacity ${
                  isProfileLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                onLoad={() => setIsProfileLoaded(true)}
                onError={() => setIsProfileLoaded(true)}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                  {authorName}
                </span>
                <span className="text-[11px] text-gray-400 leading-tight">
                  {createdAtText}
                </span>
              </div>
            </button>

            <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
              <div className="flex items-center gap-1 group-hover:text-red-500 transition-colors">
                <Heart
                  size={14}
                  className={likesCount > 50 ? 'fill-red-50 text-red-500' : ''}
                />
                <span>{likesCount}</span>
              </div>
              <div className="flex items-center gap-1 group-hover:text-gray-900 transition-colors">
                <MessageSquare size={14} />
                <span>{commentsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
