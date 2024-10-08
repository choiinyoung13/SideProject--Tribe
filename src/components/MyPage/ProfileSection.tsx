import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { uploadImagesToStorageAndGetUrl } from '../../config/api/post/uploadImagesToStorageAndGetUrl'
import { ChangeUserProfileImage } from '../../config/api/user/ChangeUserProfileImage'
import Spinner from '../Common/Spinner'
import { useMutation, useQueryClient } from 'react-query'
import { motion } from 'framer-motion'

interface ProfileSectionProps {
  userInfo: any
  setUserInfo: (userInfo: any) => void
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

  const { mutate } = useMutation(ChangeUserProfileImage, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userinfo'], exact: false })
    },
  })

  useEffect(() => {
    if (!imageFile) return

    const changeProfileUrl = async () => {
      setIsImageLoading(true)
      try {
        const result = await uploadImagesToStorageAndGetUrl([imageFile])
        const uploadedImageUrl = result[0]

        setUserInfo((prev: any) => ({
          ...prev,
          avatar_url: uploadedImageUrl,
        }))

        // 서버에도 업데이트 요청
        mutate({ url: uploadedImageUrl, id: userInfo.id })

        // 이미지 로드 완료 후에 displayedImageUrl 업데이트
        setDisplayedImageUrl(uploadedImageUrl)
      } catch (error) {
        console.error('프로필 이미지 변경 중 오류 발생:', error)
      }
    }

    changeProfileUrl()
  }, [imageFile])

  // 이미지 로드 완료 시 호출되는 함수
  const handleImageLoad = () => {
    setIsImageLoading(false) // 이미지가 완전히 로드되면 로딩 상태 종료
  }

  return (
    <ProfileWrapper>
      <ProfileBox>
        {/* 이미지가 로드될 때까지 로딩 상태 유지 */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} // 부드럽게 나타나도록 설정
            transition={{ duration: 0.7 }} // 전환 효과 시간 설정
          >
            <ProfileImg
              src={
                displayedImageUrl
                  ? displayedImageUrl
                  : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
              }
              alt="avatar url"
              onLoad={handleImageLoad} // 이미지 로드 완료 시 로딩 종료
            />
          </motion.div>
          <input type="file" id="img" onChange={handleFileChange} />
          <ProfileChangeButton
            htmlFor="img"
            isLoading={isImageLoading}
            onClick={e => {
              if (isImageLoading) e.preventDefault() // 로딩 중일 때 클릭 방지
            }}
          >
            {isImageLoading ? (
              <Spinner width={22} height={22} />
            ) : (
              '프로필 변경'
            )}
          </ProfileChangeButton>
        </div>
      </ProfileBox>
    </ProfileWrapper>
  )
}

// 스타일링
const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`

const ProfileBox = styled.div`
  width: 80%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    display: none;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`

const ProfileImg = styled.img`
  border-radius: 50%;
  max-width: 196px;
  max-height: 196px;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;

  @media (max-width: 768px) {
    width: 70%;
    height: 70%;
  }
`

const ProfileChangeButton = styled.label<{ isLoading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  background-color: ${({ isLoading }) =>
    isLoading ? 'rgba(150, 150, 150, 1)' : 'rgba(30, 30, 30, 1)'};
  color: #fff;
  border: none;
  border-radius: 6px;
  width: 100px;
  height: 40px;
  font-size: 0.9rem;
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ isLoading }) =>
      isLoading ? 'rgba(150, 150, 150, 1)' : 'rgba(50, 50, 50, 1)'};
  }
`
