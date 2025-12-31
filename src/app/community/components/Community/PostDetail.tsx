'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Heart,
  MessageSquare,
  Share2,
  Send,
  Trash2,
  ArrowLeft,
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { Pagination, Navigation } from 'swiper/modules'
import type { PostType } from '@/types/PostType'
import { insertComment } from '@/app/community/lib/post/insertComment'
import { useAuth } from '@/hooks/useAuth'
import Comment from './Comment'
import { fetchUserInfoByUserId } from '@/lib/user/fetchUserInfo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { togglePostLike } from '@/app/community/lib/post/togglePostLike'
import { deletePost } from '@/app/community/lib/post/deletePost'
import LazyLoadedSlideImage from './LazyLoadedSlideImage'
import UserInfoModal from './UserInfoModal'
import type { UserInfoType } from '@/types/UserInfoType'

// dayjs 플러그인 및 한국어 설정
dayjs.extend(relativeTime)
dayjs.locale('ko')

interface PostDetailProps {
  userInfo: {
    userId: string
    email: string
    avatar_url: string
    nickname: string
  }
  post: PostType
  onClose: () => void
}

interface CommentProps {
  id: string
  user: string
  text: string
  timestamp: string
  profileUrl?: string
  username?: string
  email?: string
}

export default function PostDetail({
  userInfo,
  post: initialPost,
  onClose,
}: PostDetailProps) {
  const [post, setPost] = useState<PostType>(initialPost)
  const [newComment, setNewComment] = useState('')
  const [commentsWithUserInfo, setCommentsWithUserInfo] = useState<
    CommentProps[]
  >([])
  const [isCommentsLoading, setIsCommentsLoading] = useState(false)
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const router = useRouter()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  // initialPost가 변경되면 post state도 업데이트
  useEffect(() => {
    setPost(initialPost)
  }, [initialPost])

  const { mutate: commentMutate, isPending: insertCommentLoading } =
    useMutation({
      mutationFn: insertComment,
      onSuccess: async () => {
        // 캐시 무효화
        await queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
        
        // post를 다시 가져와서 댓글 목록 및 카운트 업데이트
        const { supabase } = await import('@/supabase/supabaseClient')
        const { data: updatedPostData } = await supabase
          .from('posts')
          .select('*')
          .eq('id', post.id)
          .single()
        
        if (updatedPostData) {
          const updatedPost = updatedPostData as PostType
          setPost(updatedPost)
          await loadCommentsWithUserInfo(updatedPost)
        }
      },
      onError: () => {
        Swal.fire({
          text: '댓글 등록 중 오류가 발생했습니다.',
          icon: 'error',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
      },
    })

  const { mutate: likeMutate } = useMutation({
    mutationFn: togglePostLike,
    onSuccess: async () => {
      // 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
      
      // post를 다시 가져와서 좋아요 상태 업데이트
      const { supabase } = await import('@/supabase/supabaseClient')
      const { data: updatedPostData } = await supabase
        .from('posts')
        .select('*')
        .eq('id', post.id)
        .single()
      
      if (updatedPostData) {
        const updatedPost = updatedPostData as PostType
        setPost(updatedPost)
      }
    },
    onError: () => {
      Swal.fire({
        text: '좋아요 업데이트에 실패했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    },
  })

  const loadCommentsWithUserInfo = async (postData: PostType) => {
    setIsCommentsLoading(true)
    if (!postData.comments || postData.comments.length === 0) {
      setCommentsWithUserInfo([])
      setIsCommentsLoading(false)
      return
    }

    const loadedComments = await Promise.all(
      postData.comments.map(async comment => {
        const userInfo = await fetchUserInfoByUserId(comment.id)
        return {
          ...comment,
          profileUrl: userInfo?.avatar_url,
          username: userInfo?.nickname,
          email: userInfo?.email,
        }
      })
    )
    setCommentsWithUserInfo(loadedComments)
    setIsCommentsLoading(false)
  }

  useEffect(() => {
    loadCommentsWithUserInfo(post)
  }, [post])

  const OnInputSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
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
        if (result.isConfirmed) {
          router.push('/login')
        }
      })
      return
    }

    if (!newComment.trim()) return

    await commentMutate({
      postId: post.id,
      userId: session!.user.id,
      comment: newComment,
    })

    setNewComment('')
  }

  const handleDeleteClick = () => {
    Swal.fire({
      html: `
        <h1 style="font-weight:500; font-size:20px;">정말 게시물을 삭제하시겠습니까?</h1>
      `,
      confirmButtonText: '삭제',
      showCancelButton: true,
      cancelButtonText: '취소',
      allowOutsideClick: false,
      confirmButtonColor: '#1E1E1E',
      cancelButtonColor: '#1E1E1E',
    }).then(result => {
      if (result.isConfirmed) {
        deletePost(post.id).then(async () => {
          await queryClient.invalidateQueries({ queryKey: ['posts'], exact: false })
          onClose()
        })
      }
    })
  }

  // 슬라이드 변경 이벤트 핸들러
  const handleSlideChange = (swiper: {
    activeIndex: React.SetStateAction<number>
  }) => {
    setCurrentSlideIndex(swiper.activeIndex)
  }

  // 다음 슬라이드 이미지 URL 가져오기
  const preloadNextImageSrc =
    currentSlideIndex + 1 < post.img_urls.length
      ? post.img_urls[currentSlideIndex + 1]
      : undefined // 마지막 슬라이드인 경우 undefined

  const isPostLiked =
    !!(
      session?.user.id &&
      Array.isArray(post.liked) &&
      post.liked.includes(session.user.id)
    )

  const likesCount = Array.isArray(post.liked) ? post.liked.length : 0
  const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0
  const createdAtText = post.created_at ? dayjs(post.created_at).fromNow() : ''
  const authorName =
    userInfo.nickname ||
    (userInfo.email ? userInfo.email.split('@')[0] : '사용자')
  const authorAvatar =
    userInfo.avatar_url ||
    'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg'

  const proseContent = useMemo(() => {
    if (!post.content) return ''
    return String(post.content)
  }, [post.content])

  // userInfo를 UserInfoType 형식으로 변환
  const userInfoForModal: UserInfoType = {
    id: userInfo.userId,
    email: userInfo.email,
    avatar_url: userInfo.avatar_url || null,
    username: userInfo.nickname || null,
    admin: false,
    likes: null,
    nickname: userInfo.nickname || null,
    status_message: null,
  }

  const handleProfileClick = () => {
    setIsUserModalOpen(true)
  }

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false)
  }

  return (
    <>
      {isUserModalOpen && (
        <UserInfoModal user={userInfoForModal} onClose={handleCloseUserModal} />
      )}
      {/* Header (Write Page style) */}
      <div className="flex items-center justify-between mb-8 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 bg-white text-gray-500 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 border-0"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">돌아가기</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl shadow-[4px_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
            {/* Hero Image */}
            <div className="relative aspect-square w-full bg-gray-100">
              <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                modules={[Pagination, Navigation]}
                onSlideChange={handleSlideChange}
                className="w-full h-full"
              >
                {(post.img_urls?.length ? post.img_urls : ['https://picsum.photos/seed/botanica-detail/1200/675']).map(
                  (imgUrl, index) => (
                    <SwiperSlide key={index}>
                      <LazyLoadedSlideImage
                        src={imgUrl}
                        alt={`Slide ${index + 1}`}

                        preloadNextImageSrc={preloadNextImageSrc}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
            </div>

            <div className="p-8 sm:p-10">
              {/* Header Info */}
              <div className="flex items-center justify-between mb-6">
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{createdAtText}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight mb-8">
                {post.title}
              </h1>

              {/* Body Text */}
              <div className="prose prose-lg prose-emerald text-gray-600 leading-loose whitespace-pre-line mb-10">
                {proseContent}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-50 text-gray-700 font-bold hover:bg-red-50 hover:text-red-500 hover:scale-105 transition-all border-0"
                  onClick={() => {
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
                        if (result.isConfirmed) router.push('/login')
                      })
                      return
                    }
                    likeMutate({ postId: post.id, userId: session.user.id })
                  }}
                >
                  <Heart size={20} className={isPostLiked ? 'fill-red-500 text-red-500' : ''} />
                  <span>{likesCount}</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-50 text-gray-700 font-bold border-0"
                >
                  <MessageSquare size={20} />
                  <span>{commentsCount}</span>
                </button>

                <div className="flex-grow" />
                {session && session.user.id === post.user ? (
                  <button
                    type="button"
                    className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors border-0"
                    onClick={handleDeleteClick}
                    aria-label="삭제"
                  >
                    <Trash2 size={20} />
                  </button>
                ) : null}
                <button
                  type="button"
                  className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors border-0"
                  aria-label="공유"
                  onClick={async () => {
                    const url = `${window.location.origin}/community#post-${post.id}`
                    try {
                      if ('share' in navigator) {
                        await navigator.share({ title: post.title, text: proseContent, url })
                        return
                      }
                      const nav = navigator as Navigator & { clipboard?: { writeText: (text: string) => Promise<void> } }
                      if (nav.clipboard?.writeText) {
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
                    } catch {
                      // ignore
                    }
                  }}
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8 bg-white rounded-3xl shadow-[4px_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-6">
              댓글 <span className="text-emerald-600">{commentsCount}</span>
            </h3>

            {/* Input */}
            <form className="flex gap-4 mb-8" onSubmit={OnInputSubmit}>
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="따뜻한 댓글을 남겨주세요..."
                  className="w-full bg-gray-50 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all border-0"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={insertCommentLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-emerald-600 rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center border-0"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>

            {/* List */}
            <div className="space-y-6">
              {isCommentsLoading && commentsWithUserInfo.length === 0 ? (
                <div className="flex items-center justify-center py-10">
                  <div className="flex items-center gap-2" aria-label="댓글 로딩 중">
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
              ) : null}
              {commentsWithUserInfo.map((comment, index) => (
                <Comment key={`${comment.id}-${comment.timestamp}-${index}`} comment={comment} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.15)] border border-emerald-100 text-center">
            <div className="w-20 h-20 mx-auto rounded-full p-1 border-2 border-emerald-100 mb-3">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">{authorName}</h3>
            <p className="text-sm text-gray-500 mb-6">식물과 함께하는 소소한 일상 🌿</p>
            <button
              type="button"
              onClick={handleProfileClick}
              className="w-full py-2.5 rounded-xl bg-gray-50 text-gray-600 font-bold hover:bg-gray-100 transition-all text-sm border-0"
            >
              프로필 방문하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
