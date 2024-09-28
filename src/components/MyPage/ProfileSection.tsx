import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { uploadImagesToStorageAndGetUrl } from '../../config/api/post/uploadImagesToStorageAndGetUrl'
import { ChangeUserProfileImage } from '../../config/api/user/ChangeUserProfileImage'
import Spinner from '../Common/Spinner'

interface ProfileSectionProps {
  userInfo: any
  setUserInfo: (userInfo: any) => void
}

export function ProfileSection({ userInfo, setUserInfo }: ProfileSectionProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string | null>(userInfo.avatar_url) // 변경된 이미지 URL 상태로 관리

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setImageFile(selectedFile)
    }
  }

  useEffect(() => {
    if (userInfo.avatar_url !== null) {
      setImageUrl(userInfo.avatar_url)
    }
  }, [userInfo.avatar_url])

  useEffect(() => {
    if (!imageFile) return

    const changeProfileUrl = async () => {
      setIsLoading(true)
      try {
        const result = await uploadImagesToStorageAndGetUrl([imageFile])
        const uploadedImageUrl = result[0]

        setUserInfo((prev: any) => ({
          ...prev,
          avatar_url: uploadedImageUrl,
        }))

        // 서버에도 업데이트 요청
        await ChangeUserProfileImage(uploadedImageUrl, userInfo.id)

        // 변경된 이미지 URL 설정
        setImageUrl(uploadedImageUrl)
      } catch (error) {
        console.error('프로필 이미지 변경 중 오류 발생:', error)
      }
    }

    changeProfileUrl()
  }, [imageFile])

  // 이미지 로드 완료 시 호출되는 함수
  const handleImageLoad = () => {
    setIsLoading(false) // 이미지가 완전히 로드되면 로딩 상태 종료
  }

  return (
    <ProfileWrapper>
      {/* 이미지가 로드될 때까지 로딩 상태 유지 */}
      <ProfileImg
        src={
          imageUrl
            ? imageUrl
            : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
        }
        alt="avatar url"
        onLoad={handleImageLoad} // 이미지 로드 완료 시 로딩 종료
      />
      <input type="file" id="img" onChange={handleFileChange} />
      <ProfileChangeButton
        htmlFor="img"
        isLoading={isLoading}
        onClick={e => {
          if (isLoading) e.preventDefault() // 로딩 중일 때 클릭 방지
        }}
      >
        {isLoading ? <Spinner width={22} height={22} /> : '프로필 변경'}
      </ProfileChangeButton>
    </ProfileWrapper>
  )
}

// 스타일링
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  input {
    display: none;
  }
`

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 60%;
  height: 60%;
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
