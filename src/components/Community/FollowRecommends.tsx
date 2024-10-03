import { useState } from 'react'
import styled from 'styled-components'

type recommendType = {
  userId: string
  email: string
  avatar_url: string
  nickname: string
  status_message: string
}

interface FollowRecommendsProps {
  isRecommendsLoading: boolean
  recommends: recommendType[] | undefined
}

export default function FollowRecommends({
  isRecommendsLoading,
  recommends,
}: FollowRecommendsProps) {
  const SkeletonArray = new Array(4).fill(null)

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
    <>
      {recommends.map((recommend, index) => {
        return (
          <FollowRecommend key={index}>
            <FollowRecommendLeft>
              <ProfileWithLoader
                src={
                  recommend.avatar_url
                    ? recommend.avatar_url
                    : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
                }
                nickname={
                  recommend.nickname
                    ? recommend.nickname
                    : recommend.email.split('@')[0]
                }
                status_message={recommend.status_message}
              />
            </FollowRecommendLeft>
          </FollowRecommend>
        )
      })}
    </>
  )
}

// 이미지와 텍스트를 동시에 렌더링하는 컴포넌트
const ProfileWithLoader = ({
  src,
  nickname,
  status_message,
}: {
  src: string
  nickname: string
  status_message: string
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      {/* 이미지가 로드되었을 때만 콘텐츠를 보여줌 */}
      {!imageLoaded && (
        <SkeletonWrapper>
          <SkeletonProfile />
          <SkeletonTextSection>
            <SkeletonUserName />
            <SkeletonDescription />
          </SkeletonTextSection>
        </SkeletonWrapper>
      )}

      {/* 이미지가 로드되면 보여지는 부분 */}
      <FadeInWrapper visible={imageLoaded}>
        <Profile src={src} onLoad={() => setImageLoaded(true)} />
        <TextSection>
          <UserName>{nickname}</UserName>
          <Description>{status_message}</Description>
        </TextSection>
      </FadeInWrapper>
    </>
  )
}

// 스타일링

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
