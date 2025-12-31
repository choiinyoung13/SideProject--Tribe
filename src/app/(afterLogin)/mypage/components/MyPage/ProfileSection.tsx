'use client'

import { useEffect, useState } from 'react'
import { uploadImagesToStorageAndGetUrl } from '@/app/community/lib/post/uploadImagesToStorageAndGetUrl'
import { changeUserProfileImage } from '@/app/(afterLogin)/mypage/lib/user/changeUserProfileImage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import type { UserInfoType } from '@/types/UserInfoType'
import type { Dispatch, SetStateAction } from 'react'

interface ProfileSectionProps {
  userInfo: UserInfoType
  setUserInfo: Dispatch<SetStateAction<UserInfoType>>
  avatar_url: string
}

export function ProfileSection({
  userInfo,
  setUserInfo,
  avatar_url,
}: ProfileSectionProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
  const [displayedImageUrl, setDisplayedImageUrl] = useState<string>(avatar_url) // 현재 보여주는 이미지 URL
  const queryClient = useQueryClient()

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setImageFile(selectedFile)
    }
  }

  const { mutate } = useMutation({
    mutationFn: changeUserProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userinfo'] })
    },
  })

  useEffect(() => {
    if (!imageFile) return

    const changeProfileUrl = async () => {
      setIsImageLoading(true)
      try {
        const result = await uploadImagesToStorageAndGetUrl([imageFile])
        const uploadedImageUrl = result[0]

        setUserInfo(prev => ({
          ...prev,
          avatar_url: uploadedImageUrl,
        }))

        // 서버에도 업데이트 요청
        mutate({ url: uploadedImageUrl, id: userInfo.id })

        // 이미지 로드 완료 전에 displayedImageUrl 업데이트
        setDisplayedImageUrl(uploadedImageUrl)
      } catch (error) {
        console.error('프로필 이미지 변경 중 오류 발생:', error)
      }
    }

    changeProfileUrl()
  }, [imageFile, mutate, setUserInfo, userInfo.id])

  // 이미지 로드 완료 시 호출되는 함수
  const handleImageLoad = () => {
    setIsImageLoading(false) // 이미지가 완전히 로드되면 로딩 상태 종료
  }

  return (
    <div className="w-full flex justify-end">
      <div className="w-[80%] max-[768px]:mx-auto">
        {/* 이미지가 로드될 때까지 로딩 상태 유지 */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} // 부드럽게 나타나도록 설정
            transition={{ duration: 0.7 }} // 전환 효과 시간 설정
          >
            <img
              className="rounded-full w-full h-auto aspect-square max-w-[196px] max-h-[196px] max-[768px]:w-[70%] max-[768px]:h-[70%]"
              src={
                displayedImageUrl
                  ? displayedImageUrl
                  : 'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg'
              }
              alt="avatar url"
              onLoad={handleImageLoad} // 이미지 로드 완료 시 로딩 종료
            />
          </motion.div>
          <input type="file" id="img" onChange={handleFileChange} className="hidden" />
          <label
            htmlFor="img"
            className={`flex items-center justify-center mt-[20px] transition-colors duration-300 text-white rounded-[6px] w-[100px] h-[40px] text-[0.9rem] ${isImageLoading
                ? 'bg-[rgba(150,150,150,1)] cursor-not-allowed'
                : 'bg-[rgba(30,30,30,1)] cursor-pointer hover:bg-[rgba(50,50,50,1)]'
              }`}
            onClick={e => {
              if (isImageLoading) e.preventDefault() // 로딩 중일 때 클릭 방지
            }}
          >
            {isImageLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white motion-safe:animate-dot-pulse" />
                <div
                  className="w-2 h-2 rounded-full bg-white motion-safe:animate-dot-pulse"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-white motion-safe:animate-dot-pulse"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            ) : (
              '프로필 변경'
            )}
          </label>
        </div>
      </div>
    </div>
  )
}
