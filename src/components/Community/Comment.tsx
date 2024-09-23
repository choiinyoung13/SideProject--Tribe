import styled from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

// dayjs 상대 시간 플러그인과 한국어 설정
dayjs.extend(relativeTime)
dayjs.locale('ko')

interface CommentProps {
  comment: {
    id: string
    user: string
    text: string
    timestamp: string
    profileUrl?: string
    username?: string
    email?: string
  }
}

export default function Comment({ comment }: CommentProps) {
  return (
    <CommentCon>
      <CommentLeft>
        <CommentProfileImage
          src={
            comment.profileUrl
              ? comment.profileUrl
              : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
          }
          alt="Comment Profile"
        />
        <CommentLeftText>
          <CommentUser>
            {comment.username ? comment.username : comment.email?.split('@')[0]}
          </CommentUser>
          <CommentText>{comment.text}</CommentText>
        </CommentLeftText>
      </CommentLeft>
      <CommentTime>{dayjs(comment.timestamp).fromNow()}</CommentTime>
    </CommentCon>
  )
}

const CommentCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 27px;
`

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 60px;
    height: auto;
  }
`

const CommentProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
`

const CommentLeft = styled.div`
  display: flex;
  align-items: center;
`

const CommentLeftText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3.5px;
`

const CommentUser = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
`

const CommentText = styled.div`
  margin-top: 8px;
  font-size: 0.9rem;
  margin-right: 2px;
  color: #555;
`

const CommentTime = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`
