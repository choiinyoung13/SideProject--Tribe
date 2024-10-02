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
      {recommends.map(recommend => {
        return (
          <FollowRecommend>
            <FollowRecommendLeft>
              <Profile
                src={
                  recommend.avatar_url
                    ? recommend.avatar_url
                    : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
                }
              />
              <TextSection>
                <UserName>
                  {recommend.nickname
                    ? recommend.nickname
                    : recommend.email.split('@')[0]}
                </UserName>
                <Description>{recommend.status_message}</Description>
              </TextSection>
            </FollowRecommendLeft>
          </FollowRecommend>
        )
      })}
    </>
  )
}

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
  border: 1px soild rgba(240, 240, 240, 1);
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
