import { useState } from 'react'
import UserInfoModal from './UserInfoModal'
import type { UserInfoType } from '@/types/UserInfoType'

interface FollowRecommendsProps {
  isRecommendsLoading: boolean
  recommends: UserInfoType[] | undefined
}

// FollowRecommends 컴포넌트
export default function FollowRecommends({
  isRecommendsLoading,
  recommends,
}: FollowRecommendsProps) {
  const [selectedUser, setSelectedUser] = useState<UserInfoType | null>(null)
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({})

  const SkeletonArray = new Array(4).fill(null)

  // 유저 클릭 시 모달에 전달할 유저 데이터 설정
  const handleClickUser = (user: UserInfoType) => {
    setSelectedUser(user)
  }

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedUser(null)
  }

  const handleImageLoad = (userId: string) => {
    setImageLoaded(prev => ({ ...prev, [userId]: true }))
  }

  if (isRecommendsLoading || !recommends) {
    return (
      <>
        {SkeletonArray.map((_, i) => (
          <div
            key={i}
            className="mt-4 first:mt-0 flex items-center justify-between"
          >
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gray-100" />
              <div className="flex flex-col ml-3">
                <div className="h-[10px] w-[80px] bg-gray-100 rounded" />
                <div className="mt-2 h-[10px] w-[110px] bg-gray-100 rounded" />
              </div>
            </div>
            <div className="h-7 w-14 rounded-full bg-gray-100" />
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="relative space-y-4">
      {recommends.map((recommend, index) => (
        <div key={index} className="flex items-center gap-3">
          <button
            type="button"
            className="appearance-none border-0 bg-transparent hover:bg-transparent focus-visible:outline-none flex flex-1 items-center gap-3 min-w-0 text-left"
            onClick={() => handleClickUser(recommend)}
          >
            <div className="relative w-10 h-10 shrink-0">
              {!imageLoaded[recommend.id] ? (
                <div className="absolute inset-0 rounded-full bg-gray-100 z-0" />
              ) : null}
              <img
                className="relative z-10 w-10 h-10 rounded-full object-cover border border-gray-100"
                src={
                  recommend.avatar_url
                    ? recommend.avatar_url
                    : 'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg'
                }
                alt=""
                loading="lazy"
                onLoad={() => handleImageLoad(recommend.id)}
                onError={() => handleImageLoad(recommend.id)}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                {recommend.nickname ? recommend.nickname : recommend.email.split('@')[0]}
              </span>
              <span className="text-xs text-gray-400 truncate">
                {recommend.status_message}
              </span>
            </div>
          </button>
        </div>
      ))}

      {/* 선택된 유저가 있을 경우에만 모달을 표시 */}
      {selectedUser && (
        <UserInfoModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  )
}
