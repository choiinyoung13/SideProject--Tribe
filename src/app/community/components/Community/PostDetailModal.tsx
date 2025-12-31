import { useEffect } from 'react'
import PostDetail from './PostDetail'
import type { PostType } from '@/types/PostType'
import { ArrowLeft, X } from 'lucide-react'

export default function PostDetailModal({
  userInfo,
  post,
  onClose,
}: {
  userInfo: {
    userId: string
    email: string
    avatar_url: string
    nickname: string
  }
  post: PostType
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className="fixed z-[1002] inset-0 bg-black/20 backdrop-blur-[2px] overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6 pt-2 sticky top-4 z-30 pointer-events-none">
            <button
              type="button"
              onClick={onClose}
              className="pointer-events-auto flex items-center gap-2 text-gray-600 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-white hover:text-emerald-600 transition-all"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">돌아가기</span>
            </button>

            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="pointer-events-auto p-2 rounded-xl bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 text-gray-500 hover:bg-white hover:text-gray-900 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <PostDetail userInfo={userInfo} post={post} onClose={onClose} />
        </div>
      </div>
    </div>
  )
}


