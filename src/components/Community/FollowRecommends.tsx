import { useState } from 'react'
import styled from 'styled-components'
import UserInfoModal from './UserInfoModal'
import { UserInfoType } from '../../types/UserInfoType'

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
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({}) // 이미지 로딩 상태를 각 유저별로 관리

  const SkeletonArray = new Array(4).fill(null)

  // 유저 클릭 시 모달에 전달할 유저 데이터 설정
  const handleClickUser = (user: UserInfoType) => {
    setSelectedUser(user)
  }

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedUser(null)
  }

  // 특정 유저의 이미지 로딩 상태 업데이트
  const handleImageLoad = (userId: string) => {
    setImageLoaded(prev => ({ ...prev, [userId]: true }))
  }

  if (isRecommendsLoading || !recommends) {
    return (
      <>
        {SkeletonArray.map((_, i) => (
          <FollowRecommend key={i}>
            <FollowRecommendLeft>
              <SkeletonProfile />
              <SkeletonTextSection>
                <SkeletonUserName />
                <SkeletonDescription />
              </SkeletonTextSection>
            </FollowRecommendLeft>
          </FollowRecommend>
        ))}
      </>
    )
  }

  return (
    <Container>
      {recommends.map((recommend, index) => (
        <FollowRecommend key={index} onClick={() => handleClickUser(recommend)}>
          <FollowRecommendLeft>
            {!imageLoaded[recommend.id] && ( // 개별 이미지 로딩 상태 확인
              <SkeletonWrapper>
                <SkeletonProfile />
                <SkeletonTextSection>
                  <SkeletonUserName />
                  <SkeletonDescription />
                </SkeletonTextSection>
              </SkeletonWrapper>
            )}

            <FadeInWrapper visible={!!imageLoaded[recommend.id]}>
              <Profile
                src={
                  recommend.avatar_url
                    ? recommend.avatar_url
                    : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
                }
                onLoad={() => handleImageLoad(recommend.id)} // 이미지 로드 시 해당 유저의 로딩 상태 업데이트
              />
              <TextSection>
                <UserName>
                  {recommend.nickname
                    ? recommend.nickname
                    : recommend.email.split('@')[0]}
                </UserName>
                <Description>{recommend.status_message}</Description>
              </TextSection>
            </FadeInWrapper>
          </FollowRecommendLeft>
        </FollowRecommend>
      ))}

      {/* 선택된 유저가 있을 경우에만 모달을 표시 */}
      {selectedUser && (
        <UserInfoModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const FollowRecommend = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(240, 240, 240, 1);
  }
  &:first-of-type {
    margin-top: 0px;
  }
`

const Profile = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(240, 240, 240, 1);
`

const SkeletonProfile = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: rgba(230, 230, 230, 1);
`

const TextSection = styled.div`
  width: 164px;
  margin-left: 8px;
`

const SkeletonTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 164px;
  margin-left: 8px;
`

const UserName = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  color: rgba(30, 30, 30, 1);
`

const SkeletonUserName = styled.div`
  height: 10px;
  width: 70px;
  background-color: rgba(230, 230, 230, 1);
`

const Description = styled.div`
  font-size: 0.75rem;
  font-weight: thin;
  margin-top: 6px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SkeletonDescription = styled.div`
  height: 10px;
  width: 120px;
  background-color: rgba(230, 230, 230, 1);
`

const FollowRecommendLeft = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const FadeInWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  align-items: center;
  transition: opacity 0.5s ease;
`

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
`
