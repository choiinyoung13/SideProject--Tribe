import styled from 'styled-components'

interface ProfileSectionProps {
  session: any
}

export function ProfileSection({ session }: ProfileSectionProps) {
  return (
    <ProfileWrapper>
      <ProfileImg
        src={
          session.user.user_metadata.avatar_url
            ? session.user.user_metadata.avatar_url
            : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
        }
        alt="avatar url"
      />
      <ProfileChangeButton>프로필 변경</ProfileChangeButton>
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
`

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 60%;
  height: 60%;
`

const ProfileChangeButton = styled.button`
  margin-top: 20px;
  background-color: rgba(30, 30, 30, 1);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(50, 50, 50, 1);
  }
`
